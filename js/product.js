// Product Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // FAQ Accordion
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const answer = this.nextElementSibling;
            const icon = this.querySelector('i');
            
            // Toggle current question
            this.classList.toggle('active');
            answer.classList.toggle('active');
            
            // Rotate icon
            if (this.classList.contains('active')) {
                icon.style.transform = 'rotate(180deg)';
                answer.style.maxHeight = answer.scrollHeight + 'px';
            } else {
                icon.style.transform = 'rotate(0deg)';
                answer.style.maxHeight = '0';
            }
            
            // Close other questions
            faqQuestions.forEach(otherQuestion => {
                if (otherQuestion !== this) {
                    otherQuestion.classList.remove('active');
                    otherQuestion.querySelector('i').style.transform = 'rotate(0deg)';
                    const otherAnswer = otherQuestion.nextElementSibling;
                    otherAnswer.classList.remove('active');
                    otherAnswer.style.maxHeight = '0';
                }
            });
        });
    });
    
    // ROI Calculator
    const calculateButton = document.getElementById('calculate-savings');
    if (calculateButton) {
        calculateButton.addEventListener('click', function() {
            calculateROI();
        });
    }
    
    function calculateROI() {
        const lpgConsumption = parseFloat(document.getElementById('current-lpg').value) || 0;
        const mealsPerDay = parseFloat(document.getElementById('meals-per-day').value) || 0;
        
        // Constants for calculation
        const lpgPrice = 85; // ₹ per kg
        const solarEfficiency = 0.75; // 75% LPG replacement
        const co2PerKgLPG = 3.15; // kg CO2 per kg LPG
        const systemCostPerMeal = 5000; // ₹ per meal capacity
        
        // Calculations
        const annualLpgKg = lpgConsumption * 365;
        const lpgSavingsKg = annualLpgKg * solarEfficiency;
        const annualLpgSavings = lpgSavingsKg * lpgPrice;
        const annualCo2Reduction = lpgSavingsKg * co2PerKgLPG / 1000; // Tons
        
        const systemCost = mealsPerDay * systemCostPerMeal;
        const paybackYears = systemCost / annualLpgSavings;
        
        // Update results
        document.getElementById('lpg-savings').textContent = `₹ ${annualLpgSavings.toLocaleString()}`;
        document.getElementById('co2-reduction').textContent = `${annualCo2Reduction.toFixed(1)} Tons`;
        document.getElementById('system-cost').textContent = `₹ ${systemCost.toLocaleString()}`;
        document.getElementById('payback-period').textContent = `${paybackYears.toFixed(1)} Years`;
        
        // Animate results
        const resultValues = document.querySelectorAll('.result-value');
        resultValues.forEach((value, index) => {
            value.style.opacity = '0';
            value.style.transform = 'translateY(10px)';
            
            setTimeout(() => {
                value.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                value.style.opacity = '1';
                value.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }
    
    // Gallery lightbox functionality
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
        <div class="lightbox-content">
            <button class="lightbox-close">&times;</button>
            <img src="" alt="" class="lightbox-image">
            <div class="lightbox-caption"></div>
            <button class="lightbox-prev">&lt;</button>
            <button class="lightbox-next">&gt;</button>
        </div>
    `;
    document.body.appendChild(lightbox);
    
    let currentImageIndex = 0;
    const images = [];
    
    galleryItems.forEach((item, index) => {
        const img = item.querySelector('img');
        const caption = item.querySelector('.gallery-caption');
        
        images.push({
            src: img.src,
            alt: img.alt,
            caption: caption.innerHTML
        });
        
        item.addEventListener('click', function() {
            currentImageIndex = index;
            openLightbox();
        });
    });
    
    function openLightbox() {
        const lightboxImage = lightbox.querySelector('.lightbox-image');
        const lightboxCaption = lightbox.querySelector('.lightbox-caption');
        
        lightboxImage.src = images[currentImageIndex].src;
        lightboxImage.alt = images[currentImageIndex].alt;
        lightboxCaption.innerHTML = images[currentImageIndex].caption;
        
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    function showNextImage() {
        currentImageIndex = (currentImageIndex + 1) % images.length;
        openLightbox();
    }
    
    function showPrevImage() {
        currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
        openLightbox();
    }
    
    // Lightbox event listeners
    lightbox.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
    lightbox.querySelector('.lightbox-next').addEventListener('click', showNextImage);
    lightbox.querySelector('.lightbox-prev').addEventListener('click', showPrevImage);
    
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
    
    // Keyboard navigation for lightbox
    document.addEventListener('keydown', function(e) {
        if (!lightbox.classList.contains('active')) return;
        
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowRight') showNextImage();
        if (e.key === 'ArrowLeft') showPrevImage();
    });
    
    // Video play functionality
    const videoPlaceholder = document.querySelector('.video-placeholder');
    if (videoPlaceholder) {
        videoPlaceholder.addEventListener('click', function() {
            // In a real implementation, this would open a video modal or player
            alert('Video player would open here. In production, this would embed a YouTube/Vimeo player or custom video modal.');
        });
    }
    
    // Add CSS for lightbox
    const lightboxStyles = document.createElement('style');
    lightboxStyles.textContent = `
        .lightbox {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
            z-index: 10000;
            align-items: center;
            justify-content: center;
        }
        
        .lightbox.active {
            display: flex;
        }
        
        .lightbox-content {
            position: relative;
            max-width: 90%;
            max-height: 90%;
        }
        
        .lightbox-image {
            max-width: 100%;
            max-height: 70vh;
            display: block;
        }
        
        .lightbox-caption {
            color: white;
            text-align: center;
            padding: 1rem;
            background: rgba(0, 0, 0, 0.7);
        }
        
        .lightbox-close {
            position: absolute;
            top: -40px;
            right: 0;
            background: none;
            border: none;
            color: white;
            font-size: 2rem;
            cursor: pointer;
        }
        
        .lightbox-prev,
        .lightbox-next {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            background: rgba(255, 255, 255, 0.2);
            border: none;
            color: white;
            font-size: 1.5rem;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            cursor: pointer;
            transition: background 0.3s ease;
        }
        
        .lightbox-prev:hover,
        .lightbox-next:hover {
            background: rgba(255, 255, 255, 0.3);
        }
        
        .lightbox-prev {
            left: 10px;
        }
        
        .lightbox-next {
            right: 10px;
        }
        
        .faq-question {
            cursor: pointer;
            padding: 1rem;
            background: rgba(255, 255, 255, 0.1);
            border: none;
            width: 100%;
            text-align: left;
            color: white;
            font-size: 1.1rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 0.5rem;
            border-radius: 8px;
            transition: background 0.3s ease;
        }
        
        .faq-question:hover {
            background: rgba(255, 255, 255, 0.15);
        }
        
        .faq-question i {
            transition: transform 0.3s ease;
        }
        
        .faq-answer {
            max-height: 0;
            overflow: hidden;
            transition: max-height 0.3s ease;
            padding: 0 1rem;
            background: rgba(255, 255, 255, 0.05);
            border-radius: 8px;
            margin-bottom: 0.5rem;
        }
        
        .faq-answer p {
            padding: 1rem 0;
            margin: 0;
        }
    `;
    document.head.appendChild(lightboxStyles);
});

// Export for use in other modules
window.KVBProduct = {
    calculateROI: function() {
        // Re-export the function
        const calculateButton = document.getElementById('calculate-savings');
        if (calculateButton) {
            calculateButton.click();
        }
    },
    
    toggleFAQ: function(index) {
        const faqQuestions = document.querySelectorAll('.faq-question');
        if (faqQuestions[index]) {
            faqQuestions[index].click();
        }
    }
};