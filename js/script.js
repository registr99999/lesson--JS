'use strict';

let books = document.querySelectorAll('.books');

let book = document.querySelectorAll('.book');

let book02 = book[0].children[1].children;

let book05 = book[5].children[1].children;

let book06 = book[2].children[1].children;


book02[1].after(book02[3], book02[6], book02[8], book02[4], book02[5], book02[7], book02[9]);

book05[0].after(book05[1] ,book05[9], book05[3], book05[4], book05[2], book05[6], book05[7]);

book[4].children[0].children[0].textContent = 'Книга 3. this и Прототипы Объектов';



book[1].after(book[0], book[4], book[3], book[5]);


document.body.style.background = 'url(./image/you-dont-know-js.jpg) 0 0 100%';

let advertising = document.querySelector('.adv');

advertising.remove();

book06[8].after(document.createElement('li').textContent = 'Глава 8: За пределами ES6');


