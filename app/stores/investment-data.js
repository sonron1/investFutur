// Données complètes des secteurs et projets d'investissement avec prix accessibles
export const investmentData = {
    "ia-deeptech": {
        id: 1,
        name: "IA & Deep-Tech",
        description: "Investissez dans l'intelligence artificielle et les technologies de rupture",
        image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1000&h=500&fit=crop&crop=center",
        roi: "28.5%",
        projetsCount: 15,
        minInvestment: 50,
        paymentMethods: ["bitcoin", "ethereum", "usdt"],
        highlights: [
            "Ordinateurs quantiques commerciaux",
            "Interface cerveau-machine approuvée FDA",
            "Robots autonomes pour la logistique",
            "Leader sur le marché européen"
        ],
        projects: [
            {
                id: "quantum-leap-1",
                name: "QuantumLeap Computing",
                description: "Ordinateurs quantiques commerciaux pour résoudre des problèmes complexes d'optimisation",
                raised: "750",
                target: "1200",
                investors: 156,
                minInvest: 50,
                roi: 28.5,
                status: "actif",
                progress: 85,
                dateInvestment: "2024-01-15",
                image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=150&fit=crop&crop=center",
                badge: "Leader",
                badgeColor: "success"
            },
            {
                id: "neurotech-2",
                name: "NeuroTech Analytics",
                description: "Interface cerveau-machine pour personnes handicapées, approuvé FDA",
                raised: "425",
                target: "600",
                investors: 98,
                minInvest: 25,
                roi: 15.2,
                status: "actif",
                progress: 72,
                dateInvestment: "2024-02-20",
                image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=150&fit=crop&crop=center",
                badge: "Innovation",
                badgeColor: "warning"
            },
            {
                id: "ai-robotics-3",
                name: "AI Robotics Lab",
                description: "Robots autonomes pour la logistique industrielle avec IA avancée",
                raised: "600",
                target: "900",
                investors: 127,
                minInvest: 100,
                roi: 19.7,
                status: "actif",
                progress: 65,
                dateInvestment: "2023-12-10",
                image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=150&fit=crop&crop=center",
                badge: "Robotique",
                badgeColor: "info"
            }
        ]
    },

    "energies-renouvelables": {
        id: 2,
        name: "Énergies Renouvelables",
        description: "Soutenez la transition énergétique avec des technologies durables",
        image: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=1000&h=500&fit=crop&crop=center",
        roi: "24.2%",
        projetsCount: 18,
        minInvestment: 10,
        paymentMethods: ["bitcoin", "ethereum", "usdt", "bnb"],
        highlights: [
            "Éoliennes offshore nouvelle génération",
            "Stockage d'énergie révolutionnaire",
            "Micro-turbines hydroélectriques",
            "Rendement amélioré de 35%"
        ],
        projects: [
            {
                id: "windtech-1",
                name: "WindTech Solutions",
                description: "Éoliennes offshore nouvelle génération avec rendement amélioré de 35%",
                raised: "625",
                target: "900",
                investors: 289,
                minInvest: 20,
                roi: 24.2,
                status: "actif",
                progress: 85,
                dateInvestment: "2023-12-15",
                image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=400&h=150&fit=crop&crop=center",
                badge: "Écologique",
                badgeColor: "success"
            },
            {
                id: "solargrid-2",
                name: "SolarGrid Innovation",
                description: "Stockage d'énergie solaire avec batteries sodium-ion révolutionnaires",
                raised: "487",
                target: "750",
                investors: 187,
                minInvest: 15,
                roi: 22.8,
                status: "actif",
                progress: 45,
                dateInvestment: "2024-01-20",
                image: "https://images.unsplash.com/photo-1615390547971-4b57b9c21b96?w=400&h=150&fit=crop&crop=center",
                badge: "Solaire",
                badgeColor: "warning"
            },
            {
                id: "hydro-power-3",
                name: "Hydro Power Tech",
                description: "Micro-turbines hydroélectriques pour cours d'eau urbains",
                raised: "360",
                target: "600",
                investors: 143,
                minInvest: 10,
                roi: 18.9,
                status: "actif",
                progress: 62,
                dateInvestment: "2023-11-25",
                image: "https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?w=400&h=150&fit=crop&crop=center",
                badge: "Hydraulique",
                badgeColor: "info"
            }
        ]
    },

    "biotechnologies": {
        id: 3,
        name: "Biotechnologies",
        description: "Soutenez l'innovation médicale et pharmaceutique de demain",
        image: "https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=1000&h=500&fit=crop&crop=center",
        roi: "35.2%",
        projetsCount: 12,
        minInvestment: 75,
        paymentMethods: ["bitcoin", "ethereum", "usdt", "bnb"],
        highlights: [
            "Vaccins ARNm personnalisés contre le cancer",
            "Thérapie génique phase 3",
            "Partenariats laboratoires renommés",
            "Innovations révolutionnaires"
        ],
        projects: [
            {
                id: "mrna-therapeutics-1",
                name: "mRNA Therapeutics",
                description: "Vaccins ARNm personnalisés contre différents types de cancer",
                raised: "912",
                target: "1250",
                investors: 156,
                minInvest: 100,
                roi: 31.7,
                status: "actif",
                progress: 91,
                dateInvestment: "2023-11-20",
                image: "https://images.unsplash.com/photo-1576086213369-97a306d36557?w=400&h=150&fit=crop&crop=center",
                badge: "Médical",
                badgeColor: "danger"
            },
            {
                id: "gentherapy-2",
                name: "GenTherapy Plus",
                description: "Thérapie génique contre les maladies rares, essais phase 3",
                raised: "725",
                target: "1000",
                investors: 98,
                minInvest: 75,
                roi: 35.2,
                status: "actif",
                progress: 89,
                dateInvestment: "2023-10-15",
                image: "https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=400&h=150&fit=crop&crop=center",
                badge: "Génétique",
                badgeColor: "info"
            }
        ]
    },

    "fintech": {
        id: 4,
        name: "Fintech",
        description: "Participez à la révolution des services financiers digitaux",
        image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1000&h=500&fit=crop&crop=center",
        roi: "19.8%",
        projetsCount: 14,
        minInvestment: 25,
        paymentMethods: ["bitcoin", "ethereum", "usdt", "bnb"],
        highlights: [
            "Plateforme DeFi écologique",
            "Banque numérique spécialisée financement vert",
            "Staking carbon-neutral",
            "Partenariats institutions financières"
        ],
        projects: [
            {
                id: "blockfin-1",
                name: "BlockFin Solutions",
                description: "Plateforme DeFi écologique avec staking carbon-neutral",
                raised: "525",
                target: "800",
                investors: 345,
                minInvest: 50,
                roi: 19.8,
                status: "actif",
                progress: 63,
                dateInvestment: "2024-01-25",
                image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=400&h=150&fit=crop&crop=center",
                badge: "Crypto",
                badgeColor: "primary"
            },
            {
                id: "neobank-2",
                name: "NeoBank Green",
                description: "Banque numérique spécialisée dans le financement vert",
                raised: "340",
                target: "600",
                investors: 234,
                minInvest: 25,
                roi: 16.4,
                status: "actif",
                progress: 78,
                dateInvestment: "2023-12-20",
                image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=150&fit=crop&crop=center",
                badge: "Banque",
                badgeColor: "success"
            }
        ]
    },

    "mobilite-durable": {
        id: 5,
        name: "Mobilité Durable",
        description: "Investissez dans les transports du futur",
        image: "https://images.unsplash.com/photo-1593941707882-a5bac6861d75?w=1000&h=500&fit=crop&crop=center",
        roi: "24.1%",
        projetsCount: 10,
        minInvestment: 30,
        paymentMethods: ["bitcoin", "ethereum", "usdt"],
        highlights: [
            "Réseau bornes recharge 100% renouvelable",
            "Camions hydrogène longue distance",
            "Technologies électriques avancées",
            "Expansion européenne"
        ],
        projects: [
            {
                id: "ecomobility-1",
                name: "EcoMobility Hub",
                description: "Réseau de bornes de recharge ultra-rapide 100% renouvelable",
                raised: "560",
                target: "900",
                investors: 267,
                minInvest: 30,
                roi: 24.1,
                status: "actif",
                progress: 55,
                dateInvestment: "2023-11-30",
                image: "https://images.unsplash.com/photo-1593941707882-a5bac6861d75?w=400&h=150&fit=crop&crop=center",
                badge: "Électrique",
                badgeColor: "success"
            },
            {
                id: "hydrogen-2",
                name: "Hydrogen Transport",
                description: "Camions à hydrogène pour le transport longue distance",
                raised: "475",
                target: "750",
                investors: 189,
                minInvest: 40,
                roi: 17.3,
                status: "actif",
                progress: 42,
                dateInvestment: "2023-09-15",
                image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=400&h=150&fit=crop&crop=center",
                badge: "Hydrogène",
                badgeColor: "info"
            }
        ]
    },

    "agritech": {
        id: 6,
        name: "AgriTech",
        description: "Révolutionnez l'agriculture avec les technologies intelligentes",
        image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1000&h=500&fit=crop&crop=center",
        roi: "26.1%",
        projetsCount: 8,
        minInvestment: 15,
        paymentMethods: ["bitcoin", "ethereum", "usdt"],
        highlights: [
            "Agriculture de précision avec IA",
            "Réduction 40% des pesticides",
            "Fermes verticales urbaines",
            "Éclairage LED optimisé"
        ],
        projects: [
            {
                id: "smartfarm-1",
                name: "SmartFarm AI",
                description: "Agriculture de précision avec IA, réduction 40% des pesticides",
                raised: "437",
                target: "750",
                investors: 198,
                minInvest: 20,
                roi: 26.1,
                status: "actif",
                progress: 38,
                dateInvestment: "2023-10-20",
                image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400&h=150&fit=crop&crop=center",
                badge: "Agriculture",
                badgeColor: "warning"
            },
            {
                id: "vertical-farms-2",
                name: "Vertical Farms Pro",
                description: "Fermes verticales urbaines avec éclairage LED optimisé",
                raised: "315",
                target: "600",
                investors: 145,
                minInvest: 15,
                roi: 21.7,
                status: "actif",
                progress: 68,
                dateInvestment: "2023-08-25",
                image: "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=400&h=150&fit=crop&crop=center",
                badge: "Vertical",
                badgeColor: "info"
            }
        ]
    },

    "economie-circulaire": {
        id: 7,
        name: "Économie Circulaire",
        description: "Investissez dans le recyclage et l'économie durable",
        image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=1000&h=500&fit=crop&crop=center",
        roi: "21.5%",
        projetsCount: 6,
        minInvestment: 20,
        paymentMethods: ["bitcoin", "ethereum", "usdt"],
        highlights: [
            "Transformation déchets plastiques",
            "Matériaux haute performance",
            "Procédés révolutionnaires",
            "Impact environnemental positif"
        ],
        projects: [
            {
                id: "circulartech-1",
                name: "CircularTech Waste",
                description: "Transformation des déchets plastiques en matériaux haute performance",
                raised: "390",
                target: "650",
                investors: 156,
                minInvest: 20,
                roi: 21.5,
                status: "actif",
                progress: 67,
                dateInvestment: "2023-09-10",
                image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=400&h=150&fit=crop&crop=center",
                badge: "Recyclage",
                badgeColor: "success"
            }
        ]
    },

    "sante-digitale": {
        id: 8,
        name: "Santé Digitale",
        description: "Révolutionnez la santé avec le numérique",
        image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=1000&h=500&fit=crop&crop=center",
        roi: "31.2%",
        projetsCount: 5,
        minInvestment: 40,
        paymentMethods: ["bitcoin", "ethereum", "usdt"],
        highlights: [
            "Monitoring cardiaque temps réel",
            "Dispositifs médicaux connectés",
            "Certification médicale européenne",
            "Partenariats hôpitaux"
        ],
        projects: [
            {
                id: "healthmonitor-1",
                name: "HealthMonitor Pro",
                description: "Dispositif médical connecté pour monitoring cardiaque temps réel",
                raised: "680",
                target: "1000",
                investors: 89,
                minInvest: 50,
                roi: 31.2,
                status: "actif",
                progress: 78,
                dateInvestment: "2023-07-15",
                image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=150&fit=crop&crop=center",
                badge: "Médical",
                badgeColor: "danger"
            }
        ]
    },

    "edtech": {
        id: 9,
        name: "EdTech",
        description: "Transformez l'éducation avec les nouvelles technologies",
        image: "https://images.unsplash.com/photo-1588072432836-e10032774350?w=1000&h=500&fit=crop&crop=center",
        roi: "18.4%",
        projetsCount: 4,
        minInvestment: 25,
        paymentMethods: ["bitcoin", "ethereum", "usdt"],
        highlights: [
            "Réalité virtuelle pour écoles",
            "Apprentissage immersif",
            "Partenariats établissements",
            "Innovation pédagogique"
        ],
        projects: [
            {
                id: "eduvr-1",
                name: "EduVR Learning",
                description: "Plateforme d'apprentissage en réalité virtuelle pour écoles",
                raised: "290",
                target: "600",
                investors: 127,
                minInvest: 25,
                roi: 18.4,
                status: "actif",
                progress: 42,
                dateInvestment: "2023-06-20",
                image: "https://images.unsplash.com/photo-1588072432836-e10032774350?w=400&h=150&fit=crop&crop=center",
                badge: "Éducation",
                badgeColor: "warning"
            }
        ]
    },

    "spatial": {
        id: 10,
        name: "Espace & Satellites",
        description: "Participez à la conquête spatiale et aux satellites",
        image: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=1000&h=500&fit=crop&crop=center",
        roi: "12.5%",
        projetsCount: 3,
        minInvestment: 200,
        paymentMethods: ["bitcoin", "ethereum", "usdt"],
        highlights: [
            "Constellation nanosatellites IoT",
            "Couverture mondiale",
            "Technologies spatiales avancées",
            "Partenariats agences spatiales"
        ],
        projects: [
            {
                id: "satellitenet-1",
                name: "SatelliteNet IoT",
                description: "Constellation de nanosatellites pour IoT mondial",
                raised: "825",
                target: "1250",
                investors: 67,
                minInvest: 200,
                roi: 12.5,
                status: "en_cours",
                progress: 23,
                dateInvestment: "2024-03-15",
                image: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=400&h=150&fit=crop&crop=center",
                badge: "Spatial",
                badgeColor: "dark"
            }
        ]
    }
};

// Méthodes de paiement disponibles
export const paymentMethods = {
    bitcoin: {
        name: "Bitcoin",
        icon: "fab fa-bitcoin",
        description: "Paiement sécurisé en Bitcoin",
        fees: "2.5%",
        processing: "10-30 min"
    },
    ethereum: {
        name: "Ethereum",
        icon: "fab fa-ethereum",
        description: "Paiement rapide en Ethereum",
        fees: "2.0%",
        processing: "2-5 min"
    },
    usdt: {
        name: "Tether USDT",
        icon: "fas fa-dollar-sign",
        description: "Stablecoin indexé sur le dollar",
        fees: "1.5%",
        processing: "1-3 min"
    },
    bnb: {
        name: "Binance Coin",
        icon: "fas fa-coins",
        description: "Token de l'écosystème Binance",
        fees: "1.8%",
        processing: "1-2 min"
    }
};

// Export par défaut
const defaultExport = investmentData;
export default defaultExport;