// Main Authentication Setup

import { setupFirebaseAuth, setupMobileAuthSync } from './firebase/auth.js';

// Initialize authentication when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('Initializing authentication...');

    // Setup Firebase authentication
    setupFirebaseAuth();

    // Setup mobile auth sync
    setupMobileAuthSync();

    console.log('Authentication initialization completed');
});

// Export for use in other modules
export { setupFirebaseAuth, setupMobileAuthSync };