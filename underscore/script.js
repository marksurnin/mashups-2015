var friend1 = {
  name: 'Mark',
  gender: 'm'
};

var friend2 = {
  name: 'Craig',
  gender: 'm'
};

var friend3 = {
  name: 'Brooke',
  gender: 'f'
};

var friends = [friend1, friend2, friend3];

var maleFriends = [];
maleFriends = _.filter(friends, function(obj){
  return obj.gender == 'm';
});

var upperFriends = [];
upperFriends = _.map(friends, function(obj){
  return obj.name.toUpperCase();
});

setTimeout(function(){
  alert('5 seconds have passed');
}, 5000);

console.log('Que?');