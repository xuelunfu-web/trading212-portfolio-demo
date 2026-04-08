// Portfolio Interactive Demo
// Handles transitions between the three screens

class PortfolioApp {
    constructor() {
        this.screen1 = document.getElementById('screen1');
        this.screen2 = document.getElementById('screen2');
        this.screen3 = document.getElementById('screen3');
        this.rebalanceBtn = document.getElementById('rebalanceBtn');

        this.init();
    }

    init() {
        // Start on screen 1
        this.showScreen(1);

        // Add event listener to rebalance button
        if (this.rebalanceBtn) {
            this.rebalanceBtn.addEventListener('click', () => this.startRebalanceFlow());
        }

        // Add back button functionality
        const backButtons = document.querySelectorAll('.back-button');
        backButtons.forEach(btn => {
            btn.addEventListener('click', () => this.goBackToPortfolio());
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
                break;
            case 2:
                this.screen2.classList.add('active');
                break;
            case 3:
                this.screen3.classList.add('active');
                break;
        }
    }

    startRebalanceFlow() {
        // Transition to loading screen (screen 2)
        this.showScreen(2);

        // After 5 seconds, transition to result screen (screen 3)
        setTimeout(() => {
            this.showScreen(3);
        }, 5000);
    }

    goBackToPortfolio() {
        this.showScreen(1);
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new PortfolioApp();
});
