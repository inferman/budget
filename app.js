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
    inputAddBtn: '.add__btn',
    incomeContainer: '.income__list',
    expensesContainer: '.expenses__list'
  };

  return {
    getDOMnode: key => DOMStrings[key],
    getInputs: _ => ({      
      type: document.querySelector(DOMStrings.inputType).value,
      description: document.querySelector(DOMStrings.inputDescription).value,
      value: document.querySelector(DOMStrings.inputValue).value,
    }),
    addListItem: (data, type) => {
      let html, newHtml, element;
      if(type === 'inc') {
        element = DOMStrings.incomeContainer;
        html = `<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">+ %value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>`
      } else if (type === 'exp') {
        element = DOMStrings.expensesContainer;
        html = `<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">- %value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>`
      }

      newHtml = html.replace('%id%', data.id);
      newHtml = newHtml.replace('%description%', data.description);
      newHtml = newHtml.replace('%value%', data.value);

      document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);

    },
    resetFields: _ => {
      const fields = document.querySelectorAll(`${DOMStrings.inputDescription}, ${DOMStrings.inputValue}`);
      const fieldsArray = [...fields];
      fieldsArray.forEach( item => item.value = '' );
      fieldsArray[0].focus();
      // Array.ptototype.slice.call(fields)
    }
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
    const newItem = budgetCtrl.addItem(input.type, input.description, input.value);
    UICtrl.addListItem(newItem, input.type);
    UICtrl.resetFields();
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