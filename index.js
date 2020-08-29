const X_CLASS = "x";
const CIRCLE_CLASS = "circle";
const cellElements = document.querySelectorAll("[data-cell]");
const board = document.getElementById("board");
let circleTurn;
const winningMessageText = document.querySelector(
  "[data-winning-message-text]"
);
const restartButton = document.getElementById("restartButton");
const winningMessage = document.getElementById("winningMessage");
const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
startGame();
restartButton.addEventListener("click", startGame);
function isDraw() {
  return [...cellElements].every((cell) => {
    return (
      cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
    );
  });
}
function endGame(draw) {
  if (draw) {
    winningMessageText.innerText = "Draw!";
  } else {
    winningMessageText.innerText = `${circleTurn ? "O's Wins" : "X's Wins"}`;
  }
  winningMessage.classList.add("show");
}
function checkWin(currentClass) {
  return WINNING_COMBINATIONS.some((combination) => {
    return combination.every((index) => {
      return cellElements[index].classList.contains(currentClass);
    });
  });
}

function startGame(params) {
  circleTurn = false;
  cellElements.forEach((cell) => {
    cell.classList.remove(X_CLASS);
    cell.classList.remove(CIRCLE_CLASS);
    cell.removeEventListener("click", handleClick);
    cell.addEventListener("click", handleClick, { once: true });
  });
  setHoverBoardClass();
  winningMessage.classList.remove("show");
}

function setHoverBoardClass(circleTurn) {
  board.classList.remove(X_CLASS);
  board.classList.remove(CIRCLE_CLASS);
  if (circleTurn) {
    board.classList.add(CIRCLE_CLASS);
  } else {
    board.classList.add(X_CLASS);
  }
}

function placeMark(currentCell, currentClass) {
  currentCell.classList.add(currentClass);
}

function handleClick(e) {
  const currentCell = e.target;
  const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;
  placeMark(currentCell, currentClass);
  if (checkWin(currentClass)) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  }
  circleTurn = !circleTurn;
  setHoverBoardClass(circleTurn);
}
