var nyTimesData = [];

function createHTML(nyObj, igObj){
	console.log('Calling create HTML');

	var htmlString = '';

	htmlString +='<div class="box">';

	htmlString +='<img src=' + igObj.images.low_resolution.url + ' />';
	htmlString +='<div class="filter"></div>';
	htmlString +='</div>';


	htmlString +='<div class="original">';

	htmlString +='<img src=' + igObj.images.low_resolution.url + ' />';
	htmlString +='</div>';

	$('#container').append(htmlString);







}








function getInstagramData(searchTerm){
	console.log("Getting Instagram Data");

	console.log(searchTerm);

	var myInstaKey = 'fa2a86adcf89434baea1d1b560f6267b';
	var instagramURL = 'https://api.instagram.com/v1/tags/' + searchTerm + '/media/recent?client_id=' + myInstaKey;

	//Make AJAX Request
	$.ajax({
		url: instagramURL,
		type: 'GET',
		dataType: 'jsonp',
		error: function(error){
			console.log(error);
		},
		success: function(data){
			console.log('WooHoo');
			//console.log(data);

			var theFirstInstaObj = data.data[0];
			//Generate HTML
			createHTML(searchTerm,theFirstInstaObj);
		}
	});
}



$(document).ready(function(){
	console.log("We are ready!");


	$('#wikiButton').click(function(){

			$('#container').html('');

		var theInput = $('#theInputBox').val(); // GRAB THE ELEMENT AND RETURN THE "VALUE" USING JQUERY STYLE
		getInstagramData(theInput);

	});







});