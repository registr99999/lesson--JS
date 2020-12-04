'use strict';
/* 
const month = [
    'Января',
    'февраля',
    'Марта',
    'Апреля',
    'Мая',
    'Июня',
    'Июля',
    'Августа',
    'Сентября',
    'Октября',
    'Ноября',
    'Декабря'
];
const days = [
    'Воскресенье',
    'Понедельник',
    'Вторник',
    'Среда',
    'Четверг',
    'Пятница',
    'Суббота'
];

const date = new Date();

let currentDay = date.getDay();
let currentMonth = date.getMonth();
var intervalID = window.setInterval(inputDateFormatA, 1000);

let inputDateFormatA = function (res) {
    if (res === days) {
        res = res[currentDay];
        let currentHours = date.getHours();
        let currentMinutes = date.getMinutes();
        let currentSeconds = date.getSeconds();
    }
    if (res === month) {
        res = res[currentMonth];
        let currentHours = date.getHours();
        let currentMinutes = date.getMinutes();
        let currentSeconds = date.getSeconds();
    }

    return res;
}

console.log(inputDateFormatA.currentHours);
const inputDateFormatB = function (a) {

    let result;
    if (String(a).length < 2) {
        result = '0' + a;
    } else {
        result = a;
    }
    if (String(a).length < 2) {
        result = '0' + a;
    } else {
        result = a;
    }
    return result;
}

inputDateFormatB(currentDay);
inputDateFormatB(currentMonth);

console.log(inputDateFormatB(currentMonth) + ' ' + inputDateFormatB(currentDay));


console.log('Сегодня ' + inputDateFormatA(days), + ' ' + date.getDate() + ' ' + inputDateFormatA(month) + ' ' + date.getFullYear() + ' ' + 'года, ' + ' ' + date.getHours() + ' ' + 'час(ов)' + ' ' + date.getMinutes() + ' ' + 'минут(ы)' + ' ' + date.getSeconds() + ' ' + 'секунд(ы)'); */

let datetime = {

    month: ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря'],

    day: ['Воскрсенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],

    show: function (node) {

        let _this = this;

        setInterval(function () {

            let date = new Date();
            function declensionOfWords(a) {
                let result;
                let с = [2, 3, 4, 22, 23, 24];
                if (a === 1 || a === 21 || a === 31 || a === 41 || a === 51) {
                    result = 'секунда';
                } else if ( 
                    for (let index = 0; index < с.length; index++) {
                        let res = c[i];
                        console.log(c[i]);

                    }
                )
        {
            result = 'секунды';
        } else {
            result = 'секунд';
        } 
                return result;
}

node.innerHTML = ['сегодня: ' + _this.day[date.getDay()], ', ', date.getDate(), ' ', _this.month[date.getMonth()], ' ', date.getFullYear() + ' года' + ' ' + date.getHours() + ' ' + 'час(ов)' + ' ' + date.getMinutes() + ' ' + 'минут(ы)' + ' ' + date.getSeconds() + ' ' + declensionOfWords(date.getSeconds())].join('');

        }, 1000);
        
        
    }
};

window.onload = function () {

    datetime.show(document.getElementById('date'));

};
