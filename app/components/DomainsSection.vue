
<template>
  <section id="domaines" class="py-24 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- En-tête amélioré -->
      <div class="text-center mb-20" data-aos="fade-up">
        <div class="inline-flex items-center space-x-2 bg-blue-50 rounded-full px-4 py-2 mb-6">
          <div class="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
          <span class="text-sm font-medium text-blue-700">Secteurs d'avenir</span>
        </div>
        <h2 class="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          Investissez dans les
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
            technologies de demain
          </span>
        </h2>
        <p class="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
          Diversifiez votre portefeuille avec nos secteurs d'avenir soigneusement sélectionnés par nos experts.
          <strong class="text-green-600">Performance moyenne de +22.3%</strong> sur les 12 derniers mois.
        </p>
      </div>

      <!-- Filtre par secteur -->
      <div class="flex flex-wrap justify-center gap-3 mb-16" data-aos="fade-up" data-aos-delay="200">
        <button
            v-for="filter in sectorFilters"
            :key="filter.id"
            @click="activeSectorFilter = filter.id"
            :class="activeSectorFilter === filter.id
            ? 'bg-blue-600 text-white shadow-lg'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'"
            class="px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105"
        >
          <i :class="filter.icon" class="mr-2"></i>
          {{ filter.name }}
        </button>
      </div>

      <!-- Grille des secteurs améliorée -->
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        <div
            v-for="(sector, index) in filteredSectors"
            :key="sector.id"
            :data-aos="'fade-up'"
            :data-aos-delay="index * 150"
            class="group relative"
        >
          <div class="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden border border-gray-100">
            <!-- Header avec image -->
            <div class="relative h-56 overflow-hidden">
              <ImageWithFallback
                  :src="sector.image"
                  :alt="sector.name"
                  container-class="h-full group"
                  img-class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />

              <!-- Overlay gradient -->
              <div class="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>

              <!-- Badge ROI -->
              <div class="absolute top-4 right-4">
                <div class="bg-green-500 text-white px-4 py-2 rounded-full font-bold text-sm shadow-lg">
                  <i class="fas fa-chart-line mr-1"></i>
                  ROI {{ sector.roi }}%
                </div>
              </div>

              <!-- Badge trending -->
              <div v-if="sector.trending" class="absolute top-4 left-4">
                <div class="bg-red-500 text-white px-3 py-2 rounded-full font-semibold text-xs animate-pulse">
                  🔥 Trending
                </div>
              </div>

              <!-- Stats overlay -->
              <div class="absolute bottom-4 left-4 right-4">
                <div class="flex justify-between text-white text-sm font-medium">
                  <span><i class="fas fa-project-diagram mr-1"></i>{{ sector.projects }} projets</span>
                  <span><i class="fas fa-users mr-1"></i>{{ sector.investors }}+ investisseurs</span>
                </div>
              </div>
            </div>

            <!-- Contenu -->
            <div class="p-8">
              <div class="flex items-center justify-between mb-4">
                <h3 class="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                  {{ sector.name }}
                </h3>
                <div class="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white">
                  <i :class="sector.icon" class="text-xl"></i>
                </div>
              </div>

              <p class="text-gray-600 mb-6 leading-relaxed">{{ sector.description }}</p>

              <!-- Métriques -->
              <div class="grid grid-cols-2 gap-4 mb-6">
                <div class="text-center p-3 bg-gray-50 rounded-xl">
                  <div class="text-2xl font-bold text-blue-600">{{ formatCurrency(sector.minInvestment) }}</div>
                  <div class="text-xs text-gray-500 uppercase tracking-wide">Minimum</div>
                </div>
                <div class="text-center p-3 bg-gray-50 rounded-xl">
                  <div class="text-2xl font-bold text-green-600">{{ sector.avgReturn }}%</div>
                  <div class="text-xs text-gray-500 uppercase tracking-wide">Rendement moyen</div>
                </div>
              </div>

              <!-- Barres de progression -->
              <div class="space-y-3 mb-6">
                <div>
                  <div class="flex justify-between text-sm mb-1">
                    <span class="text-gray-600">Popularité</span>
                    <span class="font-semibold">{{ sector.popularity }}%</span>
                  </div>
                  <div class="w-full bg-gray-200 rounded-full h-2">
                    <div class="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-1000"
                         :style="{ width: sector.popularity + '%' }"></div>
                  </div>
                </div>
                <div>
                  <div class="flex justify-between text-sm mb-1">
                    <span class="text-gray-600">Potentiel de croissance</span>
                    <span class="font-semibold">{{ sector.growth }}%</span>
                  </div>
                  <div class="w-full bg-gray-200 rounded-full h-2">
                    <div class="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full transition-all duration-1000"
                         :style="{ width: sector.growth + '%' }"></div>
                  </div>
                </div>
              </div>

              <!-- Tags -->
              <div class="flex flex-wrap gap-2 mb-6">
                <span v-for="tag in sector.tags" :key="tag"
                      class="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-full">
                  {{ tag }}
                </span>
              </div>

              <!-- Bouton d'action -->
              <button
                  @click="openInvestmentModal(sector)"
                  class="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-4 rounded-xl font-bold transition-all duration-300 transform hover:scale-105 hover:shadow-lg group"
              >
                <span class="flex items-center justify-center">
                  <i class="fas fa-plus mr-2 group-hover:animate-spin"></i>
                  Investir maintenant
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Section comparative -->
      <div class="bg-gradient-to-r from-gray-50 to-gray-100 rounded-3xl p-12" data-aos="zoom-in">
        <div class="text-center mb-12">
          <h3 class="text-3xl font-bold text-gray-900 mb-4">Comparaison des performances</h3>
          <p class="text-gray-600 max-w-2xl mx-auto">
            Découvrez pourquoi nos secteurs surperforment les investissements traditionnels
          </p>
        </div>

        <div class="grid md:grid-cols-3 gap-8">
          <div v-for="comparison in performanceComparison" :key="comparison.label"
               class="text-center bg-white rounded-2xl p-6 shadow-lg">
            <div class="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <i :class="comparison.icon" class="text-2xl text-white"></i>
            </div>
            <h4 class="font-bold text-gray-900 mb-2">{{ comparison.label }}</h4>
            <div class="text-3xl font-bold mb-2" :class="comparison.colorClass">{{ comparison.performance }}</div>
            <p class="text-sm text-gray-600">{{ comparison.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import { nextTick } from 'vue'

const activeSectorFilter = ref('all')

const sectorFilters = [
  { id: 'all', name: 'Tous les secteurs', icon: 'fas fa-th-large' },
  { id: 'tech', name: 'Technologies', icon: 'fas fa-microchip' },
  { id: 'green', name: 'Énergies vertes', icon: 'fas fa-leaf' },
  { id: 'finance', name: 'Finance', icon: 'fas fa-coins' },
  { id: 'bio', name: 'Biotechnologies', icon: 'fas fa-dna' }
]

const sectors = [
  {
    id: 1,
    name: 'Technologies Vertes',
    description: 'Investissez dans les énergies renouvelables et les technologies propres pour un avenir durable',
    roi: 22,
    projects: 45,
    investors: 289,
    image: 'https://images.unsplash.com/photo-1559302504-64aae6ca6b6d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    minInvestment: 5000,
    avgReturn: 24.5,
    popularity: 85,
    growth: 92,
    trending: true,
    category: 'green',
    icon: 'fas fa-solar-panel',
    tags: ['Énergie solaire', 'Éolien', 'Hydrogène vert']
  },
  {
    id: 2,
    name: 'Biotechnologies',
    description: 'Soutenez l\'innovation médicale et pharmaceutique de demain',
    roi: 18,
    projects: 32,
    investors: 187,
    image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    minInvestment: 7500,
    avgReturn: 19.8,
    popularity: 78,
    growth: 88,
    trending: false,
    category: 'bio',
    icon: 'fas fa-dna',
    tags: ['Thérapie génique', 'Diagnostic', 'Pharmacologie']
  },
  {
    id: 3,
    name: 'Fintech',
    description: 'Participez à la révolution des services financiers digitaux',
    roi: 25,
    projects: 28,
    investors: 345,
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    minInvestment: 5000,
    avgReturn: 26.3,
    popularity: 90,
    growth: 95,
    trending: true,
    category: 'finance',
    icon: 'fas fa-credit-card',
    tags: ['Blockchain', 'Paiements', 'Néobanques']
  },
  {
    id: 4,
    name: 'Intelligence Artificielle',
    description: 'Investissez dans l\'IA et l\'automatisation intelligente',
    roi: 30,
    projects: 21,
    investors: 198,
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    minInvestment: 10000,
    avgReturn: 31.2,
    popularity: 95,
    growth: 98,
    trending: true,
    category: 'tech',
    icon: 'fas fa-robot',
    tags: ['Machine Learning', 'Deep Learning', 'Computer Vision']
  },
  {
    id: 5,
    name: 'E-commerce',
    description: 'Soutenez les plateformes de commerce en ligne innovantes',
    roi: 16,
    projects: 38,
    investors: 234,
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    minInvestment: 5000,
    avgReturn: 17.5,
    popularity: 72,
    growth: 80,
    trending: false,
    category: 'tech',
    icon: 'fas fa-shopping-cart',
    tags: ['Marketplace', 'Logistique', 'B2B']
  },
  {
    id: 6,
    name: 'Blockchain',
    description: 'Participez à l\'économie décentralisée et aux cryptomonnaies',
    roi: 28,
    projects: 15,
    investors: 298,
    image: 'https://images.unsplash.com/photo-1518546305927-5a555bb7020d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    minInvestment: 10000,
    avgReturn: 29.4,
    popularity: 88,
    growth: 93,
    trending: true,
    category: 'finance',
    icon: 'fas fa-link',
    tags: ['DeFi', 'NFT', 'Web3']
  }
]

const performanceComparison = [
  {
    label: 'InvestFuture',
    performance: '+22.3%',
    description: 'Rendement moyen de notre plateforme',
    icon: 'fas fa-rocket',
    colorClass: 'text-green-600'
  },
  {
    label: 'Marchés traditionnels',
    performance: '+8.7%',
    description: 'CAC 40 sur la même période',
    icon: 'fas fa-chart-bar',
    colorClass: 'text-gray-600'
  },
  {
    label: 'Livret A',
    performance: '+3.0%',
    description: 'Taux de rémunération annuel',
    icon: 'fas fa-piggy-bank',
    colorClass: 'text-red-500'
  }
]

const filteredSectors = computed(() => {
  if (activeSectorFilter.value === 'all') {
    return sectors
  }
  return sectors.filter(sector => sector.category === activeSectorFilter.value)
})

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount)
}

const openInvestmentModal = async (sector) => {
  const selectedSector = useState('selectedSector')
  const investmentModalOpen = useState('investmentModalOpen')

  selectedSector.value = sector
  investmentModalOpen.value = true

  await nextTick()
}
</script>