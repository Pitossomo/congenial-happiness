var canvas = document.getElementById('gameCanvas');
var context = canvas.getContext('2d');
var blockSize = 20;
var snake = [{x: 0, y: 0}];
var food = {x: 0, y: 0};
var direction = 'right';

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
}

function update() {
  // Move snake
  var head = {x: snake[0].x, y: snake[0].y};

  if (direction === 'right') head.x += blockSize;
  if (direction === 'left') head.x -= blockSize;
  if (direction === 'up') head.y -= blockSize;
  if (direction === 'down') head.y += blockSize;

  snake.unshift(head);

  // Check collision with food
  if (head.x === food.x && head.y === food.y) {
    generateFood();
  } else {
    snake.pop();
  }

  // Check collision with walls
  if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height) {
    clearInterval(gameLoop);
    alert('Game over!');
  }

  // Check collision with self
  for (var i = 1; i < snake.length; i++) {
    if (head.x === snake[i].x && head.y === snake[i].y) {
      clearInterval(gameLoop);
      alert('Game over!');
      break;
    }
  }

  draw();
}

// Handle keyboard input
document.addEventListener('keydown', function(event) {
  if (event.keyCode === 37 && direction !== 'right') direction = 'left';
  if (event.keyCode === 38 && direction !== 'down') direction = 'up';
  if (event.keyCode === 39 && direction !== 'left') direction = 'right';
  if (event.keyCode === 40 && direction !== 'up') direction = 'down';
});

generateFood();
var gameLoop = setInterval(update, 100);
