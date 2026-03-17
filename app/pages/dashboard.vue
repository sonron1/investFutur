<template>
  <div class="min-h-screen bg-slate-50 flex flex-col">
    <Navbar />

    <div class="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Message de bienvenue après inscription -->
      <div v-if="isNewUser" class="mb-8 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl p-6" >
        <div class="flex items-center">
          <div class="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center mr-5 flex-shrink-0">
            <i class="fas fa-rocket text-xl text-white"></i>
          </div>
          <div>
            <h2 class="text-xl font-bold mb-1">Bienvenue sur InvestFuture !</h2>
            <p class="text-blue-100 text-sm">Votre compte a été créé avec succès. Explorez nos opportunités d'investissement dès maintenant.</p>
          </div>
        </div>
      </div>

      <!-- En-tête du dashboard -->
      <div class="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <div>
          <h1 class="text-2xl font-bold text-slate-900 mb-1">Tableau de bord</h1>
          <p class="text-slate-500 text-sm">Bienvenue, {{ user?.name || 'Investisseur' }}</p>
        </div>
        <NuxtLink to="/#domaines" class="btn-primary mt-4 md:mt-0 inline-flex items-center">
          <i class="fas fa-plus mr-2"></i>
          Découvrir les opportunités
        </NuxtLink>
      </div>

      <!-- Statistiques rapides -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        <div class="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm"  >
          <div class="flex items-center">
            <div class="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
              <i class="fas fa-wallet text-blue-600"></i>
            </div>
            <div>
              <div class="text-xl font-bold text-slate-900">{{ formatCurrency(portfolioStats.totalInvested) }}</div>
              <div class="text-slate-500 text-xs mt-0.5">Total investi</div>
            </div>
          </div>
        </div>

        <div class="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm"  >
          <div class="flex items-center">
            <div class="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
              <i class="fas fa-chart-line text-emerald-600"></i>
            </div>
            <div>
              <div class="text-xl font-bold text-slate-900">+{{ portfolioStats.avgRoi.toFixed(1) }}%</div>
              <div class="text-slate-500 text-xs mt-0.5">ROI moyen</div>
            </div>
          </div>
        </div>

        <div class="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm"  >
          <div class="flex items-center">
            <div class="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
              <i class="fas fa-chart-pie text-indigo-600"></i>
            </div>
            <div>
              <div class="text-xl font-bold text-slate-900">{{ portfolioStats.count }}</div>
              <div class="text-slate-500 text-xs mt-0.5">Investissements</div>
            </div>
          </div>
        </div>

        <div class="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm"  >
          <div class="flex items-center">
            <div class="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
              <i class="fas fa-euro-sign text-amber-600"></i>
            </div>
            <div>
              <div class="text-xl font-bold text-slate-900">{{ formatCurrency(portfolioStats.totalGains) }}</div>
              <div class="text-slate-500 text-xs mt-0.5">Gains potentiels</div>
            </div>
          </div>
        </div>
      </div>

      <div class="grid lg:grid-cols-2 gap-6">
        <!-- Mes derniers investissements -->
        <div class="bg-white rounded-2xl border border-slate-100 shadow-sm p-6" >
          <div class="flex items-center justify-between mb-5">
            <h2 class="text-base font-bold text-slate-900">Mes derniers investissements</h2>
            <NuxtLink to="/investments" class="text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors">
              Voir tout
            </NuxtLink>
          </div>

          <div v-if="recentInvestments.length === 0" class="text-center py-10">
            <div class="w-14 h-14 bg-slate-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <i class="fas fa-chart-pie text-slate-400 text-xl"></i>
            </div>
            <p class="text-slate-500 text-sm mb-4">Aucun investissement pour le moment</p>
            <NuxtLink to="/#domaines" class="btn-primary inline-flex items-center text-sm">
              Commencer à investir
            </NuxtLink>
          </div>

          <div v-else class="space-y-3">
            <div
                v-for="investment in recentInvestments"
                :key="investment.id"
                class="flex items-center p-3.5 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors"
            >
              <div class="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center mr-3.5 flex-shrink-0">
                <i class="fas fa-chart-line text-blue-600 text-sm"></i>
              </div>
              <div class="flex-1 min-w-0">
                <div class="font-semibold text-slate-900 text-sm truncate">{{ investment.project }}</div>
                <div class="text-xs text-slate-500 mt-0.5">{{ investment.sector }}</div>
              </div>
              <div class="text-right ml-3 flex-shrink-0">
                <div class="font-semibold text-slate-900 text-sm">{{ formatCurrency(investment.amount) }}</div>
                <div class="text-xs text-emerald-600 font-medium mt-0.5">+{{ investment.roi }}%</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Opportunités recommandées -->
        <div class="bg-white rounded-2xl border border-slate-100 shadow-sm p-6" >
          <div class="flex items-center justify-between mb-5">
            <h2 class="text-base font-bold text-slate-900">Recommandé pour vous</h2>
            <NuxtLink to="/#domaines" class="text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors">
              Voir tout
            </NuxtLink>
          </div>

          <div class="space-y-3">
            <div
                v-for="opportunity in recommendedOpportunities"
                :key="opportunity.id"
                class="border border-slate-100 rounded-xl p-4 hover:border-blue-300 hover:shadow-sm transition-all cursor-pointer"
                @click="openInvestmentModal(opportunity)"
            >
              <div class="flex items-start justify-between mb-2">
                <div>
                  <div class="font-semibold text-slate-900 text-sm">{{ opportunity.name }}</div>
                  <span class="inline-block text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded-md mt-1 font-medium">{{ opportunity.sector }}</span>
                </div>
                <span class="text-base font-bold text-emerald-600">{{ opportunity.roi }}%</span>
              </div>
              <p class="text-xs text-slate-500 mb-3 leading-relaxed">{{ opportunity.description }}</p>
              <div class="flex justify-between items-center">
                <span class="text-xs text-slate-400">Min. {{ formatCurrency(opportunity.minInvest) }}</span>
                <span class="text-xs text-slate-400">{{ opportunity.investors }} investisseurs</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Section actualités et conseils -->
      <div class="mt-6 bg-white rounded-2xl border border-slate-100 shadow-sm p-6" >
        <div class="flex items-center justify-between mb-5">
          <div>
            <div class="text-blue-600 text-xs font-semibold uppercase tracking-wider mb-1">Ressources</div>
            <h2 class="text-base font-bold text-slate-900">Conseils d'investissement</h2>
          </div>
          <div class="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center">
            <i class="fas fa-lightbulb text-amber-500"></i>
          </div>
        </div>

        <div class="grid md:grid-cols-3 gap-4">
          <div class="bg-slate-50 p-4 rounded-xl border border-slate-100">
            <div class="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center mb-3">
              <i class="fas fa-layer-group text-blue-600 text-sm"></i>
            </div>
            <h3 class="font-semibold text-slate-900 text-sm mb-1.5">Diversifiez votre portefeuille</h3>
            <p class="text-xs text-slate-500 leading-relaxed">Investissez dans différents secteurs pour réduire les risques.</p>
          </div>
          <div class="bg-slate-50 p-4 rounded-xl border border-slate-100">
            <div class="w-8 h-8 bg-indigo-50 rounded-lg flex items-center justify-center mb-3">
              <i class="fas fa-clock text-indigo-600 text-sm"></i>
            </div>
            <h3 class="font-semibold text-slate-900 text-sm mb-1.5">Investissement à long terme</h3>
            <p class="text-xs text-slate-500 leading-relaxed">Les meilleures performances se réalisent sur du long terme.</p>
          </div>
          <div class="bg-slate-50 p-4 rounded-xl border border-slate-100">
            <div class="w-8 h-8 bg-emerald-50 rounded-lg flex items-center justify-center mb-3">
              <i class="fas fa-eye text-emerald-600 text-sm"></i>
            </div>
            <h3 class="font-semibold text-slate-900 text-sm mb-1.5">Suivez vos investissements</h3>
            <p class="text-xs text-slate-500 leading-relaxed">Consultez régulièrement l'évolution de vos projets.</p>
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
import { useInvestmentData } from '~/composables/useInvestmentData'

useSeoMeta({
  title: 'Dashboard - InvestFuture',
  description: 'Gérez vos investissements sur InvestFuture'
})

const authStore = useAuthStore()
const userInvestments = useInvestmentStore()
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
