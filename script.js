const cells = document.querySelectorAll("[data-cell]");
const messageText = document.getElementById("message");
const restartButton = document.getElementById("restartButton");

let currentPlayer = "X";
let gameBoard = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

function handleCellClick(event) {
    const cell = event.target;
    const cellIndex = [...cells].indexOf(cell);

    if (gameBoard[cellIndex] !== "" || !gameActive) return;

    gameBoard[cellIndex] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.setAttribute("data-player", currentPlayer); // 设置data-player属性

    if (checkWin(currentPlayer)) {
        endGame(false);
    } else if (isBoardFull()) {
        endGame(true);
    } else {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        setMessage(`Player ${currentPlayer}'s turn`);
    }
}


function checkWin(player) {
    return winPatterns.some((pattern) => {
        const [a, b, c] = pattern;
        return gameBoard[a] === player && gameBoard[b] === player && gameBoard[c] === player;
    });
}


function isBoardFull() {
    return gameBoard.every((cell) => cell !== "");
}

function setMessage(message) {
    messageText.textContent = message;
}

function endGame(draw) {
    if (draw) {
        setMessage("It's a draw!");
    } else {
        setMessage(`Player ${currentPlayer} wins!`);
    }

    gameActive = false;
}

function restartGame() {
    currentPlayer = "X";
    gameBoard = ["", "", "", "", "", "", "", "", ""];
    gameActive = true;
    messageText.textContent = "Start the game!";
    cells.forEach((cell) => {
        cell.textContent = "";
        
    });
}

cells.forEach((cell) => {
    cell.addEventListener("click", handleCellClick);
});

restartButton.addEventListener("click", restartGame);

restartGame();
