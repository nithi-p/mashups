//Set up requirements
var express = require("express");
var Request = require('request');
//var logger = require('morgan'); // morgan makes color code in console

//Create an 'express' object
var app = express();

//Some Middleware - log requests to the terminal console
//app.use(logger('dev'));

//Set up the views directory
app.set("views", __dirname);
//Set EJS as templating language WITH html as an extension
app.engine('.html', require('ejs').__express);
app.set('view engine', 'html');
//Add connection to the public folder for css & js files
app.use(express.static(__dirname + '/public'));

//ROUTES
app.get("/", function(request, response){
	var dataForThePage = {
		message : 'Try adding " / " and keyword to the url'
	};
	response.render('home', dataForThePage);
});

app.get("/:word", function(request, response){
	var currentWord = request.params.word;
	var dataForThePage = {
		message: currentWord
	};
	response.render('index', dataForThePage);
	console.log(currentWord);
});



//JSON Serving route
app.get("/api/:word", function(req, res){
	//CORS enable this route - http://enable-cors.org/server.html
	res.header('Access-Control-Allow-Origin', "*");
	var currentWord = req.params.word;
	var requestURL = "http://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + currentWord + '&sort=newest&api-key=da4296185b3ce7acf15ae8680a643105%3A8%3A72241595';
	Request(requestURL, function (error, response, body) {
		if (!error && response.statusCode == 200) {
			//console.log(body);
			var theData = JSON.parse(body);
			//console.log(theData);
			res.json(theData);
		}
	});
});


app.get("*", function(request, response){
	var dataForThePage = {
		message: "Sorry..."
	};
	response.render('404', dataForThePage);

});

// Start the server
app.listen(3000);
console.log('Express started on port 3000');
