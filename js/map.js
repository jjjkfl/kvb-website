// Interactive India Map for Clients Page
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('india-map')) {
        initIndiaMap();
    }
});

function initIndiaMap() {
    // Initialize map centered on India
    const map = L.map('india-map').setView([20.5937, 78.9629], 5);
    
    // Add tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);
    
    // Client locations data
    const clientLocations = [
        {
            name: "Indian Army, Chennai",
            type: "military",
            lat: 13.0827,
            lng: 80.2707,
            installation: "500-meal solar cooking system",
            impact: "65% LPG savings",
            icon: "⚔️"
        },
        {
            name: "INS Mandovi, Goa",
            type: "military",
            lat: 15.2993,
            lng: 74.1240,
            installation: "Naval base solar kitchen",
            impact: "70% fuel reduction",
            icon: "⚓"
        },
        {
            name: "YASHADA, Pune",
            type: "government",
            lat: 18.5204,
            lng: 73.8567,
            installation: "Government training institute",
            impact: "Solar steam cooking",
            icon: "🏛️"
        },
        {
            name: "UAS Bengaluru",
            type: "education",
            lat: 12.9716,
            lng: 77.5946,
            installation: "University mess system",
            impact: "1000 students served",
            icon: "🎓"
        },
        {
            name: "UHS Bagalkot",
            type: "education",
            lat: 16.1888,
            lng: 75.6967,
            installation: "Performance testing lab",
            impact: "MNRE certification",
            icon: "🔬"
        },
        {
            name: "Sri Siddharodhmath, Hubli",
            type: "religious",
            lat: 15.3647,
            lng: 75.1239,
            installation: "Community kitchen",
            impact: "Thousands served daily",
            icon: "🕌"
        },
        {
            name: "Coffee Board, Balehonnur",
            type: "agriculture",
            lat: 13.3565,
            lng: 75.4645,
            installation: "Solar drying systems",
            impact: "Coffee processing",
            icon: "☕"
        },
        {
            name: "Sri Siddaganga Math, Tumkur",
            type: "religious",
            lat: 13.3379,
            lng: 77.1173,
            installation: "Large-scale solar cooking",
            impact: "Community service",
            icon: "🕉️"
        },
        {
            name: "Dantiwada Agriculture University",
            type: "education",
            lat: 24.3728,
            lng: 72.0420,
            installation: "Solar drying research",
            impact: "Agricultural training",
            icon: "🌾"
        },
        {
            name: "Nithya Foods, Puttur",
            type: "industry",
            lat: 12.7668,
            lng: 75.2026,
            installation: "Food processing",
            impact: "Industrial solar thermal",
            icon: "🏭"
        },
        {
            name: "Sugati Ingredients, Challakere",
            type: "industry",
            lat: 14.3172,
            lng: 76.6513,
            installation: "Spice processing",
            impact: "Solar drying technology",
            icon: "🌶️"
        },
        {
            name: "Prakruti, Karwar",
            type: "religious",
            lat: 14.8138,
            lng: 74.1290,
            installation: "Eco-community center",
            impact: "Sustainable living",
            icon: "🌿"
        }
    ];
    
    // Create marker clusters for better visualization
    const markers = L.markerClusterGroup({
        iconCreateFunction: function(cluster) {
            const count = cluster.getChildCount();
            let size = 'medium';
            if (count > 10) size = 'large';
            if (count > 20) size = 'xlarge';
            
            return L.divIcon({
                html: `<div class="cluster-marker ${size}">${count}</div>`,
                className: 'custom-cluster',
                iconSize: [40, 40]
            });
        }
    });
    
    // Add markers for each location
    clientLocations.forEach(client => {
        const marker = L.marker([client.lat, client.lng], {
            icon: L.divIcon({
                html: `<div class="client-marker ${client.type}" title="${client.name}">${client.icon}</div>`,
                className: 'custom-marker',
                iconSize: [30, 30]
            })
        });
        
        // Add popup with client info
        marker.bindPopup(`
            <div class="map-popup">
                <h3>${client.name}</h3>
                <p><strong>Installation:</strong> ${client.installation}</p>
                <p><strong>Impact:</strong> ${client.impact}</p>
                <p><strong>Type:</strong> ${getClientTypeLabel(client.type)}</p>
                <button class="btn-small view-details" data-client="${client.name.replace(/\s+/g, '-').toLowerCase()}">
                    View Details
                </button>
            </div>
        `);
        
        markers.addLayer(marker);
    });
    
    // Add markers to map
    map.addLayer(markers);
    
    // Fit map to show all markers
    if (clientLocations.length > 0) {
        const bounds = L.latLngBounds(clientLocations.map(c => [c.lat, c.lng]));
        map.fitBounds(bounds, { padding: [50, 50] });
    }
    
    // Filter functionality
    window.updateMapFilter = function(filterType) {
        markers.clearLayers();
        
        const filteredClients = filterType === 'all' 
            ? clientLocations 
            : clientLocations.filter(client => client.type === filterType);
        
        filteredClients.forEach(client => {
            const marker = L.marker([client.lat, client.lng], {
                icon: L.divIcon({
                    html: `<div class="client-marker ${client.type}" title="${client.name}">${client.icon}</div>`,
                    className: 'custom-marker',
                    iconSize: [30, 30]
                })
            });
            
            marker.bindPopup(`
                <div class="map-popup">
                    <h3>${client.name}</h3>
                    <p><strong>Installation:</strong> ${client.installation}</p>
                    <p><strong>Impact:</strong> ${client.impact}</p>
                    <button class="btn-small view-details" data-client="${client.name.replace(/\s+/g, '-').toLowerCase()}">
                        View Details
                    </button>
                </div>
            `);
            
            markers.addLayer(marker);
        });
        
        map.addLayer(markers);
        
        // Fit bounds to filtered markers
        if (filteredClients.length > 0) {
            const bounds = L.latLngBounds(filteredClients.map(c => [c.lat, c.lng]));
            map.fitBounds(bounds, { padding: [50, 50] });
        }
    };
    
    // Initialize map controls
    document.querySelectorAll('.map-filter').forEach(button => {
        button.addEventListener('click', function() {
            const filterType = this.dataset.filter;
            
            // Update active state
            document.querySelectorAll('.map-filter').forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Update map
            updateMapFilter(filterType);
            
            // Update category tabs if they exist
            const categoryTab = document.querySelector(`.category-tab[data-category="${filterType}"]`);
            if (categoryTab) {
                document.querySelectorAll('.category-tab').forEach(t => t.classList.remove('active'));
                categoryTab.classList.add('active');
                
                document.querySelectorAll('.category-content').forEach(c => c.classList.remove('active'));
                document.getElementById(filterType).classList.add('active');
            }
        });
    });
    
    // Handle view details from popup
    map.on('popupopen', function(e) {
        const popup = e.popup;
        const viewDetailsBtn = popup._contentNode.querySelector('.view-details');
        
        if (viewDetailsBtn) {
            viewDetailsBtn.addEventListener('click', function() {
                const clientId = this.dataset.client;
                
                // Find client in our data
                const client = clientLocations.find(c => 
                    c.name.replace(/\s+/g, '-').toLowerCase() === clientId
                );
                
                if (client) {
                    // Close popup
                    map.closePopup();
                    
                    // Open case study or client details
                    openClientDetails(client.name);
                }
            });
        }
    });
    
    // Add custom CSS for markers
    const style = document.createElement('style');
    style.textContent = `
        .client-marker {
            width: 30px;
            height: 30px;
            background: white;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 16px;
            box-shadow: 0 2px 5px rgba(0,0,0,0.3);
            cursor: pointer;
            transition: all 0.3s ease;
        }
        
        .client-marker:hover {
            transform: scale(1.2);
            box-shadow: 0 5px 15px rgba(0,0,0,0.3);
        }
        
        .client-marker.military { border: 3px solid #dc3545; }
        .client-marker.education { border: 3px solid #007bff; }
        .client-marker.religious { border: 3px solid #28a745; }
        .client-marker.government { border: 3px solid #6f42c1; }
        .client-marker.agriculture { border: 3px solid #fd7e14; }
        .client-marker.industry { border: 3px solid #17a2b8; }
        
        .cluster-marker {
            width: 40px;
            height: 40px;
            background: var(--accent-orange);
            color: white;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            font-size: 14px;
        }
        
        .cluster-marker.medium {
            width: 45px;
            height: 45px;
            font-size: 16px;
        }
        
        .cluster-marker.large {
            width: 50px;
            height: 50px;
            font-size: 18px;
            background: var(--solar-yellow);
        }
        
        .cluster-marker.xlarge {
            width: 60px;
            height: 60px;
            font-size: 20px;
            background: var(--eco-green);
        }
        
        .map-popup {
            min-width: 250px;
        }
        
        .map-popup h3 {
            margin: 0 0 10px 0;
            font-size: 16px;
        }
        
        .map-popup p {
            margin: 5px 0;
            font-size: 14px;
        }
        
        .map-popup .btn-small {
            margin-top: 10px;
            width: 100%;
        }
    `;
    document.head.appendChild(style);
}

function getClientTypeLabel(type) {
    const labels = {
        military: 'Defense & Military',
        education: 'Educational Institution',
        religious: 'Religious Institution',
        government: 'Government Department',
        agriculture: 'Agriculture Organization',
        industry: 'Food Industry'
    };
    return labels[type] || type;
}

function openClientDetails(clientName) {
    // Find corresponding client in the page
    const clientElements = document.querySelectorAll('.client-card h3');
    for (const element of clientElements) {
        if (element.textContent === clientName) {
            // Scroll to and highlight the client card
            element.closest('.client-card').scrollIntoView({ 
                behavior: 'smooth',
                block: 'center'
            });
            
            // Add highlight effect
            const card = element.closest('.client-card');
            card.classList.add('highlighted');
            setTimeout(() => card.classList.remove('highlighted'), 3000);
            
            // If there's a view case study button, click it
            const viewBtn = card.querySelector('.view-case-study');
            if (viewBtn) {
                setTimeout(() => viewBtn.click(), 500);
            }
            break;
        }
    }
}

// Export map data for analytics
function exportMapData() {
    const mapData = {
        totalLocations: clientLocations.length,
        locationsByType: {},
        geographicSpread: {
            northern: 0,
            southern: 0,
            eastern: 0,
            western: 0,
            central: 0
        }
    };
    
    // Count by type
    clientLocations.forEach(client => {
        mapData.locationsByType[client.type] = (mapData.locationsByType[client.type] || 0) + 1;
        
        // Geographic classification
        if (client.lat > 20) {
            if (client.lng > 78) {
                mapData.geographicSpread.eastern++;
            } else {
                mapData.geographicSpread.northern++;
            }
        } else {
            if (client.lng > 78) {
                mapData.geographicSpread.southern++;
            } else {
                mapData.geographicSpread.western++;
            }
        }
    });
    
    return mapData;
}

// Initialize analytics for map interactions
function initMapAnalytics() {
    const mapElement = document.getElementById('india-map');
    if (!mapElement) return;
    
    // Track map interactions
    let interactionCount = 0;
    let lastInteraction = Date.now();
    
    mapElement.addEventListener('click', () => {
        interactionCount++;
        lastInteraction = Date.now();
        
        if (interactionCount % 5 === 0) {
            trackEvent('map_interaction', {
                interaction_count: interactionCount,
                duration: Date.now() - lastInteraction
            });
        }
    });
    
    // Track filter usage
    document.querySelectorAll('.map-filter').forEach(button => {
        button.addEventListener('click', function() {
            trackEvent('map_filter_used', {
                filter_type: this.dataset.filter,
                timestamp: new Date().toISOString()
            });
        });
    });
}

// Initialize map analytics
initMapAnalytics();