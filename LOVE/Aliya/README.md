# Valentine's Love Journey 💕

A romantic, interactive Valentine's Day experience with quiz, love calculator, and proposal features.

## 🌟 Features

- **Interactive Quiz**: 20 romantic questions to discover your love story
- **Love Calculator**: Calculate compatibility percentage with personalized messages
- **Romantic Proposal**: Interactive proposal with animated "No" button dodging
- **Celebration Screen**: Beautiful celebration animation when proposal is accepted
- **Love Letter**: Flying envelope with romantic message
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Accessibility**: Full keyboard navigation and screen reader support
- **Performance**: Optimized animations and memory management

## 🚀 Quick Start

### Local Development
```bash
# Clone the repository
git clone <repository-url>
cd Aliya

# Navigate to project
cd valentainsday

# Start local server (Python 3)
python -m http.server 8000

# Or use Node.js (if available)
npx serve .

# Open in browser
open http://localhost:8000/valentainsday/
```

### Deployment

#### Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

#### Netlify
```bash
# Drag and drop the `valentainsday` folder to Netlify
# Or use the included netlify.toml configuration
```

## 📁 Project Structure

```
valentainsday/
├── index.html          # Main application
├── love-letter.html     # Flying love letter
├── config.js          # Application configuration
├── script.js          # Main JavaScript logic
├── sw.js              # Service worker for caching
├── style.css          # Global styles
├── proposal.css       # Proposal-specific styles
├── animations.css     # Animation definitions
└── archive/           # Legacy development files
    ├── script-old.js
    └── index-old.html
```

## ⚙️ Configuration

The application uses `config.js` for centralized settings:

- **Animation timings**: Heart intervals, particle lifetimes
- **Love calculator**: Score ranges and messages
- **UI settings**: Input validation limits
- **Performance**: Animation limits and optimization
- **Security**: Input sanitization rules
- **Accessibility**: Navigation and screen reader support

## 🔧 Customization

### Change Colors
Edit CSS variables in `style.css`:
```css
:root {
    --primary-violet: #8B5CF6;
    --hot-pink: #EC4899;
    --red-love: #DC2626;
}
```

### Modify Questions
Update the `quiz` array in `script.js`:
```javascript
const quiz = [
  { q: "Your question?", a1: "Option 1", a2: "Option 2" },
  // Add more questions...
];
```

### Customize Messages
Edit love messages in `getLoveMessage()` function:
```javascript
function getLoveMessage(score) {
  if (score >= 95) return "Your custom message!";
  // Add more conditions...
}
```

## 🛠️ Technical Details

### Performance Optimizations
- **DOM Caching**: All DOM elements cached for fast access
- **Memory Management**: Proper interval cleanup and limits
- **Animation Limits**: Maximum hearts and particles to prevent lag
- **Lazy Loading**: Images load only when needed

### Security Features
- **Input Sanitization**: All user inputs cleaned and validated
- **XSS Protection**: HTML tags and dangerous characters removed
- **External Resources**: Fallbacks and integrity checks
- **Secure Headers**: Production security headers configured

### Accessibility
- **ARIA Labels**: All interactive elements properly labeled
- **Keyboard Navigation**: Full keyboard support for all features
- **Focus Management**: Clear focus indicators and logical tab order
- **Screen Reader**: Semantic HTML and descriptive text

## 📱 Browser Support

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Mobile Safari (iOS 14+)
- ✅ Chrome Mobile (Android 10+)

## 🐛 Troubleshooting

### Common Issues

**Images not loading?**
- Check internet connection
- Verify Giphy links are accessible
- Local SVG fallbacks will appear if external images fail

**Animations not smooth?**
- Check browser performance settings
- Close other tabs to free memory
- Try refreshing the page

**Mobile issues?**
- Ensure touch events are enabled
- Check viewport meta tag is present
- Test in different mobile browsers

### Debug Mode
Enable console logging by opening browser developer tools. All errors and initialization messages are logged.

## 📄 License

MIT License - feel free to use for personal or commercial projects.

## ❤️ Made with Love

Created with passion for making Valentine's Day special. Enjoy spreading the love! 💕

---

**Version**: 2.0.0  
**Last Updated**: 2025-02-09  
**Author**: Valentine Developer
