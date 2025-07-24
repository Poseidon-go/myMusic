// Mobile JavaScript Functions

class MobileHandler {
    constructor() {
        this.init();
    }

    init() {
        this.setupMobileMenu();
        this.setupMobileControls();
        this.setupMobileSettings();
        this.setupTouchEvents();
        this.handleResize();
    }

    // Mobile Menu Toggle
    setupMobileMenu() {
        const menuBtn = document.getElementById('Music-player__navbar-menu');
        const mobileMenu = document.getElementById('Music-player__navbar-content');
        const overlay = document.querySelector('.mobile-overlay');
        const closeBtn = document.querySelector('.mobile-menu-close');

        if (menuBtn && mobileMenu && overlay) {
            menuBtn.addEventListener('click', () => {
                mobileMenu.classList.add('active');
                overlay.classList.add('active');
                document.body.style.overflow = 'hidden';
            });

            const closeMobileMenu = () => {
                mobileMenu.classList.remove('active');
                overlay.classList.remove('active');
                document.body.style.overflow = 'auto';
            };

            if (closeBtn) {
                closeBtn.addEventListener('click', closeMobileMenu);
            }

            overlay.addEventListener('click', closeMobileMenu);

            // Close menu when clicking on menu items
            const menuItems = mobileMenu.querySelectorAll('[id^="Music-player__navbar-content"]');
            menuItems.forEach(item => {
                item.addEventListener('click', closeMobileMenu);
            });
        }
    }

    // Mobile Music Controls
    setupMobileControls() {
        const mobilePlay = document.getElementById('mobile-play');
        const mobilePrev = document.getElementById('mobile-prev');
        const mobileNext = document.getElementById('mobile-next');
        const mobileRange = document.getElementById('mobile-range');

        // Desktop controls
        const desktopPlay = document.querySelector('#Music-control__play-nowplay i:nth-child(2)');
        const desktopPrev = document.getElementById('prev');
        const desktopNext = document.getElementById('next');
        const desktopRange = document.getElementById('myRange');

        // Sync mobile controls with desktop controls
        if (mobilePlay && desktopPlay) {
            mobilePlay.addEventListener('click', () => {
                desktopPlay.click();
                this.updateMobilePlayButton();
            });
        }

        if (mobilePrev && desktopPrev) {
            mobilePrev.addEventListener('click', () => {
                desktopPrev.click();
            });
        }

        if (mobileNext && desktopNext) {
            mobileNext.addEventListener('click', () => {
                desktopNext.click();
            });
        }

        if (mobileRange && desktopRange) {
            mobileRange.addEventListener('input', (e) => {
                desktopRange.value = e.target.value;
                desktopRange.dispatchEvent(new Event('input'));
            });

            // Sync desktop range to mobile
            desktopRange.addEventListener('input', (e) => {
                mobileRange.value = e.target.value;
            });
        }

        // Update mobile timeline
        this.updateMobileTimeline();
    }

    // Update mobile play button icon
    updateMobilePlayButton() {
        const mobilePlay = document.getElementById('mobile-play');
        const desktopPlay = document.querySelector('#Music-control__play-nowplay i:nth-child(2)');

        if (mobilePlay && desktopPlay) {
            const isPlaying = desktopPlay.classList.contains('bx-pause');
            mobilePlay.className = isPlaying ? 'bx bx-pause' : 'bx bx-play';
        }
    }

    // Update mobile timeline
    updateMobileTimeline() {
        const mobileStart = document.getElementById('mobile-start');
        const mobileEnd = document.getElementById('mobile-end');
        const desktopStart = document.getElementById('start');
        const desktopEnd = document.getElementById('end');

        if (mobileStart && mobileEnd && desktopStart && desktopEnd) {
            setInterval(() => {
                mobileStart.textContent = desktopStart.textContent || '0:00';
                mobileEnd.textContent = desktopEnd.textContent || '0:00';
            }, 1000);
        }
    }

    // Mobile Settings Panel
    setupMobileSettings() {
        const mobileSettingsBtn = document.getElementById('mobile-settings');
        const mobileSettingsPanel = document.querySelector('.Music-player__navbar-menu-mobile');
        const mobileLikesBtn = document.getElementById('mobile-likes');

        if (mobileSettingsBtn && mobileSettingsPanel) {
            mobileSettingsBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                mobileSettingsPanel.classList.toggle('active');
            });

            // Close settings panel when clicking outside
            document.addEventListener('click', (e) => {
                if (!mobileSettingsPanel.contains(e.target) && !mobileSettingsBtn.contains(e.target)) {
                    mobileSettingsPanel.classList.remove('active');
                }
            });
        }

        // Mobile likes button
        if (mobileLikesBtn) {
            mobileLikesBtn.addEventListener('click', () => {
                const desktopLikes = document.getElementById('likes');
                if (desktopLikes) {
                    desktopLikes.click();
                }
            });
        }

        // Mobile dark mode toggle
        const mobileDarkModeToggle = document.querySelector('#settings-mobile__dark-mode div');
        if (mobileDarkModeToggle) {
            mobileDarkModeToggle.addEventListener('click', () => {
                const desktopDarkMode = document.getElementById('darkModeToggle');
                if (desktopDarkMode) {
                    desktopDarkMode.click();
                }
            });
        }
    }

    // Touch Events for Better Mobile Experience
    setupTouchEvents() {
        // Add touch feedback to buttons
        const touchElements = document.querySelectorAll('.mobile-actions i, .mobile-play-controls i, .mobile-menu-close i');

        touchElements.forEach(element => {
            element.addEventListener('touchstart', () => {
                element.style.transform = 'scale(0.95)';
            });

            element.addEventListener('touchend', () => {
                element.style.transform = 'scale(1)';
            });
        });

        // Swipe gestures for music control
        this.setupSwipeGestures();
    }

    // Swipe Gestures
    setupSwipeGestures() {
        let startX = 0;
        let startY = 0;
        const musicControl = document.getElementById('Music-control');

        if (musicControl) {
            musicControl.addEventListener('touchstart', (e) => {
                startX = e.touches[0].clientX;
                startY = e.touches[0].clientY;
            });

            musicControl.addEventListener('touchend', (e) => {
                const endX = e.changedTouches[0].clientX;
                const endY = e.changedTouches[0].clientY;
                const diffX = startX - endX;
                const diffY = startY - endY;

                // Only trigger swipe if horizontal movement is greater than vertical
                if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
                    if (diffX > 0) {
                        // Swipe left - next song
                        const nextBtn = document.getElementById('mobile-next');
                        if (nextBtn) nextBtn.click();
                    } else {
                        // Swipe right - previous song
                        const prevBtn = document.getElementById('mobile-prev');
                        if (prevBtn) prevBtn.click();
                    }
                }
            });
        }
    }

    // Handle window resize
    handleResize() {
        window.addEventListener('resize', () => {
            const mobileMenu = document.getElementById('Music-player__navbar-content');
            const overlay = document.querySelector('.mobile-overlay');

            if (window.innerWidth > 768) {
                // Desktop view - close mobile menu if open
                if (mobileMenu && overlay) {
                    mobileMenu.classList.remove('active');
                    overlay.classList.remove('active');
                    document.body.style.overflow = 'auto';
                }
            }
        });
    }

    // Sync mobile song info with desktop
    syncSongInfo() {
        const mobileSongImg = document.getElementById('mobile-song-img');
        const desktopSongImg = document.querySelector('#Music-control__info img');
        const mobileSongTitle = document.querySelector('.mobile-song-details .song');
        const mobileSongArtist = document.querySelector('.mobile-song-details .single');
        const desktopSongTitle = document.querySelector('#Music-control__info-single .song');
        const desktopSongArtist = document.querySelector('#Music-control__info-single .single');

        if (mobileSongImg && desktopSongImg) {
            // Sync image
            const syncImage = () => {
                if (desktopSongImg.src) {
                    mobileSongImg.src = desktopSongImg.src;
                }
            };

            // Initial sync
            syncImage();

            // Create observer to watch for changes
            const observer = new MutationObserver(syncImage);
            observer.observe(desktopSongImg, {
                attributes: true,
                attributeFilter: ['src']
            });
        }

        // Sync song title and artist
        if (mobileSongTitle && desktopSongTitle) {
            const syncText = () => {
                mobileSongTitle.textContent = desktopSongTitle.textContent || 'No song selected';
                if (mobileSongArtist && desktopSongArtist) {
                    mobileSongArtist.textContent = desktopSongArtist.textContent || 'Artist';
                }
            };

            // Initial sync
            syncText();

            // Create observer for text changes
            const textObserver = new MutationObserver(syncText);
            textObserver.observe(desktopSongTitle, {
                childList: true,
                characterData: true,
                subtree: true
            });

            if (desktopSongArtist) {
                textObserver.observe(desktopSongArtist, {
                    childList: true,
                    characterData: true,
                    subtree: true
                });
            }
        }
    }

    // Initialize mobile-specific features
    initMobileFeatures() {
        // Add pull-to-refresh functionality
        this.setupPullToRefresh();

        // Add haptic feedback for supported devices
        this.setupHapticFeedback();

        // Optimize scroll performance
        this.optimizeScrolling();
    }

    setupPullToRefresh() {
        let startY = 0;
        let currentY = 0;
        let pullDistance = 0;
        const threshold = 100;

        const content = document.getElementById('Music-player__contents');
        if (content) {
            content.addEventListener('touchstart', (e) => {
                if (content.scrollTop === 0) {
                    startY = e.touches[0].clientY;
                }
            });

            content.addEventListener('touchmove', (e) => {
                if (content.scrollTop === 0 && startY) {
                    currentY = e.touches[0].clientY;
                    pullDistance = currentY - startY;

                    if (pullDistance > 0) {
                        e.preventDefault();
                        // Add visual feedback here if needed
                    }
                }
            });

            content.addEventListener('touchend', () => {
                if (pullDistance > threshold) {
                    // Trigger refresh
                    window.location.reload();
                }
                startY = 0;
                pullDistance = 0;
            });
        }
    }

    setupHapticFeedback() {
        const buttons = document.querySelectorAll('.mobile-play-controls i, .mobile-actions i');

        buttons.forEach(button => {
            button.addEventListener('click', () => {
                // Haptic feedback for supported devices
                if (navigator.vibrate) {
                    navigator.vibrate(50);
                }
            });
        });
    }

    optimizeScrolling() {
        // Add smooth scrolling behavior
        const scrollElements = document.querySelectorAll('#Music-player__contents, #categories-list');

        scrollElements.forEach(element => {
            element.style.scrollBehavior = 'smooth';
            element.style.webkitOverflowScrolling = 'touch';
        });
    }
}

// Initialize mobile handler when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const mobileHandler = new MobileHandler();

    // Additional initialization for mobile features
    if (window.innerWidth <= 768) {
        mobileHandler.initMobileFeatures();
        mobileHandler.syncSongInfo();
    }
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = MobileHandler;
}