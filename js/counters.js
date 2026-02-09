// Animated Counters for Impact Metrics
document.addEventListener('DOMContentLoaded', function() {
    initAnimatedCounters();
    initSustainabilityDashboard();
});

function initAnimatedCounters() {
    const counters = document.querySelectorAll('.metric-value[data-count]');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.dataset.count);
                const duration = 2000; // 2 seconds
                const increment = target / (duration / 16); // 60fps
                let current = 0;
                
                const updateCounter = () => {
                    current += increment;
                    if (current < target) {
                        counter.textContent = Math.floor(current).toLocaleString();
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target.toLocaleString();
                        
                        // Add plus sign for large numbers
                        if (target >= 1000) {
                            counter.textContent += '+';
                        }
                    }
                };
                
                updateCounter();
                observer.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => observer.observe(counter));
}

function initSustainabilityDashboard() {
    // Simulated live data for sustainability dashboard
    const dashboardValues = {
        'co2-saved': 1250,
        'fuel-saved': 850,
        'energy-generated': 3240
    };
    
    // Update values every 10 seconds
    setInterval(() => {
        Object.keys(dashboardValues).forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                // Simulate small random increments
                dashboardValues[id] += Math.floor(Math.random() * 10);
                element.textContent = dashboardValues[id].toLocaleString();
                
                // Add pulse animation
                element.classList.add('pulse');
                setTimeout(() => element.classList.remove('pulse'), 500);
            }
        });
    }, 10000);
    
    // Initialize with current values
    Object.keys(dashboardValues).forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.textContent = dashboardValues[id].toLocaleString();
        }
    });
}