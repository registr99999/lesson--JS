'use strict';

let money;
let start = function () {
    do {
        money = +prompt('Ваш месячный доход?');
    }
    while (isNaN(money) || money ==='' || money === null)
};
start();
console.log(typeof money);


let appData = {
    income: {},
    addIncome: [],
    expenses: {},
    addExpenses: [],
    deposit: false,
    mission: 50000,
    period: 3,
    asking: function () {
        let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
        appData.addExpenses = addExpenses.toLowerCase().split(', ');
        appData.deposit = confirm('Есть ли у вас депозит в банке?');
        let sum;
        let expenses = [];
        for (let i = 0; i < 2; i++) {
            expenses[i] = prompt('Введите обязательную статью расходов?');
            function checkForNumber () {
                do {
                    sum = prompt('Размер расходов?');
                }
                while (isNaN(sum) || sum === '' || sum === null)
            };
            checkForNumber();
            console.log(typeof checkForNumber);
            appData.expenses[expenses[i]] = +sum;
        }
        
    },
    budget: money,
    getBudget: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    budgetDay: 0,
};
appData.asking();
console.log(appData);

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
