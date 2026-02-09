// ROI & Impact Calculator
document.addEventListener('DOMContentLoaded', function() {
    initROICalculator();
});

function initROICalculator() {
    const calculateBtn = document.getElementById('calculate-roi');
    if (!calculateBtn) return;
    
    // Fuel prices and emission factors
    const fuelData = {
        lpg: {
            pricePerKg: 110, // ₹ per kg
            co2PerKg: 3, // kg CO2 per kg LPG
            efficiency: 0.85
        },
        firewood: {
            pricePerKg: 8, // ₹ per kg
            co2PerKg: 1.5, // kg CO2 per kg
            efficiency: 0.25
        },
        electric: {
            pricePerKwh: 8, // ₹ per kWh
            co2PerKwh: 0.8, // kg CO2 per kWh
            efficiency: 0.95
        },
        diesel: {
            pricePerLitre: 95, // ₹ per litre
            co2PerLitre: 2.68, // kg CO2 per litre
            efficiency: 0.75
        }
    };
    
    // Solar system data
    const solarSystem = {
        capitalCost: 500000, // ₹ for 100 meals/day system
        maintenancePerYear: 10000,
        lifespan: 25,
        efficiency: 0.65,
        fuelReduction: 0.7 // 70% reduction
    };
    
    calculateBtn.addEventListener('click', calculateROI);
    
    // Calculate on input change
    document.querySelectorAll('#fuel-type, #daily-usage, #days-operating').forEach(input => {
        input.addEventListener('change', calculateROI);
    });
    
    function calculateROI() {
        const fuelType = document.getElementById('fuel-type').value;
        const dailyUsage = parseFloat(document.getElementById('daily-usage').value);
        const daysOperating = parseFloat(document.getElementById('days-operating').value);
        
        if (!fuelType || !dailyUsage || !daysOperating) return;
        
        const fuel = fuelData[fuelType];
        
        // Monthly fuel cost
        const monthlyFuelUsage = dailyUsage * daysOperating;
        const monthlyFuelCost = monthlyFuelUsage * fuel.pricePerKg;
        
        // Monthly solar savings (70% reduction)
        const monthlySolarSavings = monthlyFuelCost * solarSystem.fuelReduction;
        
        // CO2 reduction
        const monthlyCo2Reduction = monthlyFuelUsage * fuel.co2PerKg * solarSystem.fuelReduction;
        
        // Payback period (months)
        const paybackMonths = Math.ceil(solarSystem.capitalCost / monthlySolarSavings);
        
        // Update display
        document.getElementById('monthly-savings').textContent = 
            '₹ ' + Math.round(monthlySolarSavings).toLocaleString();
        
        document.getElementById('co2-reduction').textContent = 
            Math.round(monthlyCo2Reduction) + ' kg';
        
        document.getElementById('payback-period').textContent = 
            paybackMonths + ' months';
        
        // Show detailed breakdown
        showDetailedBreakdown({
            fuelType,
            monthlyFuelCost,
            monthlySolarSavings,
            monthlyCo2Reduction,
            paybackMonths,
            annualSavings: monthlySolarSavings * 12,
            totalCo2Savings: monthlyCo2Reduction * 12 * solarSystem.lifespan
        });
    }
    
    function showDetailedBreakdown(data) {
        const resultsDiv = document.querySelector('.calculator-results');
        
        // Create or update detailed breakdown
        let breakdown = resultsDiv.querySelector('.detailed-breakdown');
        if (!breakdown) {
            breakdown = document.createElement('div');
            breakdown.className = 'detailed-breakdown';
            resultsDiv.appendChild(breakdown);
        }
        
        breakdown.innerHTML = `
            <h4>Detailed Analysis:</h4>
            <div class="breakdown-grid">
                <div class="breakdown-item">
                    <span>Annual Savings:</span>
                    <strong>₹ ${Math.round(data.annualSavings).toLocaleString()}</strong>
                </div>
                <div class="breakdown-item">
                    <span>25-year Savings:</span>
                    <strong>₹ ${Math.round(data.annualSavings * 25).toLocaleString()}</strong>
                </div>
                <div class="breakdown-item">
                    <span>Lifetime CO₂ Reduction:</span>
                    <strong>${Math.round(data.totalCo2Savings).toLocaleString()} kg</strong>
                </div>
                <div class="breakdown-item">
                    <span>Equivalent Trees Planted:</span>
                    <strong>${Math.round(data.totalCo2Savings / 50)} trees</strong>
                </div>
            </div>
            <p class="breakdown-note">
                *Based on 70% fuel reduction, 25-year system lifespan, and current fuel prices.
                Actual results may vary based on location and usage patterns.
            </p>
        `;
    }
    
    // Calculate on page load
    calculateROI();
}