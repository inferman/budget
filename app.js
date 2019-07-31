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
      inc: 0,
      exp: 0
    },
    budget: 0,
    percentage: -1
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
    calculateBudget: _ => {
      // Calculate total income and expenses
      Object.keys(data.totals).forEach(type => {
        data.totals[type] = data.allItems[type].reduce((acc, curr) => acc + curr.value, 0);
      });

      // Calculate budget: income - expenses
      data.budget = data.totals.inc - data.totals.exp;

      // Calculate the percentage of income that we spent
      if(data.totals.inc) {
        data.percentage = Math.round((data.totals.exp * 100) / data.totals.inc);
      } else { data.percentage = -1; }
      
      
    },
    getBudget: _ => ({
      budget: data.budget,
      percentage: data.percentage,
      totalInc: data.totals.inc,
      totalExp: data.totals.exp
    }),
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
    expensesContainer: '.expenses__list',
    budgetLabel: '.budget__value',
    incomeLabel: '.budget__income--value',
    expensesLabel: '.budget__expenses--value',
    percentagesLabel: '.budget__expenses--percentage'
  };

  return {
    getDOMnode: key => DOMStrings[key],
    getInputs: _ => ({      
      type: document.querySelector(DOMStrings.inputType).value,
      description: document.querySelector(DOMStrings.inputDescription).value,
      value: +document.querySelector(DOMStrings.inputValue).value,
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
    },
    displayBudget: (obj) => {
      document.querySelector(DOMStrings.budgetLabel).textContent = obj.budget;
      document.querySelector(DOMStrings.incomeLabel).textContent = obj.totalInc;
      document.querySelector(DOMStrings.expensesLabel).textContent = obj.totalExp;
      obj.percentage > 0
        ? document.querySelector(DOMStrings.percentagesLabel).textContent = obj.percentage + '%'
        : document.querySelector(DOMStrings.percentagesLabel).textContent = '---'
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

  const updateBudget = function() {
    // 1. Calculate the budget
    budgetCtrl.calculateBudget();

    // 2. Return the budget
    const budget = budgetCtrl.getBudget();

    // 3. Display the budget on the UI
    UICtrl.displayBudget(budget);
  };

  const checkFields = fields => !!fields.filter(field => !!field === false).length;

  const ctrlAddItem = function() { 
    // 1. Get the field input data
    const input = UICtrl.getInputs();

    if(checkFields(Object.values(input))) return 

    // 2. Add the item to the budget controller
    const newItem = budgetCtrl.addItem(input.type, input.description, input.value);

    // 3. Add the item to the UI
    UICtrl.addListItem(newItem, input.type);

    // 4. Clear the fields
    UICtrl.resetFields();

    // 5. Calculate and update the budget
    updateBudget();


  };
  
  return {
    init: () => {
      setEventListeners();
      updateBudget({
        budget: 0,
        percentage: 0,
        totalInc: 0,
        totalExp: 0
      });
    },

  }
})(budgetController, UIController);

controller.init();