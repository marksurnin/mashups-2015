var map;
var photos = [];
var markers = [];
var warning = false;
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
      if (input == 'Abu Dhabi') {
        map.setCenter({lat: 24.4562117, lng: 54.3781501});
        map.setZoom(13);
      } else {
        map.setCenter({lat: json.results[0].geometry.location.lat, lng: json.results[0].geometry.location.lng});
        map.setZoom(13);
      }
      
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
          console.log('json: ', json);
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
    zoom: 13
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
  markers.push(marker);
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
  var mapCenter = {
    H: map.center.lat(),
    L: map.center.lng()
  }

  /*
  Create a coorinate grid to increase search radius:
  0 1 2
  3 4 5
  6 7 8
  where 4 is the mapCenter
  */
  var centers = Array(9);

  for (var i = 0; i < centers.length; ++i) {
    if (centers[i] == null) {
      centers[i] = {};
    }
    centers[i] = {H: mapCenter.H, L: mapCenter.L};
    // Latitude shift
    if (i < 3) {
      centers[i].H += 0.07;
    } else if (i > 5) {
      centers[i].H -= 0.07;
    }

    // Longitude shift
    if (i % 3 == 0) {
      centers[i].L -= 0.07;
    } else if (i % 3 == 2) {
      centers[i].L += 0.07;
    }

    getInstaData(centers[i], function(err, photoData) {
      for (var i = 0; i < photoData.length; i++) {
        var photo = photoData[i];
        drawMarker(photo);
      }
    });
  }
}

function removeMarkers() {
  var not = 0;
  for (var i = 0; i < markers.length; ++i) {
    if (!map.getBounds().contains(markers[i].getPosition())) {
      not += 1;
      markers[i].setMap(null);
      markers.splice(i, 1);
    }
  }
  console.log('removed' + not);
}

$(document).ready(function(){
  initMap();
  // getMarkers();
  google.maps.event.addListener(map,'idle',function() {
    if (map.zoom > 12) {
      getMarkers();
      removeMarkers();
      console.log(photos.length);
      $('#warning').remove();
      warning = false;
    } else {
      if (!warning) {
        $('#about').append('<p id="warning">Please zoom in.</p>');
        warning = true;
      }
    }
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