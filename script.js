// Smooth scrolling and animations
document.addEventListener('DOMContentLoaded', function() {
    // Initialize smooth scrolling
    initSmoothScrolling();
    
    // Initialize scroll animations
    initScrollAnimations();
    
    // Initialize enhanced parallax effects
    initEnhancedParallaxEffects();
    
    // Initialize navigation
    initNavigation();
    
    // Initialize project images
    initProjectImages();
    
    // Initialize fade-in animations
    initFadeInAnimations();
    
    // Initialize marquee animation
    initMarqueeAnimation();
    
    // Initialize loading animations
    initLoadingAnimations();
});

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.offsetTop - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Scroll-triggered animations
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
    
    // Add animation classes to elements
    addAnimationClasses();
}

function addAnimationClasses() {
    // Vision section
    const visionTitle = document.querySelector('.vision-title');
    if (visionTitle) visionTitle.classList.add('fade-in');
    
    // Style section
    const styleTitle = document.querySelector('.style-title');
    if (styleTitle) styleTitle.classList.add('fade-in');
    
    // Experience section
    const experienceHeader = document.querySelector('.experience-header h2');
    if (experienceHeader) experienceHeader.classList.add('slide-in-left');
    
    const experienceText = document.querySelector('.experience-text');
    if (experienceText) experienceText.classList.add('slide-in-right');
    
    // Works section
    const worksHeader = document.querySelector('.works-header h2');
    if (worksHeader) worksHeader.classList.add('fade-in');
    
    const workItems = document.querySelectorAll('.work-item');
    workItems.forEach((item, index) => {
        setTimeout(() => {
            item.classList.add('fade-in');
        }, index * 100);
    });
    
    // Process section
    const processSteps = document.querySelectorAll('.process-step');
    processSteps.forEach((step, index) => {
        setTimeout(() => {
            step.classList.add('fade-in');
        }, index * 150);
    });
    
    // Testimonial section
    const testimonialQuote = document.querySelector('.testimonial-quote');
    if (testimonialQuote) testimonialQuote.classList.add('fade-in');
}

// Hero-only parallax effects
function initEnhancedParallaxEffects() {
    const heroImage = document.querySelector('.hero-image img');
    const heroText = document.querySelector('.hero-text');
    
    let ticking = false;
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        
        // Hero parallax effect (only for hero section)
        if (heroImage && heroText) {
            const heroRect = heroImage.getBoundingClientRect();
            
            if (heroRect.bottom >= 0) {
                const heroSpeed = 0.5;
                const yPos = scrolled * heroSpeed;
                
                // Apply to both image and text for unified movement
                heroImage.style.setProperty('transform', `translate3d(0, ${yPos}px, 0)`, 'important');
                heroImage.style.setProperty('transition', 'none', 'important');
                heroImage.style.willChange = 'transform';
                
                heroText.style.setProperty('transform', `translate3d(0, ${yPos}px, 0)`, 'important');
                heroText.style.setProperty('transition', 'none', 'important');
                heroText.style.willChange = 'transform';
            }
        }
        
        ticking = false;
    }
    
    function requestParallaxUpdate() {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }
    
    // Use passive scroll listener for better performance
    window.addEventListener('scroll', requestParallaxUpdate, { passive: true });
    
    // Initial call
    updateParallax();
}

// Navigation effects
function initNavigation() {
    // Navigation is now positioned absolutely in hero section
    // No scroll-based changes needed since it stays with the hero
    
    // Active navigation highlighting
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.style.opacity = '1';
            if (link.getAttribute('href') === `#${current}`) {
                link.style.opacity = '0.6';
            }
        });
    });
}

// Initialize project images
function initProjectImages() {
    const projectImages = document.querySelectorAll('.project-image img');
    
    projectImages.forEach(img => {
        // Add loading class initially
        img.style.opacity = '0';
        
        // Handle successful image load
        img.addEventListener('load', () => {
            img.style.opacity = '1';
        });
        
        // Handle image error
        img.addEventListener('error', () => {
            console.log('Failed to load image:', img.src);
            img.style.opacity = '0.5';
            // You could add a placeholder or retry logic here
        });
        
        // If image is already loaded (cached)
        if (img.complete) {
            img.style.opacity = '1';
        }
    });
}

// Hero animations
function initHeroAnimations() {
    // Removed all hero text animations to prevent interference with parallax
    // The text will be visible immediately and move with parallax
}

// Marquee animation enhancement
function initMarqueeAnimation() {
    const marqueeContent = document.querySelector('.marquee-content');
    
    if (marqueeContent) {
        // Clone content for seamless loop
        const marqueeText = marqueeContent.innerHTML;
        marqueeContent.innerHTML = marqueeText + marqueeText;
        
        // Pause animation on hover
        marqueeContent.addEventListener('mouseenter', () => {
            marqueeContent.style.animationPlayState = 'paused';
        });
        
        marqueeContent.addEventListener('mouseleave', () => {
            marqueeContent.style.animationPlayState = 'running';
        });
    }
}

// Loading animations
function initLoadingAnimations() {
    const elementsToAnimate = document.querySelectorAll('.vision-title, .style-title, .hero-text, .works-header h2');
    
    elementsToAnimate.forEach((element, index) => {
        element.classList.add('loading');
        element.style.animationDelay = `${index * 0.2}s`;
    });
}

// Work items hover effects
document.addEventListener('DOMContentLoaded', () => {
    const workItems = document.querySelectorAll('.work-item');
    
    workItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'translateX(10px)';
            item.style.borderColor = 'rgba(0, 0, 0, 0.3)';
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translateX(0)';
            item.style.borderColor = 'rgba(0, 0, 0, 0.1)';
        });
    });
});

// Process steps animation
function animateProcessSteps() {
    const processSteps = document.querySelectorAll('.process-step');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '0';
                    entry.target.style.transform = 'translateY(30px)';
                    entry.target.style.transition = 'all 0.6s ease';
                    
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, 100);
                }, index * 100);
            }
        });
    }, { threshold: 0.3 });
    
    processSteps.forEach(step => {
        observer.observe(step);
    });
}

// Initialize process steps animation
document.addEventListener('DOMContentLoaded', animateProcessSteps);

// Testimonial animation
function initTestimonialAnimation() {
    const testimonialSection = document.querySelector('.testimonial-section');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const quote = entry.target.querySelector('.testimonial-quote');
                const author = entry.target.querySelector('.testimonial-author');
                const project = entry.target.querySelector('.testimonial-project');
                
                [quote, author, project].forEach((element, index) => {
                    if (element) {
                        setTimeout(() => {
                            element.style.opacity = '0';
                            element.style.transform = 'translateY(30px)';
                            element.style.transition = 'all 0.8s ease';
                            
                            setTimeout(() => {
                                element.style.opacity = '1';
                                element.style.transform = 'translateY(0)';
                            }, 100);
                        }, index * 200);
                    }
                });
            }
        });
    }, { threshold: 0.3 });
    
    if (testimonialSection) {
        observer.observe(testimonialSection);
    }
}

// Initialize testimonial animation
document.addEventListener('DOMContentLoaded', initTestimonialAnimation);

// Smooth page transitions
function initPageTransitions() {
    const links = document.querySelectorAll('a:not([href^="#"])');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            
            if (href && !href.startsWith('http') && !href.startsWith('mailto:') && !href.startsWith('tel:')) {
                e.preventDefault();
                
                document.body.style.opacity = '0';
                document.body.style.transition = 'opacity 0.3s ease';
                
                setTimeout(() => {
                    window.location.href = href;
                }, 300);
            }
        });
    });
}

// Initialize page transitions
document.addEventListener('DOMContentLoaded', initPageTransitions);

// Mobile menu functionality
function initMobileMenu() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    let isClosing = false;
    
    function closeMenu() {
        if (isClosing) return;
        isClosing = true;
        
        // Remove active class and restore body scroll immediately
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
        document.body.style.overflow = '';
        isClosing = false;
    }
    
    if (navToggle && navMenu) {
        // Toggle menu on button click
        navToggle.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            if (navMenu.classList.contains('active')) {
                closeMenu();
            } else {
                navMenu.classList.add('active');
                navToggle.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
        
        // Close menu when clicking on navigation links
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                closeMenu();
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                closeMenu();
            }
        });
        
        // Close menu on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navMenu.classList.contains('active')) {
                closeMenu();
            }
        });
        
        // Handle window resize - close menu if screen gets larger
        window.addEventListener('resize', () => {
            if (window.innerWidth > 1024 && navMenu.classList.contains('active')) {
                closeMenu();
            }
        });
    }
}

// Initialize mobile menu
document.addEventListener('DOMContentLoaded', initMobileMenu);

// Performance optimization
function optimizePerformance() {
    // Lazy loading for images
    const images = document.querySelectorAll('img');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => {
        if (img.dataset.src) {
            imageObserver.observe(img);
        }
    });
    
    // Throttle scroll events
    let ticking = false;
    
    function updateScrollEffects() {
        // All scroll-based effects here
        ticking = false;
    }
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateScrollEffects);
            ticking = true;
        }
    });
}

// Initialize performance optimizations
document.addEventListener('DOMContentLoaded', optimizePerformance);

// Add CSS for mobile menu
const mobileMenuCSS = `
@media (max-width: 1024px) {
    .nav-menu {
        position: fixed !important;
        top: 0 !important;
        right: -100% !important;
        width: 100% !important;
        height: 100vh !important;
        background: rgba(0, 0, 0, 0.95) !important;
        backdrop-filter: blur(10px);
        flex-direction: column !important;
        justify-content: center !important;
        align-items: center !important;
        padding: 2rem !important;
        transition: right 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) !important;
        z-index: 999 !important;
        text-align: center !important;
        visibility: hidden !important;
    }
    
    .nav-menu.active {
        right: 0 !important;
        visibility: visible !important;
    }
    
    /* Instant close - no transition when closing */
    .nav-menu:not(.active) {
        transition: none !important;
        right: -100% !important;
        visibility: hidden !important;
    }
    
    .nav-menu .nav-link {
        color: #fff;
        margin: 2rem 0;
        font-size: 2.5rem;
        font-weight: 600;
        text-decoration: none;
        transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        width: 100%;
        display: block;
        opacity: 0;
        transform: translateY(30px);
        letter-spacing: -0.02em;
    }
    
    .nav-menu.active .nav-link {
        opacity: 1;
        transform: translateY(0);
        transition-delay: 0.2s;
    }
    
    .nav-menu .nav-link:hover {
        opacity: 0.6;
        transform: translateY(0) scale(1.05);
    }
    
    .nav-menu .contact-btn {
        margin-top: 3rem;
        background: transparent;
        color: #fff;
        border: 2px solid #fff;
        padding: 1rem 2rem;
        border-radius: 0;
        font-size: 1.1rem;
        cursor: pointer;
        transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        text-transform: uppercase;
        letter-spacing: 0.1em;
        font-weight: 700;
        opacity: 0;
        transform: translateY(30px);
    }
    
    .nav-menu.active .contact-btn {
        opacity: 1;
        transform: translateY(0);
        transition-delay: 0.2s;
    }
    
    .nav-menu .contact-btn:hover {
        background: #fff;
        color: #000;
    }
    
    .nav-toggle.active .menu-text {
        opacity: 0.8;
    }
}

@media (max-width: 768px) {
    .nav-menu .nav-link {
        font-size: 2rem;
        margin: 1.5rem 0;
    }
    
    .nav-menu .contact-btn {
        margin-top: 2rem;
        padding: 0.8rem 1.6rem;
        font-size: 1rem;
    }
}
`;

// Inject mobile menu CSS
const style = document.createElement('style');
style.textContent = mobileMenuCSS;
document.head.appendChild(style);


// Fade-in animations
function initFadeInAnimations() {
    const fadeElements = document.querySelectorAll('.vision-title, .style-title, .about-hero-text p, .projects-visual-grid .project-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                
                // Add fade-in effect
                element.style.opacity = '0';
                element.style.transform = 'translateY(30px)';
                element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
                
                // Trigger animation
                setTimeout(() => {
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                }, 100);
                
                observer.unobserve(element);
            }
        });
    }, { threshold: 0.2 });
    
    fadeElements.forEach(element => {
        observer.observe(element);
    });
}
