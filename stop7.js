// Variables globales de utilidad
var canvas = document.querySelector("canvas");
var ctx = canvas.getContext("2d");
var w = canvas.width;
var h = canvas.height;
var x = 130,
  y = 135; // posición inicial de Vaus
var delta;
var ANCHURA_LADRILLO = 20, ALTURA_LADRILLO = 10;

// var frames = 30;


      // Collisions between rectangle and circle
    function circRectsOverlap(x0, y0, w0, h0, cx, cy, r) {
        var testX = cx;
        var testY = cy;

        if (testX < x0)
            testX = x0;
        if (testX > (x0 + w0))
            testX = (x0 + w0);
        if (testY < y0)
            testY = y0;
        if (testY > (y0 + h0))
            testY = (y0 + h0);

        return (((cx - testX) * (cx - testX) + (cy - testY) * (cy - testY)) < r * r);
    }
  function testCollisionWithWalls(ball, w, h) {
          // TU CÓDIGO AQUÍ
                  // Lateral drch
        if (ball.x > w - ball.diameter / 2) {
            ball.angle = -ball.angle + Math.PI;
            ball.x = w - ball.diameter / 2;
            return false;
          }
          // Pared inferior
          if (ball.y > h - ball.diameter / 2) {
            ball.angle = -ball.angle;
            ball.y = h - ball.diameter / 2;
            return true;
          }
          // Lateral izq 
          if (ball.x < ball.diameter / 2) {
            ball.angle = -ball.angle + Math.PI;
            ball.x = ball.diameter / 2;
            return false;
          }
          // Pared superior
          if (ball.y < ball.diameter / 2) {
            ball.angle = -ball.angle;
            ball.y = ball.diameter / 2;
            return false;
          }
    }

function Brick(x,y,color) {
	     // TU CÓDIGO AQUÍ
         this.x = x;
         this.y = y;
         this.color = color;
         this.width = ANCHURA_LADRILLO;
         this.height = ALTURA_LADRILLO;

}

Brick.prototype = {
	 draw : function(ctx) {
       // TU CÓDIGO AQUÍ
       ctx.beginPath();
       ctx.rect(this.x, this.y, this.width, this.height);
       ctx.fillStyle = this.color;
       ctx.fill();
       ctx.closePath();
	}
};


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
     ctx.beginPath();
     ctx.arc(this.x, this.y, this.diameter / 2, 0, 2 * Math.PI);
     ctx.fillStyle = "green";
     ctx.fill();
     ctx.stroke();

  };

  this.move = function(x, y) {
        // TU CÓDIGO AQUÍ
        if (x != undefined && y != undefined) {
            this.x = x;
            this.y = y;
          } else {
            var incX = this.v * Math.cos(this.angle);
            var incY = this.v * Math.sin(this.angle);
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
  var bricks = [];

  // vars for handling inputs
  var inputStates = {left: 0, right: 0, space: 0};


var ladrillos = [
		// grey
		{x:20,y:20,c:'grey'}, {x:(20*2+ANCHURA_LADRILLO),y:20,c:'grey'},{x:20*3+ANCHURA_LADRILLO*2,y:20,c:'grey'},{x:20*4+ANCHURA_LADRILLO*3,y:20,c:'grey'}, {x:20*5+ANCHURA_LADRILLO*4,y:20,c:'grey'} ,
		// red
		{x:20,y:42,c:'red'}, {x:20*2+ANCHURA_LADRILLO,y:42,c:'red'},{x:20*3+ANCHURA_LADRILLO*2,y:42,c:'red'},{x:20*4+ANCHURA_LADRILLO*3,y:42,c:'red'}, {x:20*5+ANCHURA_LADRILLO*4,y:42,c:'red'} ];


var createBricks = function(){
	     // TU CÓDIGO AQUÍ
         for (var i = 0; i < ladrillos.length; i++) {
            var brickData = ladrillos[i];
            var brick = new Brick(brickData.x, brickData.y, brickData.c);
            bricks.push(brick);
          }
}

var drawBricks = function(){
	     // TU CÓDIGO AQUÍ
         for (var i = 0; i < bricks.length; i++) {
            var brick = bricks[i];
            brick.draw(ctx);
          }
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


  var updatePaddlePosition = function() {


    var incX = Math.ceil(calcDistanceToMove(delta, speed));

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
      
      var die = testCollisionWithWalls(ball, w, h);

   // TU CÓDIGO AQUÍ
   // colision bola con nave
    if (circRectsOverlap(x, y, vausWidth, vausHeight, ball.x, ball.y, ball.diameter / 2)) {
    ball.angle = -ball.angle;
    ball.y = y - ball.diameter / 2;
    }
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

   // dibujar ladrillos
   drawBricks();
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

   
   createBricks();
   
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

test('Comprobar ladrillos', function(assert) {
    var brickW = 20;
    var bricks = [{x:20,y:20,c:'grey'}, {x:(20*2+brickW),y:20,c:'grey'},{x:20*3+brickW*2,y:20,c:'grey'},{x:20*4+brickW*3,y:20,c:'grey'}, {x:20*5+brickW*4,y:20,c:'grey'} ,
    
    {x:20,y:42,c:'red'}, {x:20*2+brickW,y:42,c:'red'},{x:20*3+brickW*2,y:42,c:'red'},{x:20*4+brickW*3,y:42,c:'red'}, {x:20*5+brickW*4,y:42,c:'red'} ];
    
      for(var brick of bricks){
        var r=255, g=0, b=0, a=255;
        if (brick.c == 'grey'){
               r= 128; g = 128; b= 128;
        }
     assert.pixelEqual(canvas, brick.x, brick.y, r, g, b, a," Passed!");
      }
    });
    
    
    