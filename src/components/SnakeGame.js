
export function startSnakeGame() {
  const container = document.getElementById('snake-game-container')
  container.classList.remove('snake-hidden')
  container.classList.add('snake-game')
  
  container.innerHTML = `
    <div class="snake-wrapper">
      <button id="close-snake-game" class="close-button">×</button>
      <canvas id="snake-canvas" width="300" height="300"></canvas>
      <div id="snake-controls" class="mobile-controls">
        <button class="up">↑</button>
        <button class="left">←</button>
        <button class="down">↓</button>
        <button class="right">→</button>
      </div>
    </div>
  `

  const canvas = document.getElementById('snake-canvas')
  const ctx = canvas.getContext('2d')

  const gridSize = 15
  const tileCount = canvas.width / gridSize
  let snake = [{ x: 10, y: 10 }]
  let food = { x: 5, y: 5 }
  let dx = 1
  let dy = 0
  let gameLoop

  function drawGame() {
    ctx.fillStyle = '#000'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    ctx.fillStyle = 'red'
    ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize - 2, gridSize - 2)

    const head = { x: snake[0].x + dx, y: snake[0].y + dy }

    if (
      head.x < 0 || head.x >= tileCount ||
      head.y < 0 || head.y >= tileCount ||
      snake.some(segment => segment.x === head.x && segment.y === head.y)
    ) {
      clearInterval(gameLoop)
      alert('Game Over!')
      closeGame()
      return
    }

    snake.unshift(head)

    if (head.x === food.x && head.y === food.y) {
      food = {
        x: Math.floor(Math.random() * tileCount),
        y: Math.floor(Math.random() * tileCount)
      }
    } else {
      snake.pop()
    }

    ctx.fillStyle = 'lime'
    for (let part of snake) {
      ctx.fillRect(part.x * gridSize, part.y * gridSize, gridSize - 2, gridSize - 2)
    }
  }

  function closeGame() {
    snakeGame = false
    clearInterval(gameLoop)
    container.classList.remove('snake-game')
    container.classList.add('snake-hidden')
    container.innerHTML = ''
  }

  // Tastaturkontrol
  document.addEventListener('keydown', handleKeyDown)
  function handleKeyDown(e) {
    switch (e.key) {
      case 'ArrowUp': if (dy === 0) { dx = 0; dy = -1 }; break
      case 'ArrowDown': if (dy === 0) { dx = 0; dy = 1 }; break
      case 'ArrowLeft': if (dx === 0) { dx = -1; dy = 0 }; break
      case 'ArrowRight': if (dx === 0) { dx = 1; dy = 0 }; break
    }
  }

  // Mobilkontroller
  container.querySelector('.up').addEventListener('click', () => { if (dy === 0) { dx = 0; dy = -1 } })
  container.querySelector('.down').addEventListener('click', () => { if (dy === 0) { dx = 0; dy = 1 } })
  container.querySelector('.left').addEventListener('click', () => { if (dx === 0) { dx = -1; dy = 0 } })
  container.querySelector('.right').addEventListener('click', () => { if (dx === 0) { dx = 1; dy = 0 } })

  document.getElementById('close-snake-game').addEventListener('click', () => {
    document.removeEventListener('keydown', handleKeyDown)
    closeGame()
  })

  gameLoop = setInterval(drawGame, 100)
  snakeGame = true
}
