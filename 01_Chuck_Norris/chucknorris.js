function getData () {
  var input = document.getElementById('input');
  var name = input.value;
  var firstName = input.value.split(' ')[0];

  var url = 'http://api.icndb.com/jokes/random';

  $.getJSON(url,
    function(chuckNorrify){
      var joke = chuckNorrify.value.joke;
      joke = joke.replace(/Chuck Norris/g, name);
      joke = joke.replace(/Chuck/g, firstName);

      $.getJSON('https://api.genderize.io/?name=' + firstName,
        function(genderize) {
          console.log(joke, genderize);
          if (genderize.gender == 'female') {
            joke = joke.replace(/ he/g, ' she');
            joke = joke.replace(/He/g, 'She');
            joke = joke.replace(/ him/g, ' her');
            joke = joke.replace(/ his/g, ' her');
            joke = joke.replace(/His/g, 'Her');
          }

          document.getElementById('joke').innerHTML = joke;
        });
    }
  );
}

$("input").keypress(function(event) {
    if (event.which == 13) {
        event.preventDefault();
        getData();
    }
});