var map;
var photos = [];
console.log(photos.length);
var first_run = true; // used to append all photos to photos array on first run (line 34)

function getInputValue() {
  return document.getElementById('input').value;
}

function centerMapOnInput(input) {
  $.ajax({
    type: 'GET',
    dataType: 'json',
    url: 'https://maps.googleapis.com/maps/api/geocode/json?address=' + input + '&key=AIzaSyAdIFyEoqfmK13GDQoT37Lt2AQOZOmnRQI',
    error: function(json) {
      console.log('We have problems:', json);
    },
    success: function(json) {
      map.setCenter({lat: json.results[0].geometry.location.lat, lng: json.results[0].geometry.location.lng});
      map.setZoom(15); // reset zoom
    }
  });
}

function getInstaData(LatLng, cb) {
  $.ajax({
    type: 'GET',
    dataType: 'jsonp',
    url: 'https://api.instagram.com/v1/media/search?lat=' + LatLng.H + '&lng=' + LatLng.L + '&access_token=364134066.d647196.99cf78533128459c9088c0219e46a498&count=100&distance=5000',
    error: function(data) {
      console.log('We have problems:', data);
    },
    success: function(json) {
      if (first_run) {
          photos = json.data;
          first_run = false;
        } else {
          for (var i = 0; i < json.data.length; i++) {
             if (photos.indexOf(json.data[i]) === -1) {
              photos.push(json.data[i]);
            }
          }
        }      
      cb(null, photos); // callback function
    }
  });
}

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 51.5065699, lng: -0.1276912},
    zoom: 15
  });
}

function drawMarker(photo) {
  var infowindow = new google.maps.InfoWindow({
    content: '<img border="0" src="' + photo.images.thumbnail.url +'">'
  });
  var marker = new google.maps.Marker({
    position: {lat: photo.location.latitude, lng: photo.location.longitude},
    map: map,
  });
  marker.addListener('mouseover', function() {
    infowindow.open(map, marker);
  });
  marker.addListener('mouseout', function() {
    infowindow.close();
  });
  marker.addListener('click', function() {
    window.open(photo.link, '_blank');
  });
}

function getMarkers() {
  getInstaData(map.getCenter(), function(err, photos) {
    for (var i = 0; i < photos.length; i++) {
      var photo = photos[i];
      drawMarker(photo);
    }
  });
}

$(document).ready(function(){
  initMap();
  getMarkers();
  google.maps.event.addListener(map,'center_changed',function() {
    getMarkers();
  });

  // search location and center map when enter is pressed
  $("input").keypress(function(event) {
    if (event.which == 13) {
        event.preventDefault();
        input = getInputValue();
        centerMapOnInput(input);
    }
  });
});