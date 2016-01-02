// here we are exposing 2 global variables to the world. Bad practice!
// Especially in JavaScript. Better to wrap them into another function,
// like in createWorker.js
var work = function() {
  
  console.log("working hard!");
   
};

var doWork = function(f) {
  console.log("before work");
  try {
    f();
  }
  catch(ex) {
    console.log(ex);
  }
  console.log("after work");
};

doWork(work);