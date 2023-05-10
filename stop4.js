// Variables globales de utilidad
var canvas = document.querySelector("canvas");
var ctx = canvas.getContext("2d");
var w = canvas.width;
var h = canvas.height;


var x = 130,
  y = 135;

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
  var fps, delta, oldTime = 0;

  var direction = -1; // inicialmente movimiento a la izquierda
  var speed = 300; // px/s 
  var vausWidth = 30, vausHeight = 10;

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
    // ctx.fillRect(15,15,4,4);    
  }

  // Función para pintar la raqueta Vaus
  function drawVaus(x, y) {
   // TU CÓDIGO AQUÍ
   
// TU CÓDIGO AQUÍ // Guardar el estado del contexto actual
  ctx.save();
  // Establecer el color de la raqueta en negro
  ctx.fillStyle = 'black';
  // Dibujar un rectángulo en la posición y tamaño adecuados
  ctx.fillRect(x, y, 30, 10);
  
  
  // Restaurar el estado anterior del contexto
  ctx.restore();
  }

  
  var calcDistanceToMove = function(delta, speed) {
    return (speed * delta) /1000;
    
  };

  var updatePaddlePosition = function() {
  
     var incX = Math.ceil(calcDistanceToMove(delta, speed));
     // TU CÓDIGO AQUÍ
     
     // Usar incX y direction para actualizar la posición
     // de Vaus. Debe moverse hacia la izquierda hasta chocar
     // con la pared. En ese momento, debe moverse hacia la 
     // derecha, hasta volver a chocar, y repetir el ciclo
    x = x + (incX * direction); 
    if (x <= 0) {
      direction = direction * -1;
      x = 0;
    }
    if (x >= w - vausWidth) {
      direction = direction * -1;
      x = w - vausWidth;
    }
     
  }

 function timer(currentTime) {
    var aux = currentTime - oldTime;
    oldTime = currentTime;
    return aux;
    
  }
    var mainLoop = function(time){
        //main function, called each frame 
        measureFPS(time);
      
        // number of ms since last frame draw
        delta = timer(time);

    // Clear the canvas
    clearCanvas();

    // Mover Vaus de izquierda a derecha
    updatePaddlePosition();

    // draw Vaus
    drawVaus(x, y);

    // call the animation loop every 1/60th of second
    requestAnimationFrame(mainLoop);
  };

  var start = function() {
    // adds a div for displaying the fps value
    fpsContainer = document.createElement('div');
    document.body.appendChild(fpsContainer);


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
