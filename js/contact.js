// Contact & Partnerships - Interactive Features
document.addEventListener('DOMContentLoaded', function() {
    initContactPage();
    initFormSelection();
    initFileUploads();
    initQuickContact();
    initFAQ();
    initContactCards();
});

function initContactPage() {
    // Check URL parameters for pre-filled form
    const urlParams = new URLSearchParams(window.location.search);
    const formType = urlParams.get('type');
    const partnershipType = urlParams.get('partnership');
    const clientId = urlParams.get('client');
    const tech = urlParams.get('tech');
    
    if (formType) {
        // Activate corresponding form
        setTimeout(() => {
            const formOption = document.querySelector(`.form-option[data-form="${formType}"]`);
            if (formOption) {
                formOption.click();
            }
        }, 500);
    }
    
    if (partnershipType) {
        // Store partnership type for form pre-fill
        sessionStorage.setItem('selected_partnership', partnershipType);
    }
    
    if (clientId) {
        // Pre-fill with client reference
        sessionStorage.setItem('client_reference', clientId);
    }
    
    if (tech) {
        // Pre-fill with technology interest
        sessionStorage.setItem('technology_interest', tech);
    }
    
    // Initialize audience-specific content
    const audience = sessionStorage.getItem('kvb_audience');
    if (audience) {
        // Highlight corresponding audience button
        document.querySelectorAll('.audience-btn').forEach(btn => {
            if (btn.dataset.audience === audience) {
                btn.classList.add('active');
                
                // Pre-select corresponding form option
                const formMap = {
                    'client': 'demo',
                    'partner': 'government',
                    'government': 'government',
                    'investor': 'investor',
                    'farmer': 'farmer'
                };
                
                if (formMap[audience]) {
                    setTimeout(() => {
                        const formOption = document.querySelector(`.form-option[data-form="${formMap[audience]}"]`);
                        if (formOption) {
                            formOption.click();
                        }
                    }, 1000);
                }
            }
        });
    }
}

function initFormSelection() {
    const formOptions = document.querySelectorAll('.form-option');
    const forms = document.querySelectorAll('.contact-form');
    
    formOptions.forEach(option => {
        option.addEventListener('click', function() {
            const formType = this.dataset.form;
            
            // Remove active class from all options and forms
            formOptions.forEach(opt => opt.classList.remove('active'));
            forms.forEach(form => form.classList.remove('active'));
            
            // Add active class to selected option and corresponding form
            this.classList.add('active');
            document.getElementById(`${formType}-form`).classList.add('active');
            
            // Scroll to form
            document.getElementById(`${formType}-form`).scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
            
            // Pre-fill form based on stored data
            prefillForm(formType);
            
            // Track form selection
            trackEvent('contact_form_selected', { 
                form_type: formType,
                audience: sessionStorage.getItem('kvb_audience') || 'unknown'
            });
        });
    });
    
    // Add hover effects to form options
    formOptions.forEach(option => {
        option.addEventListener('mouseenter', function() {
            if (!this.classList.contains('active')) {
                this.style.transform = 'translateY(-5px)';
                this.style.boxShadow = '0 10px 25px rgba(0,0,0,0.1)';
            }
        });
        
        option.addEventListener('mouseleave', function() {
            if (!this.classList.contains('active')) {
                this.style.transform = 'translateY(0)';
                this.style.boxShadow = '0 5px 15px rgba(0,0,0,0.05)';
            }
        });
    });
}

function prefillForm(formType) {
    // Get stored data
    const audience = sessionStorage.getItem('kvb_audience');
    const partnershipType = sessionStorage.getItem('selected_partnership');
    const clientRef = sessionStorage.getItem('client_reference');
    const techInterest = sessionStorage.getItem('technology_interest');
    
    // Pre-fill based on form type
    switch(formType) {
        case 'demo':
            if (techInterest) {
                const interestSelect = document.getElementById('demo-interest');
                if (interestSelect) {
                    // Map technology parameter to option value
                    const techMap = {
                        'thermal-storage': 'energy-storage',
                        'ai-agriculture': 'ai-agriculture',
                        'soil-to-sale': 'custom',
                        'microgreen-automation': 'microgreen'
                    };
                    
                    if (techMap[techInterest]) {
                        interestSelect.value = techMap[techInterest];
                    }
                }
            }
            break;
            
        case 'technical':
            if (techInterest) {
                const productSelect = document.getElementById('tech-product');
                if (productSelect) {
                    const techMap = {
                        'thermal-storage': 'sand-battery',
                        'ai-agriculture': 'ai-crop',
                        'soil-to-sale': 'custom',
                        'microgreen-automation': 'microgreen'
                    };
                    
                    if (techMap[techInterest]) {
                        productSelect.value = techMap[techInterest];
                    }
                }
            }
            break;
            
        case 'government':
            if (partnershipType) {
                const partnershipSelect = document.getElementById('gov-partnership');
                if (partnershipSelect) {
                    // Try to find matching option
                    const options = partnershipSelect.options;
                    for (let i = 0; i < options.length; i++) {
                        if (options[i].text.toLowerCase().includes(partnershipType.toLowerCase())) {
                            partnershipSelect.value = options[i].value;
                            break;
                        }
                    }
                }
            }
            break;
            
        case 'investor':
            // Pre-fill investor-specific fields
            if (audience === 'investor') {
                const messageField = document.querySelector('#investor-form textarea[name="message"]');
                if (messageField) {
                    messageField.value = 'Interested in investment opportunities. Please provide: \n1. Financial projections\n2. Growth strategy\n3. Investment terms\n4. Due diligence materials';
                }
            }
            break;
    }
    
    // Add client reference to message if exists
    if (clientRef) {
        const messageFields = document.querySelectorAll('textarea[name="message"], textarea[name="requirements"]');
        messageFields.forEach(field => {
            if (field.value.trim() === '') {
                field.value = `Reference: Client ID ${clientRef}\n\n`;
            } else if (!field.value.includes(clientRef)) {
                field.value = `Reference: Client ID ${clientRef}\n\n${field.value}`;
            }
        });
    }
}

function initFileUploads() {
    // Initialize file upload for all forms
    const fileInputs = document.querySelectorAll('input[type="file"]');
    
    fileInputs.forEach(input => {
        const fileListId = input.id + '-list';
        const fileList = document.getElementById(fileListId);
        
        input.addEventListener('change', function() {
            if (!fileList) return;
            
            // Clear previous list
            fileList.innerHTML = '';
            
            // Show selected files
            Array.from(this.files).forEach((file, index) => {
                const fileItem = document.createElement('div');
                fileItem.className = 'file-item';
                fileItem.innerHTML = `
                    <span class="file-name">${file.name}</span>
                    <span class="file-size">(${formatFileSize(file.size)})</span>
                    <button type="button" class="file-remove" data-index="${index}">×</button>
                `;
                
                fileList.appendChild(fileItem);
                
                // Remove file button
                fileItem.querySelector('.file-remove').addEventListener('click', function() {
                    const index = parseInt(this.dataset.index);
                    const dt = new DataTransfer();
                    const files = Array.from(input.files);
                    
                    // Remove file from files array
                    files.splice(index, 1);
                    
                    // Update files in input
                    files.forEach(file => dt.items.add(file));
                    input.files = dt.files;
                    
                    // Remove from list
                    fileItem.remove();
                    
                    // Re-index remaining files
                    fileList.querySelectorAll('.file-item').forEach((item, newIndex) => {
                        item.querySelector('.file-remove').dataset.index = newIndex;
                    });
                });
            });
        });
    });
}

function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

function initQuickContact() {
    // WhatsApp chat
    const whatsappOption = document.querySelector('.quick-option.whatsapp');
    if (whatsappOption) {
        whatsappOption.addEventListener('click', function(e) {
            const audience = sessionStorage.getItem('kvb_audience') || 'visitor';
            const page = document.title;
            
            const message = `Hello KVB Team,\n\nI'm visiting your contact page (${page}) and would like to chat about:\n\n- Audience: ${audience}\n- Page: Contact & Partnerships\n- Time: ${new Date().toLocaleTimeString()}\n\nPlease assist me.`;
            
            this.href = `https://wa.me/911234567890?text=${encodeURIComponent(message)}`;
            
            trackEvent('quick_contact_click', { type: 'whatsapp', audience: audience });
        });
    }
    
    // Request callback
    const callbackOption = document.getElementById('request-callback');
    if (callbackOption) {
        callbackOption.addEventListener('click', function(e) {
            e.preventDefault();
            openCallbackModal();
        });
    }
    
    // Get directions
    const directionsBtn = document.querySelector('.get-directions');
    if (directionsBtn) {
        directionsBtn.addEventListener('click', function(e) {
            e.preventDefault();
            openDirectionsModal();
        });
    }
    
    // Schedule call
    const scheduleBtn = document.querySelector('.schedule-call');
    if (scheduleBtn) {
        scheduleBtn.addEventListener('click', function(e) {
            e.preventDefault();
            openScheduleModal();
        });
    }
}

function openCallbackModal() {
    const modal = document.createElement('div');
    modal.className = 'callback-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>Request Callback</h3>
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-body">
                <form id="callbackForm">
                    <div class="form-group">
                        <label for="callback-name">Your Name *</label>
                        <input type="text" id="callback-name" required>
                    </div>
                    
                    <div class="form-group">
                        <label for="callback-phone">Phone Number *</label>
                        <input type="tel" id="callback-phone" required>
                    </div>
                    
                    <div class="form-group">
                        <label for="callback-purpose">Callback Purpose</label>
                        <select id="callback-purpose">
                            <option value="">Select purpose</option>
                            <option value="general">General Inquiry</option>
                            <option value="technical">Technical Discussion</option>
                            <option value="government">Government Project</option>
                            <option value="investment">Investment Discussion</option>
                            <option value="support">Customer Support</option>
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label>Preferred Callback Time</label>
                        <div class="time-options">
                            <label class="time-option">
                                <input type="radio" name="callback-time" value="morning" checked>
                                <span>Morning (9 AM - 12 PM)</span>
                            </label>
                            <label class="time-option">
                                <input type="radio" name="callback-time" value="afternoon">
                                <span>Afternoon (12 PM - 4 PM)</span>
                            </label>
                            <label class="time-option">
                                <input type="radio" name="callback-time" value="evening">
                                <span>Evening (4 PM - 6 PM)</span>
                            </label>
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label for="callback-message">Additional Notes</label>
                        <textarea id="callback-message" rows="2" placeholder="Any specific topics or requirements"></textarea>
                    </div>
                    
                    <div class="form-submit">
                        <button type="submit" class="btn-primary">Request Callback</button>
                        <p class="form-note">We'll call you within 2 hours during business hours</p>
                    </div>
                </form>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Close modal
    modal.querySelector('.modal-close').addEventListener('click', () => {
        modal.remove();
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
    
    // Form submission
    modal.querySelector('#callbackForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = {
            name: document.getElementById('callback-name').value,
            phone: document.getElementById('callback-phone').value,
            purpose: document.getElementById('callback-purpose').value,
            time: document.querySelector('input[name="callback-time"]:checked').value,
            message: document.getElementById('callback-message').value,
            timestamp: new Date().toISOString()
        };
        
        // Simulate submission
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = 'Requesting...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            // Show success
            modal.querySelector('.modal-body').innerHTML = `
                <div class="success-message">
                    <div class="success-icon">✓</div>
                    <h4>Callback Requested Successfully!</h4>
                    <p>We'll call you at <strong>${formData.phone}</strong> during your preferred time.</p>
                    <p>Our team will contact you shortly.</p>
                    <button class="btn-small close-modal">Close</button>
                </div>
            `;
            
            modal.querySelector('.close-modal').addEventListener('click', () => {
                modal.remove();
            });
            
            // Track callback request
            trackEvent('callback_requested', formData);
            
        }, 1500);
    });
}

function openDirectionsModal() {
    const modal = document.createElement('div');
    modal.className = 'directions-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>Get Directions to KVB</h3>
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-body">
                <div class="address-details">
                    <h4>Headquarters & R&D Center</h4>
                    <p>KVB Green Energies Pvt. Ltd.</p>
                    <p>Plot No. 123, Industrial Area</p>
                    <p>City, State - 560001</p>
                    <p>India</p>
                </div>
                
                <div class="direction-options">
                    <h4>Open in Maps</h4>
                    <div class="option-grid">
                        <a href="https://maps.google.com/?q=KVB+Green+Energies" 
                           class="direction-option" target="_blank">
                            <div class="option-icon">🗺️</div>
                            <div class="option-text">
                                <strong>Google Maps</strong>
                                <span>Get driving directions</span>
                            </div>
                        </a>
                        
                        <a href="https://maps.apple.com/?q=KVB+Green+Energies" 
                           class="direction-option" target="_blank">
                            <div class="option-icon">📍</div>
                            <div class="option-text">
                                <strong>Apple Maps</strong>
                                <span>iOS navigation</span>
                            </div>
                        </a>
                        
                        <button class="direction-option copy-address">
                            <div class="option-icon">📋</div>
                            <div class="option-text">
                                <strong>Copy Address</strong>
                                <span>Copy to clipboard</span>
                            </div>
                        </button>
                    </div>
                </div>
                
                <div class="visitor-info">
                    <h4>Visitor Information</h4>
                    <ul>
                        <li>Free parking available</li>
                        <li>Security check-in required</li>
                        <li>Visitor badges provided</li>
                        <li>Meeting rooms available</li>
                        <li>Wheelchair accessible</li>
                    </ul>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Close modal
    modal.querySelector('.modal-close').addEventListener('click', () => {
        modal.remove();
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
    
    // Copy address functionality
    modal.querySelector('.copy-address').addEventListener('click', function() {
        const address = `KVB Green Energies Pvt. Ltd., Plot No. 123, Industrial Area, City, State - 560001, India`;
        
        navigator.clipboard.writeText(address).then(() => {
            const originalText = this.querySelector('.option-text strong').textContent;
            this.querySelector('.option-text strong').textContent = 'Copied!';
            
            setTimeout(() => {
                this.querySelector('.option-text strong').textContent = originalText;
            }, 2000);
        });
        
        trackEvent('address_copied', { action: 'copy_address' });
    });
}

function openScheduleModal() {
    const modal = document.createElement('div');
    modal.className = 'schedule-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>Schedule a Call with Expert</h3>
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-body">
                <div class="expert-types">
                    <h4>Select Expert Type</h4>
                    <div class="expert-options">
                        <button class="expert-option active" data-expert="technical">
                            <div class="expert-icon">🔧</div>
                            <div class="expert-text">
                                <strong>Technical Expert</strong>
                                <span>Product specifications, customization</span>
                            </div>
                        </button>
                        
                        <button class="expert-option" data-expert="sales">
                            <div class="expert-icon">💼</div>
                            <div class="expert-text">
                                <strong>Sales Consultant</strong>
                                <span>Pricing, proposals, commercial terms</span>
                            </div>
                        </button>
                        
                        <button class="expert-option" data-expert="government">
                            <div class="expert-icon">🏛️</div>
                            <div class="expert-text">
                                <strong>Government Relations</strong>
                                <span>Tenders, institutional projects</span>
                            </div>
                        </button>
                        
                        <button class="expert-option" data-expert="agriculture">
                            <div class="expert-icon">🌾</div>
                            <div class="expert-text">
                                <strong>Agri-Tech Specialist</strong>
                                <span>Farm solutions, drying technology</span>
                            </div>
                        </button>
                    </div>
                </div>
                
                <div class="calendar-container">
                    <h4>Select Date & Time</h4>
                    <div class="calendar-placeholder">
                        <p>Calendar integration coming soon</p>
                        <p>For now, please select your preferred time and we'll confirm via email</p>
                    </div>
                    
                    <form id="scheduleForm">
                        <div class="form-group">
                            <label for="schedule-name">Your Name *</label>
                            <input type="text" id="schedule-name" required>
                        </div>
                        
                        <div class="form-group">
                            <label for="schedule-email">Email *</label>
                            <input type="email" id="schedule-email" required>
                        </div>
                        
                        <div class="form-group">
                            <label for="schedule-phone">Phone</label>
                            <input type="tel" id="schedule-phone">
                        </div>
                        
                        <div class="form-group">
                            <label for="schedule-date">Preferred Date *</label>
                            <input type="date" id="schedule-date" required 
                                   min="${new Date().toISOString().split('T')[0]}">
                        </div>
                        
                        <div class="form-group">
                            <label for="schedule-time">Preferred Time *</label>
                            <select id="schedule-time" required>
                                <option value="">Select time slot</option>
                                <option value="9-10">9:00 AM - 10:00 AM</option>
                                <option value="10-11">10:00 AM - 11:00 AM</option>
                                <option value="11-12">11:00 AM - 12:00 PM</option>
                                <option value="2-3">2:00 PM - 3:00 PM</option>
                                <option value="3-4">3:00 PM - 4:00 PM</option>
                                <option value="4-5">4:00 PM - 5:00 PM</option>
                            </select>
                        </div>
                        
                        <div class="form-group">
                            <label for="schedule-topic">Discussion Topics</label>
                            <textarea id="schedule-topic" rows="3" 
                                      placeholder="What would you like to discuss?"></textarea>
                        </div>
                        
                        <div class="form-submit">
                            <button type="submit" class="btn-primary">Schedule Call</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Expert selection
    const expertOptions = modal.querySelectorAll('.expert-option');
    expertOptions.forEach(option => {
        option.addEventListener('click', function() {
            expertOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
        });
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
    
    // Form submission
    modal.querySelector('#scheduleForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const selectedExpert = modal.querySelector('.expert-option.active').dataset.expert;
        const formData = {
            expert: selectedExpert,
            name: document.getElementById('schedule-name').value,
            email: document.getElementById('schedule-email').value,
            phone: document.getElementById('schedule-phone').value,
            date: document.getElementById('schedule-date').value,
            time: document.getElementById('schedule-time').value,
            topic: document.getElementById('schedule-topic').value,
            timestamp: new Date().toISOString()
        };
        
        // Simulate submission
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = 'Scheduling...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            // Show success
            modal.querySelector('.modal-body').innerHTML = `
                <div class="success-message">
                    <div class="success-icon">✓</div>
                    <h4>Call Scheduled Successfully!</h4>
                    <p>We've scheduled your call with our ${selectedExpert} expert.</p>
                    <p><strong>Date:</strong> ${formData.date}</p>
                    <p><strong>Time:</strong> ${formData.time}</p>
                    <p>Confirmation and calendar invite will be sent to ${formData.email}</p>
                    <button class="btn-small close-modal">Close</button>
                </div>
            `;
            
            modal.querySelector('.close-modal').addEventListener('click', () => {
                modal.remove();
            });
            
            // Track scheduling
            trackEvent('call_scheduled', formData);
            
        }, 1500);
    });
}

function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        const toggle = item.querySelector('.faq-toggle');
        
        question.addEventListener('click', () => {
            const isExpanded = item.classList.contains('expanded');
            
            // Close all other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('expanded');
                    otherItem.querySelector('.faq-answer').style.maxHeight = '0';
                    otherItem.querySelector('.faq-toggle').textContent = '+';
                }
            });
            
            // Toggle current item
            if (!isExpanded) {
                item.classList.add('expanded');
                answer.style.maxHeight = answer.scrollHeight + 'px';
                toggle.textContent = '−';
            } else {
                item.classList.remove('expanded');
                answer.style.maxHeight = '0';
                toggle.textContent = '+';
            }
        });
    });
}

function initContactCards() {
    const contactCards = document.querySelectorAll('.contact-card');
    
    contactCards.forEach(card => {
        // Add click to copy functionality for contact details
        const contactDetails = card.querySelector('.contact-details');
        if (contactDetails) {
            contactDetails.addEventListener('click', function(e) {
                if (e.target.tagName === 'P') {
                    const textToCopy = e.target.textContent;
                    navigator.clipboard.writeText(textToCopy).then(() => {
                        showCopyNotification('Copied to clipboard!', card);
                    });
                }
            });
        }
        
        // Add hover effects
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 15px 30px rgba(0,0,0,0.1)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 5px 15px rgba(0,0,0,0.05)';
        });
    });
    
    // Regional office cards interaction
    const officeCards = document.querySelectorAll('.office-card');
    officeCards.forEach(card => {
        card.addEventListener('click', function() {
            const location = this.querySelector('.office-location').textContent;
            const details = this.querySelector('.office-details').innerHTML;
            
            openOfficeDetails(location, details);
        });
    });
}

function showCopyNotification(message, element) {
    const notification = document.createElement('div');
    notification.className = 'copy-notification';
    notification.textContent = message;
    
    const rect = element.getBoundingClientRect();
    notification.style.position = 'fixed';
    notification.style.top = rect.top + 'px';
    notification.style.left = rect.left + rect.width / 2 + 'px';
    notification.style.transform = 'translateX(-50%)';
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('fade-out');
        setTimeout(() => notification.remove(), 300);
    }, 2000);
}

function openOfficeDetails(location, details) {
    const modal = document.createElement('div');
    modal.className = 'office-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>${location} Regional Office</h3>
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-body">
                <div class="office-info">
                    ${details}
                </div>
                
                <div class="office-services">
                    <h4>Services Offered:</h4>
                    <ul>
                        <li>Site surveys and assessments</li>
                        <li>Installation support</li>
                        <li>Maintenance services</li>
                        <li>Farmer training programs</li>
                        <li>Government liaison</li>
                        <li>Spare parts inventory</li>
                    </ul>
                </div>
                
                <div class="office-cta">
                    <button class="btn-primary contact-office">Contact This Office</button>
                    <button class="btn-secondary visit-office">Schedule Visit</button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
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
    modal.querySelector('.contact-office').addEventListener('click', () => {
        // Extract email from details
        const emailMatch = details.match(/<strong>Email:<\/strong>\s*([^<]+)/);
        if (emailMatch && emailMatch[1]) {
            window.location.href = `mailto:${emailMatch[1].trim()}?subject=Contact%20${location}%20Office`;
        }
        modal.remove();
    });
    
    modal.querySelector('.visit-office').addEventListener('click', () => {
        openScheduleModal();
        modal.remove();
    });
}

// Form validation enhancement
function enhanceFormValidation() {
    const forms = document.querySelectorAll('form[data-form-type]');
    
    forms.forEach(form => {
        // Add real-time validation
        const inputs = form.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            input.addEventListener('input', function() {
                clearFieldError(this);
            });
        });
        
        // Add character counters for textareas
        const textareas = form.querySelectorAll('textarea');
        textareas.forEach(textarea => {
            const counter = document.createElement('div');
            counter.className = 'char-counter';
            counter.textContent = `0/${textarea.maxLength || '∞'}`;
            textarea.parentNode.appendChild(counter);
            
            textarea.addEventListener('input', function() {
                const current = this.value.length;
                const max = this.maxLength || Infinity;
                counter.textContent = `${current}/${max === Infinity ? '∞' : max}`;
                
                if (max !== Infinity && current > max * 0.9) {
                    counter.style.color = 'var(--accent-orange)';
                } else {
                    counter.style.color = '';
                }
            });
        });
    });
}

function validateField(field) {
    clearFieldError(field);
    
    let isValid = true;
    let errorMessage = '';
    
    if (field.hasAttribute('required') && !field.value.trim()) {
        isValid = false;
        errorMessage = 'This field is required';
    }
    
    if (field.type === 'email' && field.value.trim()) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(field.value)) {
            isValid = false;
            errorMessage = 'Please enter a valid email address';
        }
    }
    
    if (field.type === 'tel' && field.value.trim()) {
        const phoneRegex = /^[\d\s\-\+\(\)]{10,}$/;
        if (!phoneRegex.test(field.value)) {
            isValid = false;
            errorMessage = 'Please enter a valid phone number';
        }
    }
    
    if (field.type === 'date' && field.value) {
        const selectedDate = new Date(field.value);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        if (selectedDate < today) {
            isValid = false;
            errorMessage = 'Please select a future date';
        }
    }
    
    if (!isValid) {
        showFieldError(field, errorMessage);
    }
    
    return isValid;
}

function showFieldError(field, message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error';
    errorDiv.textContent = message;
    
    field.classList.add('error');
    field.parentNode.appendChild(errorDiv);
}

function clearFieldError(field) {
    field.classList.remove('error');
    const existingError = field.parentNode.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }
}

// Initialize enhanced validation
enhanceFormValidation();

// Track form interactions for analytics
function initFormAnalytics() {
    const forms = document.querySelectorAll('form[data-form-type]');
    
    forms.forEach(form => {
        // Track field focus
        const inputs = form.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('focus', function() {
                trackEvent('form_field_focused', {
                    form_type: form.dataset.formType,
                    field_name: this.name || this.id,
                    field_type: this.type
                });
            });
        });
        
        // Track form abandonment
        let formStarted = false;
        let startTime = null;
        
        form.addEventListener('focusin', () => {
            if (!formStarted) {
                formStarted = true;
                startTime = Date.now();
                trackEvent('form_started', {
                    form_type: form.dataset.formType,
                    timestamp: new Date().toISOString()
                });
            }
        });
        
        form.addEventListener('submit', () => {
            if (formStarted && startTime) {
                const duration = Date.now() - startTime;
                trackEvent('form_completed', {
                    form_type: form.dataset.formType,
                    duration_seconds: Math.round(duration / 1000),
                    timestamp: new Date().toISOString()
                });
            }
        });
        
        // Track abandonment on page leave
        window.addEventListener('beforeunload', () => {
            if (formStarted && !form.classList.contains('submitted')) {
                trackEvent('form_abandoned', {
                    form_type: form.dataset.formType,
                    timestamp: new Date().toISOString()
                });
            }
        });
    });
}

// Initialize form analytics
initFormAnalytics();