const {
    Promise
  } = require("../index");
  
  console.log('This test script checks if the Promise class is able to pass on data to subsequent .then blocks');
  new Promise(function(resolve, reject) {
      setTimeout(function() {
        console.log('1st block');
        let dataToBeSent = Math.random().toFixed(5);
        console.log('sending data to the next promise ' + dataToBeSent)
        return resolve(dataToBeSent);
      }, Math.random() * 1000);
    })
    .then(function(data) {
      console.log('data received ' + data);
      return new Promise(function(resolve, reject) {
        setTimeout(function() {
          console.log('2nd block');
          let dataToBeSent = Math.random().toFixed(5);
          console.log('sending data to the next promise ' + dataToBeSent)
          return resolve(dataToBeSent);
        }, Math.random() * 1000);
      });
    })
    .then(function(data) {
      console.log('data received ' + data);
      return new Promise(function(resolve, reject) {
        setTimeout(function() {
          console.log('3rd block');
          let dataToBeSent = Math.random().toFixed(5);
          console.log('sending data to the next promise ' + dataToBeSent)
          return resolve(dataToBeSent);
        }, Math.random() * 1000);
      });
    })
    .then(function(data) {
      console.log('data received ' + data);
      return new Promise(function(resolve, reject) {
        setTimeout(function() {
          console.log('5th block');
          let dataToBeSent = Math.random().toFixed(5);
          console.log('sending data to the next promise ' + dataToBeSent)
          return resolve(dataToBeSent);
        }, Math.random() * 1000);
      });
    })
    .catch(function(err) {
      console.error('Oh no! There is an error caught by the catch block');
      console.error(err);
    })
    .finally(function(data) {
      console.log('This is a finally block and it must be printed every time!');
      console.log('data received ' + data);
    })