  const sendForm = () => {
    const errorMessage = 'Что то пошло не так!';
    const loadMessage = 'Загрузка...';
    const successMessage = 'Спасибо! Мы скоро с Вами свяжемся!';

    const forms = document.getElementsByTagName('form');
    const form1 = document.getElementById('form1');
    const form2 = document.getElementById('form2');
    const form3 = document.getElementById('form3');
    const formName = document.querySelectorAll('.form-name');
    const formEmail = document.querySelectorAll('.form-email');
    const formPhone = document.querySelectorAll('.form-phone');
    const formNameId = document.getElementById('form2-name');
    const formTextArea = document.getElementById('form2-message');
    console.log(forms);

    formName.forEach(item => {

      item.addEventListener('input', function () {
        this.value = this.value.replace(/[^а-яё\s]/ig, '');
        if (item.value.length < 2) {
          item.setCustomValidity("имя должно быть не меенее 2х символов");
          item.reportValidity();
        } else {
          item.setCustomValidity("");
        }
      });
    })

    formNameId.addEventListener('input', function () {
      this.value = this.value.replace(/[^а-яё\s]/ig, '');
      if (this.value.length < 2) {
        this.setCustomValidity("имя должно быть не меенее 2х символов");
        this.reportValidity();
      } else {
        this.setCustomValidity("");
      }
    });

    formEmail.forEach(item => {

      item.addEventListener('input', () => {
        item.value = item.value.replace(/[^a-z@0-9\.]/ig, '');
        if (item.value.length <= 0) {
          item.setCustomValidity("поле не должно быть пустым");
          item.reportValidity();
        } else if (/(\w+)@(\w+)\.\w{2,3}/gi.test(item.value)) {
          item.setCustomValidity("");

        } else {
          item.setCustomValidity("введите имя @ домен . регион");
          item.reportValidity();
        }
      })
    })
    formPhone.forEach(item => {
      item.setAttribute('maxlength', '12');
      item.addEventListener('input', () => {
        item.value = item.value.replace(/[^0-9]$/g, '');
        if (/^\+?(7|8)\d{7,11}$/.test(item.value)) {
          item.setCustomValidity("");
        } else if (item.value.length <= 7) {
          item.setCustomValidity("не менее 7 символов");
          item.reportValidity();
        } else {
          item.setCustomValidity("формат  89991110011");
          item.reportValidity();

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
        postSata(body, () => {
          statusMessage.textContent = successMessage;
        }, (error) => {
          statusMessage.textContent = errorMessage;
          console.error(error);
        });
        let count = 0;
        const removeMessage = setInterval(() => {
          count++;
          console.log(count);
          if (count >= 5) {
            clearInterval(removeMessage);
            statusMessage.textContent = '';
          }
        }, 1000);
        form1.reset();
      }
    });
    form2.addEventListener('submit', (event) => {
      event.preventDefault();
      if (formNameId.value !== '' && formEmail[1].value !== '' && formPhone[1].value !== '' && formTextArea.value !== '') {
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

        let count = 0;
        const removeMessage = setInterval(() => {
          count++;
          console.log(count);
          if (count >= 5) {
            clearInterval(removeMessage);
            statusMessage.textContent = '';
          }
        }, 1000);
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
        postSata(body, () => {
          statusMessage.textContent = successMessage;
        }, (error) => {
          statusMessage.textContent = errorMessage;
          console.error(error);
        });
        let count = 0;
        const removeMessage = setInterval(() => {
          count++;
          console.log(count);
          if (count >= 5) {
            clearInterval(removeMessage);
            statusMessage.textContent = '';
          }
        }, 1000);
        form3.reset();
      }
    });
    const postSata = (body) => {
      return new Promise((resolve, project) => {
        const request = new XMLHttpRequest();
        request.addEventListener('readystatechange', () => {
          if (request.readyState !== 4) {
            return;
          }
          if (request.status === 200) {
            resolve(statusMessage.textContent = successMessage);
          } else {
            project(request.status);
          }
        });
        request.open('POST', 'server.php');
        request.setRequestHeader('Content-Type', 'application/json');
        request.send(JSON.stringify(body));
      })

    }
  }

export default sendForm;
