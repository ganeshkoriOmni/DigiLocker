
const host = "localhost";
const port = 2016;
const cors = require('cors');
const express = require("express");
const url = require('url');
const mysql = require('mysql');
const bodyParser = require('body-parser');


let app = express();

//app.use(bodyParser.json()); 
//app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

//app.use(bodyParser.json({limit: '50mb'}));
//app.use(bodyParser.urlencoded({extended: true, limit: '50mb'}));
//app.use(bodyParser({limit: '50mb'}));

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

//let currentDate = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
let currentDate = new Date().toISOString().replace('T', ' ').substring(0, 19);

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

		
		let sqlRegister = "INSERT INTO tbl_users (fieldName, fieldLastName, fieldEmail, fieldPassword, fieldOption) VALUES ('"+request.body.fname+"', '"+request.body.lname+"', '"+request.body.email+"', '"+request.body.password+"', 'OPEN')";
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
		
		let sqlDocument = "UPDATE tbl_documents SET fieldName = '"+request.body.documentsName+"', fieldData = '"+request.body.documentDataGet+"', fieldLastDate = '"+currentDate+"' WHERE fieldId = '"+request.body.documentsId+"'";
		connection.query(sqlDocument, function (err, result) {
			if (err) {
				console.log('DocumnetUpdate sql error',err);
				error.data = err;
				response.send(err);
			}else {
				console.log('DocumnetUpdate success');
				success.data = result;
				response.send(result);
			}
		  });
});

app.post("/DocumnetAdd", function(request, response){
		console.log('request ',request.body.documentsName)
		let sqlRegister = "INSERT INTO tbl_documents (fieldName, fieldUserId, fieldData, fieldDate, fieldLastDate, fieldFolder) VALUES ('"+request.body.documentsName+"', '"+request.body.userId+"', '"+request.body.documentDataGet+"', '"+currentDate+"', '"+currentDate+"', '1')";
		connection.query(sqlRegister, function (err, result) {
			if (err) {
				console.log('DocumnetAdd sql error',err);
				error.data = err;
				response.send(err);
			}else {
				console.log('DocumnetAdd success');
				success.data = result;
				response.send(result);
			}
		  });
});

app.get("/DocumentDelete", function(request, response){
	let urlQuery = url.parse(request.url, true);
	let queryData = urlQuery.query;
    console.log("DocumnetDelete ID : "+queryData.id);
		const deleteQuery = "DELETE FROM tbl_documents WHERE fieldId = '"+queryData.id+"'";
		connection.query(deleteQuery, function (err, result) {
			if (err) {
				console.log('DocumnetDelete sql error');
				error.data = err;
				response.send(err);
			}else{
				console.log('DocumnetDelete success');
				success.data = result;
				response.send(result);
			}
		  });
});

app.get("/DocumentShare", function(request, response){
	let urlQuery = url.parse(request.url, true);
	let queryData = urlQuery.query;
    console.log("DocumentShare ID : "+queryData.id);
	let sqlDocument = "UPDATE tbl_documents SET fieldOption = '"+queryData.option+"' WHERE fieldId = '"+queryData.id+"'";
	connection.query(sqlDocument, function (err, result) {
		if (err) {
			console.log('DocumentShare sql error');
			error.data = err;
			response.send(err);
		}else {
			console.log('DocumentShare success');
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

app.get("/Share", function(request, response){

		connection.query("SELECT * FROM tbl_documents WHERE fieldOption = 'Share'", function (err, result, fields) {
			if (err) {
				console.log('DocumnetShare sql error');
				error.data = err;
				response.send(err);
			}else if(result.length >= 1){
				console.log('DocumnetShare success');
				success.data = result;
				response.send(result);
			}else{
				response.send(error);
			}
		  });
});

app.get("/Dashbord", function(request, response){
	let date = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
    response.send("dashbord"+date);
});

app.get("/Profile", function(request, response){
		let urlQuery = url.parse(request.url, true);
	let queryData = urlQuery.query;
    console.log("User : "+queryData.id);
	
		connection.query("SELECT * FROM tbl_users WHERE fieldId = '"+queryData.id+"'", function (err, result) {
			if (err) {
				console.log('sql error');
				error.data = err;
				response.send(error);
			}else {
				console.log('Profile check success');
				success.data = result;
				response.send(result);
			}
		  });
	
});

app.put("/ProfileUpdate", function(request, response){
		console.log('request ',request.body.firstName)
		
		let sqlDocument = "UPDATE tbl_users SET fieldName = '"+request.body.firstName+"', fieldLastName = '"+request.body.lastName+"', fieldEmail = '"+request.body.profileEmail+"', fieldPassword = '"+request.body.profilePassword+"' WHERE fieldId = '"+request.body.userId+"'";
		connection.query(sqlDocument, function (err, result) {
			if (err) {
				console.log('ProfileUpdate sql error',err);
				error.data = err;
				response.send(err);
			}else {
				console.log('ProfileUpdate success');
				success.data = result;
				response.send(result);
			}
		  });
});


app.listen(port, host, () => {
	console.log("Server is running at port : " + port);
});