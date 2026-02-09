// Blog/Knowledge Center JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Tab functionality for resource library
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button and corresponding content
            this.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // Category card interactions
    const categoryCards = document.querySelectorAll('.category-card');
    categoryCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '';
        });
    });
    
    // Article card interactions
    const articleCards = document.querySelectorAll('.article-card, .featured-article');
    articleCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Load more articles functionality
    const loadMoreButton = document.getElementById('load-more-articles');
    if (loadMoreButton) {
        let visibleArticles = 6;
        const allArticles = document.querySelectorAll('.article-card');
        
        loadMoreButton.addEventListener('click', function() {
            const itemsToShow = Math.min(visibleArticles + 3, allArticles.length);
            
            for (let i = visibleArticles; i < itemsToShow; i++) {
                if (allArticles[i]) {
                    allArticles[i].style.display = 'block';
                    // Add animation
                    allArticles[i].classList.add('fade-in');
                    setTimeout(() => {
                        allArticles[i].classList.add('visible');
                    }, 100 * (i - visibleArticles));
                }
            }
            
            visibleArticles = itemsToShow;
            
            // Hide button if all articles are shown
            if (visibleArticles >= allArticles.length) {
                loadMoreButton.style.display = 'none';
            }
        });
        
        // Initially hide articles beyond first 6
        for (let i = 6; i < allArticles.length; i++) {
            allArticles[i].style.display = 'none';
        }
    }
    
    // Newsletter form submission
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const submitButton = this.querySelector('button[type="submit"]');
            
            if (!emailInput.value || !isValidEmail(emailInput.value)) {
                showNotification('Please enter a valid email address', 'error');
                return;
            }
            
            // Save original button text
            const originalText = submitButton.textContent;
            
            // Show loading state
            submitButton.textContent = 'Subscribing...';
            submitButton.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                // Show success message
                showNotification('Thank you for subscribing to our newsletter!', 'success');
                
                // Reset form
                newsletterForm.reset();
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            }, 1500);
        });
    }
    
    // Webinar registration
    const webinarButtons = document.querySelectorAll('.webinar-card .btn');
    webinarButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const webinarTitle = this.closest('.webinar-card').querySelector('h3').textContent;
            
            // In a real implementation, this would open a registration form/modal
            showNotification(`Registration for "${webinarTitle}" would open here.`, 'info');
        });
    });
    
    // Resource download tracking
    const downloadLinks = document.querySelectorAll('.download-link');
    downloadLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const resourceName = this.closest('.resource-card').querySelector('h4').textContent;
            
            // In a real implementation, you would track downloads here
            console.log(`Download started: ${resourceName}`);
            
            // You could send this data to analytics
            // trackDownload(resourceName);
        });
    });
    
    // Helper functions
    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
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
        
        const colors = {
            success: '#3A7D44',
            error: '#ff4757',
            info: '#0B3D91'
        };
        
        notification.style.backgroundColor = colors[type] || colors.info;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 5000);
    }
    
    // Add animation styles if not already present
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes slideIn {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            
            @keyframes slideOut {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(100%);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Search functionality (could be expanded)
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Search articles...';
    searchInput.className = 'knowledge-search';
    searchInput.style.cssText = `
        display: block;
        width: 100%;
        max-width: 500px;
        margin: 2rem auto;
        padding: 0.75rem 1rem;
        border: 2px solid #E0E0E0;
        border-radius: 8px;
        font-size: 1rem;
        font-family: 'Inter', sans-serif;
    `;
    
    // Insert search bar after categories section
    const categoriesSection = document.querySelector('.knowledge-categories');
    if (categoriesSection) {
        categoriesSection.parentNode.insertBefore(searchInput, categoriesSection.nextSibling);
        
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const articles = document.querySelectorAll('.article-card, .featured-article');
            
            articles.forEach(article => {
                const title = article.querySelector('h3').textContent.toLowerCase();
                const excerpt = article.querySelector('p').textContent.toLowerCase();
                
                if (title.includes(searchTerm) || excerpt.includes(searchTerm)) {
                    article.style.display = 'block';
                } else {
                    article.style.display = 'none';
                }
            });
        });
    }
});

// Export for use in other modules
window.KVBBlog = {
    switchTab: function(tabId) {
        const tabButton = document.querySelector(`.tab-button[data-tab="${tabId}"]`);
        if (tabButton) {
            tabButton.click();
        }
    },
    
    searchArticles: function(searchTerm) {
        const searchInput = document.querySelector('.knowledge-search');
        if (searchInput) {
            searchInput.value = searchTerm;
            searchInput.dispatchEvent(new Event('input'));
        }
    }
};