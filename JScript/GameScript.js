// Refering to html element tags
let selectOpption = document.getElementsByClassName('selectOption');
let gameBody = document.getElementsByClassName('xox_Game');
let gameOver = document.getElementsByClassName('gameOver');

let opp1 = document.getElementById('opp1');
let opp2 = document.getElementById('opp2');

let menuBtn = document.getElementById('mainMenuBtn');

let gameType = null;



// Game Logic








// game page navigation opptions
opp1.addEventListener('click', () => {
    gameType = 1;
    
    Array.from(selectOpption).forEach(element => {
        element.style.display = 'none';
    })

    Array.from(gameBody).forEach(element => {
        element.style.display = 'block';
    })
})

opp2.addEventListener('click', () => {
    gameType = 0;

    Array.from(selectOpption).forEach(element => {
        element.style.display = 'none';
    })

    Array.from(gameBody).forEach(element => {
        element.style.display = 'block';
    })
})

menuBtn.addEventListener('click', () => {
    Array.from(gameOver).forEach(element => {
        element.style.display = 'none'
    })

    Array.from(selectOpption).forEach(element => {
        element.style.display = 'block'
    })
})