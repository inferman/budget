const budgetController = (function() {
  // const data = val;
  const x = 15
  const add = function(a) {
    return x + a
  }

  return {
    publicTest: (b) => add(b)
  }
})();

const UIController = (function() {

})();

const controller = (function(budgetCtrl, UICtrl) {
  const test = budgetCtrl.publicTest(10);

  return {
    callBudgetMethod: _ => test 
  }
})(budgetController, UIController);

