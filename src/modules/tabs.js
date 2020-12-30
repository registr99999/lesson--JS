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

export default tabs;
