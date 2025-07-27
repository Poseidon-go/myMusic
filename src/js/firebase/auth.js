// Firebase Authentication Functions

import { auth, googleProvider } from './initFireBase.js';
import { signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';

// ===== FIREBASE AUTH FUNCTIONS =====

// Sign in with Google
export async function signInWithGoogle() {
    try {
        console.log('Starting Google sign in...');
        const result = await signInWithPopup(auth, googleProvider);
        const user = result.user;


        // Process photo URL for better compatibility
        let processedPhotoURL = user.photoURL;
        if (processedPhotoURL) {
            // Ensure HTTPS
            if (processedPhotoURL.startsWith('http://')) {
                processedPhotoURL = processedPhotoURL.replace('http://', 'https://');
            }

            // Add size parameter for Google photos
            if (processedPhotoURL.includes('googleusercontent.com') && !processedPhotoURL.includes('=s')) {
                processedPhotoURL += '=s96-c';
            }
        }

        return {
            success: true,
            user: {
                uid: user.uid,
                name: user.displayName,
                email: user.email,
                photo: processedPhotoURL
            }
        };
    } catch (error) {
        console.error('Google sign in error:', error);
        return {
            success: false,
            error: error.message
        };
    }
}

// Sign out
export async function signOutUser() {
    try {
        console.log('Starting sign out...');
        await signOut(auth);
        console.log('Sign out successful');
        return { success: true };
    } catch (error) {
        console.error('Sign out error:', error);
        return {
            success: false,
            error: error.message
        };
    }
}

// Get current user
export function getCurrentUser() {
    return auth.currentUser;
}

// Listen to auth state changes
export function onAuthStateChange(callback) {
    return onAuthStateChanged(auth, callback);
}

// ===== UI UPDATE FUNCTIONS =====

// Helper function to safely load avatar
function loadAvatarSafely(imgElement, photoUrl, fallbackUrl, userName) {
    const defaultFallback = 'https://i.pinimg.com/564x/67/93/2b/67932b23344077670026ea06c06afcec.jpg';
    const finalFallback = fallbackUrl || defaultFallback;

    if (!imgElement) {
        console.warn('Avatar image element not found');
        return;
    }

    if (!photoUrl || photoUrl.trim() === '') {
        console.log('No photo URL provided, using fallback');
        imgElement.src = finalFallback;
        imgElement.alt = userName || 'User';
        return;
    }

    console.log('🔄 Loading avatar:', photoUrl);

    // Add loading state
    imgElement.classList.add('loading');
    imgElement.style.opacity = '0.5';

    // Create test image with crossOrigin
    const testImg = new Image();
    testImg.crossOrigin = 'anonymous';

    // Set timeout to prevent hanging
    const timeout = setTimeout(() => {
        if (imgElement.classList.contains('loading')) {
            console.warn('⏰ Avatar loading timeout, using fallback');
            imgElement.src = finalFallback;
            imgElement.style.opacity = '1';
            imgElement.classList.remove('loading');
            imgElement.alt = userName || 'User';
        }
    }, 8000);

    testImg.onload = function () {
        clearTimeout(timeout);
        imgElement.src = photoUrl;
        imgElement.style.opacity = '1';
        imgElement.classList.remove('loading');
        imgElement.alt = userName || 'User';
        console.log('✅ Avatar loaded successfully:', photoUrl);
    };

    testImg.onerror = function (error) {
        clearTimeout(timeout);
        console.warn('❌ Avatar failed to load, using fallback.');
        console.warn('Original URL:', photoUrl);
        console.warn('Error details:', error);

        imgElement.src = finalFallback;
        imgElement.style.opacity = '1';
        imgElement.classList.remove('loading');
        imgElement.alt = userName || 'User';
    };

    testImg.src = photoUrl;
}

// Update user UI
export function updateUserUI(user) {
    const userAvatar = document.querySelector('#user_avatar img');
    const userName = document.querySelector('#user_single span:first-child');
    const userStatus = document.querySelector('#user_single span:last-child');
    const loginDiv = document.getElementById('user_avatar-login');

    if (user) {
        // User is signed in - load avatar safely
        loadAvatarSafely(userAvatar, user.photo, null, user.name);

        if (userName) {
            userName.textContent = user.name || 'User';
        }

        if (userStatus) {
            userStatus.textContent = 'Premium';
            userStatus.style.color = 'var(--colorAvatar)';
        }

        // Hide login popup when user is signed in
        if (loginDiv) {
            loginDiv.classList.remove('show');
        }

    } else {
        // User is signed out
        if (userAvatar) {
            userAvatar.src = 'https://i.pinimg.com/564x/67/93/2b/67932b23344077670026ea06c06afcec.jpg';
            userAvatar.alt = 'Guest';
        }

        if (userName) {
            userName.textContent = 'Guest';
        }

        if (userStatus) {
            userStatus.textContent = 'Free';
            userStatus.style.color = 'var(--colorSingle)';
        }

        // Keep login popup hidden by default - only show when avatar clicked
        if (loginDiv) {
            loginDiv.classList.remove('show');
        }

    }
}

// ===== AUTH SETUP FUNCTION =====
export function setupFirebaseAuth() {
    console.log('Setting up Firebase authentication...');

    // Get DOM elements
    const loginButton = document.querySelector('#user_avatar-login div');
    const logoutButton = document.querySelector('.Music-player__navbar-content-logout');
    const userAvatar = document.querySelector('#user_avatar');

    // Login button click handler
    if (loginButton) {
        loginButton.addEventListener('click', async (e) => {
            e.preventDefault();
            e.stopPropagation();

            console.log('Login button clicked');

            // Show loading state
            const originalText = loginButton.querySelector('span').textContent;
            loginButton.querySelector('span').textContent = 'Signing in...';
            loginButton.style.pointerEvents = 'none';

            const result = await signInWithGoogle();

            if (result.success) {
                // Success handled by onAuthStateChanged
                console.log('Login successful');
            } else {
                // Show error
                alert('Login failed: ' + result.error);

                // Restore button
                loginButton.querySelector('span').textContent = originalText;
                loginButton.style.pointerEvents = 'auto';
            }
        });
    }

    // Logout button click handler
    if (logoutButton) {
        logoutButton.addEventListener('click', async (e) => {
            e.preventDefault();
            e.stopPropagation();

            const currentUser = getCurrentUser();
            if (currentUser) {
                console.log('Logout button clicked');

                // Show loading state
                const originalText = logoutButton.querySelector('span').textContent;
                logoutButton.querySelector('span').textContent = 'Signing out...';
                logoutButton.style.pointerEvents = 'none';

                const result = await signOutUser();

                if (result.success) {
                    console.log('Logout successful');
                } else {
                    alert('Logout failed: ' + result.error);
                }

                // Restore button
                logoutButton.querySelector('span').textContent = originalText;
                logoutButton.style.pointerEvents = 'auto';
            }
        });
    }

    // User avatar click handler (show/hide login popup)
    if (userAvatar) {
        userAvatar.addEventListener('click', (e) => {
            e.stopPropagation();
            const loginDiv = document.getElementById('user_avatar-login');
            const currentUser = getCurrentUser();

            if (!currentUser && loginDiv) {
                const isVisible = loginDiv.classList.contains('show');
                if (isVisible) {
                    loginDiv.classList.remove('show');
                } else {
                    loginDiv.classList.add('show');
                }
                console.log('Login popup toggled:', !isVisible);
            }
        });
    }

    // Close login popup when clicking outside
    document.addEventListener('click', (e) => {
        const loginDiv = document.getElementById('user_avatar-login');
        const userAvatar = document.querySelector('#user_avatar');

        if (loginDiv && userAvatar &&
            !loginDiv.contains(e.target) &&
            !userAvatar.contains(e.target)) {
            loginDiv.classList.remove('show');
        }
    });

    // Listen to auth state changes
    onAuthStateChange((user) => {
        if (user) {
            // User is signed in
            const userData = {
                uid: user.uid,
                name: user.displayName,
                email: user.email,
                photo: user.photoURL
            };
            updateUserUI(userData);
            console.log('User signed in:', userData.name);
        } else {
            // User is signed out
            updateUserUI(null);
            console.log('User signed out');
        }
    });

    console.log('Firebase authentication setup completed');
}

// ===== MOBILE AUTH SYNC =====
export function setupMobileAuthSync() {
    // Sync mobile user info with desktop
    onAuthStateChange((user) => {
        // Update mobile user elements if they exist
        const mobileUserImg = document.querySelector('.mobile-song-info img');
        const mobileUserName = document.querySelector('.mobile-user-name');

        // This can be extended for mobile-specific auth UI
        console.log('Mobile auth sync updated');
    });
}