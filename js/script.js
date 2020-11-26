'use strict';
// Получение элементов со страницы и объявление переменных
let inNumber = function (n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};
let money;
let income = 'разработка приложения на JS';
let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
let deposit = confirm('Есть ли у вас депозит в банке?');
let mission = 1000000;
let period = 6;
let sum = 0;

const numPrompt = (title) => {
    let value = 0; 

    do {
        value = prompt(title)
    } while (!inNumber(value))
    
    return value
}

money = +numPrompt('Ваш месячный доход?')

/* const getExpanse = () => {
    const target = +prompt('Введите обязательную статью расходов 😍?');
    const value = +prompt('Введите размер расходов?');
    // expenses.push(target);
    if (value) sum += value;
}

const getExpensesMonth = (count = 2) => {
    for (let i = 0; i < count; i++) {
        getExpanse();
    }
}
 */

let getExpensesMonth = function () {
    let sum = 0;
    let expenses = [];

    for (let i = 0; i < 2; i++) {
        expenses[i] = prompt('Введите обязательную статью расходов?');
        sum += +numPrompt('Размер расходов?')
        
    }

    return sum;
};

let expensesAmount = getExpensesMonth();

console.log('Сумма всех расходов замесяц: ' + +expensesAmount);

let getAccumulatedMonth = () => money - sum;

let accumulatedMonth = getAccumulatedMonth();
// посчёт дневного бюджета
let budgetDay = (accumulatedMonth / 30);


//------------------------------------------------------------------------------------------------------------------------
// Обработчики событий

//------------------------------------------------------------------------------------------------------------------------
// Функциональность, циклы, и прочие методы
let showTypeOf = function (item) {
    console.log(typeof item);
};
showTypeOf(money);
showTypeOf(budgetDay);
console.log(money);
showTypeOf(income);
showTypeOf(deposit);






let getTargetMonth = function () {
    return mission / accumulatedMonth;
};


switch (true) {
    case budgetDay >= 1200:
        console.log('У вас высокий уровень дохода');
        break;
    case budgetDay >= 600 && budgetDay < 1200:
        console.log('У вас средний уровень дохода');
        break;
    case budgetDay < 600:
        console.log('К сожалению у вас уровень дохода ниже среднего');
        break;
    case budgetDay < 0:
        console.log('Что то пошло не так');
        break;
    default:
        console.log('дефолтный вывод');
        break;
}


//------------------------------------------------------------------------------------------------------------------------
// ВЫВОД В КОНСОЛЬ

const targetMonth = Math.ceil(getTargetMonth())

console.log(addExpenses.toLowerCase().split(', '));// надо оставить

console.log(targetMonth
    ? `цель будет достигнута через: ${targetMonth} месяцев`
    : 'Цель не будет достигнута');
