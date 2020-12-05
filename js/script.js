'use strict';

const headerInput = document.querySelector('.header-input');
const todoList = document.querySelector('.todo-list');
const todoControl = document.querySelector('.todo-control');
const todoCompleted = document.querySelector('.todo-completed');
let todoData = [];

const render = function () {
    todoList.textContent = '';
    todoCompleted.textContent = '';


    todoData.forEach(function (item) {
        const li = document.createElement('li');

        
        


        li.classList.add('todo-item');

        li.innerHTML = '<span class="text-todo">' + item.value + '</span>' +
            '<div class="todo-buttons">' +
            '<button class="todo-remove"></button>' +
            '<button class="todo-complete"></button>' +
            '</div>';
        if (item.completed) {
            todoCompleted.append(li);
        } else {
            todoList.append(li);
        }
        
        const bntTodoCompleted = li.querySelector('.todo-complete');
        const bntTodoRemove = li.querySelector('.todo-remove');

        bntTodoRemove.addEventListener('click', function () {
            todoData.splice(todoData.indexOf(item), 1);
            localStorage.setItem('locStor', JSON.stringify(todoData));
            render();
        });
        bntTodoCompleted.addEventListener('click', function () {
            item.completed = !item.completed;
            localStorage.setItem('locStor', JSON.stringify(todoData));
            render();
        });
        
        
    });
    

};
if (localStorage.getItem('locStor')) {
    todoData = JSON.parse(localStorage.getItem('locStor'));
    render();
}

todoControl.addEventListener('submit', function (event) {
    event.preventDefault();

    const newTodo = {// создание переменной newTodo
        value: headerInput.value,
        completed: false
    };

    headerInput.value = null; // очищение поля ввода после события
    if (newTodo.value !== '') {
        if (event.keyCode == 13) { // добавление элемента newTodo в массив todoData по ENTER
            todoData.push(newTodo);
        }
        todoData.push(newTodo); // добавление элемента newTodo в массив todoData по button
        localStorage.setItem('locStor', JSON.stringify(todoData));
        render();
    }
    
});

render();
