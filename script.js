let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

const winConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

const boardElement = document.getElementById('board');
const resultElement = document.getElementById('result');
const resetButton = document.getElementById('resetButton');

// Function to handle a click on a cell
function handleClick(index) {
  if (!gameActive || board[index] !== '') return;

  board[index] = currentPlayer;
  renderBoard();

  const winner = checkWinner();
  if (winner) {
    endGame(winner !== 'Draw' ? `Player ${winner} wins!` : 'It\'s a draw!');
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  }
}

// Function to render the board
function renderBoard() {
  boardElement.innerHTML = '';
  board.forEach((cell, index) => {
    const cellElement = document.createElement('div');
    cellElement.classList.add('cell');
    cellElement.textContent = cell;
    cellElement.addEventListener('click', () => handleClick(index));
    boardElement.appendChild(cellElement);
  });
}

// Function to check for a winner
function checkWinner() {
  for (let i = 0; i < winConditions.length; i++) {
    const [a, b, c] = winConditions[i];
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      gameActive = false;
      return board[a];
    }
  }
  if (!board.includes('')) {
    gameActive = false;
    return 'Draw';
  }
  return null;
}

// Function to end the game
function endGame(message) {
  resultElement.textContent = message;
  gameActive = false;
}

// Function to reset the game
function resetGame() {
  currentPlayer = 'X';
  board = ['', '', '', '', '', '', '', '', ''];
  gameActive = true;
  resultElement.textContent = '';
  renderBoard();
}

// Event listener for reset button
resetButton.addEventListener('click', resetGame);

