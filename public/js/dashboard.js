// Dashboard JavaScript
document.addEventListener('DOMContentLoaded', function() {
    initializeDashboard();
    setupCharts();
    loadUserData();
});

function initializeDashboard() {
    // Charger les données utilisateur
    const userData = JSON.parse(localStorage.getItem('investFutureUser'));
    if (userData) {
        document.getElementById('userName').textContent = userData.name;
        document.getElementById('userFirstName').textContent = userData.firstName || userData.name.split(' ')[0];
    }

    // Simuler le chargement des données d'investissement
    loadPortfolioData();
}

function loadPortfolioData() {
    // Simulation des données du portefeuille
    const portfolioData = {
        totalInvested: 45750,
        currentValue: 52340,
        totalGain: 6590,
        gainPercentage: 14.4,
        activeProjects: 7
    };

    // Mettre à jour l'affichage
    document.getElementById('totalInvested').textContent = formatNumber(portfolioData.totalInvested) + '€';
    document.getElementById('currentValue').textContent = formatNumber(portfolioData.currentValue) + '€';
    document.getElementById('totalGain').textContent = '+' + formatNumber(portfolioData.totalGain) + '€';
    document.getElementById('activeProjects').textContent = portfolioData.activeProjects;
}

function setupCharts() {
    setupPerformanceChart();
    setupPortfolioChart();
}

function setupPerformanceChart() {
    const ctx = document.getElementById('performanceChart');
    if (!ctx) return;

    // Données de performance simulées
    const performanceData = {
        labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun', 'Jul', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc'],
        datasets: [{
            label: 'Valeur du portefeuille',
            data: [40000, 41200, 42800, 44100, 43900, 45200, 46800, 48200, 49500, 51200, 52100, 52340],
            borderColor: '#0d6efd',
            backgroundColor: 'rgba(13, 110, 253, 0.1)',
            tension: 0.4,
            fill: true
        }, {
            label: 'Montant investi',
            data: [40000, 40000, 42500, 42500, 42500, 45000, 45000, 45750, 45750, 45750, 45750, 45750],
            borderColor: '#6c757d',
            backgroundColor: 'transparent',
            borderDash: [5, 5],
            tension: 0.4
        }]
    };

    new Chart(ctx, {
        type: 'line',
        data: performanceData,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: true,
                    position: 'bottom'
                }
            },
            scales: {
                y: {
                    beginAtZero: false,
                    ticks: {
                        callback: function(value) {
                            return formatNumber(value) + '€';
                        }
                    }
                }
            },
            interaction: {
                intersect: false,
                mode: 'index'
            }
        }
    });
}

function setupPortfolioChart() {
    const ctx = document.getElementById('portfolioChart');
    if (!ctx) return;

    const portfolioData = {
        labels: ['IA & Deep-Tech', 'Énergies Renouvelables', 'Biotechnologies', 'Autres'],
        datasets: [{
            data: [32, 28, 22, 18],
            backgroundColor: [
                '#0d6efd',
                '#198754',
                '#ffc107',
                '#17a2b8'
            ],
            borderWidth: 0
        }]
    };

    new Chart(ctx, {
        type: 'doughnut',
        data: portfolioData,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            cutout: '60%'
        }
    });
}

function loadUserData() {
    // Charger les investissements récents
    loadRecentInvestments();
}

function loadRecentInvestments() {
    // Ces données seraient normalement chargées depuis une API
    const recentInvestments = [
        {
            id: 1,
            project: 'QuantumLeap Computing',
            description: 'Ordinateurs quantiques',
            sector: 'IA & Deep-Tech',
            amount: 15000,
            date: '2024-01-12',
            performance: 18.5,
            status: 'active',
            icon: 'fas fa-robot',
            color: 'primary'
        },
        {
            id: 2,
            project: 'WindTech Solutions',
            description: 'Éoliennes offshore',
            sector: 'Énergies Renouvelables',
            amount: 12500,
            date: '2023-12-28',
            performance: 24.2,
            status: 'active',
            icon: 'fas fa-wind',
            color: 'success'
        },
        {
            id: 3,
            project: 'mRNA Therapeutics',
            description: 'Vaccins ARNm cancer',
            sector: 'Biotechnologies',
            amount: 18250,
            date: '2023-11-15',
            performance: 31.7,
            status: 'active',
            icon: 'fas fa-dna',
            color: 'warning'
        }
    ];

    const tbody = document.getElementById('recentInvestments');
    if (tbody) {
        tbody.innerHTML = recentInvestments.map(investment => `
            <tr>
                <td>
                    <div class="d-flex align-items-center">
                        <div class="avatar-sm bg-${investment.color} bg-opacity-10 rounded me-3">
                            <i class="${investment.icon} text-${investment.color}"></i>
                        </div>
                        <div>
                            <div class="fw-semibold">${investment.project}</div>
                            <small class="text-muted">${investment.description}</small>
                        </div>
                    </div>
                </td>
                <td><span class="badge bg-${investment.color} bg-opacity-10 text-${investment.color}">${investment.sector}</span></td>
                <td class="fw-semibold">${formatNumber(investment.amount)}€</td>
                <td class="text-muted">${formatDate(investment.date)}</td>
                <td class="text-success fw-semibold">+${investment.performance}%</td>
                <td><span class="badge bg-success">Actif</span></td>
            </tr>
        `).join('');
    }
}

function formatNumber(num) {
    return new Intl.NumberFormat('fr-FR').format(num);
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    });
}

function logout() {
    localStorage.removeItem('investFutureUser');
    window.location.href = 'index.html';
}

// Gestion des filtres de période pour le graphique
document.addEventListener('change', function(e) {
    if (e.target.name === 'period') {
        updatePerformanceChart(e.target.id);
    }
});

function updatePerformanceChart(period) {
    // Simulation du changement de période
    console.log('Mise à jour du graphique pour la période:', period);
    // Ici on rechargerait les données selon la période sélectionnée
}

// Animation des statistiques au chargement
function animateStats() {
    const stats = document.querySelectorAll('.stats-card h4');
    stats.forEach((stat, index) => {
        setTimeout(() => {
            stat.style.opacity = '0';
            stat.style.transform = 'translateY(20px)';
            setTimeout(() => {
                stat.style.transition = 'all 0.6s ease';
                stat.style.opacity = '1';
                stat.style.transform = 'translateY(0)';
            }, 100);
        }, index * 200);
    });
}

// Lancer l'animation des stats après le chargement
setTimeout(animateStats, 500);