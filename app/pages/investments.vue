<template>
  <div class="min-h-screen bg-gray-50 flex flex-col">
    <Navbar />

    <div class="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- En-tête avec statistiques globales -->
      <div class="mb-8">
        <div class="flex flex-col md:flex-row md:items-center justify-between mb-6">
          <div>
            <h1 class="text-3xl font-bold text-gray-900 mb-2">Mes Investissements</h1>
            <p class="text-gray-600">Suivez la progression de tous vos projets ({{ investments.length }} investissements actifs)</p>
          </div>
          <NuxtLink to="/#domaines" class="btn-primary mt-4 md:mt-0">
            <i class="fas fa-plus mr-2"></i>
            Nouveau projet
          </NuxtLink>
        </div>

        <!-- Statistiques globales -->
        <div v-if="investments.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <div class="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-xl shadow-lg">
            <div class="flex items-center justify-between">
              <div>
                <h3 class="text-2xl font-bold mb-1">{{ formatCurrency(portfolioStats.totalInvested) }}</h3>
                <p class="text-blue-100">Total investi</p>
              </div>
              <i class="fas fa-wallet text-3xl text-blue-200"></i>
            </div>
          </div>

          <div class="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-xl shadow-lg">
            <div class="flex items-center justify-between">
              <div>
                <h3 class="text-2xl font-bold mb-1">+{{ portfolioStats.avgRoi.toFixed(1) }}%</h3>
                <p class="text-green-100">Performance moyenne</p>
              </div>
              <i class="fas fa-chart-line text-3xl text-green-200"></i>
            </div>
          </div>

          <div class="bg-gradient-to-r from-yellow-500 to-orange-500 text-white p-6 rounded-xl shadow-lg">
            <div class="flex items-center justify-between">
              <div>
                <h3 class="text-2xl font-bold mb-1">{{ investments.length }}</h3>
                <p class="text-yellow-100">Projets actifs</p>
              </div>
              <i class="fas fa-chart-pie text-3xl text-yellow-200"></i>
            </div>
          </div>

          <div class="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6 rounded-xl shadow-lg">
            <div class="flex items-center justify-between">
              <div>
                <h3 class="text-2xl font-bold mb-1">{{ formatCurrency(portfolioStats.monthlyGains) }}</h3>
                <p class="text-purple-100">Gains ce mois</p>
              </div>
              <i class="fas fa-calendar text-3xl text-purple-200"></i>
            </div>
          </div>
        </div>
      </div>

      <!-- Filtres -->
      <div v-if="investments.length > 0" class="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-8">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <select v-model="filters.status" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option value="">Tous les statuts</option>
              <option value="actif">Actifs</option>
              <option value="termine">Terminés</option>
              <option value="en_cours">En cours</option>
            </select>
          </div>
          <div>
            <select v-model="filters.sector" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option value="">Tous les secteurs</option>
              <option v-for="sector in availableSectors" :key="sector" :value="sector">{{ sector }}</option>
            </select>
          </div>
          <div>
            <select v-model="filters.sort" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option value="date-desc">Plus récents</option>
              <option value="date-asc">Plus anciens</option>
              <option value="amount-desc">Montant décroissant</option>
              <option value="amount-asc">Montant croissant</option>
              <option value="roi-desc">Meilleure performance</option>
            </select>
          </div>
          <div>
            <div class="relative">
              <input
                  v-model="filters.search"
                  type="text"
                  class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Rechercher un projet..."
              >
              <i class="fas fa-search absolute left-3 top-3 text-gray-400"></i>
            </div>
          </div>
        </div>
      </div>

      <!-- Liste des investissements -->
      <div class="bg-white rounded-xl shadow-sm border border-gray-100">
        <div v-if="investments.length === 0" class="text-center py-16">
          <div class="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <i class="fas fa-chart-pie text-4xl text-gray-400"></i>
          </div>
          <h3 class="text-xl font-semibold text-gray-900 mb-2">Aucun investissement</h3>
          <p class="text-gray-600 mb-8">Commencez à investir dans nos secteurs innovants</p>
          <NuxtLink to="/#domaines" class="btn-primary">
            Découvrir les opportunités
          </NuxtLink>
        </div>

        <div v-else>
          <!-- Grille des investissements -->
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
            <div
                v-for="investment in filteredInvestments"
                :key="investment.id"
                class="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
            >
              <!-- Image du projet -->
              <div class="relative h-40 overflow-hidden">
                <img
                    :src="investment.image"
                    :alt="investment.project"
                    class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                >
                <div class="absolute top-4 right-4">
                  <span
                      :class="`badge bg-${investment.badgeColor} text-white px-3 py-1 rounded-full text-sm font-semibold`"
                  >
                    {{ investment.badge }}
                  </span>
                </div>
              </div>

              <!-- Contenu -->
              <div class="p-6">
                <!-- En-tête du projet -->
                <div class="flex justify-between items-start mb-3">
                  <div class="flex items-center">
                    <div class="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mr-3">
                      <i class="fas fa-chart-line text-blue-600"></i>
                    </div>
                    <div>
                      <h3 class="font-semibold text-gray-900">{{ investment.project }}</h3>
                      <span class="text-sm bg-blue-50 text-blue-600 px-2 py-1 rounded">{{ investment.sector }}</span>
                    </div>
                  </div>
                  <span
                      :class="getStatusBadgeClass(investment.status)"
                      class="text-xs font-semibold px-2 py-1 rounded-full"
                  >
                    {{ getStatusLabel(investment.status) }}
                  </span>
                </div>

                <!-- Description -->
                <p class="text-gray-600 text-sm mb-4 line-clamp-2">{{ investment.description }}</p>

                <!-- Métriques -->
                <div class="grid grid-cols-2 gap-4 mb-4">
                  <div class="text-center">
                    <h4 class="font-semibold text-blue-600 text-lg">{{ formatCurrency(investment.amount) }}</h4>
                    <p class="text-gray-500 text-sm">Mon investissement</p>
                  </div>
                  <div class="text-center">
                    <h4 class="font-semibold text-green-600 text-lg">+{{ investment.roi }}%</h4>
                    <p class="text-gray-500 text-sm">Performance</p>
                  </div>
                </div>

                <!-- Barre de progression -->
                <div class="mb-4">
                  <div class="flex justify-between text-sm text-gray-600 mb-1">
                    <span>Progression</span>
                    <span>{{ investment.progress }}%</span>
                  </div>
                  <div class="w-full bg-gray-200 rounded-full h-2">
                    <div
                        class="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300"
                        :style="{ width: investment.progress + '%' }"
                    ></div>
                  </div>
                </div>

                <!-- Actions -->
                <div class="flex justify-between items-center">
                  <small class="text-gray-500">{{ formatDate(investment.date) }}</small>
                  <div class="flex space-x-2">
                    <button
                        @click="showProjectDetails(investment)"
                        class="px-3 py-1 text-blue-600 border border-blue-600 rounded-lg text-sm hover:bg-blue-50 transition-colors"
                    >
                      Détails
                    </button>
                    <button class="px-3 py-1 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors">
                      Réinvestir
                    </button>
                    <button
                        @click="removeInvestment(investment.id)"
                        class="px-3 py-1 text-red-600 border border-red-600 rounded-lg text-sm hover:bg-red-50 transition-colors"
                        title="Supprimer"
                    >
                      <i class="fas fa-trash"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Modal de détails -->
      <div
          v-if="selectedProject"
          class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          @click.self="closeModal"
      >
        <div class="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div class="p-6">
            <!-- En-tête du modal -->
            <div class="flex justify-between items-start mb-6">
              <div>
                <h2 class="text-2xl font-bold text-gray-900">{{ selectedProject.project }}</h2>
                <p class="text-gray-600">{{ selectedProject.sector }}</p>
              </div>
              <button @click="closeModal" class="text-gray-400 hover:text-gray-600">
                <i class="fas fa-times text-xl"></i>
              </button>
            </div>

            <!-- Image -->
            <img
                :src="selectedProject.image"
                :alt="selectedProject.project"
                class="w-full h-48 object-cover rounded-xl mb-6"
            >

            <!-- Description détaillée -->
            <div class="mb-6">
              <h3 class="text-lg font-semibold mb-3">Description du projet</h3>
              <p class="text-gray-600 leading-relaxed">{{ selectedProject.description }}</p>
            </div>

            <!-- Métriques détaillées -->
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div class="text-center p-4 bg-gray-50 rounded-lg">
                <div class="text-lg font-bold text-blue-600">{{ formatCurrency(selectedProject.amount) }}</div>
                <div class="text-sm text-gray-600">Investissement</div>
              </div>
              <div class="text-center p-4 bg-gray-50 rounded-lg">
                <div class="text-lg font-bold text-green-600">+{{ selectedProject.roi }}%</div>
                <div class="text-sm text-gray-600">ROI</div>
              </div>
              <div class="text-center p-4 bg-gray-50 rounded-lg">
                <div class="text-lg font-bold text-purple-600">{{ selectedProject.progress }}%</div>
                <div class="text-sm text-gray-600">Progression</div>
              </div>
              <div class="text-center p-4 bg-gray-50 rounded-lg">
                <div class="text-lg font-bold text-orange-600">{{ formatCurrency(calculateGains(selectedProject)) }}</div>
                <div class="text-sm text-gray-600">Gains estimés</div>
              </div>
            </div>

            <!-- Actions du modal -->
            <div class="flex justify-end space-x-3">
              <button @click="closeModal" class="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50">
                Fermer
              </button>
              <button class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Réinvestir
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <Footer />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useAuthStore } from '~/stores/auth'
import { useUserInvestmentsStore } from '~/stores/user-investments'

useSeoMeta({
  title: 'Mes Investissements - InvestFuture',
  description: 'Suivez et gérez vos investissements sur InvestFuture'
})

const authStore = useAuthStore()
const userInvestments = useUserInvestmentsStore()
const selectedProject = ref(null)

// Filtres réactifs
const filters = ref({
  status: '',
  sector: '',
  sort: 'date-desc',
  search: ''
})

const investments = computed(() => userInvestments.investments)

const availableSectors = computed(() => {
  const sectors = [...new Set(investments.value.map(inv => inv.sector))]
  return sectors.sort()
})

const portfolioStats = computed(() => {
  const totalInvested = userInvestments.totalAmount
  const totalGains = userInvestments.totalGains
  const avgRoi = userInvestments.avgRoi
  const monthlyGains = totalGains * 0.08 // Estimation mensuelle

  return {
    totalInvested,
    totalGains,
    avgRoi,
    monthlyGains
  }
})

const filteredInvestments = computed(() => {
  let result = [...investments.value]

  // Filtre par statut
  if (filters.value.status) {
    result = result.filter(inv => inv.status === filters.value.status)
  }

  // Filtre par secteur
  if (filters.value.sector) {
    result = result.filter(inv => inv.sector === filters.value.sector)
  }

  // Filtre par recherche
  if (filters.value.search) {
    const search = filters.value.search.toLowerCase()
    result = result.filter(inv =>
        inv.project.toLowerCase().includes(search) ||
        inv.sector.toLowerCase().includes(search) ||
        inv.description.toLowerCase().includes(search)
    )
  }

  // Tri
  switch (filters.value.sort) {
    case 'date-desc':
      result.sort((a, b) => new Date(b.date) - new Date(a.date))
      break
    case 'date-asc':
      result.sort((a, b) => new Date(a.date) - new Date(b.date))
      break
    case 'amount-desc':
      result.sort((a, b) => b.amount - a.amount)
      break
    case 'amount-asc':
      result.sort((a, b) => a.amount - b.amount)
      break
    case 'roi-desc':
      result.sort((a, b) => b.roi - a.roi)
      break
  }

  return result
})

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR'
  }).format(amount)
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

const calculateGains = (investment) => {
  return (investment.amount * investment.roi) / 100
}

const getStatusBadgeClass = (status) => {
  const badges = {
    'actif': 'bg-green-100 text-green-800',
    'termine': 'bg-blue-100 text-blue-800',
    'en_cours': 'bg-yellow-100 text-yellow-800'
  }
  return badges[status] || 'bg-gray-100 text-gray-800'
}

const getStatusLabel = (status) => {
  const labels = {
    'actif': 'Actif',
    'termine': 'Terminé',
    'en_cours': 'En cours'
  }
  return labels[status] || 'Inconnu'
}

const showProjectDetails = (investment) => {
  selectedProject.value = investment
}

const closeModal = () => {
  selectedProject.value = null
}

const removeInvestment = (id) => {
  if (confirm('Êtes-vous sûr de vouloir supprimer cet investissement ?')) {
    userInvestments.removeInvestment(id)
  }
}

onMounted(() => {
  if (!authStore.isAuthenticated) {
    navigateTo('/auth/login')
  }
  userInvestments.loadFromStorage()
})
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

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
