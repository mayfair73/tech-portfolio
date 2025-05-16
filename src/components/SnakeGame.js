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
  let dx = 0  // Start with no movement
  let dy = 0
  let gameLoop
  let snakeGame = true

  function drawGame() {
    // Clear canvas
    ctx.fillStyle = '#000'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Draw food
    ctx.fillStyle = 'red'
    ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize - 2, gridSize - 2)

    // Only move if direction is set
    if (dx !== 0 || dy !== 0) {
      const head = { x: snake[0].x + dx, y: snake[0].y + dy }

      // Check for collisions
      if (
        head.x < 0 || head.x >= tileCount ||
        head.y < 0 || head.y >= tileCount ||
        snake.some(segment => segment.x === head.x && segment.y === head.y)
      ) {
        clearInterval(gameLoop)
        alert('Game Over! Page will refresh for a new game.')
        closeGame()
        // Refresh the page after a short delay
        setTimeout(() => {
          window.location.reload()
        }, 500)
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
    }

    // Draw snake
    ctx.fillStyle = 'lime'
    for (let part of snake) {
      ctx.fillRect(part.x * gridSize, part.y * gridSize, gridSize - 2, gridSize - 2)
    }
  }

  function closeGame() {
    window.snakeGame = false
    clearInterval(gameLoop)
    container.classList.remove('snake-game')
    container.classList.add('snake-hidden')
    container.innerHTML = ''
  }

  // Keyboard control
  function handleKeyDown(e) {
    switch (e.key) {
      case 'ArrowUp': if (dy !== 1) { dx = 0; dy = -1 }; break
      case 'ArrowDown': if (dy !== -1) { dx = 0; dy = 1 }; break
      case 'ArrowLeft': if (dx !== 1) { dx = -1; dy = 0 }; break
      case 'ArrowRight': if (dx !== -1) { dx = 1; dy = 0 }; break
      case 'Escape': 
        document.removeEventListener('keydown', handleKeyDown)
        closeGame()
        break
    }
  }
  
  document.addEventListener('keydown', handleKeyDown)

  // Mobile controls
  container.querySelector('.up').addEventListener('click', () => { if (dy !== 1) { dx = 0; dy = -1 } })
  container.querySelector('.down').addEventListener('click', () => { if (dy !== -1) { dx = 0; dy = 1 } })
  container.querySelector('.left').addEventListener('click', () => { if (dx !== 1) { dx = -1; dy = 0 } })
  container.querySelector('.right').addEventListener('click', () => { if (dx !== -1) { dx = 1; dy = 0 } })

  document.getElementById('close-snake-game').addEventListener('click', () => {
    document.removeEventListener('keydown', handleKeyDown)
    closeGame()
  })

  // Start game
  gameLoop = setInterval(drawGame, 100)
  
  // Draw initial state
  drawGame()
  
  // Add starting instruction
  ctx.fillStyle = 'white'
  ctx.font = '12px Arial'
  ctx.textAlign = 'center'
  ctx.fillText('Use arrow keys to start moving', canvas.width / 2, canvas.height / 2 + 30)
}