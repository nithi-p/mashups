function getmapData(searchTerm){
	var mapURL = 'https://maps.googleapis.com/maps/api/place/textsearch/json?query=';
	var searchURL = mapURL + searchTerm + '&key=AIzaSyCYpdbTWMbgVmq-zT_2kUKCusKv91TjiBM';
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
			// var totalResults = data[1].length;
			// var theNames = data[1];
			// var theLinks = data[3];

			// console.log(theNames);
			// var theHTMLString = '<ol>';
			// for (var i=0; i<totalResults; i++){
			// 	var currentName = theNames[i];
			// 	var currentLink = theLinks[i];

			// 	console.log(currentName+currentLink+"\n");

			// 	theHTMLString += '<li><a href="' + currentLink + ' "> ' + currentName + '</a></li>';

			// }
			// theHTMLString += '</ol>';


			// $('#theResult').append(theHTMLString);


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