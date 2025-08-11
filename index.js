// Phần pháo hoa (như cũ)
const canvas = document.querySelector('.fireworks-container');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

class Particle {
    constructor(x, y, color, speedX, speedY) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.speedX = speedX;
        this.speedY = speedY;
        this.alpha = 1;
        this.size = Math.random() * 3 + 2;
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.alpha -= 0.02;
    }
    draw() {
        ctx.globalAlpha = this.alpha;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
    }
}

function createFirework(x, y) {
    const colors = ['#ff4d94', '#ffcc00', '#66ff66', '#66ccff', '#ff99cc'];
    for (let i = 0; i < 50; i++) {
        const angle = Math.random() * 2 * Math.PI;
        const speed = Math.random() * 4 + 1;
        particles.push(new Particle(
            x, y,
            colors[Math.floor(Math.random() * colors.length)],
            Math.cos(angle) * speed,
            Math.sin(angle) * speed
        ));
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((p, index) => {
        p.update();
        p.draw();
        if (p.alpha <= 0) particles.splice(index, 1);
    });
    requestAnimationFrame(animate);
}

window.addEventListener('click', (e) => {
    createFirework(e.clientX, e.clientY);
});

// Tự bắn pháo hoa ngẫu nhiên
setInterval(() => {
    createFirework(Math.random() * canvas.width, Math.random() * canvas.height);
}, 1000);

animate();

// Điều khiển nhạc
const music = document.getElementById('bg-music');
const musicBtn = document.getElementById('music-toggle');
let isPlaying = false;

musicBtn.addEventListener('click', () => {
    if (!isPlaying) {
        music.play();
        musicBtn.textContent = "🔇 Tắt nhạc";
    } else {
        music.pause();
        musicBtn.textContent = "🎵 Bật nhạc";
    }
    isPlaying = !isPlaying;
});
