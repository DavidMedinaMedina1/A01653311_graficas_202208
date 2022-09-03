//Tarea 2 Triangulo de Sierpinski
//David Medina Medina A01653311
//02/09/22

//crearTriangulo posee la posición y la longitud de los lados
const crearTriangulo = (posicion, longitudLado) => {
  ctx.beginPath();
  ctx.moveTo(...posicion); //Se va al vertice de la izquierda
  ctx.lineTo(posicion[0] + longitudLado / 2, posicion[1] - longitudLado * Math.sin(Math.PI/3)); //Dibuja una linea del vertice izquierdo al vertice superior 
  ctx.lineTo(posicion[0] + longitudLado, posicion[1]); //Dibuja una linea del vertice superior al vertice derecho 
  ctx.lineTo(...posicion); //Dibuja una linea del vertice derecho de regreso al vertice izquierdo 
  ctx.closePath();
  ctx.fill(); //Dibuja triabgulo
};

//Función que crea subdivisiones del triángulo de Sierpinski con atrbutos de posición, longitud de lado y numero de subdivisiones
const crearTrianguloSierpinski = (posicion, longitudLado, subdivisiones) => {
  const longitudTrianguloInterior = longitudLado / 2; //La longitud de los lados internos del triangulos es la mitad de largo que el triangulo exterior 
  const innerTrianglesPositions = [
    posicion,
    [ posicion[0] + longitudTrianguloInterior, posicion[1] ],
    [ posicion[0] + longitudTrianguloInterior / 2, posicion[1] - Math.sin(Math.PI/3) * longitudTrianguloInterior ]
  ]; //Estas son las mismas posiciones utilizadas en la funcion crearTriangulo 
  
  if (subdivisiones == 0) {
    crearTriangulo([0, 500], 500)
  } 
  else if (subdivisiones == 1) {
    innerTrianglesPositions.forEach((trianglePosition) => {
      crearTriangulo(trianglePosition, longitudTrianguloInterior);
    });
  } else {
    innerTrianglesPositions.forEach((posicionTriangulo) => {
      crearTrianguloSierpinski(posicionTriangulo, longitudTrianguloInterior, subdivisiones - 1);
    });
  }
}

//Función update que actualiza el canvas con el valor del slider
function update(value){
    requestAnimationFrame(()=>update(value));
      ctx.clearRect(0,0, canvas.width, canvas.height);
      crearTrianguloSierpinski([0, 500], 500, value);
}

//Función principal main que trae los objetos del HTML y los pone en el la pantalla en 2D
function main(){
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d"); 
  crearTriangulo([0, 500], 500)//Al iniciar o recargar se dibuja un triangulo en pantalla
  var value = 0; //Se inicializa el valor en 0
  var output = document.getElementById("demo");
  var slider = document.getElementById("myRange").oninput = function(){
  value = (this.value-this.min)/(this.max-this.min)*8;
  output.innerHTML = this.value;//El valor llega de 0 a 10
  update(value);//Se manda valor a función update
  }
}