// WhatsApp Floating Button and Integration
document.addEventListener('DOMContentLoaded', function() {
    initWhatsAppIntegration();
});

function initWhatsAppIntegration() {
    const whatsappBtn = document.querySelector('.whatsapp-float');
    
    if (whatsappBtn) {
        // Animate entrance
        setTimeout(() => {
            whatsappBtn.classList.add('visible');
        }, 1000);
        
        // Add click tracking
        whatsappBtn.addEventListener('click', function(e) {
            // Get page context for better support
            const pageTitle = document.title;
            const pageURL = window.location.href;
            const audience = sessionStorage.getItem('kvb_audience') || 'visitor';
            
            // Enhanced WhatsApp message
            const defaultMessage = `Hello KVB Team,\nI'm visiting your website (${pageTitle}) and interested in learning more about your solutions.\n\nPage: ${pageURL}\nAudience: ${audience}`;
            
            // Update href with enhanced message
            const phone = this.href.split('=')[1];
            this.href = `https://wa.me/${phone}?text=${encodeURIComponent(defaultMessage)}`;
            
            // Track click
            trackEvent('whatsapp_click', {
                page: pageTitle,
                audience: audience,
                timestamp: new Date().toISOString()
            });
        });
    }
    
    // Add WhatsApp click-to-chat on phone numbers
    document.querySelectorAll('a[href^="tel:"]').forEach(phoneLink => {
        phoneLink.addEventListener('click', function(e) {
            const phone = this.href.replace('tel:', '');
            
            // Offer WhatsApp alternative
            if (confirm('Would you prefer to chat on WhatsApp instead?')) {
                e.preventDefault();
                window.open(`https://wa.me/${phone}`, '_blank');
            }
        });
    });
    
    // WhatsApp sharing for solutions
    const whatsappShareButtons = document.querySelectorAll('.whatsapp-share');
    whatsappShareButtons.forEach(button => {
        button.addEventListener('click', function() {
            const solution = this.dataset.solution;
            const message = `Check out this ${solution} solution from KVB Green Energies: ${window.location.href}`;
            window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank');
        });
    });
}