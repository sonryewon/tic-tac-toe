const boardEl = document.getElementById('board');
const statusEl = document.getElementById('status');
const lines = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6]
];

let board, turn, gameOver;

function start() {
  board = Array(9).fill('');
  turn = 'X';
  gameOver = false;
  statusEl.textContent = 'X 차례';
  boardEl.innerHTML = '';
  board.forEach((_, i) => {
    const btn = document.createElement('button');
    btn.className = 'cell';
    btn.addEventListener('click', () => play(i, btn));
    boardEl.appendChild(btn);
  });
}

function play(i, btn) {
  if (board[i] || gameOver) return;
  board[i] = turn;
  btn.textContent = turn;

  if (lines.some(l => l.every(idx => board[idx] === turn))) {
    statusEl.textContent = `${turn} 승리! 🎉`;
    gameOver = true;
  } else if (board.every(c => c)) {
    statusEl.textContent = '무승부';
    gameOver = true;
  } else {
    turn = turn === 'X' ? 'O' : 'X';
    statusEl.textContent = `${turn} 차례`;
  }
}

document.getElementById('reset').addEventListener('click', start);
start();