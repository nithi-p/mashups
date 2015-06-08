function getmapData(searchTerm){
	var mapURL = 'http://api.nytimes.com/svc/search/v2/articlesearch.json?q=';
	var searchURL = mapURL + searchTerm + '&sort=newest&api-key=da4296185b3ce7acf15ae8680a643105%3A8%3A72241595';
	console.log(searchURL);


	//$.ajax({ create object here });
	$.ajax({   // SET UP AJAX
		url: searchURL,
		type: 'GET',
		dataType: 'json', //different API --> different dataType
		error: function(data){
			console.log("We got problems");
			console.log(data);
		},
		success: function(data){
			console.log("WooHoo!!!");
			console.log(data);

			//var theOriginalSearchTerm = data[0];
			var totalResults = data.response.docs.length;
			console.log(totalResults);


			var theHTMLString = '<ol>';
			for (var i=0; i<totalResults; i++){
			 //var currentPic = data.response.docs[i].multimedia[1].url;
			 var currentHead = data.response.docs[i].headline.main;

			// // 	console.log(currentName+currentLink+"\n");

			 theHTMLString += '<li>' + currentHead + '</li>';

			}
			theHTMLString += '</ol>';


			$('#theResult').append(theHTMLString);


		}
	}); // END SET UP AJAX




}








console.log("1");
$(document).ready(function(){  //JQUERY TO CHECK IF HTML&CODE IS LOADED


	//SET UP EVENT LISTENERS


	$('#mapButton').click(function(){

		var theInput = $('#theInputBox').val(); // GRAB THE ELEMENT AND RETURN THE "VALUE" USING JQUERY STYLE
		console.log(theInput);
		getmapData(theInput);

	});


console.log("2");


});


console.log("3");