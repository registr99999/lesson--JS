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

  export default toggleMenu;
