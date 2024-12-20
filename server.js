
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

app.post("/login", function(request, response){ //Login Form
	
	/*let urlQuery = url.parse(request.url, true);
	let queryData = urlQuery.query;*/

	console.log("Email : "+request.body.email)

	connection.connect(function(err) {
	    if (err) {
			console.log('sql connection error');
			error.data = err;
			response.send(error);
		}
		
		connection.query("SELECT * FROM users WHERE email = '"+request.body.email+"' AND password = '"+request.body.password+"'", function (err, result, fields) {
			if (err) {
				console.log('Login sql error');
				error.data = err;
				response.send(error);
			}
			
			if(result.length >= 1){
				console.log('Login success');
				success.data = result;
				response.send(success);
			}
		  });
	});
});

app.get("/Register", function(request, response){
	
	let urlQuery = url.parse(request.url, true);
	let queryData = urlQuery.query;
	
	connection.connect(function(err) {
		if (err) throw err;
		console.log("Connected!");
		var sql = "INSERT INTO customers (name, address) VALUES ('Company Inc', 'Highway 37')";
		connection.query(sql, function (err, result) {
			if (err) throw err;
			console.log("1 record inserted");
		});
	});
    response.send("Register");
});

app.get("/dashbord", function(request, response){
    response.send("dashbord");
});



app.listen(port, host, () => {
	console.log("Server is running at port : " + port);
});