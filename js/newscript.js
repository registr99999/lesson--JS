'use strict';

const isNumber = function (n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};


const start = document.getElementById('start'),
    cancel = document.getElementById('cancel'),
    btnIncome = document.getElementsByTagName('button')[0],
    btnExpenses = document.getElementsByTagName('button')[1],
    additionalIncomeItem = document.querySelectorAll('.additional_income-item'),
    budgetMonthValue = document.getElementsByClassName('budget_month-value')[0],
    budgetDayValue = document.getElementsByClassName('budget_day-value')[0],
    expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0],
    additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0],
    additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0],
    incomePeriodValue = document.getElementsByClassName('income_period-value')[0],
    targetMonthValue = document.getElementsByClassName('target_month-value')[0],
    salaryAmount = document.querySelector('.salary-amount'),
    incomeTitle = document.querySelector('.income-title'),
    expensesTitle = document.querySelector('.expenses-items .expenses-title'),
    expensesAmount = document.querySelector('.expenses-amount'),
    additionalExpensesItem = document.querySelector('.additional_expenses-item'),
    targetAmount = document.querySelector('.target-amount'),
    periodSelect = document.querySelector('.period-select'),
    titlePeriodAmount = document.querySelector('.period-amount'),
    inputOff = document.querySelectorAll('.data input[type=text]'),
    depositCheck = document.getElementById('deposit-check'),
    depositBank = document.querySelector('.deposit-bank'),
    depositAmount = document.querySelector('.deposit-amount'),
    depositPercent = document.querySelector('.deposit-percent');

let incomeItem = document.querySelectorAll('.income-items'),
    expensesItems = document.querySelectorAll('.expenses-items');


class AppData {
    constructor() {
        this.income = {};
        this.incomeMonth = 0;
        this.addIncome = [];
        this.expenses = {};
        this.addExpenses = [];
        depositCheck.checked = false;
        this.percentDeposit = 0;
        this.moneyDeposit = 0;
        this.period = 5;
        this.budget = 0;
        this.budgetDay = 0;
        this.budgetMonth = 0;
        this.expensesMonth = 0;
    }

    start() {
        if (salaryAmount.value !== '') {
            inputOff.forEach((item) => item.setAttribute('disabled', 'true'));
        } else {
            return;
        }
        depositCheck.setAttribute('disabled', 'true');
        depositBank.setAttribute('disabled', 'true');
        btnExpenses.setAttribute('disabled', 'true');
        btnIncome.setAttribute('disabled', 'true');
        start.style.display = 'none';
        cancel.style.display = 'block';
        btnIncome.style.cursor = 'none';

        this.budget = +salaryAmount.value;
        this.getExpInc();
        this.getAddExpenses();
        this.getAddIncome();
        this.getExpensesMonth();
        this.getInfoDeposit();
        this.getBudget();
        this.calcPeriod();
        this.showResult();
    }

    showResult() {
        const _this = this;
        budgetMonthValue.value = this.budgetMonth;
        budgetDayValue.value = Math.ceil(this.budgetDay);
        expensesMonthValue.value = this.expensesMonth;
        additionalExpensesValue.value = this.addExpenses.join(', ');
        additionalIncomeValue.value = this.addIncome.join(', ');
        targetMonthValue.value = Math.ceil(this.getTargetMonth());
        incomePeriodValue.value = this.calcPeriod();
        periodSelect.addEventListener('change', () => incomePeriodValue.value = _this.calcPeriod());
    }
    getExpInc() {
        const count = item => {
            const startStr = item.className.split('-')[0];
            const itemTitle = item.querySelector(`.${startStr}-title`).value;
            const itemAmount = item.querySelector(`.${startStr}-amount`).value;
            if (itemTitle !== '' && itemAmount !== '') {
                this[startStr][itemTitle] = itemAmount;
            }
        };
        incomeItem.forEach(count);
        expensesItems.forEach(count);
    }

    addIncomeBlock() {
        const cloneIncomeItem = incomeItem[0].cloneNode(true); // создаем копию блока с классом incomeItem[0] 
        cloneIncomeItem.querySelector('.income-title').value = ''; // обнуляем значения перед каждым клонированием
        cloneIncomeItem.querySelector('.income-amount').value = '';// обнуляем значения перед каждым клонированием
        incomeItem[0].parentNode.insertBefore(cloneIncomeItem, btnIncome);// вставляем объект перед кнопкой
        incomeItem = document.querySelectorAll('.income-items');// снова записываем в переменную все объекты 
        if (incomeItem.length === 3) {// условия если объектов накопировали уже 3 то скрываем кнопку для того что бы больше не
            btnIncome.style.display = 'none';
        }
    }

    addExpensesBlock() {
        const cloneExpensesItem = expensesItems[0].cloneNode(true);
        cloneExpensesItem.querySelector('.expenses-amount').value = '';
        cloneExpensesItem.querySelector('.expenses-title').value = '';
        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, btnExpenses);
        expensesItems = document.querySelectorAll('.expenses-items');
        if (expensesItems.length === 3) {
            btnExpenses.style.display = 'none';
        }
    }

    getAddExpenses() {
        let addExpenses = additionalExpensesItem.value.split(',');
        addExpenses.forEach((item) => {
            item = item.trim();
            if (item !== '') {
                this.addExpenses.push(item);
            }
        });
    }
    getAddIncome() {
        additionalIncomeItem.forEach((item) => {
            let itemValue = item.value.trim();
            if (itemValue !== '') {
                this.addIncome.push(itemValue);
            }
        });
    }

    getExpensesMonth() {
        for (let key in this.expenses) {
            this.expensesMonth += +this.expenses[key];
        }
    }

    getBudget() {
        const monthDeposit = this.moneyDeposit * (this.percentDeposit / 100);
        this.budgetMonth = +this.budget + this.incomeMonth - +this.expensesMonth + monthDeposit;
        this.budgetDay = Math.ceil(this.budgetMonth / 30);
    }

    getTargetMonth() {
        return targetAmount.value / this.budgetMonth;
    }

    getStatusIncome() {
        if (this.budgetDay >= 1200) {
            return ('У вас высокий уровень дохода!');
        } else if (this.budgetDay >= 600 && this.budgetDay < 1200) {
            return ('У вас средний уровень дохода!');
        } else if (this.budgetDay < 600 && this.budgetDay >= 0) {
            return ('К сожалению у вас уровень дохода ниже среднего!');
        } else {
            return ('Что-то пошло не так!');
        }
    }

    getInfoDeposit() {
        if (this.deposit) {
            do {
                this.percentDeposit = depositPercent.value;

            }
            while (!isNumber(this.percentDeposit));
            do {
                this.moneyDeposit = depositAmount.value;
            }
            while (!isNumber(this.moneyDeposit));
        }
    }

    calcPeriod() {
        return this.budgetMonth * periodSelect.value;
    }

    reboot() {
        const inputAll = document.querySelectorAll('input');
        inputAll.forEach((item) => {
            item.value = '';
            item.removeAttribute('disabled');
            periodSelect.value = '0';
            titlePeriodAmount.textContent = periodSelect.value;
        });
        for (let i = 1; i < expensesItems.length; i++) {
            expensesItems[i].parentNode.removeChild(expensesItems[i]);
        }
        for (let i = 1; i < incomeItem.length; i++) {
            incomeItem[i].parentNode.removeChild(incomeItem[i]);
        }
        btnExpenses.style.display = 'block';
        btnIncome.style.display = 'block';
        btnExpenses.removeAttribute('disabled');
        btnIncome.removeAttribute('disabled');
        depositCheck.removeAttribute('disabled');
        depositBank.removeAttribute('disabled');
        start.style.display = 'block';
        cancel.style.display = 'none';
        depositBank.style.display = 'none';
        depositAmount.style.display = 'none';
        this.income = {};
        this.incomeMonth = 0;
        this.addIncome = [];
        this.expenses = {};
        this.addExpenses = [];
        this.period = 0;
        this.budget = 0;
        this.budgetDay = 0;
        this.budgetMonth = 0;
        this.expensesMonth = 0;
        depositCheck.checked = false;
        this.depositHendler();
        
    }   
    inputValidation(){
        let persentValue = Number(depositPercent.value);
        if (/^[0-9][0-9]?$|^100$/.test(persentValue)) {
            console.log('все четко');
            start.removeAttribute('disabled')
            return;
        } else {
            start.setAttribute('disabled', 'true')
            depositPercent.value = '';
            alert('можно вовдить только числа и от 0 до 100');
            return;
        }

    }
    changePercent() {
        const valueSelect = this.value;
        if (valueSelect === 'other') {
            depositPercent.style.display = 'inline-block';
        } else {
            depositPercent.value = valueSelect;
            depositPercent.style.display = 'none';
        }
    }
    depositHendler() {
        
        if (depositCheck.checked) {
            depositBank.style.display = 'inline-block';
            depositAmount.style.display = 'inline-block';
            this.deposit = true;
            depositBank.addEventListener('change', this.changePercent);
        } else {
            console.log(depositCheck);
            depositBank.style.display = 'none';
            depositAmount.style.display = 'none';
            depositPercent.style.display = 'none';
            depositBank.value = '';
            depositAmount.value = '';
            this.deposit = false;
            depositBank.removeEventListener('change', this.changePercent);
        }
    } 
    addEvent() {
        start.addEventListener('click', this.start.bind(this));
        btnExpenses.addEventListener('click', this.addExpensesBlock);
        btnIncome.addEventListener('click', this.addIncomeBlock);
        cancel.addEventListener('click', this.reboot.bind(this));
        periodSelect.addEventListener('click', () => titlePeriodAmount.innerHTML = periodSelect.value);
        depositCheck.addEventListener('change', this.depositHendler.bind(this));
        depositPercent.addEventListener('input', this.inputValidation.bind(this));
    }
}

const appData = new AppData();

appData.addEvent();
