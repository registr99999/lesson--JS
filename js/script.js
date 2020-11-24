'use strict';
// Получение элементов со страницы и объявление переменных

let money = +prompt('Ваш месячный доход?');
let income = 'разработка приложения на JS';
let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
let deposit = confirm('Есть ли у вас депозит в банке?');
let mission = 1000000;
let period = 6;

let expense01 = prompt('Введите обязательную статью расходов?');
let expense02 = prompt('Введите обязательную статью расходов?');

let amount01 = +prompt('Во сколько это обойдется?');
let amount02 = +prompt('Во сколько это обойдется?');

let accumulatedMonth = getAccumulatedMonth(money, amount01, amount02);

// посчёт дневного бюджета
let budgetDay = (accumulatedMonth / 30);// надо оставить


//------------------------------------------------------------------------------------------------------------------------
// Обработчики событий



//------------------------------------------------------------------------------------------------------------------------
// ВЫВОД В КОНСОЛЬ

// вывод типа данных переменных
console.log(typeof money);// надо оставить
console.log(typeof income);// надо оставить
console.log(typeof deposit);// надо оставить
// переводим строку к нижнему регистру
console.log(addExpenses.toLowerCase().split(', '));// надо оставить

// console.log('Вывод сообщения в консоль!');

// вычисляем длину строки
// console.log(addExpenses.length);




//------------------------------------------------------------------------------------------------------------------------
// Функциональность, циклы, и прочие методы

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

// Выполнение задания №4


function getExpensesMonth(question01, question02) {
    return Number(question01 + question02);
}

let result = getExpensesMonth(amount01, amount02);
console.log('Сумма всех расходов замесяц: ' + result);// надо оставить


function getAccumulatedMonth(a, b, c) {
    return Number(a - (b + c));
}


function getTargetMonth(accumulatedMonth, mission) {
    return mission / accumulatedMonth;
}

console.log('цель будет достигнута через: ' + Math.ceil(getTargetMonth(accumulatedMonth, mission)) + ' месяцев');// надо оставить



