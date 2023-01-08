const canvas = document.getElementById('snake-canvas');
const ctx = canvas.getContext('2d');

let snake = [{ x: 10, y: 10 }, { x: 10, y: 10 }, { x: 10, y: 10 }, { x: 10, y: 10 }, { x: 10, y: 10 }];
let dx = 10;
let dy = 0;
let food = { x: 100, y: 100 };

fillRect     = (x, y, sx, sy, color) => {ctx.fillStyle = color; ctx.fillRect(x, y, sx, sy)};
randomCoords = (size)                => Math.floor(Math.random() * (size / 10 - 1)) * 10

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  snake.forEach((part, i) => fillRect(part.x, part.y, 10, 10, `rgb(${(255 / snake.length) * (snake.length - i)}, 0, 0)`));
  fillRect(food.x, food.y, 10, 10, 'blue')
}

function update() {
  const newHead = { x: snake[0].x + dx, y: snake[0].y + dy };
  snake.unshift(newHead);
  newHead.x === food.x && newHead.y === food.y ? food = {
    x: randomCoords(canvas.width),
    y: randomCoords(canvas.height),
  } : snake.pop();
  newHead.x < 0 || newHead.x >= canvas.width || newHead.y < 0 || newHead.y >= canvas.height ? clearInterval(interval) : '';
  snake.slice(1).some((part) => part.x === newHead.x && part.y === newHead.y) ? clearInterval(interval) : '';
}

document.addEventListener('keydown', (event) => {
  dx = event.key === 'ArrowLeft' ? -10 : event.key === 'ArrowRight' ? 10 : 0;
  dy = event.key === 'ArrowUp'   ? -10 : event.key === 'ArrowDown'  ? 10 : 0;
});

interval = setInterval(() => {
  update();
  draw();
}, 100);
