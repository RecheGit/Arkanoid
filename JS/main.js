// Variables globales de utilidad
var canvas = document.querySelector("canvas");
var ctx=canvas.getContext("2d");
var w = canvas.width;
var h= canvas.height;
var X = canvas.width/2;
var Y = canvas.height/2;
var r = 5; //5px de radio
var maxWidth = w-r; 
var maxHeight = h-r;

var nave = new Image();



// Game Framework
var GF = function(){
 
 // variables para contar frames/s, usadas por measureFPS
 var frameCount = 0;
 var lastTime;
 var fpsContainer;
 var fps; 

 var measureFPS = function(newTime){
// la primera ejecución tiene una condición especial

      if(lastTime === undefined) {
        lastTime = newTime; 
        return;
      }
   
// calcular el delta entre el frame actual y el anterior
     var diffTime = newTime - lastTime; 

     if (diffTime >= 1000) {

         fps = frameCount;    
         frameCount = 0;
         lastTime = newTime;
     }

// mostrar los FPS en una capa del documento
// que hemos construído en la función start()
    fpsContainer.innerHTML = 'FPS: ' + fps; 
    frameCount++;
 };

  // clears the canvas content
  function clearCanvas() {
    ctx.clearRect(0, 0, w, h);
  }

  // Función para pintar la raqueta Vaus
  function drawVaus(x, y) {
    // TU CÓDIGO AQUÍ(STOP2 HECHO)

    ctx.save();
    ctx.fillStyle = "black";
    ctx.fillRect(x, y, 30, 10); //pintamos la recta de 30w y 10h
    ctx.restore();

 }

  
   var mainLoop = function(time){
    measureFPS(time);
    // TU CÓDIGO AQUÍ(Stop1 HECHO)
    X = Math.floor(Math.random() * maxWidth);
    Y = Math.floor(Math.random() * maxHeight);
    ctx.beginPath();
    ctx.arc(X,Y,r,0,2*Math.PI);
    ctx.strokeStyle = "#000000";
    ctx.fillStyle = "#FF0000";
    ctx.lineWidth = 5;
    ctx.fill();
    ctx.stroke();

    // Clear the canvas
    clearCanvas();

    // draw the monster
    drawVaus(10, 135);
   // canvas.width = w; Esto es para limpiar la pantalla
    requestAnimationFrame(mainLoop);
  };

  var start = function(){

    // adds a div for displaying the fps value
    fpsContainer = document.createElement('div');
    document.body.appendChild(fpsContainer);
    
    // start the animation
    requestAnimationFrame(mainLoop);
  };
  return {
    start: start
  };
};

var game = new GF();
game.start();

test('Testeando colores', function(assert) {  
  // canvas, x,y, r,g,b, a, mezua
  
  assert.pixelEqual( canvas, 10,135, 0,0,0,255,"Passed!");  

});


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                       TESTS                                                                            //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


/* Testeamos STOP1

test('Testeando colores', function(assert) {  

    var done = assert.async();
    var rojos = 0;
   
  // ctx.fillStyle = 'red';
 //  ctx.fillRect(15,15,4,4);    

  setTimeout(function() {
         var colores = [];
         
         colores.push(
         Array.prototype.slice.apply(canvas.getContext("2d").getImageData(15, 15, 1, 1).data), Array.prototype.slice.apply(canvas.getContext("2d").getImageData(45, 45, 1, 1).data), Array.prototype.slice.apply(canvas.getContext("2d").getImageData(75, 75, 1, 1).data), Array.prototype.slice.apply(canvas.getContext("2d").getImageData(105, 105, 1, 1).data),
 Array.prototype.slice.apply(canvas.getContext("2d").getImageData(135, 135, 1, 1).data)
         );
         
   for(var i=0; i< colores.length; i++)
      if (colores[i][0] == 255)
            rojos++;
         
   assert.ok( rojos >= 1, "Passed!");  
    done();
  }, 10000 );
    
});
*/

/* TESTEAMOS STOP2 (Es uno muy parecido al que estaba lo he cambiado porque me daba pronblema de libreia)

test('Testeando colores', function(assert) {
  const context = canvas.getContext('2d');
  const pixelData = context.getImageData(10, 135, 1, 1).data;
  assert.equal(pixelData[0], 0, "El componente rojo debería ser 0");
  assert.equal(pixelData[1], 0, "El componente verde debería ser 0");
  assert.equal(pixelData[2], 0, "El componente azul debería ser 0");
  assert.equal(pixelData[3], 255, "El componente alfa debería ser 255");
});

*/
