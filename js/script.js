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
        hours = Math.floor(timeRemaining / 60 / 60 - 3) % 24;
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

  // -------------------------------------------   calculeted   ------------------------------------------------
  const calc = (price = 100) => {
    const calcBlock = document.querySelector('.calc-block'),
      calcType = document.querySelector('.calc-type'),
      calcSquare = document.querySelector('.calc-square'),
      calcDay = document.querySelector('.calc-day'),
      calcCount = document.querySelector('.calc-count'),
      totalValue = document.getElementById('total');

    const constSum = () => {
      let total = 0,
        countValue = 1,
        dayValue = 1;
      totalValue.textContent = 10;
      const typeValue = calcType.options[calcType.selectedIndex].value,
        squareValue = +calcSquare.value;

      if (calcCount.value > 1) {
        countValue += (calcCount.value - 1) / 10;
      }
      if (calcDay.value && calcDay.value < 5) {
        dayValue *= 2;
      } else if (calcDay.value && calcDay.value < 10) {
        dayValue *= 1.5;
      }
      if (typeValue && squareValue) {
        total = price * typeValue * squareValue * countValue * dayValue;
      }
      const start = setInterval(() => {
        totalValue.textContent = Number(totalValue.textContent) + Number(total * .1);
        if (totalValue.textContent >= total) {
          clearInterval(start);
        }
      }, 30);
      start();
      totalValue.textContent = total;
    };

    calcBlock.addEventListener('change', ({ target }) => {
      if (target === calcType || target === calcSquare || target === calcDay || target === calcCount) {
        constSum();
      }
    });
  }
  calc();

  // -------------------------------------------   sebd-ajax-form   ------------------------------------------------

  const sendForm = () => {
    const errorMessage = 'Что то пошло не так!';
    const loadMessage = 'Загрузка...';
    const successMessage = 'Спасибо! Мы скоро с Вами свяжемся!';

    const form1 = document.getElementById('form1');
    const form2 = document.getElementById('form2');
    const form3 = document.getElementById('form3');
    const formName = document.querySelectorAll('.form-name');
    const formEmail = document.querySelectorAll('.form-email');
    const formPhone = document.querySelectorAll('.form-phone');

    formName.forEach(item => {
      item.addEventListener('input', () => {
        if (/[^a-z]/gi.test(item.value)) {
          
        } else {
          item.value = '';
        }
        
      })
    })
    formEmail.forEach(item => {
      item.addEventListener('change', () => {
        if (/(\w+)@(\w+)\.\w{2,3}/gi.test(item.value)) {
          
        } else {
          item.value = '';
        }
        
      })
    })
    formPhone.forEach(item => {
      item.addEventListener('input', () => {
        if (/[+0-9]{0,11}$/.test(item.value)) {
        } else {
          item.value = '';
        }
        
      })
    })

    const statusMessage = document.createElement('div');
    statusMessage.style.cssText = 'font-size: 2rem;'

    form1.addEventListener('submit', (event) => {
      event.preventDefault();
      formName.forEach(item => {
        item.value = '';
      })
      formEmail.forEach(item => {
        item.value = '';
      })
      formPhone.forEach(item => {
        item.value = '';
      })
      form1.appendChild(statusMessage);
      statusMessage.textContent = loadMessage;
      const formData = new FormData(form1);
      let body = {};
      formData.forEach((val, key) => {
        body[key] = val;
      });
      postSata(body, () => {
        statusMessage.textContent = successMessage;
      }, (error) => {
        statusMessage.textContent = errorMessage;
        console.error(error);
      });

    });
    form2.addEventListener('submit', (event) => {
      event.preventDefault();
      form2.appendChild(statusMessage);

      statusMessage.textContent = loadMessage;
      const formData = new FormData(form2);
      let body = {};
      formData.forEach((val, key) => {
        body[key] = val;
      });
      postSata(body, () => {
        statusMessage.textContent = successMessage;
      }, (error) => {
        statusMessage.textContent = errorMessage;
        console.error(error);
      });

    });
    form3.addEventListener('submit', (event) => {
      event.preventDefault();
      form3.appendChild(statusMessage);

      statusMessage.textContent = loadMessage;
      const formData = new FormData(form3);
      let body = {};
      formData.forEach((val, key) => {
        body[key] = val;
      });
      postSata(body, () => {
        statusMessage.textContent = successMessage;
      }, (error) => {
        statusMessage.textContent = errorMessage;
        console.error(error);
      });

    });
    const postSata = (body, outputData, errorData) => {
      const request = new XMLHttpRequest();
      request.addEventListener('readystatechange', () => {
        if (request.readyState !== 4) {
          return;
        }
        if (request.status === 200) {
          outputData();
        } else {
          errorData(request.status);
        }
      });
      request.open('POST', 'server.php');
      request.setRequestHeader('Content-Type', 'application/json');
      request.send(JSON.stringify(body));
    }
  }
  sendForm();
});

