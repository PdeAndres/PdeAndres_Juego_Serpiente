$(document).ready(function () {
  $(".start").on("click", startGame);
});

let interval;
let snakeTopPos = 250;
let snakeLeftPos = 250;
let snakeBody = [{ top: snakeTopPos, left: snakeLeftPos }];

function startGame() {
  if (interval) {
    clearInterval(interval);
  }

  spawnFood();

  $(".reset").on("click", () => {
    endGame(interval);
  });

  let snake = $(".snake");
  let gameBoard = $(".gameBoard");

  snakeTopPos = 250;
  snakeLeftPos = 250;
  snakeBody = [{ top: snakeTopPos, left: snakeLeftPos }];

  snake.css({
    display: "block",
    top: snakeTopPos + "px",
    left: snakeLeftPos + "px",
  });

  let boardWidth = gameBoard.width();
  let boardHeight = gameBoard.height();
  let snakeWidth = snake.width();
  let snakeHeight = snake.height();

  interval = setInterval(rightMove, 100);

  $(document).off("keydown");
  $(document).on("keydown", (event) => {
    switch (event.key) {
      case "ArrowRight":
        console.log(event.key);
        clearInterval(interval);
        interval = setInterval(rightMove, 100);
        break;
      case "ArrowLeft":
        clearInterval(interval);
        interval = setInterval(leftMove, 100);
        console.log(event.key);

        break;
      case "ArrowUp":
        clearInterval(interval);
        interval = setInterval(upMove, 100);
        console.log(event.key);

        break;
      case "ArrowDown":
        clearInterval(interval);
        interval = setInterval(downMove, 100);
        console.log(event.key);
        break;
    }
  });

  function rightMove() {
    if (snakeLeftPos + 10 + snakeWidth <= boardWidth) {
      snakeLeftPos += 10;
      snake.css("left", snakeLeftPos);
      checkCollision();
    } else {
      endGame(interval);
    }
  }

  function leftMove() {
    if (snakeLeftPos - 10 >= 0) {
      snakeLeftPos -= 10;
      snake.css("left", snakeLeftPos);
      checkCollision();
    } else {
      endGame(interval);
    }
  }

  function upMove() {
    if (snakeTopPos - 10 >= 0) {
      snakeTopPos -= 10;
      snake.css("top", snakeTopPos);
      checkCollision();
    } else {
      endGame(interval);
    }
  }

  function downMove() {
    if (snakeTopPos + 10 + snakeHeight <= boardHeight) {
      snakeTopPos += 10;
      snake.css("top", snakeTopPos);
      checkCollision();
    } else {
      endGame(interval);
    }
  }
}

function spawnFood() {
  let gameBoard = $(".gameBoard");
  let food = $(".food");

  let boardWidth = gameBoard.width();
  let boardHeight = gameBoard.height();
  let foodSize = food.width();

  let leftFoodPos =
    Math.floor(Math.random() * ((boardWidth - foodSize) / 10)) * 10;
  let topFoodPos =
    Math.floor(Math.random() * ((boardHeight - foodSize) / 10)) * 10;

  food.css({
    display: "block",
    top: topFoodPos + "px",
    left: leftFoodPos + "px",
  });
}

function checkCollision() {
  let food = $(".food");
  let foodSize = food.width();
  let foodTopPos = parseInt(food.css("top"));
  let foodLeftPos = parseInt(food.css("left"));

  // Verificar si la cabeza de la serpiente colisiona con la comida
  if (
    snakeTopPos < foodTopPos + foodSize && // la cabeza de la serpiente está por encima de la comida
    snakeTopPos + 10 > foodTopPos && // la cabeza de la serpiente está por debajo de la comida
    snakeLeftPos < foodLeftPos + foodSize && // la cabeza de la serpiente está a la izquierda de la comida
    snakeLeftPos + 10 > foodLeftPos // la cabeza de la serpiente está a la derecha de la comida
  ) {
    // La serpiente ha comido la comida
    spawnFood(); // Generamos una nueva comida
    console.log("Colisión detectada, comida consumida");
  }
}

function endGame(interval) {
  clearInterval(interval);
  $(".snake").css({
    display: "none",
  });

  alert("Game Over");
}
