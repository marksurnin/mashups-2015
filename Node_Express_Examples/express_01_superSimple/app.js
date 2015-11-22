//Set up requirements
var express = require('express');
//Create an 'express' object
var app = express();

//Declare a route
app.get('/', function(request, response){
	response.send('We are good to go!');
});

app.get('/:term', function(request, response){
  console.log(request.params);
  console.log(request.query);
  response.send('The first term!');
});

app.get('/about/:person', function(request, response){
  console.log(request.params);
  console.log(request.query);
  response.send('The first about me page!');
});

app.get('/about/:person/:city', function(request, response){
  console.log(request.params);
  console.log(request.query);
  response.send('The first about city page!');
});

//Start the server
app.listen(9000);
//Write a message to the TERMINAL CONSOLE
console.log("Express App running at localhost:3000");