'use strict';

// объявление переменных
let setTimesOfDay,
    day;

let date = new Date();
const paragraph = document.createElement('p'),
    timesOfDay = ['Доброе утро', 'Добрый день', 'Добрый вечер', ' Доброй ночи'],
    week = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресение'];
document.body.appendChild(paragraph);

// задание минимальных стилей для элемента
paragraph.style.cssText = `font-size: 20px; color: black; margin-top: 200px; text-align:center;`;


// функция подставлет приветствие в зависимости от времени суток
const getTimesOfDay = () => {
    if (date.getHours() < 6 && 11 > date.getHours()) {
        setTimesOfDay = timesOfDay[0];

    } else if (date.getHours() > 12 && 18 > date.getHours()) {
        setTimesOfDay = timesOfDay[1];

    } else if (date.getHours() > 19 && 24 > date.getHours()) {
        setTimesOfDay = timesOfDay[2];

    } else {
        setTimesOfDay = timesOfDay[3];

    }
}
getTimesOfDay();
// функция добавления нуля
const addZero = (item) => {
    if (item < 10) {
        item = '0' + item; 
    }
    return item;
}
// функция изменяющая числовой формат дня недели на буквенный
function getDateValue() {
    for (let key in week) {
        let getDate = String(date.getDay());
        key === getDate ? day = week[key] : '';
    }
}
getDateValue();



setInterval(() => {
    const heppyNewYear = new Date('2020-12-31');
    date = new Date();

    paragraph.innerHTML = `
    ${setTimesOfDay} Сегодня: ${day}
    Текущее время ${addZero(date.getHours())}:${addZero(date.getMinutes())}:${addZero(date.getSeconds())}
    До нового года осталось ${Math.floor(heppyNewYear.getDate() - date.getDate())} дней`;
}, 1000);
