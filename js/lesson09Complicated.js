'use strict';

const date = new Date();
const inDateWayOne = document.querySelector('.block__dateone');
const inDateWayTwo = document.querySelector('.block__datetwo');
let dey,
  month;

let getHourse = date.getHours();
let getMinets = date.getMinutes();
let getSeconds = date.getSeconds();



const getDateArr = {
  month: [
    'Января',
    'Февраля',
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
  ],
  week: [
    'Понедельник',
    'Вторник',
    'Среда',
    'Четверг',
    'Пятница',
    'Суббота',
    'Воскресение'
  ]
}
function addZero(item) {
  if (item.length < 2) {
    item = '0' + item;
  }
  return item;
}


const getDateValue = () => {
  for (let key in getDateArr.month) {
    let getMonth = String(date.getMonth());
    key === getMonth ? month = getDateArr.month[key] : ''
  }
}
for (let key in getDateArr.week) {
  let getDate = String(date.getDay());
  key === getDate ? dey = getDateArr.week[key] : ''
}
getDateValue();


setInterval(function () {
  let date = new Date();
  getHourse = String(date.getHours());
  getMinets = String(date.getMinutes());
  getSeconds = String(date.getSeconds());


  let words;
  function declOfNum(number, words) {
    return words[(number % 100 > 4 && number % 100 < 20) ? 2 : [2, 0, 1, 1, 1, 2][(number % 10 < 5) ? number % 10 : 5]];
  }



  inDateWayOne.innerHTML = `Сегодня:${dey}, ${date.getDate()} ${month} ${date.getFullYear()} года, ${addZero(getHourse)} ${declOfNum(getMinets, ['час', 'часа', 'часов'])} ${addZero(getMinets)} ${declOfNum(getMinets, ['минуа', 'минуты', 'минут'])} ${addZero(getSeconds)} ${declOfNum(getSeconds, ['секунда', 'секунды', 'секунд'])}`;
  inDateWayTwo.innerHTML = `${date.getDate()}.${date.getMonth()}.${date.getFullYear()} - ${addZero(getHourse)}:${addZero(getMinets)}:${addZero(getSeconds)}`;

}, 1000);
