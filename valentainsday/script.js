// Valentine's Love Journey JavaScript - 3 Section Version
let personName = "cutie";
let currentQuestion = 0;
let noButtonInterval;

const quiz = [
  { q: "1. Who loves you the most?", a1: "Me 😌", a2: "Only me 😍" },
  { q: "2. What's my favorite nickname for you?", a1: "Baby 😘", a2: "My love" },
  { q: "3. When did you first feel something special?", a1: "First chat", a2: "When I made you smile 🥰" },
  { q: "4. One word that describes us?", a1: "Love 💕", a2: "Soulmates ❤️" },
  { q: "5. What do you miss most when I'm not around?", a1: "My voice", a2: "My hugs" },
  { q: "6. Who gets jealous more easily?", a1: "You 😏", a2: "Both equally 😉" },
  { q: "7. What changed after we met?", a1: "A little", b2: "My whole world got brighter" },
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
    personName = document.getElementById('personName').value.trim() || "cutie";
    document.getElementById('nameInputSection').style.display = 'none';
    document.getElementById('quizQuestions').style.display = 'block';
    currentQuestion = 0;
    showQuestion();
}

function showQuestion() {
    if (currentQuestion >= quiz.length) {
        showSection('calculatorSection');
        return;
    }
    
    const q = quiz[currentQuestion];
    document.getElementById('question').textContent = q.q;
    document.getElementById('btn1').textContent = q.a1;
    document.getElementById('btn2').textContent = q.a2;
    document.getElementById('questionNumber').textContent = `Question ${currentQuestion + 1}/${quiz.length}`;
    
    const progress = ((currentQuestion + 1) / quiz.length) * 100;
    document.getElementById('progressFill').style.width = progress + '%';
}

function nextQuestion() {
    currentQuestion++;
    showQuestion();
}

function calculateLove() {
    const name1 = document.getElementById('yourNameCalc').value.trim() || personName;
    const name2 = document.getElementById('partnerNameCalc').value.trim() || "My Love";
    
    // Simple love calculation algorithm
    let loveScore = Math.floor(Math.random() * 30) + 70; // 70-99%
    
    document.getElementById('lovePercentage').textContent = loveScore + '%';
    document.getElementById('meterFill').style.width = loveScore + '%';
    
    let message = "";
    if (loveScore >= 95) {
        message = "Perfect match! Made for each other! 💕";
    } else if (loveScore >= 90) {
        message = "Amazing connection! True love! 💖";
    } else if (loveScore >= 85) {
        message = "Wonderful chemistry! So sweet! 💗";
    } else if (loveScore >= 80) {
        message = "Great compatibility! Keep growing! 💞";
    } else {
        message = "Beautiful relationship! Cherish it! 💝";
    }
    
    document.getElementById('loveMessage').textContent = message;
    document.getElementById('loveResult').style.display = 'block';
}

function goToProposal() {
    showSection('proposalSection');
    document.getElementById('displayName').textContent = personName;
    startProposalAnimations();
}

function startProposalAnimations() {
    // Start dodging "No" button
    const noBtn = document.getElementById('no-btn');
    const yesBtn = document.getElementById('yes-btn');
    
    noBtn.addEventListener('mouseover', moveNoButton);
    noBtn.addEventListener('touchstart', moveNoButton);
    
    yesBtn.addEventListener('click', proposalYesClick);
}

function moveNoButton() {
    const noBtn = document.getElementById('no-btn');
    const maxX = window.innerWidth - noBtn.offsetWidth - 100;
    const maxY = window.innerHeight - noBtn.offsetHeight - 100;
    
    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY);
    
    noBtn.style.position = 'fixed';
    noBtn.style.left = randomX + 'px';
    noBtn.style.top = randomY + 'px';
}

function proposalYesClick() {
    const noBtn = document.getElementById('no-btn');
    noBtn.removeEventListener('mouseover', moveNoButton);
    noBtn.removeEventListener('touchstart', moveNoButton);
    
    // Store name in localStorage for celebration page
    localStorage.setItem('personName', personName);
    
    // Go to celebration page (not show in same page)
    window.location.href = `celebration.html?name=${encodeURIComponent(personName)}`;
}

function startCelebrationHearts() {
    setInterval(() => {
        createCelebrationHeart();
    }, 350);
}

function createCelebrationHeart() {
    const heartsContainer = document.getElementById('celebrationHearts');
    const heart = document.createElement('div');
    heart.classList.add('heart');
    heart.innerHTML = ['❤️','💕','💖','💗','💞','✨'][Math.floor(Math.random()*6)];
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.animationDuration = (Math.random() * 6 + 8) + 's';
    heart.style.animationDelay = Math.random() * 5 + 's';
    heartsContainer.appendChild(heart);
    
    setTimeout(() => heart.remove(), 18000);
}

function restartJourney() {
    // Reset everything
    currentQuestion = 0;
    personName = "cutie";
    
    // Reset quiz section
    document.getElementById('nameInputSection').style.display = 'block';
    document.getElementById('quizQuestions').style.display = 'none';
    document.getElementById('personName').value = '';
    
    // Reset calculator
    document.getElementById('yourNameCalc').value = '';
    document.getElementById('partnerNameCalc').value = '';
    document.getElementById('loveResult').style.display = 'none';
    
    // Hide celebration
    document.getElementById('celebrationScreen').style.display = 'none';
    
    // Show first section
    showSection('quizSection');
}

// Background Animations
function initBackgroundAnimations() {
    const animatedBg = document.getElementById('animatedBg');
    
    // Create glow orbs
    createGlowOrb('violet', 10, 20);
    createGlowOrb('pink', 60, 30);
    createGlowOrb('violet', 80, 60);
    
    // Create heart particles
    for (let i = 0; i < 5; i++) {
        setTimeout(() => createHeartParticle(), i * 2000);
    }
    
    // Create sparkles
    for (let i = 0; i < 8; i++) {
        setTimeout(() => createSparkle(), i * 1000);
    }
    
    // Create love wave
    createLoveWave();
}

function createGlowOrb(color, left, top) {
    const animatedBg = document.getElementById('animatedBg');
    const orb = document.createElement('div');
    orb.className = `glow-orb ${color}`;
    orb.style.left = left + '%';
    orb.style.top = top + '%';
    animatedBg.appendChild(orb);
}

function createHeartParticle() {
    const animatedBg = document.getElementById('animatedBg');
    const heart = document.createElement('div');
    heart.className = 'heart-particle';
    heart.style.left = Math.random() * 100 + '%';
    heart.style.animationDelay = Math.random() * 5 + 's';
    heart.style.animationDuration = (15 + Math.random() * 10) + 's';
    animatedBg.appendChild(heart);
    
    setTimeout(() => {
        heart.remove();
        createHeartParticle();
    }, 25000);
}

function createSparkle() {
    const animatedBg = document.getElementById('animatedBg');
    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle';
    sparkle.style.left = Math.random() * 100 + '%';
    sparkle.style.top = Math.random() * 100 + '%';
    sparkle.style.animationDelay = Math.random() * 3 + 's';
    animatedBg.appendChild(sparkle);
    
    setTimeout(() => {
        sparkle.remove();
        createSparkle();
    }, 6000);
}

function createLoveWave() {
    const animatedBg = document.getElementById('animatedBg');
    const wave = document.createElement('div');
    wave.className = 'love-wave';
    animatedBg.appendChild(wave);
}

// Floating hearts
function createFloatingHearts() {
    setInterval(() => {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        heart.innerHTML = ['❤️','💕','💖','💗','💞'][Math.floor(Math.random()*5)];
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.animationDuration = (Math.random() * 8 + 8) + 's';
        heart.style.opacity = Math.random() * 0.5 + 0.4;
        document.getElementById('hearts').appendChild(heart);
        
        setTimeout(() => heart.remove(), 15000);
    }, 2000);
}

// Initialize everything when page loads
document.addEventListener('DOMContentLoaded', function() {
    initBackgroundAnimations();
    createFloatingHearts();
    
    // Add enter key support
    document.getElementById('personName').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            startQuiz();
        }
    });
    
    const calcInputs = ['yourNameCalc', 'partnerNameCalc'];
    calcInputs.forEach(id => {
        const input = document.getElementById(id);
        if (input) {
            input.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    calculateLove();
                }
            });
        }
    });
});
