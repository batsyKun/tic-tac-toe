let array = [
  ["o", "x", "o"],
  ["o", "x", "x"],
  ["x", "o", "x"],
];

let gameModule = (function () {
  let gameboard = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ];
  const gameStatusMessage = document.getElementById("game-status");
  let currentPlayer = "X";
  const currentPlayerTurn = () => `It's ${currentPlayer}'s turn`;
  const winningMessage = () => `${currentPlayer} wins!`;
  gameStatusMessage.innerText = currentPlayerTurn();

  let gameWon = null;
  function handleClick(e) {
    const clickedSquare = e.target;
    const clickedSquareNumber = parseInt(
      clickedSquare.getAttribute("data-key")
    );
    const clickedSquareArray = parseInt(
      clickedSquare.getAttribute("data-array")
    );
    console.log(clickedSquareArray, clickedSquareNumber);

    if (
      gameboard[clickedSquareArray][clickedSquareNumber] == "X" ||
      gameboard[clickedSquareArray][clickedSquareNumber] == "O"
    ) {
      return;
    }

    if (!gameWon) {
      handlePlay(clickedSquare, clickedSquareNumber, clickedSquareArray);
      let numbersToCheck = [1, 2, 3, 4, 5, 6, 7, 8, 9];

      let isNumberPresent = false;

      for (let row of gameboard) {
        if (row.some((element) => numbersToCheck.includes(element))) {
          isNumberPresent = true;
          break;
        }
      }
      if (!isNumberPresent && !gameWon) {
        gameStatusMessage.innerText = "Its a tie";
        changeMessageColor("004466");
        gameActive = false;
        return;
      }
      console.log(isNumberPresent, "hsaufhasuif");
    }
  }
  function changePlayer() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    gameStatusMessage.innerText = currentPlayerTurn();
    if (currentPlayer === "X") {
      changeMessageColor("219EBC");
    } else {
      changeMessageColor("FB8500");
    }
  }
  function changeMessageColor(color) {
    gameStatusMessage.style.color = "#" + color;
  }
  function handleResult() {
    const allEqual = (arr) => arr.every((v) => v === arr[0]);
    let arrayD = [];
    for (let i = 0; i < gameboard.length; i++) {
      if (allEqual(gameboard[i])) {
        gameWon = currentPlayer;
      }
      arrayD.push(gameboard[i][i]);

      let arr = [];
      for (let j = 0; j < gameboard.length; j++) {
        arr.push(gameboard[j][i]);
      }
      if (allEqual(arr)) {
        gameWon = currentPlayer;
      }
    }

    let arrayC = [];
    let count = 0;
    for (let j = gameboard.length - 1; j >= 0; j--) {
      arrayC.push(gameboard[count][j]);
      count += 1;
    }
    if (allEqual(arrayD) || allEqual(arrayC)) {
      gameWon = currentPlayer;
      gameStatusMessage.innerText = winningMessage();
    }
    console.log(gameWon);
    if (gameWon) {
      changePlayer();
      gameStatusMessage.innerText = winningMessage();
    }
  }

  function handlePlay(clickedElement, squareIndex, squareArray) {
    gameboard[squareArray][squareIndex] = currentPlayer;
    console.log(gameboard);
    clickedElement.innerText = currentPlayer;
    console.log(clickedElement);
    if (currentPlayer === "X") {
      clickedElement.style.color = "#219EBC";
    } else {
      clickedElement.style.color = "#FB8500";
    }
    changePlayer();
    handleResult();
  }
  function restartGame() {
    gameboard = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ];
    document
      .querySelectorAll(".board-square")
      .forEach((square) => (square.innerText = ""));
    currentPlayer = "X";
    gameStatusMessage.innerText = currentPlayerTurn();
  }
  return { handleClick, restartGame };
})();
document
  .querySelectorAll(".board-square")
  .forEach((square) =>
    square.addEventListener("click", gameModule.handleClick)
  );
document
  .getElementById("restart-game")
  .addEventListener("click", gameModule.restartGame);
