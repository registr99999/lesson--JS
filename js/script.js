'use strict';

const buttonCalc = document.getElementById('start'),
    buttonPlusOne = document.getElementsByTagName('button'),
    buttonPlusTwo = document.getElementsByTagName('button'),
    buttonCheckbox = document.getElementById('deposit-check'),
    inputText = document.querySelectorAll('additional_income-item'),
    resultDayValue = document.getElementsByClassName('budget_day-value'),
    expensesMonthValue = document.getElementsByClassName('expenses_month-value'),
    additionalIncomeValue = document.getElementsByClassName('additional_income-value'),
    additionalExpensesValue = document.getElementsByClassName('additional_expenses-value'),
    incomePeriodValue = document.getElementsByClassName('income_period-value'),
    targetMonthValue = document.getElementsByClassName('target_month-value'),
    salaryAmount = document.querySelector('.salary-amount'),
    incomeTitle = document.querySelector('.income-title'),
    incomeAmount = document.querySelector('.income-amount'),
    additionalIncomeItem = document.querySelector('.additional_income-item'),
    additionalExpensesItem = document.querySelector('.additional_expenses-item'),
    depositCheck = document.querySelector('#deposit-check'),
    depositAmount = document.querySelector('.deposit-amount'),
    depositPercent = document.querySelector('.deposit-percent'),
    targetAmount = document.querySelector('.target-amount'),
    periodSelect = document.querySelector('.period-select');
let money = checkNaN('Ваш месячный доход?');
function checkNaN (a) {
    let res;
    do {
        res = prompt(a);
    }
    while (isNaN(res) || res ==='' || res === null)
    return Number(res);
}

console.log(typeof money);

let appData = {
    income: {},
    addIncome: [],
    expenses: {},
    addExpenses: [],
    deposit: false,
    percentDeposit: 0,
    moneyDeposit: 0,
    mission: 50000,
    period: 3,
    asking: function () {

        if (confirm('Если у вас дополнительный источник зароботка?')) {
            let itemIncome = prompt('какой у вас есть дополнительный заработок?', 'разработка приложений на JS');
            
            let cashIncome = checkNaN('Cколько в месяц вы на этом зарабатываете?');
            appData.income[itemIncome] = cashIncome;
        }

        let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
        appData.addExpenses = addExpenses.toLowerCase().split(', ');
        appData.deposit = confirm('Есть ли у вас депозит в банке?');
        let sum;
        let expenses = [];
        for (let i = 0; i < 2; i++) {
            expenses[i] = prompt('Введите обязательную статью расходов?');
            let sum = checkNaN('Размер расходов?');
            appData.expenses[expenses[i]] = +sum;
        }
    },
    budget: money,
    getBudget: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    budgetDay: 0,
    getInfoDeposit: function(){
        if (appData.deposit) {
            appData.percentDeposit = checkNaN('Какой годовой процент?');
            appData.moneyDeposit = checkNaN('Какая сумма заложена?');
        }
        return appData.deposit;
    },
    calcSavedMoney: function(){
        return Number(appData.getBudget * appData.period);
    }
};
appData.asking();
console.log(appData);
appData.getInfoDeposit();

// Получение элементов со страницы и объявление переменных
let inNumber = function (n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};


const numPrompt = (title) => {
    let value = 0;

    do {
        value = prompt(title)
    } while (!inNumber(value))

    return value
}


let getExpensesMonth = function () {
    for (let key in appData.expenses) {
        appData.expensesMonth += Number(appData.expenses[key]);

    }
};

getExpensesMonth();
console.log('Сумма всех расходов замесяц: ' + appData.expensesMonth);

appData.getBudget = function () {
    appData.getBudget = appData.budget - appData.expensesMonth;
    appData.budgetDay = appData.getBudget / 30;
};

appData.getBudget();



//------------------------------------------------------------------------------------------------------------------------
// Обработчики событий

//------------------------------------------------------------------------------------------------------------------------
// Функциональность, циклы, и прочие методы

appData.getTargetMonth = function () {
    return appData.mission / appData.getBudget;
};


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


//------------------------------------------------------------------------------------------------------------------------
// ВЫВОД В КОНСОЛЬ

const targetMonth = Math.ceil(appData.getTargetMonth());


console.log(targetMonth
    ? `цель будет достигнута через: ${targetMonth} месяцев`
    : 'Цель не будет достигнута');

for (let key in appData) {
    console.log('Наша программа включает в себя данные:' + 'свойства ' + key + ' их значения ' + appData);

}
console.log(appData.addExpenses.map(word => word[0].toUpperCase() + word.substring(1)).join(', '));
