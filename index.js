class Promise {
  
  /**
   * This is the asynchronous function which we intend to execute synchronously
   * the function should have successHandler and errorHandler as parameters of type Function
   * @param {Function} asyncFunctionToBeExecuted 
   */
  constructor(asyncFunctionToBeExecuted){
    this.asyncFunctionToBeExecuted = asyncFunctionToBeExecuted;
    this.subsequentFunctionsRegistry = [];

    const SUBSEQUENTFUNCTIONTYPES = {
      SUCCESS: 'SUCCESS',
      ERROR: 'ERROR',
      FINAL: 'FINAL'
    };

    /**
     * read .then as a function which registers subsequent success handler function
     * @param {Function} subsequentSuccessFunction 
     */
    this.then = (subsequentSuccessFunction)=>{
      this.subsequentFunctionsRegistry.push({
          type: SUBSEQUENTFUNCTIONTYPES.SUCCESS,
          subsequentFunction : subsequentSuccessFunction
      });
      return this;
    }

    /**
     * read .catch as a function which registers subsequent error handler function
     * @param {Function} subsequentErrorFunction 
     */
    this.catch = (subsequentErrorFunction)=>{
      this.subsequentFunctionsRegistry.push({
          type: SUBSEQUENTFUNCTIONTYPES.ERROR,
          subsequentFunction : subsequentErrorFunction
      });
      return this;
    }

    /**
     * read .finally as a function which registers subsequent final handler function
     * @param {Function} subsequentFinalFunction 
     */
    this.finally = (subsequentFinalFunction)=>{
      this.subsequentFunctionsRegistry.push({
          type: SUBSEQUENTFUNCTIONTYPES.FINAL,
          subsequentFunction : subsequentFinalFunction
      });
      return this;
    }

    /**
     * This is what will trigger all the subsequent success function.
     * The thumb rule is that, if we get another promise in subsequent function, 
     * we will break current chain to move it to new promise's subsequentFunctionsRegistry array.
     * alias "resolve"
     */
    let handleSuccess = (data) => {
      if(this.subsequentFunctionsRegistry.length > 0){
        let targetPromise;
        for (let index = 0; index < this.subsequentFunctionsRegistry.length; index++) {
          if(targetPromise){
            if(this.subsequentFunctionsRegistry[index].type === SUBSEQUENTFUNCTIONTYPES.SUCCESS){
              targetPromise.then(this.subsequentFunctionsRegistry[index].subsequentFunction)
            } else if(this.subsequentFunctionsRegistry[index].type === SUBSEQUENTFUNCTIONTYPES.ERROR){
              targetPromise.catch(this.subsequentFunctionsRegistry[index].subsequentFunction)
            } else if(this.subsequentFunctionsRegistry[index].type === SUBSEQUENTFUNCTIONTYPES.FINAL){
              targetPromise.finally(this.subsequentFunctionsRegistry[index].subsequentFunction)
            } 
          } else {
            if(this.subsequentFunctionsRegistry[index].type !== SUBSEQUENTFUNCTIONTYPES.ERROR){
              let returnedData = this.subsequentFunctionsRegistry[index].subsequentFunction.apply(null, [data]);
              if(returnedData instanceof Promise){
                targetPromise = returnedData;
              }
            }
          }
        }
      }
    }

    /**
     * This is what will trigger the subsequent error function.
     * The thumb rule is that, if we get another promise in subsequent error function, 
     * we will break current chain to move it to new promise's subsequentFunctionsRegistry array.
     * alias "reject"
     */
    let handleError = (error) => {
      if(this.subsequentFunctionsRegistry.length > 0){
        let targetPromise;
        for (let index = 0; index < this.subsequentFunctionsRegistry.length; index++) {
          if(targetPromise){
            if(this.subsequentFunctionsRegistry[index].type === SUBSEQUENTFUNCTIONTYPES.SUCCESS){
              targetPromise.then(this.subsequentFunctionsRegistry[index].subsequentFunction)
            } else if(this.subsequentFunctionsRegistry[index].type === SUBSEQUENTFUNCTIONTYPES.ERROR){
              targetPromise.catch(this.subsequentFunctionsRegistry[index].subsequentFunction)
            } else if(this.subsequentFunctionsRegistry[index].type === SUBSEQUENTFUNCTIONTYPES.FINAL){
              targetPromise.finally(this.subsequentFunctionsRegistry[index].subsequentFunction)
            } 
          } else {
            if(this.subsequentFunctionsRegistry[index].type !== SUBSEQUENTFUNCTIONTYPES.SUCCESS){
              let returnedData = this.subsequentFunctionsRegistry[index].subsequentFunction.apply(null, [error]);
              if(returnedData instanceof Promise){
                targetPromise = returnedData;
              }
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