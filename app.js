let isMusicPlaying = false;
const bgMusic = document.getElementById('bgMusic');
const musicToggleBtn = document.getElementById('musicToggleBtn');
const discIcon = document.getElementById('discIcon');
const musicText = document.getElementById('musicText');

// Populate elements on load
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('heroSubheading').innerText = CONFIG.heroSubheading;
    document.getElementById('heroTitle').innerText = CONFIG.heroTitle;
    document.getElementById('profileImg').src = CONFIG.profileImage;
    document.getElementById('countdownTitle').innerText = CONFIG.countdownTitleText;

    document.getElementById('modalTitle').innerText = CONFIG.giftTitle;
    document.getElementById('modalMessage').innerText = CONFIG.giftMessage;

    document.getElementById('galleryTitle').innerText = CONFIG.galleryTitle;
    document.getElementById('galleryImg1').src = CONFIG.gallery[0].image;
    document.getElementById('galleryCap1').innerText = CONFIG.gallery[0].caption;
    document.getElementById('galleryImg2').src = CONFIG.gallery[1].image;
    document.getElementById('galleryCap2').innerText = CONFIG.gallery[1].caption;
    document.getElementById('galleryImg3').src = CONFIG.gallery[2].image;
    document.getElementById('galleryCap3').innerText = CONFIG.gallery[2].caption;

    bgMusic.src = CONFIG.bgMusicUrl;
});

// Login Handler
function handleLogin(event) {
    event.preventDefault();
    const u = document.getElementById('usernameInput').value.trim();
    const p = document.getElementById('passwordInput').value.trim();
    const err = document.getElementById('loginError');

    if (u === CONFIG.username && p === CONFIG.password) {
        err.classList.add('hidden');

        const overlay = document.getElementById('loginOverlay');
        overlay.classList.add('opacity-0');

        setTimeout(() => {
            overlay.classList.add('hidden');

            const main = document.getElementById('mainContent');
            main.classList.remove('hidden');
            setTimeout(() => main.classList.remove('opacity-0'), 50);

            musicToggleBtn.classList.remove('hidden');

            // Trigger Events
            triggerConfetti();
            playMusic();
            startCountdown();
        }, 700);
    } else {
        err.classList.remove('hidden');
    }
}

// Confetti Burst Effect
function triggerConfetti() {
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;

    (function frame() {
        confetti({
            particleCount: 5,
            angle: 60,
            spread: 55,
            origin: { x: 0, y: 0.7 }
        });
        confetti({
            particleCount: 5,
            angle: 120,
            spread: 55,
            origin: { x: 1, y: 0.7 }
        });

        if (Date.now() < animationEnd) {
            requestAnimationFrame(frame);
        }
    })();
}

// Music Control
function playMusic() {
    bgMusic.play().then(() => {
        isMusicPlaying = true;
        updateMusicUI();
    }).catch(e => {
        console.log("Autoplay blocked:", e);
        isMusicPlaying = false;
        updateMusicUI();
    });
}

musicToggleBtn.addEventListener('click', () => {
    if (isMusicPlaying) {
        bgMusic.pause();
        isMusicPlaying = false;
    } else {
        bgMusic.play();
        isMusicPlaying = true;
    }
    updateMusicUI();
});

function updateMusicUI() {
    if (isMusicPlaying) {
        discIcon.classList.add('spin-disc');
        discIcon.classList.replace('bg-slate-800', 'bg-roseAccent');
        musicText.innerText = "Musik On";
    } else {
        discIcon.classList.remove('spin-disc');
        discIcon.classList.replace('bg-roseAccent', 'bg-slate-800');
        musicText.innerText = "Mute";
    }
}

// Countdown Timer Logic
function startCountdown() {
    const target = new Date(CONFIG.targetDate).getTime();

    const timer = setInterval(() => {
        const now = new Date().getTime();
        const diff = target - now;

        if (diff <= 0) {
            clearInterval(timer);
            document.getElementById('days').innerText = "00";
            document.getElementById('hours').innerText = "00";
            document.getElementById('minutes').innerText = "00";
            document.getElementById('seconds').innerText = "00";
            return;
        }

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        document.getElementById('days').innerText = String(days).padStart(2, '0');
        document.getElementById('hours').innerText = String(hours).padStart(2, '0');
        document.getElementById('minutes').innerText = String(minutes).padStart(2, '0');
        document.getElementById('seconds').innerText = String(seconds).padStart(2, '0');
    }, 1000);
}

// Candle Blow Interactive Effect
function blowCandle() {
    const flame = document.getElementById('flameGroup');
    const smoke = document.getElementById('smokeGroup');
    const toast = document.getElementById('wishToast');

    if (!flame.classList.contains('hidden')) {
        flame.classList.add('hidden');
        smoke.classList.remove('opacity-0');
        smoke.classList.add('smoke-anim');

        // Show toast message
        toast.classList.remove('hidden');

        // Burst of stars
        confetti({
            particleCount: 60,
            spread: 80,
            origin: { y: 0.6 }
        });
    }
}

// Gift Modal Functions
function openGiftModal() {
    const modal = document.getElementById('giftModal');
    modal.classList.remove('hidden');

    confetti({
        particleCount: 35,
        spread: 60,
        origin: { y: 0.5 }
    });
}

function closeGiftModal() {
    document.getElementById('giftModal').classList.add('hidden');
}