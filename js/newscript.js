'use strict';

let buttonCalc = document.getElementById('start'),
    buttonReset = document.getElementById('cancel'),
    data = document.querySelector('.data'),
    buttonPlusOne = document.getElementsByTagName('button')[0],
    buttonPlusTwo = document.getElementsByTagName('button')[1],
    buttonCheckbox = document.getElementById('deposit-check'),
    budgetMonthValue = document.getElementsByClassName('budget_month-value')[0],
    budgetDayValue = document.getElementsByClassName('budget_day-value')[0],
    expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0], // Расход за месяц
    additionalIncomeValue = document.querySelectorAll('.additional_income-value')[0],
    additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0],
    incomePeriodValue = document.getElementsByClassName('income_period-value')[0],
    targetMonthValue = document.getElementsByClassName('target_month-value')[0],
    salaryAmount = document.querySelector('.salary-amount'),
    incomeTitle = document.querySelectorAll('.income-title')[1],
    incomeAmount = document.querySelector('.income-amount'),
    expensesAmount = document.querySelector('.expenses-amount'),
    expensesTitle = document.querySelectorAll('.expenses-title')[1],
    additionalIncomeItem00 = document.querySelectorAll('.additional_income-item')[0],
    additionalIncomeItem01 = document.querySelectorAll('.additional_income-item')[1],
    additionalExpensesItem = document.querySelector('.additional_expenses-item'),
    expensesItems = document.querySelectorAll('.expenses-items'),
    depositAmount = document.querySelector('.deposit-amount'),
    depositPercent = document.querySelector('.deposit-percent'),
    targetAmount = document.querySelector('.target-amount'),
    periodSelect = document.querySelector('.period-select'),
    incomeItems = document.querySelectorAll('.income-items'),
    periodAmount = document.querySelector('.period-amount');

const AppData = function () {
    this.budget = 0;
    this.budgetDay = 0;
    this.budgetMonth = 0;
    this.income = {};
    this.addIncome = [];
    this.incomeMonth = 0;
    this.expenses = {};
    this.expensesMonth = 0;
    this.getExpensesMonth = 0;
    this.addExpenses = [];
    this.deposit = false;
    this.percentDeposit = 0;
    this.moneyDeposit = 0;
};

AppData.prototype.check = function () {
    salaryAmount.addEventListener('input', function () {
        if (salaryAmount.value === '') {
            buttonCalc.setAttribute('disabled', 'disabled');
        } else {
            buttonCalc.removeAttribute('disabled');
        }
    });
};

AppData.prototype.start = function () {
    this.check();
    this.budget = +salaryAmount.value;
    this.getExpenses();
    this.getIncome();
    this.getExpensesMonth();
    this.getIncomeMonth();
    this.getBudget();
    this.calcPeriod();
    this.getInfoDeposit();
    this.getStatusIncome();
    this.getAddExpenses();
    this.getAddIncome();
    this.showResult();
    this.blockActivInput();
};

const appData = new AppData();

console.log(appData);


AppData.prototype.showResult = function () {
    budgetMonthValue.value = this.budgetMonth;// вывод значения в поле Доход за месяц
    budgetDayValue.value = this.budgetDay;// вывод значения в поле Дневной бюджет
    expensesMonthValue.value = this.expensesMonth; // вывод значения в поле Расход за месяц
    additionalExpensesValue.value = this.addExpenses.join(', '); // вывод значения в поле Возможные расходы
    additionalIncomeValue.value = this.addIncome.join(', ');// вывод значения в поле Возможные доходы
    targetMonthValue.value = this.getTargetTime();// вывод значения в поле Срок достижения цели в месяцах
    incomePeriodValue.value = this.calcPeriod();// вывод значения в поле Накопления за период
};
AppData.prototype.addIncomeBlock = function () { // добавление полей дополнительный доход
    
    const clonedExpensesIncome = incomeItems[0].cloneNode(true);
    const controls = clonedExpensesIncome.getElementsByTagName('input');

    for (let i = 0; i < controls.length; i++) {
        controls[i].value = null;
    }
    incomeItems[0].parentNode.insertBefore(clonedExpensesIncome, buttonPlusOne);

    incomeItems = document.querySelectorAll('.income-items');

    if (incomeItems.length === 3) {
        buttonPlusOne.style.display = 'none';
    }
};
AppData.prototype.addExpensesBlock = function () { // добавление полей обязательные расходы
    const clonedExpensesItem = expensesItems[0].cloneNode(true);
    const controls = clonedExpensesItem.getElementsByTagName('input');

    for (let i = 0; i < controls.length; i++) {
        controls[i].value = null;
    }

    expensesItems[0].parentNode.insertBefore(clonedExpensesItem, buttonPlusTwo);

    expensesItems = document.querySelectorAll('.expenses-items');

    if (expensesItems.length === 3) {
        buttonPlusTwo.style.display = 'none';
    }
};
AppData.prototype.getExpenses = function () { // запись значений с полей Обязательные расходы в appData.expenses 
    expensesItems.forEach(function (item) {
        let itemExpenses = item.querySelector('.expenses-title').value;
        let cashExpenses = +item.querySelector('.expenses-amount').value;
        if (itemExpenses !== '' && cashExpenses !== '') {
            this.expenses[itemExpenses] = cashExpenses;
        }
    });

};
AppData.prototype.getIncome = function () { // запись значений с полей Дополнительный доход в appData.income 
    const _this = this;
    incomeItems.forEach(function (item) {
        let incomeTitle = item.querySelector('.income-title').value;
        let incomeAmount = +item.querySelector('.income-amount').value;
        if (incomeTitle !== '' && incomeAmount !== '') {
            _this.income[incomeTitle] = incomeAmount;
        }
    });
};
AppData.prototype.getAddExpenses = function () { // запись значений с полей Дополнительный доход в appData.income 
    const _this = this;
    let addExpenses = additionalExpensesItem.value.split(',');
    addExpenses.forEach(function (item) {
        item = item.trim();
        if (item !== '') {
            _this.addExpenses.push(item);
        }
    });
};
AppData.prototype.getAddIncome = function () {
    const _this = this;
    let addIncome = (additionalIncomeItem00.value + ' ' + additionalIncomeItem01.value).split(', ');
    addIncome.forEach(function (item) {
        item = item.trim();
        if (item !== '') {
            _this.addIncome.push(item);
        }
    });
};
AppData.prototype.getExpensesMonth = function () {
    for (let key in this.expenses) {
        this.expensesMonth += this.expenses[key];
    }
};
AppData.prototype.getIncomeMonth = function () {
    for (let key in this.income) {
        this.incomeMonth += this.income[key];
    }
};
AppData.prototype.getBudget = function () {
    this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
    this.budgetDay = Math.ceil(this.budgetMonth / 30);
};
AppData.prototype.handlePeriodChange = function () {
    const value = +periodSelect.value;

    periodAmount.textContent = value;
    incomePeriodValue.value = value * this.budgetMonth;
};
AppData.prototype.getTargetTime = function () {
    return Math.ceil(targetAmount.value / this.budgetMonth);
};

AppData.prototype.getStatusIncome = function () {
    switch (true) {
        case this.getBudget >= 1200:
            console.log('У вас высокий уровень дохода');
            break;
        case this.getBudget >= 600 && this.getBudget < 1200:
            console.log('У вас средний уровень дохода');
            break;
        case this.getBudget < 600:
            console.log('К сожалению у вас уровень дохода ниже среднего');
            break;
        case this.getBudget < 0:
            console.log('Что то пошло не так');
            break;
        default:
            console.log('дефолтный вывод');
            break;
    }
};
AppData.prototype.getInfoDeposit = function () {
    if (this.deposit) {
        this.percentDeposit = this.start('Какой годовой процент?');
        this.moneyDeposit = this.start('Какая сумма заложена?');
    }
    return this.deposit;
};
AppData.prototype.calcPeriod = function () {
    return this.budgetMonth * targetMonthValue.value; // считает накопления за период
};
AppData.prototype.reset = function () {
    falseInputValue();
    appData.inputValidation();
    let allInput = document.getElementsByTagName('input');
    for (let index = 0; index < allInput.length; index++) {
        allInput[index].value = null;
        allInput[index].textContent = '';
    }
    incomeTitle.removeAttribute('disabled', 'disabled');
    additionalIncomeItem00.removeAttribute('disabled', 'disabled');
    additionalIncomeItem01.removeAttribute('disabled', 'disabled');
    expensesTitle.removeAttribute('disabled', 'disabled');
    additionalExpensesItem.removeAttribute('disabled', 'disabled');   
    buttonCheckbox.checked = false;
    this.removeBlockIncome();
    this.removeButtonIncome();
    this.removeBlockExpenses();
    this.removeButtonExpenses();
    periodSelect.value = 1;
    periodAmount.textContent = 1;
    buttonReset.style.display = 'none';
    buttonCalc.style.display = 'block';

    this.income = {};
    this.incomeMonth = 0;
    this.addIncome = [];
    this.expenses = {};
    this.addExpenses = [];
    this.deposit = false;
    this.percentDeposit = 0;
    this.moneyDeposit = 0;
    this.period = 0;
    this.budget = 0;
    this.budgetDay = 0;
    this.budgetMonth = 0;
    this.expensesMonth = 0;
    this.incomePeriodValue = 0;
    this.targetMonthValue = 0;
};
AppData.prototype.inputValidation = function() {
    salaryAmount.addEventListener('input', function () {
        if (salaryAmount.value === '') {
            buttonCalc.setAttribute('disabled', 'disabled');
        } else {
            buttonCalc.removeAttribute('disabled');
        }
    });
};
AppData.prototype.removeBlockIncome = function () {
    let blockIncome = document.querySelectorAll('.income-items');
    for (let index = 1; index < blockIncome.length; index++) {
        blockIncome[index].remove();
    }
};
AppData.prototype.removeButtonIncome = function () {
    let blockIncome = document.querySelectorAll('.income-items');
    buttonPlusOne.style.display = 'block';
    if (blockIncome.length === 3) {
        buttonPlusOne.style.display = 'none';
    }
};
AppData.prototype.removeBlockExpenses = function () {
    let blockExpenses = document.querySelectorAll('.expenses-items');
    for (let index = 1; index < blockExpenses.length; index++) {
        blockExpenses[index].remove();
    }
};
AppData.prototype.removeButtonExpenses = function () {
    let blockExpenses = document.querySelectorAll('.expenses-items');
    buttonPlusTwo.style.display = 'block';
    if (blockExpenses.length === 3) {
        buttonPlusTwo.style.display = 'none';
    }
};
AppData.prototype.blockActivInput = function () {
    incomeTitle.setAttribute('disabled', 'disabled');
    additionalIncomeItem00.setAttribute('disabled', 'disabled');
    additionalIncomeItem01.setAttribute('disabled', 'disabled');
    expensesTitle.setAttribute('disabled', 'disabled');
    additionalExpensesItem.setAttribute('disabled', 'disabled');
    buttonCalc.style.display = 'none';
    buttonReset.style.display = 'block';
};



buttonReset.addEventListener('click', appData.reset.bind(appData));


buttonCalc.addEventListener('click', appData.start.bind(appData));


buttonCalc.setAttribute('disabled', 'disabled');



function validFormNumber(a) {
    a.addEventListener('keydown', function () {
        this.value = this.value.replace(/[^\d]/g, '');
    });
}
function validFormString(a) {
    a.addEventListener('keydown', function () {
        this.value = this.value.replace(/[^abc]/g, '');
    });
}

validFormNumber(incomeAmount);
validFormNumber(expensesAmount);
validFormNumber(salaryAmount);
validFormNumber(targetAmount);

function falseInputValue () {
    salaryAmount.addEventListener('input', function () {
        if (salaryAmount.value === '') {
            buttonCalc.setAttribute('disabled', 'disabled');
        } else {
            buttonCalc.removeAttribute('disabled');
        }
    });
}

falseInputValue();




periodSelect.addEventListener('change', appData.handlePeriodChange);
buttonPlusOne.addEventListener('click', appData.addIncomeBlock.bind(appData));
buttonPlusTwo.addEventListener('click', appData.addExpensesBlock);
