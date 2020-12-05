'use strict';

const headerInput = document.querySelector('.header-input');
const todoList = document.querySelector('.todo-list');
const todoControl = document.querySelector('.todo-control');
const todoCompleted = document.querySelector('.todo-completed');
const todoData = [];


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

        bntTodoRemove.addEventListener('click', function() {
            delete todoData.li;
            console.log(li);
            console.log(todoData);
            li.remove();
        });
        bntTodoCompleted.addEventListener('click', function () {
            item.completed = !item.completed;
            render();
        });

    });
};


todoControl.addEventListener('submit', function (event) {
    event.preventDefault();

    const newTodo = {// создание переменной newTodo
        value: headerInput.value,
        completed: false
    };

    if (event.keyCode == 13) { // добавление элемента newTodo в массив todoData по ENTER
        todoData.push(newTodo);
        render();
    }
    headerInput.value = null; // очищение поля ввода после события

    todoData.push(newTodo); // добавление элемента newTodo в массив todoData по button
    render();
});
render();
