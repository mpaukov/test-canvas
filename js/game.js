let myGamePiece = [];
const amount = 300;

function startGame() {
  for (let i = 0; i < amount; i += 1) {
    const temp = Math.floor(Math.random() * 11);
    const radius = temp < 1 ? 5 : temp;
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
    this.frameNo = 0;
    this.interval = setInterval(updateGameArea, 20);
  },
  stop: function () {
    clearInterval(this.interval);
  },
  clear: function () {
    this.context.beginPath();
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  },
};

function component(radius, color) {
  this.radius = radius;
  this.color = color;
  this.speedX = Math.floor(Math.random() * 6);
  this.speedY = Math.floor(Math.random() * 6);
  this.x = Math.floor(Math.random() * 480 + 1 - this.radius);
  if (this.x <= this.radius) {
    this.x = this.radius + 1;
  }
  this.y = Math.floor(Math.random() * 270 + 1 - this.radius);
  if (this.y <= this.radius) {
    this.y = this.radius + 1;
  }

  this.update = function () {
    ctx = myGameArea.context;
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, true);
    ctx.fill();
  };

  this.newPos = function () {
    this.x += this.speedX;
    this.y -= this.speedY;
    if (this.x >= 480 - this.radius || this.x <= this.radius) {
      this.speedX = -this.speedX;
    }
    if (this.y >= 270 - this.radius || this.y <= this.radius) {
      this.speedY = -this.speedY;
    }
  };
}

function updateGameArea() {
  myGameArea.clear();
  for (let i = 0; i < amount; i += 1) {
    myGamePiece[i].newPos();

    myGamePiece[i].update();
  }
}
