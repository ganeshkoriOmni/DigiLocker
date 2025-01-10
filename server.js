
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

		connection.query("SELECT * FROM tbl_users WHERE fieldEmail = '"+request.body.email+"'", function (err, result) {
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

app.post("/Login", function(request, response){ //Login Form
	
	/*let urlQuery = url.parse(request.url, true);
	let queryData = urlQuery.query;*/

	console.log("Email : "+request.body.email)
		
		connection.query("SELECT * FROM tbl_users WHERE fieldEmail = '"+request.body.email+"' AND fieldPassword = '"+request.body.password+"'", function (err, result, fields) {
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

		
		let sqlRegister = "INSERT INTO tbl_users (fieldName, fieldName, fieldEmail, fieldPassword, fieldOption) VALUES ('"+request.body.fname+"', '"+request.body.lname+"', '"+request.body.email+"', '"+request.body.password+"', 'OPEN')";
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

app.get("/Documnets", function(request, response){
	let urlQuery = url.parse(request.url, true);
	let queryData = urlQuery.query;
    console.log("Documents : "+queryData.id);

		connection.query("SELECT * FROM tbl_documents WHERE fieldUserId = '"+queryData.id+"'", function (err, result, fields) {
			if (err) {
				console.log('Documnets sql error');
				error.data = err;
				response.send(err);
			}else if(result.length >= 1){
				console.log('Documnets success');
				success.data = result;
				response.send(result);
			}else{
				response.send(error);
			}
		  });
});

app.get("/DocumnetId", function(request, response){
	let urlQuery = url.parse(request.url, true);
	let queryData = urlQuery.query;
    console.log("Documents ID : "+queryData.id);

		connection.query("SELECT * FROM tbl_documents WHERE fieldId = '"+queryData.id+"'", function (err, result, fields) {
			if (err) {
				console.log('DocumnetId sql error');
				error.data = err;
				response.send(err);
			}else if(result.length >= 1){
				console.log('DocumnetId success');
				success.data = result;
				response.send(result);
			}else{
				response.send(error);
			}
		  });
});

app.put("/DocumnetUpdate", function(request, response){
		console.log('request ',request.body.documentsName)
		let sqlDocument = "UPDATE tbl_documents SET fieldName = '"+request.body.documentsName+"', fieldData = '"+request.body.documentDataGet+"', fieldLastDate = '2024-12-23 23:12:12' WHERE fieldId = '"+request.body.documentsId+"'";
		connection.query(sqlDocument, function (err, result) {
			if (err) {
				console.log('DocumnetUpdate sql error');
				error.data = err;
				response.send(error);
			}else {
				console.log('DocumnetUpdate success');
				success.data = result;
				response.send(success);
			}
		  });
});

app.post("/DocumnetAdd", function(request, response){
		console.log('request ',request.body.documentsName)
		let sqlRegister = "INSERT INTO tbl_documents (fieldName, fieldUserId, fieldData, fieldDate) VALUES ('"+request.body.documentsName+"', '"+request.body.userId+"', '"+request.body.documentDataGet+"', '2024-12-23 23:12:12')";
		connection.query(sqlRegister, function (err, result) {
			if (err) {
				console.log('DocumnetAdd sql error');
				error.data = err;
				response.send(error);
			}else {
				console.log('DocumnetAdd success');
				success.data = result;
				response.send(result);
			}
		  });
});

app.get("/Folders", function(request, response){
	let urlQuery = url.parse(request.url, true);
	let queryData = urlQuery.query;
    console.log("Folder : "+queryData.id);

		connection.query("SELECT * FROM tbl_folder WHERE fieldUserId = '"+queryData.id+"'", function (err, result, fields) {
			if (err) {
				console.log('Folder sql error');
				error.data = err;
				response.send(err);
			}else if(result.length >= 1){
				console.log('Folder success');
				success.data = result;
				response.send(result);
			}else{
				response.send(error);
			}
		  });
});

app.get("/Dashbord", function(request, response){
    response.send("dashbord");
});



app.listen(port, host, () => {
	console.log("Server is running at port : " + port);
});