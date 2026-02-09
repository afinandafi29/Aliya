// Valentine's Love Journey JavaScript
let personName = "cutie";
let step = 0;
let noButtonInterval;
let animationInterval;

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

function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    document.getElementById(screenId).classList.add('active');
}

function startLoveStory() {
    personName = document.getElementById("personName").value.trim() || "cutie";
    showScreen('quizScreen');
    loadQuestion();
    createFloatingHearts();
}

function loadQuestion() {
    document.getElementById("question").textContent = quiz[step].q;
    document.getElementById("btn1").textContent = quiz[step].a1;
    document.getElementById("btn2").textContent = quiz[step].a2;
    
    const progress = ((step + 1) / quiz.length) * 100;
    document.getElementById('progressFill').style.width = progress + '%';
    document.getElementById('questionNumber').textContent = `Question ${step + 1}/${quiz.length}`;
}

function nextQuestion() {
    step++;
    if (step < quiz.length) {
        loadQuestion();
    } else {
        showScreen('calculatorScreen');
        document.getElementById('yourNameCalc').value = personName;
    }
}

function calculateLove() {
    const name1 = document.getElementById('yourNameCalc').value.trim();
    const name2 = document.getElementById('partnerNameCalc').value.trim();
    
    if (!name1 || !name2) {
        showNotification('Please enter both names 💕');
        return;
    }
    
    const loveScore = calculateLoveScore(name1, name2);
    const loveMessage = getLoveMessage(loveScore);
    
    document.getElementById('lovePercentage').textContent = loveScore + '%';
    document.getElementById('loveMessage').textContent = loveMessage;
    document.getElementById('meterFill').style.width = loveScore + '%';
    document.getElementById('loveResult').style.display = 'block';
    
    if (loveScore > 80) {
        createCelebrationHearts();
    }
}

function calculateLoveScore(name1, name2) {
    let score = 0;
    const combined = (name1 + name2).toLowerCase();
    
    for (let i = 0; i < combined.length; i++) {
        score += combined.charCodeAt(i);
    }
    
    score = (score % 100) + 50;
    return Math.min(score, 99);
}

function getLoveMessage(score) {
    if (score >= 90) return "Perfect Match! Made for each other! 💕";
    if (score >= 80) return "Amazing Connection! True love! 💖";
    if (score >= 70) return "Great Chemistry! Keep growing! 💝";
    if (score >= 60) return "Good Potential! Work on it! 💌";
    if (score >= 50) return "Interesting Match! Explore more! 💕";
    return "Unique Connection! Every love is special! ✨";
}

function goToProposal() {
    showScreen('proposalScreen');
    document.getElementById('displayName').textContent = personName;
    startProposalNoButtonMovement();
}

function startProposalNoButtonMovement() {
    const noBtn = document.getElementById("noBtn");
    const card = document.querySelector("#proposalScreen .card");

    function randomMove() {
        const maxX = card.clientWidth - noBtn.offsetWidth;
        const maxY = card.clientHeight - noBtn.offsetHeight;

        const x = Math.random() * maxX;
        const y = Math.random() * maxY;

        noBtn.style.left = x + "px";
        noBtn.style.top = y + "px";
    }

    setInterval(randomMove, 700);
}

function yesClick() {
    document.body.innerHTML = `
        <div style="
          display:flex;
          flex-direction:column;
          justify-content:center;
          align-items:center;
          height:100vh;
          background:#ff9a9e;
          color:white;
          text-align:center;
          padding:20px;
        ">
          <h1>💖 Yayyy ${personName}! I knew it 😍💖</h1>
          <img
            src="https://media.giphy.com/media/3oriO0OEd9QIDdllqo/giphy.gif"
            style="width:250px; margin-top:20px; border-radius:20px;"
          >
        </div>
      `;
}

function restartJourney() {
    step = 0;
    personName = "cutie";
    
    if (noButtonInterval) {
        clearInterval(noButtonInterval);
    }
    
    document.getElementById('personName').value = '';
    document.getElementById('yourNameCalc').value = '';
    document.getElementById('partnerNameCalc').value = '';
    
    document.getElementById('loveResult').style.display = 'none';
    document.getElementById('final-yes').style.display = 'none';
    
    showScreen('welcomeScreen');
}

function createFloatingHearts() {
    setInterval(() => createHeart(), 800);
}

function createHeart() {
    const heart = document.createElement("div");
    heart.className = "heart";
    heart.innerHTML = Math.random() > 0.5 ? "💗" : "💖";
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.animationDuration = (Math.random() * 8 + 8) + "s";
    heart.style.fontSize = (Math.random() * 16 + 16) + "px";
    document.getElementById("hearts").appendChild(heart);
    setTimeout(() => heart.remove(), 15000);
}

function createCelebrationHearts() {
    for (let i = 0; i < 15; i++) {
        setTimeout(() => createHeart(), i * 200);
    }
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: linear-gradient(135deg, #8B5CF6, #EC4899);
        color: white;
        padding: 15px 25px;
        border-radius: 25px;
        font-size: 16px;
        font-weight: 600;
        pointer-events: none;
        z-index: 10000;
        box-shadow: 0 8px 25px rgba(139, 92, 246, 0.3);
        animation: slideDown 0.5s ease-out;
    `;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideUp 0.5s ease-out reverse';
        setTimeout(() => notification.remove(), 500);
    }, 3000);
}

const style = document.createElement('style');
style.textContent = `
    @keyframes slideDown {
        from {
            opacity: 0;
            transform: translate(-50%, -20px);
        }
        to {
            opacity: 1;
            transform: translate(-50%, 0);
        }
    }
    
    @keyframes slideUp {
        from {
            opacity: 1;
            transform: translate(-50%, 0);
        }
        to {
            opacity: 0;
            transform: translate(-50%, -20px);
        }
    }
`;
document.head.appendChild(style);

document.addEventListener('DOMContentLoaded', function() {
    initBackgroundAnimations();
    createFloatingHearts();
    
    // Add enter key support for name input
    document.getElementById('personName').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            startLoveStory();
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

// Simple Valentine Card Functions
let simpleNoButtonInterval;

function goToSimpleValentine() {
    showScreen('simpleValentineScreen');
    document.getElementById('simpleName').textContent = personName;
    startSimpleFloatingHearts();
    startSimpleNoButtonMovement();
}

function startSimpleFloatingHearts() {
    setInterval(() => createSimpleHeart(), 400);
}

function createSimpleHeart() {
    const heart = document.createElement('div');
    heart.classList.add('heart');
    heart.innerHTML = ['❤️','💕','💖','💗','💞'][Math.floor(Math.random()*5)];
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.animationDuration = (Math.random() * 8 + 8) + 's';
    heart.style.opacity = Math.random() * 0.5 + 0.4;
    document.getElementById('simpleHearts').appendChild(heart);
    
    setTimeout(() => heart.remove(), 15000);
}

function startSimpleNoButtonMovement() {
    const noBtn = document.getElementById('simpleNoBtn');
    const card = document.getElementById('simpleCard');
    
    if (!card || !noBtn) return;
    
    function moveSimpleNoButton() {
        const maxX = card.clientWidth - noBtn.offsetWidth - 40;
        const maxY = card.clientHeight - noBtn.offsetHeight - 40;
        
        const x = Math.random() * maxX;
        const y = Math.random() * maxY;

        noBtn.style.position = 'absolute';
        noBtn.style.left = x + 'px';
        noBtn.style.top = y + 'px';
    }
    
    noBtn.addEventListener('mouseover', moveSimpleNoButton);
    noBtn.addEventListener('touchstart', moveSimpleNoButton);
}

function simpleYesClick() {
    const noBtn = document.getElementById('simpleNoBtn');
    noBtn.removeEventListener('mouseover', moveSimpleNoButton);
    noBtn.removeEventListener('touchstart', moveSimpleNoButton);
    
    document.getElementById('simpleCard').style.display = 'none';
    document.getElementById('simpleSuccess').style.display = 'flex';
    document.getElementById('simpleSuccessName').textContent = personName;
    
    for (let i = 0; i < 20; i++) {
        setTimeout(() => createSimpleHeart(), i * 100);
    }
}

// Enhanced Background Animations
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
    
    // Remove and recreate after animation
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
    
    // Remove and recreate after animation
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
