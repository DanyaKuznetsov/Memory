let allCards = document.querySelectorAll('.board__item');//создаём переменную для всех карточек
let audio = document.createElement('audio');//audio
let firstCard = '';
let secondCard = '';
let counter = 0;
let buttonStart = document.querySelector('#start');
let wrapper = document.querySelector('.wrapper');
let spanTime = document.querySelector('.time span');
let select = document.querySelector('select');
let menu = document.querySelector('.wrapper__menu');
let lose = document.querySelector('.lose');
let win = document.querySelector('.win');
let buttonRestartLose = document.querySelector('.again2');
let buttonRestartWin = document.querySelector('.again');
for (let i = 0; i < 16; i++) {//создаём цикл, который будет повторяться 16 раз
    allCards[i].onclick = function () {//если нажать на любую из карточек, запускается функция
        if (secondCard == '') {//если вторая карточка ещё не открыта
            allCards[i].classList.add('flip');//к нажатой карточке добавляется класс флип
            if (firstCard == '') {//если мы открыли первую карточку
                firstCard = allCards[i];//тогда эту карточку добавляем в firstCard
            } else {
                secondCard = allCards[i];//иначе, эту карту добавляем в secondCard
                check();//запускаем функцию проверки карточек
            }
        }
    }
}
buttonStart.onclick = function () {
    menu.classList.add('_hide')
    wrapper.classList.add('wrapper_hide');
    let time = select.value;
    spanTime.innerHTML = time;
    timer(time);
    random();
}
function timer(currentTime) {
    let timerInterval = setInterval(() => {
        currentTime--;
        spanTime.innerHTML = currentTime;
        if (currentTime == 0 || counter == 8) {
            clearInterval(timerInterval);
            if (currentTime == 0){
                wrapper.classList.remove('wrapper_hide');
                lose.classList.remove('_hide');    
            }
        }
    }, 1000);
}
function check() {
    if (firstCard.querySelector('img').src == secondCard.querySelector('img').src) {
        firstCard = '';
        secondCard = '';
        counter++;
        audio.src = './audio/correct.mp3';
        audio.play();
        if (counter == 8) {
            winner();
        }
    } else {
        setTimeout(() => {
            firstCard.classList.remove('flip');
            secondCard.classList.remove('flip');
            firstCard = '';
            secondCard = '';
        }, 1000);
    }
}
function winner() {
    setTimeout(() => {
        wrapper.classList.remove('wrapper_hide');
        win.classList.remove('_hide');
    }, 1000);
}
function restart() {
    lose.classList.add('_hide');
    win.classList.add('_hide');
    menu.classList.remove('_hide');
    counter = 0;
    for (let i = 0; i < 16; i++) {//создаём цикл, который будет повторяться 16 раз
        allCards[i].classList.remove('flip');//к нажатой карточке добавляется класс флип
    }

}
buttonRestartLose.onclick = function () {
    restart();
    random();
}
buttonRestartWin.onclick = function () {
    restart();
    random();
}
function random() {
    for (let i = 0; i < 16; i++) {
        let randomPosition = Math.floor(Math.random() * (16 - 1 + 1) + 1);
        allCards[i].style.order = randomPosition;
    }
}