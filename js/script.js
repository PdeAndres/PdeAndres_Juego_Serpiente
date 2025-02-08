$(document).ready(function () {
  $(".start").on("click", startGame);
});

let interval;
let snakeTopPos = 250;
let snakeLeftPos = 250;
let speed = 70;
let score = 0;

function startGame() {
  if (interval) {
    clearInterval(interval);
  }
  $(".gameOver").css({ display: "none" });
  $(".start").css({ display: "none" });
  $(".score").css({ display: "block" });
  $(".startGame").css({ display: "none" });
  $(".container").css({ display: "flex" });
  spawnFood();

  let snake = $(".snake");
  let gameBoard = $(".gameBoard");

  snakeTopPos = 250;
  snakeLeftPos = 250;
  speed = 100;
  score = 0;
  $(".scoreValue").text(score);

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
      case "d":
        clearInterval(interval);
        interval = setInterval(rightMove, speed);
        break;
      case "ArrowLeft":
      case "a":
        clearInterval(interval);
        interval = setInterval(leftMove, speed);

        break;
      case "ArrowUp":
      case "w":
        clearInterval(interval);
        interval = setInterval(upMove, speed);

        break;
      case "ArrowDown":
      case "s":
        clearInterval(interval);
        interval = setInterval(downMove, speed);
        break;
    }
  });

  // Movimiento de la serpiente
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

// Spawn Comida
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

  if (
    snakeTopPos < foodTopPos + foodSize && //la serpiente está por encima de la comida
    snakeTopPos + 10 > foodTopPos && //  la serpiente está por debajo de la comida
    snakeLeftPos < foodLeftPos + foodSize && // la serpiente está a la izquierda de la comida
    snakeLeftPos + 10 > foodLeftPos //la serpiente está a la derecha de la comida
  ) {
    if (speed > 50) {
      score += 10;
    } else if ((speed <= 50) & (speed > 20)) {
      score += 15;
    } else {
      score += 20;
    }

    $(".scoreValue").text(score);

    speed -= 5;
    spawnFood();
  }
}

function endGame(interval) {
  clearInterval(interval);
  $(".snake").css({
    display: "none",
  });
  $(".food").css({
    display: "none",
  });
  $(".gameOver").css({ display: "flex" });
  $(".score").css({ display: "none" });
  $(".reset").on("click", () => {
    startGame();
  });
}
