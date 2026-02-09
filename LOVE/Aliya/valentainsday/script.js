/**
 * Valentine's Love Journey - Interactive Valentine's Day Experience
 * Version: 2.0.0
 * Description: A romantic journey with quiz, love calculator, and proposal
 * 
 * @author Valentine Developer
 * @license MIT
 */

// Performance and Error Monitoring
const PerformanceMonitor = {
    startTime: Date.now(),
    errors: [],
    interactions: [],
    
    trackError(error, context = '') {
        this.errors.push({
            timestamp: Date.now(),
            error: error.message || error,
            stack: error.stack,
            context: context,
            userAgent: navigator.userAgent,
            url: window.location.href
        });
        console.error('Performance Monitor Error:', error, context);
    },
    
    trackInteraction(action, details = {}) {
        this.interactions.push({
            timestamp: Date.now(),
            action,
            details,
            timeOnPage: Date.now() - this.startTime
        });
    },
    
    getMetrics() {
        return {
            totalTime: Date.now() - this.startTime,
            errors: this.errors.length,
            interactions: this.interactions.length,
            memoryUsage: performance.memory ? {
                used: Math.round(performance.memory.usedJSHeapSize / 1024 / 1024) + 'MB',
                total: Math.round(performance.memory.totalJSHeapSize / 1024 / 1024) + 'MB'
            } : 'Not available'
        };
    }
};

// Import configuration
// Note: In production, this would be bundled properly
const CONFIG = window.APP_CONFIG || {
    MAX_X_OFFSET: 100,
    MAX_Y_OFFSET: 100,
    HEART_INTERVAL: 2000,
    CELEBRATION_HEART_INTERVAL: 350,
    HEART_LIFETIME: 15000,
    CELEBRATION_HEART_LIFETIME: 18000,
    SPARKLE_INTERVAL: 1000,
    SPARKLE_LIFETIME: 6000,
    HEART_PARTICLE_INTERVAL: 2000,
    HEART_PARTICLE_LIFETIME: 25000,
    MIN_LOVE_SCORE: 70,
    MAX_LOVE_SCORE: 99,
    HEART_EMOJIS: ['❤️','💕','💖','💗','💞'],
    CELEBRATION_EMOJIS: ['❤️','💕','💖','💗','💞','✨']
};

// Production mode detection
const IS_PRODUCTION = window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1';

// Production logging utility
const Logger = {
    log: function(...args) {
        if (!IS_PRODUCTION) {
            console.log(...args);
        }
    },
    error: function(...args) {
        if (!IS_PRODUCTION) {
            console.error(...args);
        }
    },
    warn: function(...args) {
        if (!IS_PRODUCTION) {
            console.warn(...args);
        }
    }
};

/**
 * Global state management for the Valentine application
 * @namespace AppState
 */
/** @type {string} Current user's name */
let personName = "cutie";
/** @type {number} Current question index in quiz */
let currentQuestion = 0;
/** @type {number|null} Interval ID for no button movement */
let noButtonInterval = null;
/** @type {number|null} Interval ID for floating hearts animation */
let floatingHeartsInterval = null;
/** @type {number|null} Interval ID for celebration hearts animation */
let celebrationHeartsInterval = null;
/** @type {number[]} Array of sparkle animation timeouts */
let sparkleIntervals = [];
/** @type {number[]} Array of heart particle animation timeouts */
let heartParticleIntervals = [];

/**
 * Cached DOM elements for performance optimization
 * @namespace DOMCache
 */
const domCache = {};

function cacheDOMElements() {
    // Cache all DOM elements with null checks
    domCache.personNameInput = document.getElementById('personName');
    domCache.nameInputSection = document.getElementById('nameInputSection');
    domCache.quizQuestions = document.getElementById('quizQuestions');
    domCache.question = document.getElementById('question');
    domCache.btn1 = document.getElementById('btn1');
    domCache.btn2 = document.getElementById('btn2');
    domCache.questionNumber = document.getElementById('questionNumber');
    domCache.progressFill = document.getElementById('progressFill');
    domCache.yourNameCalc = document.getElementById('yourNameCalc');
    domCache.partnerNameCalc = document.getElementById('partnerNameCalc');
    domCache.loveResult = document.getElementById('loveResult');
    domCache.lovePercentage = document.getElementById('lovePercentage');
    domCache.loveMessage = document.getElementById('loveMessage');
    domCache.meterFill = document.getElementById('meterFill');
    domCache.displayName = document.getElementById('displayName');
    domCache.noBtn = document.getElementById('no-btn');
    domCache.yesBtn = document.getElementById('yes-btn');
    domCache.celebrationScreen = document.getElementById('celebrationScreen');
    domCache.finalName = document.getElementById('finalName');
    domCache.hearts = document.getElementById('hearts');
    domCache.animatedBg = document.getElementById('animatedBg');
    domCache.celebrationHearts = document.getElementById('celebrationHearts');
    
    // Cache sections for performance
    domCache.sections = document.querySelectorAll('.section');
}

/**
 * Quiz questions data structure
 * @typedef {Object} QuizQuestion
 * @property {string} q - The question text
 * @property {string} a1 - First answer option
 * @property {string} a2 - Second answer option
 */

/** @type {QuizQuestion[]} Array of quiz questions */
const quiz = [
  { q: "1. Who loves you the most?", a1: "Me 😌", a2: "Only me 😍" },
  { q: "2. What's my favorite nickname for you?", a1: "Baby 😘", a2: "My love" },
  { q: "3. When did you first feel something special?", a1: "First chat", a2: "When I made you smile 🥰" },
  { q: "4. One word that describes us?", a1: "Love 💕", a2: "Soulmates ❤️" },
  { q: "5. What do you miss most when I'm not around?", a1: "My voice", a2: "My hugs" },
  { q: "6. Who gets jealous more easily?", a1: "You 😏", a2: "Both equally 😉" },
  { q: "7. What changed after we met?", a1: "A little", a2: "My whole world got brighter" },
  { q: "8. Our love feels like…?", a1: "A fairytale", a2: "Home 🏡❤️" },
  { q: "9. If I'm sad, you will…?", a1: "Give me space", a2: "Hug me tight" },
  { q: "10. When life gets hard, we…?", a1: "Survive somehow", a2: "Hold each other stronger" },
  { q: "11. Our future looks like…?", a1: "Maybe", a2: "Together forever 💍" },
  { q: "12. Your favorite thing about me is…?", a1: "My smile", a2: "The way I care" },
  { q: "13. Do you believe in soulmates?", a1: "Kinda", a2: "Yes — and you're mine" },
  { q: "14. Can I steal your last name someday?", a1: "Maybe…", a2: "Yes please 💒" },
  { q: "15. Will you be mine forever?", a1: "Yes 🤞", a2: "Always & forever ❤️" },
  { q: "16. My good morning texts make you…?", a1: "Smile", a2: "Blush 😳" },
  { q: "17. Our perfect song would be…?", a1: "Romantic", a2: "Cheesy & cute" },
  { q: "18. You look cutest when…?", a1: "Sleeping", a2: "Laughing" },
  { q: "19. How much do I love you?", a1: "A lot", a2: "More than words" },
  { q: "20. Ready to be my Valentine?", a1: "Yes 💖", a2: "Forever yes 💍" }
];

function showSection(sectionId) {
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById(sectionId).classList.add('active');
}

function startQuiz() {
    try {
        PerformanceMonitor.trackInteraction('quiz_start', { step: 'name_input' });
        
        if (!domCache.personNameInput) {
            const error = new Error('Name input element not found');
            PerformanceMonitor.trackError(error, 'startQuiz');
            return;
        }
        
        const nameInput = domCache.personNameInput.value.trim();
        if (!validateInput(nameInput, 2, 30)) {
            showError(domCache.personNameInput, 'Please enter a valid name (2-30 characters) 💕');
            PerformanceMonitor.trackInteraction('validation_error', { type: 'name_too_short' });
            return;
        }
        
        personName = sanitizeInput(nameInput);
        if (domCache.nameInputSection) {
            domCache.nameInputSection.style.display = 'none';
        }
        if (domCache.quizQuestions) {
            domCache.quizQuestions.style.display = 'block';
        }
        currentQuestion = 0;
        showQuestion();
        
        PerformanceMonitor.trackInteraction('quiz_started', { nameLength: nameInput.length });
    } catch (error) {
        PerformanceMonitor.trackError(error, 'startQuiz');
        Logger.error('Error starting quiz:', error);
        showError(domCache.personNameInput, 'Something went wrong. Please try again.');
    }
}

function showQuestion() {
    if (currentQuestion >= quiz.length) {
        showSection('calculatorSection');
        return;
    }
    
    const q = quiz[currentQuestion];
    if (!q || !q.q || !q.a1 || !q.a2) {
        Logger.error('Invalid quiz data at question', currentQuestion);
        currentQuestion++;
        showQuestion();
        return;
    }
    
    domCache.question.textContent = q.q;
    domCache.btn1.textContent = q.a1;
    domCache.btn2.textContent = q.a2;
    domCache.questionNumber.textContent = `Question ${currentQuestion + 1}/${quiz.length}`;
    
    const progress = ((currentQuestion + 1) / quiz.length) * 100;
    domCache.progressFill.style.width = progress + '%';
}

function nextQuestion() {
    currentQuestion++;
    showQuestion();
}

function calculateLove() {
    try {
        if (!domCache.yourNameCalc || !domCache.partnerNameCalc) {
            Logger.error('Calculator input elements not found');
            return;
        }
        
        const name1 = sanitizeInput(domCache.yourNameCalc.value.trim() || personName);
        const name2 = sanitizeInput(domCache.partnerNameCalc.value.trim() || "My Love");
        
        if (!validateInput(name1, 2, 30) || !validateInput(name2, 2, 30)) {
            showError(domCache.yourNameCalc, 'Please enter valid names (2-30 characters each) 💕');
            return;
        }
        
        // Enhanced love calculation with seed for consistency
        const seed = name1.toLowerCase() + name2.toLowerCase();
        let hash = 0;
        for (let i = 0; i < seed.length; i++) {
            hash = ((hash << 5) - hash) + seed.charCodeAt(i);
            hash = hash & hash;
        }
        const loveScore = Math.abs(hash % (CONFIG.MAX_LOVE_SCORE - CONFIG.MIN_LOVE_SCORE + 1)) + CONFIG.MIN_LOVE_SCORE;
        
        if (domCache.lovePercentage) {
            domCache.lovePercentage.textContent = loveScore + '%';
        }
        if (domCache.meterFill) {
            domCache.meterFill.style.width = loveScore + '%';
        }
        
        let message = getLoveMessage(loveScore);
        if (domCache.loveMessage) {
            domCache.loveMessage.textContent = message;
        }
        if (domCache.loveResult) {
            domCache.loveResult.style.display = 'block';
        }
    } catch (error) {
        Logger.error('Error calculating love:', error);
        if (domCache.yourNameCalc) {
            showError(domCache.yourNameCalc, 'Calculation failed. Please try again.');
        }
    }
}

function goToProposal() {
    showSection('proposalSection');
    domCache.displayName.textContent = personName;
    startProposalAnimations();
}

function startProposalAnimations() {
    // Start dodging "No" button with standardized pointer events
    if (domCache.noBtn) {
        domCache.noBtn.addEventListener('pointerenter', moveNoButton);
        domCache.noBtn.addEventListener('pointerover', moveNoButton);
    }
    
    if (domCache.yesBtn) {
        domCache.yesBtn.addEventListener('click', proposalYesClick);
        domCache.yesBtn.addEventListener('keypress', handleYesKeyPress);
    }
}

function moveNoButton() {
    const container = domCache.noBtn.parentElement;
    const containerRect = container.getBoundingClientRect();
    const buttonRect = domCache.noBtn.getBoundingClientRect();
    
    // Calculate safe boundaries within container
    const maxX = containerRect.width - buttonRect.width - 20;
    const maxY = containerRect.height - buttonRect.height - 20;
    
    // Only move if there's enough space
    if (maxX > 0 && maxY > 0) {
        const randomX = Math.floor(Math.random() * maxX);
        const randomY = Math.floor(Math.random() * maxY);
        
        // Use transform for smooth animation
        domCache.noBtn.style.transform = `translate(${randomX}px, ${randomY}px)`;
        domCache.noBtn.style.transition = 'transform 0.3s ease-out';
    }
}

function proposalYesClick() {
    try {
        PerformanceMonitor.trackInteraction('proposal_accepted', { name: personName });
        
        // Remove all event listeners properly
        if (domCache.noBtn) {
            domCache.noBtn.removeEventListener('mouseover', moveNoButton);
            domCache.noBtn.removeEventListener('touchstart', moveNoButton);
            domCache.noBtn.removeEventListener('pointerenter', moveNoButton);
        }
        
        // Store name in localStorage for celebration page
        localStorage.setItem('personName', personName);
        
        // Show celebration screen in same page
        showCelebration();
        
        PerformanceMonitor.trackInteraction('celebration_shown', { timeToComplete: Date.now() - PerformanceMonitor.startTime });
    } catch (error) {
        PerformanceMonitor.trackError(error, 'proposalYesClick');
        Logger.error('Error in proposal acceptance:', error);
    }
}

// Enhanced Utility Functions
function sanitizeInput(input) {
    if (typeof input !== 'string') return '';
    return input
        .replace(/<[^>]*>/g, '') // Remove HTML tags
        .replace(/["'&<>]/g, '') // Remove dangerous characters
        .trim()
        .substring(0, 50); // Limit length
}

function showError(inputElement, message) {
    if (!inputElement || !inputElement.parentElement) return;
    
    try {
        const existingError = inputElement.parentElement.querySelector('.error-message');
        if (existingError) existingError.remove();
        
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        errorDiv.style.cssText = 'color: #DC2626; font-size: 0.9rem; margin-top: 0.5rem; animation: slideIn 0.3s ease-out';
        
        inputElement.parentElement.appendChild(errorDiv);
        inputElement.focus();
        
        setTimeout(() => {
            if (errorDiv.parentNode) {
                errorDiv.remove();
            }
        }, 3000);
    } catch (error) {
        Logger.error('Error showing error message:', error);
    }
}

function validateInput(input, minLength = 1, maxLength = 50) {
    if (!input || typeof input !== 'string') return false;
    const trimmed = input.trim();
    return trimmed.length >= minLength && trimmed.length <= maxLength;
}

function getLoveMessage(score) {
    if (score >= 95) return "Perfect match! Made for each other! 💕";
    if (score >= 90) return "Amazing connection! True love! 💖";
    if (score >= 85) return "Wonderful chemistry! So sweet! 💗";
    if (score >= 80) return "Great compatibility! Keep growing! 💞";
    return "Beautiful relationship! Cherish it! 💝";
}

function handleYesKeyPress(e) {
    if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        proposalYesClick();
    }
}

function showCelebration() {
    // Hide all sections
    if (domCache.sections) {
        domCache.sections.forEach(section => {
            section.classList.remove('active');
        });
    } else {
        document.querySelectorAll('.section').forEach(section => {
            section.classList.remove('active');
        });
    }
    
    // Show celebration screen
    if (domCache.celebrationScreen) {
        domCache.celebrationScreen.style.display = 'block';
        if (domCache.finalName) {
            domCache.finalName.textContent = personName;
        }
    }
    
    // Start celebration hearts animation
    if (!celebrationHeartsInterval) {
        celebrationHeartsInterval = setInterval(() => {
            createCelebrationHeart();
        }, CONFIG.CELEBRATION_HEART_INTERVAL);
    }
}

function createCelebrationHeart() {
    if (!domCache.celebrationHearts) return;
    
    const heart = document.createElement('div');
    heart.classList.add('heart');
    heart.innerHTML = CONFIG.CELEBRATION_EMOJIS[Math.floor(Math.random() * CONFIG.CELEBRATION_EMOJIS.length)];
    heart.style.cssText = `
        left: ${Math.random() * 100}vw;
        animation-duration: ${Math.random() * 6 + 8}s;
        animation-delay: ${Math.random() * 5}s;
    `;
    domCache.celebrationHearts.appendChild(heart);
    
    setTimeout(() => heart.remove(), CONFIG.CELEBRATION_HEART_LIFETIME);
}

function restartJourney() {
    try {
        // Clear all intervals
        clearAllIntervals();
        
        // Reset state
        currentQuestion = 0;
        personName = "cutie";
        
        // Reset quiz section with null checks
        if (domCache.nameInputSection) {
            domCache.nameInputSection.style.display = 'block';
        }
        if (domCache.quizQuestions) {
            domCache.quizQuestions.style.display = 'none';
        }
        if (domCache.personNameInput) {
            domCache.personNameInput.value = '';
        }
        
        // Reset calculator with null checks
        if (domCache.yourNameCalc) {
            domCache.yourNameCalc.value = '';
        }
        if (domCache.partnerNameCalc) {
            domCache.partnerNameCalc.value = '';
        }
        if (domCache.loveResult) {
            domCache.loveResult.style.display = 'none';
        }
        
        // Hide celebration
        if (domCache.celebrationScreen) {
            domCache.celebrationScreen.style.display = 'none';
        }
        
        // Show first section
        showSection('quizSection');
        
        // Restart animations
        initBackgroundAnimations();
        createFloatingHearts();
    } catch (error) {
        Logger.error('Error restarting journey:', error);
        // Fallback: reload page if restart fails
        window.location.reload();
    }
}

function clearAllIntervals() {
    // Clear all tracked intervals with null checks
    if (floatingHeartsInterval) {
        clearInterval(floatingHeartsInterval);
        floatingHeartsInterval = null;
    }
    
    if (celebrationHeartsInterval) {
        clearInterval(celebrationHeartsInterval);
        celebrationHeartsInterval = null;
    }
    
    if (noButtonInterval) {
        clearInterval(noButtonInterval);
        noButtonInterval = null;
    }
    
    // Clear array-based intervals
    if (sparkleIntervals && Array.isArray(sparkleIntervals)) {
        sparkleIntervals.forEach(interval => {
            if (interval) clearInterval(interval);
        });
        sparkleIntervals = [];
    }
    
    if (heartParticleIntervals && Array.isArray(heartParticleIntervals)) {
        heartParticleIntervals.forEach(interval => {
            if (interval) clearInterval(interval);
        });
        heartParticleIntervals = [];
    }
}

// Enhanced Background Animations with error handling
function initBackgroundAnimations() {
    if (!domCache.animatedBg) return;
    
    try {
        // Clear existing animations
        const existingElements = domCache.animatedBg.querySelectorAll('.glow-orb, .heart-particle, .sparkle, .love-wave');
        existingElements.forEach(el => el.remove());
        
        // Create glow orbs
        createGlowOrb('violet', 10, 20);
        createGlowOrb('pink', 60, 30);
        createGlowOrb('violet', 80, 60);
        
        // Create heart particles with staggered timing
        for (let i = 0; i < 5; i++) {
            const timeout = setTimeout(() => {
                createHeartParticle();
            }, i * CONFIG.HEART_PARTICLE_INTERVAL);
            heartParticleIntervals.push(timeout);
        }
        
        // Create sparkles with staggered timing
        for (let i = 0; i < 8; i++) {
            const timeout = setTimeout(() => {
                createSparkle();
            }, i * CONFIG.SPARKLE_INTERVAL);
            sparkleIntervals.push(timeout);
        }
        
        // Create love wave
        createLoveWave();
    } catch (error) {
        Logger.error('Background animation error:', error);
    }
}

function createGlowOrb(color, left, top) {
    if (!domCache.animatedBg) return;
    
    const orb = document.createElement('div');
    orb.className = `glow-orb ${color}`;
    orb.style.cssText = `left: ${left}%; top: ${top}%;`;
    domCache.animatedBg.appendChild(orb);
}

function createHeartParticle() {
    if (!domCache.animatedBg) return;
    
    const heart = document.createElement('div');
    heart.className = 'heart-particle';
    heart.style.cssText = `
        left: ${Math.random() * 100}%;
        animation-delay: ${Math.random() * 5}s;
        animation-duration: ${15 + Math.random() * 10}s;
    `;
    domCache.animatedBg.appendChild(heart);
    
    const interval = setTimeout(() => {
        heart.remove();
        createHeartParticle();
    }, CONFIG.HEART_PARTICLE_LIFETIME);
    
    heartParticleIntervals.push(interval);
}

function createSparkle() {
    if (!domCache.animatedBg) return;
    
    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle';
    sparkle.style.cssText = `
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        animation-delay: ${Math.random() * 3}s;
    `;
    domCache.animatedBg.appendChild(sparkle);
    
    const interval = setTimeout(() => {
        sparkle.remove();
        createSparkle();
    }, CONFIG.SPARKLE_LIFETIME);
    
    sparkleIntervals.push(interval);
}

function createLoveWave() {
    if (!domCache.animatedBg) return;
    
    const wave = document.createElement('div');
    wave.className = 'love-wave';
    domCache.animatedBg.appendChild(wave);
}

// Enhanced Floating Hearts with performance optimization
function createFloatingHearts() {
    if (!domCache.hearts) return;
    
    // Clear existing interval
    if (floatingHeartsInterval) {
        clearInterval(floatingHeartsInterval);
        floatingHeartsInterval = null;
    }
    
    // Limit maximum hearts to prevent performance issues
    const maxHearts = 10;
    let heartCount = 0;
    
    floatingHeartsInterval = setInterval(() => {
        try {
            // Clean up old hearts
            const existingHearts = domCache.hearts.querySelectorAll('.heart');
            if (existingHearts.length >= maxHearts) {
                existingHearts[0].remove();
            }
            
            const heart = document.createElement('div');
            heart.classList.add('heart');
            heart.innerHTML = CONFIG.HEART_EMOJIS[Math.floor(Math.random() * CONFIG.HEART_EMOJIS.length)];
            heart.style.cssText = `
                left: ${Math.random() * 100}vw;
                animation-duration: ${Math.random() * 8 + 8}s;
                opacity: ${Math.random() * 0.5 + 0.4};
                pointer-events: none;
            `;
            domCache.hearts.appendChild(heart);
            
            // Remove heart after animation
            setTimeout(() => {
                if (heart.parentNode) {
                    heart.remove();
                }
            }, CONFIG.HEART_LIFETIME);
            
            heartCount++;
        } catch (error) {
            Logger.error('Error creating floating heart:', error);
        }
    }, CONFIG.HEART_INTERVAL);
}

// Enhanced Initialization with global error handling
function initializeApp() {
    try {
        PerformanceMonitor.trackInteraction('app_initialization_start');
        
        // Cache DOM elements
        cacheDOMElements();
        
        // Initialize animations
        initBackgroundAnimations();
        createFloatingHearts();
        
        // Add enter key support with null checks
        if (domCache.personNameInput) {
            domCache.personNameInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    startQuiz();
                }
            });
        }
        
        const calcInputs = ['yourNameCalc', 'partnerNameCalc'];
        calcInputs.forEach(id => {
            const input = domCache[id];
            if (input) {
                input.addEventListener('keypress', function(e) {
                    if (e.key === 'Enter') {
                        calculateLove();
                    }
                });
            }
        });
        
        // Add keyboard navigation for quiz buttons
        if (domCache.btn1 && domCache.btn2) {
            [domCache.btn1, domCache.btn2].forEach(btn => {
                btn.addEventListener('keypress', function(e) {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        nextQuestion();
                    }
                });
            });
        }
        
        PerformanceMonitor.trackInteraction('app_initialization_complete');
        Logger.log('Valentine app initialized successfully');
        Logger.log('Performance Metrics:', PerformanceMonitor.getMetrics());
    } catch (error) {
        PerformanceMonitor.trackError(error, 'initializeApp');
        Logger.error('Initialization error:', error);
        // Show user-friendly error message
        document.body.innerHTML = `
            <div style="text-align: center; padding: 50px; font-family: Arial, sans-serif;">
                <h2>💕 Oops! Something went wrong</h2>
                <p>Please refresh the page to try again.</p>
                <button onclick="window.location.reload()" style="padding: 10px 20px; background: #EC4899; color: white; border: none; border-radius: 5px; cursor: pointer;">Refresh</button>
            </div>
        `;
    }
}

// Global error handlers
window.addEventListener('error', function(event) {
    PerformanceMonitor.trackError(event.error, 'global_error');
    Logger.error('Global error:', event.error);
});

window.addEventListener('unhandledrejection', function(event) {
    PerformanceMonitor.trackError(event.reason, 'unhandled_promise_rejection');
    Logger.error('Unhandled promise rejection:', event.reason);
});

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', initializeApp);

// Cleanup on page unload
window.addEventListener('beforeunload', function() {
    clearAllIntervals();
});
