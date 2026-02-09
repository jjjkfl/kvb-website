// About Page - Interactive Features
document.addEventListener('DOMContentLoaded', function() {
    initAboutPage();
    initTimelineAnimations();
    initTeamCards();
    initAchievementTimeline();
    initFounderProfile();
});

function initAboutPage() {
    // Set institutional tone based on audience
    const audience = sessionStorage.getItem('kvb_audience');
    if (audience === 'investor' || audience === 'researcher') {
        // Show more technical/investor focused content
        document.querySelector('.institutional-cta').style.display = 'block';
        
        // Track investor/researcher views
        trackEvent('about_page_view', { 
            audience: audience,
            focus: 'institutional_technical' 
        });
    }
    
    // Initialize value item animations
    const valueItems = document.querySelectorAll('.value-item');
    valueItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`;
        item.classList.add('animate-in');
    });
    
    // Initialize advantage cards hover effects
    const advantageCards = document.querySelectorAll('.advantage-card');
    advantageCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 20px 40px rgba(0,0,0,0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
        });
    });
}

function initTimelineAnimations() {
    const milestones = document.querySelectorAll('.timeline-milestone');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 200);
            }
        });
    }, { threshold: 0.3 });
    
    milestones.forEach(milestone => observer.observe(milestone));
    
    // Add CSS for timeline animations
    const style = document.createElement('style');
    style.textContent = `
        .timeline-milestone {
            opacity: 0;
            transform: translateX(-20px);
            transition: all 0.6s ease;
        }
        
        .timeline-milestone.visible {
            opacity: 1;
            transform: translateX(0);
        }
        
        .timeline-milestone:nth-child(even) {
            transform: translateX(20px);
        }
        
        .timeline-milestone:nth-child(even).visible {
            transform: translateX(0);
        }
    `;
    document.head.appendChild(style);
}

function initTeamCards() {
    const teamCards = document.querySelectorAll('.team-card');
    
    teamCards.forEach(card => {
        // Add click to expand details
        card.addEventListener('click', function() {
            this.classList.toggle('expanded');
            
            // Show more details when expanded
            if (this.classList.contains('expanded')) {
                const teamType = this.querySelector('h3').textContent;
                showTeamDetails(teamType, this);
            }
        });
        
        // Add hover effects
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });
        
        card.addEventListener('mouseleave', function() {
            if (!this.classList.contains('expanded')) {
                this.style.transform = 'scale(1)';
            }
        });
    });
}

function showTeamDetails(teamType, cardElement) {
    const teamDetails = {
        'R&D Engineers': {
            expertise: ['Thermal Engineering', 'Materials Science', 'AI/ML Algorithms', 'System Design'],
            qualifications: ['PhD (15%)', 'MTech (60%)', 'BTech (25%)'],
            projects: ['Sand Battery R&D', 'AI Crop Models', 'Thermal Efficiency', 'New Materials'],
            patents: 8,
            publications: 23
        },
        'Project Engineers': {
            expertise: ['Solar Installation', 'Civil Works', 'Electrical Systems', 'Commissioning'],
            qualifications: ['MTech (40%)', 'BTech (50%)', 'Diploma (10%)'],
            projects: ['Army Installations', 'University Projects', 'Industrial Systems', 'Community Kitchens'],
            installations: 150,
            experience: '15+ years average'
        },
        'Agri-Tech Specialists': {
            expertise: ['Crop Science', 'Drying Technology', 'Farmer Training', 'Value Chain'],
            qualifications: ['PhD Agriculture (30%)', 'MS Agriculture (50%)', 'BTech (20%)'],
            projects: ['Solar Drying Systems', 'Crop Quality AI', 'Farmer Platforms', 'Market Linkages'],
            crops: 50,
            farmers: '10,000+ trained'
        },
        'Partnership Managers': {
            expertise: ['Government Liaison', 'Institutional Relations', 'Contract Management', 'Stakeholder Engagement'],
            qualifications: ['MBA (60%)', 'Engineering + MBA (30%)', 'Other (10%)'],
            projects: ['MNRE Certification', 'UNIDO Empanelment', 'University MoUs', 'Industry Alliances'],
            partners: 100,
            successRate: '95%'
        }
    };
    
    const details = teamDetails[teamType];
    if (!details) return;
    
    // Create detailed view
    const detailDiv = document.createElement('div');
    detailDiv.className = 'team-detail-expanded';
    detailDiv.innerHTML = `
        <div class="detail-content">
            <h4>${teamType} - Detailed Profile</h4>
            
            <div class="detail-section">
                <h5>Expertise Areas</h5>
                <div class="expertise-tags">
                    ${details.expertise.map(exp => `<span class="expertise-tag">${exp}</span>`).join('')}
                </div>
            </div>
            
            <div class="detail-section">
                <h5>Qualifications</h5>
                <div class="qualifications">
                    ${details.qualifications.map(qual => `<div class="qual-item">${qual}</div>`).join('')}
                </div>
            </div>
            
            <div class="detail-section">
                <h5>Key Projects</h5>
                <ul class="project-list">
                    ${details.projects.map(proj => `<li>${proj}</li>`).join('')}
                </ul>
            </div>
            
            <div class="detail-section">
                <h5>Performance Metrics</h5>
                <div class="metrics-grid">
                    ${Object.entries(details).filter(([key, value]) => 
                        typeof value === 'number' || key.includes('Rate') || key.includes('crops') || key.includes('farmers')
                    ).map(([key, value]) => `
                        <div class="metric-item">
                            <div class="metric-value">${value}</div>
                            <div class="metric-label">${key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</div>
                        </div>
                    `).join('')}
                </div>
            </div>
            
            <button class="btn-small close-detail">Close Details</button>
        </div>
    `;
    
    // Add to card
    const existingDetail = cardElement.querySelector('.team-detail-expanded');
    if (existingDetail) {
        existingDetail.remove();
    } else {
        cardElement.appendChild(detailDiv);
        
        // Close button
        detailDiv.querySelector('.close-detail').addEventListener('click', function(e) {
            e.stopPropagation();
            cardElement.classList.remove('expanded');
            detailDiv.remove();
        });
        
        // Track team detail view
        trackEvent('team_detail_view', { team_type: teamType });
    }
}

function initAchievementTimeline() {
    const achievementYears = document.querySelectorAll('.achievement-year');
    
    // Add click to expand/collapse
    achievementYears.forEach(yearElement => {
        const year = yearElement.querySelector('.year');
        const achievements = yearElement.querySelector('.achievements-list');
        
        year.addEventListener('click', function() {
            const isExpanded = yearElement.classList.contains('expanded');
            
            // Close all others
            achievementYears.forEach(y => {
                y.classList.remove('expanded');
                y.querySelector('.achievements-list').style.maxHeight = '0';
            });
            
            // Toggle this one
            if (!isExpanded) {
                yearElement.classList.add('expanded');
                achievements.style.maxHeight = achievements.scrollHeight + 'px';
            }
        });
        
        // Initialize with first year expanded
        if (yearElement === achievementYears[0]) {
            yearElement.classList.add('expanded');
            achievements.style.maxHeight = achievements.scrollHeight + 'px';
        } else {
            achievements.style.maxHeight = '0';
        }
    });
    
    // Add year hover effects
    achievementYears.forEach(yearElement => {
        yearElement.addEventListener('mouseenter', function() {
            const year = this.querySelector('.year');
            year.style.transform = 'scale(1.1)';
            year.style.color = 'var(--accent-orange)';
        });
        
        yearElement.addEventListener('mouseleave', function() {
            const year = this.querySelector('.year');
            year.style.transform = 'scale(1)';
            if (!this.classList.contains('expanded')) {
                year.style.color = '';
            }
        });
    });
}

function initFounderProfile() {
    const founderImage = document.querySelector('.founder-image img');
    const founderBadge = document.querySelector('.founder-badge');
    
    if (founderImage && founderBadge) {
        // Add parallax effect on scroll
        window.addEventListener('scroll', () => {
            const scrollPosition = window.pageYOffset;
            const founderSection = document.querySelector('.founder-profile');
            const sectionTop = founderSection.offsetTop;
            const sectionHeight = founderSection.offsetHeight;
            
            if (scrollPosition > sectionTop - window.innerHeight / 2 && 
                scrollPosition < sectionTop + sectionHeight) {
                
                const progress = (scrollPosition - sectionTop + window.innerHeight / 2) / sectionHeight;
                const translateY = progress * 50;
                
                founderImage.style.transform = `translateY(${translateY}px)`;
                founderBadge.style.transform = `translateY(${translateY * 0.5}px)`;
            }
        });
        
        // Add image hover effect
        founderImage.addEventListener('mouseenter', function() {
            this.style.transform += ' scale(1.02)';
            founderBadge.style.transform += ' scale(1.05)';
        });
        
        founderImage.addEventListener('mouseleave', function() {
            this.style.transform = this.style.transform.replace(' scale(1.02)', '');
            founderBadge.style.transform = founderBadge.style.transform.replace(' scale(1.05)', '');
        });
    }
    
    // Founder quote animation
    const founderQuote = document.querySelector('.founder-quote-large p');
    if (founderQuote) {
        // Split text into words for animation
        const text = founderQuote.textContent;
        founderQuote.innerHTML = text.split(' ').map((word, index) => 
            `<span class="word" style="--delay: ${index * 0.05}s">${word}</span>`
        ).join(' ');
        
        // Add CSS for word animation
        const style = document.createElement('style');
        style.textContent = `
            .founder-quote-large .word {
                opacity: 0;
                animation: fadeInWord 0.5s ease var(--delay) forwards;
                display: inline-block;
            }
            
            @keyframes fadeInWord {
                from {
                    opacity: 0;
                    transform: translateY(10px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Collaboration network visualization
function initCollaborationNetwork() {
    const collabItems = document.querySelectorAll('.collab-item');
    const linesCanvas = document.createElement('canvas');
    linesCanvas.className = 'collab-lines';
    document.querySelector('.collab-grid').appendChild(linesCanvas);
    
    const ctx = linesCanvas.getContext('2d');
    
    // Set canvas size
    function resizeCanvas() {
        const container = document.querySelector('.collab-grid');
        linesCanvas.width = container.offsetWidth;
        linesCanvas.height = container.offsetHeight;
        drawLines();
    }
    
    function drawLines() {
        if (!ctx) return;
        
        // Clear canvas
        ctx.clearRect(0, 0, linesCanvas.width, linesCanvas.height);
        
        // Get positions of all collab items
        const positions = [];
        collabItems.forEach(item => {
            const rect = item.getBoundingClientRect();
            const containerRect = linesCanvas.getBoundingClientRect();
            
            positions.push({
                x: rect.left + rect.width / 2 - containerRect.left,
                y: rect.top + rect.height / 2 - containerRect.top,
                type: item.querySelector('.collab-type').textContent
            });
        });
        
        // Draw connecting lines
        ctx.strokeStyle = 'rgba(11, 61, 145, 0.2)';
        ctx.lineWidth = 1;
        
        for (let i = 0; i < positions.length; i++) {
            for (let j = i + 1; j < positions.length; j++) {
                // Only connect items of similar type or close proximity
                const distance = Math.sqrt(
                    Math.pow(positions[i].x - positions[j].x, 2) + 
                    Math.pow(positions[i].y - positions[j].y, 2)
                );
                
                if (distance < 200 || positions[i].type === positions[j].type) {
                    ctx.beginPath();
                    ctx.moveTo(positions[i].x, positions[i].y);
                    ctx.lineTo(positions[j].x, positions[j].y);
                    ctx.stroke();
                }
            }
        }
        
        // Draw nodes
        positions.forEach(pos => {
            ctx.fillStyle = getColorForType(pos.type);
            ctx.beginPath();
            ctx.arc(pos.x, pos.y, 5, 0, Math.PI * 2);
            ctx.fill();
        });
    }
    
    function getColorForType(type) {
        const colors = {
            'International Empanelment': '#0B3D91',
            'Research Partnership': '#3A7D44',
            'Government Certification': '#FDB813',
            'Implementation Partner': '#FF6F00',
            'State Agency Partnership': '#6C757D',
            'Testing & Validation': '#17A2B8'
        };
        return colors[type] || '#0B3D91';
    }
    
    // Initialize and handle resize
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Redraw on item hover
    collabItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
            this.style.zIndex = '10';
            drawLines();
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.zIndex = '';
            drawLines();
        });
    });
}

// Initialize when page loads
setTimeout(initCollaborationNetwork, 1000);

// Export company data for institutional partners
function exportCompanyProfile() {
    const companyData = {
        name: 'KVB Green Energies',
        established: '1990',
        focus: ['Solar Thermal Energy', 'Smart Agriculture', 'Energy Storage', 'AI Agriculture'],
        teamSize: '50+ experts',
        locations: ['Headquarters', 'R&D Center', 'Manufacturing Unit', 'Field Offices'],
        certifications: ['MNRE Certified', 'UNIDO Empaneled', 'UHS Tested'],
        partners: {
            government: ['Indian Army', 'INS Mandovi', 'YASHADA', 'NABARD'],
            education: ['IIT Dharwad', 'UAS Bengaluru', 'UHS Bagalkot', 'KLE Tech'],
            research: ['UNIDO', 'ICAR', 'Coffee Board'],
            industry: ['Sugati Ingredients', 'Nithya Foods', 'Prakruti']
        },
        achievements: {
            installations: '150+',
            states: '8',
            impact: {
                co2Reduced: '1000+ tons',
                farmersSupported: '10000+',
                fuelSaved: '500+ tons LPG equivalent'
            }
        }
    };
    
    return companyData;
}

// Make company profile available for download
function initCompanyProfileDownload() {
    const downloadBtn = document.createElement('button');
    downloadBtn.className = 'profile-download-btn';
    downloadBtn.innerHTML = '📥 Download Company Profile';
    
    const ctaSection = document.querySelector('.institutional-cta .cta-buttons');
    if (ctaSection) {
        ctaSection.appendChild(downloadBtn);
        
        downloadBtn.addEventListener('click', function() {
            const profileData = exportCompanyProfile();
            const blob = new Blob([JSON.stringify(profileData, null, 2)], { 
                type: 'application/json' 
            });
            const url = URL.createObjectURL(blob);
            
            const a = document.createElement('a');
            a.href = url;
            a.download = 'kvb-green-energies-company-profile.json';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            
            // Track download
            trackEvent('company_profile_download', {
                format: 'json',
                timestamp: new Date().toISOString()
            });
        });
    }
}

// Initialize profile download
initCompanyProfileDownload();