// Investments Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    initializeInvestmentsPage();
    setupEventListeners();
    loadInvestments();
});

function initializeInvestmentsPage() {
    // Charger les données utilisateur
    const userData = JSON.parse(localStorage.getItem('investFutureUser'));
    if (userData) {
        document.getElementById('userName').textContent = userData.name;
    }
}

function setupEventListeners() {
    // Filtres
    const statusFilter = document.getElementById('statusFilter');
    const sectorFilter = document.getElementById('sectorFilter');
    const sortFilter = document.getElementById('sortFilter');
    const searchInput = document.getElementById('searchInput');

    if (statusFilter) statusFilter.addEventListener('change', filterInvestments);
    if (sectorFilter) sectorFilter.addEventListener('change', filterInvestments);
    if (sortFilter) sortFilter.addEventListener('change', sortInvestments);
    if (searchInput) searchInput.addEventListener('input', searchInvestments);

    // Modal de détails projet
    const projectModal = document.getElementById('projectModal');
    if (projectModal) {
        projectModal.addEventListener('show.bs.modal', function(event) {
            const button = event.relatedTarget;
            const projectId = button.getAttribute('data-project');
            loadProjectDetails(projectId);
        });
    }
}

function loadInvestments() {
    // Données d'investissements simulées (en production, ces données viendraient d'une API)
    const investments = [
        {
            id: 'quantumleap',
            name: 'QuantumLeap Computing',
            sector: 'IA & Deep-Tech',
            description: 'Ordinateurs quantiques commerciaux pour résoudre des problèmes complexes d\'optimisation et de simulation',
            amount: 15000,
            performance: 18.5,
            progress: 72,
            status: 'active',
            date: '2024-01-12',
            icon: 'fas fa-robot',
            color: 'primary',
            rating: 'A+',
            totalFunding: '25M€',
            investors: 1250
        },
        {
            id: 'windtech',
            name: 'WindTech Solutions',
            sector: 'Énergies Renouvelables',
            description: 'Éoliennes offshore nouvelle génération avec rendement amélioré de 35% par rapport aux modèles classiques',
            amount: 12500,
            performance: 24.2,
            progress: 85,
            status: 'active',
            date: '2023-12-28',
            icon: 'fas fa-wind',
            color: 'success',
            rating: 'A',
            totalFunding: '18M€',
            investors: 890
        },
        {
            id: 'mrna',
            name: 'mRNA Therapeutics',
            sector: 'Biotechnologies',
            description: 'Vaccins ARNm personnalisés contre différents types de cancer avec taux de réussite de 89% en Phase II',
            amount: 18250,
            performance: 31.7,
            progress: 91,
            status: 'active',
            date: '2023-11-15',
            icon: 'fas fa-dna',
            color: 'warning',
            rating: 'A+',
            totalFunding: '32M€',
            investors: 1560
        },
        {
            id: 'carbon',
            name: 'CarbonCapture Pro',
            sector: 'Climat-Tech',
            description: 'Technologies de captage et stockage du CO2 atmosphérique avec capacité de traitement de 1000 tonnes/jour',
            amount: 10000,
            performance: 12.3,
            progress: 45,
            status: 'pending',
            date: '2024-02-05',
            icon: 'fas fa-leaf',
            color: 'info',
            rating: 'B+',
            totalFunding: '15M€',
            investors: 640
        }
    ];

    // Sauvegarder les investissements pour les autres fonctions
    window.allInvestments = investments;

    // Si la page est chargée dynamiquement, on peut utiliser renderInvestments
    // renderInvestments(investments);
}

function renderInvestments(investments) {
    const container = document.getElementById('investmentsList');
    if (!container) return;

    container.innerHTML = investments.map(investment => `
        <div class="col-lg-6 mb-4 investment-item" 
             data-status="${investment.status}" 
             data-sector="${investment.sector.toLowerCase().replace(/\s+/g, '-').replace(/&/g, '')}"
             data-name="${investment.name.toLowerCase()}">
            <div class="card shadow-sm investment-card">
                <div class="card-body">
                    <div class="d-flex justify-content-between align-items-start mb-3">
                        <div class="d-flex align-items-center">
                            <div class="project-avatar bg-${investment.color} bg-opacity-10 rounded me-3">
                                <i class="${investment.icon} text-${investment.color}"></i>
                            </div>
                            <div>
                                <h5 class="mb-1">${investment.name}</h5>
                                <span class="badge bg-${investment.color} bg-opacity-10 text-${investment.color}">${investment.sector}</span>
                            </div>
                        </div>
                        <div class="text-end">
                            <span class="badge bg-${getStatusBadgeClass(investment.status)}">${getStatusLabel(investment.status)}</span>
                        </div>
                    </div>

                    <p class="text-muted small mb-3">${investment.description}</p>

                    <div class="row g-3 mb-3">
                        <div class="col-6">
                            <div class="text-center">
                                <h6 class="text-primary mb-1">${formatNumber(investment.amount)}€</h6>
                                <small class="text-muted">Mon investissement</small>
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="text-center">
                                <h6 class="text-success mb-1">+${investment.performance}%</h6>
                                <small class="text-muted">Performance</small>
                            </div>
                        </div>
                    </div>

                    <div class="mb-3">
                        <div class="d-flex justify-content-between align-items-center mb-2">
                            <small class="text-muted">Progression du projet</small>
                            <small class="fw-semibold">${investment.progress}%</small>
                        </div>
                        <div class="progress" style="height: 8px;">
                            <div class="progress-bar bg-${investment.color}" style="width: ${investment.progress}%"></div>
                        </div>
                    </div>

                    <div class="d-flex justify-content-between align-items-center">
                        <small class="text-muted">Investi le ${formatDate(investment.date)}</small>
                        <div>
                            <button class="btn btn-outline-primary btn-sm me-2" 
                                    data-bs-toggle="modal" 
                                    data-bs-target="#projectModal" 
                                    data-project="${investment.id}">
                                <i class="fas fa-eye me-1"></i>Détails
                            </button>
                            <button class="btn btn-primary btn-sm" 
                                    onclick="openCryptoPayment('${investment.id}', 5000, 'additional')">
                                <i class="fas fa-plus me-1"></i>Réinvestir
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

function filterInvestments() {
    const statusFilter = document.getElementById('statusFilter');
    const sectorFilter = document.getElementById('sectorFilter');

    if (!statusFilter || !sectorFilter) return;

    const statusValue = statusFilter.value;
    const sectorValue = sectorFilter.value;

    const items = document.querySelectorAll('.investment-item');

    items.forEach(item => {
        const itemStatus = item.getAttribute('data-status');
        const itemSector = item.getAttribute('data-sector');

        let showItem = true;

        if (statusValue && itemStatus !== statusValue) {
            showItem = false;
        }

        if (sectorValue && !itemSector.includes(sectorValue)) {
            showItem = false;
        }

        item.style.display = showItem ? 'block' : 'none';
    });
}

function sortInvestments() {
    const sortValue = document.getElementById('sortFilter').value;
    const container = document.getElementById('investmentsList');
    const items = Array.from(container.children);

    if (!window.allInvestments) return;

    items.sort((a, b) => {
        const investmentA = window.allInvestments.find(inv =>
            a.querySelector('h5').textContent === inv.name
        );
        const investmentB = window.allInvestments.find(inv =>
            b.querySelector('h5').textContent === inv.name
        );

        if (!investmentA || !investmentB) return 0;

        switch (sortValue) {
            case 'date-desc':
                return new Date(investmentB.date) - new Date(investmentA.date);
            case 'date-asc':
                return new Date(investmentA.date) - new Date(investmentB.date);
            case 'amount-desc':
                return investmentB.amount - investmentA.amount;
            case 'amount-asc':
                return investmentA.amount - investmentB.amount;
            case 'performance-desc':
                return investmentB.performance - investmentA.performance;
            default:
                return 0;
        }
    });

    items.forEach(item => container.appendChild(item));
}

function searchInvestments() {
    const searchInput = document.getElementById('searchInput');
    if (!searchInput) return;

    const searchTerm = searchInput.value.toLowerCase();
    const items = document.querySelectorAll('.investment-item');

    items.forEach(item => {
        const itemName = item.getAttribute('data-name');
        const showItem = itemName.includes(searchTerm);
        item.style.display = showItem ? 'block' : 'none';
    });
}

function loadProjectDetails(projectId) {
    if (!window.allInvestments) return;

    const project = window.allInvestments.find(inv => inv.id === projectId);
    if (!project) return;

    document.getElementById('projectName').textContent = project.name;

    const detailsContent = `
        <div class="project-details">
            <div class="row mb-4">
                <div class="col-md-6">
                    <div class="project-header d-flex align-items-center mb-3">
                        <div class="project-avatar bg-${project.color} bg-opacity-10 rounded me-3" style="width: 60px; height: 60px; display: flex; align-items: center; justify-content: center;">
                            <i class="${project.icon} text-${project.color}" style="font-size: 1.5rem;"></i>
                        </div>
                        <div>
                            <h4 class="mb-1">${project.name}</h4>
                            <span class="badge bg-${project.color} bg-opacity-10 text-${project.color}">${project.sector}</span>
                        </div>
                    </div>
                    <p class="text-muted">${project.description}</p>
                </div>
                <div class="col-md-6">
                    <div class="stats-grid">
                        <div class="row g-3">
                            <div class="col-6">
                                <div class="stat-item text-center p-3 bg-light rounded">
                                    <h5 class="text-primary mb-1">${formatNumber(project.amount)}€</h5>
                                    <small class="text-muted">Mon investissement</small>
                                </div>
                            </div>
                            <div class="col-6">
                                <div class="stat-item text-center p-3 bg-light rounded">
                                    <h5 class="text-success mb-1">+${project.performance}%</h5>
                                    <small class="text-muted">Performance</small>
                                </div>
                            </div>
                            <div class="col-6">
                                <div class="stat-item text-center p-3 bg-light rounded">
                                    <h5 class="text-info mb-1">${project.progress}%</h5>
                                    <small class="text-muted">Progression</small>
                                </div>
                            </div>
                            <div class="col-6">
                                <div class="stat-item text-center p-3 bg-light rounded">
                                    <h5 class="text-warning mb-1">${project.rating}</h5>
                                    <small class="text-muted">Rating</small>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-12">
                    <div class="card bg-light">
                        <div class="card-body">
                            <h6 class="card-title">Informations détaillées</h6>
                            <div class="row">
                                <div class="col-md-4">
                                    <strong>Financement total:</strong><br>
                                    <span class="text-primary">${project.totalFunding}</span>
                                </div>
                                <div class="col-md-4">
                                    <strong>Nombre d'investisseurs:</strong><br>
                                    <span class="text-success">${formatNumber(project.investors)}</span>
                                </div>
                                <div class="col-md-4">
                                    <strong>Date d'investissement:</strong><br>
                                    <span class="text-muted">${formatDate(project.date)}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    document.getElementById('projectDetails').innerHTML = detailsContent;
}

function getStatusBadgeClass(status) {
    switch (status) {
        case 'active':
            return 'success';
        case 'completed':
            return 'primary';
        case 'pending':
            return 'warning';
        default:
            return 'secondary';
    }
}

function getStatusLabel(status) {
    switch (status) {
        case 'active':
            return 'Actif';
        case 'completed':
            return 'Terminé';
        case 'pending':
            return 'En attente';
        default:
            return 'Inconnu';
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

function logout() {// =================================================================
// INVESTFUTURE - DASHBOARD JAVASCRIPT
// =================================================================

    document.addEventListener('DOMContentLoaded', function() {
        console.log('Dashboard chargé');
        initializeDashboard();
        setupCharts();
        loadUserData();
        setupEventListeners();
    });

// =================================================================
// INITIALISATION DU DASHBOARD
// =================================================================

    function initializeDashboard() {
        console.log('Initialisation du dashboard...');

        // Vérifier si l'utilisateur est connecté
        checkUserAuthentication();

        // Charger les données utilisateur
        loadUserProfile();

        // Simuler le chargement des données d'investissement
        loadPortfolioData();

        // Animer l'affichage
        setTimeout(() => {
            animateStats();
        }, 500);
    }

    function checkUserAuthentication() {
        const userData = JSON.parse(localStorage.getItem('investFutureUser'));
        if (!userData) {
            console.warn('Utilisateur non connecté, redirection vers index.html');
            window.location.href = 'index.html';
            return false;
        }
        return true;
    }

    function loadUserProfile() {
        const userData = JSON.parse(localStorage.getItem('investFutureUser'));
        if (userData) {
            // Mise à jour des éléments de profil
            const userNameElement = document.getElementById('userName');
            const userFirstNameElements = document.querySelectorAll('[data-user="firstName"]');
            const userEmailElements = document.querySelectorAll('[data-user="email"]');

            if (userNameElement) {
                userNameElement.textContent = userData.name || 'Utilisateur';
            }

            userFirstNameElements.forEach(element => {
                element.textContent = userData.firstName || userData.name?.split(' ')[0] || 'Utilisateur';
            });

            userEmailElements.forEach(element => {
                element.textContent = userData.email || '';
            });

            console.log('Profil utilisateur chargé:', userData.name);
        }
    }

// =================================================================
// DONNÉES DU PORTEFEUILLE
// =================================================================

    function loadPortfolioData() {
        console.log('Chargement des données du portefeuille...');

        // Simulation des données du portefeuille (normalement depuis une API)
        const portfolioData = {
            totalInvested: 45750,
            currentValue: 52340,
            totalGain: 6590,
            gainPercentage: 14.4,
            activeProjects: 7,
            monthlyReturn: 847,
            totalDividends: 2150
        };

        // Mettre à jour l'affichage avec gestion d'erreur
        try {
            updateElement('totalInvested', formatCurrency(portfolioData.totalInvested));
            updateElement('currentValue', formatCurrency(portfolioData.currentValue));
            updateElement('totalGain', '+' + formatCurrency(portfolioData.totalGain));
            updateElement('gainPercentage', '+' + portfolioData.gainPercentage + '%');
            updateElement('activeProjects', portfolioData.activeProjects.toString());
            updateElement('monthlyReturn', '+' + formatCurrency(portfolioData.monthlyReturn));
            updateElement('totalDividends', formatCurrency(portfolioData.totalDividends));

            console.log('Données du portefeuille mises à jour');
        } catch (error) {
            console.error('Erreur lors de la mise à jour des données:', error);
        }
    }

    function updateElement(id, value) {
        const element = document.getElementById(id);
        if (element) {
            element.textContent = value;
        } else {
            console.warn(`Élément avec ID '${id}' non trouvé`);
        }
    }

// =================================================================
// CONFIGURATION DES GRAPHIQUES
// =================================================================

    function setupCharts() {
        console.log('Configuration des graphiques...');

        // Vérifier si Chart.js est disponible
        if (typeof Chart === 'undefined') {
            console.error('Chart.js n\'est pas chargé');
            return;
        }

        setupPerformanceChart();
        setupPortfolioChart();
    }

    function setupPerformanceChart() {
        const ctx = document.getElementById('performanceChart');
        if (!ctx) {
            console.warn('Canvas performanceChart non trouvé');
            return;
        }

        // Données de performance simulées sur 12 mois
        const performanceData = {
            labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun', 'Jul', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc'],
            datasets: [{
                label: 'Valeur du portefeuille',
                data: [40000, 41200, 42800, 44100, 43900, 45200, 46800, 48200, 49500, 51200, 52100, 52340],
                borderColor: '#1a237e',
                backgroundColor: 'rgba(26, 35, 126, 0.1)',
                tension: 0.4,
                fill: true,
                pointBackgroundColor: '#1a237e',
                pointBorderColor: '#ffffff',
                pointBorderWidth: 2,
                pointRadius: 4
            }, {
                label: 'Montant investi',
                data: [40000, 40000, 42500, 42500, 42500, 45000, 45000, 45750, 45750, 45750, 45750, 45750],
                borderColor: '#6c757d',
                backgroundColor: 'transparent',
                borderDash: [5, 5],
                tension: 0.4,
                pointRadius: 0
            }]
        };

        try {
            new Chart(ctx, {
                type: 'line',
                data: performanceData,
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: true,
                            position: 'bottom',
                            labels: {
                                usePointStyle: true,
                                padding: 20
                            }
                        },
                        tooltip: {
                            mode: 'index',
                            intersect: false,
                            callbacks: {
                                label: function(context) {
                                    return context.dataset.label + ': ' + formatCurrency(context.parsed.y);
                                }
                            }
                        }
                    },
                    scales: {
                        x: {
                            grid: {
                                display: false
                            }
                        },
                        y: {
                            beginAtZero: false,
                            grid: {
                                color: 'rgba(0,0,0,0.1)'
                            },
                            ticks: {
                                callback: function(value) {
                                    return formatCurrency(value, false);
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

            console.log('Graphique de performance créé');
        } catch (error) {
            console.error('Erreur lors de la création du graphique de performance:', error);
        }
    }

    function setupPortfolioChart() {
        const ctx = document.getElementById('portfolioChart');
        if (!ctx) {
            console.warn('Canvas portfolioChart non trouvé');
            return;
        }

        const portfolioData = {
            labels: ['IA & Deep-Tech', 'Énergies Renouvelables', 'Biotechnologies', 'Fintech', 'Autres'],
            datasets: [{
                data: [32, 28, 22, 12, 6],
                backgroundColor: [
                    '#1a237e',
                    '#00c853',
                    '#ff6f00',
                    '#3949ab',
                    '#6c757d'
                ],
                borderWidth: 0,
                hoverOffset: 4
            }]
        };

        try {
            new Chart(ctx, {
                type: 'doughnut',
                data: portfolioData,
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false
                        },
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    return context.label + ': ' + context.parsed + '%';
                                }
                            }
                        }
                    },
                    cutout: '60%'
                }
            });

            console.log('Graphique de répartition créé');
        } catch (error) {
            console.error('Erreur lors de la création du graphique de répartition:', error);
        }
    }

// =================================================================
// CHARGEMENT DES DONNÉES UTILISATEUR
// =================================================================

    function loadUserData() {
        console.log('Chargement des données utilisateur...');
        loadRecentInvestments();
        loadRecentNews();
    }

    function loadRecentInvestments() {
        // Simulation des investissements récents
        const recentInvestments = [
            {
                id: 1,
                project: 'QuantumLeap Computing',
                description: 'Ordinateurs quantiques nouvelle génération',
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
                description: 'Éoliennes offshore intelligentes',
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
                description: 'Vaccins ARNm contre le cancer',
                sector: 'Biotechnologies',
                amount: 18250,
                date: '2023-11-15',
                performance: 31.7,
                status: 'active',
                icon: 'fas fa-dna',
                color: 'warning'
            },
            {
                id: 4,
                project: 'GreenFin Blockchain',
                description: 'Finance décentralisée écologique',
                sector: 'Fintech',
                amount: 8000,
                date: '2023-10-03',
                performance: 12.3,
                status: 'active',
                icon: 'fas fa-coins',
                color: 'info'
            }
        ];

        const tbody = document.getElementById('recentInvestments');
        if (tbody) {
            tbody.innerHTML = recentInvestments.map(investment => `
            <tr class="investment-row" data-investment-id="${investment.id}">
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
                <td class="fw-semibold">${formatCurrency(investment.amount)}</td>
                <td class="text-muted">${formatDate(investment.date)}</td>
                <td class="text-success fw-semibold">+${investment.performance}%</td>
                <td><span class="badge bg-success">Actif</span></td>
            </tr>
        `).join('');

            console.log('Investissements récents chargés');
        }
    }

    function loadRecentNews() {
        // Simulation des actualités récentes
        const recentNews = [
            {
                title: 'QuantumLeap lève 50M€ en Series B',
                category: 'Financement',
                date: '2024-01-15',
                impact: 'positive',
                description: 'Nouvelle levée pour accélérer le développement'
            },
            {
                title: 'Nouveau partenariat WindTech-EDF',
                category: 'Partenariat',
                date: '2024-01-10',
                impact: 'positive',
                description: 'Accord stratégique pour 200 éoliennes'
            },
            {
                title: 'Résultats trimestriels mRNA Therapeutics',
                category: 'Résultats',
                date: '2024-01-08',
                impact: 'neutral',
                description: 'Chiffre d\'affaires en ligne avec les prévisions'
            }
        ];

        const newsContainer = document.getElementById('recentNews');
        if (newsContainer) {
            newsContainer.innerHTML = recentNews.map(news => `
            <div class="news-item p-3 border-bottom">
                <div class="d-flex align-items-start">
                    <div class="news-icon bg-${news.impact === 'positive' ? 'success' : news.impact === 'negative' ? 'danger' : 'info'} bg-opacity-10 rounded me-3">
                        <i class="fas fa-${news.impact === 'positive' ? 'arrow-up' : news.impact === 'negative' ? 'arrow-down' : 'minus'} text-${news.impact === 'positive' ? 'success' : news.impact === 'negative' ? 'danger' : 'info'}"></i>
                    </div>
                    <div class="flex-grow-1">
                        <div class="d-flex justify-content-between align-items-start mb-1">
                            <h6 class="mb-0">${news.title}</h6>
                            <small class="text-muted">${formatDate(news.date)}</small>
                        </div>
                        <div class="d-flex align-items-center mb-2">
                            <span class="badge bg-secondary bg-opacity-10 text-secondary me-2">${news.category}</span>
                        </div>
                        <p class="text-muted mb-0 small">${news.description}</p>
                    </div>
                </div>
            </div>
        `).join('');

            console.log('Actualités récentes chargées');
        }
    }

// =================================================================
// FONCTIONS UTILITAIRES
// =================================================================

    function formatCurrency(amount, showSymbol = true) {
        const formatted = new Intl.NumberFormat('fr-FR').format(amount);
        return showSymbol ? formatted + '€' : formatted;
    }

    function formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('fr-FR', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });
    }

    function formatPercentage(value) {
        return (value > 0 ? '+' : '') + value.toFixed(1) + '%';
    }

// =================================================================
// GESTION DES ÉVÉNEMENTS
// =================================================================

    function setupEventListeners() {
        console.log('Configuration des événements...');

        // Bouton de déconnexion
        const logoutBtn = document.getElementById('logoutBtn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', handleLogout);
        }

        // Filtres de période pour le graphique
        const periodFilters = document.querySelectorAll('input[name="period"]');
        periodFilters.forEach(filter => {
            filter.addEventListener('change', handlePeriodChange);
        });

        // Actualisation des données
        const refreshBtn = document.getElementById('refreshBtn');
        if (refreshBtn) {
            refreshBtn.addEventListener('click', handleRefresh);
        }

        // Navigation vers les investissements
        const investBtn = document.getElementById('investBtn');
        if (investBtn) {
            investBtn.addEventListener('click', () => {
                window.location.href = 'investissements.html';
            });
        }
    }

    function handleLogout(e) {
        e.preventDefault();
        console.log('Déconnexion utilisateur');

        if (confirm('Êtes-vous sûr de vouloir vous déconnecter ?')) {
            localStorage.removeItem('investFutureUser');
            window.location.href = 'index.html';
        }
    }

    function handlePeriodChange(e) {
        const period = e.target.value;
        console.log('Changement de période:', period);
        updatePerformanceChart(period);
    }

    function handleRefresh() {
        console.log('Actualisation des données...');

        // Afficher un indicateur de chargement
        showLoadingState();

        // Recharger les données
        setTimeout(() => {
            loadPortfolioData();
            loadRecentInvestments();
            loadRecentNews();
            hideLoadingState();
        }, 1000);
    }

    function showLoadingState() {
        const refreshBtn = document.getElementById('refreshBtn');
        if (refreshBtn) {
            refreshBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
            refreshBtn.disabled = true;
        }
    }

    function hideLoadingState() {
        const refreshBtn = document.getElementById('refreshBtn');
        if (refreshBtn) {
            refreshBtn.innerHTML = '<i class="fas fa-sync-alt"></i>';
            refreshBtn.disabled = false;
        }
    }

// =================================================================
// MISE À JOUR DU GRAPHIQUE DE PERFORMANCE
// =================================================================

    function updatePerformanceChart(period) {
        console.log('Mise à jour du graphique pour:', period);

        // Simulation des données selon la période
        let data, labels;

        switch(period) {
            case '1month':
                labels = ['Sem 1', 'Sem 2', 'Sem 3', 'Sem 4'];
                data = [51800, 52100, 51900, 52340];
                break;
            case '3months':
                labels = ['Oct', 'Nov', 'Déc'];
                data = [51200, 52100, 52340];
                break;
            case '6months':
                labels = ['Jul', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc'];
                data = [46800, 48200, 49500, 51200, 52100, 52340];
                break;
            case '1year':
            default:
                labels = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun', 'Jul', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc'];
                data = [40000, 41200, 42800, 44100, 43900, 45200, 46800, 48200, 49500, 51200, 52100, 52340];
                break;
        }

        // Ici on mettrait à jour le graphique existant
        // Pour l'instant, on se contente de log
        console.log('Nouvelles données:', { labels, data });
    }

// =================================================================
// ANIMATIONS
// =================================================================

    function animateStats() {
        const stats = document.querySelectorAll('.stats-card .display-6, .stats-card h4');

        stats.forEach((stat, index) => {
            if (stat) {
                // Animation d'apparition
                stat.style.opacity = '0';
                stat.style.transform = 'translateY(20px)';

                setTimeout(() => {
                    stat.style.transition = 'all 0.6s ease';
                    stat.style.opacity = '1';
                    stat.style.transform = 'translateY(0)';

                    // Animation de comptage pour les chiffres
                    if (stat.textContent.match(/[\d,]+/)) {
                        animateCounter(stat);
                    }
                }, index * 150);
            }
        });
    }

    function animateCounter(element) {
        const text = element.textContent;
        const number = parseFloat(text.replace(/[^\d,.-]/g, '').replace(',', '.'));

        if (!isNaN(number)) {
            let current = 0;
            const increment = number / 50;
            const timer = setInterval(() => {
                current += increment;
                if (current >= number) {
                    current = number;
                    clearInterval(timer);
                }
                element.textContent = text.replace(/[\d,]+/, Math.floor(current).toLocaleString('fr-FR'));
            }, 30);
        }
    }

// =================================================================
// GESTION DES ERREURS
// =================================================================

    window.addEventListener('error', function(e) {
        console.error('Erreur JavaScript:', e.error);
    });

// =================================================================
// EXPORT DES FONCTIONS (si nécessaire)
// =================================================================

// Export pour utilisation dans d'autres scripts
    window.DashboardApp = {
        loadPortfolioData,
        updatePerformanceChart,
        formatCurrency,
        formatDate
    };

    console.log('Dashboard JavaScript chargé et prêt');
    localStorage.removeItem('investFutureUser');
    sessionStorage.clear();
    window.location.href = 'index.html';
}

// Fonction pour ouvrir le modal de paiement crypto
function openCryptoPayment(projectId, amount, type) {
    // Cette fonction sera définie dans crypto-payment.js
    if (typeof window.openCryptoPaymentModal === 'function') {
        window.openCryptoPaymentModal(projectId, amount, type);
    } else {
        console.log('Ouverture du paiement crypto pour:', projectId, amount, type);
        // Fallback temporaire
        alert(`Paiement crypto de ${amount}€ pour le projet ${projectId}`);
    }
}

// Animation des cartes au chargement
function animateInvestmentCards() {
    const cards = document.querySelectorAll('.investment-card');
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.classList.add('fade-in');
        }, index * 100);
    });
}

// Lancer l'animation après le chargement
setTimeout(animateInvestmentCards, 300);