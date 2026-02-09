// Enhanced Counter Functions
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all counters
    initEnhancedCounters();
    initROICalculator();
});

function initEnhancedCounters() {
    const counters = document.querySelectorAll('.metric-value');
    
    counters.forEach(counter => {
        // Format large numbers
        const value = parseInt(counter.getAttribute('data-count'));
        if (value > 1000) {
            counter.setAttribute('data-original', value);
            // Add plus sign for large numbers
            if (!counter.textContent.includes('+')) {
                counter.textContent = '0';
            }
        }
    });
}

function initROICalculator() {
    const calculator = document.getElementById('roi-calculator');
    if (!calculator) return;
    
    const lpgInput = calculator.querySelector('#lpg-usage');
    const firewoodInput = calculator.querySelector('#firewood-usage');
    const calculateBtn = calculator.querySelector('#calculate-roi');
    const resultsDiv = calculator.querySelector('#roi-results');
    
    calculateBtn.addEventListener('click', function() {
        const lpgUsage = parseFloat(lpgInput.value) || 0;
        const firewoodUsage = parseFloat(firewoodInput.value) || 0;
        
        if (lpgUsage === 0 && firewoodUsage === 0) {
            resultsDiv.innerHTML = '<p class="error">Please enter at least one fuel usage value</p>';
            return;
        }
        
        // Calculate savings (simplified calculation)
        const lpgSavings = lpgUsage * 85 * 12; // 85 rupees per kg, 12 months
        const firewoodSavings = firewoodUsage * 15 * 12; // 15 rupees per kg, 12 months
        const totalSavings = lpgSavings + firewoodSavings;
        
        // Calculate CO2 reduction
        const co2Reduction = (lpgUsage * 3.15 * 12) + (firewoodUsage * 1.5 * 12); // kg CO2 per kg fuel
        
        // Calculate payback period (assuming average system cost of 10 lakhs)
        const systemCost = 1000000;
        const paybackYears = systemCost / totalSavings;
        
        // Display results
        resultsDiv.innerHTML = `
            <div class="roi-results-grid">
                <div class="roi-result">
                    <h4>Annual Savings</h4>
                    <p class="roi-value">₹${totalSavings.toLocaleString()}</p>
                </div>
                <div class="roi-result">
                    <h4>CO₂ Reduction</h4>
                    <p class="roi-value">${co2Reduction.toLocaleString()} kg/year</p>
                </div>
                <div class="roi-result">
                    <h4>Payback Period</h4>
                    <p class="roi-value">${paybackYears.toFixed(1)} years</p>
                </div>
                <div class="roi-result">
                    <h4>Monthly Savings</h4>
                    <p class="roi-value">₹${(totalSavings / 12).toLocaleString()}</p>
                </div>
            </div>
            <p class="roi-note">Note: Calculations are estimates. Contact us for a detailed assessment.</p>
        `;
        
        // Animate results
        const values = resultsDiv.querySelectorAll('.roi-value');
        values.forEach((value, index) => {
            value.style.opacity = '0';
            value.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                value.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                value.style.opacity = '1';
                value.style.transform = 'translateY(0)';
            }, index * 100);
        });
    });
}

// Export for use in other modules
window.KVBCounters = {
    initEnhancedCounters,
    initROICalculator
};