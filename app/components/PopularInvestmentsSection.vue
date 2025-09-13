<template>
  <section class="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- En-tête -->
      <div class="text-center mb-16" data-aos="fade-up">
        <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Investissements les plus populaires
        </h2>
        <p class="text-xl text-gray-600 max-w-3xl mx-auto">
          Découvrez les projets qui attirent le plus d'investisseurs et génèrent les meilleures performances
        </p>
      </div>

      <!-- Grille des investissements -->
      <div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 mb-12">
        <div
            v-for="(investment, index) in popularInvestments"
            :key="investment.id"
            :data-aos="'fade-up'"
            :data-aos-delay="index * 100"
            class="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-500 group"
        >
          <!-- Image avec badge -->
          <div class="relative h-48 overflow-hidden">
            <img
                :src="investment.image"
                :alt="investment.name"
                class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            >
            <div class="absolute top-4 left-4">
              <span
                  :class="`badge bg-${investment.badgeColor} text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg`"
              >
                {{ investment.badge }}
              </span>
            </div>
            <div class="absolute top-4 right-4">
              <div class="bg-white bg-opacity-90 backdrop-blur-sm rounded-lg px-3 py-1">
                <div class="text-xs font-semibold text-gray-700">ROI {{ investment.roi }}%</div>
              </div>
            </div>
          </div>

          <!-- Contenu -->
          <div class="p-6">
            <!-- En-tête du projet -->
            <div class="flex items-center mb-4">
              <div
                  :class="`w-12 h-12 bg-${investment.sectorColor}-50 rounded-xl flex items-center justify-center mr-4`"
              >
                <i :class="`${investment.icon} text-${investment.sectorColor}-600 text-lg`"></i>
              </div>
              <div>
                <h3 class="font-bold text-gray-900 text-lg leading-tight">{{ investment.name }}</h3>
                <span :class="`text-sm bg-${investment.sectorColor}-50 text-${investment.sectorColor}-600 px-2 py-1 rounded-full`">
                  {{ investment.sector }}
                </span>
              </div>
            </div>

            <!-- Description -->
            <p class="text-gray-600 mb-6 leading-relaxed">{{ investment.description }}</p>

            <!-- Métriques -->
            <div class="grid grid-cols-2 gap-4 mb-6">
              <div class="text-center">
                <div class="text-lg font-bold text-blue-600">{{ formatCurrency(investment.raised) }}</div>
                <div class="text-sm text-gray-500">Montant levé</div>
              </div>
              <div class="text-center">
                <div class="text-lg font-bold text-green-600">{{ investment.investors }}</div>
                <div class="text-sm text-gray-500">Investisseurs</div>
              </div>
            </div>

            <!-- Barre de progression -->
            <div class="mb-6">
              <div class="flex justify-between text-sm text-gray-600 mb-2">
                <span>Objectif</span>
                <span>{{ investment.progress }}%</span>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                <div
                    :class="`bg-gradient-to-r from-${investment.sectorColor}-500 to-${investment.sectorColor}-600 h-2 rounded-full transition-all duration-1000 ease-out`"
                    :style="{ width: investment.progress + '%' }"
                ></div>
              </div>
              <div class="flex justify-between text-xs text-gray-500 mt-1">
                <span>{{ formatCurrency(investment.raised) }}</span>
                <span>{{ formatCurrency(investment.target) }}</span>
              </div>
            </div>

            <!-- Actions -->
            <div class="flex space-x-3">
              <button
                  @click="openInvestmentModal(investment)"
                  :class="`flex-1 bg-gradient-to-r from-${investment.sectorColor}-600 to-${investment.sectorColor}-700 hover:from-${investment.sectorColor}-700 hover:to-${investment.sectorColor}-800 text-white py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl`"
              >
                Investir dès {{ formatCurrency(investment.minInvest) }}
              </button>
              <button
                  @click="showProjectDetails(investment)"
                  class="px-4 py-3 text-gray-600 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors"
                  title="Plus d'infos"
              >
                <i class="fas fa-info-circle"></i>
              </button>
            </div>

            <!-- Indicateurs de confiance -->
            <div class="mt-4 pt-4 border-t border-gray-100">
              <div class="flex items-center justify-between text-xs text-gray-500">
                <div class="flex items-center">
                  <i class="fas fa-shield-alt text-green-500 mr-1"></i>
                  <span>Vérifié & sécurisé</span>
                </div>
                <div class="flex items-center">
                  <i class="fas fa-clock mr-1"></i>
                  <span>Investissement depuis {{ investment.dateInvestment }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Call to action -->
      <div class="text-center" data-aos="zoom-in">
        <div class="bg-gradient-to-r from-blue-600 to-purple-700 rounded-3xl p-8 text-white">
          <h3 class="text-2xl font-bold mb-4">Prêt à rejoindre nos investisseurs ?</h3>
          <p class="text-blue-100 mb-6 max-w-2xl mx-auto">
            Plus de 2 500 investisseurs nous font confiance. Diversifiez votre portefeuille avec des projets innovants et rentables.
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <NuxtLink to="/auth/register" class="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-colors">
              <i class="fas fa-user-plus mr-2"></i>
              Créer un compte
            </NuxtLink>
            <NuxtLink to="#domaines" class="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-blue-600 transition-colors">
              <i class="fas fa-eye mr-2"></i>
              Voir tous les secteurs
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useInvestmentData } from '~/composables/useInvestmentData'

const { getSectors } = useInvestmentData()

// Sélection des investissements les plus populaires
const popularInvestments = computed(() => {
  const allSectors = getSectors()
  const popularProjects = []

  // Sélectionner les meilleurs projets de chaque secteur
  allSectors.forEach(sector => {
    if (sector.projects && sector.projects.length > 0) {
      // Prendre le premier projet de chaque secteur (supposé être le plus populaire)
      const project = sector.projects[0]

      popularProjects.push({
        id: project.id,
        name: project.name,
        description: project.description,
        sector: sector.name,
        sectorColor: getSectorColor(sector.slug),
        icon: getSectorIcon(sector.slug),
        image: project.image,
        raised: project.raised,
        target: project.target,
        investors: project.investors,
        minInvest: project.minInvest,
        roi: project.roi,
        progress: project.progress,
        status: project.status,
        dateInvestment: project.dateInvestment,
        badge: project.badge,
        badgeColor: project.badgeColor
      })
    }
  })

  // Trier par popularité (nombre d'investisseurs) et prendre les 6 premiers
  return popularProjects
      .sort((a, b) => b.investors - a.investors)
      .slice(0, 6)
})

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

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0
  }).format(amount)
}

const openInvestmentModal = (investment) => {
  // Émettre l'événement pour ouvrir le modal d'investissement
  // Cette fonctionnalité sera connectée au système modal existant
  console.log('Ouvrir modal d\'investissement pour:', investment.name)
}

const showProjectDetails = (investment) => {
  // Afficher les détails du projet
  console.log('Afficher détails pour:', investment.name)
}
</script>

<style scoped>
.badge {
  @apply inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium;
}

.bg-success { @apply bg-green-500; }
.bg-warning { @apply bg-yellow-500; }
.bg-info { @apply bg-blue-500; }
.bg-danger { @apply bg-red-500; }
.bg-primary { @apply bg-blue-600; }
.bg-dark { @apply bg-gray-800; }
</style>
