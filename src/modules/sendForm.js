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
                .catch((error) => {
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
                .catch((error) => {
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
                .catch((error) => {
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

export default sendForm;
