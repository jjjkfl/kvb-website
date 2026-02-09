// Sustainability Impact Page - Interactive Features
document.addEventListener('DOMContentLoaded', function() {
    initSustainabilityPage();
    initImpactDashboard();
    initComparisonTabs();
    initImpactStories();
    initSDGCards();
    initImpactCalculator();
    initLiveDashboard();
});

function initSustainabilityPage() {
    // Set audience-specific content
    const audience = sessionStorage.getItem('kvb_audience');
    if (audience) {
        // Highlight corresponding audience button
        document.querySelectorAll('.audience-btn').forEach(btn => {
            if (btn.dataset.audience === audience) {
                btn.classList.add('active');
                
                // Show relevant content based on audience
                switch(audience) {
                    case 'environmentalist':
                        showAudienceContent('environmental');
                        break;
                    case 'csr':
                        showAudienceContent('csr');
                        break;
                    case 'investor':
                        showAudienceContent('investor');
                        break;
                    case 'farmer':
                        showAudienceContent('farmer');
                        break;
                }
            }
        });
    }
    
    // Initialize impact animation
    initImpactAnimation();
    
    // Initialize scroll animations
    initScrollAnimations();
}

function showAudienceContent(audienceType) {
    // Show/hide relevant sections based on audience
    const sections = {
        environmental: ['.comparative-analysis', '.sdg-alignment'],
        csr: ['.impact-stories', '.sdg-alignment', '.impact-reports'],
        investor: ['.impact-dashboard', '.impact-calculator', '.impact-reports'],
        farmer: ['.impact-stories', '.comparative-analysis', '.impact-calculator']
    };
    
    // Add highlight class to relevant sections
    sections[audienceType]?.forEach(selector => {
        const element = document.querySelector(selector);
        if (element) {
            element.classList.add('audience-highlight');
        }
    });
    
    // Track audience-specific view
    trackEvent('sustainability_audience_view', { audience: audienceType });
}

function initImpactAnimation() {
    const animationElements = document.querySelectorAll('.animation-element');
    
    animationElements.forEach((element, index) => {
        // Different animations for each element
        const animations = {
            sun: 'float 4s ease-in-out infinite alternate',
            tree: 'pulse 3s ease-in-out infinite',
            water: 'wave 5s linear infinite',
            farmer: 'bounce 2s ease-in-out infinite'
        };
        
        const elementType = element.classList[1];
        element.style.animation = animations[elementType];
        
        // Add interaction
        element.addEventListener('mouseenter', function() {
            this.style.animationPlayState = 'paused';
            this.style.transform = 'scale(1.2)';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.animationPlayState = 'running';
            this.style.transform = 'scale(1)';
        });
    });
    
    // Add CSS for animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0% { transform: translateY(0px) rotate(0deg); }
            100% { transform: translateY(-20px) rotate(5deg); }
        }
        
        @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.1); }
        }
        
        @keyframes wave {
            0%, 100% { transform: translateX(0) rotate(0deg); }
            25% { transform: translateX(10px) rotate(5deg); }
            75% { transform: translateX(-10px) rotate(-5deg); }
        }
        
        @keyframes bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
        }
    `;
    document.head.appendChild(style);
}

function initImpactDashboard() {
    // Initialize time filter buttons
    const timeFilters = document.querySelectorAll('.time-filter');
    let currentTimeFilter = 'today';
    
    timeFilters.forEach(filter => {
        filter.addEventListener('click', function() {
            const timeRange = this.dataset.time;
            
            // Update active state
            timeFilters.forEach(f => f.classList.remove('active'));
            this.classList.add('active');
            
            // Update dashboard data
            updateDashboardData(timeRange);
            currentTimeFilter = timeRange;
            
            // Track filter usage
            trackEvent('dashboard_filter_changed', { time_range: timeRange });
        });
    });
    
    // Initialize dashboard charts
    initDashboardCharts();
    
    // Start live updates
    startLiveDashboardUpdates();
}

function initDashboardCharts() {
    // CO₂ Reduction Chart
    const co2Ctx = document.getElementById('co2-chart').getContext('2d');
    window.co2Chart = new Chart(co2Ctx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [{
                label: 'CO₂ Reduction (tons)',
                data: [12, 19, 15, 25, 22, 30],
                borderColor: '#3A7D44',
                backgroundColor: 'rgba(58, 125, 68, 0.1)',
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        display: false
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            }
        }
    });
    
    // Social Impact Chart
    const socialCtx = document.getElementById('social-chart').getContext('2d');
    window.socialChart = new Chart(socialCtx, {
        type: 'bar',
        data: {
            labels: ['Farmers', 'Training', 'Kitchens', 'Jobs'],
            datasets: [{
                label: 'Impact',
                data: [150, 1200, 45, 25],
                backgroundColor: [
                    '#FDB813',
                    '#0B3D91',
                    '#3A7D44',
                    '#FF6F00'
                ],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        display: false
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            }
        }
    });
    
    // Economic Impact Chart
    const economicCtx = document.getElementById('economic-chart').getContext('2d');
    window.economicChart = new Chart(economicCtx, {
        type: 'doughnut',
        data: {
            labels: ['Fuel Savings', 'ROI', 'Job Creation', 'Other'],
            datasets: [{
                data: [65, 20, 10, 5],
                backgroundColor: [
                    '#0B3D91',
                    '#3A7D44',
                    '#FDB813',
                    '#FF6F00'
                ],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            cutout: '70%',
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });
}

function updateDashboardData(timeRange) {
    // Simulate data update based on time range
    const dataByRange = {
        today: {
            co2: [1, 2, 3, 4, 5, 6],
            social: [10, 50, 3, 2],
            economic: [70, 15, 10, 5]
        },
        week: {
            co2: [12, 15, 18, 14, 16, 20],
            social: [80, 400, 20, 10],
            economic: [65, 20, 10, 5]
        },
        month: {
            co2: [50, 55, 60, 65, 70, 75],
            social: [300, 1200, 45, 25],
            economic: [60, 25, 10, 5]
        },
        year: {
            co2: [600, 650, 700, 750, 800, 850],
            social: [3500, 15000, 500, 120],
            economic: [55, 30, 10, 5]
        },
        all: {
            co2: [1200, 1300, 1400, 1500, 1600, 1700],
            social: [10000, 50000, 1500, 350],
            economic: [50, 35, 10, 5]
        }
    };
    
    const data = dataByRange[timeRange];
    
    // Update charts
    if (window.co2Chart) {
        window.co2Chart.data.datasets[0].data = data.co2;
        window.co2Chart.update();
    }
    
    if (window.socialChart) {
        window.socialChart.data.datasets[0].data = data.social;
        window.socialChart.update();
    }
    
    if (window.economicChart) {
        window.economicChart.data.datasets[0].data = data.economic;
        window.economicChart.update();
    }
    
    // Update metric values
    updateMetricValues(timeRange);
}

function updateMetricValues(timeRange) {
    // Update live metric values based on time range
    const metrics = {
        today: {
            co2Today: '125 kg',
            treesEquivalent: '3',
            pollutionPrevented: '95 kg',
            incomeIncrease: '25%',
            communityKitchens: '2',
            trainingHours: '8',
            fuelSavings: '₹ 5,200',
            avgRoi: '28%',
            jobsCreated: '1'
        },
        week: {
            co2Today: '850 kg',
            treesEquivalent: '21',
            pollutionPrevented: '650 kg',
            incomeIncrease: '30%',
            communityKitchens: '5',
            trainingHours: '45',
            fuelSavings: '₹ 35,000',
            avgRoi: '30%',
            jobsCreated: '3'
        },
        month: {
            co2Today: '3.5 tons',
            treesEquivalent: '88',
            pollutionPrevented: '2.8 tons',
            incomeIncrease: '35%',
            communityKitchens: '8',
            trainingHours: '200',
            fuelSavings: '₹ 1,50,000',
            avgRoi: '32%',
            jobsCreated: '10'
        },
        year: {
            co2Today: '42 tons',
            treesEquivalent: '1050',
            pollutionPrevented: '33 tons',
            incomeIncrease: '40%',
            communityKitchens: '25',
            trainingHours: '2400',
            fuelSavings: '₹ 18,00,000',
            avgRoi: '35%',
            jobsCreated: '50'
        },
        all: {
            co2Today: '1,250 tons',
            treesEquivalent: '31,250',
            pollutionPrevented: '1,000 tons',
            incomeIncrease: '45%',
            communityKitchens: '45',
            trainingHours: '12,000',
            fuelSavings: '₹ 1,20,00,000',
            avgRoi: '40%',
            jobsCreated: '150'
        }
    };
    
    const metricData = metrics[timeRange];
    
    // Update each metric
    Object.keys(metricData).forEach(key => {
        const element = document.getElementById(key);
        if (element) {
            // Animate value change
            animateValueChange(element, metricData[key]);
        }
    });
}

function animateValueChange(element, newValue) {
    const currentValue = element.textContent;
    if (currentValue !== newValue) {
        element.classList.add('updating');
        setTimeout(() => {
            element.textContent = newValue;
            element.classList.remove('updating');
            element.classList.add('updated');
            setTimeout(() => element.classList.remove('updated'), 500);
        }, 300);
    }
}

function startLiveDashboardUpdates() {
    // Simulate live data updates every 30 seconds
    setInterval(() => {
        // Randomly update some metrics
        const metricsToUpdate = [
            'co2-today',
            'fuel-savings',
            'training-hours'
        ];
        
        metricsToUpdate.forEach(metricId => {
            const element = document.getElementById(metricId);
            if (element) {
                const currentValue = parseFloat(element.textContent.replace(/[^\d.]/g, ''));
                const increment = Math.random() * 10;
                const newValue = currentValue + increment;
                
                // Format based on metric type
                let formattedValue;
                if (metricId.includes('co2')) {
                    formattedValue = `${newValue.toFixed(0)} kg`;
                } else if (metricId.includes('fuel')) {
                    formattedValue = `₹ ${newValue.toFixed(0)}`;
                } else {
                    formattedValue = `${newValue.toFixed(0)}`;
                }
                
                animateValueChange(element, formattedValue);
            }
        });
        
        // Update charts slightly
        if (window.co2Chart) {
            const data = window.co2Chart.data.datasets[0].data;
            const lastValue = data[data.length - 1];
            data.push(lastValue + Math.random() * 5);
            data.shift();
            window.co2Chart.update();
        }
        
    }, 30000); // Update every 30 seconds
}

function initComparisonTabs() {
    const comparisonTabs = document.querySelectorAll('.comparison-tab');
    const comparisonContents = document.querySelectorAll('.comparison-content');
    
    comparisonTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const compareType = this.dataset.compare;
            
            // Update active state
            comparisonTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // Show corresponding content
            comparisonContents.forEach(content => {
                content.classList.remove('active');
            });
            document.getElementById(`${compareType}-comparison`).classList.add('active');
            
            // Animate comparison transition
            animateComparisonTransition(compareType);
            
            // Track comparison view
            trackEvent('comparison_viewed', { comparison_type: compareType });
        });
    });
    
    // Add hover effects to impact items
    const impactItems = document.querySelectorAll('.impact-item');
    impactItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(5px)';
            this.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
            this.style.boxShadow = 'none';
        });
    });
}

function animateComparisonTransition(compareType) {
    const comparisonGrid = document.querySelector('.comparison-grid');
    if (comparisonGrid) {
        comparisonGrid.style.opacity = '0.5';
        comparisonGrid.style.transform = 'translateY(10px)';
        
        setTimeout(() => {
            comparisonGrid.style.opacity = '1';
            comparisonGrid.style.transform = 'translateY(0)';
            comparisonGrid.style.transition = 'all 0.3s ease';
        }, 150);
    }
}

function initImpactStories() {
    const storyCards = document.querySelectorAll('.story-card');
    
    storyCards.forEach(card => {
        // Add click to expand story
        card.addEventListener('click', function(e) {
            if (!e.target.closest('a')) {
                this.classList.toggle('expanded');
                
                if (this.classList.contains('expanded')) {
                    showFullStory(this.dataset.storyId || 'default');
                }
            }
        });
        
        // Add hover effects
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 20px 40px rgba(0,0,0,0.15)';
            
            // Animate impact stats
            const impactStats = this.querySelectorAll('.impact-stat .stat-value');
            impactStats.forEach((stat, index) => {
                setTimeout(() => {
                    stat.style.transform = 'scale(1.1)';
                    setTimeout(() => stat.style.transform = 'scale(1)', 300);
                }, index * 100);
            });
        });
        
        card.addEventListener('mouseleave', function() {
            if (!this.classList.contains('expanded')) {
                this.style.transform = 'translateY(0)';
                this.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
            }
        });
    });
}

function showFullStory(storyId) {
    // Create modal with full story
    const stories = {
        'farmer-rajesh': {
            title: 'Rajesh Kumar - Turmeric Farmer Success Story',
            location: 'Karnataka, 5 acres',
            duration: '2 years with KVB',
            challenges: [
                'High post-harvest losses (30-40%)',
                'Unreliable drying methods',
                'Low market prices due to poor quality',
                'High fuel costs for drying'
            ],
            solution: 'Solar tunnel dryer installation',
            results: [
                'Post-harvest losses reduced to 5%',
                'Drying time reduced from 7 days to 2 days',
                'Product quality improved (Grade A)',
                'Market price increased by 40%',
                'Fuel costs eliminated completely'
            ],
            impact: {
                financial: 'Annual income increased from ₹ 3L to ₹ 4.2L',
                environmental: 'Saves 2 tons of firewood annually',
                social: 'Now trains other farmers in solar drying',
                scalability: 'Planning to expand to 10 acres'
            },
            quote: '"The solar dryer was a game-changer. Better quality, higher prices, and no fuel costs. I'm now teaching other farmers how to do it."',
            images: [
                'assets/images/stories/farmer-1.jpg',
                'assets/images/stories/farmer-2.jpg',
                'assets/images/stories/farmer-3.jpg'
            ]
        }
        // Add more stories as needed
    };
    
    const story = stories[storyId];
    if (!story) return;
    
    // Implementation similar to previous modals
    // Create modal with story details
    const modal = document.createElement('div');
    modal.className = 'story-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h2>${story.title}</h2>
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-body">
                <!-- Story details implementation -->
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Add modal functionality
    modal.querySelector('.modal-close').addEventListener('click', () => {
        modal.remove();
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
}

function initSDGCards() {
    const sdgCards = document.querySelectorAll('.sdg-card');
    
    sdgCards.forEach(card => {
        const sdgNumber = card.dataset.sdg;
        
        // Add SDG-specific styling
        const sdgColors = {
            '7': '#FDB813',  // Affordable & Clean Energy
            '2': '#3A7D44',  // Zero Hunger
            '13': '#0B3D91', // Climate Action
            '8': '#FF6F00',  // Economic Growth
            '12': '#6C757D', // Responsible Consumption
            '15': '#28A745'  // Life on Land
        };
        
        card.style.borderLeft = `4px solid ${sdgColors[sdgNumber] || '#0B3D91'}`;
        
        // Add click to show SDG details
        card.addEventListener('click', function() {
            showSDGDetails(sdgNumber);
        });
        
        // Add hover effects
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = `0 10px 25px ${sdgColors[sdgNumber]}40`;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 5px 15px rgba(0,0,0,0.05)';
        });
    });
}

function showSDGDetails(sdgNumber) {
    const sdgDetails = {
        '7': {
            title: 'SDG 7: Affordable & Clean Energy',
            description: 'Ensure access to affordable, reliable, sustainable and modern energy for all',
            targets: [
                'Universal access to affordable, reliable energy services',
                'Increase substantially the share of renewable energy',
                'Double the global rate of improvement in energy efficiency',
                'Enhance international cooperation for clean energy'
            ],
            kvbContribution: [
                'Providing solar thermal energy for cooking and heating',
                'Replacing fossil fuels in institutional and industrial applications',
                'Making renewable energy affordable and accessible',
                'Training and capacity building for renewable energy adoption'
            ],
            impactMetrics: [
                '85% fossil fuel replacement rate',
                '25+ years system lifespan',
                '3-5 year ROI for clients',
                '150+ installations across India'
            ]
        }
        // Add other SDG details
    };
    
    const details = sdgDetails[sdgNumber];
    if (!details) return;
    
    // Create modal similar to previous implementations
    // Implementation would follow the same pattern as other modals
}

function initImpactCalculator() {
    const calcTabs = document.querySelectorAll('.calc-tab');
    const calcContents = document.querySelectorAll('.calculator-content');
    
    calcTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const calcType = this.dataset.calc;
            
            // Update active state
            calcTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // Show corresponding content
            calcContents.forEach(content => {
                content.classList.remove('active');
            });
            document.getElementById(`${calcType}-calculator`).classList.add('active');
        });
    });
    
    // Initialize calculator functionality
    initCalculatorFunctionality();
}

function initCalculatorFunctionality() {
    const calculateBtn = document.getElementById('calculate-impact');
    if (calculateBtn) {
        calculateBtn.addEventListener('click', calculateImpact);
    }
    
    // Add real-time calculation on input change
    const inputs = document.querySelectorAll('.calc-inputs input, .calc-inputs select');
    inputs.forEach(input => {
        input.addEventListener('change', calculateImpact);
    });
}

function calculateImpact() {
    // Get input values
    const fuelType = document.getElementById('current-fuel').value;
    const dailyConsumption = parseFloat(document.getElementById('daily-consumption').value) || 0;
    const unit = document.getElementById('consumption-unit').value;
    const operatingDays = parseFloat(document.getElementById('operating-days').value) || 0;
    const systemSize = document.getElementById('system-size').value;
    
    // Conversion factors
    const conversionFactors = {
        lpg: { co2PerKg: 3.0, costPerKg: 110, unit: 'kg' },
        firewood: { co2PerKg: 1.5, costPerKg: 8, unit: 'kg' },
        diesel: { co2PerLiter: 2.68, costPerLiter: 95, unit: 'liters' },
        electric: { co2PerKwh: 0.8, costPerKwh: 8, unit: 'kwh' }
    };
    
    const fuelData = conversionFactors[fuelType];
    if (!fuelData) return;
    
    // Calculate monthly consumption
    let monthlyConsumption;
    if (unit === fuelData.unit) {
        monthlyConsumption = dailyConsumption * operatingDays;
    } else {
        // Handle unit conversions if needed
        monthlyConsumption = dailyConsumption * operatingDays;
    }
    
    // Calculate impacts
    const monthlyCost = monthlyConsumption * (fuelData.costPerKg || fuelData.costPerLiter || fuelData.costPerKwh);
    const annualCost = monthlyCost * 12;
    
    const monthlyCO2 = monthlyConsumption * (fuelData.co2PerKg || fuelData.co2PerLiter || fuelData.co2PerKwh);
    const annualCO2 = monthlyCO2 * 12;
    
    // Trees saved (assuming 1 tree = 50 kg CO2 absorption per year)
    const treesSaved = annualCO2 / 50;
    
    // System cost based on size
    const systemCosts = {
        small: 500000,
        medium: 1500000,
        large: 3000000,
        custom: 0
    };
    
    const systemCost = systemCosts[systemSize];
    const maintenanceCost = systemCost * 0.02; // 2% annually
    
    // Annual savings (assuming 70% fuel replacement)
    const annualSavings = annualCost * 0.7;
    const monthlySavings = annualSavings / 12;
    
    // ROI period
    const roiPeriod = systemCost / annualSavings;
    
    // Update results
    updateResult('annual-savings', formatCurrency(annualSavings));
    updateResult('co2-reduction', `${annualCO2.toFixed(0)} tons`);
    updateResult('trees-saved', treesSaved.toFixed(0));
    updateResult('roi-period', roiPeriod.toFixed(1));
    updateResult('monthly-savings', formatCurrency(monthlySavings));
    updateResult('system-cost', formatCurrency(systemCost));
    updateResult('maintenance-cost', formatCurrency(maintenanceCost));
    
    // Animate result updates
    animateResults();
}

function updateResult(elementId, value) {
    const element = document.getElementById(elementId);
    if (element) {
        element.textContent = value;
    }
}

function formatCurrency(amount) {
    if (amount >= 10000000) {
        return `₹ ${(amount / 10000000).toFixed(2)} Cr`;
    } else if (amount >= 100000) {
        return `₹ ${(amount / 100000).toFixed(2)} L`;
    } else {
        return `₹ ${amount.toFixed(0)}`;
    }
}

function animateResults() {
    const resultCards = document.querySelectorAll('.result-card');
    resultCards.forEach((card, index) => {
        setTimeout(() => {
            card.classList.add('pulse');
            setTimeout(() => card.classList.remove('pulse'), 500);
        }, index * 100);
    });
}

function initLiveDashboard() {
    // Update hero stats with animated counters
    const heroStats = [
        { id: 'co2-saved-total', target: 1250, suffix: '' },
        { id: 'fuel-saved-total', target: 500, suffix: '' },
        { id: 'farmers-impacted', target: 10000, suffix: '+' },
        { id: 'meals-cooked', target: 25000000, suffix: '+' }
    ];
    
    heroStats.forEach(stat => {
        const element = document.getElementById(stat.id);
        if (element) {
            animateCounter(element, stat.target, stat.suffix);
        }
    });
}

function animateCounter(element, target, suffix = '') {
    const duration = 2000; // 2 seconds
    const step = target / (duration / 16); // 60fps
    let current = 0;
    
    const updateCounter = () => {
        current += step;
        if (current < target) {
            element.textContent = Math.floor(current).toLocaleString() + suffix;
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target.toLocaleString() + suffix;
        }
    };
    
    updateCounter();
}

function initScrollAnimations() {
    // Animate elements on scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, { threshold: 0.1 });
    
    // Observe elements to animate
    const elementsToAnimate = document.querySelectorAll('.sdg-card, .story-card, .comparison-column, .result-card');
    elementsToAnimate.forEach(element => observer.observe(element));
}

// Export impact data for reporting
function exportImpactData() {
    const impactData = {
        environmental: {
            co2Reduced: 1250, // tons
            fuelSaved: 500, // tons
            treesSaved: 31250,
            pollutionPrevented: 1000 // tons
        },
        social: {
            farmersImpacted: 10000,
            communityKitchens: 45,
            trainingHours: 12000,
            mealsCooked: 25000000
        },
        economic: {
            fuelCostSavings: 12000000, // ₹
            farmerIncomeIncrease: 45, // %
            jobsCreated: 150,
            avgRoi: 40 // %
        },
        sdgContributions: {
            sdg7: 85, // %
            sdg2: 70, // %
            sdg13: 90, // %
            sdg8: 75, // %
            sdg12: 80, // %
            sdg15: 95 // %
        }
    };
    
    return impactData;
}

// Generate impact report
function generateImpactReport() {
    const data = exportImpactData();
    
    // Create downloadable report
    const report = `
        KVB GREEN ENERGIES - IMPACT REPORT
        Generated: ${new Date().toLocaleDateString()}
        
        ENVIRONMENTAL IMPACT:
        - CO₂ Reduced: ${data.environmental.co2Reduced} tons
        - Fuel Saved: ${data.environmental.fuelSaved} tons
        - Trees Saved: ${data.environmental.treesSaved}
        - Pollution Prevented: ${data.environmental.pollutionPrevented} tons
        
        SOCIAL IMPACT:
        - Farmers Impacted: ${data.social.farmersImpacted}
        - Community Kitchens: ${data.social.communityKitchens}
        - Training Hours: ${data.social.trainingHours}
        - Solar-Cooked Meals: ${data.social.mealsCooked.toLocaleString()}
        
        ECONOMIC IMPACT:
        - Fuel Cost Savings: ₹ ${data.economic.fuelCostSavings.toLocaleString()}
        - Farmer Income Increase: ${data.economic.farmerIncomeIncrease}%
        - Green Jobs Created: ${data.economic.jobsCreated}
        - Average ROI: ${data.economic.avgRoi}%
        
        SDG CONTRIBUTIONS:
        - SDG 7 (Clean Energy): ${data.sdgContributions.sdg7}%
        - SDG 2 (Zero Hunger): ${data.sdgContributions.sdg2}%
        - SDG 13 (Climate Action): ${data.sdgContributions.sdg13}%
        - SDG 8 (Economic Growth): ${data.sdgContributions.sdg8}%
        - SDG 12 (Responsible Consumption): ${data.sdgContributions.sdg12}%
        - SDG 15 (Life on Land): ${data.sdgContributions.sdg15}%
        
        ---
        Report generated from live sustainability dashboard.
        Last updated: ${new Date().toISOString()}
    `;
    
    return report;
}

// Initialize impact report download
function initImpactReportDownload() {
    const reportBtn = document.createElement('button');
    reportBtn.className = 'download-report-btn';
    reportBtn.innerHTML = '📥 Download Impact Report';
    
    const ctaSection = document.querySelector('.sustainability-cta .cta-buttons');
    if (ctaSection) {
        ctaSection.appendChild(reportBtn);
        
        reportBtn.addEventListener('click', function() {
            const report = generateImpactReport();
            const blob = new Blob([report], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);
            
            const a = document.createElement('a');
            a.href = url;
            a.download = `kvb-impact-report-${new Date().toISOString().split('T')[0]}.txt`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            
            // Track download
            trackEvent('impact_report_downloaded', {
                timestamp: new Date().toISOString()
            });
        });
    }
}

// Initialize when page loads
setTimeout(initImpactReportDownload, 2000);