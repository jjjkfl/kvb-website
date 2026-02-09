// Main JavaScript File
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initNavigation();
    initAnimations();
    initCounters();
    initForms();
    initAudienceSelector();
    initCurrentYear();
    
    // Performance optimization
    initLazyLoading();
    initScrollOptimization();
});

// Navigation Functions
function initNavigation() {
    const navbar = document.querySelector('.navbar');
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    // Sticky navbar on scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Mobile menu toggle
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            this.classList.toggle('active');
            
            // Animate hamburger to X
            const hamburger = this.querySelector('.hamburger');
            hamburger.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!navMenu.contains(event.target) && !navToggle.contains(event.target)) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            navToggle.querySelector('.hamburger').classList.remove('active');
        }
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Close mobile menu if open
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                navToggle.querySelector('.hamburger').classList.remove('active');
                
                // Smooth scroll to target
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Animation Functions
function initAnimations() {
    // Intersection Observer for scroll animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Add staggered animation for children
                if (entry.target.classList.contains('stagger-children')) {
                    const children = entry.target.children;
                    Array.from(children).forEach((child, index) => {
                        child.style.transitionDelay = `${0.1 * index}s`;
                    });
                }
            }
        });
    }, observerOptions);
    
    // Observe all elements with animation classes
    document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .scale-in, .stagger-children').forEach(el => {
        observer.observe(el);
    });
}

// Counter Functions
function initCounters() {
    const counterElements = document.querySelectorAll('.metric-value[data-count]');
    
    const counterObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-count'));
                const duration = 2000; // 2 seconds
                const increment = target / (duration / 16); // 60fps
                let current = 0;
                
                const updateCounter = () => {
                    current += increment;
                    if (current < target) {
                        counter.textContent = Math.floor(current).toLocaleString();
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target.toLocaleString();
                    }
                };
                
                updateCounter();
                counterObserver.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });
    
    counterElements.forEach(counter => {
        counterObserver.observe(counter);
    });
}

// Form Functions
function initForms() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic validation
            const inputs = this.querySelectorAll('input[required], textarea[required], select[required]');
            let isValid = true;
            
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    showError(input, 'This field is required');
                } else {
                    clearError(input);
                }
                
                // Email validation
                if (input.type === 'email' && input.value) {
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(input.value)) {
                        isValid = false;
                        showError(input, 'Please enter a valid email address');
                    }
                }
                
                // Phone validation
                if (input.type === 'tel' && input.value) {
                    const phoneRegex = /^[\d\s\-\+\(\)]{10,}$/;
                    if (!phoneRegex.test(input.value)) {
                        isValid = false;
                        showError(input, 'Please enter a valid phone number');
                    }
                }
            });
            
            if (isValid) {
                // Simulate form submission
                const submitBtn = this.querySelector('button[type="submit"]');
                const originalText = submitBtn.textContent;
                
                submitBtn.textContent = 'Sending...';
                submitBtn.disabled = true;
                
                // In a real application, you would send the data to a server here
                setTimeout(() => {
                    submitBtn.textContent = 'Message Sent!';
                    submitBtn.style.backgroundColor = '#3A7D44';
                    
                    // Reset form
                    setTimeout(() => {
                        form.reset();
                        submitBtn.textContent = originalText;
                        submitBtn.disabled = false;
                        submitBtn.style.backgroundColor = '';
                        
                        // Show success message
                        showNotification('Thank you! Your message has been sent successfully.', 'success');
                    }, 2000);
                }, 1500);
            }
        });
    });
    
    function showError(input, message) {
        clearError(input);
        
        const error = document.createElement('div');
        error.className = 'error-message';
        error.textContent = message;
        error.style.color = '#ff4757';
        error.style.fontSize = '0.875rem';
        error.style.marginTop = '0.25rem';
        
        input.parentNode.appendChild(error);
        input.style.borderColor = '#ff4757';
    }
    
    function clearError(input) {
        const existingError = input.parentNode.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
        input.style.borderColor = '';
    }
    
    function showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            color: white;
            font-weight: 500;
            z-index: 10000;
            animation: slideIn 0.3s ease;
        `;
        
        notification.style.backgroundColor = type === 'success' ? '#3A7D44' : '#ff4757';
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 5000);
    }
}

// Audience Selector
function initAudienceSelector() {
    const audienceButtons = document.querySelectorAll('.audience-btn');
    
    audienceButtons.forEach(button => {
        button.addEventListener('click', function() {
            const audience = this.getAttribute('data-audience');
            
            // Remove active class from all buttons
            audienceButtons.forEach(btn => {
                btn.classList.remove('active');
                btn.style.backgroundColor = '';
                btn.style.borderColor = '';
                btn.style.color = '';
            });
            
            // Add active class to clicked button
            this.classList.add('active');
            this.style.backgroundColor = 'var(--primary-yellow)';
            this.style.borderColor = 'var(--primary-yellow)';
            this.style.color = 'var(--dark-charcoal)';
            
            // Show tailored content based on audience
            showAudienceContent(audience);
        });
    });
    
    function showAudienceContent(audience) {
        // This would normally load different content based on audience
        // For now, we'll just show a notification
        const messages = {
            government: 'Showing tailored content for Government Institutions',
            farmer: 'Showing tailored content for Farmers & Agri Industries',
            industry: 'Showing tailored content for Food Processing Companies',
            investor: 'Showing tailored content for Investors & Partners',
            research: 'Showing tailored content for Research Institutions'
        };
        
        showNotification(messages[audience], 'success');
        
        // Scroll to solutions section
        const solutionsSection = document.querySelector('#solutions-overview');
        if (solutionsSection) {
            window.scrollTo({
                top: solutionsSection.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    }
}

// Update Current Year in Footer
function initCurrentYear() {
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

// Performance Optimizations
function initLazyLoading() {
    // Lazy load images
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.getAttribute('data-src');
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });
    
    lazyImages.forEach(img => {
        imageObserver.observe(img);
    });
}

function initScrollOptimization() {
    // Throttle scroll events
    let ticking = false;
    
    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                // Perform scroll-related operations here
                ticking = false;
            });
            ticking = true;
        }
    });
}

// Utility Functions
function debounce(func, wait) {
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

// Export for use in other modules
window.KVBWebsite = {
    initNavigation,
    initAnimations,
    initCounters,
    initForms,
    initAudienceSelector,
    initCurrentYear
};