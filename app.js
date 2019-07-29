const budgetController = (function() {

  return {
    
  }
})();


const UIController = (function() {

  const DOMStrings = {
    inputType: '.add__type',
    inputDescription: '.add__description',
    inputValue: '.add__value',
    inputAddBtn: '.add__btn'
  };

  return {
    getDOMnode: key => DOMStrings[key],
    getInputs: _ => ({      
        type: document.querySelector(DOMStrings.inputType).value,
        description: document.querySelector(DOMStrings.inputDescription).value,
        value: document.querySelector(DOMStrings.inputValue).value,
    })
  }

})();


const controller = (function(budgetCtrl, UICtrl) {
  
  const setEventListeners = function() {
    document.querySelector(UICtrl.getDOMnode('inputAddBtn')).addEventListener('click', ctrlAddItem);

    document.addEventListener('keypress', (e) => {
      const keyCode = (e.keyCode ? e.keyCode : e.which); 
      if(keyCode !== 13) return;
      ctrlAddItem();
    });
  };

  const ctrlAddItem = function() { 
    const input = UICtrl.getInputs();
    console.log(input);    
  }
  
  return {
    init: () => {
      setEventListeners();
    }
  }
})(budgetController, UIController);

controller.init();