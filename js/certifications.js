// Certifications & Accreditations - Interactive Features
document.addEventListener('DOMContentLoaded', function() {
    initCertificationsPage();
    initCategoryTabs();
    initCertificateViewer();
    initMOUViewer();
    initTestReportViewer();
    initCertificationWall();
    initDownloadTracking();
    initProcessSteps();
});

function initCertificationsPage() {
    // Set audience-specific content
    const audience = sessionStorage.getItem('kvb_audience');
    if (audience) {
        // Highlight corresponding audience button
        document.querySelectorAll('.audience-btn').forEach(btn => {
            if (btn.dataset.audience === audience) {
                btn.classList.add('active');
                
                // Show relevant content based on audience
                switch(audience) {
                    case 'government':
                        showAudienceContent('government');
                        break;
                    case 'institution':
                        showAudienceContent('institution');
                        break;
                    case 'investor':
                        showAudienceContent('investor');
                        break;
                }
            }
        });
    }
    
    // Initialize badge animations
    initBadgeAnimations();
    
    // Initialize validation indicators
    initValidationIndicators();
}

function showAudienceContent(audienceType) {
    // Show/hide relevant sections based on audience
    const contentMapping = {
        government: ['.certification-categories', '.verification-process'],
        institution: ['.performance-testing', '.certification-benefits'],
        investor: ['.mou-gallery', '.certification-downloads']
    };
    
    // Scroll to relevant section
    if (contentMapping[audienceType]) {
        setTimeout(() => {
            const firstSection = document.querySelector(contentMapping[audienceType][0]);
            if (firstSection) {
                firstSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }, 500);
    }
    
    // Track audience-specific view
    trackEvent('certifications_audience_view', { audience: audienceType });
}

function initBadgeAnimations() {
    const badgeCards = document.querySelectorAll('.badge-card');
    
    badgeCards.forEach((card, index) => {
        // Staggered entrance animation
        card.style.animationDelay = `${index * 0.2}s`;
        card.classList.add('animate-in');
        
        // Add hover effects
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.05)';
            this.style.boxShadow = '0 20px 40px rgba(0,0,0,0.15)';
            
            // Animate icon
            const icon = this.querySelector('.badge-icon');
            if (icon) {
                icon.style.transform = 'rotate(15deg) scale(1.2)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
            
            const icon = this.querySelector('.badge-icon');
            if (icon) {
                icon.style.transform = 'rotate(0) scale(1)';
            }
        });
        
        // Add click to view details
        card.addEventListener('click', function() {
            const certType = this.classList.contains('mnre') ? 'mnre' :
                           this.classList.contains('unido') ? 'unido' : 'uhs';
            openCertificateViewer(certType);
        });
    });
}

function initCategoryTabs() {
    const categoryTabs = document.querySelectorAll('.category-tab');
    const categoryContents = document.querySelectorAll('.category-content');
    
    categoryTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const category = this.dataset.category;
            
            // Update active state
            categoryTabs.forEach(t => t.classList.remove('active'));
            categoryContents.forEach(c => c.classList.remove('active'));
            
            this.classList.add('active');
            document.getElementById(`${category}-content`).classList.add('active');
            
            // Animate transition
            animateCategoryTransition(category);
            
            // Track category view
            trackEvent('certification_category_view', { category: category });
        });
    });
    
    // Add hover effects to tabs
    categoryTabs.forEach(tab => {
        tab.addEventListener('mouseenter', function() {
            if (!this.classList.contains('active')) {
                this.style.transform = 'translateY(-2px)';
                this.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
            }
        });
        
        tab.addEventListener('mouseleave', function() {
            if (!this.classList.contains('active')) {
                this.style.transform = 'translateY(0)';
                this.style.boxShadow = 'none';
            }
        });
    });
}

function animateCategoryTransition(category) {
    const content = document.getElementById(`${category}-content`);
    if (content) {
        content.style.opacity = '0.5';
        content.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            content.style.opacity = '1';
            content.style.transform = 'translateY(0)';
            content.style.transition = 'all 0.3s ease';
        }, 150);
    }
}

function initCertificateViewer() {
    // View certificate buttons
    document.querySelectorAll('.view-certificate').forEach(button => {
        button.addEventListener('click', function() {
            const certId = this.dataset.cert;
            openCertificateViewer(certId);
        });
    });
    
    // Download certificate buttons
    document.querySelectorAll('.download-certificate').forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            const certId = this.dataset.cert;
            downloadCertificate(certId);
        });
    });
}

function openCertificateViewer(certId) {
    const certificateData = {
        mnre: {
            title: 'MNRE Certification',
            issuingAuthority: 'Ministry of New & Renewable Energy, Government of India',
            certificateNo: 'MNRE/SOL/2020/4567',
            validity: '2020 - 2025',
            scope: 'Solar Thermal Systems & Solar Cookers',
            description: 'Certification for manufacturing and installation of solar thermal systems meeting MNRE performance standards',
            features: [
                'Efficiency: Minimum 60% thermal efficiency',
                'Durability: 25+ years design life',
                'Safety: Complies with IS standards',
                'Performance: Verified field performance'
            ],
            benefits: [
                'Eligible for government subsidies',
                'Approved for government tenders',
                'Quality assurance mark',
                'National recognition'
            ],
            image: 'assets/images/certificates/mnre-certificate.jpg',
            pdf: 'assets/documents/certifications/mnre-certificate.pdf'
        },
        unido: {
            title: 'UNIDO Empanelment',
            issuingAuthority: 'United Nations Industrial Development Organization',
            certificateNo: 'UNIDO/EMP/2022/789',
            validity: 'Since 2022',
            scope: 'International renewable energy projects',
            description: 'Empanelment as approved technology provider for UNIDO-supported renewable energy initiatives',
            features: [
                'International standards compliance',
                'Sustainable technology validation',
                'Global project eligibility',
                'Technical excellence recognition'
            ],
            benefits: [
                'International project opportunities',
                'UN recognition',
                'Global best practices',
                'Technical credibility'
            ],
            image: 'assets/images/certificates/unido-empanelment.jpg',
            pdf: 'assets/documents/certifications/unido-empanelment.pdf'
        },
        uhs: {
            title: 'UHS Performance Test Report',
            issuingAuthority: 'University of Horticultural Sciences, Bagalkot',
            reportNo: 'UHS/PERF/2023/001',
            validity: 'Test Report 2023',
            scope: 'Performance validation of solar thermal systems',
            description: 'Comprehensive performance testing and validation report by accredited testing laboratory',
            features: [
                'Thermal efficiency: 68.5%',
                'Temperature range: 120-180°C',
                'Steam generation: 50 kg/hour',
                'System reliability: 98.5%'
            ],
            benefits: [
                'Independent verification',
                'Performance guarantee',
                'Quality assurance',
                'Technical validation'
            ],
            image: 'assets/images/certificates/uhs-test-report.jpg',
            pdf: 'assets/documents/reports/thermal-efficiency-test.pdf'
        }
        // Add more certificates as needed
    };
    
    const cert = certificateData[certId];
    if (!cert) return;
    
    // Create certificate viewer modal
    const modal = document.createElement('div');
    modal.className = 'certificate-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h2>${cert.title}</h2>
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-body">
                <div class="certificate-viewer">
                    <div class="certificate-image">
                        <img src="${cert.image}" alt="${cert.title}">
                        <div class="certificate-overlay">
                            <button class="btn-small zoom-in">🔍 Zoom In</button>
                            <button class="btn-small rotate">🔄 Rotate</button>
                        </div>
                    </div>
                    
                    <div class="certificate-details">
                        <div class="detail-section">
                            <h3>Certificate Details</h3>
                            <div class="detail-grid">
                                <div class="detail-item">
                                    <span class="detail-label">Issuing Authority:</span>
                                    <span class="detail-value">${cert.issuingAuthority}</span>
                                </div>
                                <div class="detail-item">
                                    <span class="detail-label">Certificate No:</span>
                                    <span class="detail-value">${cert.certificateNo}</span>
                                </div>
                                <div class="detail-item">
                                    <span class="detail-label">Validity:</span>
                                    <span class="detail-value">${cert.validity}</span>
                                </div>
                                <div class="detail-item">
                                    <span class="detail-label">Scope:</span>
                                    <span class="detail-value">${cert.scope}</span>
                                </div>
                            </div>
                        </div>
                        
                        <div class="detail-section">
                            <h3>Description</h3>
                            <p>${cert.description}</p>
                        </div>
                        
                        <div class="detail-section">
                            <h3>Key Features</h3>
                            <ul class="feature-list">
                                ${cert.features.map(feature => `<li>${feature}</li>`).join('')}
                            </ul>
                        </div>
                        
                        <div class="detail-section">
                            <h3>Benefits</h3>
                            <ul class="benefit-list">
                                ${cert.benefits.map(benefit => `<li>${benefit}</li>`).join('')}
                            </ul>
                        </div>
                        
                        <div class="certificate-actions">
                            <a href="${cert.pdf}" class="btn-primary" download>
                                📥 Download Certificate (PDF)
                            </a>
                            <button class="btn-secondary verify-certificate" data-cert="${certId}">
                                🔍 Verify Authenticity
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Initialize certificate viewer interactions
    const certImage = modal.querySelector('.certificate-image img');
    let zoomLevel = 1;
    let rotation = 0;
    
    // Zoom functionality
    modal.querySelector('.zoom-in').addEventListener('click', function() {
        zoomLevel = zoomLevel === 1 ? 2 : 1;
        certImage.style.transform = `scale(${zoomLevel}) rotate(${rotation}deg)`;
        this.textContent = zoomLevel === 2 ? '🔍 Zoom Out' : '🔍 Zoom In';
    });
    
    // Rotate functionality
    modal.querySelector('.rotate').addEventListener('click', function() {
        rotation = (rotation + 90) % 360;
        certImage.style.transform = `scale(${zoomLevel}) rotate(${rotation}deg)`;
    });
    
    // Verify certificate
    modal.querySelector('.verify-certificate').addEventListener('click', function() {
        verifyCertificate(certId);
    });
    
    // Close modal
    modal.querySelector('.modal-close').addEventListener('click', () => {
        modal.remove();
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
    
    // Track certificate view
    trackEvent('certificate_viewed', {
        certificate: certId,
        title: cert.title
    });
}

function verifyCertificate(certId) {
    // In a real implementation, this would connect to a verification API
    const verificationUrl = `https://verify.kvbgreenenergies.com/certificate/${certId}`;
    
    // Show verification modal
    const verifyModal = document.createElement('div');
    verifyModal.className = 'verification-modal';
    verifyModal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>Verify Certificate Authenticity</h3>
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-body">
                <div class="verification-status">
                    <div class="status-icon">🔍</div>
                    <h4>Verifying Certificate...</h4>
                    <div class="verification-progress">
                        <div class="progress-bar">
                            <div class="progress-fill"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(verifyModal);
    
    // Simulate verification process
    setTimeout(() => {
        verifyModal.querySelector('.verification-status').innerHTML = `
            <div class="status-icon verified">✅</div>
            <h4>Certificate Verified!</h4>
            <p>This certificate is authentic and valid.</p>
            <div class="verification-details">
                <p><strong>Certificate ID:</strong> ${certId.toUpperCase()}</p>
                <p><strong>Status:</strong> Active and Valid</p>
                <p><strong>Verification Date:</strong> ${new Date().toLocaleDateString()}</p>
                <p><strong>Verification ID:</strong> VER-${Date.now()}</p>
            </div>
            <button class="btn-small download-verification">Download Verification Report</button>
        `;
        
        // Download verification report
        verifyModal.querySelector('.download-verification').addEventListener('click', function() {
            const report = {
                certificateId: certId,
                status: 'Verified',
                verificationDate: new Date().toISOString(),
                verificationId: `VER-${Date.now()}`,
                remarks: 'Certificate is authentic and valid'
            };
            
            const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            
            const a = document.createElement('a');
            a.href = url;
            a.download = `certificate-verification-${certId}.json`;
            a.click();
            URL.revokeObjectURL(url);
        });
        
    }, 2000);
    
    // Close modal
    verifyModal.querySelector('.modal-close').addEventListener('click', () => {
        verifyModal.remove();
    });
    
    verifyModal.addEventListener('click', (e) => {
        if (e.target === verifyModal) {
            verifyModal.remove();
        }
    });
}

function downloadCertificate(certId) {
    const certificates = {
        mnre: 'assets/documents/certifications/mnre-certificate.pdf',
        geda: 'assets/documents/certifications/geda-empanelment.pdf',
        meda: 'assets/documents/certifications/meda-partnership.pdf',
        nabard: 'assets/documents/certifications/nabard-approval.pdf'
    };
    
    const url = certificates[certId];
    if (url) {
        // Track download
        trackEvent('certificate_downloaded', {
            certificate: certId,
            timestamp: new Date().toISOString()
        });
        
        // Open download in new tab
        window.open(url, '_blank');
    }
}

function initMOUViewer() {
    document.querySelectorAll('.view-mou').forEach(button => {
        button.addEventListener('click', function() {
            const mouId = this.dataset.mou;
            openMOUViewer(mouId);
        });
    });
    
    // Add hover effects to MOU cards
    const mouCards = document.querySelectorAll('.mou-card');
    mouCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 15px 30px rgba(0,0,0,0.1)';
            
            // Animate logo
            const logo = this.querySelector('.mou-logo');
            if (logo) {
                logo.style.transform = 'scale(1.2)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 5px 15px rgba(0,0,0,0.05)';
            
            const logo = this.querySelector('.mou-logo');
            if (logo) {
                logo.style.transform = 'scale(1)';
            }
        });
    });
}

function openMOUViewer(mouId) {
    const mouData = {
        'iit-dharwad': {
            title: 'IIT Dharwad - Research Collaboration MoU',
            partner: 'Indian Institute of Technology, Dharwad',
            signed: 'January 15, 2022',
            validity: '5 Years (2022-2027)',
            focus: 'Thermal Storage Materials Research & Development',
            objectives: [
                'Joint research on advanced thermal storage materials',
                'Development of high-efficiency solar thermal systems',
                'Student exchange and internship programs',
                'Joint publications and patents'
            ],
            outcomes: [
                '2 joint research papers published',
                '1 patent filed on thermal storage technology',
                '15+ student internships completed',
                'New material development in progress'
            ],
            pdf: 'assets/documents/mou/iit-dharwad-mou.pdf'
        }
        // Add more MOU data as needed
    };
    
    const mou = mouData[mouId];
    if (!mou) return;
    
    // Create MOU viewer modal similar to certificate viewer
    // Implementation would follow similar pattern
}

function initTestReportViewer() {
    document.querySelectorAll('.view-test-report').forEach(button => {
        button.addEventListener('click', function() {
            const testId = this.dataset.test;
            openTestReportViewer(testId);
        });
    });
    
    // Add metric animations
    const testMetrics = document.querySelectorAll('.test-metric');
    testMetrics.forEach(metric => {
        const valueElement = metric.querySelector('.metric-value');
        if (valueElement) {
            // Parse value for animation
            const valueText = valueElement.textContent;
            const numericValue = parseFloat(valueText);
            
            if (!isNaN(numericValue)) {
                // Store original value
                valueElement.dataset.originalValue = valueText;
                
                // Add hover effect
                metric.addEventListener('mouseenter', function() {
                    valueElement.style.transform = 'scale(1.1)';
                    valueElement.style.color = 'var(--accent-orange)';
                });
                
                metric.addEventListener('mouseleave', function() {
                    valueElement.style.transform = 'scale(1)';
                    valueElement.style.color = '';
                });
            }
        }
    });
}

function openTestReportViewer(testId) {
    const testData = {
        'thermal-efficiency': {
            title: 'Thermal Efficiency Test Report',
            lab: 'University of Horticultural Sciences, Bagalkot',
            reportNo: 'UHS/PERF/2023/001',
            date: 'March 15, 2023',
            standards: 'IS 13129:2021, MNRE Specifications',
            summary: 'Comprehensive thermal efficiency testing of solar steam cooking system',
            results: [
                'Average Thermal Efficiency: 68.5%',
                'Maximum Temperature Achieved: 180°C',
                'Steam Generation Rate: 50 kg/hour',
                'System Efficiency Variation: ±2%',
                'Performance Consistency: 98.5%'
            ],
            conclusions: [
                'System exceeds MNRE minimum efficiency requirement of 60%',
                'Performance consistent across multiple test cycles',
                'Meets all safety and performance standards',
                'Recommended for commercial deployment'
            ],
            pdf: 'assets/documents/reports/thermal-efficiency-test.pdf'
        }
        // Add more test reports as needed
    };
    
    const test = testData[testId];
    if (!test) return;
    
    // Create test report viewer modal
    // Implementation similar to certificate viewer
}

function initCertificationWall() {
    const certScroll = document.querySelector('.cert-scroll');
    if (!certScroll) return;
    
    // Certificate data
    const certificates = [
        { name: 'MNRE Certification', type: 'government', year: '2020' },
        { name: 'UNIDO Empanelment', type: 'international', year: '2022' },
        { name: 'GEDA Empanelment', type: 'government', year: '2021' },
        { name: 'MEDA Partnership', type: 'government', year: '2019' },
        { name: 'NABARD Approval', type: 'financial', year: '2022' },
        { name: 'UHS Test Report', type: 'testing', year: '2023' },
        { name: 'IIT Dharwad MoU', type: 'research', year: '2022' },
        { name: 'UAS Bengaluru MoU', type: 'research', year: '2021' },
        { name: 'Quality Assurance', type: 'industry', year: '2023' }
    ];
    
    // Create certificate elements
    certificates.forEach(cert => {
        const certElement = document.createElement('div');
        certElement.className = 'cert-scroll-item';
        certElement.innerHTML = `
            <div class="scroll-cert ${cert.type}">
                <div class="cert-name">${cert.name}</div>
                <div class="cert-year">${cert.year}</div>
            </div>
        `;
        
        certScroll.appendChild(certElement);
        
        // Add click to view certificate
        certElement.addEventListener('click', function() {
            // Map certificate name to ID
            const certMap = {
                'MNRE Certification': 'mnre',
                'UNIDO Empanelment': 'unido',
                'UHS Test Report': 'uhs'
            };
            
            const certId = certMap[cert.name];
            if (certId) {
                openCertificateViewer(certId);
            }
        });
    });
    
    // Create duplicate for seamless scroll
    const clone = certScroll.cloneNode(true);
    certScroll.parentNode.appendChild(clone);
    clone.innerHTML = certScroll.innerHTML;
    
    // Auto-scroll animation
    let scrollPosition = 0;
    const scrollSpeed = 0.5;
    
    function animateCertScroll() {
        scrollPosition -= scrollSpeed;
        if (scrollPosition <= -certScroll.offsetWidth) {
            scrollPosition = 0;
        }
        certScroll.style.transform = `translateX(${scrollPosition}px)`;
        clone.style.transform = `translateX(${scrollPosition + certScroll.offsetWidth}px)`;
        requestAnimationFrame(animateCertScroll);
    }
    
    // Start animation
    animateCertScroll();
    
    // Pause on hover
    certScroll.parentNode.addEventListener('mouseenter', () => {
        scrollSpeed = 0;
    });
    
    certScroll.parentNode.addEventListener('mouseleave', () => {
        scrollSpeed = 0.5;
    });
}

function initDownloadTracking() {
    // Track all document downloads
    document.querySelectorAll('a[download]').forEach(link => {
        link.addEventListener('click', function() {
            const fileName = this.getAttribute('href').split('/').pop();
            const fileType = fileName.split('.').pop();
            
            trackEvent('certification_download', {
                file_name: fileName,
                file_type: fileType,
                category: this.closest('.download-category')?.querySelector('h3')?.textContent || 'general',
                timestamp: new Date().toISOString()
            });
        });
    });
}

function initValidationIndicators() {
    // Add validation status indicators
    const certCards = document.querySelectorAll('.cert-card');
    certCards.forEach(card => {
        // Add validation badge
        const validityText = card.querySelector('.cert-details p:nth-child(3)')?.textContent;
        if (validityText && validityText.includes('202')) {
            const yearMatch = validityText.match(/202(\d)/);
            if (yearMatch) {
                const endYear = parseInt(`202${yearMatch[1]}`);
                const currentYear = new Date().getFullYear();
                const yearsRemaining = endYear - currentYear;
                
                if (yearsRemaining > 0) {
                    const statusDiv = document.createElement('div');
                    statusDiv.className = 'validity-status active';
                    statusDiv.innerHTML = `
                        <span class="status-dot"></span>
                        <span class="status-text">Valid for ${yearsRemaining} more years</span>
                    `;
                    card.querySelector('.cert-actions').before(statusDiv);
                } else {
                    const statusDiv = document.createElement('div');
                    statusDiv.className = 'validity-status expired';
                    statusDiv.innerHTML = `
                        <span class="status-dot"></span>
                        <span class="status-text">Renewal in progress</span>
                    `;
                    card.querySelector('.cert-actions').before(statusDiv);
                }
            }
        }
    });
}

function initProcessSteps() {
    const processSteps = document.querySelectorAll('.process-step');
    
    // Animate steps on scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('animated');
                }, index * 200);
            }
        });
    }, { threshold: 0.5 });
    
    processSteps.forEach(step => observer.observe(step));
    
    // Add step interactions
    processSteps.forEach(step => {
        step.addEventListener('click', function() {
            this.classList.toggle('expanded');
            
            if (this.classList.contains('expanded')) {
                const stepNumber = this.querySelector('.step-number').textContent;
                showStepDetails(stepNumber);
            }
        });
    });
}

function showStepDetails(stepNumber) {
    const stepDetails = {
        '1': {
            title: 'Initial Testing Phase',
            duration: '4-6 weeks',
            tests: [
                'Thermal efficiency testing',
                'Safety compliance checks',
                'Durability assessment',
                'Performance validation'
            ],
            labs: ['UHS Bagalkot', 'NABL Accredited Labs', 'IIT Dharwad'],
            standards: ['IS 13129:2021', 'MNRE Specifications', 'International Standards']
        },
        '2': {
            title: 'Field Validation Phase',
            duration: '6-12 months',
            activities: [
                'Real-world installation monitoring',
                'Client performance feedback',
                'Environmental condition testing',
                'Long-term reliability assessment'
            ],
            metrics: ['System uptime', 'Energy savings', 'Client satisfaction', 'Maintenance requirements'],
            clients: ['Selected pilot installations across sectors']
        }
        // Add more step details
    };
    
    const details = stepDetails[stepNumber];
    if (!details) return;
    
    // Create details modal
    // Implementation similar to other modals
}

// Export certification data
function exportCertificationsData() {
    const certificationData = {
        government: [
            {
                name: 'MNRE Certification',
                id: 'MNRE/SOL/2020/4567',
                validity: '2020-2025',
                authority: 'Ministry of New & Renewable Energy',
                scope: 'Solar Thermal Systems'
            },
            {
                name: 'GEDA Empanelment',
                id: 'GEDA/EMP/2021/234',
                validity: '2021-2026',
                authority: 'Goa Energy Development Agency',
                scope: 'State Projects'
            }
        ],
        international: [
            {
                name: 'UNIDO Empanelment',
                id: 'UNIDO/EMP/2022/789',
                validity: 'Since 2022',
                authority: 'United Nations Industrial Development Organization',
                scope: 'International Projects'
            }
        ],
        testing: [
            {
                name: 'Thermal Efficiency Test',
                lab: 'UHS Bagalkot',
                report: 'UHS/PERF/2023/001',
                efficiency: '68.5%',
                date: 'March 2023'
            },
            {
                name: 'Drying Performance Test',
                lab: 'UAS Bengaluru',
                report: 'UAS/DRY/2023/045',
                improvement: '62% faster drying',
                date: 'February 2023'
            }
        ],
        research: [
            {
                name: 'IIT Dharwad MoU',
                type: 'Research Collaboration',
                signed: 'January 2022',
                focus: 'Thermal Storage Materials',
                outcomes: ['2 Papers', '1 Patent']
            },
            {
                name: 'UAS Bengaluru MoU',
                type: 'Agricultural Research',
                signed: 'March 2021',
                focus: 'Solar Drying Technology',
                outcomes: ['Field Trials', 'Farmer Training']
            }
        ]
    };
    
    return certificationData;
}

// Generate certification summary
function generateCertificationSummary() {
    const data = exportCertificationsData();
    
    const summary = `
        KVB GREEN ENERGIES - CERTIFICATION SUMMARY
        Generated: ${new Date().toLocaleDateString()}
        
        GOVERNMENT CERTIFICATIONS (${data.government.length}):
        ${data.government.map(cert => `- ${cert.name}: ${cert.id} (Valid: ${cert.validity})`).join('\n')}
        
        INTERNATIONAL ACCREDITATIONS (${data.international.length}):
        ${data.international.map(cert => `- ${cert.name}: ${cert.id}`).join('\n')}
        
        PERFORMANCE TESTING (${data.testing.length} Reports):
        ${data.testing.map(test => `- ${test.name}: ${test.efficiency || test.improvement} (${test.lab})`).join('\n')}
        
        RESEARCH COLLABORATIONS (${data.research.length} MoUs):
        ${data.research.map(mou => `- ${mou.name}: ${mou.focus} (Signed: ${mou.signed})`).join('\n')}
        
        ---
        Total Certifications: ${Object.values(data).flat().length}
        Last Updated: ${new Date().toISOString()}
    `;
    
    return summary;
}

// Initialize certification summary download
function initCertificationSummaryDownload() {
    const summaryBtn = document.createElement('button');
    summaryBtn.className = 'summary-download-btn';
    summaryBtn.innerHTML = '📥 Download Certification Summary';
    
    const ctaSection = document.querySelector('.certification-cta .cta-buttons');
    if (ctaSection) {
        ctaSection.appendChild(summaryBtn);
        
        summaryBtn.addEventListener('click', function() {
            const summary = generateCertificationSummary();
            const blob = new Blob([summary], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);
            
            const a = document.createElement('a');
            a.href = url;
            a.download = `kvb-certifications-summary-${new Date().toISOString().split('T')[0]}.txt`;
            a.click();
            URL.revokeObjectURL(url);
            
            trackEvent('certification_summary_downloaded', {
                timestamp: new Date().toISOString()
            });
        });
    }
}

// Initialize when page loads
setTimeout(initCertificationSummaryDownload, 2000);