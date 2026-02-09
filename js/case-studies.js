// Case Studies Page - Interactive Features
document.addEventListener('DOMContentLoaded', function() {
    initCaseStudiesPage();
    initFilters();
    initViewToggles();
    initCaseCards();
    initCaseDetails();
    initROIChart();
    initTestimonialCarousel();
    initCaseStudyMap();
});

function initCaseStudiesPage() {
    // Set audience-specific content
    const audience = sessionStorage.getItem('kvb_audience');
    if (audience) {
        // Highlight corresponding audience button
        document.querySelectorAll('.audience-btn').forEach(btn => {
            if (btn.dataset.audience === audience) {
                btn.classList.add('active');
                
                // Pre-filter cases based on audience
                switch(audience) {
                    case 'government':
                        document.getElementById('sector-filter').value = 'government';
                        break;
                    case 'investor':
                        document.getElementById('impact-filter').value = 'high';
                        break;
                    case 'client':
                        document.getElementById('solution-filter').value = 'cooking';
                        break;
                }
                
                // Apply filters
                filterCases();
            }
        });
    }
    
    // Initialize case studies data
    initCaseStudiesData();
    
    // Initialize scroll animations
    initScrollAnimations();
}

function initCaseStudiesData() {
    // Case studies data array
    window.caseStudies = [
        {
            id: 'army-chennai',
            title: 'Indian Army, Chennai',
            sector: 'defense',
            solution: 'cooking',
            impact: 'high',
            roi: 3.2,
            location: 'Chennai, Tamil Nadu',
            summary: '500-meal solar steam cooking system for army mess',
            metrics: {
                fuelSavings: '65%',
                annualSavings: '₹ 18L',
                co2Reduction: '120T',
                mealsPerDay: 500,
                personnel: 1000
            },
            tags: ['Solar Cooking', 'Large Scale', 'High Impact', 'Defense'],
            challenges: [
                'High LPG consumption affecting operational budgets',
                'Supply chain vulnerabilities',
                'Need for reliable, continuous operation',
                'Security considerations'
            ],
            solution: '500-meal capacity solar steam cooking system with hybrid LPG backup',
            results: [
                '65% reduction in LPG consumption',
                'Annual savings: ₹ 18,00,000',
                'ROI period: 3.2 years',
                'CO₂ reduction: 120 tons/year',
                'System availability: 98.5%'
            ],
            impact: {
                financial: '₹ 18L annual savings',
                environmental: '120 tons CO₂/year reduction',
                operational: 'Enhanced energy security',
                social: 'Clean cooking for 1000+ personnel'
            },
            images: [
                'assets/images/case-studies/army-1.jpg',
                'assets/images/case-studies/army-2.jpg',
                'assets/images/case-studies/army-3.jpg'
            ],
            documents: [
                {name: 'Detailed Case Study', url: 'assets/documents/case-studies/army-chennai.pdf'},
                {name: 'Performance Report', url: 'assets/documents/reports/army-performance.pdf'},
                {name: 'ROI Analysis', url: 'assets/documents/reports/army-roi.pdf'}
            ],
            coordinates: [13.0827, 80.2707]
        },
        {
            id: 'temple-hubli',
            title: 'Sri Siddharodhmath, Hubli',
            sector: 'religious',
            solution: 'cooking',
            impact: 'high',
            roi: 4.1,
            location: 'Hubli, Karnataka',
            summary: '3000-meal community kitchen serving devotees',
            metrics: {
                fuelSavings: '70%',
                annualSavings: '₹ 15L',
                co2Reduction: '150T',
                mealsPerDay: 3000,
                devotees: 'Thousands daily'
            },
            tags: ['Community Kitchen', 'Solar Steam', 'High Volume', 'Religious'],
            challenges: [
                'High fuel costs for large-scale cooking',
                'Environmental impact of traditional fuels',
                'Need for continuous operation during festivals',
                'Community health concerns'
            ],
            solution: '3000-meal solar steam cooking system with biomass backup',
            results: [
                '70% reduction in fuel consumption',
                'Annual savings: ₹ 15,00,000',
                'ROI period: 4.1 years',
                'CO₂ reduction: 150 tons/year',
                'Serves 3000+ meals daily'
            ],
            impact: {
                financial: '₹ 15L annual savings',
                environmental: '150 tons CO₂/year reduction',
                social: 'Clean cooking for community service',
                cultural: 'Sustainable religious practices'
            },
            images: [
                'assets/images/case-studies/temple-1.jpg',
                'assets/images/case-studies/temple-2.jpg',
                'assets/images/case-studies/temple-3.jpg'
            ],
            documents: [
                {name: 'Temple Case Study', url: 'assets/documents/case-studies/temple-hubli.pdf'},
                {name: 'Community Impact Report', url: 'assets/documents/reports/temple-impact.pdf'}
            ],
            coordinates: [15.3647, 75.1239]
        },
        {
            id: 'coffee-board',
            title: 'Coffee Board, Balehonnur',
            sector: 'agriculture',
            solution: 'drying',
            impact: 'medium',
            roi: 2.8,
            location: 'Balehonnur, Karnataka',
            summary: 'Solar tunnel dryer for coffee bean processing',
            metrics: {
                dryingTime: '60%',
                qualityImprovement: '40%',
                fuelSavings: '100%',
                capacity: '500 kg/day'
            },
            tags: ['Solar Drying', 'Agriculture', 'Quality Upgrade', 'Coffee'],
            challenges: [
                'Unreliable traditional drying methods',
                'High post-harvest losses',
                'Inconsistent product quality',
                'Fuel costs for drying'
            ],
            solution: 'Solar tunnel dryer with temperature and humidity control',
            results: [
                '60% reduction in drying time',
                '40% improvement in product quality',
                '100% elimination of fuel costs',
                'Consistent drying results',
                'Higher market prices'
            ],
            impact: {
                financial: '25-40% higher prices',
                quality: 'Grade A product consistency',
                environmental: 'Zero-emission processing',
                scalability: 'Model for other plantations'
            },
            images: [
                'assets/images/case-studies/coffee-1.jpg',
                'assets/images/case-studies/coffee-2.jpg'
            ],
            documents: [
                {name: 'Agricultural Case Study', url: 'assets/documents/case-studies/coffee-board.pdf'},
                {name: 'Quality Improvement Report', url: 'assets/documents/reports/coffee-quality.pdf'}
            ],
            coordinates: [13.3565, 75.4645]
        },
        // Add more case studies as needed
    ];
}

function initFilters() {
    const sectorFilter = document.getElementById('sector-filter');
    const solutionFilter = document.getElementById('solution-filter');
    const impactFilter = document.getElementById('impact-filter');
    const resetBtn = document.getElementById('reset-filters');
    
    // Apply filters on change
    [sectorFilter, solutionFilter, impactFilter].forEach(filter => {
        filter.addEventListener('change', filterCases);
    });
    
    // Reset filters
    resetBtn.addEventListener('click', function() {
        sectorFilter.value = 'all';
        solutionFilter.value = 'all';
        impactFilter.value = 'all';
        filterCases();
        
        // Track reset
        trackEvent('case_filters_reset', {
            timestamp: new Date().toISOString()
        });
    });
}

function filterCases() {
    const sector = document.getElementById('sector-filter').value;
    const solution = document.getElementById('solution-filter').value;
    const impact = document.getElementById('impact-filter').value;
    
    // Get all case cards
    const caseCards = document.querySelectorAll('.case-card');
    let visibleCount = 0;
    
    caseCards.forEach(card => {
        const cardSector = card.dataset.sector;
        const cardSolution = card.dataset.solution;
        const cardImpact = card.dataset.impact;
        
        // Check if card matches filters
        const sectorMatch = sector === 'all' || cardSector === sector;
        const solutionMatch = solution === 'all' || cardSolution === solution;
        const impactMatch = impact === 'all' || cardImpact === impact;
        
        if (sectorMatch && solutionMatch && impactMatch) {
            card.style.display = 'block';
            visibleCount++;
            
            // Add animation
            card.classList.add('filtered-in');
            setTimeout(() => card.classList.remove('filtered-in'), 500);
        } else {
            card.style.display = 'none';
        }
    });
    
    // Update case count
    updateCaseCount(visibleCount);
    
    // Track filter usage
    trackEvent('case_filters_applied', {
        sector: sector,
        solution: solution,
        impact: impact,
        visible_count: visibleCount
    });
}

function updateCaseCount(visibleCount) {
    const caseCountElement = document.querySelector('.case-count');
    if (caseCountElement) {
        caseCountElement.textContent = `Showing ${visibleCount} of 150+ case studies`;
    }
}

function initViewToggles() {
    const viewToggles = document.querySelectorAll('.view-toggle');
    const viewContainers = {
        grid: document.getElementById('grid-view'),
        list: document.getElementById('list-view'),
        map: document.getElementById('map-view')
    };
    
    viewToggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
            const view = this.dataset.view;
            
            // Update active state
            viewToggles.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // Show selected view
            Object.keys(viewContainers).forEach(key => {
                if (viewContainers[key]) {
                    viewContainers[key].classList.remove('active');
                }
            });
            
            if (viewContainers[view]) {
                viewContainers[view].classList.add('active');
                
                // Initialize specific view if needed
                if (view === 'map' && !window.caseMapInitialized) {
                    initCaseStudyMap();
                    window.caseMapInitialized = true;
                }
                
                if (view === 'list') {
                    populateListView();
                }
            }
            
            // Track view change
            trackEvent('case_view_changed', { view: view });
        });
    });
}

function populateListView() {
    const listContainer = document.querySelector('.case-list');
    if (!listContainer) return;
    
    listContainer.innerHTML = '';
    
    window.caseStudies.forEach(caseStudy => {
        const listItem = document.createElement('div');
        listItem.className = 'case-list-item';
        listItem.innerHTML = `
            <div class="list-item-content">
                <div class="list-item-header">
                    <h3>${caseStudy.title}</h3>
                    <span class="list-sector ${caseStudy.sector}">${caseStudy.sector}</span>
                </div>
                
                <div class="list-item-details">
                    <p class="list-location">${caseStudy.location}</p>
                    <p class="list-summary">${caseStudy.summary}</p>
                    
                    <div class="list-metrics">
                        <div class="list-metric">
                            <span class="metric-label">ROI:</span>
                            <span class="metric-value">${caseStudy.roi} years</span>
                        </div>
                        <div class="list-metric">
                            <span class="metric-label">Savings:</span>
                            <span class="metric-value">${caseStudy.metrics.annualSavings}/year</span>
                        </div>
                        <div class="list-metric">
                            <span class="metric-label">CO₂:</span>
                            <span class="metric-value">${caseStudy.metrics.co2Reduction}/year</span>
                        </div>
                    </div>
                    
                    <div class="list-tags">
                        ${caseStudy.tags.map(tag => `<span class="list-tag">${tag}</span>`).join('')}
                    </div>
                </div>
                
                <button class="btn-small view-case-list-details" data-case="${caseStudy.id}">
                    View Details
                </button>
            </div>
        `;
        
        listContainer.appendChild(listItem);
    });
    
    // Add event listeners to list view buttons
    document.querySelectorAll('.view-case-list-details').forEach(button => {
        button.addEventListener('click', function() {
            const caseId = this.dataset.case;
            openCaseDetails(caseId);
        });
    });
}

function initCaseCards() {
    // Add event listeners to case cards
    document.querySelectorAll('.view-case-details').forEach(button => {
        button.addEventListener('click', function() {
            const caseId = this.dataset.case;
            openCaseDetails(caseId);
        });
    });
    
    // Add hover effects
    const caseCards = document.querySelectorAll('.case-card');
    caseCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 20px 40px rgba(0,0,0,0.15)';
            
            // Animate ROI badge
            const roiBadge = this.querySelector('.case-roi');
            if (roiBadge) {
                roiBadge.style.transform = 'scale(1.1)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
            
            const roiBadge = this.querySelector('.case-roi');
            if (roiBadge) {
                roiBadge.style.transform = 'scale(1)';
            }
        });
    });
}

function initCaseDetails() {
    // Case details modal will be opened by openCaseDetails function
}

function openCaseDetails(caseId) {
    const caseStudy = window.caseStudies.find(c => c.id === caseId);
    if (!caseStudy) return;
    
    // Create modal
    const modal = document.createElement('div');
    modal.className = 'case-details-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h2>${caseStudy.title} - Case Study</h2>
                <button class="modal-close">&times;</button>
            </div>
            
            <div class="modal-body">
                <div class="case-overview">
                    <div class="case-meta">
                        <div class="meta-item">
                            <span class="meta-label">Location:</span>
                            <span class="meta-value">${caseStudy.location}</span>
                        </div>
                        <div class="meta-item">
                            <span class="meta-label">Sector:</span>
                            <span class="meta-value sector-${caseStudy.sector}">${caseStudy.sector}</span>
                        </div>
                        <div class="meta-item">
                            <span class="meta-label">Solution:</span>
                            <span class="meta-value">${caseStudy.solution}</span>
                        </div>
                        <div class="meta-item">
                            <span class="meta-label">ROI:</span>
                            <span class="meta-value">${caseStudy.roi} years</span>
                        </div>
                    </div>
                    
                    <div class="case-summary">
                        <p>${caseStudy.summary}</p>
                    </div>
                </div>
                
                <div class="case-tabs">
                    <button class="case-tab active" data-tab="challenges">Challenges</button>
                    <button class="case-tab" data-tab="solution">Our Solution</button>
                    <button class="case-tab" data-tab="results">Results</button>
                    <button class="case-tab" data-tab="impact">Impact</button>
                    <button class="case-tab" data-tab="gallery">Gallery</button>
                </div>
                
                <div class="case-tab-content active" id="challenges-content">
                    <h3>Client Challenges</h3>
                    <ul class="challenges-list">
                        ${caseStudy.challenges.map(challenge => `<li>${challenge}</li>`).join('')}
                    </ul>
                </div>
                
                <div class="case-tab-content" id="solution-content">
                    <h3>KVB Solution</h3>
                    <p>${caseStudy.solution}</p>
                    <div class="solution-features">
                        <h4>Key Features:</h4>
                        <ul>
                            ${caseStudy.tags.map(tag => `<li>${tag}</li>`).join('')}
                        </ul>
                    </div>
                </div>
                
                <div class="case-tab-content" id="results-content">
                    <h3>Measurable Results</h3>
                    <div class="results-grid">
                        ${Object.entries(caseStudy.metrics).map(([key, value]) => `
                            <div class="result-card">
                                <div class="result-value">${value}</div>
                                <div class="result-label">${formatMetricLabel(key)}</div>
                            </div>
                        `).join('')}
                    </div>
                    
                    <div class="detailed-results">
                        <h4>Detailed Outcomes:</h4>
                        <ul>
                            ${caseStudy.results.map(result => `<li>${result}</li>`).join('')}
                        </ul>
                    </div>
                </div>
                
                <div class="case-tab-content" id="impact-content">
                    <h3>Comprehensive Impact</h3>
                    <div class="impact-grid">
                        ${Object.entries(caseStudy.impact).map(([key, value]) => `
                            <div class="impact-card ${key}">
                                <div class="impact-icon">${getImpactIcon(key)}</div>
                                <div class="impact-details">
                                    <h4>${formatImpactLabel(key)}</h4>
                                    <p>${value}</p>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
                
                <div class="case-tab-content" id="gallery-content">
                    <h3>Project Gallery</h3>
                    <div class="case-gallery">
                        ${caseStudy.images.map((img, index) => `
                            <div class="gallery-item">
                                <img src="${img}" alt="${caseStudy.title} - Image ${index + 1}">
                            </div>
                        `).join('')}
                    </div>
                </div>
                
                <div class="case-documents">
                    <h3>Download Documents</h3>
                    <div class="document-list">
                        ${caseStudy.documents.map(doc => `
                            <a href="${doc.url}" class="document-link" download>
                                <span class="doc-icon">📄</span>
                                <span class="doc-name">${doc.name}</span>
                                <span class="doc-download">Download</span>
                            </a>
                        `).join('')}
                    </div>
                </div>
                
                <div class="case-cta">
                    <p>Interested in a similar solution for your organization?</p>
                    <div class="cta-buttons">
                        <button class="btn-primary get-proposal" data-case="${caseId}">
                            Get Custom Proposal
                        </button>
                        <button class="btn-secondary schedule-visit" data-case="${caseId}">
                            Schedule Site Visit
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Initialize tab functionality
    initCaseTabs(modal);
    
    // Initialize gallery
    initCaseGallery(modal);
    
    // Close modal
    modal.querySelector('.modal-close').addEventListener('click', () => {
        modal.remove();
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
    
    // CTA buttons
    modal.querySelector('.get-proposal').addEventListener('click', () => {
        window.location.href = `contact-partnerships.html?case=${caseId}&type=proposal`;
    });
    
    modal.querySelector('.schedule-visit').addEventListener('click', () => {
        window.location.href = `contact-partnerships.html?case=${caseId}&type=visit`;
    });
    
    // Track case study view
    trackEvent('case_study_viewed', {
        case_id: caseId,
        title: caseStudy.title,
        sector: caseStudy.sector
    });
}

function initCaseTabs(modal) {
    const tabs = modal.querySelectorAll('.case-tab');
    const contents = modal.querySelectorAll('.case-tab-content');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const tabId = this.dataset.tab;
            
            // Update active state
            tabs.forEach(t => t.classList.remove('active'));
            contents.forEach(c => c.classList.remove('active'));
            
            this.classList.add('active');
            modal.querySelector(`#${tabId}-content`).classList.add('active');
        });
    });
}

function initCaseGallery(modal) {
    const galleryItems = modal.querySelectorAll('.gallery-item');
    if (galleryItems.length > 0) {
        galleryItems.forEach(item => {
            item.addEventListener('click', function() {
                const imgSrc = this.querySelector('img').src;
                openLightbox(imgSrc);
            });
        });
    }
}

function formatMetricLabel(key) {
    const labels = {
        fuelSavings: 'Fuel Savings',
        annualSavings: 'Annual Savings',
        co2Reduction: 'CO₂ Reduction',
        mealsPerDay: 'Meals/Day',
        personnel: 'Personnel Served',
        dryingTime: 'Drying Time Reduction',
        qualityImprovement: 'Quality Improvement',
        fuelSavings: 'Fuel Savings',
        capacity: 'Daily Capacity'
    };
    return labels[key] || key;
}

function formatImpactLabel(key) {
    const labels = {
        financial: 'Financial Impact',
        environmental: 'Environmental Impact',
        operational: 'Operational Impact',
        social: 'Social Impact',
        cultural: 'Cultural Impact',
        quality: 'Quality Impact',
        scalability: 'Scalability'
    };
    return labels[key] || key;
}

function getImpactIcon(type) {
    const icons = {
        financial: '💰',
        environmental: '🌍',
        operational: '⚙️',
        social: '👥',
        cultural: '🕌',
        quality: '⭐',
        scalability: '📈'
    };
    return icons[type] || '📊';
}

function initROIChart() {
    const ctx = document.getElementById('roi-comparison-chart').getContext('2d');
    
    window.roiChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Defense', 'Religious', 'Agriculture', 'Education', 'Government', 'Industry'],
            datasets: [
                {
                    label: 'ROI Period (Years)',
                    data: [3.2, 4.1, 2.8, 4.5, 3.8, 4.2],
                    backgroundColor: '#0B3D91',
                    borderWidth: 0
                },
                {
                    label: 'Annual Savings (₹ Lakhs)',
                    data: [18, 15, 8, 6, 12, 10],
                    backgroundColor: '#3A7D44',
                    borderWidth: 0
                },
                {
                    label: 'CO₂ Reduction (Tons)',
                    data: [120, 150, 40, 85, 110, 75],
                    backgroundColor: '#FDB813',
                    borderWidth: 0
                }
            ]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            let label = context.dataset.label || '';
                            if (label) {
                                label += ': ';
                            }
                            if (context.datasetIndex === 0) {
                                label += context.parsed.y + ' years';
                            } else if (context.datasetIndex === 1) {
                                label += '₹ ' + context.parsed.y + 'L';
                            } else {
                                label += context.parsed.y + ' tons';
                            }
                            return label;
                        }
                    }
                }
            },
            scales: {
                x: {
                    grid: {
                        display: false
                    }
                },
                y: {
                    beginAtZero: true,
                    grid: {
                        display: false
                    }
                }
            }
        }
    });
}

function initTestimonialCarousel() {
    const slides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.carousel-dots .dot');
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');
    
    let currentSlide = 0;
    const totalSlides = slides.length;
    
    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        slides[index].classList.add('active');
        dots[index].classList.add('active');
        currentSlide = index;
    }
    
    function nextSlide() {
        let nextIndex = currentSlide + 1;
        if (nextIndex >= totalSlides) nextIndex = 0;
        showSlide(nextIndex);
    }
    
    function prevSlide() {
        let prevIndex = currentSlide - 1;
        if (prevIndex < 0) prevIndex = totalSlides - 1;
        showSlide(prevIndex);
    }
    
    // Auto-rotate every 10 seconds
    let autoRotate = setInterval(nextSlide, 10000);
    
    // Pause auto-rotate on hover
    const carousel = document.querySelector('.testimonial-carousel');
    carousel.addEventListener('mouseenter', () => {
        clearInterval(autoRotate);
    });
    
    carousel.addEventListener('mouseleave', () => {
        autoRotate = setInterval(nextSlide, 10000);
    });
    
    // Navigation controls
    if (prevBtn) prevBtn.addEventListener('click', () => {
        clearInterval(autoRotate);
        prevSlide();
        autoRotate = setInterval(nextSlide, 10000);
    });
    
    if (nextBtn) nextBtn.addEventListener('click', () => {
        clearInterval(autoRotate);
        nextSlide();
        autoRotate = setInterval(nextSlide, 10000);
    });
    
    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            clearInterval(autoRotate);
            showSlide(index);
            autoRotate = setInterval(nextSlide, 10000);
        });
    });
    
    // Initialize first slide
    showSlide(0);
}

function initCaseStudyMap() {
    const mapContainer = document.getElementById('case-studies-map');
    if (!mapContainer) return;
    
    // Initialize map centered on India
    const map = L.map('case-studies-map').setView([20.5937, 78.9629], 5);
    
    // Add tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);
    
    // Add markers for each case study with coordinates
    window.caseStudies.forEach(caseStudy => {
        if (caseStudy.coordinates) {
            const icon = L.divIcon({
                html: `<div class="map-marker ${caseStudy.sector}" title="${caseStudy.title}">📍</div>`,
                className: 'custom-marker',
                iconSize: [30, 30]
            });
            
            const marker = L.marker(caseStudy.coordinates, { icon: icon });
            
            marker.bindPopup(`
                <div class="map-popup">
                    <h3>${caseStudy.title}</h3>
                    <p><strong>Location:</strong> ${caseStudy.location}</p>
                    <p><strong>ROI:</strong> ${caseStudy.roi} years</p>
                    <p><strong>Savings:</strong> ${caseStudy.metrics.annualSavings}/year</p>
                    <button class="btn-small view-on-map" data-case="${caseStudy.id}">
                        View Case Study
                    </button>
                </div>
            `);
            
            marker.addTo(map);
            
            // Add click event to marker popup button
            marker.on('popupopen', function() {
                const popup = this.getPopup();
                const viewBtn = popup.getElement().querySelector('.view-on-map');
                
                if (viewBtn) {
                    viewBtn.addEventListener('click', function() {
                        const caseId = this.dataset.case;
                        map.closePopup();
                        openCaseDetails(caseId);
                    });
                }
            });
        }
    });
    
    // Fit map to show all markers
    const markers = window.caseStudies
        .filter(c => c.coordinates)
        .map(c => c.coordinates);
    
    if (markers.length > 0) {
        const bounds = L.latLngBounds(markers);
        map.fitBounds(bounds, { padding: [50, 50] });
    }
    
    window.caseMapInitialized = true;
}

function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, { threshold: 0.1 });
    
    // Observe elements
    const elements = document.querySelectorAll('.case-card, .insight-card, .result-card');
    elements.forEach(element => observer.observe(element));
}

// Load more cases functionality
function initLoadMore() {
    const loadMoreBtn = document.getElementById('load-more-cases');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            // Simulate loading more cases
            this.textContent = 'Loading...';
            this.disabled = true;
            
            setTimeout(() => {
                // In a real implementation, this would load more data from server
                this.textContent = 'No More Cases';
                this.disabled = true;
                
                // Show message
                const message = document.createElement('p');
                message.className = 'load-more-message';
                message.textContent = 'All case studies loaded. Contact us for more information.';
                this.parentNode.appendChild(message);
            }, 1500);
        });
    }
}

// Download case study pack
function initCaseStudyPackDownload() {
    const downloadBtn = document.getElementById('download-case-studies');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Create download package
            const packageData = {
                summary: 'KVB Green Energies - Case Study Pack',
                date: new Date().toISOString(),
                cases: window.caseStudies.map(c => ({
                    title: c.title,
                    sector: c.sector,
                    roi: c.roi,
                    savings: c.metrics.annualSavings,
                    impact: c.metrics.co2Reduction
                })),
                totalStats: {
                    cases: window.caseStudies.length,
                    totalSavings: '₹ 10Cr+',
                    totalCO2: '1250+ tons',
                    avgROI: '3.5 years'
                }
            };
            
            const blob = new Blob([JSON.stringify(packageData, null, 2)], { 
                type: 'application/json' 
            });
            const url = URL.createObjectURL(blob);
            
            const a = document.createElement('a');
            a.href = url;
            a.download = `kvb-case-studies-${new Date().toISOString().split('T')[0]}.json`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            
            // Track download
            trackEvent('case_study_pack_downloaded', {
                timestamp: new Date().toISOString(),
                case_count: packageData.cases.length
            });
        });
    }
}

// Initialize additional functionality
setTimeout(() => {
    initLoadMore();
    initCaseStudyPackDownload();
}, 1000);

// Export case studies data
function exportCaseStudiesData() {
    const exportData = {
        metadata: {
            exported: new Date().toISOString(),
            totalCases: window.caseStudies.length,
            sectors: [...new Set(window.caseStudies.map(c => c.sector))],
            solutions: [...new Set(window.caseStudies.map(c => c.solution))]
        },
        cases: window.caseStudies.map(c => ({
            id: c.id,
            title: c.title,
            sector: c.sector,
            solution: c.solution,
            roi: c.roi,
            location: c.location,
            metrics: c.metrics,
            impact: c.impact
        })),
        summary: {
            avgROI: calculateAverage(window.caseStudies.map(c => c.roi)),
            totalSavings: '₹ 10Cr+',
            totalCO2: '1250+ tons',
            successRate: '98%'
        }
    };
    
    return exportData;
}

function calculateAverage(arr) {
    return arr.reduce((a, b) => a + b, 0) / arr.length;
}