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
  return (speed * delta) /1000;
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
  this.x += calcDistanceToMove(delta, incX);
  this.y -= calcDistanceToMove(delta, incY);
}
if (this.y < this.diameter / 2) {
  //this.angle = -this.angle;
  //this.y = this.diameter / 2;
  this.y=0;
  this.x=30;
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
  var vausWidth = 30, vausHeight = 10;

  var balls = [];

  // vars for handling inputs
  var inputStates = {left: 0, right: 0, space: 0};


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
  var ctx = canvas.getContext("2d");
  ctx.save();
  // Establecer el color de la raqueta en negro
  ctx.fillStyle = 'black';
  // Dibujar un rectángulo en la posición y tamaño adecuados
  ctx.fillRect(x, y, 30, 10);
  ctx.restore();
  }


  var updatePaddlePosition = function() {
    
    var incX = Math.ceil(calcDistanceToMove(delta, speed));
    
    // check inputStates
    // TU CÓDIGO AQUÍ
    if(inputStates.left == 1){
        x = x-incX;
        if(x<=0){
            x=0;
        }
        //movimiento izquierda
        console.log("izquierda");
    }
    //Si pones un else if no se queda quieto al pulsar dos flechas al mismo tiempo
    if(inputStates.right==1){
        //movimiento derecha
        x=x+incX;
        if(x>=w-vausWidth){
            x=w-vausWidth;
        }
        console.log("derecha");
    }

}
function gestorTeclado() {
  document.addEventListener('keydown', (e) => {
  if (e.code === "ArrowLeft") {
      inputStates.left = 1;
  }
  else if (e.code === "ArrowRight") {
      inputStates.right = 1;
  }
});

document.addEventListener('keyup', (e) => {
  if (e.code === "ArrowLeft") {
      inputStates.left = 0;
  }
  else if (e.code === "ArrowRight") {
      inputStates.right = 0;
  }
  else if (e.code === "Space") {
      console.log("ESPACIO PULSADO");
  }
});
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

    gestorTeclado();


// TU CÓDIGO AQUÍ
// Instancia una bola con los parámetros del enunciado e introdúcela en el array balls

    balls.push(new Ball(10, 70, Math.PI / 3, 100, 6, false));


    // start the animation
    requestAnimationFrame(mainLoop);
    
    // TESTING
   test('La bola sube hasta arriba', function(assert) {
  var done = assert.async();
  setTimeout(function() {
  var verdes = 0;
  for (var i=50; i<145; i++) {  
     // comprobar que la bola está pegada al techo, en algún punto de la esquina superior derecha
      if (Array.prototype.slice.apply(canvas.getContext("2d").getImageData(i, 0, 1, 1).data)[1] > 0) verdes++; // componente G de RGB
  } 
  assert.ok(verdes>2, "Passed!");
    done();
  }, 8000);

});


    
  };

  //our GameFramework returns a public API visible from outside its scope
  return {
    start: start
  };
};


var game = new GF();
game.start();
