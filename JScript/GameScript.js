// Refering to html element tags
let selectOpption = document.getElementsByClassName('selectOption');
let gameBody = document.getElementsByClassName('xox_Game');
let gameOver = document.getElementsByClassName('gameOver');

let opp1 = document.getElementById('opp1');
let opp2 = document.getElementById('opp2');

let menuBtn = document.getElementById('mainMenuBtn');

let gameType = null;
let win = false;

// Game Blocks
let b1 = document.getElementById('B1');
let b2 = document.getElementById('B2');
let b3 = document.getElementById('B3');
let b4 = document.getElementById('B4');
let b5 = document.getElementById('B5');
let b6 = document.getElementById('B6');
let b7 = document.getElementById('B7');
let b8 = document.getElementById('B8');
let b9 = document.getElementById('B9');
let boxes = [b1, b2, b3, b4, b5, b6, b7, b8, b9];
let avalebleBoxes = [b1, b2, b3, b4, b5, b6, b7, b8, b9];
let usedBoxes = []



// Game Logic
// =============================================================================================================
// Check who has won
function DisplayGameOver(character) {
    Array.from(gameBody).forEach(element => {
        element.style.display = 'none';
    })

    Array.from(gameOver).forEach(element => {
        element.style.display = 'block';
    })

    // Printing menue status
    if (character == 'X') {
        document.getElementById('VorD').innerHTML = "Victory";
        document.getElementById('botWins').innerHTML = "0";
        document.getElementById('playerWins').innerHTML = "1";
    } else if (character == 'O') {
        document.getElementById('VorD').innerHTML = "Defeat";
        document.getElementById('botWins').innerHTML = "1";
        document.getElementById('playerWins').innerHTML = "0";
    } else {
        document.getElementById('VorD').innerHTML = "Draw";
        document.getElementById('botWins').innerHTML = "0";
        document.getElementById('playerWins').innerHTML = "0";
    }
}



// gameOver color Function
function GameOverColor(e1, e2, e3) {
    e1.style.color = "red";
    e2.style.color = "red";
    e3.style.color = "red";
}



// Checking if game over
function GameOver(character) {
    if ((b1.innerText == character) && (b2.innerText == character) && (b3.innerText == character)) {
        GameOverColor(b1, b2, b3)
        win = true;
    } else if ((b4.innerText == character) && (b5.innerText == character) && (b6.innerText == character)) {
        GameOverColor(b4, b5, b6)
        win = true;
    } else if ((b7.innerText == character) && (b8.innerText == character) && (b9.innerText == character)) {
        GameOverColor(b7, b8, b9)
        win = true;
    } else if ((b1.innerText == character) && (b4.innerText == character) && (b7.innerText == character)) {
        GameOverColor(b1, b4, b7)
        win = true;
    } else if ((b2.innerText == character) && (b5.innerText == character) && (b8.innerText == character)) {
        GameOverColor(b2, b5, b8)
        win = true;
    } else if ((b3.innerText == character) && (b6.innerText == character) && (b9.innerText == character)) {
        GameOverColor(b3, b6, b9)
        win = true;
    } else if ((b1.innerText == character) && (b5.innerText == character) && (b9.innerText == character)) {
        GameOverColor(b1, b5, b9)
        win = true;
    } else if ((b3.innerText == character) && (b5.innerText == character) && (b7.innerText == character)) {
        GameOverColor(b3, b5, b7)
        win = true;
    } else if (boxes.every(box => box.innerHTML.trim() !== "")) {
        character = "N/A";
        win = true;
    }

    if (win) {
        // Waiting for 5mins
        setTimeout(() => {
            DisplayGameOver(character);
        }, 2500);
    }
}



// Printing the moves on the board
function PrintMove(moveBlock, symbole) {
    if ((moveBlock.textContent != 'X') && (moveBlock.textContent != 'O') && (!win)) {
        moveBlock.innerHTML = symbole;                                      // Printing the char
        avalebleBoxes = avalebleBoxes.filter(box => box !== moveBlock);     // Removing the block from the list
        usedBoxes.push(moveBlock);                                          // Adding the block to the list
        // console.log(avalebleBoxes);

        GameOver(symbole)
    }
    else {
        console.log("Can't select that block!!");
    }
}



// Bot move selection
function randomMoveFromChoices(choices) {
    let userbalChoices = choices.filter(element => avalebleBoxes.includes(element));
    let randomIndex = Math.floor(Math.random() * userbalChoices.length);
    PrintMove(userbalChoices[randomIndex], 'O');
}


function BotMove(avalebleChoice) {
    // Using offencive methods 1
    if ((((b1.innerHTML == "O") && (b2.innerHTML == "O")) || ((b1.innerHTML == "O") && (b3.innerHTML == "O")) || ((b2.innerHTML == "O") && (b3.innerHTML == "O"))) && ((b1.innerHTML.trim() == "") || (b2.innerHTML.trim() == "") || (b3.innerHTML.trim() == ""))) {
        let botMovementChoices = [b1, b2, b3];
        randomMoveFromChoices(botMovementChoices);
    } else if ((((b4.innerHTML == "O") && (b5.innerHTML == "O")) || ((b4.innerHTML == "O") && (b6.innerHTML == "O")) || ((b5.innerHTML == "O") && (b6.innerHTML == "O"))) && ((b4.innerHTML.trim() == "") || (b5.innerHTML.trim() == "") || (b6.innerHTML.trim() == ""))) {
        let botMovementChoices = [b4, b5, b6];
        randomMoveFromChoices(botMovementChoices);
    } else if ((((b7.innerHTML == "O") && (b8.innerHTML == "O")) || ((b7.innerHTML == "O") && (b9.innerHTML == "O")) || ((b8.innerHTML == "O") && (b9.innerHTML == "O"))) && ((b7.innerHTML.trim() == "") || (b8.innerHTML.trim() == "") || (b9.innerHTML.trim() == ""))) {
        let botMovementChoices = [b7, b8, b9];
        randomMoveFromChoices(botMovementChoices);
    } else if ((((b1.innerHTML == "O") && (b4.innerHTML == "O")) || ((b1.innerHTML == "O") && (b7.innerHTML == "O")) || ((b4.innerHTML == "O") && (b7.innerHTML == "O"))) && ((b1.innerHTML.trim() == "") || (b4.innerHTML.trim() == "") || (b7.innerHTML.trim() == ""))) {
        let botMovementChoices = [b1, b4, b7];
        randomMoveFromChoices(botMovementChoices);
    } else if ((((b2.innerHTML == "O") && (b5.innerHTML == "O")) || ((b2.innerHTML == "O") && (b8.innerHTML == "O")) || ((b5.innerHTML == "O") && (b8.innerHTML == "O"))) && ((b2.innerHTML.trim() == "") || (b5.innerHTML.trim() == "") || (b8.innerHTML.trim() == ""))) {
        let botMovementChoices = [b2, b5, b8];
        randomMoveFromChoices(botMovementChoices);
    } else if ((((b3.innerHTML == "O") && (b6.innerHTML == "O")) || ((b3.innerHTML == "O") && (b9.innerHTML == "O")) || ((b6.innerHTML == "O") && (b9.innerHTML == "O"))) && ((b3.innerHTML.trim() == "") || (b6.innerHTML.trim() == "") || (b9.innerHTML.trim() == ""))) {
        let botMovementChoices = [b3, b6, b9];
        randomMoveFromChoices(botMovementChoices);
    } else if ((((b1.innerHTML == "O") && (b5.innerHTML == "O")) || ((b1.innerHTML == "O") && (b9.innerHTML == "O")) || ((b5.innerHTML == "O") && (b9.innerHTML == "O"))) && ((b1.innerHTML.trim() == "") || (b5.innerHTML.trim() == "") || (b9.innerHTML.trim() == ""))) {
        let botMovementChoices = [b1, b5, b9];
        randomMoveFromChoices(botMovementChoices);
    } else if ((((b3.innerHTML == "O") && (b5.innerHTML == "O")) || ((b3.innerHTML == "O") && (b7.innerHTML == "O")) || ((b5.innerHTML == "O") && (b7.innerHTML == "O"))) && ((b3.innerHTML.trim() == "") || (b5.innerHTML.trim() == "") || (b7.innerHTML.trim() == ""))) {
        let botMovementChoices = [b3, b5, b7];
        randomMoveFromChoices(botMovementChoices);
    }

    // Using defencive methods 2
    else if ((((b1.innerHTML == "X") && (b2.innerHTML == "X")) || ((b1.innerHTML == "X") && (b3.innerHTML == "X")) || ((b2.innerHTML == "X") && (b3.innerHTML == "X"))) && ((b1.innerHTML.trim() == "") || (b2.innerHTML.trim() == "") || (b3.innerHTML.trim() == ""))) {
        let botMovementChoices = [b1, b2, b3];
        randomMoveFromChoices(botMovementChoices);
    } else if ((((b4.innerHTML == "X") && (b5.innerHTML == "X")) || ((b4.innerHTML == "X") && (b6.innerHTML == "X")) || ((b5.innerHTML == "X") && (b6.innerHTML == "X"))) && ((b4.innerHTML.trim() == "") || (b5.innerHTML.trim() == "") || (b6.innerHTML.trim() == ""))) {
        let botMovementChoices = [b4, b5, b6];
        randomMoveFromChoices(botMovementChoices);
    } else if ((((b7.innerHTML == "X") && (b8.innerHTML == "X")) || ((b7.innerHTML == "X") && (b9.innerHTML == "X")) || ((b8.innerHTML == "X") && (b9.innerHTML == "X"))) && ((b7.innerHTML.trim() == "") || (b8.innerHTML.trim() == "") || (b9.innerHTML.trim() == ""))) {
        let botMovementChoices = [b7, b8, b9];
        randomMoveFromChoices(botMovementChoices);
    } else if ((((b1.innerHTML == "X") && (b4.innerHTML == "X")) || ((b1.innerHTML == "X") && (b7.innerHTML == "X")) || ((b4.innerHTML == "X") && (b7.innerHTML == "X"))) && ((b1.innerHTML.trim() == "") || (b4.innerHTML.trim() == "") || (b7.innerHTML.trim() == ""))) {
        let botMovementChoices = [b1, b4, b7];
        randomMoveFromChoices(botMovementChoices);
    } else if ((((b2.innerHTML == "X") && (b5.innerHTML == "X")) || ((b2.innerHTML == "X") && (b8.innerHTML == "X")) || ((b5.innerHTML == "X") && (b8.innerHTML == "X"))) && ((b2.innerHTML.trim() == "") || (b5.innerHTML.trim() == "") || (b8.innerHTML.trim() == ""))) {
        let botMovementChoices = [b2, b5, b8];
        randomMoveFromChoices(botMovementChoices);
    } else if ((((b3.innerHTML == "X") && (b6.innerHTML == "X")) || ((b3.innerHTML == "X") && (b9.innerHTML == "X")) || ((b6.innerHTML == "X") && (b9.innerHTML == "X"))) && ((b3.innerHTML.trim() == "") || (b6.innerHTML.trim() == "") || (b9.innerHTML.trim() == ""))) {
        let botMovementChoices = [b3, b6, b9];
        randomMoveFromChoices(botMovementChoices);
    } else if ((((b1.innerHTML == "X") && (b5.innerHTML == "X")) || ((b1.innerHTML == "X") && (b9.innerHTML == "X")) || ((b5.innerHTML == "X") && (b9.innerHTML == "X"))) && ((b1.innerHTML.trim() == "") || (b5.innerHTML.trim() == "") || (b9.innerHTML.trim() == ""))) {
        let botMovementChoices = [b1, b5, b9];
        randomMoveFromChoices(botMovementChoices);
    } else if ((((b3.innerHTML == "X") && (b5.innerHTML == "X")) || ((b3.innerHTML == "X") && (b7.innerHTML == "X")) || ((b5.innerHTML == "X") && (b7.innerHTML == "X"))) && ((b3.innerHTML.trim() == "") || (b5.innerHTML.trim() == "") || (b7.innerHTML.trim() == ""))) {
        let botMovementChoices = [b3, b5, b7];
        randomMoveFromChoices(botMovementChoices);
    }

    // if none methods 3
    else {
        let randomIndex = Math.floor(Math.random() * avalebleChoice.length);
        PrintMove(avalebleChoice[randomIndex], 'O');        
    }
}



// Game Main Loop 
function GameLoop(selectedBox) {
    let isAvalable = ((selectedBox.innerHTML != "X") && (selectedBox.innerHTML != "O"));
    PrintMove(selectedBox, 'X');
    if (isAvalable) {
        BotMove(avalebleBoxes);
    }

    // Removing the past blocks in the gametype of 2
    if (gameType == 0) {
        if ((usedBoxes.length > 7) && (!win)) {
            //console.log("Wolf");

            for (let i = 0; i < 2; i++) {
                let firstUsedBlock = usedBoxes[0];
                usedBoxes = usedBoxes.filter(box => box !== firstUsedBlock);                 // Removing the block from the list
                avalebleBoxes.push(firstUsedBlock);                                          // Adding the block to the list

                firstUsedBlock.innerHTML = " ";
            }
        }
    }
}

// Player selecting the block
b1.addEventListener('click', () => {
    GameLoop(b1)
});

b2.addEventListener('click', () => {
    GameLoop(b2)
});

b3.addEventListener('click', () => {
    GameLoop(b3)
});

b4.addEventListener('click', () => {
    GameLoop(b4)
});

b5.addEventListener('click', () => {
    GameLoop(b5)
});

b6.addEventListener('click', () => {
    GameLoop(b6)
});

b7.addEventListener('click', () => {
    GameLoop(b7)
});

b8.addEventListener('click', () => {
    GameLoop(b8)
});

b9.addEventListener('click', () => {
    GameLoop(b9)
});
// ===============================================================================================================



// game page navigation opptions
// Game first oppting
opp1.addEventListener('click', () => {
    gameType = 1;

    Array.from(selectOpption).forEach(element => {
        element.style.display = 'none';
    })

    Array.from(gameBody).forEach(element => {
        element.style.display = 'block';
        win = false;
        avalebleBoxes = [b1, b2, b3, b4, b5, b6, b7, b8, b9];
        usedBoxes = [];
        for (let i = 0; i < boxes.length; i++) {
            boxes[i].innerHTML = '';
            boxes[i].style.color = "white";
        }
    })
})

// Game second oppting
opp2.addEventListener('click', () => {
    gameType = 0;

    Array.from(selectOpption).forEach(element => {
        element.style.display = 'none';
    })

    Array.from(gameBody).forEach(element => {
        element.style.display = 'block';
        win = false;
        avalebleBoxes = [b1, b2, b3, b4, b5, b6, b7, b8, b9];
        usedBoxes = [];
        for (let i = 0; i < boxes.length; i++) {
            boxes[i].innerHTML = '';
            boxes[i].style.color = "white";
        }
    })
})

// Navigation to main page after game over
menuBtn.addEventListener('click', () => {
    Array.from(gameOver).forEach(element => {
        element.style.display = 'none'
    })

    Array.from(selectOpption).forEach(element => {
        element.style.display = 'block'
    })
})