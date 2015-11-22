//Set up requirements
var http = require("http");

// Build the server
var app = http.createServer(function(request, response) {
	response.write(200, "<html><body><div id='root'></div><script src='../build/client.js'</script>React.render(ReactDOM.render(<App />, document.getElementById('root'));)</html>");
});

// Start the server
app.listen(4000, "localhost");
//Write a message to the TERMINAL CONSOLE
console.log("Server running at http://localhost:4000/");