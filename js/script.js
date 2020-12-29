const filterByType = (type, ...values) => values.filter(value => typeof value === type), // обявление функции filterByType которая принимает 2 параметра и с помощью фильтра сравнивает тип полученных данных

	hideAllResponseBlocks = () => {// обявление функции hideAllResponseBlocks
		const responseBlocksArray = Array.from(document.querySelectorAll('div.dialog__response-block')); //в переменную responseBlocksArray кладем массив к тором будут лежать блоки вывода результата
		responseBlocksArray.forEach(block => block.style.display = 'none'); // перебираем responseBlocksArray и изначально скрываем блоки
	},

	showResponseBlock = (blockSelector, msgText, spanSelector) => {// обявление функции showResponseBlock в которую кладем объект
		hideAllResponseBlocks();// вызываем функцию hideAllResponseBlocks
		document.querySelector(blockSelector).style.display = 'block';// показываем переданный блок
		if (spanSelector) {// показываем переданный блок
			document.querySelector(spanSelector).textContent = msgText;// показываем сообщение в зависимости от try catch - тоесть если в коде нет ошибок показать showResults если есть ошибка то showError
		}
	},

	showError = msgText => showResponseBlock('.dialog__response-block_error', msgText, '#error'),// обявление функции showError в кторую  в качестве параметра передаем msgText и эта функци я вызывает showResponseBlock

	showResults = msgText => showResponseBlock('.dialog__response-block_ok', msgText, '#ok'),// обявление функции showResults в кторую  в качестве параметра передаем msgText и эта функци я вызывает showResponseBlock

	showNoResults = () => showResponseBlock('.dialog__response-block_no-results'),// обявление функции showResults в кторую  в качестве параметра передаем msgText и эта функци я вызывает showResponseBlock

	tryFilterByType = (type, values) => {// обявление функции tryFilterByType
		try {// блок кода try он будет выполняться если в нем не будет ошибок
			const valuesArray = eval(`filterByType('${type}', ${values})`).join(", ");// в переменную valuesArray и с помощью метода eval возвращаем переданные значения, если их нет, то вернет undefined
			const alertMsg = (valuesArray.length) ? // тернарный оператор - если valuesArray имеет хоть что то  
				`Данные с типом ${type}: ${valuesArray}` : // выпоняется это условие
				`Отсутствуют данные типа ${type}`;//в противном случае  выпоняется это условие
			showResults(alertMsg); //вызываем функцию showResults и передаем в нее наше условие alertMsg
		} catch (e) { // catch выполниться в случае ошибки 
			showError(`Ошибка: ${e}`); // вызываем функцию showError и передаем в нее текст ошибки
		}
	};

const filterButton = document.querySelector('#filter-btn');// получаем элемент

filterButton.addEventListener('click', e => {// вешаем событие клика
	const typeInput = document.querySelector('#type');// получаем элемент
	const dataInput = document.querySelector('#data');// получаем элемент

	if (dataInput.value === '') { // проверяем если значение инпута пустое 
		dataInput.setCustomValidity('Поле не должно быть пустым!');// показываем подсказку с текстом 
		showNoResults();// вызываем функцию showNoResults 
	} else {// если значение инпута не пустое 
		dataInput.setCustomValidity('');// скрываем подсказку
		e.preventDefault();// готменяем стандартное поведение браузера
		tryFilterByType(typeInput.value.trim(), dataInput.value.trim());// вызываем функцию tryFilterByType котрая выведет результаты в блок
	}
});

