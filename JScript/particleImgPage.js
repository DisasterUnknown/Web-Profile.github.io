let GAP;

window.onload = () => {
    fetch('../JSON/particalImg.json')
        .then(res => res.json())
        .then(data => addimg(data))
}

// adding Img's and pixel data from the session storage
function addimg(data) {
    const img = document.getElementById('image1');
    let imgData;
    let pixleData;

    try {
        imgData = sessionStorage.getItem('imageBase64');
        imgData = JSON.parse(imgData);
    } catch {
        console.log("No session data found!!");
    }

    if (imgData) {
        img.src = imgData;
    } else {
        img.src = data;
    }

    img.onload = function () {
        try {
            pixleData = sessionStorage.getItem('pixleGapValue');
            pixleData = JSON.parse(pixleData);
        } catch {
            console.log("No session data found!!");            
        }

        if (pixleData) {
            Main(pixleData);
        } else {
            Main(2);
        }
    }
}


// Page Main logic
function Main(GAP) {
    const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;

    const canves = document.getElementById('canvas1');
    const ctx = canves.getContext('2d', { willReadFrequently: true });
    canves.width = window.innerWidth;
    canves.height = window.innerHeight;
    console.log(`Window Width: ${window.innerWidth}`);
    console.log(`Window Height: ${window.innerHeight}`);


    class Particle {
        constructor(effect, x, y, color) {
            this.effect = effect;
            this.x = x;
            this.y = y;
            this.originX = Math.floor(x);
            this.originY = Math.floor(y);
            this.color = color;
            this.size = this.effect.gap;
            this.vx = 0;
            this.vy = 0;
            this.ease = 0.05;
            this.friction = 0.95;
            this.dx = 0;
            this.dy = 0;
            this.distace = 0;
            this.force = 0;
            this.angel = 0;
        }

        draw(context) {
            context.fillStyle = this.color;
            context.fillRect(this.x, this.y, this.size, this.size);
        }

        update() {
            this.dx = this.effect.mouse.x - this.x;
            this.dy = this.effect.mouse.y - this.y;
            this.distace = (this.dx * this.dx) + (this.dy * this.dy);
            this.force = (-this.effect.mouse.radius / this.distace) * 3;

            if (this.distace < this.effect.mouse.radius) {
                this.angel = Math.atan2(this.dy, this.dx);
                this.vx = this.force * Math.cos(this.angel) || 5;
                this.vy = this.force * Math.sin(this.angel) || 5;
            }

            this.x += (this.vx *= this.friction) + (this.originX - this.x) * this.ease;
            this.y += (this.vy *= this.friction) + (this.originY - this.y) * this.ease;
        }
        warp() {
            this.x = Math.random() * this.effect.width;
            this.y = Math.random() * this.effect.height;
        }
    }

    class Effect {
        constructor(width, height) {
            this.width = width;
            this.height = height;
            this.particalsArray = [];
            this.image = document.getElementById('image1');

            this.w = this.image.naturalWidth;
            this.h = this.image.naturalHeight;
            function rationFinder(a, b) {
                return b === 0 ? a : rationFinder(b, a % b)
            }

            this.imgRatio = rationFinder(this.w, this.h);
            this.ratioWidth = this.w / this.imgRatio;
            this.ratioHeight = this.h / this.imgRatio;


            this.imagesWidth = this.width > 600 ? this.width / 3 : ((this.width / 10) * 9);
            this.tempImageHeight = ((this.imagesWidth / this.ratioWidth) * this.ratioHeight);
            this.imagesHeight = this.tempImageHeight < this.height ? this.tempImageHeight : (this.tempImageHeight - ((this.tempImageHeight - this.height) + 100));

            this.image.width = this.imagesWidth;
            this.image.height = this.imagesHeight;

            this.centerX = (this.width * 0.5);
            this.centerY = (this.height * 0.5);

            this.x = this.centerX - this.image.width * 0.5;
            this.y = this.width > 600 ? (this.centerY - this.image.height * 0.5) : (this.centerY - this.image.height * 0.6);

            this.gap = GAP;

            this.mouse = { radius: 10000, x: undefined, y: undefined };
            if (isTouchDevice) {
                window.addEventListener('touchmove', event => {
                    const touch = event.touches[0];
                    this.mouse.x = touch.clientX;
                    this.mouse.y = touch.clientY;
                });
            } else {
                window.addEventListener('mousemove', event => {
                    this.mouse.x = event.x;
                    this.mouse.y = event.y;
                });
            }
        }

        init(context) {
            context.drawImage(this.image, this.x, this.y, this.imagesWidth, this.imagesHeight);
            const pixels = context.getImageData(0, 0, this.width, this.height).data;
            for (let y = 0; y < this.height; y += this.gap) {
                for (let x = 0; x < this.width; x += this.gap) {
                    const index = (y * this.width + x) * 4;
                    const red = pixels[index];
                    const green = pixels[index + 1];
                    const blue = pixels[index + 2];
                    const alpha = pixels[index + 3];
                    const color = `rgb(${red},${green},${blue})`;

                    if (alpha > 0) {
                        this.particalsArray.push(new Particle(this, x, y, color));
                    }
                }
            }
        }

        draw(context) {
            this.particalsArray.forEach(partical => partical.draw(context));
        }

        update() {
            this.particalsArray.forEach(partical => partical.update());
        }

        warp() {
            this.particalsArray.forEach(partical => partical.warp());
        }
    }

    const effect = new Effect(canves.width, canves.height);
    effect.init(ctx);


    function animate() {
        ctx.clearRect(0, 0, canves.width, canves.height);
        effect.draw(ctx);
        effect.update();
        requestAnimationFrame(animate);
    }

    animate();

    // warp btn
    const warpBtn = document.getElementById('warpBtn');
    warpBtn.addEventListener('click', function () {
        effect.warp();
    });
}


// Checking if it's a mobile device
window.addEventListener('resize', () => {
    function isMobileDevice() {
        if (/Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
            return true;
        } else {
            return false;
        }
    }

    // Resizing the page if it is not mobile device
    if (!isMobileDevice()) {
        window.addEventListener('resize', () => {
            location.reload();
        });
    }
});



// Changing the pixel ratio
let ratioIn = document.getElementById('gapValueIn');
document.getElementById('applyGap').addEventListener('click', (event) => {
    event.preventDefault();

    let value = parseInt(ratioIn.value, 10) || 2;
    Main(value);

    if (value) {
        value = JSON.stringify(value);
        sessionStorage.setItem('pixleGapValue', value);
    }

});

document.getElementById('gapValueIn').addEventListener('input', () => {
    ratioIn.value = ratioIn.value.replace(/\D/g, '');

    if (ratioIn.value < 1) {
        ratioIn.value = 1;
    } else if (ratioIn.value.length > 2) {
        ratioIn.value = ratioIn.value.slice(0, 2);
    } else if (ratioIn.value > 50) {
        ratioIn.value = 50;
    }
});
