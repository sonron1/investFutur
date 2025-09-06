// Données des secteurs d'investissement
export const investmentData = {
    "technologie-verte": {
        id: 1,
        name: "Technologies Vertes",
        description: "Investissez dans les énergies renouvelables et les technologies propres pour un avenir durable",
        image: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        roi: "22%",
        projetsCount: 45,
        minInvestment: 5000,
        paymentMethods: ["bitcoin", "ethereum", "usdt"],
        highlights: [
            "Croissance du marché de 15% par an",
            "Soutien gouvernemental aux énergies vertes",
            "Technologie de pointe certifiée",
            "Impact environnemental positif"
        ],
        projects: [
            {
                name: "SolarTech Innovation",
                description: "Panneaux solaires nouvelle génération avec 40% d'efficacité en plus",
                raised: "2.1M€",
                target: "3.5M€",
                investors: 156,
                minInvest: 5000
            },
            {
                name: "WindPower Solutions",
                description: "Éoliennes offshore pour zones côtières",
                raised: "4.8M€",
                target: "7.2M€",
                investors: 289,
                minInvest: 10000
            }
        ]
    },

    "biotechnologies": {
        id: 2,
        name: "Biotechnologies",
        description: "Soutenez l'innovation médicale et pharmaceutique de demain",
        image: "https://images.unsplash.com/photo-1582719471384-894fbb16e074?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        roi: "18%",
        projetsCount: 32,
        minInvestment: 7500,
        paymentMethods: ["bitcoin", "ethereum", "usdt", "bnb"],
        highlights: [
            "Secteur en croissance de 12% annuel",
            "Innovations révolutionnaires en cours",
            "Partenariats avec laboratoires renommés",
            "Potentiel de retour sur investissement élevé"
        ],
        projects: [
            {
                name: "GeneTherapy Plus",
                description: "Thérapie génique pour maladies rares",
                raised: "1.8M€",
                target: "4.0M€",
                investors: 98,
                minInvest: 7500
            },
            {
                name: "BioMed Diagnostics",
                description: "Tests diagnostiques rapides et précis",
                raised: "3.2M€",
                target: "5.5M€",
                investors: 187,
                minInvest: 5000
            }
        ]
    },

    "fintech": {
        id: 3,
        name: "Fintech",
        description: "Participez à la révolution des services financiers digitaux",
        image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        roi: "25%",
        projetsCount: 28,
        minInvestment: 5000,
        paymentMethods: ["bitcoin", "ethereum", "usdt", "bnb"],
        highlights: [
            "Digitalisation croissante des services bancaires",
            "Technologies blockchain avancées",
            "Partenariats avec institutions financières",
            "Marché en expansion rapide"
        ],
        projects: [
            {
                name: "CryptoPay Solutions",
                description: "Plateforme de paiement crypto pour e-commerce",
                raised: "5.1M€",
                target: "8.0M€",
                investors: 345,
                minInvest: 5000
            },
            {
                name: "SmartInvest AI",
                description: "Robo-advisor basé sur l'intelligence artificielle",
                raised: "2.7M€",
                target: "4.5M€",
                investors: 156,
                minInvest: 7500
            }
        ]
    },

    "intelligence-artificielle": {
        id: 4,
        name: "Intelligence Artificielle",
        description: "Investissez dans l'IA et l'automatisation intelligente",
        image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        roi: "30%",
        projetsCount: 21,
        minInvestment: 10000,
        paymentMethods: ["bitcoin", "ethereum", "usdt"],
        highlights: [
            "Marché de l'IA en croissance explosive",
            "Applications dans tous les secteurs",
            "Équipe de recherche de classe mondiale",
            "Brevets technologiques déjà déposés"
        ],
        projects: [
            {
                name: "AI Vision Pro",
                description: "Intelligence artificielle pour reconnaissance d'images médicales",
                raised: "3.8M€",
                target: "6.2M€",
                investors: 127,
                minInvest: 10000
            },
            {
                name: "AutoML Platform",
                description: "Plateforme d'apprentissage automatique sans code",
                raised: "4.5M€",
                target: "7.8M€",
                investors: 198,
                minInvest: 10000
            }
        ]
    },

    "e-commerce": {
        id: 5,
        name: "E-commerce",
        description: "Soutenez les plateformes de commerce en ligne innovantes",
        image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        roi: "16%",
        projetsCount: 38,
        minInvestment: 5000,
        paymentMethods: ["bitcoin", "ethereum", "usdt", "bnb"],
        highlights: [
            "Croissance continue du commerce en ligne",
            "Technologies de personnalisation avancées",
            "Expansion internationale prévue",
            "Modèle économique éprouvé"
        ],
        projects: [
            {
                name: "EcoMarket Pro",
                description: "Marketplace pour produits écologiques et durables",
                raised: "6.2M€",
                target: "9.5M€",
                investors: 445,
                minInvest: 5000
            },
            {
                name: "LocalBuy Network",
                description: "Plateforme de commerce local et circuits courts",
                raised: "2.9M€",
                target: "5.2M€",
                investors: 234,
                minInvest: 5000
            }
        ]
    },

    "blockchain": {
        id: 6,
        name: "Blockchain",
        description: "Participez à l'économie décentralisée et aux cryptomonnaies",
        image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        roi: "28%",
        projetsCount: 15,
        minInvestment: 10000,
        paymentMethods: ["bitcoin", "ethereum", "usdt", "bnb"],
        highlights: [
            "Adoption croissante de la blockchain",
            "Applications DeFi révolutionnaires",
            "Équipe technique expérimentée",
            "Partenariats stratégiques établis"
        ],
        projects: [
            {
                name: "DeFi Protocol",
                description: "Protocole de finance décentralisée nouvelle génération",
                raised: "8.7M€",
                target: "12.0M€",
                investors: 523,
                minInvest: 10000
            },
            {
                name: "NFT Marketplace",
                description: "Plateforme de trading NFT avec fonctionnalités avancées",
                raised: "4.1M€",
                target: "7.5M€",
                investors: 298,
                minInvest: 10000
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

// Export par défaut + export nommé explicite (fiabilise la résolution TS)
const defaultExport = investmentData;
export default defaultExport;
