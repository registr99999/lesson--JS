'use strict';

function DomElement(selector, height, width, bg, fontSize) {
    this.selector = selector;
    this.height = '200px';
    this.width = '200px';
    this.bg = '#33360b';
    this.fontSize = '12px';
}


let elementDiv = new DomElement();

elementDiv.creatElement = function () {
    let question = prompt('введите пожалуйста . или #');
    if (question.slice(0, 1) === '.') {
        let newDiv = document.createElement('div');
        document.body.appendChild(newDiv);
        newDiv.classList.add(question.slice(1));
        newDiv.style.cssText = `background:${this.bg}; width:${this.width}; height:${this.height}; display: flex; align-items: center; justify-content: center; color: white;`;
        newDiv.textContent = 'вы создали тег: DIV';
    } else if (question.slice(0, 1) === '#'){
        let newP = document.createElement('p');
        document.body.appendChild(newP);
        newP.id = question.slice(1);
        newP.style.cssText = `background:${this.bg}; width:${this.width}; height:${this.height}; display: flex; align-items: center; justify-content: center; color: white;`;
        newP.textContent = `вы создали тег: P`;
    }
    
};
elementDiv.creatElement();
