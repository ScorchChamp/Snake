window.addEventListener("load", function () {
  const canvas = document.getElementById('snake-canvas');
  const parent = document.getElementById("snake-container");
  const ctx = canvas.getContext('2d');
  canvas.width = parent.offsetWidth;
  canvas.height = parent.offsetHeight;

  fillRect = (x, y, sx, sy, color) => { ctx.fillStyle = color; ctx.fillRect(x, y, sx, sy) };
  randomCoords = (size) => Math.floor(Math.random() * (size / bS - 1)) * bS

  let bS = 10;
  let snake = [{ x: bS, y: bS }, { x: bS, y: bS }, { x: bS, y: bS }, { x: bS, y: bS }, { x: bS, y: bS }];
  let dx = bS;
  let dy = 0;
  let food = { x: randomCoords(canvas.width), y: randomCoords(canvas.height), };

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    snake.forEach((part, i) => fillRect(part.x, part.y, bS, bS, `rgb(${(255 / snake.length) * (snake.length - i)}, 0, 0)`));
    fillRect(food.x, food.y, bS, bS, 'blue')
  }

  function update() {
    const newHead = { x: snake[0].x + dx, y: snake[0].y + dy };
    snake.unshift(newHead);
    (newHead.x === food.x && newHead.y === food.y) ? food = {
      x: randomCoords(canvas.width),
      y: randomCoords(canvas.height),
    } : snake.pop();
    (newHead.x < 0 || newHead.x >= canvas.width || newHead.y < 0 || newHead.y >= canvas.height) ? clearInterval(interval) : '';
    snake.slice(1).some((part) => part.x === newHead.x && part.y === newHead.y) ? clearInterval(interval) : '';
  }

  document.addEventListener('keydown', (event) => {
    dx = event.key === 'ArrowLeft' ? -bS : event.key === 'ArrowRight' ? bS : 0;
    dy = event.key === 'ArrowUp' ? -bS : event.key === 'ArrowDown' ? bS : 0;
  });

  interval = setInterval(() => { update(); draw(); }, 100);
});
