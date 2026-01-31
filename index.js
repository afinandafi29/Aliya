// JavaScript for Valentine's Day Website

// Configuration
const CONFIG = {
    questions: [
        "Do you feel comfortable when we talk? 🥰",
        "Do you enjoy spending time together? 🌹",
        "Do you like getting to know each other more? 💬",
        "Would you want to keep making memories together? 📸",
        "One last question... ❤️"
    ],
    romanticTexts: [
        "Your smile makes my world brighter... 🌟",
        "Every conversation with you is special... 💫",
        "I cherish every moment we share... ✨",
        "You make my heart skip a beat... 💓",
        "You're the most amazing person I know... 🌈"
    ],
    finalTexts: [
        "You're the answer to all my prayers... 🙏",
        "My heart beats only for you... 💓",
        "You complete me in every way... 🌟",
        "Forever and always, my love... 💕",
        "Our love story is just beginning... 📖",
        "You're my happily ever after... 🏰"
    ],
    maxDodges: 6,
    confettiCount: 300
};

// State Management
class ValentineApp {
    constructor() {
        this.currentQuestion = 0;
        this.dodgeCount = 0;
        this.isYesAnswered = false;
        this.isAnimating = false;
        
        // DOM Elements
        this.elements = {
            questionEl: document.getElementById('question'),
            buttonsEl: document.getElementById('buttons'),
            noBtn: document.getElementById('noBtn'),
            yesBtn: document.getElementById('yesBtn'),
            gallery: document.getElementById('gallery'),
            bigHeart: document.getElementById('bigHeart'),
            heartsContainer: document.getElementById('hearts-container'),
            romanticTextEl: document.getElementById('romanticText'),
            canvas: document.getElementById('confetti-canvas'),
            container: document.querySelector('.container'),
            preloader: this.createPreloader(),
            progressContainer: this.createProgressBar(),
            dateDetails: this.createDateDetails(),
            countdown: this.createCountdown()
        };
        
        // Confetti System
        this.ctx = this.elements.canvas.getContext('2d');
        this.particles = [];
        this.animationId = null;
        
        // Audio
        this.audio = {
            heartbeat: document.getElementById('heartbeatSound'),
            celebration: document.getElementById('celebrationSound'),
            click: document.getElementById('clickSound')
        };
        
        this.init();
    }
    
    // Initialize the application
    init() {
        this.setupCanvas();
        this.setupEventListeners();
        this.startHeartAnimation();
        this.showPreloader();
        this.playHeartbeat();
        
        // Initialize state
        this.elements.gallery.style.display = 'none';
        this.elements.bigHeart.style.display = 'none';
    }
    
    // Create and show preloader
    createPreloader() {
        const preloader = document.createElement('div');
        preloader.className = 'preloader';
        preloader.innerHTML = '<div class="loading-heart">💖</div>';
        document.body.appendChild(preloader);
        return preloader;
    }
    
    showPreloader() {
        setTimeout(() => {
            this.elements.preloader.classList.add('hidden');
            setTimeout(() => {
                this.elements.preloader.style.display = 'none';
            }, 500);
        }, 2000);
    }
    
    // Create progress bar
    createProgressBar() {
        const container = document.createElement('div');
        container.className = 'progress-container';
        container.innerHTML = '<div class="progress-bar"></div>';
        this.elements.questionEl.parentNode.insertBefore(container, this.elements.buttonsEl);
        return container;
    }
    
    // Create date details section
    createDateDetails() {
        const details = document.createElement('div');
        details.className = 'date-details';
        details.innerHTML = `
            <h3>Our Perfect Valentine's Date 💕</h3>
            <ul>
                <li>Romantic dinner at your favorite restaurant</li>
                <li>Moonlit walk with heartfelt conversations</li>
                <li>Special gift exchange</li>
                <li>Stargazing and dreaming about our future</li>
            </ul>
            <p><strong>Note:</strong> I know it's your dad's birthday, so we can adjust the timing! 🎂</p>
        `;
        return details;
    }
    
    // Create countdown timer
    createCountdown() {
        const countdown = document.createElement('div');
        countdown.className = 'countdown';
        countdown.innerHTML = `
            <div class="countdown-item">
                <div class="countdown-number" id="days">00</div>
                <div class="countdown-label">Days</div>
            </div>
            <div class="countdown-item">
                <div class="countdown-number" id="hours">00</div>
                <div class="countdown-label">Hours</div>
            </div>
            <div class="countdown-item">
                <div class="countdown-number" id="minutes">00</div>
                <div class="countdown-label">Mins</div>
            </div>
            <div class="countdown-item">
                <div class="countdown-number" id="seconds">00</div>
                <div class="countdown-label">Secs</div>
            </div>
        `;
        return countdown;
    }
    
    // Setup canvas
    setupCanvas() {
        this.elements.canvas.width = window.innerWidth;
        this.elements.canvas.height = window.innerHeight;
        
        window.addEventListener('resize', () => {
            this.elements.canvas.width = window.innerWidth;
            this.elements.canvas.height = window.innerHeight;
        });
    }
    
    // Setup event listeners
    setupEventListeners() {
        this.elements.yesBtn.addEventListener('click', () => this.next(true));
        this.elements.noBtn.addEventListener('click', () => this.next(false));
        this.elements.noBtn.addEventListener('mouseover', () => this.dodgeNo());
        this.elements.noBtn.addEventListener('touchstart', () => this.dodgeNo());
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                this.next(true);
            } else if (e.key === 'Escape') {
                this.next(false);
            }
        });
    }
    
    // Play audio
    playHeartbeat() {
        this.audio.heartbeat.volume = 0.3;
        this.audio.heartbeat.loop = true;
        this.audio.heartbeat.play().catch(e => console.log("Audio play failed:", e));
    }
    
    playClickSound() {
        this.audio.click.currentTime = 0;
        this.audio.click.volume = 0.2;
        this.audio.click.play().catch(e => console.log("Click sound failed"));
    }
    
    playCelebrationSound() {
        this.audio.celebration.currentTime = 0;
        this.audio.celebration.volume = 0.4;
        this.audio.celebration.play().catch(e => console.log("Celebration sound failed"));
    }
    
    // Create floating hearts
    createHeart() {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.innerHTML = '❤️';
        heart.style.left = `${Math.random() * 100}vw`;
        heart.style.animationDuration = `${Math.random() * 5 + 8}s`;
        heart.style.fontSize = `${Math.random() * 1.5 + 1.5}rem`;
        heart.style.color = `hsl(${Math.random() * 60 + 330}, 100%, 65%)`;
        
        this.elements.heartsContainer.appendChild(heart);
        
        // Remove after animation
        setTimeout(() => {
            if (heart.parentNode === this.elements.heartsContainer) {
                this.elements.heartsContainer.removeChild(heart);
            }
        }, 15000);
    }
    
    startHeartAnimation() {
        // Initial hearts
        for (let i = 0; i < 10; i++) {
            setTimeout(() => this.createHeart(), i * 200);
        }
        
        // Continuous hearts
        setInterval(() => this.createHeart(), 400);
    }
    
    // Question navigation
    next(accepted) {
        if (this.isAnimating) return;
        
        this.playClickSound();
        this.isAnimating = true;
        
        setTimeout(() => {
            this.isAnimating = false;
        }, 300);
        
        if (!accepted) {
            if (this.currentQuestion === CONFIG.questions.length - 1) {
                this.dodgeNo();
                return;
            }
        }
        
        if (this.currentQuestion < CONFIG.questions.length) {
            this.updateQuestion();
            this.updateProgressBar();
            this.currentQuestion++;
        } else {
            this.showFinal();
        }
    }
    
    updateQuestion() {
        this.elements.questionEl.textContent = CONFIG.questions[this.currentQuestion];
        this.elements.romanticTextEl.textContent = CONFIG.romanticTexts[this.currentQuestion] || CONFIG.romanticTexts[0];
        
        // Add animation
        this.elements.questionEl.style.animation = 'none';
        setTimeout(() => {
            this.elements.questionEl.style.animation = 'fadeIn 0.5s ease-out';
        }, 10);
    }
    
    updateProgressBar() {
        const progressBar = this.elements.progressContainer.querySelector('.progress-bar');
        const progress = (this.currentQuestion + 1) / (CONFIG.questions.length + 1) * 100;
        progressBar.style.width = `${progress}%`;
        
        if (!this.elements.progressContainer.style.display) {
            this.elements.progressContainer.style.display = 'block';
        }
    }
    
    showFinal() {
        this.elements.questionEl.textContent = "Aliya Alby... Would you be my Valentine? 💝";
        this.elements.romanticTextEl.textContent = "You make every day feel like Valentine's Day... 💘";
        this.updateProgressBar();
        
        this.elements.buttonsEl.innerHTML = `
            <button class="yes" id="finalYes">Yes! 😍</button>
            <button class="no" id="finalNo">No 😢</button>
        `;
        
        // Update event listeners
        document.getElementById('finalYes').addEventListener('click', () => this.yes());
        document.getElementById('finalNo').addEventListener('click', () => this.next(false));
        document.getElementById('finalNo').addEventListener('mouseover', () => this.dodgeNo());
        document.getElementById('finalNo').addEventListener('touchstart', () => this.dodgeNo());
    }
    
    dodgeNo() {
        if (this.dodgeCount >= CONFIG.maxDodges) return;
        
        const noButton = document.getElementById('finalNo') || this.elements.noBtn;
        
        if (this.dodgeCount < CONFIG.maxDodges) {
            const x = Math.random() * 300 - 150;
            const y = Math.random() * 150 - 75;
            
            noButton.style.transform = `translate(${x}px, ${y}px)`;
            this.dodgeCount++;
            
            if (this.dodgeCount === CONFIG.maxDodges) {
                this.elements.questionEl.innerHTML = "Pretty please? 🥺<br>I'll make it the most special day ever! 💖";
                noButton.textContent = "Okay, you win! 😊";
                noButton.classList.remove('no');
                noButton.classList.add('yes');
            }
        }
    }
    
    // Handle "Yes" response
    yes() {
        if (this.isYesAnswered) return;
        
        this.isYesAnswered = true;
        this.playCelebrationSound();
        
        this.elements.questionEl.innerHTML = `
            <span class='message'>
                Yayyy! You've made me the happiest person alive! 💖💖<br>
                Aliya Alby, you're my everything... <br>
                Let's make this Valentine's Day unforgettable! 🌹
            </span>
        `;
        
        this.elements.romanticTextEl.textContent = "I can't wait to create beautiful memories with you... 🌈✨";
        this.elements.buttonsEl.innerHTML = '';
        
        // Show all elements
        this.elements.gallery.style.display = 'flex';
        this.elements.bigHeart.style.display = 'block';
        this.elements.bigHeart.style.animation = 'pop 1.5s ease-out forwards';
        
        // Show date details
        this.elements.questionEl.parentNode.insertBefore(this.elements.dateDetails, this.elements.gallery);
        this.elements.dateDetails.style.display = 'block';
        
        // Show countdown
        this.elements.questionEl.parentNode.insertBefore(this.elements.countdown, this.elements.footer);
        this.elements.countdown.style.display = 'flex';
        this.startCountdown();
        
        // Launch confetti
        this.launchConfetti(CONFIG.confettiCount);
        
        // Extra hearts burst
        for (let i = 0; i < 50; i++) {
            setTimeout(() => this.createHeart(), i * 50);
        }
        
        // Animate romantic text
        this.animateRomanticText();
        
        // Start confetti animation
        this.startConfettiAnimation();
    }
    
    // Confetti system
    createParticle() {
        return {
            x: Math.random() * this.elements.canvas.width,
            y: Math.random() * this.elements.canvas.height - this.elements.canvas.height,
            size: Math.random() * 8 + 4,
            speedY: Math.random() * 5 + 2,
            speedX: Math.random() * 4 - 2,
            color: `hsl(${Math.random() * 60 + 330}, 100%, 60%)`,
            rotation: Math.random() * 360,
            rotSpeed: Math.random() * 10 - 5,
            shape: Math.random() > 0.5 ? 'circle' : 'heart',
            wobble: Math.random() * 2
        };
    }
    
    drawHeart(ctx, x, y, size, color) {
        ctx.save();
        ctx.translate(x, y);
        ctx.fillStyle = color;
        ctx.beginPath();
        const topCurveHeight = size * 0.3;
        ctx.moveTo(0, size/3);
        
        // Left top curve
        ctx.bezierCurveTo(
            0, -topCurveHeight,
            -size/2, -topCurveHeight,
            -size/2, size/3
        );
        
        // Left bottom curve
        ctx.bezierCurveTo(
            -size/2, size,
            0, size,
            0, size * 1.3
        );
        
        // Right bottom curve
        ctx.bezierCurveTo(
            0, size,
            size/2, size,
            size/2, size/3
        );
        
        // Right top curve
        ctx.bezierCurveTo(
            size/2, -topCurveHeight,
            0, -topCurveHeight,
            0, size/3
        );
        
        ctx.fill();
        ctx.restore();
    }
    
    startConfettiAnimation() {
        const animate = () => {
            this.ctx.clearRect(0, 0, this.elements.canvas.width, this.elements.canvas.height);
            
            this.particles.forEach((p, i) => {
                p.y += p.speedY;
                p.x += p.speedX + Math.sin(Date.now() * 0.001 + i) * p.wobble;
                p.rotation += p.rotSpeed;
                
                // Remove particles that are off screen
                if (p.y > this.elements.canvas.height) {
                    this.particles.splice(i, 1);
                    return;
                }
                
                this.ctx.save();
                this.ctx.translate(p.x, p.y);
                this.ctx.rotate(p.rotation * Math.PI / 180);
                
                if (p.shape === 'heart') {
                    this.drawHeart(this.ctx, 0, 0, p.size, p.color);
                } else {
                    this.ctx.fillStyle = p.color;
                    this.ctx.beginPath();
                    this.ctx.arc(0, 0, p.size, 0, Math.PI * 2);
                    this.ctx.fill();
                }
                
                this.ctx.restore();
            });
            
            this.animationId = requestAnimationFrame(animate);
        };
        
        animate();
    }
    
    launchConfetti(count) {
        for (let i = 0; i < count; i++) {
            setTimeout(() => {
                this.particles.push(this.createParticle());
            }, i * 10);
        }
    }
    
    // Animate romantic text
    animateRomanticText() {
        let textIndex = 0;
        
        setInterval(() => {
            this.elements.romanticTextEl.style.opacity = 0;
            
            setTimeout(() => {
                this.elements.romanticTextEl.textContent = CONFIG.finalTexts[textIndex];
                this.elements.romanticTextEl.style.opacity = 1;
                textIndex = (textIndex + 1) % CONFIG.finalTexts.length;
            }, 500);
        }, 3000);
    }
    
    // Countdown timer
    startCountdown() {
        // Set target date to next Valentine's Day
        const now = new Date();
        let targetYear = now.getFullYear();
        
        // If Valentine's Day has passed this year, target next year
        const valentinesDay = new Date(targetYear, 1, 14); // February 14
        if (now > valentinesDay) {
            targetYear++;
        }
        
        const targetDate = new Date(targetYear, 1, 14, 19, 0, 0); // Feb 14, 7:00 PM
        
        const updateCountdown = () => {
            const now = new Date();
            const diff = targetDate - now;
            
            if (diff <= 0) {
                // Target date reached
                document.getElementById('days').textContent = '00';
                document.getElementById('hours').textContent = '00';
                document.getElementById('minutes').textContent = '00';
                document.getElementById('seconds').textContent = '00';
                return;
            }
            
            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);
            
            document.getElementById('days').textContent = days.toString().padStart(2, '0');
            document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
            document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
            document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
            
            setTimeout(updateCountdown, 1000);
        };
        
        updateCountdown();
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const app = new ValentineApp();
    
    // Make app globally available for debugging
    window.ValentineApp = app;
});
