// Variables globales de utilidad
var canvas = document.querySelector("canvas");
var ctx = canvas.getContext("2d");
var w = canvas.width;
var h = canvas.height;

/*
var x = 130,
  y = 135;
*/
var x = 50,
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

  var speed = 300; // px/s 
  var vausWidth = 30, vausHeight = 10;

    // vars for handling inputs
    var inputStates = {
        left: 0,
        right: 0,
        space: 0,
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
    // ctx.fillRect(15,15,4,4);    
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

//Controlamos el movimiento de las flechas
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

  
  var calcDistanceToMove = function(delta, speed) {
// TU CÓDIGO AQUÍ
    return (speed * delta) /1000;

};

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

// TU CÓDIGO AQUÍ
// Crea un listener para gestionar la pulsación
// de izquierda, derecha o espacio
// y actualiza inputStates.left .right o .space 
// el listener será para keydown (pulsar)
// y otro para keyup

    gestorTeclado();

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
