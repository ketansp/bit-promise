class Promise {
  
  /**
   * This is the asynchronous function which we intend to execute synchronously
   * the function should have successHandler and errorHandler as parameters of type Function
   * @param {Function} asyncFunctionToBeExecuted 
   */
  constructor(asyncFunctionToBeExecuted){
    this.asyncFunctionToBeExecuted = asyncFunctionToBeExecuted;
    this.subsequentSuccessFunctions = [];
    this.subsequentErrorFunctions = [];

    /**
     * read .then as a function which registers subsequent success handler function
     * @param {Function} subsequentSuccessFunction 
     */
    this.then = (subsequentSuccessFunction)=>{
      this.subsequentSuccessFunctions.push(subsequentSuccessFunction);
      return this;
    }

    /**
     * read .catch as a function which registers subsequent error handler function
     * @param {Function} subsequentErrorFunction 
     */
    this.catch = (subsequentErrorFunction)=>{
      this.subsequentErrorFunctions.push(subsequentErrorFunction);
      return this;
    }

    /**
     * This is what is trigger all the subsequent success function.
     * The thumb rule is that, if we get another promise in subsequent function, 
     * we will break current chain to move it to new promise's subsequentSuccessFunctions array.
     */
    let handleSuccess = () => {
      let dataToBePassedOn = [...arguments];
      if(this.subsequentSuccessFunctions.length > 0){
        let targetPromise;
        for (let index = 0; index < this.subsequentSuccessFunctions.length; index++) {
          if(targetPromise){
            targetPromise.then(this.subsequentSuccessFunctions[index])
          } else {
            let returnedData = this.subsequentSuccessFunctions[index].apply(null, dataToBePassedOn);
            if(returnedData instanceof Promise){
              targetPromise = returnedData;
            }
          }
        }
      }
    }

    /**
     * This is what is trigger all the subsequent error function.
     * The thumb rule is that, if we get another promise in subsequent error function, 
     * we will break current chain to move it to new promise's subsequentSuccessFunctions array.
     */
    let handleError = () => {
      let dataToBePassedOn = [...arguments];
      if(this.subsequentErrorFunctions.length > 0){
        let targetPromise;
        for (let index = 0; index < this.subsequentErrorFunctions.length; index++) {
          if(targetPromise){
            targetPromise.catch(this.subsequentErrorFunctions[index])
          } else {
            let returnedData = this.subsequentErrorFunctions[index].apply(null, dataToBePassedOn);
            if(returnedData instanceof Promise){
              targetPromise = returnedData;
            }
          }
        }
      }
    }

    /**
     * Lets now execute the main function which we have been waiting for. 
     * Lets hope that the arguments have been used correctly on the callee function
     */
    this.asyncFunctionToBeExecuted.apply(null, [handleSuccess, handleError]);

  }
}

module.exports = {
  Promise
};