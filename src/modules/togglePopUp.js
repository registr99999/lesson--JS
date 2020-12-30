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

  export default togglePopUp;
