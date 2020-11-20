let money = 90000;
let income = 'разработка приложения на JS';
let addExpenses = 'Комуналка, Памперсы, Бензин, Одежда, Еда';
let deposit = true;
let mission = 5000000;
let period = 6;

// alert('Вывод мадального окна командой alert');


// console.log('Вывод сообщения в консоль!');


//=========================================================================================================================================================================================
// Домашнее задание №2

// вывод типа данных переменных
console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);

// вычисляем длину строки
console.log(addExpenses.length);

console.log('Период равен' + ' ' + period + ' ' + 'месяцев' + ' и цель заработать' + ' ' + mission + ' руб');

// переводим строку к нижнему регистру
console.log(addExpenses.toLowerCase().split(', '));

// посчёт дневного бюджета
let budgetDay = (money / 30);

console.log(budgetDay + ' ' + 'руб');

