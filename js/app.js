window.onload = function init() {
    requestAnimationFrame(mainloop);
 };  
 
 function mainloop(timestamp) {
    document.body.innerHTML += "*";
  
    // call back itself every 60th of second
    requestAnimationFrame(mainloop);
 }

 var GF = function(){
   var mainLoop = function(time){
    // Función Main, llamada en cada frame
    requestAnimationFrame(mainLoop);
   };
   var start = function(){
    requestAnimationFrame(mainLoop);
   };
   // Nuestro GameFramework sólo muestra una función pública al exterior (el método start)
   return {
    start: start
   };
 };

 var game = new GF();
// Lanzar el juego, comenzar el bucle de animación, etc.
game.start();