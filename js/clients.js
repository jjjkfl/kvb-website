// Clients & Partnerships - Interactive Features
document.addEventListener('DOMContentLoaded', function() {
    initClientsPage();
    initCategoryTabs();
    initTestimonialCarousel();
    initClientCards();
});

function initClientsPage() {
    // Highlight current audience
    const audience = sessionStorage.getItem('kvb_audience');
    if (audience) {
        document.querySelectorAll('.audience-btn').forEach(btn => {
            if (btn.dataset.audience === audience) {
                btn.classList.add('active');
            }
        });
    }
    
    // Initialize view case study buttons
    document.querySelectorAll('.view-case-study').forEach(button => {
        button.addEventListener('click', function() {
            const clientId = this.dataset.client;
            openCaseStudy(clientId);
        });
    });
}

function initCategoryTabs() {
    const tabs = document.querySelectorAll('.category-tab');
    const contents = document.querySelectorAll('.category-content');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const category = tab.dataset.category;
            
            // Remove active class from all tabs and contents
            tabs.forEach(t => t.classList.remove('active'));
            contents.forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding content
            tab.classList.add('active');
            document.getElementById(category).classList.add('active');
            
            // Update map filter if exists
            const mapFilter = document.querySelector(`.map-filter[data-filter="${category}"]`);
            if (mapFilter) {
                document.querySelectorAll('.map-filter').forEach(f => f.classList.remove('active'));
                mapFilter.classList.add('active');
                
                // Trigger map filter update
                if (window.updateMapFilter) {
                    window.updateMapFilter(category);
                }
            }
            
            // Track category view
            trackEvent('client_category_view', { category: category });
        });
    });
}

function openCaseStudy(clientId) {
    const caseStudies = {
        'army-chennai': {
            title: 'Indian Army, Chennai - Solar Steam Cooking System',
            client: 'Indian Army, Chennai',
            location: 'Chennai, Tamil Nadu',
            installation: '500-meal solar steam cooking system',
            year: '2022',
            challenge: 'High LPG consumption in army mess affecting operational budgets and creating supply chain vulnerabilities',
            solution: 'Installation of 500-meal capacity solar steam cooking system with hybrid LPG backup',
            results: [
                '65% reduction in LPG consumption',
                'Annual savings: ₹ 18,00,000',
                'CO₂ reduction: 120 tons/year',
                'ROI period: 3.2 years',
                'System availability: 98.5%'
            ],
            impact: {
                financial: '₹ 18L annual savings',
                environmental: '120 tons CO₂/year reduction',
                social: 'Energy security for 1000+ personnel',
                operational: 'Reduced supply chain dependency'
            },
            images: [
                'assets/images/case-studies/army-1.jpg',
                'assets/images/case-studies/army-2.jpg',
                'assets/images/case-studies/army-3.jpg'
            ],
            documents: [
                {name: 'Detailed Case Study PDF', url: 'assets/documents/case-studies/army-chennai.pdf'},
                {name: 'Performance Report', url: 'assets/documents/reports/army-performance.pdf'},
                {name: 'ROI Analysis', url: 'assets/documents/reports/army-roi.pdf'}
            ]
        },
        'ins-mandovi': {
            title: 'INS Mandovi, Goa - Naval Base Solar Kitchen',
            client: 'INS Mandovi, Goa',
            location: 'Goa',
            installation: 'Naval base solar cooking system',
            year: '2021',
            challenge: 'Need for reliable, sustainable cooking solution in coastal environment with space constraints',
            solution: 'Compact solar steam cooking system with corrosion-resistant materials for coastal conditions',
            results: [
                '70% reduction in conventional fuel',
                'Operational since 2021 with 99% uptime',
                'Perfect for coastal high-humidity environment',
                'Low maintenance requirements',
                'Enhanced energy security'
            ],
            impact: {
                financial: '₹ 22L annual savings',
                environmental: '95 tons CO₂/year reduction',
                operational: 'Proven reliability in harsh conditions',
                strategic: 'Energy independence for defense establishment'
            },
            images: [
                'assets/images/case-studies/navy-1.jpg',
                'assets/images/case-studies/navy-2.jpg'
            ],
            documents: [
                {name: 'Naval Installation Case Study', url: 'assets/documents/case-studies/ins-mandovi.pdf'},
                {name: 'Coastal Performance Report', url: 'assets/documents/reports/coastal-performance.pdf'}
            ]
        }
    };
    
    const data = caseStudies[clientId];
    if (!data) {
        // Redirect to case studies page
        window.location.href = 'case-studies.html';
        return;
    }
    
    // Create modal for case study
    const modal = document.createElement('div');
    modal.className = 'case-study-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h2>${data.title}</h2>
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-body">
                <div class="case-study-overview">
                    <div class="overview-item">
                        <span class="label">Client:</span>
                        <span class="value">${data.client}</span>
                    </div>
                    <div class="overview-item">
                        <span class="label">Location:</span>
                        <span class="value">${data.location}</span>
                    </div>
                    <div class="overview-item">
                        <span class="label">Installation:</span>
                        <span class="value">${data.installation}</span>
                    </div>
                    <div class="overview-item">
                        <span class="label">Year:</span>
                        <span class="value">${data.year}</span>
                    </div>
                </div>
                
                <div class="case-study-details">
                    <div class="detail-section">
                        <h3>The Challenge</h3>
                        <p>${data.challenge}</p>
                    </div>
                    
                    <div class="detail-section">
                        <h3>Our Solution</h3>
                        <p>${data.solution}</p>
                    </div>
                    
                    <div class="detail-section">
                        <h3>Results & Impact</h3>
                        <ul class="results-list">
                            ${data.results.map(r => `<li>${r}</li>`).join('')}
                        </ul>
                        
                        <div class="impact-grid">
                            <div class="impact-card financial">
                                <div class="impact-icon">💰</div>
                                <div class="impact-value">${data.impact.financial}</div>
                                <div class="impact-label">Financial Impact</div>
                            </div>
                            <div class="impact-card environmental">
                                <div class="impact-icon">🌍</div>
                                <div class="impact-value">${data.impact.environmental}</div>
                                <div class="impact-label">Environmental Impact</div>
                            </div>
                            <div class="impact-card social">
                                <div class="impact-icon">👥</div>
                                <div class="impact-value">${data.impact.social}</div>
                                <div class="impact-label">Social Impact</div>
                            </div>
                            <div class="impact-card operational">
                                <div class="impact-icon">⚙️</div>
                                <div class="impact-value">${data.impact.operational}</div>
                                <div class="impact-label">Operational Impact</div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="detail-section">
                        <h3>Project Gallery</h3>
                        <div class="project-gallery">
                            ${data.images.map((img, index) => `
                                <div class="gallery-item">
                                    <img src="${img}" alt="Project image ${index + 1}" 
                                         onerror="this.src='assets/images/default-project.jpg'">
                                </div>
                            `).join('')}
                        </div>
                    </div>
                    
                    <div class="detail-section">
                        <h3>Download Documents</h3>
                        <div class="document-list">
                            ${data.documents.map(doc => `
                                <a href="${doc.url}" class="document-link" target="_blank" download>
                                    <span class="doc-icon">📄</span>
                                    <span class="doc-name">${doc.name}</span>
                                    <span class="doc-size">PDF</span>
                                </a>
                            `).join('')}
                        </div>
                    </div>
                </div>
                
                <div class="case-study-cta">
                    <p>Interested in a similar solution for your organization?</p>
                    <div class="cta-buttons">
                        <button class="btn-primary request-quote" data-client="${clientId}">
                            Request Custom Quote
                        </button>
                        <button class="btn-secondary schedule-visit" data-client="${clientId}">
                            Schedule Site Visit
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Close modal
    modal.querySelector('.modal-close').addEventListener('click', () => {
        modal.remove();
    });
    
    // Close on outside click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
    
    // CTA buttons
    modal.querySelector('.request-quote').addEventListener('click', () => {
        window.location.href = `contact-partnerships.html?client=${clientId}&type=quote`;
    });
    
    modal.querySelector('.schedule-visit').addEventListener('click', () => {
        window.location.href = `contact-partnerships.html?client=${clientId}&type=visit`;
    });
    
    // Initialize gallery
    initCaseStudyGallery(modal);
    
    // Track case study view
    trackEvent('case_study_view', { client: clientId });
}

function initCaseStudyGallery(modal) {
    const galleryItems = modal.querySelectorAll('.gallery-item');
    if (galleryItems.length > 0) {
        // Simple lightbox functionality
        galleryItems.forEach(item => {
            item.addEventListener('click', function() {
                const imgSrc = this.querySelector('img').src;
                openLightbox(imgSrc);
            });
        });
    }
}

function openLightbox(imageSrc) {
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
        <div class="lightbox-content">
            <img src="${imageSrc}" alt="Full size image">
            <button class="lightbox-close">&times;</button>
            <button class="lightbox-prev">←</button>
            <button class="lightbox-next">→</button>
        </div>
    `;
    
    document.body.appendChild(lightbox);
    
    // Close lightbox
    lightbox.querySelector('.lightbox-close').addEventListener('click', () => {
        lightbox.remove();
    });
    
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.remove();
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
        // Hide all slides
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        // Show current slide
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
    
    // Auto-rotate every 8 seconds
    let autoRotate = setInterval(nextSlide, 8000);
    
    // Pause auto-rotate on hover
    const carousel = document.querySelector('.testimonial-carousel');
    carousel.addEventListener('mouseenter', () => {
        clearInterval(autoRotate);
    });
    
    carousel.addEventListener('mouseleave', () => {
        autoRotate = setInterval(nextSlide, 8000);
    });
    
    // Navigation controls
    if (prevBtn) prevBtn.addEventListener('click', () => {
        clearInterval(autoRotate);
        prevSlide();
        autoRotate = setInterval(nextSlide, 8000);
    });
    
    if (nextBtn) nextBtn.addEventListener('click', () => {
        clearInterval(autoRotate);
        nextSlide();
        autoRotate = setInterval(nextSlide, 8000);
    });
    
    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            clearInterval(autoRotate);
            showSlide(index);
            autoRotate = setInterval(nextSlide, 8000);
        });
    });
    
    // Initialize first slide
    showSlide(0);
}

function initClientCards() {
    const clientCards = document.querySelectorAll('.client-card');
    
    clientCards.forEach(card => {
        // Add hover effect
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 20px 40px rgba(0,0,0,0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
        });
        
        // Add click to view more details
        const viewBtn = card.querySelector('.view-case-study');
        if (!viewBtn) {
            card.style.cursor = 'pointer';
            card.addEventListener('click', function() {
                const clientName = this.querySelector('h3').textContent;
                showClientQuickView(clientName);
            });
        }
    });
}

function showClientQuickView(clientName) {
    // Quick view modal for client details
    const quickView = document.createElement('div');
    quickView.className = 'quick-view-modal';
    
    // Simplified client info
    quickView.innerHTML = `
        <div class="quick-view-content">
            <h3>${clientName}</h3>
            <p>Detailed information about this client is available in our case studies.</p>
            <div class="quick-view-actions">
                <a href="case-studies.html" class="btn-small">View Case Studies</a>
                <button class="btn-small btn-outline close-quick-view">Close</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(quickView);
    
    // Close quick view
    quickView.querySelector('.close-quick-view').addEventListener('click', () => {
        quickView.remove();
    });
    
    quickView.addEventListener('click', (e) => {
        if (e.target === quickView) {
            quickView.remove();
        }
    });
}

// Partnership inquiry form handler
function initPartnershipInquiry() {
    document.querySelectorAll('.partnership-card a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const partnershipType = this.closest('.partnership-card').querySelector('h3').textContent;
            const url = this.href + '?partnership=' + encodeURIComponent(partnershipType);
            
            // Store partnership type in session for form pre-fill
            sessionStorage.setItem('partnership_type', partnershipType);
            
            // Navigate to contact page
            window.location.href = url;
        });
    });
}

// Initialize partnership inquiry
initPartnershipInquiry();