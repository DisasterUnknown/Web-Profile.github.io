// Detect if the device supports touch


// Create and append canvas to the document
const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");
document.body.appendChild(canvas);

// Set canvas size
const resizeCanvas = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
};
resizeCanvas();

// Mouse properties
const mouse = { x: 0, y: 0, radius: 2500 };

// Store particles
const particles = [];
const gap = 10; // Distance between particles

// Initialize particles
const initializeParticles = () => {
    particles.length = 0;
    for (let x = 0; x < canvas.width; x += gap) {
        for (let y = 0; y < canvas.height; y += gap) {
            particles.push({
                originX: x,
                originY: y,
                x,
                y,
                vx: 0,
                vy: 0,
                size: 1
            });
        }
    }
};

// Update and animate particles
const updateParticles = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach((p) => {
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const distance = dx * dx + dy * dy;

        if (distance < mouse.radius) {
            const angle = Math.atan2(dy, dx);
            const force = (-mouse.radius / distance) * 3;
            p.vx += force * Math.cos(angle) || 5;
            p.vy += force * Math.sin(angle) || 5;
        }

        // Apply friction
        p.vx *= 0.99;
        p.vy *= 0.99;

        // Move particle and ease back to original position
        p.x += p.vx + (p.originX - p.x) * 0.3;
        p.y += p.vy + (p.originY - p.y) * 0.3;

        // Draw particle
        ctx.fillStyle = "white";
        ctx.fillRect(p.x, p.y, p.size, p.size);
    });

    requestAnimationFrame(updateParticles);
};

// Track input movement
if (isTouchDevice) {
    window.addEventListener("touchmove", (e) => {
        const touch = e.touches[0]; // Get the first touch point
        mouse.x = touch.clientX;
        mouse.y = touch.clientY;
    });
} else {
    window.addEventListener("mousemove", (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });
}

// Handle resize
window.addEventListener("resize", () => {
    resizeCanvas();
    initializeParticles();
});

// Initialize and start animation
initializeParticles();
updateParticles();
