const budgetController = (function() {

  return {
    
  }
})();


const UIController = (function() {

  return {

  }

})();


const controller = (function(budgetCtrl, UICtrl) {
  
  const ctrlAddItem = function() { console.log(`btn was clicked`) }
  document.querySelector('.add__btn').addEventListener('click', ctrlAddItem)
  document.addEventListener('keypress', (e) => {
    const keyCode = (event.keyCode ? event.keyCode : event.which); 
    if(keyCode !== 13) return;
    ctrlAddItem();
  })
  return {
    
  }
})(budgetController, UIController);

