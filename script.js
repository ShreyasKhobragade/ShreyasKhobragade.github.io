/**
 * script.js
 * Controls interactivity, animations, and the aesthetic dynamic features for Portfolio 2.0
 */

document.addEventListener('DOMContentLoaded', () => {
    initScrollAnimations();
    initNavbarEffect();
    initLightbox();
});

/**
 * Initialize Intersection Observer for scroll-triggered animations
 */
function initScrollAnimations() {
    // Setup observer options
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // Trigger when 15% of element is visible
    };

    // Callback for observer
    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Apply specific animation class based on original class
                if (entry.target.classList.contains('reveal-fade')) {
                    entry.target.classList.add('animate-fade');
                } else {
                    entry.target.classList.add('animate');
                }

                // Stop observing once animated to ensure state holds
                observer.unobserve(entry.target);
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Initial stagger for hero elements immediately visible
    const heroElements = document.querySelectorAll('.hero-section .reveal-text, .hero-section .reveal-fade');
    heroElements.forEach((el, index) => {
        setTimeout(() => {
            if (el.classList.contains('reveal-fade')) {
                el.classList.add('animate-fade');
            } else {
                el.classList.add('animate');
            }
        }, index * 150); // Stagger by 150ms
    });

    // Observe all other reveal elements not in hero
    const scrolLElements = document.querySelectorAll('section:not(.hero-section) .reveal-up, section:not(.hero-section) .reveal-fade');
    scrolLElements.forEach(el => observer.observe(el));
}

/**
 * Handle Navbar background effect on scroll
 */
function initNavbarEffect() {
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(10, 11, 14, 0.95)';
            navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.5)';
            navbar.style.padding = '1rem 0';
        } else {
            navbar.style.background = 'rgba(10, 11, 14, 0.8)';
            navbar.style.boxShadow = 'none';
            navbar.style.padding = '1.5rem 0';
        }
    });

    // Handle smooth scrolling for anchor links
    document.querySelectorAll('.nav-links a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Initialize Lightbox Modal for Full-Screen Images
 */
function initLightbox() {
    const modal = document.getElementById('lightbox-modal');
    const modalImg = document.getElementById('lightbox-img');
    const modalVideo = document.getElementById('lightbox-video');
    const closeBtn = document.querySelector('.lightbox-close');

    if (!modal || !modalImg || !closeBtn) return;

    // Event delegation on document to support static and dynamically added images/videos
    document.addEventListener('click', (e) => {
        const target = e.target;
        
        // Check if the clicked element is one of the zoomable images
        if (target.matches('.hero-img, .drone-marquee-item img, .project-img, .zoomable-img') || target.closest('.project-img-grid img')) {
            const imgEl = target.matches('img') ? target : target.querySelector('img');
            if (imgEl) {
                modal.classList.add('show');
                modalImg.style.display = 'block';
                if (modalVideo) {
                    modalVideo.style.display = 'none';
                    modalVideo.pause();
                    modalVideo.src = '';
                }
                modalImg.src = imgEl.src;
                modalImg.alt = imgEl.alt || 'Full screen preview';
                document.body.style.overflow = 'hidden';
            }
        }
        // Check if the clicked element is a zoomable video or inside its container
        else if (target.matches('.zoomable-video') || target.closest('.project-video-container')) {
            const container = target.closest('.project-video-container');
            const videoEl = container ? container.querySelector('video') : (target.matches('video') ? target : null);
            
            if (videoEl && modalVideo) {
                const videoSrc = videoEl.src || (videoEl.querySelector('source') ? videoEl.querySelector('source').src : '');
                if (videoSrc) {
                    modal.classList.add('show');
                    modalImg.style.display = 'none';
                    modalVideo.style.display = 'block';
                    modalVideo.src = videoSrc;
                    modalVideo.load();
                    
                    // Propagate custom playback speed to the lightbox video
                    const customRate = videoEl.playbackRate || 1.0;
                    modalVideo.playbackRate = customRate;
                    modalVideo.addEventListener('play', () => {
                        modalVideo.playbackRate = customRate;
                    });
                    modalVideo.addEventListener('canplay', () => {
                        modalVideo.playbackRate = customRate;
                    });
                    
                    modalVideo.play().catch(err => console.log('Video play interrupted:', err));
                    document.body.style.overflow = 'hidden';
                }
            }
        }
    });

    // Function to close modal
    const closeModal = () => {
        modal.classList.remove('show');
        document.body.style.overflow = 'auto'; // Restore scrolling

        // Optional: clear src after transition to avoid ghostly image/video artifacts next open
        setTimeout(() => {
            if (!modal.classList.contains('show')) {
                modalImg.src = '';
                if (modalVideo) {
                    modalVideo.pause();
                    modalVideo.src = '';
                    modalVideo.playbackRate = 1.0;
                    modalVideo.style.display = 'none';
                }
                modalImg.style.display = 'none';
            }
        }, 300);
    };

    // Event listeners to close the modal
    closeBtn.addEventListener('click', closeModal);

    // Close on clicking outside the media content (clicking on the dark overlay)
    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.classList.contains('lightbox-modal')) {
            closeModal();
        }
    });

    // Close via Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('show')) {
            closeModal();
        }
    });
}
