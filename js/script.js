'use strict';

let buttonCalc = document.getElementById('start'),
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
    incomeTitle = document.querySelector('.income-title'),
    incomeAmount = document.querySelector('.income-amount'),
    expensesAmount = document.querySelector('.expenses-amount'),
    additionalIncomeItem = document.querySelector('.additional_income-item'),
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
    checkNaN: function () {
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
    },
    showResult: function () {
        budgetMonthValue.value = appData.budgetMonth;// вывод значения в поле Доход за месяц
        budgetDayValue.value = appData.budgetDay;// вывод значения в поле Дневной бюджет
        expensesMonthValue.value = appData.expensesMonth; // вывод значения в поле Расход за месяц
        additionalExpensesValue.value = appData.addExpenses.join(', '); // вывод значения в поле Возможные расходы
        additionalIncomeValue.value = appData.addIncome.join(', ');// вывод значения в поле Возможные доходы
        // вывод значения в поле Срок достижения цели в месяцах
        incomePeriodValue.value = appData.calcPeriod();// вывод значения в поле Накопления за период
    },
    addIncomeBlock: function () { // добавление полей дополнительный доход
        let cloneExpensesIncome = incomeItems[0].cloneNode(true);
        incomeItems[0].parentNode.insertBefore(cloneExpensesIncome, buttonPlusOne);
        incomeItems = document.querySelectorAll('.income-items');
        incomeItems[0].children[0].removeAttribute('placeholder');
        incomeItems[0].children[1].removeAttribute('placeholder');
        if (incomeItems.length === 3) {
            buttonPlusOne.style.display = 'none';

        }

    },
    addExpensesBlock: function () { // добавление полей обязательные расходы

        let cloneExpensesItem = expensesItems[0].cloneNode(true);
        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, buttonPlusTwo);
        expensesItems = document.querySelectorAll('.expenses-items');

        if (expensesItems.length === 3) {
            buttonPlusTwo.style.display = 'none';
        }
        expensesItems[0].children[0].removeAttribute('placeholder');
        expensesItems[0].children[1].removeAttribute('placeholder');
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
        let addExpenses = additionalExpensesItem.value.split(', ');
        addExpenses.forEach(function (item) {
            item = item.trim();
            if (item !== '') {
                appData.addExpenses.push(item);
            }
        });
    },
    getAddIncome: function () {
        let addIncome = additionalIncomeItem.value.split(', ');
        addIncome.forEach(function (item) {
            item = item.trim();
            if (item !== '') {
                appData.addIncome.push(item);
            }
        });
    },
    getExpensesMonth: function () {
        for (let key in appData.expenses) {
            appData.expensesMonth += appData.expenses[key];
        }
    },
    getIncomeMonth: function () {
        for (let key in appData.income) {
            appData.incomeMonth += appData.income[key];
        }
    },
    getBudget: function () {
        appData.budgetMonth = appData.budget + appData.incomeMonth - appData.expensesMonth;
        appData.budgetDay = Math.ceil(appData.budgetMonth / 30);
    },
    getPeriodSelect: function () {
        let periodSelectValue = +periodSelect.value;
        if (periodSelectValue === 1) {
            periodAmount.textContent = periodSelectValue + ' месяц';
        } else if (periodSelectValue === 2 || periodSelectValue === 3) {
            periodAmount.textContent = periodSelectValue + ' месяца';
        } else {
            periodAmount.textContent = periodSelectValue + ' месяцев';
        }
        targetMonthValue.value = periodSelectValue;
        return periodSelectValue;
    },
    getTargetMonth: function () {
        return targetAmount.value / appData.budgetMonth;
    },

    getStatusIncome: function () {
        switch (true) {
            case appData.getBudget >= 1200:
                console.log('У вас высокий уровень дохода');
                break;
            case appData.getBudget >= 600 && appData.getBudget < 1200:
                console.log('У вас средний уровень дохода');
                break;
            case appData.getBudget < 600:
                console.log('К сожалению у вас уровень дохода ниже среднего');
                break;
            case appData.getBudget < 0:
                console.log('Что то пошло не так');
                break;
            default:
                console.log('дефолтный вывод');
                break;
        }
    },
    getInfoDeposit: function () {
        if (appData.deposit) {
            appData.percentDeposit = appData.checkNaN('Какой годовой процент?');
            appData.moneyDeposit = appData.checkNaN('Какая сумма заложена?');
        }
        return appData.deposit;
    },
    calcPeriod: function () {
        return appData.budgetMonth * targetMonthValue.value; // считает накопления за период
    },
};


console.log();

buttonCalc.addEventListener('click', appData.checkNaN);


buttonCalc.setAttribute('disabled', 'disabled');

let falseInputValue = function () {
    salaryAmount.addEventListener('change', function () {
        if (salaryAmount.value === '') {
            buttonCalc.setAttribute('disabled', 'disabled');
        } else {
            buttonCalc.removeAttribute('disabled');
        }
    });
};


function validFormNumber(a) {
    a.addEventListener('keyup', function (){
        this.value = this.value.replace(/[^\d]/g, '');
    });
}
function validFormString(a) {
    a.addEventListener('keyup', function (){
        this.value = this.value.replace(/^[а-яА-ЯёЁ]+$/g, '');
    });
}

validFormNumber(incomeAmount);
validFormNumber(expensesAmount);
validFormString(salaryAmount);
validFormNumber(targetAmount);
validFormNumber(incomeTitle);

periodSelect.addEventListener('click', appData.getPeriodSelect);
buttonPlusOne.addEventListener('click', appData.addIncomeBlock);
buttonPlusTwo.addEventListener('click', appData.addExpensesBlock);



//------------------------------------------------------------------------------------------------------------------------
// ВЫВОД В КОНСОЛЬ

const targetMonth = Math.ceil(appData.getTargetMonth());



console.log(targetMonth
    ? `цель будет достигнута через: ${targetMonth} месяцев`
    : 'Цель не будет достигнута');

/* for (let key in appData) {
    console.log('Наша программа включает в себя данные:' + 'свойства ' + key + ' их значения ' + appData);

} */
