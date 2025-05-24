const winCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
]

const cols = document.querySelectorAll('.col')
const reset = document.getElementById('reset')
const statusDisplay = document.getElementById('status')

let currentPlayer = 'X'
let gameActive = true

// Инициализация игры
handleEvent(true)

function handleEvent(start) {
  reset.addEventListener('click', resetGame)
  cols.forEach((col) => {
    col[start ? 'addEventListener' : 'removeEventListener']('click', play)
  })
}

function play(e) {
  const target = e.target
  if (!target.textContent && gameActive) {
    target.textContent = currentPlayer
    target.classList.add(currentPlayer)

    if (checkWin()) {
      gameActive = false
      highlightWin(getWinCombination())
      updateStatus()
      return
    }

    if (checkDraw()) {
      gameActive = false
      updateStatus()
      return
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X'
    updateStatus()
  }
}

function checkWin() {
  return winCombinations.some((comb) =>
    comb.every((index) => cols[index].textContent === currentPlayer)
  )
}

function getWinCombination() {
  return winCombinations.find((comb) =>
    comb.every((index) => cols[index].textContent === currentPlayer)
  )
}

function checkDraw() {
  return [...cols].every((col) => col.textContent)
}

function resetGame() {
  cols.forEach((col) => {
    col.style.opacity = '0'
    col.classList.remove('X', 'O', 'win-combination')
  })

  setTimeout(() => {
    cols.forEach((col) => {
      col.textContent = ''
      col.style.opacity = '1'
      col.style.backgroundColor = ''
    })

    currentPlayer = 'X'
    gameActive = true
    updateStatus()
  }, 300)
}

function highlightWin(combination) {
  combination.forEach((index) => {
    cols[index].classList.add('win-combination')
  })
}

function updateStatus() {
  if (checkWin()) {
    statusDisplay.textContent = `Победил ${currentPlayer}!`
  } else if (checkDraw()) {
    statusDisplay.textContent = 'Ничья!'
  } else {
    statusDisplay.textContent = `Ход игрока ${currentPlayer}`
  }
}
