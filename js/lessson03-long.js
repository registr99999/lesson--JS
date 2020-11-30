'use strict';

let lang = prompt('Введите ваше язык "ru" или "en"');

const langs = ['ru', 'en'];

if (lang === 'ru') {
    console.log('понедельник, вторник, среда, четверг, пятница, суббота, воскресение');
} else if (lang === 'en') {
    console.log('Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday');
} else {
    console.log('Вы ввели неверное значение');
}

switch (true) {
    case lang === 'ru':
        console.log('понедельник, вторник, среда, четверг, пятница, суббота, воскресение');
        break;
    case lang === 'en':
        console.log('Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday');
        break;

}


let week = [
    ['понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота', 'воскресение'],
    ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
];
console.log(week[langs.indexOf(lang)]);



 let namePerson = prompt('Введите ваше имя!');

namePerson === 'Артем' ? console.log('Директор') : namePerson === 'Максим' ? console.log('Преподаватель') : console.log('Студент'); 


