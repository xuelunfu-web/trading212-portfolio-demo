// Portfolio Interactive Demo
// Handles transitions between the three screens

class PortfolioApp {
    constructor() {
        this.screen1 = document.getElementById('screen1');
        this.screen2 = document.getElementById('screen2');
        this.screen3 = document.getElementById('screen3');
        this.rebalanceBtn = document.getElementById('rebalanceBtn');
        this.scoreValue = document.querySelector('.score-value');

        this.init();
    }

    init() {
        // Start on screen 1
        this.showScreen(1);

        // Add event listener to rebalance button
        if (this.rebalanceBtn) {
            this.rebalanceBtn.addEventListener('click', () => this.startRebalanceFlow());
        }

        // Add event listener to Ask Atlas button
        const askAtlasBtn = document.querySelector('.ask-button');
        if (askAtlasBtn) {
            askAtlasBtn.addEventListener('click', () => this.startRebalanceFlow());
        }

        // Add back button functionality
        const backButtons = document.querySelectorAll('.back-button');
        backButtons.forEach(btn => {
            btn.addEventListener('click', () => this.goBackToPortfolio());
        });

        // Add checkmark button functionality (back to loading)
        const checkButtons = document.querySelectorAll('.check-btn');
        checkButtons.forEach(btn => {
            btn.addEventListener('click', () => this.goBackToLoading());
        });
    }

    showScreen(screenNumber) {
        // Hide all screens
        this.screen1.classList.remove('active');
        this.screen2.classList.remove('active');
        this.screen3.classList.remove('active');

        // Show requested screen
        switch(screenNumber) {
            case 1:
                this.screen1.classList.add('active');
                this.animateScore();
                break;
            case 2:
                this.screen2.classList.add('active');
                break;
            case 3:
                this.screen3.classList.add('active');
                break;
        }
    }

    animateScore() {
        // Animate score from 0 to 78 with color transition
        const targetScore = 78;
        const duration = 2000; // 2 seconds
        const startTime = Date.now();
        const startColor = { r: 244, g: 46, b: 46 }; // #F42E2E (red)
        const endColor = { r: 244, g: 194, b: 46 }; // #F4C22E (yellow)

        const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Easing function (ease-out)
            const eased = 1 - Math.pow(1 - progress, 3);

            // Calculate current score
            const currentScore = Math.floor(eased * targetScore);

            // Calculate current color
            const r = Math.round(startColor.r + (endColor.r - startColor.r) * eased);
            const g = Math.round(startColor.g + (endColor.g - startColor.g) * eased);
            const b = Math.round(startColor.b + (endColor.b - startColor.b) * eased);
            const color = `rgb(${r}, ${g}, ${b})`;

            // Update display
            if (this.scoreValue) {
                this.scoreValue.textContent = `${currentScore}/100`;
                this.scoreValue.style.color = color;
            }

            // Continue animation or finish
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };

        // Start animation
        requestAnimationFrame(animate);
    }

    startRebalanceFlow() {
        // Transition to loading screen (screen 2)
        this.showScreen(2);

        // After 4 seconds, transition to result screen (screen 3)
        setTimeout(() => {
            this.showScreen(3);
        }, 4000);
    }

    goBackToPortfolio() {
        this.showScreen(1);
    }

    goBackToLoading() {
        // When clicking checkmark, go back to loading screen
        this.showScreen(2);

        // After 4 seconds, show results again
        setTimeout(() => {
            this.showScreen(3);
        }, 4000);
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new PortfolioApp();
});
