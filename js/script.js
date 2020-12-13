'use strict';

function DomElement(selector, height, width, bg, fontSize) {
    this.selector = selector;
    this.height = 100;
    this.width = 100;
    this.top = '200px';
    this.left = '600px';
    this.bg = '#33360b';
    this.position = 'absolute';
    this.fontSize = '12px';
}


let elementDiv = new DomElement();

elementDiv.creatElement = function () {
    let question = prompt('введите пожалуйста . или #');
    let newElem;
    if (question.slice(0, 1) === '.' || question === '.') {
        newElem = document.createElement('div');
        document.body.appendChild(newElem);
        if (question.length === 1) {
            newElem.classList.add('newClass');
        } else {
            newElem.classList.add(question.slice(1));
        }
        console.log(newElem);
        newElem.style.cssText = `positi.on:${this.position}; background:${this.bg}; width:${this.width}; left:${this.left}; top:${this.top}; transform:${this.transform}; height:${this.height}; display: flex; align-items: center; justify-content: center; color: white;`;
        newElem.textContent = 'вы создали тег: DIV';

    } else if (question.slice(0, 1) === '#') {
        newElem = document.createElement('p');
        document.body.appendChild(newElem);
        if (question.length === 1) {
            newElem.classList.add('newClass');
        } else {
            newElem.classList.add(question.slice(1));
        }
        console.log(newElem);
        newElem.style.cssText = `background:${this.bg}; width:${this.width}; height:${this.height}; display: flex; align-items: center; justify-content: center; color: white;`;
        newElem.textContent = `вы создали тег: P`;
    }
    document.addEventListener('keydown', (event) => {
        const keyName = event.keyCode;
        let left = parseInt(this.left);
        let top = parseInt(this.top);
        let myWidth = window.innerWidth;
        let myHeight = window.innerHeight;
        let stylesElementEvent = `transition: all .3s ease; position:${this.position}; background:red; width:${this.width}; left:${this.left}; top:${this.top}; transform:${this.transform}; height:${this.height}; display: flex; align-items: center; justify-content: center; color: white;`;
        let stylesElement = `transition: all .3s ease; position:${this.position}; background:green; width:${this.width}; left:${this.left}; top:${this.top}; transform:${this.transform}; height:${this.height}; display: flex; align-items: center; justify-content: center; color: white;`;
        if (keyName === 37) {
            if (left === 0) {
                newElem.style.cssText = stylesElementEvent;
                return;
            }
            left -= 10;
            this.left = left + 'px';
            
            newElem.style.cssText = stylesElement;
        }
        if (keyName === 38) {
            if (top === 0) {
                newElem.style.cssText = stylesElementEvent;
                retutn;
            }
            top -= 10;
            this.top = top + 'px';
            newElem.style.cssText = stylesElement;
        }
        if (keyName === 39) {
            
            if (left >= myWidth - 100) {
                newElem.style.cssText = stylesElementEvent;
                retutn;
            }
            left += 10;
            this.left = left + 'px';
            newElem.style.cssText = stylesElement;
        }
        if (keyName === 40) {
            if (top >= (myHeight - 100)) {
                newElem.style.cssText = stylesElementEvent;
                retutn;
            }
            top += 10;
            this.top = top + 'px';
            newElem.style.cssText = stylesElement;
        }
        return;
    }, false);
    
};
elementDiv.creatElement();



