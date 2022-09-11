let ctx = null,
canvas = null;

let bocaArriba =  5.64
let bocaAbajo = 0.62

class Pacman {
  
  constructor(xPos, yPos, radius, color) {
    this.color = color;
    this.xPos = xPos;
    this.yPos = yPos;
    this.radius = radius;
    this. verificadorPac = 0;
    this.right = true;
    this.speed = 3;
  }

  draw() {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.xPos, this.yPos, this.radius, bocaAbajo , bocaArriba);
    ctx.lineTo(this.xPos, this.yPos);
    ctx.strokeStyle = '#black';
    ctx.stroke();
    ctx.closePath();
    ctx.fill();  
  }

  update() {
    if (this.right) this.xPos += this.speed;
    if (this.xPos > canvas.width + this.radius) this.xPos = 0 - this.radius; 
   
    if (bocaArriba < 6.28 && this.verificadorPac == 0){
        bocaArriba += 0.01
    }

    if (bocaArriba == 6.289999999999986)
    this.verificadorPac  = 1


    if (bocaArriba > 5.64 && this.verificadorPac == 1){
      bocaArriba -= 0.01
  }

    if (bocaArriba == 5.64)
    this.verificadorPac  = 0

    if (bocaAbajo > -0.02 && this.verificadorPac == 0){
    bocaAbajo -= 0.01

    }

    if (bocaAbajo == 0.6283185307179586)
    this.verificadorPac  = 1

    if (bocaAbajo < 0.62 && this.verificadorPac == 1){
      bocaAbajo += 0.01
  }
  
  }
}

function abrirCerrarBoca(){
  var x = Math.cos(degree * Math.PI / 180);
}

function update(sphere) {
  requestAnimationFrame(() => update(sphere));
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  sphere.draw();
  sphere.update();
}

function main() {
  canvas = document.getElementById("animationCanvas");
  ctx = canvas.getContext("2d");  
  console.log(0.2 * Math.PI);
  console.log(0.2 * Math.PI);
  1.8 * Math.PI

  let sphere = new Pacman(
    300, 200, 100, "yellow", bocaArriba, bocaAbajo
  );
  update(sphere);
}