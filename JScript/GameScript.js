let selectOpption = document.getElementsByClassName('selectOption');
let gameBody = document.getElementsByClassName('xox_Game');

let opp1 = document.getElementById('opp1');
let opp2 = document.getElementById('opp2');

let gameType = null;






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