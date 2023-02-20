let carts = document.querySelectorAll('.box__item');
let audio = document.querySelector('#audio');
let openPairs = 0;
let dontOpen = false;
let menu = document.querySelector('.menu');
let button = document.querySelector('button');
let select = document.querySelector('select');
let wrapper = document.querySelector('.wrapper');
let time = 63;
let infoDiv = document.querySelector('.info');
let restar = document.querySelector('.restar');
let span = document.querySelector('span');
let timing;
let pInfo = document.querySelector('.info p');

let firstCart = '';
let secondCart = '';
rundomPosition();
for (let i = 0; i < 16; i++) {
    carts[i].onclick = function () {
        if (dontOpen == false) {
            carts[i].classList.add('flip');
            if (firstCart == '') {
                firstCart = carts[i];
            } else {
                secondCart = carts[i];
                dontOpen = true;
                console.log(firstCart, secondCart)
                if (firstCart.querySelector('img').src == secondCart.querySelector('img').src) {
                    console.log('ok');
                    audio.play();
                    firstCart = '';
                    secondCart = '';
                    openPairs = openPairs + 1;
                    dontOpen = false;
                    if (openPairs == 8) {
                        clearInterval(timing);
                        setTimeout(() => {
                            infoDivShow('ПОБЕДА');
                        }, 1000);
                    }
                } else {
                    setTimeout(() => {
                        firstCart.classList.remove('flip');
                        secondCart.classList.remove('flip');
                        firstCart = '';
                        secondCart = '';
                        dontOpen = false;
                    }, 1000);
                }
            }
        }
    }
}

function rundomPosition() {
    for (let i = 0; i < 16; i++) {
        let randomNumber = Math.floor(Math.random() * (16 - 1 + 1) + 1);
        carts[i].style.order = randomNumber;
    }
}

button.onclick = function () {
    rundomPosition();
    openPairs = 0;
    firstCart = '';
    secondCart = '';
    let levle = select.value;
    time = parseInt(levle);
    menu.classList.add('_hidden');
    wrapper.classList.add('_hidden');
    startTime();
}

function startTime() {
    timing = setInterval(() => {
        time = time - 1;
        span.innerHTML = time;
        if (time == 0) {
            infoDivShow('Игра окончена');
            clearInterval(timing);
        }
    }, 1000);
}

function infoDivShow(text) {
    pInfo.innerHTML = text;
    wrapper.classList.remove('_hidden');
    infoDiv.classList.remove('_hidden');
}

restar.onclick = function () {
    for (let i = 0; i < 16; i++) {
        carts[i].classList.remove('flip');
    }
    infoDiv.classList.add('_hidden');
    menu.classList.remove('_hidden');
}