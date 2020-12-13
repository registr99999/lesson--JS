'use strict';

const hightWindow = window.innerHeight,
    widthWindow = window.innerWidth;
let newElem;

class Element {
    constructor(teg, hight, width, bg, position, top, left) {
        this.teg = teg;
        this.hight = hight;
        this.width = width;
        this.bg = bg;
        this.position = position;
        this.top = top;
        this.left = left;
    }


    start() {
        this.creatElement();
        this.resizePosition();
    }

    creatElement() {

        newElem = document.createElement(this.teg);
        document.body.appendChild(newElem);
        newElem.style.cssText = (`background:${this.bg}; left:${this.left}; top:${this.top}; height:${this.hight}; width:${this.width}; position:${this.position};`)
    }
    resizePosition() {
        document.addEventListener('keydown', (event) => {
            if (event.key === 'ArrowLeft') {
                this.left = parseInt(this.left) - 10 + 'px';
                newElem.style.left = `${this.left} + px`;
            }
            if (event.key === 'ArrowRight') {
                this.left = parseInt(this.left) + 10 + 'px';
                newElem.style.left = `${this.left} + px`;
            }
            if (event.key === 'ArrowUp') {
                this.top = parseInt(this.top) - 10 + 'px';
                newElem.style.left = `${this.top} + px`;
            }
            if (event.key === 'ArrowDown') {
                this.top = parseInt(this.top) + 10 + 'px';
                newElem.style.left = `${this.top} + px`;
            }
            newElem.style.cssText = (`background:${this.bg}; left:${this.left}; top:${this.top}; height:${this.hight}; width:${this.width}; position:${this.position};`)
        })
    }
}

document.addEventListener("DOMContentLoaded", function (event) {

    const blockDiv = new Element('div', 100 + 'px', 100 + 'px', 'green', 'absolute', 0, 0);

    blockDiv.start();

});
