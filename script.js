"use strict"

var pics = document.querySelectorAll("#canvas > img");

function classAdd(obj){
    for(let el of obj) {
        el.classList.add("pics");
    }
}

function random(min, max) {
    return Math.random() * (max - min) + min;
}
classAdd(pics);

let canvas ={
    c: null,
    width: 900,
    height: 900,
    rectangles: [],
    init() {
        this.c = document.querySelector("#canvas").getContext("2d")
    },
    initPics(obj){
        for(let i = 0; i < obj.length; i++){
            let pic = obj[i];
             this.rectangles.push({
                 x: random(0, 651),
                 y: random(0, 651),
                 w: pic.clientWidth,
                 h: pic.clientHeight,
                 content: pic,
                 sx: 10 * Math.random(),
                 sy: 10 * Math.random(),
             })
        }
    },
    anim(){
        for (let elem of this.rectangles){
            elem.x += elem.sx;
            elem.y += elem.sy;
            if(elem.x > this.width - 250 || elem.x < 0){
                elem.sx *= -1;
            }
            if(elem.y > this.height - 250 || elem.y < 0){
                elem.sy *= -1;
            }
        }
    },
    render(){
        this.c.clearRect(0, 0, 900, 900)
        for(let rect of this.rectangles){
            this.c.beginPath();
            this.c.drawImage(rect.content, rect.x, rect.y, 250, 250);
        }
    },
    run(){
        window.requestAnimationFrame(()=>{
            this.anim();
            this.render();
            this.run();
        })
    },
    start(objects){
        this.init();
        this.initPics(objects);
        //this.render();
        this.run();
    }
}
window.addEventListener("load", () => canvas.start(pics))
