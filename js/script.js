window.addEventListener('DOMContentLoaded', () => { // DOMContentLoaded он дожидает загрузки только дом дерева
  'use strict';


  // -------------------------------------------   Timer   ------------------------------------------------
  function countTimer(dedline) { // dedline это время до которого наш таймер будет расчитаывть
    let timerHourse = document.querySelector('#timer-hours'), // получаем часы
      timerMinutes = document.querySelector('#timer-minutes'),// получаем минуты
      timerSeconds = document.querySelector('#timer-seconds');// получаем секунды


    const addZero = (item) => {
      if (item < 10) {
        item = '0' + item;
      }
      return item;
    }


    const getTimeRemaining = () => {
      let dateStop = new Date(dedline), // получаем дату окончания
        dateNow = new Date(),// получаем текущую дату
        timeRemaining = (dateStop - dateNow) / 1000,
        seconds = Math.floor(timeRemaining % 60),
        minutes = Math.floor((timeRemaining / 60) % 60),
        hours = Math.floor(timeRemaining / 60 / 60) % 24;
      return { timeRemaining, hours, minutes, seconds };
    }


    const updateClock = () => {
      let timer = getTimeRemaining();
      timerHourse.textContent = addZero(timer.hours);
      timerMinutes.textContent = addZero(timer.minutes);
      timerSeconds.textContent = addZero(timer.seconds);
      if (timer.timeRemaining > 0) {
        setInterval(updateClock, 1000);
      } else {
        timerHourse.textContent = addZero(0);
        timerMinutes.textContent = addZero(0);
        timerSeconds.textContent = addZero(0);
        clearInterval()
      }
    }
    updateClock();
  }
  countTimer('2021-10-31');


  // -------------------------------------------   menu   ------------------------------------------------
  const toggleMenu = () => {
    const btnMenu = document.querySelector('.menu'),
      menu = document.querySelector('menu'),
      btnClose = document.querySelector('.close-btn'),
      menuItems = menu.querySelectorAll('ul>li');


    const handlerMenu = () => {
      menu.classList.toggle('active-menu');
    };


    btnMenu.addEventListener('click', handlerMenu);


    btnClose.addEventListener('click', handlerMenu);


    menuItems.forEach((elem) => elem.addEventListener('click', handlerMenu));
  }
  toggleMenu();




  // -------------------------------------------   popup   ------------------------------------------------


  const togglePopUp = () => {
    const popup = document.querySelector('.popup'),
      popupBtn = document.querySelectorAll('.popup-btn'),
      popupClose = document.querySelector('.popup-close'),
      popupContent = document.querySelector('.popup-content');
      let width = window.innerWidth;
    popupBtn.forEach((item) => {
      item.addEventListener('click', () => {
        popup.style.cssText = 'display:block;';
        
        if (width > 768) {
          let top = -100;
          popupContent.style.top = `${top}%`;
          
          const startAnimate = setInterval(() => {
            top += 1;
            if (top <= 10) {
              popupContent.style.top = `${top}%`;
              
            } else {
              clearInterval(startAnimate);
              console.log(clearInterval(startAnimate));
            }
          
          }, 5);
          
        }
        
      });
    });
    popupClose.addEventListener('click', () => {


      popup.style.cssText = 'display:none;';
    });
  };


  togglePopUp();
});
