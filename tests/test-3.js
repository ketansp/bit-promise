const {
    Promise
  } = require("../index");
  
  console.log('This test script checks if the Promise class handles the function added via .finally');
  new Promise(function(resolve, reject) {
      setTimeout(function() {
        console.log('1st block');
        return resolve();
      }, Math.random() * 1000);
    })
    .then(function() {
      return new Promise(function(resolve, reject) {
        setTimeout(function() {
          console.log('2nd block');
          return resolve();
        }, Math.random() * 1000);
      });
    })
    .then(function() {
      return new Promise(function(resolve, reject) {
        setTimeout(function() {
          console.log('3rd block');
          return resolve();
        }, Math.random() * 1000);
      });
    })
    .then(function() {
      return new Promise(function(resolve, reject) {
        setTimeout(function() {
          console.log('4th block');
          return resolve();
        }, Math.random() * 1000);
      });
    })
    .then(function() {
      return new Promise(function(resolve, reject) {
        setTimeout(function() {
          console.log('5th block');
          return resolve();
        }, Math.random() * 1000);
      });
    })
    .catch(function() {
      console.error('Oh no! There is an error caught by the catch block');
    })
    .finally(function() {
      console.log('This is a finally block and it must be printed every time!');
    })