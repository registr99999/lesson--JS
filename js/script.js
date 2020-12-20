'use strict';
let newTodo;
class Todo {
  constructor(form, input, todoList, todoCompleted, todoItem) {
    this.form = document.querySelector(form);
    this.input = document.querySelector(input);
    this.todoList = document.querySelector(todoList);
    this.todoCompleted = document.querySelector(todoCompleted);
    this.todoItem = document.querySelector(todoItem);
    this.todoData = new Map(JSON.parse(localStorage.getItem('todoList')));
  }

  addToStorage() {
    localStorage.setItem('todoList', JSON.stringify([...this.todoData]))
  }

  render() {
    this.todoList.textContent = '';
    this.todoCompleted.textContent = '';
    this.todoData.forEach(this.createItem, this);
    this.addToStorage();
  }

  createItem({ value, key, completed }) {
    const li = document.createElement('li');
    li.classList.add('todo-item');
    li.insertAdjacentHTML('beforeend',
      `<span class="text-todo">${value}</span>
      <div class="todo-buttons">
        <button class="todo-remove" data-key="${key}"></button>
        <button class="todo-complete" data-key="${key}"></button>
      </div>
      `);

    this.handler(li);

    if (completed) {
      this.todoCompleted.append(li);

    } else {
      this.todoList.append(li);

    }

  }

  addTodo(e) {
    e.preventDefault();
    if (this.input.value.trim()) {
      newTodo = {
        value: this.input.value,
        completed: false,
        key: this.generateKey(),
      };
      this.input.value = '';
      this.todoData.set(newTodo.key, newTodo);
      this.input.setAttribute('placeholder', 'Какие планы?');
      this.input.style.cssText = `background:#ffffff33; color: white; transition: all .3s ease`;
      this.render();

    } else {
      this.input.setAttribute('placeholder', 'введите название дела!');
      this.input.style.cssText = `background:red; color: white; transition: all .5s ease`;
    }

  }
  generateKey() {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  }

  deleteTodoItem(key, li) {
    this.todoData.delete(key);
    this.render();
  }



  editItem() {
    console.log('даю возможность редактировать');
  }

  completeTodoItem(key) {

    this.todoData.forEach((item) => {
      if (item.key === key) {
        item.completed = !item.completed;
      }
      
    })
    this.render();
  }

  handler(li) {
    
    const that = this;

    li.querySelector('.todo-remove').addEventListener('click', function ({ target }) {
      const todoKey = target.dataset.key;
      that.deleteTodoItem(todoKey, li);
    })

    li.querySelector('.todo-complete').addEventListener('click', function ({ target }) {
      const todoKey = target.dataset.key;
      that.completeTodoItem(todoKey);

    })
  }

  init() {
    this.input.addEventListener('input', () => {
      this.input.setAttribute('placeholder', 'Какие планы?');
      this.input.style.cssText = `background:#ffffff33; color: white; transition: all .3s ease`;
    });
    this.form.addEventListener('submit', this.addTodo.bind(this));
    this.render();

  }
}

const todo = new Todo('.todo-control', '.header-input', '.todo-list', '.todo-completed', '.todo-item');

todo.init();


