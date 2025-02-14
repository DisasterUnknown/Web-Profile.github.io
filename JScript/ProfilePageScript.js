// Setting the age in the bio
const birthYear = 2006;
const currentYear = new Date().getFullYear();
const age = currentYear - birthYear;

document.getElementById('age').textContent = age;



// Adding music for the page 
const vBtn = document.getElementById('volumeBtn');
const music = document.getElementById('music');

const volume = 'Resources/MainBanner/volume.png';
const mute = 'Resources/MainBanner/mute.png';

vBtn.addEventListener('click', () => {
    // Creating the music mute btn
    if (vBtn.src.includes(volume)) {
        vBtn.src = mute;
        music.pause();
    } else {
        vBtn.src = volume;
        music.play();
    }
})




// Display the alert Msg
function showAlert(message) {
    const alertContainer = document.getElementById('customAlert');
    const alertMessage = document.getElementById('alertMessage');

    alertMessage.textContent = message; // Set custom message
    alertContainer.style.display = 'flex'; // Show alert
}

document.getElementById('closeAlert').addEventListener('click', () => {
    const alertContainer = document.getElementById('customAlert');
    alertContainer.style.display = 'none'; // Hide alert on button click
});



// Changing the numbers in the number click area
const num1 = document.getElementById('num1');
const num2 = document.getElementById('num2');
const num3 = document.getElementById('num3');
const num4 = document.getElementById('num4');

function changeNumber(num) {
    const randomNum = Math.floor(Math.random() * 10);
    num.textContent = randomNum;

    // Checking if the numbers are 2006

    const num1 = document.getElementById('num1').textContent;
    const num2 = document.getElementById('num2').textContent;
    const num3 = document.getElementById('num3').textContent;
    const num4 = document.getElementById('num4').textContent;

    if (num1 == '2' && num2 == '0' && num3 == '0' && num4 == '6') {
        showAlert('Your device has been Hacked!!');
    } else if (num1 == '1' && num2 == '0' && num3 == '2' && num4 == '4') {
        window.location.href = "./HTML/hidden.html";
    }
}

num1.addEventListener('click', () => { changeNumber(num1) })

num2.addEventListener('click', () => { changeNumber(num2) })

num3.addEventListener('click', () => { changeNumber(num3) })

num4.addEventListener('click', () => { changeNumber(num4) })


// document.getElementById('sec1').addEventListener('click', () => {
//     window.alert("Coming Soon!!");
// })

// document.getElementById('sec2').addEventListener('click', () => {
//     window.alert("Coming Soon!!");
// })

// document.getElementById('sec3').addEventListener('click', () => {
//     window.alert("Coming Soon!!");
// })

document.getElementById('sec4').addEventListener('click', () => {
    window.alert("Coming Soon!!");
})