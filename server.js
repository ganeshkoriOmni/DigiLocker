
let host = "localhost";
let port = 2016;
const cors = require('cors');
let express = require("express");
let url = require('url');
var mysql      = require('mysql');


let app = express();
app.use(express.static(__dirname + "/public")); //use static files in ROOT/public folder


var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'digi_locker'
});
 

 


let success = {
	data : '',
	status : 'Success',
	code : '200'
}

let error = {
	data : '',
	status : 'Success',
	code : '304'
}

const getQueryData = (request) => {
	
}


app.use(cors());

app.get("/", function(request, response){	
    response.send("Hello!!");
});

app.post("/login", function(request, response){ //Login Form
	
	let urlQuery = url.parse(request.url, true);
	let queryData = urlQuery.query;
	
	success.data = JSON.stringify(queryData);
	console.log(JSON.stringify(queryData.email));
    response.send(JSON.stringify(success));
});

app.get("/dashbord", function(request, response){
    response.send("dashbord");
});



app.listen(port, host, () => {
	console.log("Server is running at port : " + port);
});