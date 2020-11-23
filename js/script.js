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

// посчёт бюджета на месяц
let budgetMonth = money - (amount01 + amount01);

// посчёт дневного бюджета
let budgetDay = (budgetMonth / 30);










//------------------------------------------------------------------------------------------------------------------------
// Обработчики событий



//------------------------------------------------------------------------------------------------------------------------
// ВЫВОД В КОНСОЛЬ

// вывод типа данных переменных
console.log(typeof money);

console.log(typeof income);
console.log(typeof deposit);
console.log(money);
console.log('Период равен' + ' ' + period + ' ' + 'месяцев');
console.log('и цель заработать' + ' ' + mission + ' руб');
// переводим строку к нижнему регистру
console.log(addExpenses.toLowerCase().split(', '));
console.log('Бюджен на месяц:' + ' ' + budgetMonth + ' ' + 'руб');
console.log('Цель будет достигнута за:' + ' ' + Math.ceil(mission / budgetMonth) + ' ' + 'месяцев');
console.log(Math.floor(budgetDay) + ' ' + 'Бюджет на день');


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
