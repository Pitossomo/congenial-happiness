var canvas = document.getElementById('gameCanvas');
var context = canvas.getContext('2d');
var blockSize = 10;
var snake = [{x: 0, y: 0}];
var food = {x: 0, y: 0};
var score = 0;
var direction = 'right';

const DIRECTION_MAP = {
  right: head => head.x += blockSize,
  left: head => head.x -= blockSize,
  up: head => head.y -= blockSize,
  down: head => head.y += blockSize
};

const DIRECTION_FROM_KEY_CODE = {
  37: 'left',
  38: 'up',
  39: 'right',
  40: 'down'
}

const OPPOSITE_DIRECTION = {
  'left': 'right',
  'right': 'left',
  'down': 'up',
  'up': 'down',
}    

function generateFood() {
  food.x = Math.floor(Math.random() * (canvas.width / blockSize)) * blockSize;
  food.y = Math.floor(Math.random() * (canvas.height / blockSize)) * blockSize;
}

function draw() {
  // Clear canvas
  context.clearRect(0, 0, canvas.width, canvas.height);

  // Draw snake
  snake.forEach(function(segment) {
    context.fillStyle = 'green';
    context.fillRect(segment.x, segment.y, blockSize, blockSize);
  });

  // Draw food
  context.fillStyle = 'red';
  context.fillRect(food.x, food.y, blockSize, blockSize);

  // Draw score counter
  context.fillStyle = 'black';
  context.font = '20px Arial';
  context.fillText('Score: ' + score, 10, 20);
}

function update() {
  // Move snake
  var head = {x: snake[0].x, y: snake[0].y};
  DIRECTION_MAP[direction](head)
  snake.unshift(head);

  // Check collision with food
  if (head.x === food.x && head.y === food.y) {
    generateFood();
    score++
  } else {
    snake.pop();
  }

  // Check collision with walls
  if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height) {
    clearInterval(gameLoop);
    alert('Game over! Your score: ' + score);
  }

  // Check collision with self
  for (var i = 1; i < snake.length; i++) {
    if (head.x === snake[i].x && head.y === snake[i].y) {
      clearInterval(gameLoop);
      alert('Game over! Your score: ' + score);
      break;
    }
  }

  draw();
}

// Handle keyboard input
document.addEventListener('keydown', function(event) {
  const newDirection = DIRECTION_FROM_KEY_CODE[event.keyCode]
  if (direction !== OPPOSITE_DIRECTION[newDirection]) direction = newDirection;
  console.log(newDirection + " ? " + OPPOSITE_DIRECTION[newDirection])
});

generateFood();
var gameLoop = setInterval(update, 100);
