// Innovation Lab - Interactive Features
document.addEventListener('DOMContentLoaded', function() {
    initInnovationLab();
    initTechAnimations();
    initRoadmapInteraction();
    initPilotProjects();
});

function initInnovationLab() {
    // Tech focus cards interaction
    const focusCards = document.querySelectorAll('.focus-card');
    
    focusCards.forEach(card => {
        const detailsBtn = card.querySelector('.tech-details-btn');
        const detailsSection = card.querySelector('.focus-details');
        
        // Toggle details on card click
        card.addEventListener('click', function(e) {
            if (!e.target.classList.contains('tech-details-btn')) {
                this.classList.toggle('expanded');
                detailsSection.style.display = 
                    this.classList.contains('expanded') ? 'block' : 'none';
            }
        });
        
        // Details button click
        if (detailsBtn) {
            detailsBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                const tech = card.dataset.tech;
                openTechModal(tech);
            });
        }
    });
    
    // Initialize status indicators
    initStatusIndicators();
}

function openTechModal(tech) {
    const techData = {
        'thermal-storage': {
            title: 'Sand Battery Thermal Storage',
            description: 'High-density thermal energy storage using sand as the storage medium',
            features: [
                'Storage capacity: 500-600°C',
                'Heat retention: 48-72 hours',
                'Modular design: 1-100 MWh',
                'Round-trip efficiency: 90%',
                'Materials: Local silica sand, steel casing'
            ],
            applications: [
                'Industrial process heat',
                'Community cooking',
                'District heating',
                'Agricultural drying'
            ],
            status: 'Pilot Phase',
            timeline: 'Commercial launch Q2 2025',
            documents: [
                {name: 'Technical White Paper', url: 'assets/documents/whitepapers/sand-battery.pdf'},
                {name: 'Performance Data', url: 'assets/documents/research/thermal-storage-data.pdf'},
                {name: 'Research Paper', url: 'assets/documents/research/sand-battery-ijee.pdf'}
            ]
        },
        'ai-agriculture': {
            title: 'AI-Powered Crop Quality Detection',
            description: 'Computer vision system for real-time crop grading and quality assessment',
            features: [
                'Processing speed: 10,000 units/minute',
                'Accuracy: 99% for major crops',
                'Mobile app integration',
                'Offline capability',
                'Multi-language support'
            ],
            applications: [
                'Coffee bean grading',
                'Spice quality detection',
                'Fruit sorting',
                'Grain quality assessment'
            ],
            status: 'Development Phase',
            timeline: 'Beta launch Q4 2024',
            documents: [
                {name: 'AI Model Specifications', url: 'assets/documents/whitepapers/ai-agri-model.pdf'},
                {name: 'Field Trial Results', url: 'assets/documents/research/ai-field-trials.pdf'},
                {name: 'Integration Guide', url: 'assets/documents/manuals/ai-integration.pdf'}
            ]
        }
    };
    
    const data = techData[tech];
    if (!data) return;
    
    // Create modal
    const modal = document.createElement('div');
    modal.className = 'tech-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h2>${data.title}</h2>
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-body">
                <div class="tech-overview">
                    <p class="tech-description">${data.description}</p>
                    <div class="tech-status">
                        <span class="status-badge">${data.status}</span>
                        <span class="timeline">${data.timeline}</span>
                    </div>
                </div>
                
                <div class="tech-details-grid">
                    <div class="detail-section">
                        <h4>Key Features</h4>
                        <ul class="feature-list">
                            ${data.features.map(f => `<li>${f}</li>`).join('')}
                        </ul>
                    </div>
                    
                    <div class="detail-section">
                        <h4>Applications</h4>
                        <ul class="application-list">
                            ${data.applications.map(a => `<li>${a}</li>`).join('')}
                        </ul>
                    </div>
                </div>
                
                <div class="tech-documents">
                    <h4>Technical Documents</h4>
                    <div class="document-list">
                        ${data.documents.map(doc => `
                            <a href="${doc.url}" class="document-link" target="_blank" download>
                                <span class="doc-icon">📄</span>
                                <span class="doc-name">${doc.name}</span>
                                <span class="doc-download">Download</span>
                            </a>
                        `).join('')}
                    </div>
                </div>
                
                <div class="tech-cta">
                    <button class="btn-primary contact-expert-btn" data-tech="${tech}">
                        Contact Technical Expert
                    </button>
                    <button class="btn-secondary schedule-demo-btn" data-tech="${tech}">
                        Schedule Live Demo
                    </button>
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
    modal.querySelector('.contact-expert-btn').addEventListener('click', () => {
        window.location.href = `contact-partnerships.html?tech=${tech}&type=expert`;
    });
    
    modal.querySelector('.schedule-demo-btn').addEventListener('click', () => {
        window.location.href = `contact-partnerships.html?tech=${tech}&type=demo`;
    });
    
    // Add to analytics
    trackEvent('tech_modal_open', { technology: tech });
}

function initTechAnimations() {
    // Animated tech circles
    const techCircles = document.querySelectorAll('.tech-circle');
    
    techCircles.forEach((circle, index) => {
        // Random floating animation
        const duration = 3 + Math.random() * 2;
        const delay = index * 0.5;
        
        circle.style.animation = `
            float ${duration}s ease-in-out ${delay}s infinite alternate
        `;
        
        // Add interaction
        circle.addEventListener('mouseenter', () => {
            circle.style.transform = 'scale(1.2)';
            circle.style.filter = 'drop-shadow(0 5px 15px rgba(0,0,0,0.3))';
        });
        
        circle.addEventListener('mouseleave', () => {
            circle.style.transform = 'scale(1)';
            circle.style.filter = 'none';
        });
    });
    
    // Add CSS for float animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(5deg); }
            100% { transform: translateY(0px) rotate(0deg); }
        }
    `;
    document.head.appendChild(style);
}

function initStatusIndicators() {
    const statusBadges = document.querySelectorAll('.status-pilot, .status-development, .status-prototype');
    
    statusBadges.forEach(badge => {
        // Add pulse animation based on status
        if (badge.classList.contains('status-pilot')) {
            badge.style.animation = 'pulse 2s ease-in-out infinite';
        } else if (badge.classList.contains('status-development')) {
            badge.style.animation = 'pulse 3s ease-in-out infinite';
        }
    });
}

function initRoadmapInteraction() {
    const roadmapPhases = document.querySelectorAll('.roadmap-phase');
    
    roadmapPhases.forEach(phase => {
        const objectives = phase.querySelector('.phase-objectives');
        
        phase.addEventListener('click', () => {
            const isExpanded = phase.classList.contains('expanded');
            
            // Toggle all phases
            roadmapPhases.forEach(p => {
                p.classList.remove('expanded');
                p.querySelector('.phase-objectives').style.maxHeight = '0';
            });
            
            if (!isExpanded) {
                phase.classList.add('expanded');
                objectives.style.maxHeight = objectives.scrollHeight + 'px';
            }
        });
        
        // Initialize with current phase expanded
        if (phase.querySelector('.phase-status.current')) {
            phase.classList.add('expanded');
            objectives.style.maxHeight = objectives.scrollHeight + 'px';
        }
    });
}

function initPilotProjects() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    let currentIndex = 0;
    
    // Auto-rotate through pilot projects
    function rotatePilotProjects() {
        timelineItems.forEach(item => item.classList.remove('active'));
        
        currentIndex = (currentIndex + 1) % timelineItems.length;
        timelineItems[currentIndex].classList.add('active');
    }
    
    // Start rotation every 10 seconds
    setInterval(rotatePilotProjects, 10000);
    
    // Manual control
    timelineItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            timelineItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');
            currentIndex = index;
        });
    });
    
    // Add visual indicators for metrics
    const metrics = document.querySelectorAll('.pilot-metrics .metric-value');
    metrics.forEach(metric => {
        const value = parseInt(metric.textContent);
        
        // Add color coding based on value
        if (value >= 1000) {
            metric.style.color = 'var(--accent-orange)';
        } else if (value >= 100) {
            metric.style.color = 'var(--solar-yellow)';
        } else {
            metric.style.color = 'var(--eco-green)';
        }
    });
}

// Export functionality for research papers
function initResearchExport() {
    // Generate BibTeX for research papers
    document.querySelectorAll('.research-export').forEach(btn => {
        btn.addEventListener('click', function() {
            const paperId = this.dataset.paper;
            const bibtex = generateBibTeX(paperId);
            
            // Copy to clipboard
            navigator.clipboard.writeText(bibtex).then(() => {
                showNotification('BibTeX citation copied to clipboard!');
            });
        });
    });
}

function generateBibTeX(paperId) {
    const papers = {
        'thermal-storage-2023': `
@article{kvb2023thermal,
  title={High-Density Sand Battery for Solar Thermal Storage},
  author={KVB Research Team},
  journal={International Journal of Energy Engineering},
  volume={15},
  number={3},
  pages={245--260},
  year={2023},
  publisher={Springer}
}
        `,
        'ai-agri-2023': `
@inproceedings{kvb2023aiagri,
  title={AI-Powered Crop Quality Detection System},
  author={KVB AI Lab},
  booktitle={Proceedings of International Conference on Agri-Tech},
  pages={112--125},
  year={2023}
}
        `
    };
    
    return papers[paperId] || '';
}

// Innovation metrics dashboard
function initInnovationDashboard() {
    // Real-time innovation metrics
    const dashboardData = {
        projects: 15,
        researchers: 8,
        patents: 5,
        collaborations: 12,
        publications: 23,
        fieldTrials: 9
    };
    
    // Update dashboard every minute
    setInterval(() => {
        // Simulate small updates
        dashboardData.fieldTrials += Math.floor(Math.random() * 2);
        dashboardData.publications += Math.floor(Math.random() * 1);
        
        // Update display if elements exist
        const trialElement = document.querySelector('[data-metric="trials"]');
        const pubElement = document.querySelector('[data-metric="publications"]');
        
        if (trialElement) trialElement.textContent = dashboardData.fieldTrials;
        if (pubElement) pubElement.textContent = dashboardData.publications;
    }, 60000);
}