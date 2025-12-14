document.addEventListener('DOMContentLoaded', () => {
    // Simple parallax effect or subtle interaction
    const modelImg = document.querySelector('.model-img');
    const container = document.querySelector('.poster-container');
    const bigText = document.querySelector('.big-text-layer');


    document.addEventListener('click', (e) => {
        createHeart(e.clientX, e.clientY);
        createHeart(e.clientX + 10, e.clientY - 10);
        createHeart(e.clientX - 10, e.clientY - 10);
    });

    // Sparkle Trail
    let lastSparkle = 0;
    document.addEventListener('mousemove', (e) => {
        const now = Date.now();
        if (now - lastSparkle > 50) { // Limit sparkle creation
            createSparkle(e.clientX, e.clientY);
            lastSparkle = now;
        }

        // Preserve existing parallax
        const x = (window.innerWidth / 2 - e.clientX) / 25;
        const y = (window.innerHeight / 2 - e.clientY) / 25;

        if (modelImg && bigText) {
            modelImg.style.transform = `translateX(${x}px) translateY(${y}px) rotate(-2deg)`;
            bigText.style.transform = `translateX(${-x / 2}px) translateY(${-y / 2}px)`;
        }
    });

    function createHeart(x, y) {
        const heart = document.createElement('div');
        heart.classList.add('floating-heart');
        heart.innerText = '💙'; // Blue heart to match theme
        heart.style.left = `${x}px`;
        heart.style.top = `${y}px`;

        // Randomize slight movement
        const randomX = (Math.random() - 0.5) * 50;
        heart.style.setProperty('--tx', `${randomX}px`);

        document.body.appendChild(heart);
        setTimeout(() => heart.remove(), 1500);
    }

    function createSparkle(x, y) {
        const sparkle = document.createElement('div');
        sparkle.classList.add('sparkle');
        sparkle.style.left = `${x}px`;
        sparkle.style.top = `${y}px`;
        document.body.appendChild(sparkle);
        setTimeout(() => sparkle.remove(), 800);
    }

    // Mobile gyroscope support (optional, subtle)
    if (window.DeviceOrientationEvent) {
        window.addEventListener('deviceorientation', (e) => {
            const x = e.gamma / 5; // Tilt left/right
            const y = e.beta / 5;  // Tilt front/back

            // Limit the movement
            if (Math.abs(x) < 20 && Math.abs(y) < 20) {
                if (modelImg) modelImg.style.transform = `translateX(${x}px) translateY(${y}px) rotate(-2deg)`;
            }
        });
    }

    // Start celebrations
    startBalloons();
    startConfettiRain();

    function startBalloons() {
        const balloonContainer = document.createElement('div');
        balloonContainer.classList.add('balloon-container');
        document.body.prepend(balloonContainer);

        const colors = ['#2b6eff', '#ff9aa2', '#e2f0cb', '#b5ead7', '#ffDAC1'];

        setInterval(() => {
            const balloon = document.createElement('div');
            balloon.classList.add('balloon');
            balloon.style.left = `${Math.random() * 100}%`;
            balloon.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            balloon.style.animationDuration = `${Math.random() * 5 + 8}s`; // 8-13s
            balloon.style.transform = `scale(${Math.random() > 0.5 ? 1 : 0.8})`;

            balloonContainer.appendChild(balloon);

            // Clean up
            setTimeout(() => balloon.remove(), 13000);
        }, 800);
    }

    function startConfettiRain() {
        const colors = ['#2b6eff', '#ff9aa2', '#FFD700', '#ffffff'];

        setInterval(() => {
            const confetti = document.createElement('div');
            confetti.classList.add('confetti-piece');
            confetti.style.left = `${Math.random() * 100}%`;
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.animationDuration = `${Math.random() * 3 + 2}s`;
            confetti.style.top = '-10px';

            document.body.appendChild(confetti);
            setTimeout(() => confetti.remove(), 5000);
        }, 300);
    }
});

// Slider Logic (Global scope to be accessible by onclick)
function showSlide(slideIndex) {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');

    // Hide all slides
    slides.forEach(slide => slide.classList.remove('active-slide'));
    dots.forEach(dot => dot.classList.remove('active'));

    // Show target slide
    // slideIndex is 1-based, array is 0-based
    const targetSlide = document.getElementById(`slide-${slideIndex}`);
    if (targetSlide) {
        targetSlide.classList.add('active-slide');
        if (dots[slideIndex - 1]) dots[slideIndex - 1].classList.add('active');
    }
}
