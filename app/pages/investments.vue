<template>
  <div class="min-h-screen bg-slate-50 flex flex-col">
    <Navbar />

    <div class="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- En-tête avec statistiques globales -->
      <div class="mb-8">
        <div class="flex flex-col md:flex-row md:items-center justify-between mb-6">
          <div>
            <h1 class="text-2xl font-bold text-slate-900 mb-1">Mes Investissements</h1>
            <p class="text-slate-500 text-sm">Suivez la progression de tous vos projets ({{ investments.length }} investissements actifs)</p>
          </div>
          <NuxtLink to="/#domaines" class="btn-primary mt-4 md:mt-0 inline-flex items-center">
            <i class="fas fa-plus mr-2"></i>
            Nouveau projet
          </NuxtLink>
        </div>

        <!-- Statistiques globales -->
        <div v-if="investments.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
          <div class="bg-white border border-slate-100 rounded-2xl shadow-sm p-5">
            <div class="flex items-center justify-between">
              <div>
                <div class="text-xl font-bold text-slate-900 mb-0.5">{{ formatCurrency(portfolioStats.totalInvested) }}</div>
                <div class="text-slate-500 text-xs">Total investi</div>
              </div>
              <div class="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
                <i class="fas fa-wallet text-blue-600"></i>
              </div>
            </div>
          </div>

          <div class="bg-white border border-slate-100 rounded-2xl shadow-sm p-5">
            <div class="flex items-center justify-between">
              <div>
                <div class="text-xl font-bold text-slate-900 mb-0.5">+{{ portfolioStats.avgRoi.toFixed(1) }}%</div>
                <div class="text-slate-500 text-xs">Performance moyenne</div>
              </div>
              <div class="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center">
                <i class="fas fa-chart-line text-emerald-600"></i>
              </div>
            </div>
          </div>

          <div class="bg-white border border-slate-100 rounded-2xl shadow-sm p-5">
            <div class="flex items-center justify-between">
              <div>
                <div class="text-xl font-bold text-slate-900 mb-0.5">{{ investments.length }}</div>
                <div class="text-slate-500 text-xs">Projets actifs</div>
              </div>
              <div class="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center">
                <i class="fas fa-chart-pie text-indigo-600"></i>
              </div>
            </div>
          </div>

          <div class="bg-white border border-slate-100 rounded-2xl shadow-sm p-5">
            <div class="flex items-center justify-between">
              <div>
                <div class="text-xl font-bold text-slate-900 mb-0.5">{{ formatCurrency(portfolioStats.monthlyGains) }}</div>
                <div class="text-slate-500 text-xs">Gains ce mois</div>
              </div>
              <div class="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center">
                <i class="fas fa-calendar text-amber-600"></i>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Filtres -->
      <div v-if="investments.length > 0" class="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 mb-6">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-3">
          <div>
            <select v-model="filters.status" class="w-full px-3 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all bg-white text-slate-900 text-sm">
              <option value="">Tous les statuts</option>
              <option value="actif">Actifs</option>
              <option value="termine">Terminés</option>
              <option value="en_cours">En cours</option>
            </select>
          </div>
          <div>
            <select v-model="filters.sector" class="w-full px-3 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all bg-white text-slate-900 text-sm">
              <option value="">Tous les secteurs</option>
              <option v-for="sector in availableSectors" :key="sector" :value="sector">{{ sector }}</option>
            </select>
          </div>
          <div>
            <select v-model="filters.sort" class="w-full px-3 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all bg-white text-slate-900 text-sm">
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
                  class="w-full pl-9 pr-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all bg-white text-slate-900 placeholder-slate-400 text-sm"
                  placeholder="Rechercher un projet..."
              >
              <i class="fas fa-search absolute left-3 top-3 text-slate-400 text-sm"></i>
            </div>
          </div>
        </div>
      </div>

      <!-- Liste des investissements -->
      <div class="bg-white rounded-2xl border border-slate-100 shadow-sm">
        <div v-if="investments.length === 0" class="text-center py-16">
          <div class="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-5">
            <i class="fas fa-chart-pie text-2xl text-slate-400"></i>
          </div>
          <h3 class="text-lg font-bold text-slate-900 mb-2">Aucun investissement</h3>
          <p class="text-slate-500 text-sm mb-6">Commencez à investir dans nos secteurs innovants</p>
          <NuxtLink to="/#domaines" class="btn-primary inline-flex items-center">
            Découvrir les opportunités
          </NuxtLink>
        </div>

        <div v-else>
          <!-- Grille des investissements -->
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-5 p-5">
            <div
                v-for="investment in filteredInvestments"
                :key="investment.id"
                class="border border-slate-100 rounded-xl hover:shadow-md hover:border-slate-200 transition-all duration-200 overflow-hidden"
            >
              <!-- Image du projet -->
              <div class="relative h-36 overflow-hidden">
                <img
                    :src="investment.image"
                    :alt="investment.project"
                    class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                >
                <div class="absolute top-3 right-3">
                  <span
                      :class="`badge bg-${investment.badgeColor} text-white px-3 py-1 rounded-full text-xs font-semibold`"
                  >
                    {{ investment.badge }}
                  </span>
                </div>
              </div>

              <!-- Contenu -->
              <div class="p-5">
                <!-- En-tête du projet -->
                <div class="flex justify-between items-start mb-3">
                  <div class="flex items-center">
                    <div class="w-9 h-9 bg-blue-50 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                      <i class="fas fa-chart-line text-blue-600 text-sm"></i>
                    </div>
                    <div>
                      <div class="font-semibold text-slate-900 text-sm">{{ investment.project }}</div>
                      <span class="inline-block text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded-md mt-0.5 font-medium">{{ investment.sector }}</span>
                    </div>
                  </div>
                  <span
                      :class="getStatusBadgeClass(investment.status)"
                      class="text-xs font-semibold px-2 py-0.5 rounded-full"
                  >
                    {{ getStatusLabel(investment.status) }}
                  </span>
                </div>

                <!-- Description -->
                <p class="text-slate-500 text-xs mb-4 line-clamp-2 leading-relaxed">{{ investment.description }}</p>

                <!-- Métriques -->
                <div class="grid grid-cols-2 gap-3 mb-4">
                  <div class="text-center bg-slate-50 rounded-lg p-3">
                    <div class="font-bold text-blue-600 text-sm">{{ formatCurrency(investment.amount) }}</div>
                    <div class="text-slate-500 text-xs mt-0.5">Mon investissement</div>
                  </div>
                  <div class="text-center bg-slate-50 rounded-lg p-3">
                    <div class="font-bold text-emerald-600 text-sm">+{{ investment.roi }}%</div>
                    <div class="text-slate-500 text-xs mt-0.5">Performance</div>
                  </div>
                </div>

                <!-- Barre de progression -->
                <div class="mb-4">
                  <div class="flex justify-between text-xs text-slate-500 mb-1.5">
                    <span>Progression</span>
                    <span class="font-medium">{{ investment.progress }}%</span>
                  </div>
                  <div class="w-full bg-slate-100 rounded-full h-1.5">
                    <div
                        class="bg-gradient-to-r from-blue-600 to-indigo-600 h-1.5 rounded-full transition-all duration-300"
                        :style="{ width: investment.progress + '%' }"
                    ></div>
                  </div>
                </div>

                <!-- Actions -->
                <div class="flex justify-between items-center">
                  <span class="text-xs text-slate-400">{{ formatDate(investment.date) }}</span>
                  <div class="flex space-x-2">
                    <button
                        @click="showProjectDetails(investment)"
                        class="px-3 py-1.5 text-blue-600 border border-blue-200 rounded-lg text-xs font-medium hover:bg-blue-50 transition-colors"
                    >
                      Détails
                    </button>
                    <button class="px-3 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-medium hover:bg-blue-700 transition-colors">
                      Réinvestir
                    </button>
                    <button
                        @click="removeInvestment(investment.id)"
                        class="px-3 py-1.5 text-red-500 border border-red-200 rounded-lg text-xs hover:bg-red-50 transition-colors"
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
          class="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          @click.self="closeModal"
      >
        <div class="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-xl">
          <div class="p-6">
            <!-- En-tête du modal -->
            <div class="flex justify-between items-start mb-5">
              <div>
                <h2 class="text-lg font-bold text-slate-900">{{ selectedProject.project }}</h2>
                <p class="text-slate-500 text-sm mt-0.5">{{ selectedProject.sector }}</p>
              </div>
              <button @click="closeModal" class="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors">
                <i class="fas fa-times"></i>
              </button>
            </div>

            <!-- Image -->
            <img
                :src="selectedProject.image"
                :alt="selectedProject.project"
                class="w-full h-44 object-cover rounded-xl mb-5"
            >

            <!-- Description détaillée -->
            <div class="mb-5">
              <h3 class="text-sm font-bold text-slate-900 mb-2">Description du projet</h3>
              <p class="text-slate-500 text-sm leading-relaxed">{{ selectedProject.description }}</p>
            </div>

            <!-- Métriques détaillées -->
            <div class="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
              <div class="text-center p-3.5 bg-slate-50 rounded-xl border border-slate-100">
                <div class="text-base font-bold text-blue-600">{{ formatCurrency(selectedProject.amount) }}</div>
                <div class="text-xs text-slate-500 mt-0.5">Investissement</div>
              </div>
              <div class="text-center p-3.5 bg-slate-50 rounded-xl border border-slate-100">
                <div class="text-base font-bold text-emerald-600">+{{ selectedProject.roi }}%</div>
                <div class="text-xs text-slate-500 mt-0.5">ROI</div>
              </div>
              <div class="text-center p-3.5 bg-slate-50 rounded-xl border border-slate-100">
                <div class="text-base font-bold text-indigo-600">{{ selectedProject.progress }}%</div>
                <div class="text-xs text-slate-500 mt-0.5">Progression</div>
              </div>
              <div class="text-center p-3.5 bg-slate-50 rounded-xl border border-slate-100">
                <div class="text-base font-bold text-amber-600">{{ formatCurrency(calculateGains(selectedProject)) }}</div>
                <div class="text-xs text-slate-500 mt-0.5">Gains estimés</div>
              </div>
            </div>

            <!-- Actions du modal -->
            <div class="flex justify-end space-x-3">
              <button @click="closeModal" class="px-4 py-2 text-slate-600 border border-slate-200 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors">
                Fermer
              </button>
              <button class="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors">
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
import { useInvestmentStore } from '~/stores/user-investments'

useSeoMeta({
  title: 'Mes Investissements - InvestFuture',
  description: 'Suivez et gérez vos investissements sur InvestFuture'
})

const authStore = useAuthStore()
const userInvestments = useInvestmentStore()
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
    'actif': 'bg-emerald-100 text-emerald-700',
    'termine': 'bg-blue-100 text-blue-700',
    'en_cours': 'bg-amber-100 text-amber-700'
  }
  return badges[status] || 'bg-slate-100 text-slate-700'
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

.bg-success { @apply bg-emerald-500; }
.bg-warning { @apply bg-amber-500; }
.bg-info { @apply bg-blue-500; }
.bg-danger { @apply bg-red-500; }
.bg-primary { @apply bg-blue-600; }
.bg-dark { @apply bg-slate-800; }
</style>
