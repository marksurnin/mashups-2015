var trackId;

SC.initialize({
  client_id: '36010e9d028978e83e30fab2064c04cb'
});

function streamTrack(id) {
  console.log('Streaming ', id);
  streamUrl = '/tracks/' + id;
  SC.stream(streamUrl).then(function(player){
    player.play();
  });
}

function searchTracks() {
  var input = $('input').val();
  SC.get('/tracks', {
    q: input
  }).then(function(tracks) {
    for (var i = 0; i < tracks.length; i++) {
        console.log(tracks[i]);
        var result = '<a class="result" id="' + tracks[i].id + '" href="javascript:trackId =' + tracks[i].id + ';streamTrack(' + tracks[i].id + ');">' + tracks[i].title + '</a><br>';
        $('#results').append(result);
      }
  });
}

$(document).ready(function(){
  $('input').keypress(function(event) {
      if (event.which == 13) {
          event.preventDefault();
          $('#results').html('');
          searchTracks();
      }
  });
});