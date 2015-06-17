function makeHTML(headline, imageURL){
	var theHTMLString = '<p>' + headline + '</p>';


	theHTMLString += '<img src="' + imageURL + '">';
	return theHTMLString;

}

function getInstagramData(theNYTimesObj){
	console.log("Going to get a photo!");
	//console.log(theNYTimesObj);

	var tagName = theNYTimesObj.news_desk || "news";

	var apiKey = 'fa2a86adcf89434baea1d1b560f6267b';
	var instagramURL = 'https://api.instagram.com/v1/tags/'+ tagName + '/media/recent?client_id=';

	var seachInstagramURL = instagramURL + apiKey;

	$.ajax({
		url: seachInstagramURL,
		type: 'GET',
		dataType: 'jsonp',
		error : function(err){
			console.log("Tears");
			console.log(err);
		},
		success: function(theData){
			console.log("yes!!");
			console.log(theData);


			console.log(theData.data[0].images.low_resolution.url);

			var theImage = theData.data[0].images.low_resolution.url;
			var theHeadline = theNYTimesObj.headline.main;
			var theHTML = makeHTML(theHeadline, theImage);
			$('#container').append(theHTML);



		}

	});

}



function getNYTimesData(){
	console.log("About to get NYTimes data");
	var nyTimesURL = 'http://api.nytimes.com/svc/search/v2/articlesearch.json?q=new+york+times&page=2&sort=oldest&api-key=';
	var apiKEY = "da4296185b3ce7acf15ae8680a643105%3A8%3A72241595";
	var searchNYTimesURL = nyTimesURL +apiKEY;


	$.ajax({
		url: searchNYTimesURL,
		type: 'GET',
		dataType: 'json',
		error: function(err){
			console.log("Oh no");
			console.log(err);
		},
		success: function(theData){
			//console.log("Hooray");
			//console.log(theData.response.docs);
			var nyTimesArticles = theData.response.docs; // THIS IS ARRAY


			//$('#container').html(''); // clear everything in container dom
			for (var i = 0; i < nyTimesArticles.length; i++){
				//console.log(nyTimesArticles[i].headline.main);
				// var theCurrentHeadline = nyTimesArticles[i].headline.main;
				// var theHTML = makeHTML(theCurrentHeadline);
				getInstagramData(nyTimesArticles[i]);


				
				// $('#container').append(theHTML);
			}




		}


	});

}


$(document).ready(function(){
	console.log("ready");
	getNYTimesData();


	// $('#seachButton').click(function(){

	// 	var theInput = $('#theInputBox').val(); // GRAB THE ELEMENT AND RETURN THE "VALUE" USING JQUERY STYLE
	// 	console.log(theInput);
	// 	getmapData(theInput);

	// });








});



