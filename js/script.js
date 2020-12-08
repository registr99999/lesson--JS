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
    depositCheck = document.querySelector('#deposit-check'),
    expensesItems = document.querySelectorAll('.expenses-items'),
    depositAmount = document.querySelector('.deposit-amount'),
    depositPercent = document.querySelector('.deposit-percent'),
    targetAmount = document.querySelector('.target-amount'),
    periodSelect = document.querySelector('.period-select'),
    incomeItems = document.querySelectorAll('.income-items'),
    periodAmount = document.querySelector('.period-amount');



let appData = {
    budget: 0,
    budgetDay: 0,
    budgetMonth: 0,
    income: {},
    addIncome: [],
    incomeMonth: 0,
    expenses: {},
    expensesMonth: 0,
    getExpensesMonth: 0,
    addExpenses: [],
    deposit: false,
    percentDeposit: 0,
    moneyDeposit: 0,
    start: function () {
        appData.budget = +salaryAmount.value;
        appData.getExpenses();
        appData.getIncome();
        appData.getExpensesMonth();
        appData.getIncomeMonth();
        appData.getBudget();
        appData.calcPeriod();
        appData.getInfoDeposit();
        appData.getStatusIncome();
        appData.getAddExpenses();
        appData.getAddIncome();
        appData.showResult();
        appData.blockActivInput();
    },
    reset: function(){
        let allInput = document.getElementsByTagName('input');
        for (let index = 0; index < allInput.length; index++) {
            allInput[index].value = '';
        }
        buttonCalc.style.display = 'block';
        buttonReset.style.display = 'none';
        incomeTitle.removeAttribute('disabled', 'disabled');
        additionalIncomeItem00.removeAttribute('disabled', 'disabled');
        additionalIncomeItem01.removeAttribute('disabled', 'disabled');
        expensesTitle.removeAttribute('disabled', 'disabled');
        additionalExpensesItem.removeAttribute('disabled', 'disabled');
    },
    blockActivInput: function () {
        incomeTitle.setAttribute('disabled', 'disabled');
        additionalIncomeItem00.setAttribute('disabled', 'disabled');
        additionalIncomeItem01.setAttribute('disabled', 'disabled');
        expensesTitle.setAttribute('disabled', 'disabled');
        additionalExpensesItem.setAttribute('disabled', 'disabled');
        buttonCalc.style.display = 'none';
        buttonReset.style.display = 'block';
    },

    showResult: function () {
        budgetMonthValue.value = this.budgetMonth;// вывод значения в поле Доход за месяц
        budgetDayValue.value = this.budgetDay;// вывод значения в поле Дневной бюджет
        expensesMonthValue.value = this.expensesMonth; // вывод значения в поле Расход за месяц
        additionalExpensesValue.value = this.addExpenses.join(', '); // вывод значения в поле Возможные расходы
        additionalIncomeValue.value = this.addIncome.join(', ');// вывод значения в поле Возможные доходы
        targetMonthValue.value = this.getTargetTime();// вывод значения в поле Срок достижения цели в месяцах
        incomePeriodValue.value = this.calcPeriod();// вывод значения в поле Накопления за период
    },
    addIncomeBlock: function () { // добавление полей дополнительный доход
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

    },
    addExpensesBlock: function () { // добавление полей обязательные расходы
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
    },
    getExpenses: function () { // запись значений с полей Обязательные расходы в appData.expenses 
        expensesItems.forEach(function (item) {
            let itemExpenses = item.querySelector('.expenses-title').value;
            let cashExpenses = +item.querySelector('.expenses-amount').value;
            if (itemExpenses !== '' && cashExpenses !== '') {
                appData.expenses[itemExpenses] = cashExpenses;
            }
        });

    },
    getIncome: function () { // запись значений с полей Дополнительный доход в appData.income 
        incomeItems.forEach(function (item) {
            let incomeTitle = item.querySelector('.income-title').value;
            let incomeAmount = +item.querySelector('.income-amount').value;
            if (incomeTitle !== '' && incomeAmount !== '') {
                appData.income[incomeTitle] = incomeAmount;
            }
        });
    },
    getAddExpenses: function () { // запись значений с полей Дополнительный доход в appData.income 
        let addExpenses = additionalExpensesItem.value.split(',');
        addExpenses.forEach(function (item) {
            item = item.trim();
            if (item !== '') {
                appData.addExpenses.push(item);
            }
        });
    },
    getAddIncome: function () {
        let addIncome = (additionalIncomeItem00.value + ' ' + additionalIncomeItem01.value).split(', ');
        console.log(addIncome);

        addIncome.forEach(function (item) {
            item = item.trim();
            if (item !== '') {
                appData.addIncome.push(item);
            }
        });
    },
    getExpensesMonth: function () {
        for (let key in this.expenses) {
            this.expensesMonth += this.expenses[key];
        }
    },
    getIncomeMonth: function () {
        for (let key in this.income) {
            this.incomeMonth += this.income[key];
        }
    },
    getBudget: function () {
        appData.budgetMonth = appData.budget + appData.incomeMonth - appData.expensesMonth;
        appData.budgetDay = Math.ceil(appData.budgetMonth / 30);
    },

    handlePeriodChange: function () {
        const value = +periodSelect.value;

        periodAmount.textContent = value;
        incomePeriodValue.value = value * appData.budgetMonth;
    },

    getTargetTime: function () {
        return Math.ceil(targetAmount.value / this.budgetMonth);
    },

    getStatusIncome: function () {
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
    },
    getInfoDeposit: function () {
        if (this.deposit) {
            this.percentDeposit = appData.start('Какой годовой процент?');
            this.moneyDeposit = appData.start('Какая сумма заложена?');
        }
        return appData.deposit;
    },
    calcPeriod: function () {
        return appData.budgetMonth * targetMonthValue.value; // считает накопления за период
    },

};


buttonReset.addEventListener('click', appData.reset.bind(appData))
    


buttonCalc.addEventListener('click', appData.start.bind(appData));


buttonCalc.setAttribute('disabled', 'disabled');

let falseInputValue = function () {
    salaryAmount.addEventListener('input', function () {
        if (salaryAmount.value === '') {
            buttonCalc.setAttribute('disabled', 'disabled');
        } else {
            buttonCalc.removeAttribute('disabled');
        }
    });
};

falseInputValue();

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





periodSelect.addEventListener('change', appData.handlePeriodChange);
buttonPlusOne.addEventListener('click', appData.addIncomeBlock);
buttonPlusTwo.addEventListener('click', appData.addExpensesBlock);



//------------------------------------------------------------------------------------------------------------------------
// ВЫВОД В КОНСОЛЬ






/* for (let key in appData) {
    console.log('Наша программа включает в себя данные:' + 'свойства ' + key + ' их значения ' + appData);
} */
