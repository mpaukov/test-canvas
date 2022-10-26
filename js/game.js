const amount = 20;

let myGamePiece = [];

function startGame() {
  for (let i = 0; i < amount; i += 1) {
    const radius = Math.floor(Math.random() * 5) + 25;
    const color = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    myGamePiece.push(new component(radius, color));
  }

  myGameArea.start();
}

let myGameArea = {
  canvas: document.createElement("canvas"),

  start: function () {
    this.canvas.width = 480;
    this.canvas.height = 270;
    this.context = this.canvas.getContext("2d");
    document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    this.interval = setInterval(updateGameArea, 20);
    this.canvas.addEventListener("click", handleClick);
  },
  stop: function () {
    clearInterval(this.interval);
    this.canvas.removeEventListener("click", handleClick);
  },
  clear: function () {
    this.context.beginPath();
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  },
  update: function () {
    ctx = this.context;
    for (let i = 0; i < myGamePiece.length; i += 1) {
      myGamePiece[i].x += myGamePiece[i].speedX;
      myGamePiece[i].y += myGamePiece[i].speedY;
      if (
        myGamePiece[i].x >= 480 - myGamePiece[i].radius ||
        myGamePiece[i].x <= myGamePiece[i].radius
      ) {
        myGamePiece[i].speedX = -myGamePiece[i].speedX;
      }
      if (
        myGamePiece[i].y >= 270 - myGamePiece[i].radius ||
        myGamePiece[i].y <= myGamePiece[i].radius
      ) {
        myGamePiece[i].speedY = -myGamePiece[i].speedY;
      }
      ctx.beginPath();
      ctx.fillStyle = myGamePiece[i].color;
      ctx.arc(
        myGamePiece[i].x,
        myGamePiece[i].y,
        myGamePiece[i].radius,
        0,
        2 * Math.PI,
        true
      );
      ctx.fill();
    }
  },
};

function component(radius, color) {
  this.radius = radius;
  this.color = color;
  const sign = Math.floor(Math.random() * 2) < 1 ? -1 : 1;
  this.speedX = sign * (Math.floor(Math.random() * 3) + 1);
  this.speedY = sign * (Math.floor(Math.random() * 3) + 1);
  this.x = Math.floor(Math.random() * (480 - this.radius));
  if (this.x <= this.radius) {
    this.x = this.radius + 1;
  }
  this.y = Math.floor(Math.random() * (270 - this.radius));
  if (this.y <= this.radius) {
    this.y = this.radius + 1;
  }
}

function handleClick(e) {
  myGamePiece = myGamePiece.filter((el) => {
    if (
      !(
        e.x > el.x - el.radius &&
        e.x < el.x + el.radius &&
        e.y > el.y - el.radius &&
        e.y < el.y + el.radius
      )
    )
      return el;
  });
  if (myGamePiece.length === 0) {
    myGameArea.stop();
    startGame();
  }
}

function updateGameArea() {
  myGameArea.clear();
  myGameArea.update();
}
