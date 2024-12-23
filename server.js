
const host = "localhost";
const port = 2016;
const cors = require('cors');
const express = require("express");
const url = require('url');
const mysql = require('mysql');
const bodyParser = require('body-parser');


let app = express();

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + "/public")); //use static files in ROOT/public folder


var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'digi_locker'
});
connection.connect(function(err) {
	if (err) {
		console.log('sql connection error CheckEmail');
		error.data = err;
		response.send(error);
	}
});

var success = {
	data : '',
	status : 'Success',
	code : '200'
}

var error = {
	data : '',
	status : 'Error',
	code : '304'
}

app.use(cors());

app.get("/", function(request, response){	
    response.send("Hello!!");
});

app.post("/CheckEmail", function(request, response){

	console.log(request.body.email)

		connection.query("SELECT * FROM users WHERE email = '"+request.body.email+"'", function (err, result) {
			if (err) {
				console.log('sql error');
				error.data = err;
				response.send(error);
			}else if(result.length >= 1){
				console.log('Email already exist');
				error.data = err;
				response.send(error);
			}else {
				console.log('Email check success');
				success.data = result;
				response.send(success);
			}
		  });
	
});

app.post("/login", function(request, response){ //Login Form
	
	/*let urlQuery = url.parse(request.url, true);
	let queryData = urlQuery.query;*/

	console.log("Email : "+request.body.email)
		
		connection.query("SELECT * FROM users WHERE email = '"+request.body.email+"' AND password = '"+request.body.password+"'", function (err, result, fields) {
			if (err) {
				console.log('Login sql error');
				error.data = err;
				response.send(error);
			}else if(result.length >= 1){
				console.log('Login success');
				success.data = result;
				response.send(success);
			}else{
				response.send(error);
			}
		  });

});

app.post("/Register", function(request, response){
	
	let urlQuery = url.parse(request.url, true);
	let queryData = urlQuery.query;

		
		let sqlRegister = "INSERT INTO users (fname, mname, lname, email, password, address) VALUES ('"+request.body.fname+"', '"+request.body.mname+"', '"+request.body.lname+"', '"+request.body.email+"', '"+request.body.password+"', '')";
		connection.query(sqlRegister, function (err, result) {
			if (err) {
				console.log('Register sql error');
				error.data = err;
				response.send(error);
			}else {
				console.log('Register success');
				success.data = result;
				response.send(success);
			}
		  });
});

app.get("/Dashbord", function(request, response){
    response.send("dashbord");
});



app.listen(port, host, () => {
	console.log("Server is running at port : " + port);
});