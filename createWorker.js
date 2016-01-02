// creating a function, that returns an object which provides
// API for outside world to use
// we are wrapping this into another function in order to expose only
// a single global variable createWorkerProgram
// OR - even better, create IIFE (function() {code here}()); which
// immediately invokes itsef and doesn't expose anything
var createWorkerProgram = function() {

  var createWorker = function() {

    var workCount = 0;

    var task1 = function() {
      workCount++;
      console.log("task1 " + workCount);
    };

    var task2 = function() {
      workCount++;
      console.log("task2 " + workCount);
    };

    // returns an object using literal syntax - revealing function
    return {
      job1: task1,
      job2: task2
    };
  };

  var worker = createWorker();
  worker.job1();
  worker.job2();
  worker.job2();
  worker.job2();

}

createWorkerProgram();