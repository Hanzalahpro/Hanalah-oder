// Main JavaScript file for HanzalahCode Portfolio

document.addEventListener('DOMContentLoaded', function() {
    // Initialize loading screen
    initLoadingScreen();
    
    // Initialize all functionality
    initNavigation();
    initTypingAnimation();
    initScrollAnimations();
    initSkillBars();
    initCircularProgress();
    initContactForm();
    initProjectTilt();
    initParticles();
    initBackToTop();
    initProgressBar();
    initCursorTrail();
    initFAB();
    initCounters();
    initTimeline();
    initProjectFilter();
    initTestimonials();
    initToast();
});

// Loading Screen
function initLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    
    window.addEventListener('load', () => {
        setTimeout(() => {
            loadingScreen.classList.add('hidden');
        }, 2000);
    });
}

// Navigation functionality
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('bg-dark-blue/95');
        } else {
            navbar.classList.remove('bg-dark-blue/95');
        }
    });

    // Enhanced responsive menu handling
    function handleResize() {
        const screenWidth = window.innerWidth;
        const mobileMenu = document.getElementById('mobile-menu');
        
        if (screenWidth >= 1024) {
            // Hide mobile menu on larger screens
            mobileMenu.classList.add('hidden');
        }
    }

    // Add resize listener
    window.addEventListener('resize', handleResize);

    // Initial check
    handleResize();

    // Mobile menu toggle with animation
    mobileMenuBtn.addEventListener('click', () => {
        const isHidden = mobileMenu.classList.contains('hidden');
        
        if (isHidden) {
            mobileMenu.classList.remove('hidden');
            // Force reflow
            mobileMenu.offsetHeight;
            mobileMenu.style.transform = 'translateY(0)';
        } else {
            mobileMenu.style.transform = 'translateY(-100%)';
            setTimeout(() => {
                mobileMenu.classList.add('hidden');
            }, 300);
        }
    });

    // Active link highlighting
    window.addEventListener('scroll', () => {
        let current = '';
        const sections = document.querySelectorAll('section[id]');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // Smooth scroll for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
            
            // Close mobile menu if open
            mobileMenu.classList.add('hidden');
        });
    });
}

// Typing animation for hero section
function initTypingAnimation() {
    const typingText = document.getElementById('typing-text');
    const phrases = [
        'Front-End Developer',
        'Creative Coder',
        'UI Enthusiast',
        'Web Designer'
    ];
    
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function typeText() {
        const currentPhrase = phrases[phraseIndex];
        
        if (isDeleting) {
            typingText.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typingText.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }

        if (!isDeleting && charIndex === currentPhrase.length) {
            typingSpeed = 2000; // Pause at end
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typingSpeed = 500; // Pause before next phrase
        }

        setTimeout(typeText, typingSpeed);
    }

    typeText();
}

// Scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, observerOptions);

    // Observe all reveal elements
    document.querySelectorAll('.reveal-left, .reveal-right').forEach(el => {
        observer.observe(el);
    });
}

// Animated skill bars
function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const width = progressBar.getAttribute('data-width');
                
                setTimeout(() => {
                    progressBar.style.width = width + '%';
                }, 200);
                
                skillObserver.unobserve(progressBar);
            }
        });
    }, { threshold: 0.5 });

    skillBars.forEach(bar => {
        skillObserver.observe(bar);
    });
}

// Circular progress animation
function initCircularProgress() {
    const circularProgress = document.querySelectorAll('.circular-progress');
    
    const circularObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progress = entry.target;
                const percentage = progress.getAttribute('data-percentage');
                const degrees = (percentage / 100) * 360;
                
                setTimeout(() => {
                    progress.style.background = `conic-gradient(#FF7F11 ${degrees}deg, rgba(176, 176, 176, 0.2) ${degrees}deg)`;
                }, 300);
                
                circularObserver.unobserve(progress);
            }
        });
    }, { threshold: 0.5 });

    circularProgress.forEach(progress => {
        circularObserver.observe(progress);
    });
}

// Contact form functionality
function initContactForm() {
    const form = document.getElementById('contact-form');
    const successMessage = document.getElementById('form-success');
    const submitButton = form.querySelector('button[type="submit"]');
    const buttonText = submitButton.querySelector('.button-text');
    const buttonLoading = submitButton.querySelector('.button-loading');

    // Form submission
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Show loading state
        buttonText.classList.add('hidden');
        buttonLoading.classList.remove('hidden');
        submitButton.disabled = true;
        
        // Simulate form submission (replace with actual form handling)
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Show success message
        form.classList.add('hidden');
        successMessage.classList.remove('hidden');
        showToast('Message sent successfully!');
        
        // Reset form after 5 seconds
        setTimeout(() => {
            form.reset();
            form.classList.remove('hidden');
            successMessage.classList.add('hidden');
            buttonText.classList.remove('hidden');
            buttonLoading.classList.add('hidden');
            submitButton.disabled = false;
            
        }, 5000);
    });

    // Form validation
    const inputs = form.querySelectorAll('.floating-input');
    inputs.forEach(input => {
        input.addEventListener('input', validateForm);
        input.addEventListener('blur', validateField);
    });

    function validateField(e) {
        const field = e.target;
        const value = field.value.trim();
        
        // Remove existing error styling
        field.classList.remove('border-red-500');
        
        // Validate based on field type
        let isValid = true;
        
        if (field.hasAttribute('required') && !value) {
            isValid = false;
        }
        
        if (field.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            isValid = emailRegex.test(value);
        }
        
        if (!isValid) {
            field.classList.add('border-red-500');
        }
        
        return isValid;
    }

    function validateForm() {
        const formData = new FormData(form);
        let isValid = true;
        
        for (let [key, value] of formData.entries()) {
            const field = form.querySelector(`[name="${key}"]`);
            if (!validateField({ target: field })) {
                isValid = false;
            }
        }
        
        submitButton.disabled = !isValid;
        return isValid;
    }
}

// 3D tilt effect for project cards
function initProjectTilt() {
    const cards = document.querySelectorAll('[data-tilt]');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transition = 'transform 0.1s ease-out';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transition = 'transform 0.3s ease-out';
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
        });
        
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        });
    });
}

// Particle animation (enhanced)
function initParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        createParticle();
    }
    
    function createParticle() {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = Math.random() * 4 + 1 + 'px';
        particle.style.height = particle.style.width;
        particle.style.background = 'rgba(255, 127, 17, 0.3)';
        particle.style.borderRadius = '50%';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.pointerEvents = 'none';
        
        // Random animation duration and delay
        const duration = Math.random() * 20 + 10;
        const delay = Math.random() * 5;
        
        particle.style.animation = `particleFloat ${duration}s ease-in-out ${delay}s infinite`;
        
        particlesContainer.appendChild(particle);
        
        // Remove and recreate particle after animation
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
                createParticle();
            }
        }, (duration + delay) * 1000);
    }
}

// Back to top functionality
function initBackToTop() {
    const backToTopBtn = document.getElementById('back-to-top');
    
    backToTopBtn.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Show/hide back to top button
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTopBtn.style.opacity = '1';
        } else {
            backToTopBtn.style.opacity = '0.7';
        }
    });
}

// Progress Bar
function initProgressBar() {
    const progressBar = document.getElementById('progress-bar');
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        
        progressBar.style.width = scrollPercent + '%';
    });
}

// Cursor Trail Effect
function initCursorTrail() {
    const cursorTrail = document.getElementById('cursor-trail');
    let mouseX = 0;
    let mouseY = 0;
    let trailX = 0;
    let trailY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursorTrail.style.opacity = '1';
    });
    
    document.addEventListener('mouseleave', () => {
        cursorTrail.style.opacity = '0';
    });
    
    function animateTrail() {
        trailX += (mouseX - trailX) * 0.1;
        trailY += (mouseY - trailY) * 0.1;
        
        cursorTrail.style.left = trailX - 10 + 'px';
        cursorTrail.style.top = trailY - 10 + 'px';
        
        requestAnimationFrame(animateTrail);
    }
    
    animateTrail();
}

// Floating Action Button
function initFAB() {
    const fabMain = document.getElementById('fab-main');
    const fabMenu = document.getElementById('fab-menu');
    const fabItems = document.querySelectorAll('.fab-item');
    
    let isOpen = false;
    
    fabMain.addEventListener('click', () => {
        isOpen = !isOpen;
        
        if (isOpen) {
            fabMenu.classList.remove('hidden');
            fabMain.style.transform = 'rotate(45deg)';
        } else {
            fabMenu.classList.add('hidden');
            fabMain.style.transform = 'rotate(0deg)';
        }
    });
    
    // FAB Actions
    fabItems.forEach(item => {
        item.addEventListener('click', (e) => {
            const action = e.currentTarget.getAttribute('data-action');
            
            switch(action) {
                case 'theme-toggle':
                    toggleTheme();
                    break;
                case 'download-cv':
                    downloadCV();
                    break;
                case 'share':
                    sharePortfolio();
                    break;
            }
            
            // Close menu after action
            isOpen = false;
            fabMenu.classList.add('hidden');
            fabMain.style.transform = 'rotate(0deg)';
        });
    });
}

// Theme Toggle
function toggleTheme() {
    document.body.classList.toggle('dark-theme');
    showToast('Theme toggled!');
}

// Download CV
function downloadCV() {
    // Simulate CV download
    const link = document.createElement('a');
    link.href = '#'; // Replace with actual CV URL
    link.download = 'Hanzalah_CV.pdf';
    link.click();
    showToast('CV download started!');
}

// Share Portfolio
function sharePortfolio() {
    if (navigator.share) {
        navigator.share({
            title: 'HanzalahCode Portfolio',
            text: 'Check out my portfolio!',
            url: window.location.href
        });
    } else {
        // Fallback: copy to clipboard
        navigator.clipboard.writeText(window.location.href);
        showToast('Portfolio link copied to clipboard!');
    }
}

// Toast Notification
function initToast() {
    // Toast is initialized, showToast function handles display
}

function showToast(message) {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toast-message');
    
    toastMessage.textContent = message;
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Animated Counters
function initCounters() {
    const counters = document.querySelectorAll('.counter');
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                const increment = target / 100;
                let current = 0;
                
                const updateCounter = () => {
                    if (current < target) {
                        current += increment;
                        counter.textContent = Math.ceil(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target;
                    }
                };
                
                updateCounter();
                counterObserver.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

// Interactive Timeline
function initTimeline() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    timelineItems.forEach(item => {
        item.addEventListener('click', () => {
            // Remove active class from all items
            timelineItems.forEach(i => i.classList.remove('active'));
            // Add active class to clicked item
            item.classList.add('active');
        });
    });
}

// Project Filter
function initProjectFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');
            
            const filter = btn.getAttribute('data-filter');
            
            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    card.classList.remove('filtered-out');
                    card.classList.add('filtered-in');
                } else {
                    card.classList.remove('filtered-in');
                    card.classList.add('filtered-out');
                }
            });
        });
    });
}

// Testimonials Carousel
function initTestimonials() {
    const wrapper = document.getElementById('testimonials-wrapper');
    const cards = document.querySelectorAll('.testimonial-card');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.getElementById('testimonial-prev');
    const nextBtn = document.getElementById('testimonial-next');
    
    let currentSlide = 0;
    const totalSlides = cards.length;
    
    function showSlide(index) {
        // Hide all cards
        cards.forEach(card => card.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        // Show current card
        cards[index].classList.add('active');
        dots[index].classList.add('active');
        
        currentSlide = index;
    }
    
    function nextSlide() {
        const next = (currentSlide + 1) % totalSlides;
        showSlide(next);
    }
    
    function prevSlide() {
        const prev = (currentSlide - 1 + totalSlides) % totalSlides;
        showSlide(prev);
    }
    
    // Event listeners
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => showSlide(index));
    });
    
    // Auto-play
    setInterval(nextSlide, 5000);
}

// Utility function for smooth scrolling
function smoothScrollTo(target, duration = 1000) {
    const targetElement = document.querySelector(target);
    if (!targetElement) return;
    
    const targetPosition = targetElement.offsetTop - 80; // Account for navbar
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;
    
    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = ease(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
    }
    
    function ease(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }
    
    requestAnimationFrame(animation);
}

// Performance optimization: Throttle scroll events
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply throttling to scroll events
const throttledScrollHandler = throttle(() => {
    // Handle scroll events here if needed
}, 16); // ~60fps

window.addEventListener('scroll', throttledScrollHandler);

// Preload images for better performance
function preloadImages() {
    const images = [
        '/placeholder.svg?height=320&width=320&text=Hanzalah',
        '/placeholder.svg?height=200&width=300&text=E-Commerce+Platform',
        '/placeholder.svg?height=200&width=300&text=Portfolio+Dashboard',
        '/placeholder.svg?height=200&width=300&text=Restaurant+Website',
        '/placeholder.svg?height=60&width=60&text=Sarah',
        '/placeholder.svg?height=60&width=60&text=Mike',
        '/placeholder.svg?height=60&width=60&text=Emma'
    ];
    
    images.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// Initialize image preloading
preloadImages();

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Handle reduced motion preference
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    // Disable animations for users who prefer reduced motion
    document.documentElement.style.setProperty('--animation-duration', '0s');
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Close mobile menu
        const mobileMenu = document.getElementById('mobile-menu');
        mobileMenu.classList.add('hidden');
        
        // Close FAB menu
        const fabMenu = document.getElementById('fab-menu');
        const fabMain = document.getElementById('fab-main');
        fabMenu.classList.add('hidden');
        fabMain.style.transform = 'rotate(0deg)';
    }
});

// Service worker registration (for PWA capabilities)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then((registration) => {
                console.log('SW registered: ', registration);
            })
            .catch((registrationError) => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}
