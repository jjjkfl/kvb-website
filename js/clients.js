// Clients & Partnerships JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Category tabs functionality
    const categoryTabs = document.querySelectorAll('.category-tab');
    const clientCards = document.querySelectorAll('.client-card');
    const showMoreButton = document.getElementById('show-more-clients');
    
    // Map point interactions
    const mapPoints = document.querySelectorAll('.map-point');
    
    // Filter clients by category
    function filterClients(category) {
        clientCards.forEach(card => {
            if (category === 'all' || card.getAttribute('data-category') === category) {
                card.style.display = 'block';
                // Add animation
                card.classList.add('fade-in');
                setTimeout(() => {
                    card.classList.add('visible');
                }, 100);
            } else {
                card.style.display = 'none';
                card.classList.remove('visible');
            }
        });
        
        // Update active tab
        categoryTabs.forEach(tab => {
            if (tab.getAttribute('data-category') === category) {
                tab.classList.add('active');
            } else {
                tab.classList.remove('active');
            }
        });
    }
    
    // Tab click events
    categoryTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            filterClients(category);
        });
    });
    
    // Map point interactions
    mapPoints.forEach(point => {
        point.addEventListener('mouseenter', function() {
            const location = this.getAttribute('data-location');
            highlightClientsByLocation(location);
        });
        
        point.addEventListener('mouseleave', function() {
            resetClientHighlights();
        });
        
        point.addEventListener('click', function() {
            const location = this.getAttribute('data-location');
            filterClientsByLocation(location);
        });
    });
    
    function highlightClientsByLocation(location) {
        clientCards.forEach(card => {
            if (card.getAttribute('data-location') === location) {
                card.style.boxShadow = '0 5px 15px rgba(253, 184, 19, 0.3)';
                card.style.transform = 'translateY(-3px)';
            }
        });
        
        // Highlight corresponding map point
        mapPoints.forEach(point => {
            if (point.getAttribute('data-location') === location) {
                point.querySelector('.point').style.backgroundColor = '#FDB813';
                point.querySelector('.point').style.transform = 'scale(1.2)';
            }
        });
    }
    
    function resetClientHighlights() {
        clientCards.forEach(card => {
            card.style.boxShadow = '';
            card.style.transform = '';
        });
        
        mapPoints.forEach(point => {
            point.querySelector('.point').style.backgroundColor = '';
            point.querySelector('.point').style.transform = '';
        });
    }
    
    function filterClientsByLocation(location) {
        clientCards.forEach(card => {
            if (card.getAttribute('data-location') === location) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
        
        // Update tabs to show "filtered" state
        categoryTabs.forEach(tab => {
            tab.classList.remove('active');
        });
        
        // Show a custom filter indicator
        const locationName = mapPoints.forEach(point => {
            if (point.getAttribute('data-location') === location) {
                return point.querySelector('.location-name').textContent;
            }
        });
        
        // You could add a custom filter indicator here
    }
    
    // Show more clients functionality
    let visibleClients = 9; // Show first 9 clients initially
    
    if (showMoreButton) {
        showMoreButton.addEventListener('click', function() {
            const allClients = document.querySelectorAll('.client-card');
            const itemsToShow = Math.min(visibleClients + 6, allClients.length);
            
            for (let i = visibleClients; i < itemsToShow; i++) {
                if (allClients[i]) {
                    allClients[i].style.display = 'block';
                    allClients[i].classList.add('fade-in');
                    setTimeout(() => {
                        allClients[i].classList.add('visible');
                    }, 100 * (i - visibleClients));
                }
            }
            
            visibleClients = itemsToShow;
            
            // Hide button if all clients are shown
            if (visibleClients >= allClients.length) {
                showMoreButton.style.display = 'none';
            }
        });
        
        // Initially hide clients beyond first 9
        const allClients = document.querySelectorAll('.client-card');
        for (let i = 9; i < allClients.length; i++) {
            allClients[i].style.display = 'none';
        }
    }
    
    // Add hover effects to client cards
    clientCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.2)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '';
        });
    });
    
    // Initialize with all clients shown
    filterClients('all');
});

// Export for use in other modules
window.KVBClients = {
    filterByCategory: function(category) {
        document.querySelectorAll('.client-card').forEach(card => {
            if (category === 'all' || card.getAttribute('data-category') === category) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    },
    
    highlightLocation: function(location) {
        document.querySelectorAll('.client-card').forEach(card => {
            if (card.getAttribute('data-location') === location) {
                card.style.boxShadow = '0 5px 15px rgba(253, 184, 19, 0.3)';
            }
        });
    }
};