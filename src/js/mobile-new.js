// Mobile JavaScript Functions - Function-based approach

// ===== MOBILE MENU NAVIGATION =====
function setupMobileMenu() {
    const menuBtn = document.getElementById('Music-player__navbar-menu');
    const mobileMenu = document.getElementById('Music-player__navbar-content');
    const overlay = document.querySelector('.mobile-overlay');
    const closeBtn = document.querySelector('.mobile-menu-close');

    if (!menuBtn || !mobileMenu || !overlay) {
        console.log('Mobile menu elements not found');
        return;
    }

    // Open mobile menu
    function openMobileMenu() {
        mobileMenu.classList.add('active');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    // Close mobile menu
    function closeMobileMenu() {
        mobileMenu.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    // Event listeners
    menuBtn.addEventListener('click', openMobileMenu);

    if (closeBtn) {
        closeBtn.addEventListener('click', closeMobileMenu);
    }

    overlay.addEventListener('click', closeMobileMenu);

    // Close menu when clicking on menu items
    const menuItems = mobileMenu.querySelectorAll('.Music-player__navbar-content-home, .Music-player__navbar-content-categories, .Music-player__navbar-content-logout');
    menuItems.forEach(item => {
        item.addEventListener('click', closeMobileMenu);
    });

    // Close menu on ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
            closeMobileMenu();
        }
    });

}

// ===== MOBILE SETTINGS PANEL =====
function setupMobileSettings() {
    const mobileSettingsBtn = document.getElementById('mobile-settings');
    const mobileSettingsPanel = document.querySelector('.Music-player__navbar-menu-mobile');
    const mobileLikesBtn = document.getElementById('mobile-likes');

    if (!mobileSettingsBtn || !mobileSettingsPanel) {
        console.log('Mobile settings elements not found');
        return;
    }

    // Toggle settings panel
    function toggleSettingsPanel(e) {
        e.stopPropagation();
        mobileSettingsPanel.classList.toggle('active');
    }

    // Close settings panel
    function closeSettingsPanel() {
        mobileSettingsPanel.classList.remove('active');
    }

    // Event listeners
    mobileSettingsBtn.addEventListener('click', toggleSettingsPanel);

    // Close settings panel when clicking outside
    document.addEventListener('click', (e) => {
        if (!mobileSettingsPanel.contains(e.target) && !mobileSettingsBtn.contains(e.target)) {
            closeSettingsPanel();
        }
    });

    // Mobile likes button
    if (mobileLikesBtn) {
        mobileLikesBtn.addEventListener('click', () => {
            const desktopLikes = document.getElementById('likes');
            if (desktopLikes) {
                desktopLikes.click();
            }
        });
    }
}

// ===== MOBILE TOUCH EVENTS =====
function setupMobileTouchEvents() {
    // Add touch feedback to buttons
    const touchElements = document.querySelectorAll('.mobile-actions i, .mobile-play-controls i, .mobile-menu-close i');

    touchElements.forEach(element => {
        element.addEventListener('touchstart', () => {
            element.style.transform = 'scale(0.95)';
            element.style.transition = 'transform 0.1s ease';
        });

        element.addEventListener('touchend', () => {
            element.style.transform = 'scale(1)';
        });

        element.addEventListener('touchcancel', () => {
            element.style.transform = 'scale(1)';
        });
    });

}

// ===== MOBILE SWIPE GESTURES =====
function setupMobileSwipeGestures() {
    let startX = 0;
    let startY = 0;
    const musicControl = document.getElementById('Music-control');

    if (!musicControl) {
        console.log('Music control element not found for swipe gestures');
        return;
    }

    function handleTouchStart(e) {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
    }

    function handleTouchEnd(e) {
        const endX = e.changedTouches[0].clientX;
        const endY = e.changedTouches[0].clientY;
        const diffX = startX - endX;
        const diffY = startY - endY;

        // Only trigger swipe if horizontal movement is greater than vertical
        if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
            if (diffX > 0) {
                // Swipe left - next song
                const nextBtn = document.getElementById('mobile-next');
                if (nextBtn) {
                    nextBtn.click();
                }
            } else {
                // Swipe right - previous song
                const prevBtn = document.getElementById('mobile-prev');
                if (prevBtn) {
                    prevBtn.click();
                }
            }
        }
    }

    musicControl.addEventListener('touchstart', handleTouchStart);
    musicControl.addEventListener('touchend', handleTouchEnd);

}

// ===== MOBILE HAPTIC FEEDBACK =====
function setupMobileHapticFeedback() {
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

// ===== MOBILE PULL TO REFRESH =====
function setupMobilePullToRefresh() {
    let startY = 0;
    let currentY = 0;
    let pullDistance = 0;
    const threshold = 100;

    const content = document.getElementById('Music-player__contents');
    if (!content) {
        console.log('Content element not found for pull to refresh');
        return;
    }

    function handleTouchStart(e) {
        if (content.scrollTop === 0) {
            startY = e.touches[0].clientY;
        }
    }

    function handleTouchMove(e) {
        if (content.scrollTop === 0 && startY) {
            currentY = e.touches[0].clientY;
            pullDistance = currentY - startY;

            if (pullDistance > 0) {
                e.preventDefault();
                // Add visual feedback here if needed
                console.log('Pull distance:', pullDistance);
            }
        }
    }

    function handleTouchEnd() {
        if (pullDistance > threshold) {
            // Trigger refresh
            console.log('Pull to refresh triggered');
            window.location.reload();
        }
        startY = 0;
        pullDistance = 0;
    }

    content.addEventListener('touchstart', handleTouchStart);
    content.addEventListener('touchmove', handleTouchMove);
    content.addEventListener('touchend', handleTouchEnd);

}

// ===== MOBILE SCROLL OPTIMIZATION =====
function setupMobileScrollOptimization() {
    // Add smooth scrolling behavior
    const scrollElements = document.querySelectorAll('#Music-player__contents, #categories-list');

    scrollElements.forEach(element => {
        element.style.scrollBehavior = 'smooth';
        element.style.webkitOverflowScrolling = 'touch';
    });

}

// ===== MOBILE RESIZE HANDLER =====
function setupMobileResizeHandler() {
    function handleResize() {
        const mobileMenu = document.getElementById('Music-player__navbar-content');
        const overlay = document.querySelector('.mobile-overlay');

        if (window.innerWidth > 768) {
            // Desktop view - close mobile menu if open
            if (mobileMenu && overlay) {
                mobileMenu.classList.remove('active');
                overlay.classList.remove('active');
                document.body.style.overflow = 'auto';
            }

            // Hide slideshow navigation on desktop
            const slideNav = document.querySelector('.mobile-slideshow-nav');
            const slideDots = document.querySelector('.mobile-slideshow-dots');
            if (slideNav) slideNav.style.display = 'none';
            if (slideDots) slideDots.style.display = 'none';
        } else {
            // Mobile view - reinitialize slideshow if needed
            setTimeout(() => {
                setupMobilePopularSlideshow();
            }, 100);
        }
    }

    window.addEventListener('resize', handleResize);
}

// ===== MOBILE SONG INFO SYNC =====
function setupMobileSongInfoSync() {
    const mobileSongImg = document.getElementById('mobile-song-img');
    const desktopSongImg = document.querySelector('#Music-control__info img');
    const mobileSongTitle = document.querySelector('.mobile-song-details .song');
    const mobileSongArtist = document.querySelector('.mobile-song-details .single');
    const desktopSongTitle = document.querySelector('#Music-control__info-single .song');
    const desktopSongArtist = document.querySelector('#Music-control__info-single .single');

    if (!mobileSongImg || !desktopSongImg) {
        console.log('Song sync elements not found');
        return;
    }

    // Sync image
    function syncImage() {
        if (desktopSongImg.src && desktopSongImg.src !== mobileSongImg.src) {
            mobileSongImg.src = desktopSongImg.src;
            console.log('Mobile song image synced');
        }
    }

    // Sync text
    function syncText() {
        if (mobileSongTitle && desktopSongTitle) {
            const newTitle = desktopSongTitle.textContent || 'Select a song';
            if (mobileSongTitle.textContent !== newTitle) {
                mobileSongTitle.textContent = newTitle;
            }
        }

        if (mobileSongArtist && desktopSongArtist) {
            const newArtist = desktopSongArtist.textContent || 'Artist';
            if (mobileSongArtist.textContent !== newArtist) {
                mobileSongArtist.textContent = newArtist;
            }
        }
    }

    // Initial sync
    syncImage();
    syncText();

    // Create observers for changes
    const imageObserver = new MutationObserver(syncImage);
    imageObserver.observe(desktopSongImg, {
        attributes: true,
        attributeFilter: ['src']
    });

    if (desktopSongTitle) {
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

// ===== MOBILE POPULAR SONGS SLIDESHOW =====
function setupMobilePopularSlideshow() {
    // Only run on mobile devices
    if (window.innerWidth > 768) {
        console.log('Slideshow disabled on desktop');
        return;
    }

    const popularList = document.getElementById('popular-list');
    const prevBtn = document.getElementById('popular-prev');
    const nextBtn = document.getElementById('popular-next');
    const dotsContainer = document.getElementById('popular-dots');

    if (!popularList || !prevBtn || !nextBtn || !dotsContainer) {
        console.log('Popular slideshow elements not found');
        return;
    }

    let currentSlide = 0;
    let itemsPerSlide = 2; // Show 2 items per slide on mobile
    let totalItems = 0;
    let totalSlides = 0;
    let itemWidth = 160; // Item width
    let itemGap = 15; // Gap between items

    // Initialize slideshow
    function initSlideshow() {
        const items = popularList.querySelectorAll('#popular-list__item');
        totalItems = items.length;
        totalSlides = Math.ceil(totalItems / itemsPerSlide);


        if (totalSlides <= 1) {
            prevBtn.style.display = 'none';
            nextBtn.style.display = 'none';
            dotsContainer.style.display = 'none';
            return;
        }

        // Show navigation
        prevBtn.style.display = 'flex';
        nextBtn.style.display = 'flex';
        dotsContainer.style.display = 'flex';

        // Create dots
        dotsContainer.innerHTML = '';
        for (let i = 0; i < totalSlides; i++) {
            const dot = document.createElement('div');
            dot.className = 'mobile-slideshow-dot';
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(i));
            dotsContainer.appendChild(dot);
        }

        // Reset to first slide
        currentSlide = 0;
        updateSlideshow();
    }

    // Update slideshow display
    function updateSlideshow() {
        // Calculate scroll position for current slide
        const scrollAmount = currentSlide * (itemWidth + itemGap) * itemsPerSlide;

        popularList.scrollTo({
            left: scrollAmount,
            behavior: 'smooth'
        });

        // Update dots
        const dots = dotsContainer.querySelectorAll('.mobile-slideshow-dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });

        // Update button states
        prevBtn.disabled = currentSlide === 0;
        nextBtn.disabled = currentSlide >= totalSlides - 1;

        // Update button opacity
        prevBtn.style.opacity = currentSlide === 0 ? '0.5' : '1';
        nextBtn.style.opacity = currentSlide >= totalSlides - 1 ? '0.5' : '1';

    }

    // Go to specific slide
    function goToSlide(slideIndex) {
        if (slideIndex >= 0 && slideIndex < totalSlides) {
            currentSlide = slideIndex;
            updateSlideshow();
        }
    }

    // Previous slide
    function prevSlide() {
        if (currentSlide > 0) {
            currentSlide--;
            updateSlideshow();
            console.log('Previous slide');
        }
    }

    // Next slide
    function nextSlide() {
        if (currentSlide < totalSlides - 1) {
            currentSlide++;
            updateSlideshow();
            console.log('Next slide');
        }
    }

    // Event listeners
    prevBtn.addEventListener('click', (e) => {
        e.preventDefault();
        prevSlide();
    });

    nextBtn.addEventListener('click', (e) => {
        e.preventDefault();
        nextSlide();
    });

    // Initialize slideshow when items are loaded
    function checkAndInit() {
        const items = popularList.querySelectorAll('#popular-list__item');
        if (items.length > 0) {
            setTimeout(initSlideshow, 200); // Small delay to ensure items are rendered
        }
    }

    // Check immediately
    checkAndInit();

    // Also observe for changes
    const observer = new MutationObserver(() => {
        checkAndInit();
    });

    observer.observe(popularList, {
        childList: true,
        subtree: true
    });

    // Touch/swipe support for slideshow
    let startX = 0;
    let endX = 0;
    let isDragging = false;

    popularList.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        isDragging = true;
    });

    popularList.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        e.preventDefault(); // Prevent default scrolling
    });

    popularList.addEventListener('touchend', (e) => {
        if (!isDragging) return;
        isDragging = false;

        endX = e.changedTouches[0].clientX;
        const diff = startX - endX;

        if (Math.abs(diff) > 50) { // Minimum swipe distance
            if (diff > 0) {
                nextSlide(); // Swipe left - next slide
            } else {
                prevSlide(); // Swipe right - previous slide
            }
        }
    });

    console.log('Mobile popular slideshow setup completed');
}

// ===== MOBILE MUSIC CONTROLS SYNC =====
function setupMobileMusicControlsSync() {
    // Get mobile controls
    const mobilePlay = document.getElementById('mobile-play');
    const mobilePrev = document.getElementById('mobile-prev');
    const mobileNext = document.getElementById('mobile-next');
    const mobileRange = document.getElementById('mobile-range');
    const mobileStart = document.getElementById('mobile-start');
    const mobileEnd = document.getElementById('mobile-end');
    const mobileHeart = document.getElementById('mobile-toggleHeart');
    const mobileShuffle = document.getElementById('mobile-shuffle');
    const mobileRepeat = document.getElementById('mobile-repeat');
    const mobileVolume = document.getElementById('mobile-setVolume');

    // Get desktop controls
    const desktopPlay = document.querySelector('#Music-control__play-nowplay i:nth-child(2)');
    const desktopPrev = document.getElementById('prev');
    const desktopNext = document.getElementById('next');
    const desktopRange = document.getElementById('myRange');
    const desktopStart = document.getElementById('start');
    const desktopEnd = document.getElementById('end');
    const desktopHeart = document.getElementById('toggleHeart');
    const desktopShuffle = document.getElementById('shuffle');
    const desktopRepeat = document.getElementById('repeat');
    const desktopVolume = document.getElementById('setVolume');

    if (!mobilePlay || !desktopPlay) {
        console.log('Music controls not found for sync');
        return;
    }

    // ===== PLAY/PAUSE SYNC =====
    mobilePlay.addEventListener('click', (e) => {
        e.preventDefault();
        desktopPlay.click();
        setTimeout(() => updateMobilePlayButton(), 100);
        console.log('Mobile play clicked');
    });

    function updateMobilePlayButton() {
        if (mobilePlay && desktopPlay) {
            const isPlaying = desktopPlay.classList.contains('bx-pause');
            mobilePlay.className = isPlaying ? 'bx bx-pause' : 'bx bx-play';
        }
    }

    // ===== PREV/NEXT SYNC =====
    if (mobilePrev && desktopPrev) {
        mobilePrev.addEventListener('click', (e) => {
            e.preventDefault();
            desktopPrev.click();
            console.log('Mobile prev clicked');
        });
    }

    if (mobileNext && desktopNext) {
        mobileNext.addEventListener('click', (e) => {
            e.preventDefault();
            desktopNext.click();
            console.log('Mobile next clicked');
        });
    }

    // ===== TIMELINE SYNC =====
    if (mobileRange && desktopRange) {
        // Mobile to desktop
        mobileRange.addEventListener('input', (e) => {
            desktopRange.value = e.target.value;
            desktopRange.dispatchEvent(new Event('input'));
        });

        // Desktop to mobile
        desktopRange.addEventListener('input', (e) => {
            if (!mobileRange.matches(':active')) {
                mobileRange.value = e.target.value;
            }
        });
    }

    // ===== TIME DISPLAY SYNC =====
    function syncTimeDisplay() {
        if (mobileStart && desktopStart) {
            mobileStart.textContent = desktopStart.textContent || '0:00';
        }
        if (mobileEnd && desktopEnd) {
            mobileEnd.textContent = desktopEnd.textContent || '0:00';
        }
    }

    // ===== HEART/LIKE SYNC =====
    if (mobileHeart && desktopHeart) {
        // Sync heart state
        function syncHeartState() {
            const isLiked = desktopHeart.classList.contains('bxs-heart');
            mobileHeart.className = isLiked ? 'bx bxs-heart' : 'bx bx-heart';
        }

        // Click handler (hidden, but functional)
        mobileHeart.addEventListener('click', (e) => {
            e.preventDefault();
            desktopHeart.click();
            setTimeout(syncHeartState, 100);
            console.log('Mobile heart clicked');
        });

        // Initial sync
        syncHeartState();

        // Watch for changes
        const heartObserver = new MutationObserver(syncHeartState);
        heartObserver.observe(desktopHeart, {
            attributes: true,
            attributeFilter: ['class']
        });
    }

    // ===== SHUFFLE SYNC =====
    if (mobileShuffle && desktopShuffle) {
        function syncShuffleState() {
            const isShuffled = desktopShuffle.style.color === 'rgb(236, 116, 26)' ||
                desktopShuffle.style.color === '#EC741A';
            mobileShuffle.style.color = isShuffled ? '#EC741A' : '';
        }

        mobileShuffle.addEventListener('click', (e) => {
            e.preventDefault();
            desktopShuffle.click();
            setTimeout(syncShuffleState, 100);
            console.log('Mobile shuffle clicked');
        });

        syncShuffleState();
    }

    // ===== REPEAT SYNC =====
    if (mobileRepeat && desktopRepeat) {
        function syncRepeatState() {
            const isRepeated = desktopRepeat.style.color === 'rgb(236, 116, 26)' ||
                desktopRepeat.style.color === '#EC741A';
            mobileRepeat.style.color = isRepeated ? '#EC741A' : '';
        }

        mobileRepeat.addEventListener('click', (e) => {
            e.preventDefault();
            desktopRepeat.click();
            setTimeout(syncRepeatState, 100);
            console.log('Mobile repeat clicked');
        });

        syncRepeatState();
    }

    // ===== VOLUME SYNC =====
    if (mobileVolume && desktopVolume) {
        // Mobile to desktop
        mobileVolume.addEventListener('input', (e) => {
            desktopVolume.value = e.target.value;
            desktopVolume.dispatchEvent(new Event('input'));
            console.log('Mobile volume changed:', e.target.value);
        });

        // Desktop to mobile
        desktopVolume.addEventListener('input', (e) => {
            if (!mobileVolume.matches(':active')) {
                mobileVolume.value = e.target.value;
            }
        });

        // Initial sync
        mobileVolume.value = desktopVolume.value || 50;
    }

    // ===== CONTINUOUS SYNC =====
    function startContinuousSync() {
        setInterval(() => {
            updateMobilePlayButton();
            syncTimeDisplay();

            // Sync range if not being actively used
            if (mobileRange && desktopRange && !mobileRange.matches(':active')) {
                mobileRange.value = desktopRange.value;
            }
        }, 500);
    }

    // Start continuous sync
    startContinuousSync();

    console.log('Mobile music controls sync setup completed');
}

// ===== MOBILE GESTURE CONTROLS =====
function setupMobileGestureControls() {
    const musicControl = document.getElementById('Music-control');
    if (!musicControl) return;

    let startX = 0;
    let startY = 0;
    let startTime = 0;

    // Enhanced touch gestures
    musicControl.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
        startTime = Date.now();
    });

    musicControl.addEventListener('touchend', (e) => {
        const endX = e.changedTouches[0].clientX;
        const endY = e.changedTouches[0].clientY;
        const endTime = Date.now();
        const diffX = startX - endX;
        const diffY = startY - endY;
        const timeDiff = endTime - startTime;

        // Only process quick gestures (< 500ms)
        if (timeDiff > 500) return;

        // Horizontal swipes (prev/next)
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
        // Vertical swipes (volume)
        else if (Math.abs(diffY) > Math.abs(diffX) && Math.abs(diffY) > 50) {
            const volumeSlider = document.getElementById('mobile-setVolume');
            if (volumeSlider) {
                const currentVolume = parseInt(volumeSlider.value);
                if (diffY > 0) {
                    // Swipe up - increase volume
                    volumeSlider.value = Math.min(100, currentVolume + 10);
                } else {
                    // Swipe down - decrease volume
                    volumeSlider.value = Math.max(0, currentVolume - 10);
                }
                volumeSlider.dispatchEvent(new Event('input'));
                console.log('Volume gesture:', volumeSlider.value);
            }
        }
        // Double tap (play/pause)
        else if (Math.abs(diffX) < 20 && Math.abs(diffY) < 20 && timeDiff < 300) {
            // Check for double tap
            if (musicControl.lastTapTime && (startTime - musicControl.lastTapTime) < 300) {
                const playBtn = document.getElementById('mobile-play');
                if (playBtn) playBtn.click();
                console.log('Double tap play/pause');
            }
            musicControl.lastTapTime = startTime;
        }
    });

    console.log('Mobile gesture controls setup completed');
}

// ===== MOBILE INITIALIZATION =====
function initializeMobile() {
    console.log('Initializing mobile features...');

    // Setup all mobile features
    setupMobileMenu();
    setupMobileSettings();
    setupMobileTouchEvents();
    setupMobileSwipeGestures();
    setupMobileHapticFeedback();
    setupMobilePullToRefresh();
    setupMobileScrollOptimization();
    setupMobileResizeHandler();
    setupMobileSongInfoSync();
    setupMobilePopularSlideshow();
    setupMobileMusicControlsSync();
    setupMobileGestureControls();

    console.log('All mobile features initialized successfully!');
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, checking if mobile features should be initialized...');

    // Always initialize mobile features (they will be hidden on desktop via CSS)
    initializeMobile();

    // Additional mobile-specific initialization for actual mobile devices
    if (window.innerWidth <= 768) {
        console.log('Mobile device detected, enabling additional mobile features');

        // Add mobile-specific meta tag if not present
        if (!document.querySelector('meta[name="mobile-web-app-capable"]')) {
            const meta = document.createElement('meta');
            meta.name = 'mobile-web-app-capable';
            meta.content = 'yes';
            document.head.appendChild(meta);
        }
    }
});