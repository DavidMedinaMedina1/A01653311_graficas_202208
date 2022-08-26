let ctx = null,
canvas = null;
let scoreP1 = 0;
let scoreP2 = 0;
let reseteo = false;
const ScoreText = document.querySelector("Score");


class ball {
  constructor(xPos, yPos, radius, color) {
    this.color = color;
    this.xPos = xPos;
    this.yPos = yPos;
    this.radius = radius;
    this.up = false;
    this.right = true;
    this.speed = 4;
  }

  draw() {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.xPos, this.yPos, this.radius, 0, Math.PI * 2);
    ctx.fill();
  }

  update(xMin, xMax, yMin, yMax) {
    if (this.xPos < xMin + this.radius) this.right = true;
    if (this.xPos > xMax - this.radius) this.right = false;

    if (this.yPos > yMax - this.radius) this.up = true;
    if (this.yPos < yMin + this.radius) this.up = false;

    if (this.right) this.xPos += this.speed;
    else this.xPos -= this.speed;

    if (this.up) this.yPos -= this.speed;
    else this.yPos += this.speed;
  }
}


class bar {
  constructor(xPos, yPos, width, height, color) {
    this.color = color;
    this.xPos = xPos;
    this.yPos = yPos;
    this.width = width;
    this.height = height;
  }


  draw() {
    ctx.fillStyle = this.color;
    //ctx.beginPath();
    ctx.fillRect(this.xPos, this.yPos, this.width, this.height);
    //ctx.fill();
  }

  update(s, b) {
    //Barra
    var p0 = {
      x: b.xPos,
      y: b.yPos,
    };
    var p1 = {
      x: b.xPos + b.width,
      y: b.yPos + b.height,
    };
    //Esfera
    var derecho = {
      x: s.xPos - s.radius,
      y: s.yPos,
    };
    var izquierdo = {
      x: s.xPos + s.radius,
      y: s.yPos,
    };
    var arriba = {
      x: s.xPos,
      y: s.yPos + s.radius,
    };
    var abajo = {
      x: s.xPos,
      y: s.yPos - s.radius,
    };

    // B. Lado derecho
    if (p1.x >= derecho.x && p1.y >= s.yPos && p0.y <= s.yPos && p0.x <= s.xPos) { s.right = true, s.speed += 0.5 };
    // B. Lado izquierdo
    if (p0.x <= izquierdo.x && p1.y >= s.yPos && p0.y <= s.yPos && p1.x >= s.xPos) { s.right = false, s.speed += 0.5 };
    // B. Arriba
    if (p0.y <= arriba.y && p1.y >= s.yPos && p0.x <= s.xPos && p1.x >= s.xPos) { s.up = true, s.speed += 0.5 };
    // B. Abajo
    if (p1.y >= abajo.y && p0.y <= s.yPos && p0.x <= s.xPos && p1.x >= s.xPos) { s.up = false, s.speed += 0.5 };
    //Score
    if (derecho.x <= 0) { scoreP1 += 1, restart(s) };
    if (izquierdo.x >= canvas.width) { scoreP2 += 1, restart(s) };
    document.getElementById("Score").innerHTML ="Jugador 1 = " + scoreP1 + ":" +scoreP2 + " = Jugador 2" 
  }
}


function resetPuntuaciones(boton){
  if (boton.className === "BotonDeReseteo") {
      boton.className = "clicked";
  } else {
      scoreP1 = 0,
      scoreP2 = 0,
      window.location.reload(); }}


function update(sphere, bars) {
  requestAnimationFrame(() => update(sphere, bars));

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  sphere.draw();
  sphere.update(0, canvas.width, 0, canvas.height);

  bars.forEach((bar) => {
    bar.draw();
    bar.update(sphere, bar);
  });
}


function inputHandlers(bar1, bar2) {
  document.addEventListener("keydown", (event) => {
    if (event.key == "w" &&  bar1.yPos != -10) bar1.yPos -= 40
    if (event.key == "w" &&  bar1.yPos == -10) bar1.yPos = bar1.yPos;

    if (event.key == "s" &&  bar1.yPos != 310) bar1.yPos += 40;
    if (event.key == "s" &&  bar1.yPos == 310) bar1.yPos == bar1.yPos;

    if (event.key == "u" &&  bar2.yPos != -10) bar2.yPos -= 40;
    if (event.key == "u" &&  bar2.yPos == -10) bar2.yPos == bar2.yPos;

    if (event.key == "j" &&  bar2.yPos != 310) bar2.yPos += 40;
    if (event.key == "s" &&  bar2.yPos == 310) bar2.yPos == bar2.yPos;
  });
}


function restart(s) {
  s.xPos = canvas.width / 2
  s.yPos = canvas.height / 2
  s.speed = 4
};


function main() {
  canvas = document.getElementById("animationCanvas");
  ctx = canvas.getContext("2d");

  let sphere = new ball(
    Math.random() * canvas.width,
    Math.random() * canvas.height,10,"blue"
  );

  let bar1 = new bar(10, 30, 30, 90, "lightgreen");
  let bar2 = new bar(canvas.width - 40, 30, 30, 90, "lightgreen");
  inputHandlers(bar1, bar2);
  update(sphere, [bar1, bar2]);
}