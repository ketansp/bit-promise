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
    this.then = function(subsequentSuccessFunction){
      this.subsequentSuccessFunctions.push(subsequentSuccessFunction);
    }

    /**
     * read .catch as a function which registers subsequent error handler function
     * @param {Function} subsequentErrorFunction 
     */
    this.catch = function(subsequentErrorFunction){
      this.subsequentErrorFunctions.push(subsequentErrorFunction);
    }

    /**
     * This is what is trigger all the subsequent success functions
     */
    let handleSuccess = () => {
      let dataToBePassedOn = [...arguments];
      this.subsequentSuccessFunctions.forEach(functionElement => {
        functionElement.apply(null, dataToBePassedOn);
      });
    }

    /**
     * This is what is trigger all the subsequent error functions
     */
    let handleError = () => {
      let dataToBePassedOn = [...arguments];
      this.subsequentErrorFunctions.forEach(functionElement => {
        functionElement.apply(null, dataToBePassedOn);
      });
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