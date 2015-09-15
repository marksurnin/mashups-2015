function triangle() {
  var arr = [];
  for (i = 1; i < 8; i++) {
    arr.push('#');
    console.log(arr.join(''));
  }
}

function fizzBuzz() {
  for (i = 1; i < 101; i++) {
    switch (true) {
      case (i % 5 == 0 && i % 3 == 0):
        console.log('FizzBuzz');
        break;
      case (i % 3 == 0):
        console.log('Fizz');
        break;
      case (i % 5 == 0):
        console.log('Buzz');
        break;
      default:
        console.log(i);
        break;
    }
  }
}

function chessBoard(size) {
  board = '';

  for (i = 0; i < size; i++) {
    for (j = 0; j < size; j++) {
      if ((i + j) % 2== 0) {
        board += ' ';
      } else {
        board += '#';
      }
    }
    board += '\n';
  }
  console.log(board);
}