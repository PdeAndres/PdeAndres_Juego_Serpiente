$(document).ready(function () {
  $(".start").on("click", startGame);
});

function startGame() {
  var interval;

  $(".reset").on("click", () => {
    endGame(interval);
  });

  console.log("start");
  let x = 250;
  let y = 250;

  $(".snake").css("display", "block");
  $(".snake").css("top", y);
  $(".snake").css("left", x);

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
    y += 10;
    $(".snake").css("left", y);
  }

  function leftMove() {
    y -= 10;
    $(".snake").css("left", y);
  }

  function upMove() {
    x -= 10;
    $(".snake").css("top", x);
  }

  function downMove() {
    x += 10;
    $(".snake").css("top", x);
  }
}

function endGame(interval) {
  clearInterval(interval);
  startGame();
}
