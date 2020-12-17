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

    const updateClock = setInterval(() => {
      let timer = getTimeRemaining();
      if (timer.timeRemaining > 0) {
        timerHourse.textContent = addZero(timer.hours * 1);
        timerMinutes.textContent = addZero(timer.minutes * 1);
        timerSeconds.textContent = addZero(timer.seconds * 1);
      } else {
        timerHourse.textContent = addZero(0);
        timerMinutes.textContent = addZero(0);
        timerSeconds.textContent = addZero(0);
        clearInterval(updateClock);
      }
    }, 1000);

  }
  countTimer('2022-12-31');

  // -------------------------------------------   menu   ------------------------------------------------
  const toggleMenu = () => {
    const btnMenu = document.querySelector('.menu');
    const menu = document.querySelector('menu');
    const menuItems = menu.querySelectorAll('ul>li>a');


    const handleToggle = () => {
      menu.classList.toggle('active-menu');
    }

    const handleClick = ({ target }) => {
      if (target === menuItems || target.closest('div') === btnMenu) {
        handleToggle();
        return;
      } else if (target) {
        menuItems.forEach((item) => {
          if (target === item) {
            handleToggle();
          }
        });
      }

      if (menu.classList.contains('active-menu') && !target.closest('menu')) {
        handleToggle();
      }
    };

    document.addEventListener('click', handleClick);
  }

  toggleMenu();


  // -------------------------------------------   popup   ------------------------------------------------

  const togglePopUp = () => {
    const popup = document.querySelector('.popup'),
      popupBtn = document.querySelectorAll('.popup-btn'),
      popupContent = document.querySelector('.popup-content');
    popupBtn.forEach((item) => {
      item.addEventListener('click', () => {
        let width = window.innerWidth;
        popup.style.cssText = 'display:block;';

        if (width > 768) {
          let top = -50;
          popupContent.style.top = `${top}%`;
          const startAnimate = setInterval(() => {
            top += 1;
            if (top <= 10) {
              popupContent.style.top = `${top}%`;
            } else {
              clearInterval(startAnimate);
            }
          }, 2);
        }

      });
    });

    popup.addEventListener('click', (event) => {
      let target = event.target;
      if (target.classList.contains('popup-close')) {
        popup.style.cssText = 'display:none;';
      } else {
        target = target.closest('.popup-content');
        if (!target) {
          popup.style.cssText = 'display:none;';
        }
      }


    });
  };

  togglePopUp();

  // -------------------------------------------   tabs   ------------------------------------------------

  const tabs = () => {
    const tabHeader = document.querySelector('.service-header'),
      tab = tabHeader.querySelectorAll('.service-header-tab'),
      tabContent = document.querySelectorAll('.service-tab');

    const toggleTabContent = (index) => {
      for (let i = 0; i < tabContent.length; i++) {
        if (index === i) {
          tabContent[i].classList.remove('d-none');
          tab[i].classList.add('active');
        } else {
          tabContent[i].classList.add('d-none');
          tab[i].classList.remove('active');
        }
      }
    };
    // первый вариант

    /* tabHeader.addEventListener('click', (event) => {           
      let target = event.target;
      while (target !== tabHeader) {
        if (target.classList.contains('service-header-tab')) {
          tab.forEach((item, i) => {
            if (item === target) {
              toggleTabContent(i);

            } 
          });
          return;
        }
        target = target.parentNode;
      }
    }); */
    tabHeader.addEventListener('click', (event) => {
      let target = event.target;
      target = target.closest('.service-header-tab'); // метод closest проверяет у элемента селектор подымается выше и проверяет там, и так до конца, если не находт то возвращает null

      if (target) {
        tab.forEach((item, i) => {
          if (item === target) {
            toggleTabContent(i);
          }
        });

      }
    });
  }
  tabs();

  // -------------------------------------------   sleder   ------------------------------------------------

  const slider = () => {
    const slider = document.querySelector('.portfolio-content'),
      slide = document.querySelectorAll('.portfolio-item'),
      blockDots = document.querySelector('.portfolio-dots');

    let currentSlide = 0;
    let stopAutoPlay;
    let dot = [];

    const creatElementDot = () => {
      const addDot = document.createElement('li');
      blockDots.appendChild(addDot);
      dot.push(addDot);
      dot.forEach((item, i) => {
        if (i === 0) {
          item.classList.add('dot', 'dot-active');
        } else {
          item.classList.add('dot');
        }
      })
    }
    slide.forEach(() => {
      creatElementDot();

    });
    



    const prevSlide = (elem, index, strClass) => {

      elem[index].classList.toggle(strClass);
    };
    const nextSlide = (elem, index, strClass) => {
      elem[index].classList.toggle(strClass);
    };
    const autoPlaySlide = () => {

      prevSlide(slide, currentSlide, 'portfolio-item-active');
      prevSlide(dot, currentSlide, 'dot-active')
      currentSlide++;
      if (currentSlide >= slide.length) {
        currentSlide = 0;
      }
      nextSlide(slide, currentSlide, 'portfolio-item-active');
      nextSlide(dot, currentSlide, 'dot-active')
    };

    const startSlide = (time = 3000) => {
      stopAutoPlay = setInterval(autoPlaySlide, time);
    };
    const stopSlide = () => {
      clearInterval(stopAutoPlay);
    };

    slider.addEventListener('click', (event) => {
      event.preventDefault();

      let target = event.target;

      if (!target.matches('.portfolio-btn, .dot')) {
        return;
      }

      prevSlide(slide, currentSlide, 'portfolio-item-active');
      prevSlide(dot, currentSlide, 'dot-active');

      if (target.matches('#arrow-right')) {
        currentSlide++;
      } else if (target.matches('#arrow-left')) {
        currentSlide--;
      } else if (target.matches('.dot')) {
        dot.forEach((elem, index) => {
          if (elem === target) {
            currentSlide = index;
          }
        });
      }
      if (currentSlide >= slide.length) {
        currentSlide = 0;
      }
      if (currentSlide < 0) {
        currentSlide = slide.length - 1;
      }
      nextSlide(slide, currentSlide, 'portfolio-item-active');
      nextSlide(dot, currentSlide, 'dot-active');

    });
    slider.addEventListener('mouseover', (event) => {
      if (event.target.matches('.portfolio-btn') || event.target.matches('.dot')) {
        stopSlide();
      }
    });

    slider.addEventListener('mouseout', (event) => {
      if (event.target.matches('.portfolio-btn') || event.target.matches('.dot')) {
        startSlide();
      }
    });

    startSlide(1500)
  };

  slider();
});
