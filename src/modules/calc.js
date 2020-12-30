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

export default calc;
