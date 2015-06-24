


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


			var theHTMLString = '<div>';
			for (var i=0; i<totalResults; i++){
			 

			 
			 

			 var currentHead = data.response.docs[i].headline.main;

			// // 	console.log(currentName+currentLink+"\n");

			 theHTMLString += '<p>' + currentHead;
			 if (data.response.docs[i].multimedia.length !== 0){ 
			   var currentPic = data.response.docs[i].multimedia[1].url;
			   theHTMLString += '<br><br><img width="200" src="http://www.nytimes.com/' + currentPic + '""><br></p>';
			}else{

				theHTMLString +=  '<br></p>'
			}


			}
			theHTMLString += '</div>';


			$('#theResult').append(theHTMLString);


		}
	}); // END SET UP AJAX




}





var message;

$(document).ready(function(){
	
	console.log(message);
});



$(document).ready(function(){  //JQUERY TO CHECK IF HTML&CODE IS LOADED


	//SET UP EVENT LISTENERS
	message = $('#theMessage').html();


		getmapData(message);







});


