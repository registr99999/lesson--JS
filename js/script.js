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
    let taimetIntervel;
    const timeAnimations = () => {
      taimetIntervel = requestAnimationFrame(timeAnimations);
      let timer = getTimeRemaining();
      if (timer.timeRemaining > 0) {
        timerHourse.textContent = addZero(timer.hours * 1);
        timerMinutes.textContent = addZero(timer.minutes * 1);
        timerSeconds.textContent = addZero(timer.seconds * 1);
      } else {
        timerHourse.textContent = addZero(0);
        timerMinutes.textContent = addZero(0);
        timerSeconds.textContent = addZero(0);
        cancelAnimationFrame(taimetIntervel);
      }
    };
    taimetIntervel = requestAnimationFrame(timeAnimations);
  }
  countTimer('2022-12-31');

  // -------------------------------------------   menu   ------------------------------------------------
  const toggleMenu = () => {
    const btnMenu = document.querySelector('.menu');
    const menu = document.querySelector('menu');
    const menuItems = menu.querySelectorAll('ul>li>a');
    const btnClose = document.querySelector('.close-btn');

    const handleToggle = () => {
      menu.classList.toggle('active-menu');
    }

    const handleClick = ({ target }) => {
      if (target === menuItems || target.closest('div') === btnMenu || target === btnClose) {
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
      let numberInterval;
      const numberAnimate = () => {
        numberInterval = requestAnimationFrame(numberAnimate);  
        totalValue.textContent = Math.floor(Number(totalValue.textContent) + (total * .1));     
        if (Number(totalValue.textContent) >= total) {
          cancelAnimationFrame(numberInterval);
        }
      };
      numberInterval = requestAnimationFrame(numberAnimate);
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
    const formNameId = document.getElementById('form2-name');
    const formTextArea = document.getElementById('form2-message');

    formName.forEach(item => {
      item.addEventListener('input', function () {
        this.value = this.value.replace(/[^а-яё\s]/ig, '');
      });
    })
    formEmail.forEach(item => {
      item.addEventListener('change', () => {
        if (/(\w+)@(\w+)\.\w{2,3}/gi.test(item.value)) {
          item.setAttribute('placeholder', 'E-mail')
        } else {
          item.setAttribute('placeholder', 'не правильно заполнено поле!')
          item.value = '';
        }
      })
    })
    formPhone.forEach(item => {
      item.setAttribute('maxlength', '11');
      item.addEventListener('input', () => {
        if (/^\+?(7|8)\d{0,11}$/.test(item.value)) {
        } else {
          item.value = '';
        }
      })
    })

    formTextArea.addEventListener('input', function () {
      this.value = this.value.replace(/[^а-яё\s0-9.,]/ig, '');
    });


    const statusMessage = document.createElement('div');
    statusMessage.style.cssText = 'font-size: 2rem;'

    form1.addEventListener('submit', (event) => {
      event.preventDefault();
      if (formName[0].value !== '' && formEmail[0].value !== '' && formPhone[0].value !== '') {
        statusMessage.style.cssText = 'color: #ffffff;';
        form1.appendChild(statusMessage);
        statusMessage.textContent = loadMessage;
        const formData = new FormData(form1);
        let body = {};
        formData.forEach((val, key) => {
          body[key] = val;
        });
        postSata(body)
        .then((response) => {
          if (response.status !== 200) {
            throw new Error('status network not 200');
          }
          statusMessage.textContent = successMessage;
        })
        .catch ((error) => {
          statusMessage.textContent = errorMessage;
          console.error(error);
        });
        let count = 0;
        let HideMessageAnimate;
        const removeMessage = () => {
          HideMessageAnimate = requestAnimationFrame(removeMessage);
          count++;
          if (count >= 250) {
            cancelAnimationFrame(HideMessageAnimate);
            statusMessage.textContent = '';
          }
        };
        HideMessageAnimate = requestAnimationFrame(removeMessage);
        form1.reset();
      }
    });
    form2.addEventListener('submit', (event) => {
      event.preventDefault();
      if (formNameId.value !== '' && formEmail[1].value !== '' && formPhone[1].value !== '') {
        form2.appendChild(statusMessage);
        statusMessage.textContent = loadMessage;
        const formData = new FormData(form2);
        let body = {};
        formData.forEach((val, key) => {
          body[key] = val;
        });
        postSata(body)
        .then((response) => {
          if (response.status !== 200) {
            throw new Error('status network not 200');
          }
          statusMessage.textContent = successMessage;
        })
        .catch ((error) => {
          statusMessage.textContent = errorMessage;
          console.error(error);
        });

        let count = 0;
        let HideMessageAnimate;
        const removeMessage = () => {
          HideMessageAnimate = requestAnimationFrame(removeMessage);
          count++;
          if (count >= 250) {
            cancelAnimationFrame(HideMessageAnimate);
            statusMessage.textContent = '';
          }
        };
        HideMessageAnimate = requestAnimationFrame(removeMessage);
        form2.reset();
      }
    });
    form3.addEventListener('submit', (event) => {
      event.preventDefault();
      if (formName[1].value !== '' && formEmail[2].value !== '' && formPhone[2].value !== '') {
        statusMessage.style.cssText = 'color: #ffffff;';
        form3.appendChild(statusMessage);
        statusMessage.textContent = loadMessage;
        const formData = new FormData(form3);
        let body = {};
        formData.forEach((val, key) => {
          body[key] = val;
        });
        
        postSata(body)
        .then((response) => {
          if (response.status !== 200) {
            throw new Error('status network not 200');
          }
          statusMessage.textContent = successMessage;
        })
        .catch ((error) => {
          statusMessage.textContent = errorMessage;
          console.error(error);
        });

        let count = 0;
        let HideMessageAnimate;
        const removeMessage = () => {
          HideMessageAnimate = requestAnimationFrame(removeMessage);
          count++;
          if (count >= 250) {
            cancelAnimationFrame(HideMessageAnimate);
            statusMessage.textContent = '';
          }
        };
        HideMessageAnimate = requestAnimationFrame(removeMessage);
        form3.reset();
      }
    });
    const postSata = (body) => {
      return fetch('server.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      });
    }
  }
  sendForm();
});

