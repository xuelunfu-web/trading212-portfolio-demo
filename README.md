# Trading 212 Portfolio - Interactive Prototype

An interactive HTML/CSS/JavaScript prototype of the Trading 212 portfolio rebalancing flow based on the Figma design.

## Files

- `portfolio-interactive.html` - Main HTML file with all 3 screens
- `portfolio-interactive.css` - All styles including animations
- `portfolio-interactive.js` - JavaScript for screen transitions and interactions
- `portfolio-prototype.html` - Static version of screen 1 only
- `portfolio-styles.css` - Styles for static version

## Features

### Three Interactive Screens

**Screen 1: Portfolio Dashboard**
- Solar system themed portfolio visualization
- Portfolio health score (78/100)
- Key insights cards
- Portfolio holdings (APPL, LYFT)
- Interactive "Rebalance portfolio" button

**Screen 2: Loading State**
- User message bubble showing request
- Atlas analyzing message with animated loading dots (...)
- Pulsing company tags (Apple Inc, LYFT, Dropbox Inc)
- Automatically transitions after 5 seconds

**Screen 3: Result State**
- Complete Atlas analysis
- Portfolio recommendations
- Actionable suggestions with tags
- Accept/decline buttons

## How to Use

1. **Open the interactive prototype:**
   ```bash
   open portfolio-interactive.html
   ```
   Or simply drag `portfolio-interactive.html` into your web browser.

2. **Interact with the prototype:**
   - Click the yellow "Rebalance portfolio" button on Screen 1
   - Watch the loading animation with pulsing company tags on Screen 2
   - After 5 seconds, see the full results on Screen 3
   - Click the back button (←) at any time to return to Screen 1

## Animations

### Loading Dots Animation
The text "Atlas is analyzing your portfolio..." features an animated ellipsis that cycles through:
- No dots
- One dot (.)
- Two dots (..)
- Three dots (...)

### Pulsing Company Tags
The company tags (Apple Inc, LYFT, Dropbox Inc) pulse with a subtle scale and opacity animation during the loading state.

### Screen Transitions
Smooth fade transitions between all three screens using CSS opacity and visibility properties.

## Design Specifications

- **Dimensions:** 390×844px (iPhone dimensions)
- **Color Scheme:** Dark theme with purple accent gradient
- **Fonts:** SF Pro, Red Rose
- **Assets:** All images loaded from Figma CDN (valid for 7 days)

## Technical Details

- Pure HTML/CSS/JavaScript (no frameworks)
- CSS animations for loading and pulse effects
- JavaScript class-based architecture for state management
- Responsive to different screen sizes
- All assets loaded from Figma API endpoints

## Browser Compatibility

Works in all modern browsers:
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+

## Notes

- Assets are served from Figma's CDN and expire after 7 days
- The prototype uses backdrop-filter for glassmorphism effects (may require modern browser)
- The loading state is set to 5 seconds as specified in requirements
