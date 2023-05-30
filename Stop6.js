// Variables globales de utilidad
var canvas = document.querySelector("canvas");
var ctx = canvas.getContext("2d");
var w = canvas.width;
var h = canvas.height;
var x = 130,
  y = 135;
var delta;
// var frames = 30;

// función auxiliar
var calcDistanceToMove = function(delta, speed) {
  // TU CÓDIGO AQUÍ
  };

function Ball(x, y, angle, v, diameter, sticky) {
  // TU CÓDIGO AQUÍ
  this.x = x;
  this.y = y;
  this.angle = angle;
  this.v = v;
  this.diameter = diameter;
  this.sticky = sticky;

  this.draw = function(ctx) {
     // TU CÓDIGO AQUÍ
     // Pintar la bola en this.x, this.y
     // con radio = this.radius
     // y color verde (green)
     ctx.beginPath();
     ctx.arc(this.x, this.y, this.diameter / 2, 0, 2 * Math.PI);
     ctx.fillStyle = "green";
     ctx.fill();
     ctx.stroke();
  };

  this.move = function(x, y) {
  // TU CÓDIGO AQUÍ
  // actualizar los atributos this.x , this.y al valor que llega como parámetro
  // si éstos están definidos
  // si no
  // actuializar this.x , this.y a la nueva posición, siguiendo la fórmula del enunciado
  // para calcular incX e incY
  // usar la función calcDistanceToMove para calcular el incremento real de this.x , this.y
  // (animación basada en el tiempo)
  // OJO: la posición y no puede ser inferior a 0 en ningún momento
 // RECUERDA: delta es una variable global a la que puedes acceder...
 if (x != undefined && y != undefined) {
    this.x = x;
    this.y = y;
  } else {
    var incX = this.v * Math.cos(this.angle);
    var incY = this.v * Math.sin(this.angle);

    //        console.log(this.angle + "cos:" + Math.cos(this.angle) + " s:" + this.speed + " incx:"+ incX + " y:" + this.y + " incy:" + incY + " " + calcDistanceToMove(delta, incX) + " " + calcDistanceToMove(delta, incY));
    this.x += calcDistanceToMove(delta, incX);
    this.y -= calcDistanceToMove(delta, incY);

  }
  };

}



// Inits
window.onload = function init() {
  var game = new GF();
  game.start();
};


// GAME FRAMEWORK STARTS HERE
var GF = function() {

  // vars for counting frames/s, used by the measureFPS function
  var frameCount = 0;
  var lastTime;
  var fpsContainer;
  var fps, oldTime = 0;

  var speed = 300; // px/s 
  var vausWidth = 30,
    vausHeight = 10;

  var balls = [];

  // vars for handling inputs
  var inputStates = {
    left: 0,
    right: 0,
    space: 0
  };

  var measureFPS = function(newTime) {

    // test for the very first invocation
    if (lastTime === undefined) {
      lastTime = newTime;
      return;
    }

    //calculate the difference between last & current frame
    var diffTime = newTime - lastTime;

    if (diffTime >= 1000) {

      fps = frameCount;
      frameCount = 0;
      lastTime = newTime;
    }

    //and display it in an element we appended to the 
    // document in the start() function
    fpsContainer.innerHTML = 'FPS: ' + fps;
    frameCount++;
  };

  // clears the canvas content
  function clearCanvas() {
    ctx.clearRect(0, 0, w, h);
   // ctx.fillStyle = 'green';
   // ctx.fillRect(105,0,4,4);    
  }

  // Función para pintar la raqueta Vaus
  function drawVaus(x, y) {
// TU CÓDIGO AQUÍ
  }


  var updatePaddlePosition = function() {


    var incX = Math.ceil(calcDistanceToMove(delta, speed));

    // check inputStates
    // TU CÓDIGO AQUÍ
}


  function updateBalls() {
    for (var i = balls.length - 1; i >= 0; i--) {
      var ball = balls[i]; 
      ball.move();
      ball.draw(ctx);
    }
  }

  function timer(currentTime) {
    var aux = currentTime - oldTime;
    oldTime = currentTime;
    return aux;

  }
  var mainLoop = function(time) {
    //main function, called each frame 
    measureFPS(time);

    // number of ms since last frame draw
    delta = timer(time);

    // Clear the canvas
    clearCanvas();

    // Mover Vaus de izquierda a derecha
    updatePaddlePosition();

    updateBalls();

    // draw Vaus
    drawVaus(x, y);

    // call the animation loop every 1/60th of second
    requestAnimationFrame(mainLoop);
  };

  var start = function() {
    // adds a div for displaying the fps value
    fpsContainer = document.createElement('div');
    document.body.appendChild(fpsContainer);

 // TU CÓDIGO AQUÍ
// Crea un listener para gestionar la pulsación
// de izquierda, derecha o espacio
// y actualiza inputStates.left .right o .space 
// el listener será para keydown (pulsar)
// y otro para keyup


// TU CÓDIGO AQUÍ
// Instancia una bola con los parámetros del enunciado e introdúcela en el array balls

	new_ball = new Ball(10, 70, Math.PI / 3, 100, 6, false);
	balls.push(new_ball);
    // start the animation
    requestAnimationFrame(mainLoop);
    



    
  };

  //our GameFramework returns a public API visible from outside its scope
  return {
    start: start
  };
};


var game = new GF();
game.start();
