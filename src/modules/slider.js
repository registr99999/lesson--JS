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
  export default slider;
