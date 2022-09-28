# bit-promise
An extremely lightweight implementation of Promise class without any external dependencies

Features
- extremely lightweight
- no external dependencies
- supports `.then`, `.catch` and `.finally` APIs of the promise class.

To-do
- [ ] support for typescript
- [ ] support for concurrent execution using `Promise.all`

Installation
```
npm install bit-promise --save
```

Usage
```
const { Promise } = require("bit-promise");


new Promise(function(resolve, reject){
    ...
})
.then(function(){
    return new Promise(function(resolve, reject){
        ...
    });
})
.
.
...
.catch(function(err){
	...
})
.finally(function(){
    ...
})
```