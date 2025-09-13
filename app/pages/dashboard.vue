<template>
  <div class="min-h-screen bg-gray-50 flex flex-col">
    <Navbar />

    <div class="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Message de bienvenue après inscription -->
      <div v-if="isNewUser" class="mb-8 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-2xl p-6" data-aos="fade-down">
        <div class="flex items-center">
          <div class="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mr-6">
            <i class="fas fa-rocket text-2xl text-white"></i>
          </div>
          <div>
            <h2 class="text-2xl font-bold mb-2">Bienvenue sur InvestFuture !</h2>
            <p class="text-blue-100">Votre compte a été créé avec succès. Explorez nos opportunités d'investissement dès maintenant.</p>
          </div>
        </div>
      </div>

      <!-- En-tête du dashboard -->
      <div class="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <div>
          <h1 class="text-3xl font-bold text-gray-900 mb-2">Tableau de bord</h1>
          <p class="text-gray-600">Bienvenue, {{ user?.name || 'Investisseur' }}</p>
        </div>
        <NuxtLink to="/#domaines" class="btn-primary mt-4 md:mt-0">
          <i class="fas fa-plus mr-2"></i>
          Découvrir les opportunités
        </NuxtLink>
      </div>

      <!-- Statistiques rapides -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100" data-aos="fade-up" data-aos-delay="100">
          <div class="flex items-center">
            <div class="p-2 bg-blue-100 rounded-lg mr-4">
              <i class="fas fa-wallet text-blue-600 text-xl"></i>
            </div>
            <div>
              <h3 class="text-2xl font-bold text-gray-900">{{ formatCurrency(portfolioStats.totalInvested) }}</h3>
              <p class="text-gray-600 text-sm">Total investi</p>
            </div>
          </div>
        </div>

        <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100" data-aos="fade-up" data-aos-delay="200">
          <div class="flex items-center">
            <div class="p-2 bg-green-100 rounded-lg mr-4">
              <i class="fas fa-chart-line text-green-600 text-xl"></i>
            </div>
            <div>
              <h3 class="text-2xl font-bold text-gray-900">+{{ portfolioStats.avgRoi.toFixed(1) }}%</h3>
              <p class="text-gray-600 text-sm">ROI moyen</p>
            </div>
          </div>
        </div>

        <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100" data-aos="fade-up" data-aos-delay="300">
          <div class="flex items-center">
            <div class="p-2 bg-purple-100 rounded-lg mr-4">
              <i class="fas fa-chart-pie text-purple-600 text-xl"></i>
            </div>
            <div>
              <h3 class="text-2xl font-bold text-gray-900">{{ portfolioStats.count }}</h3>
              <p class="text-gray-600 text-sm">Investissements</p>
            </div>
          </div>
        </div>

        <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100" data-aos="fade-up" data-aos-delay="400">
          <div class="flex items-center">
            <div class="p-2 bg-orange-100 rounded-lg mr-4">
              <i class="fas fa-euro-sign text-orange-600 text-xl"></i>
            </div>
            <div>
              <h3 class="text-2xl font-bold text-gray-900">{{ formatCurrency(portfolioStats.totalGains) }}</h3>
              <p class="text-gray-600 text-sm">Gains potentiels</p>
            </div>
          </div>
        </div>
      </div>

      <div class="grid lg:grid-cols-2 gap-8">
        <!-- Mes derniers investissements -->
        <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6" data-aos="fade-right">
          <div class="flex items-center justify-between mb-6">
            <h2 class="text-xl font-bold text-gray-900">Mes derniers investissements</h2>
            <NuxtLink to="/investments" class="text-blue-600 hover:text-blue-700 text-sm font-medium">
              Voir tout
            </NuxtLink>
          </div>

          <div v-if="recentInvestments.length === 0" class="text-center py-8">
            <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <i class="fas fa-chart-pie text-gray-400 text-2xl"></i>
            </div>
            <p class="text-gray-600 mb-4">Aucun investissement pour le moment</p>
            <NuxtLink to="/#domaines" class="btn-primary">
              Commencer à investir
            </NuxtLink>
          </div>

          <div v-else class="space-y-4">
            <div
                v-for="investment in recentInvestments"
                :key="investment.id"
                class="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                <i class="fas fa-chart-line text-blue-600"></i>
              </div>
              <div class="flex-1">
                <h3 class="font-semibold text-gray-900">{{ investment.project }}</h3>
                <p class="text-sm text-gray-600">{{ investment.sector }}</p>
              </div>
              <div class="text-right">
                <div class="font-semibold text-gray-900">{{ formatCurrency(investment.amount) }}</div>
                <div class="text-sm text-green-600">+{{ investment.roi }}%</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Opportunités recommandées -->
        <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6" data-aos="fade-left">
          <div class="flex items-center justify-between mb-6">
            <h2 class="text-xl font-bold text-gray-900">Recommandé pour vous</h2>
            <NuxtLink to="/#domaines" class="text-blue-600 hover:text-blue-700 text-sm font-medium">
              Voir tout
            </NuxtLink>
          </div>

          <div class="space-y-4">
            <div
                v-for="opportunity in recommendedOpportunities"
                :key="opportunity.id"
                class="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors cursor-pointer"
                @click="openInvestmentModal(opportunity)"
            >
              <div class="flex items-start justify-between mb-3">
                <div>
                  <h3 class="font-semibold text-gray-900">{{ opportunity.name }}</h3>
                  <span class="text-sm bg-blue-50 text-blue-600 px-2 py-1 rounded">{{ opportunity.sector }}</span>
                </div>
                <span class="text-lg font-bold text-green-600">{{ opportunity.roi }}%</span>
              </div>
              <p class="text-sm text-gray-600 mb-3">{{ opportunity.description }}</p>
              <div class="flex justify-between items-center">
                <span class="text-sm text-gray-500">Min. {{ formatCurrency(opportunity.minInvest) }}</span>
                <span class="text-sm text-gray-500">{{ opportunity.investors }} investisseurs</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Section actualités et conseils -->
      <div class="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6" data-aos="fade-up">
        <div class="flex items-center justify-between mb-6">
          <div>
            <h2 class="text-xl font-bold text-gray-900 mb-2">Conseils d'investissement</h2>
            <p class="text-gray-600">Restez informé des dernières tendances</p>
          </div>
          <i class="fas fa-lightbulb text-3xl text-yellow-500"></i>
        </div>

        <div class="grid md:grid-cols-3 gap-4">
          <div class="bg-white p-4 rounded-xl shadow-sm">
            <h3 class="font-semibold text-gray-900 mb-2">Diversifiez votre portefeuille</h3>
            <p class="text-sm text-gray-600">Investissez dans différents secteurs pour réduire les risques.</p>
          </div>
          <div class="bg-white p-4 rounded-xl shadow-sm">
            <h3 class="font-semibold text-gray-900 mb-2">Investissement à long terme</h3>
            <p class="text-sm text-gray-600">Les meilleures performances se réalisent sur du long terme.</p>
          </div>
          <div class="bg-white p-4 rounded-xl shadow-sm">
            <h3 class="font-semibold text-gray-900 mb-2">Suivez vos investissements</h3>
            <p class="text-sm text-gray-600">Consultez régulièrement l'évolution de vos projets.</p>
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
import { useInvestmentData } from '~/composables/useInvestmentData'

useSeoMeta({
  title: 'Dashboard - InvestFuture',
  description: 'Gérez vos investissements sur InvestFuture'
})

const authStore = useAuthStore()
const userInvestments = useUserInvestmentsStore()
const { getSectors } = useInvestmentData()

const isNewUser = ref(false)
const user = computed(() => authStore.user)

const portfolioStats = computed(() => ({
  totalInvested: userInvestments.totalAmount,
  totalGains: userInvestments.totalGains,
  avgRoi: userInvestments.avgRoi,
  count: userInvestments.count
}))

const recentInvestments = computed(() => {
  return userInvestments.investments
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 3)
})

const recommendedOpportunities = computed(() => {
  const allSectors = getSectors()
  const opportunities = []

  // Sélectionner les meilleures opportunités
  allSectors.slice(0, 3).forEach(sector => {
    if (sector.projects && sector.projects.length > 0) {
      const project = sector.projects[0]
      opportunities.push({
        id: project.id,
        name: project.name,
        description: project.description.substring(0, 80) + '...',
        sector: sector.name,
        roi: project.roi,
        minInvest: project.minInvest,
        investors: project.investors
      })
    }
  })

  return opportunities
})

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0
  }).format(amount)
}

const openInvestmentModal = (opportunity) => {
  console.log('Ouvrir modal d\'investissement pour:', opportunity.name);
}

onMounted(() => {
  if (!authStore.isAuthenticated) {
    navigateTo('/auth/login')
  }

  userInvestments.loadFromStorage()

  // Vérifier si c'est un nouvel utilisateur
  const urlParams = new URLSearchParams(window.location.search)
  if (urlParams.get('new') === 'true') {
    isNewUser.value = true
    // Retirer le paramètre de l'URL
    window.history.replaceState({}, '', window.location.pathname)
  }
})
</script>
