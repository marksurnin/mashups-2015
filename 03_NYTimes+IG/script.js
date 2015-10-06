function combine(NYTimesData, InstaData) {
  for (var i = 0; i < NYTimesData.length; i++) {
    var news_item = '<div><a href="' + articles[i].web_url + '"">' + articles[i].headline.main + '</p><img src';
    $('#main').append(news_item);
  }
}

function getInstaData(){
  var url = 'https://api.instagram.com/v1/tags/nyuad/media/recent?client_id=d647196459e2488fb0c486bdfb83e905';

  $.ajax({
    type: 'GET',
    dataType: 'jsonp',
    url: url,
    error: function(data) {
      console.log('We have problems:', data);
    },
    success: function(json) {
      console.log(json);
      images = json.data;
      
    }
  });
}

function getNYTimesData(){
  var url = 'http://api.nytimes.com/svc/search/v2/articlesearch.json?q=new+york+times&page=0&sort=newest&api-key=0efc6080e91bc7649180dea1ed694eb9:15:73071440';

  $.ajax({
    type: 'GET',
    dataType: 'json',
    url: url,
    error: function(data) {
      console.log('We have problems:', data);
    },
    success: function(json) {
      console.log(json);
      return json.response.docs;

      
        // console.log(articles[i].headline.main);
        
      }
    }
  });
}

$(document).ready(function(){
  console.log(0);
  getNYTimesData();
});