/**
 * Configuration file for Valentine's Love Journey
 * Centralized settings for easy customization
 */

// Application Configuration
const APP_CONFIG = {
    // Application metadata
    APP_NAME: 'Valentine\'s Love Journey',
    VERSION: '2.0.0',
    AUTHOR: 'Valentine Developer',
    
    // Animation settings
    ANIMATION: {
        HEART_INTERVAL: 2000,
        CELEBRATION_HEART_INTERVAL: 350,
        HEART_LIFETIME: 15000,
        CELEBRATION_HEART_LIFETIME: 18000,
        SPARKLE_INTERVAL: 1000,
        SPARKLE_LIFETIME: 6000,
        HEART_PARTICLE_INTERVAL: 2000,
        HEART_PARTICLE_LIFETIME: 25000,
        MAX_FLOATING_HEARTS: 10,
        MAX_GLOW_ORBS: 3,
        MAX_SPARKLES: 8
    },
    
    // Love calculator settings
    LOVE_CALCULATOR: {
        MIN_SCORE: 70,
        MAX_SCORE: 99,
        SCORE_MESSAGES: {
            95: "Perfect match! Made for each other! 💕",
            90: "Amazing connection! True love! 💖",
            85: "Wonderful chemistry! So sweet! 💗",
            80: "Great compatibility! Keep growing! 💞",
            0: "Beautiful relationship! Cherish it! 💝"
        }
    },
    
    // UI settings
    UI: {
        MAX_NAME_LENGTH: 30,
        MIN_NAME_LENGTH: 2,
        MAX_INPUT_LENGTH: 50,
        ERROR_MESSAGE_DURATION: 3000,
        BUTTON_DEBOUNCE_TIME: 300
    },
    
    // Visual settings
    VISUAL: {
        HEART_EMOJIS: ['❤️','💕','💖','💗','💞'],
        CELEBRATION_EMOJIS: ['❤️','💕','💖','💗','💞','✨'],
        COLORS: {
            PRIMARY_VIOLET: '#8B5CF6',
            HOT_PINK: '#EC4899',
            RED_LOVE: '#DC2626',
            SOFT_PINK: '#FDF2F8'
        }
    },
    
    // Mobile settings
    MOBILE: {
        BREAKPOINT_SMALL: 480,
        BREAKPOINT_MEDIUM: 768,
        MIN_TOUCH_TARGET: 44,
        BUTTON_MAX_WIDTH: 200
    },
    
    // Performance settings
    PERFORMANCE: {
        ENABLE_ANIMATIONS: true,
        REDUCE_MOTION: false,
        MAX_DOM_UPDATES_PER_FRAME: 5,
        ANIMATION_FRAME_RATE: 60
    },
    
    // Security settings
    SECURITY: {
        ENABLE_INPUT_SANITIZATION: true,
        ALLOWED_HTML_TAGS: [],
        MAX_INPUT_ATTEMPTS: 3
    },
    
    // Accessibility settings
    ACCESSIBILITY: {
        ENABLE_KEYBOARD_NAVIGATION: true,
        ENABLE_SCREEN_READER_SUPPORT: true,
        FOCUS_VISIBLE: true,
        HIGH_CONTRAST_MODE: false
    }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = APP_CONFIG;
} else if (typeof window !== 'undefined') {
    window.APP_CONFIG = APP_CONFIG;
}
