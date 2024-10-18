// Setting the age in the bio
const birthYear = 2006;
const currentYear = new Date().getFullYear();
const age = currentYear - birthYear;

document.getElementById('age').textContent = age;

// Adding music for the page 
const vBtn = document.getElementById('volumeBtn');

const volume = 'Resources/volume.png'; 
const mute = 'Resources/mute.png';

vBtn.addEventListener('click', () => {
    // Creating the music mute btn
    const music = document.getElementById('music');

    if (vBtn.src.includes(volume)) {
        vBtn.src = mute;
        music.pause();
    } else {
        vBtn.src = volume;
        music.play();
    }
})

