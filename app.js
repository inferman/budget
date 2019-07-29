const budgetController = (function() {

  let Expense = function(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  let Income = function(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  const data = {
    allItems: {
      inc: [],
      exp: []
    },
    totals: {
      get inc() {
        return data.allItems.inc.length || 0
      },
      get exp() {
        return data.allItems.exp.length || 0
      }
    }
  }

  return {
    addItem: (type, des, val) => {
      const ID = 
        data.allItems[type].length
        ? data.allItems[type][data.allItems[type].length - 1].id + 1
        : 0;

      const newItem =
        type === 'exp' 
        ? new Expense(ID, des, val)
        : new Income(ID, des, val);

      data.allItems[type].push(newItem);
      
      return newItem;
    },
    testing: _ => { console.log(data) }
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
    let input, newItem;
    input = UICtrl.getInputs();
    newItem = budgetCtrl.addItem(input.type, input.description, input.value);
    budgetCtrl.testing();
  }
  
  return {
    init: () => {
      setEventListeners();
    },
    addNewItem: () => {
      
    } 
  }
})(budgetController, UIController);

controller.init();