
 function   sendPlace(theLat,theLon){
  console.log(theLat);
  console.log(theLon);
 }

 function getmapData(theLat,theLon){
  var getlat = theLat;
  var getlon = theLon;
  var mapURL = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=';
  var searchURL = mapURL + theLat +','+ theLon + '&key=AIzaSyCYpdbTWMbgVmq-zT_2kUKCusKv91TjiBM';
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
    }
  }); // END SET UP AJAX


}



function initialize() {





  var mapOptions = {
    zoom: 17
  };
  map = new google.maps.Map(document.getElementById('map-canvas'),
      mapOptions);

  var contentString = 
      '<h1 id="firstHeading" class="firstHeading">IS THIS YOUR LOCATION?</h1>'+
      '<div id="bodyContent">'+
      '<button id="save">YES</button>'+
      '</div>';

  // Try HTML5 geolocation
  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = new google.maps.LatLng(position.coords.latitude,
                                       position.coords.longitude);

      //sendPlace('null','null',position.coords.latitude,position.coords.longitude);
      getmapData(position.coords.latitude,position.coords.longitude);


      var infowindow = new google.maps.InfoWindow({
        map: map,
        position: pos,
        content: contentString
      });

      map.setCenter(pos);


        /*  var marker = new google.maps.Marker({
                  position: pos,
                  map: map,
                  title: 'Hello World!'
            });*/

            google.maps.event.addListener(map, 'center_changed', function() {
                // 0.1 seconds after the center of the map has changed,
                // set back the marker position.
               window.setTimeout(function() {
                  var center = map.getCenter();
                  //marker.setPosition(center);
                  infowindow.setPosition(center);
                  sendPlace(center.A,center.F);
                  //getmapData(center.A,center.F);
               }, 0);
                
            });









    }, function() {
      handleNoGeolocation(true);
    });
  } else {
    // Browser doesn't support Geolocation
    handleNoGeolocation(false);
  }




  

  var input = /** @type {HTMLInputElement} */(
      document.getElementById('pac-input'));

  var types = document.getElementById('type-selector');
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(types);

  var autocomplete = new google.maps.places.Autocomplete(input);
  autocomplete.bindTo('bounds', map);

  var infowindow = new google.maps.InfoWindow();
  var marker = new google.maps.Marker({
    map: map,
    anchorPoint: new google.maps.Point(0, -29)
  });

  google.maps.event.addListener(autocomplete, 'place_changed', function() {
    infowindow.close();
    marker.setVisible(false);
    var place = autocomplete.getPlace();
    if (!place.geometry) {
      window.alert("Autocomplete's returned place contains no geometry");
      return;
    }

    // If the place has a geometry, then present it on a map.
    if (place.geometry.viewport) {
      map.fitBounds(place.geometry.viewport);
    } else {
      map.setCenter(place.geometry.location);
      map.setZoom(17);  // Why 17? Because it looks good.
    }
    marker.setIcon(/** @type {google.maps.Icon} */({
      url: place.icon,
      size: new google.maps.Size(71, 71),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(17, 34),
      scaledSize: new google.maps.Size(35, 35)
    }));
    marker.setPosition(place.geometry.location);
    marker.setVisible(true);

    var address = '';
    if (place.address_components) {
      address = [
        (place.address_components[0] && place.address_components[0].short_name || ''),
        (place.address_components[1] && place.address_components[1].short_name || ''),
        (place.address_components[2] && place.address_components[2].short_name || '')
      ].join(' ');
    }

  /*  infowindow.setContent('<div><strong>' + place.name + '</strong><br>' + address);
    infowindow.open(map, marker);*/
    
    //sendPlace(place.name,address,place.geometry.location.A,place.geometry.location.F); //send data

  });



  // Sets a listener on a radio button to change the filter type on Places
  // Autocomplete.
/*  function setupClickListener(id, types) {
    var radioButton = document.getElementById(id);
    google.maps.event.addDomListener(radioButton, 'click', function() {
      autocomplete.setTypes(types);
    });
  }

  setupClickListener('changetype-all', []);
  setupClickListener('changetype-address', ['address']);
  setupClickListener('changetype-establishment', ['establishment']);
  setupClickListener('changetype-geocode', ['geocode']);*/



} // end initialize



function handleNoGeolocation(errorFlag) {
  if (errorFlag) {
    var content = 'Error: The Geolocation service failed.';
  } else {
    var content = 'Error: Your browser doesn\'t support geolocation.';
  }

  var options = {
    map: map,
    position: new google.maps.LatLng(60, 105),
    content: content
  };

  var infowindow = new google.maps.InfoWindow(options);
  map.setCenter(options.position);
}





google.maps.event.addDomListener(window, 'load', initialize);



