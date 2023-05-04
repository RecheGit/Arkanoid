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


// Game Framework
var GF = function(){
  
   var mainLoop = function(time){
    // TU CÓDIGO AQUÍ
    X = Math.floor(Math.random() * maxWidth);
    Y = Math.floor(Math.random() * maxHeight);
    ctx.beginPath();
    ctx.arc(X,Y,r,0,2*Math.PI);
    ctx.strokeStyle = "#000000";
    ctx.fillStyle = "#FF0000";
    ctx.lineWidth = 5;
    ctx.fill();
    ctx.stroke();
   // canvas.width = w;
    requestAnimationFrame(mainLoop);
  };
  var start = function(){
    requestAnimationFrame(mainLoop);
  };
  return {
    start: start
  };
};

var game = new GF();
game.start();


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


