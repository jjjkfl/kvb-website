// KVB Green Energies - Main JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all modules
    initMultiAudienceNavigation();
    initStickyNavigation();
    initMobileMenu();
    initSmoothScrolling();
    initForms();
    initPrestigeWall();
    initInteractiveComponents();
    
    console.log('KVB Green Energies Website Loaded');
});

// 1. Multi-Audience Navigation
function initMultiAudienceNavigation() {
    const audienceButtons = document.querySelectorAll('.audience-btn');
    const audiencePaths = {
        institution: {
            welcome: "Welcome Government/Institutional Partner",
            redirect: "clients-partnerships.html#government",
            highlight: ['solutions', 'certifications', 'case-studies']
        },
        farmer: {
            welcome: "Welcome Farmer & Agri Partner",
            redirect: "solutions/smart-agriculture.html",
            highlight: ['smart-agriculture', 'farmer-support', 'case-studies']
        },
        industry: {
            welcome: "Welcome Industry Professional",
            redirect: "solutions/industrial-solar-thermal.html",
            highlight: ['industrial-solutions', 'roi-calculator', 'certifications']
        },
        partner: {
            welcome: "Welcome Partner & Collaborator",
            redirect: "contact-partnerships.html#partner",
            highlight: ['innovation-lab', 'certifications', 'case-studies']
        },
        investor: {
            welcome: "Welcome Investor",
            redirect: "contact-partnerships.html#investor",
            highlight: ['impact-metrics', 'innovation-lab', 'growth-platform']
        }
    };

    audienceButtons.forEach(button => {
        button.addEventListener('click', function() {
            const audience = this.dataset.audience;
            const path = audiencePaths[audience];
            
            // Show welcome message
            showNotification(path.welcome);
            
            // Highlight relevant sections
            highlightAudienceSections(path.highlight);
            
            // Update navigation for this audience
            updateNavigationForAudience(audience);
            
            // Store in session for personalized experience
            sessionStorage.setItem('kvb_audience', audience);
        });
    });
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'audience-notification';
    notification.innerHTML = `
        <div class="notification-content">
            <p>${message}</p>
            <button class="notification-close">×</button>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        notification.classList.add('fade-out');
        setTimeout(() => notification.remove(), 300);
    }, 5000);
    
    // Close button
    notification.querySelector('.notification-close').addEventListener('click', () => {
        notification.remove();
    });
}

function highlightAudienceSections(sections) {
    // Remove previous highlights
    document.querySelectorAll('.audience-highlight').forEach(el => {
        el.classList.remove('audience-highlight');
    });
    
    // Add new highlights
    sections.forEach(section => {
        const elements = document.querySelectorAll(`[data-audience="${section}"]`);
        elements.forEach(el => {
            el.classList.add('audience-highlight');
        });
    });
}

function updateNavigationForAudience(audience) {
    // Update active state in audience navigation
    document.querySelectorAll('.audience-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-audience="${audience}"]`).classList.add('active');
}

// 2. Sticky Navigation
function initStickyNavigation() {
    const header = document.querySelector('.main-header');
    const audienceNav = document.querySelector('.audience-nav');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        // Sticky header
        if (currentScroll > 100) {
            header.classList.add('sticky');
            if (audienceNav) {
                audienceNav.style.transform = 'translateY(-100%)';
            }
        } else {
            header.classList.remove('sticky');
            if (audienceNav) {
                audienceNav.style.transform = 'translateY(0)';
            }
        }
        
        // Hide/show on scroll direction
        if (currentScroll > lastScroll && currentScroll > 200) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        
        lastScroll = currentScroll;
    });
}

// 3. Mobile Menu Toggle
function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', () => {
            mainNav.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!mainNav.contains(e.target) && !menuToggle.contains(e.target)) {
                mainNav.classList.remove('active');
                menuToggle.classList.remove('active');
            }
        });
        
        // Close menu on link click
        mainNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mainNav.classList.remove('active');
                menuToggle.classList.remove('active');
            });
        });
    }
}

// 4. Smooth Scrolling
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('.main-header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// 5. Form Handling
function initForms() {
    const forms = document.querySelectorAll('form[data-form-type]');
    
    forms.forEach(form => {
        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const formType = this.dataset.formType;
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            
            // Show loading state
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;
            
            try {
                // Simulate API call (replace with actual API endpoint)
                await simulateFormSubmission(this, formType);
                
                // Show success message
                showFormSuccess(this, formType);
                
                // Reset form
                this.reset();
                
            } catch (error) {
                // Show error message
                showFormError(this, error.message);
            } finally {
                // Restore button
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            }
        });
    });
}

async function simulateFormSubmission(form, formType) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Validate required fields
    const requiredFields = form.querySelectorAll('[required]');
    for (const field of requiredFields) {
        if (!field.value.trim()) {
            throw new Error(`Please fill in ${field.name || 'required field'}`);
        }
    }
    
    // Email validation
    const emailField = form.querySelector('input[type="email"]');
    if (emailField && !isValidEmail(emailField.value)) {
        throw new Error('Please enter a valid email address');
    }
    
    // Phone validation
    const phoneField = form.querySelector('input[type="tel"]');
    if (phoneField && !isValidPhone(phoneField.value)) {
        throw new Error('Please enter a valid phone number');
    }
    
    return { success: true, message: 'Form submitted successfully' };
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPhone(phone) {
    return /^[\d\s\-\+\(\)]{10,}$/.test(phone);
}

function showFormSuccess(form, formType) {
    const successDiv = document.createElement('div');
    successDiv.className = 'form-success';
    successDiv.innerHTML = `
        <div class="success-icon">✓</div>
        <h3>Thank You!</h3>
        <p>Your ${getFormTypeName(formType)} has been submitted successfully.</p>
        <p>Our team will contact you within 24 hours.</p>
    `;
    
    form.parentNode.insertBefore(successDiv, form);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        successDiv.classList.add('fade-out');
        setTimeout(() => successDiv.remove(), 300);
    }, 5000);
}

function showFormError(form, errorMessage) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'form-error';
    errorDiv.innerHTML = `
        <div class="error-icon">⚠️</div>
        <p>${errorMessage}</p>
    `;
    
    form.parentNode.insertBefore(errorDiv, form);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        errorDiv.classList.add('fade-out');
        setTimeout(() => errorDiv.remove(), 300);
    }, 5000);
}

function getFormTypeName(type) {
    const formNames = {
        'demo': 'demo request',
        'technical': 'technical inquiry',
        'government': 'government partnership request',
        'investor': 'investor inquiry',
        'farmer': 'farmer support request'
    };
    return formNames[type] || 'request';
}

// 6. Prestige Wall - Client Logos
function initPrestigeWall() {
    const prestigeTrack = document.querySelector('.prestige-track');
    if (!prestigeTrack) return;
    
    // Client logos data from document
    const clients = [
        { name: 'Indian Army, Chennai', logo: 'indian-army.png' },
        { name: 'INS Mandovi, Goa', logo: 'ins-mandovi.png' },
        { name: 'YASHADA, Pune', logo: 'yashada.png' },
        { name: 'Coffee Board, Balehonnur', logo: 'coffee-board.png' },
        { name: 'NABARD, Bagalkot', logo: 'nabard.png' },
        { name: 'ICAR, Goa', logo: 'icar.png' },
        { name: 'UHS Bagalkot', logo: 'uhs-bagalkot.png' },
        { name: 'UAS Bengaluru', logo: 'uas-bengaluru.png' },
        { name: 'Dantiwada Agriculture University', logo: 'dantiwada-university.png' },
        { name: 'Keladi University, Shivamogga', logo: 'keladi-university.png' },
        { name: 'Sri Siddharodhmath, Hubli', logo: 'siddharodhmath.png' },
        { name: 'Sri Siddaganga Math, Tumkur', logo: 'siddaganga-math.png' },
        { name: 'Prakruti, Karwar', logo: 'prakruti.png' },
        { name: 'Sugati Ingredients, Challakere', logo: 'sugati.png' },
        { name: 'Nithya Foods, Puttur', logo: 'nithya-foods.png' }
    ];
    
    // Create client logos
    clients.forEach(client => {
        const clientDiv = document.createElement('div');
        clientDiv.className = 'prestige-client';
        clientDiv.innerHTML = `
            <img src="assets/images/clients/${client.logo}" alt="${client.name}" 
                 onerror="this.src='assets/images/clients/default-client.png'">
            <div class="client-tooltip">${client.name}</div>
        `;
        prestigeTrack.appendChild(clientDiv);
    });
    
    // Duplicate for seamless scrolling
    const clone = prestigeTrack.cloneNode(true);
    prestigeTrack.parentNode.appendChild(clone);
    clone.innerHTML = prestigeTrack.innerHTML;
    
    // Auto-scroll animation
    let scrollSpeed = 1;
    let scrollPosition = 0;
    
    function animatePrestigeWall() {
        scrollPosition -= scrollSpeed;
        if (scrollPosition <= -prestigeTrack.offsetWidth) {
            scrollPosition = 0;
        }
        prestigeTrack.style.transform = `translateX(${scrollPosition}px)`;
        clone.style.transform = `translateX(${scrollPosition + prestigeTrack.offsetWidth}px)`;
        requestAnimationFrame(animatePrestigeWall);
    }
    
    // Start animation
    animatePrestigeWall();
    
    // Pause on hover
    prestigeTrack.parentNode.addEventListener('mouseenter', () => {
        scrollSpeed = 0;
    });
    
    prestigeTrack.parentNode.addEventListener('mouseleave', () => {
        scrollSpeed = 1;
    });
}

// 7. Interactive Components
function initInteractiveComponents() {
    // Tab switching for multi-section content
    const tabContainers = document.querySelectorAll('.tab-container');
    tabContainers.forEach(container => {
        const tabs = container.querySelectorAll('.tab');
        const tabContents = container.querySelectorAll('.tab-content');
        
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                // Remove active class from all tabs and contents
                tabs.forEach(t => t.classList.remove('active'));
                tabContents.forEach(c => c.classList.remove('active'));
                
                // Add active class to clicked tab and corresponding content
                tab.classList.add('active');
                const targetId = tab.dataset.tab;
                document.getElementById(targetId).classList.add('active');
            });
        });
    });
    
    // Accordion functionality
    const accordions = document.querySelectorAll('.accordion-header');
    accordions.forEach(header => {
        header.addEventListener('click', () => {
            const accordion = header.parentElement;
            accordion.classList.toggle('active');
            
            const content = header.nextElementSibling;
            if (accordion.classList.contains('active')) {
                content.style.maxHeight = content.scrollHeight + 'px';
            } else {
                content.style.maxHeight = '0';
            }
        });
    });
    
    // Lazy loading images
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
}

// 8. Performance Optimization
function optimizePerformance() {
    // Defer non-critical CSS
    const criticalCSS = document.createElement('style');
    criticalCSS.textContent = `
        /* Critical above-the-fold styles */
        .main-header, .hero, .hero-content {
            opacity: 1 !important;
        }
    `;
    document.head.appendChild(criticalCSS);
    
    // Preload critical resources
    const preloadLinks = [
        { href: 'css/main.css', as: 'style' },
        { href: 'js/main.js', as: 'script' },
        { href: 'assets/videos/hero-video.mp4', as: 'video' }
    ];
    
    preloadLinks.forEach(link => {
        const preload = document.createElement('link');
        preload.rel = 'preload';
        preload.href = link.href;
        preload.as = link.as;
        document.head.appendChild(preload);
    });
    
    // Service Worker registration (future enhancement)
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/sw.js').then(registration => {
                console.log('ServiceWorker registered:', registration);
            }).catch(error => {
                console.log('ServiceWorker registration failed:', error);
            });
        });
    }
}

// 9. Analytics and Tracking
function initAnalytics() {
    // Track page views
    trackEvent('page_view', {
        page_title: document.title,
        page_path: window.location.pathname,
        audience: sessionStorage.getItem('kvb_audience') || 'unknown'
    });
    
    // Track form interactions
    document.querySelectorAll('form').forEach(form => {
        form.addEventListener('submit', () => {
            trackEvent('form_submit', {
                form_type: form.dataset.formType || 'unknown',
                form_id: form.id || 'unnamed'
            });
        });
    });
    
    // Track CTA clicks
    document.querySelectorAll('a.btn-primary, a.btn-secondary').forEach(button => {
        button.addEventListener('click', () => {
            trackEvent('cta_click', {
                button_text: button.textContent.trim(),
                button_href: button.href,
                page_location: window.location.pathname
            });
        });
    });
    
    // Track video plays
    document.querySelectorAll('video').forEach(video => {
        video.addEventListener('play', () => {
            trackEvent('video_play', {
                video_src: video.src,
                video_duration: video.duration
            });
        });
    });
}

function trackEvent(eventName, eventData) {
    // Replace with actual analytics implementation
    console.log(`Event: ${eventName}`, eventData);
    
    // Example: Google Analytics
    if (typeof gtag === 'function') {
        gtag('event', eventName, eventData);
    }
    
    // Send to your backend (example)
    fetch('/api/analytics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            event: eventName,
            data: eventData,
            timestamp: new Date().toISOString(),
            user_agent: navigator.userAgent,
            screen_resolution: `${window.screen.width}x${window.screen.height}`
        })
    }).catch(console.error);
}

// 10. Error Handling
window.addEventListener('error', function(event) {
    console.error('JavaScript Error:', event.error);
    
    // Send error to analytics
    trackEvent('javascript_error', {
        message: event.error.message,
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno
    });
});

// Initialize on load
optimizePerformance();
initAnalytics();