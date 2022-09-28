const { Promise } = require("../index");

console.log('This test script checks if the Promise class is able to pass on error object to the .catch block');
new Promise(function(resolve, reject){
    setTimeout(function(){
        console.log('1st block');
        return resolve();
    }, Math.random() * 1000);
})
.then(function(){
    return new Promise(function(resolve, reject){
        setTimeout(function(){
            console.log('2nd block');
            return resolve();
        }, Math.random() * 1000);
    });
})
.then(function(){
  return new Promise(function(resolve, reject){
      setTimeout(function(){
          return reject(new Error('This is a custom error which happened at ' + new Date()));
      }, Math.random() * 1000);
  });
})
.then(function(){
  return new Promise(function(resolve, reject){
      setTimeout(function(){
          console.log('4th block');
          return resolve();
      }, Math.random() * 1000);
  });
})
.then(function(){
  return new Promise(function(resolve, reject){
      setTimeout(function(){
          console.log('5th block');
          return resolve();
      }, Math.random() * 1000);
  });
})
.catch(function(err){
	console.error('Oh no! There is an error caught by the catch block');
    console.error(err);
})
.finally(function(){
    console.log('This is a finally block and it must be printed every time!');   
})