function getData() {
  var input = $('input').val();
  searchWiki(input);
}

function searchWiki(input) {
  var wikiUrl = 'http://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=';


  $.ajax({
    type: 'GET',
    dataType: 'jsonp',
    url: wikiUrl + input,
    error: function(data) {
      console.log('We have problems:');
    },
    success: function(data) {
      searchResults = data[1];
      searchLinks = data[3];
      for (var i=0; i < searchResults.length; i++) {
        console.log(searchResults[i]);
        var result = '<a class="searchLink" target="_blank" href=' + searchLinks[i] + '>' + searchResults[i] + '</a><br>';
        $('#results').append(result);
      }
    }
  });
}

$(document).ready(function(){
  $('input').keypress(function(event) {
    console.log(event.which);
      if (event.which == 13) {
          event.preventDefault();
          $('#results').html('');
          getData();
      }
  });  
});

// Google Instant Search