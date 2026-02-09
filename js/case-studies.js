// Case Studies JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Filter functionality
    const categoryFilter = document.getElementById('category-filter');
    const sectorFilter = document.getElementById('sector-filter');
    const locationFilter = document.getElementById('location-filter');
    const resetButton = document.getElementById('reset-filters');
    const caseStudyCards = document.querySelectorAll('.case-study-card');
    const loadMoreButton = document.getElementById('load-more');

    // Apply filters
    function applyFilters() {
        const selectedCategory = categoryFilter.value;
        const selectedSector = sectorFilter.value;
        const selectedLocation = locationFilter.value;

        let visibleCount = 0;

        caseStudyCards.forEach(card => {
            const cardCategory = card.getAttribute('data-category');
            const cardSector = card.getAttribute('data-sector');
            const cardLocation = card.getAttribute('data-location');

            const categoryMatch = selectedCategory === 'all' || cardCategory === selectedCategory;
            const sectorMatch = selectedSector === 'all' || cardSector === selectedSector;
            const locationMatch = selectedLocation === 'all' || cardLocation === selectedLocation;

            if (categoryMatch && sectorMatch && locationMatch) {
                card.style.display = 'block';
                visibleCount++;
            } else {
                card.style.display = 'none';
            }
        });

        // Show/hide load more button based on visible cards
        if (visibleCount <= 6) {
            loadMoreButton.style.display = 'none';
        } else {
            loadMoreButton.style.display = 'block';
        }
    }

    // Event listeners for filters
    [categoryFilter, sectorFilter, locationFilter].forEach(filter => {
        filter.addEventListener('change', applyFilters);
    });

    // Reset filters
    resetButton.addEventListener('click', function() {
        categoryFilter.value = 'all';
        sectorFilter.value = 'all';
        locationFilter.value = 'all';
        applyFilters();
    });

    // Load more functionality
    let visibleItems = 6;
    const totalItems = caseStudyCards.length;

    function showMoreItems() {
        const itemsToShow = Math.min(visibleItems + 3, totalItems);
        
        for (let i = visibleItems; i < itemsToShow; i++) {
            if (caseStudyCards[i]) {
                caseStudyCards[i].style.display = 'block';
                // Add animation
                caseStudyCards[i].classList.add('fade-in');
                setTimeout(() => {
                    caseStudyCards[i].classList.add('visible');
                }, 100);
            }
        }
        
        visibleItems = itemsToShow;
        
        // Hide button if all items are shown
        if (visibleItems >= totalItems) {
            loadMoreButton.style.display = 'none';
        }
    }

    if (loadMoreButton) {
        loadMoreButton.addEventListener('click', showMoreItems);
    }

    // Initialize with only first 6 items visible
    for (let i = 6; i < totalItems; i++) {
        caseStudyCards[i].style.display = 'none';
    }

    // Apply initial filters
    applyFilters();

    // Add hover effects
    caseStudyCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.transition = 'transform 0.3s ease';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
});

// Export for use in other modules
window.KVBCaseStudies = {
    applyFilters: function() {
        // Re-export the function
        const categoryFilter = document.getElementById('category-filter');
        const sectorFilter = document.getElementById('sector-filter');
        const locationFilter = document.getElementById('location-filter');
        
        const selectedCategory = categoryFilter.value;
        const selectedSector = sectorFilter.value;
        const selectedLocation = locationFilter.value;

        document.querySelectorAll('.case-study-card').forEach(card => {
            const cardCategory = card.getAttribute('data-category');
            const cardSector = card.getAttribute('data-sector');
            const cardLocation = card.getAttribute('data-location');

            const categoryMatch = selectedCategory === 'all' || cardCategory === selectedCategory;
            const sectorMatch = selectedSector === 'all' || cardSector === selectedSector;
            const locationMatch = selectedLocation === 'all' || cardLocation === selectedLocation;

            if (categoryMatch && sectorMatch && locationMatch) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }
};