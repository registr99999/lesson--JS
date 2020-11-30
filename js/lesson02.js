// создаем переменную 
let num = 266219;

// создание массива из числа
const arrSum = String(num).split('');

// вычесляем произведение чисел переменной
let result = arrSum.reduce(function(summ, elem) {
    return summ * elem;
});
console.log(result);

// возведение в степень
result = result ** 3;
console.log(result);

// вывод первых двух чисел
console.log(String(result).substr(0, 2));

