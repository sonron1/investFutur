<template>
  <section id="domaines" class="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- En-tête -->
      <div class="text-center mb-16" data-aos="fade-up">
        <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Secteurs d'investissement
        </h2>
        <p class="text-xl text-gray-600 max-w-3xl mx-auto">
          Diversifiez votre portefeuille avec nos 10 secteurs d'innovation les plus prometteurs
        </p>
      </div>

      <!-- Filtres -->
      <div class="mb-12" data-aos="fade-up" data-aos-delay="100">
        <div class="bg-white rounded-2xl shadow-lg p-6">
          <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            <!-- Filtre par secteur -->
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2">Secteur</label>
              <select v-model="selectedSector" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option value="">Tous les secteurs</option>
                <option value="ia-deeptech">IA & Deep-Tech</option>
                <option value="energies-renouvelables">Énergies Renouvelables</option>
                <option value="biotechnologies">Biotechnologies</option>
                <option value="fintech">Fintech</option>
                <option value="mobilite-durable">Mobilité Durable</option>
                <option value="agritech">AgriTech</option>
                <option value="economie-circulaire">Économie Circulaire</option>
                <option value="sante-digitale">Santé Digitale</option>
                <option value="edtech">EdTech</option>
                <option value="spatial">Espace & Satellites</option>
              </select>
            </div>

            <!-- Filtre par investissement minimum -->
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2">Investissement min.</label>
              <select v-model="selectedInvestment" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option value="">Tous les montants</option>
                <option value="0-50">10€ - 50€</option>
                <option value="50-100">50€ - 100€</option>
                <option value="100-500">100€ - 500€</option>
                <option value="500+">Plus de 500€</option>
              </select>
            </div>

            <!-- Filtre par ROI -->
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2">ROI minimum</label>
              <select v-model="selectedRoi" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option value="">Tous les ROI</option>
                <option value="15">Plus de 15%</option>
                <option value="20">Plus de 20%</option>
                <option value="25">Plus de 25%</option>
                <option value="30">Plus de 30%</option>
              </select>
            </div>

            <!-- Recherche -->
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2">Rechercher</label>
              <div class="relative">
                <input
                    v-model="searchQuery"
                    type="text"
                    class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Nom du secteur..."
                >
                <i class="fas fa-search absolute left-3 top-3 text-gray-400"></i>
              </div>
            </div>
          </div>

          <!-- Bouton de réinitialisation -->
          <div class="flex justify-between items-center">
            <div class="text-sm text-gray-600">
              {{ filteredSectors.length }} secteur{{ filteredSectors.length > 1 ? 's' : '' }} trouvé{{ filteredSectors.length > 1 ? 's' : '' }}
            </div>
            <button
                @click="resetFilters"
                class="px-4 py-2 text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              Réinitialiser les filtres
            </button>
          </div>
        </div>
      </div>

      <!-- Statistiques générales -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16" data-aos="fade-up" data-aos-delay="200">
        <div class="text-center">
          <div class="text-3xl font-bold text-blue-600 mb-2">{{ totalStats.totalProjects }}</div>
          <div class="text-gray-600">Projets actifs</div>
        </div>
        <div class="text-center">
          <div class="text-3xl font-bold text-green-600 mb-2">{{ totalStats.avgRoi }}%</div>
          <div class="text-gray-600">ROI moyen</div>
        </div>
        <div class="text-center">
          <div class="text-3xl font-bold text-purple-600 mb-2">{{ formatCurrency(totalStats.minInvestment) }}</div>
          <div class="text-gray-600">À partir de</div>
        </div>
        <div class="text-center">
          <div class="text-3xl font-bold text-orange-600 mb-2">{{ totalStats.totalInvestors }}+</div>
          <div class="text-gray-600">Investisseurs</div>
        </div>
      </div>

      <!-- Message si aucun résultat -->
      <div v-if="filteredSectors.length === 0" class="text-center py-12" data-aos="fade-up">
        <div class="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <i class="fas fa-search text-gray-400 text-3xl"></i>
        </div>
        <h3 class="text-xl font-semibold text-gray-900 mb-2">Aucun secteur trouvé</h3>
        <p class="text-gray-600 mb-6">Essayez de modifier vos critères de recherche</p>
        <button @click="resetFilters" class="btn-primary">
          Voir tous les secteurs
        </button>
      </div>

      <!-- Grille des secteurs -->
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div
            v-for="(sector, index) in filteredSectors"
            :key="sector.slug"
            :data-aos="'fade-up'"
            :data-aos-delay="index * 100"
            class="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-500 group cursor-pointer"
            @click="openInvestmentModal(sector)"
        >
          <!-- Image du secteur -->
          <div class="relative h-48 overflow-hidden">
            <img
                :src="sector.image"
                :alt="sector.name"
                class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            >
            <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>

            <!-- Badge ROI -->
            <div class="absolute top-4 right-4">
              <div class="bg-white bg-opacity-95 backdrop-blur-sm rounded-lg px-3 py-1 shadow-lg">
                <div class="text-sm font-bold text-green-600">ROI {{ sector.roi }}</div>
              </div>
            </div>

            <!-- Icône du secteur -->
            <div class="absolute top-4 left-4">
              <div :class="`w-12 h-12 bg-white bg-opacity-95 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-lg`">
                <i :class="`${sector.icon} text-${sector.color}-600 text-xl`"></i>
              </div>
            </div>

            <!-- Nombre de projets -->
            <div class="absolute bottom-4 left-4">
              <div class="bg-white bg-opacity-95 backdrop-blur-sm rounded-lg px-3 py-1 shadow-lg">
                <div class="text-xs font-semibold text-gray-700">{{ sector.projetsCount }} projets</div>
              </div>
            </div>
          </div>

          <!-- Contenu -->
          <div class="p-6">
            <!-- Titre et description -->
            <div class="mb-4">
              <h3 class="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                {{ sector.name }}
              </h3>
              <p class="text-gray-600 text-sm leading-relaxed">{{ sector.description }}</p>
            </div>

            <!-- Métriques -->
            <div class="grid grid-cols-2 gap-4 mb-4">
              <div class="text-center p-3 bg-gray-50 rounded-lg">
                <div class="text-lg font-bold text-blue-600">{{ formatCurrency(sector.minInvestment) }}</div>
                <div class="text-xs text-gray-500">À partir de</div>
              </div>
              <div class="text-center p-3 bg-gray-50 rounded-lg">
                <div class="text-lg font-bold text-green-600">{{ sector.roi }}</div>
                <div class="text-xs text-gray-500">ROI moyen</div>
              </div>
            </div>

            <!-- Points forts -->
            <div class="mb-4">
              <div class="text-sm font-medium text-gray-900 mb-2">Points forts :</div>
              <ul class="space-y-1">
                <li v-for="highlight in sector.highlights.slice(0, 2)" :key="highlight" class="text-xs text-gray-600 flex items-center">
                  <i class="fas fa-check text-green-500 mr-2 text-xs"></i>
                  {{ highlight }}
                </li>
              </ul>
            </div>

            <!-- Méthodes de paiement -->
            <div class="mb-4">
              <div class="text-sm font-medium text-gray-900 mb-2">Paiements acceptés :</div>
              <div class="flex space-x-2">
                <span
                    v-for="method in sector.paymentMethods.slice(0, 3)"
                    :key="method"
                    class="inline-flex items-center px-2 py-1 bg-blue-50 text-blue-600 text-xs rounded-full"
                >
                  <i :class="getPaymentIcon(method)" class="mr-1"></i>
                  {{ getPaymentName(method) }}
                </span>
              </div>
            </div>

            <!-- Projets en vedette -->
            <div v-if="sector.projects && sector.projects.length > 0" class="mb-4">
              <div class="text-sm font-medium text-gray-900 mb-2">Projet en vedette :</div>
              <div class="bg-gradient-to-r from-blue-50 to-purple-50 p-3 rounded-lg">
                <div class="text-sm font-semibold text-gray-900">{{ sector.projects[0].name }}</div>
                <div class="text-xs text-gray-600 mt-1">{{ sector.projects[0].description.substring(0, 60) }}...</div>
                <div class="flex justify-between items-center mt-2">
                  <span class="text-xs text-gray-500">{{ sector.projects[0].investors }} investisseurs</span>
                  <span class="text-xs font-semibold text-green-600">+{{ sector.projects[0].roi }}%</span>
                </div>
              </div>
            </div>

            <!-- Bouton d'action -->
            <button
                @click.stop="openInvestmentModal(sector)"
                :class="`w-full bg-gradient-to-r from-${sector.color}-600 to-${sector.color}-700 hover:from-${sector.color}-700 hover:to-${sector.color}-800 text-white py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl`"
            >
              <i class="fas fa-rocket mr-2"></i>
              Investir dès {{ formatCurrency(sector.minInvestment) }}
            </button>

            <!-- Badge de confiance -->
            <div class="mt-3 text-center">
              <div class="inline-flex items-center text-xs text-gray-500">
                <i class="fas fa-shield-alt text-green-500 mr-1"></i>
                <span>Vérifié & sécurisé par InvestFuture</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Call to Action -->
      <div class="mt-16 text-center" data-aos="zoom-in">
        <div class="bg-gradient-to-r from-blue-600 to-purple-700 rounded-3xl p-8 text-white">
          <h3 class="text-2xl md:text-3xl font-bold mb-4">Commencez à investir dès aujourd'hui</h3>
          <p class="text-blue-100 mb-6 max-w-2xl mx-auto">
            Rejoignez plus de 2 500 investisseurs qui ont déjà fait confiance à InvestFuture. Investissement minimum : seulement 10€ !
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <NuxtLink to="/auth/register" class="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-colors shadow-lg">
              <i class="fas fa-user-plus mr-2"></i>
              Créer un compte gratuit
            </NuxtLink>
            <button class="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-blue-600 transition-colors">
              <i class="fas fa-phone mr-2"></i>
              Parler à un conseiller
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useInvestmentData } from '~/composables/useInvestmentData'

const { getSectors, getPaymentMethods } = useInvestmentData()
const paymentMethods = getPaymentMethods()

// États des filtres
const selectedSector = ref('')
const selectedInvestment = ref('')
const selectedRoi = ref('')
const searchQuery = ref('')

// Secteurs avec leurs couleurs et icônes
const sectors = computed(() => {
  const allSectors = getSectors()

  return allSectors.map(sector => ({
    ...sector,
    color: getSectorColor(sector.slug),
    icon: getSectorIcon(sector.slug),
    image: getSectorImage(sector.slug)
  }))
})

// Secteurs filtrés
const filteredSectors = computed(() => {
  let result = [...sectors.value]

  // Filtre par secteur
  if (selectedSector.value) {
    result = result.filter(sector => sector.slug === selectedSector.value)
  }

  // Filtre par investissement minimum
  if (selectedInvestment.value) {
    const [min, max] = selectedInvestment.value.split('-').map(v => v === '+' ? Infinity : parseInt(v))
    result = result.filter(sector => {
      if (max === undefined) return sector.minInvestment >= min
      return sector.minInvestment >= min && sector.minInvestment <= max
    })
  }

  // Filtre par ROI
  if (selectedRoi.value) {
    const minRoi = parseInt(selectedRoi.value)
    result = result.filter(sector => parseFloat(sector.roi) >= minRoi)
  }

  // Filtre par recherche
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(sector =>
        sector.name.toLowerCase().includes(query) ||
        sector.description.toLowerCase().includes(query)
    )
  }

  return result
})

// Statistiques globales
const totalStats = computed(() => {
  const allSectors = getSectors()

  const totalProjects = allSectors.reduce((sum, sector) => sum + sector.projetsCount, 0)
  const avgRoi = (allSectors.reduce((sum, sector) => sum + parseFloat(sector.roi), 0) / allSectors.length).toFixed(1)
  const minInvestment = Math.min(...allSectors.map(sector => sector.minInvestment))
  const totalInvestors = allSectors.reduce((sum, sector) => {
    if (sector.projects) {
      return sum + sector.projects.reduce((projectSum, project) => projectSum + project.investors, 0)
    }
    return sum
  }, 0)

  return {
    totalProjects,
    avgRoi,
    minInvestment,
    totalInvestors
  }
})

// Réinitialiser les filtres
const resetFilters = () => {
  selectedSector.value = ''
  selectedInvestment.value = ''
  selectedRoi.value = ''
  searchQuery.value = ''
}

// Mapping des couleurs par secteur
const getSectorColor = (sectorSlug) => {
  const colors = {
    'ia-deeptech': 'blue',
    'energies-renouvelables': 'green',
    'biotechnologies': 'purple',
    'fintech': 'indigo',
    'mobilite-durable': 'emerald',
    'agritech': 'lime',
    'economie-circulaire': 'teal',
    'sante-digitale': 'red',
    'edtech': 'amber',
    'spatial': 'gray'
  }
  return colors[sectorSlug] || 'blue'
}

// Mapping des icônes par secteur
const getSectorIcon = (sectorSlug) => {
  const icons = {
    'ia-deeptech': 'fas fa-robot',
    'energies-renouvelables': 'fas fa-leaf',
    'biotechnologies': 'fas fa-dna',
    'fintech': 'fas fa-coins',
    'mobilite-durable': 'fas fa-charging-station',
    'agritech': 'fas fa-seedling',
    'economie-circulaire': 'fas fa-recycle',
    'sante-digitale': 'fas fa-heartbeat',
    'edtech': 'fas fa-graduation-cap',
    'spatial': 'fas fa-satellite'
  }
  return icons[sectorSlug] || 'fas fa-chart-line'
}

// Mapping des images par secteur
const getSectorImage = (sectorSlug) => {
  const images = {
    'ia-deeptech': 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=500&h=300&fit=crop&crop=center&auto=format&q=80',
    'energies-renouvelables': 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=500&h=300&fit=crop&crop=center&auto=format&q=80',
    'biotechnologies': 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=500&h=300&fit=crop&crop=center&auto=format&q=80',
    'fintech': 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=500&h=300&fit=crop&crop=center&auto=format&q=80',
    'mobilite-durable': 'https://images.unsplash.com/photo-1593941707882-a5bac6861d75?w=500&h=300&fit=crop&crop=center&auto=format&q=80',
    'agritech': 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=500&h=300&fit=crop&crop=center&auto=format&q=80',
    'economie-circulaire': 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=500&h=300&fit=crop&crop=center&auto=format&q=80',
    'sante-digitale': 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=500&h=300&fit=crop&crop=center&auto=format&q=80',
    'edtech': 'https://images.unsplash.com/photo-1588072432836-e10032774350?w=500&h=300&fit=crop&crop=center&auto=format&q=80',
    'spatial': 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=500&h=300&fit=crop&crop=center&auto=format&q=80'
  }
  return images[sectorSlug] || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=300&fit=crop&crop=center&auto=format&q=80'
}

// Utilitaires pour les méthodes de paiement
const getPaymentIcon = (method) => {
  return paymentMethods[method]?.icon || 'fas fa-coins'
}

const getPaymentName = (method) => {
  const names = {
    bitcoin: 'BTC',
    ethereum: 'ETH',
    usdt: 'USDT',
    bnb: 'BNB'
  }
  return names[method] || method.toUpperCase()
}

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0
  }).format(amount)
}

const openInvestmentModal = (sector) => {
  console.log('Ouvrir modal d\'investissement pour le secteur:', sector.name)
}
</script>

<style scoped>
/* Styles identiques au précédent */
.group:hover .group-hover\:scale-110 {
  transform: scale(1.1);
}

.group:hover .group-hover\:text-blue-600 {
  color: #2563eb;
}

/* Classes de couleurs dynamiques */
.bg-blue-600 { background-color: #2563eb; }
.bg-green-600 { background-color: #16a34a; }
.bg-purple-600 { background-color: #9333ea; }
.bg-indigo-600 { background-color: #4f46e5; }
.bg-emerald-600 { background-color: #059669; }
.bg-lime-600 { background-color: #65a30d; }
.bg-teal-600 { background-color: #0d9488; }
.bg-red-600 { background-color: #dc2626; }
.bg-amber-600 { background-color: #d97706; }
.bg-gray-600 { background-color: #4b5563; }

.from-blue-600 { --tw-gradient-from: #2563eb; }
.from-green-600 { --tw-gradient-from: #16a34a; }
.from-purple-600 { --tw-gradient-from: #9333ea; }
.from-indigo-600 { --tw-gradient-from: #4f46e5; }
.from-emerald-600 { --tw-gradient-from: #059669; }
.from-lime-600 { --tw-gradient-from: #65a30d; }
.from-teal-600 { --tw-gradient-from: #0d9488; }
.from-red-600 { --tw-gradient-from: #dc2626; }
.from-amber-600 { --tw-gradient-from: #d97706; }
.from-gray-600 { --tw-gradient-from: #4b5563; }

.to-blue-700 { --tw-gradient-to: #1d4ed8; }
.to-green-700 { --tw-gradient-to: #15803d; }
.to-purple-700 { --tw-gradient-to: #7c3aed; }
.to-indigo-700 { --tw-gradient-to: #4338ca; }
.to-emerald-700 { --tw-gradient-to: #047857; }
.to-lime-700 { --tw-gradient-to: #4d7c0f; }
.to-teal-700 { --tw-gradient-to: #0f766e; }
.to-red-700 { --tw-gradient-to: #b91c1c; }
.to-amber-700 { --tw-gradient-to: #b45309; }
.to-gray-700 { --tw-gradient-to: #374151; }

.text-blue-600 { color: #2563eb; }
.text-green-600 { color: #16a34a; }
.text-purple-600 { color: #9333ea; }
.text-indigo-600 { color: #4f46e5; }
.text-emerald-600 { color: #059669; }
.text-lime-600 { color: #65a30d; }
.text-teal-600 { color: #0d9488; }
.text-red-600 { color: #dc2626; }
.text-amber-600 { color: #d97706; }
.text-gray-600 { color: #4b5563; }

.btn-primary {
  @apply bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors;
}
</style>