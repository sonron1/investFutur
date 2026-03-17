<template>
  <div class="min-h-screen bg-slate-50 flex flex-col">
    <Navbar />

    <div class="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- New user welcome banner -->
      <div v-if="isNewUser" class="mb-8 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl p-6">
        <div class="flex items-center">
          <div class="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center mr-5 flex-shrink-0">
            <i class="fas fa-rocket text-xl text-white"></i>
          </div>
          <div>
            <h2 class="text-xl font-bold mb-1">{{ $t('dashboard.newUserTitle') }}</h2>
            <p class="text-blue-100 text-sm">{{ $t('dashboard.newUserDesc') }}</p>
          </div>
        </div>
      </div>

      <!-- Header -->
      <div class="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <div>
          <h1 class="text-2xl font-bold text-slate-900 mb-1">{{ $t('dashboard.title') }}</h1>
          <p class="text-slate-500 text-sm">{{ $t('dashboard.welcome', { name: authStore.fullName || $t('nav.portfolio') }) }}</p>
        </div>
        <NuxtLink to="/#domaines" class="btn-primary mt-4 md:mt-0 inline-flex items-center">
          <i class="fas fa-plus mr-2"></i>
          {{ $t('dashboard.discover') }}
        </NuxtLink>
      </div>

      <!-- Loading state -->
      <div v-if="isLoading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        <div v-for="i in 4" :key="i" class="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm animate-pulse">
          <div class="flex items-center">
            <div class="w-10 h-10 bg-slate-100 rounded-xl mr-4"></div>
            <div class="flex-1">
              <div class="h-5 bg-slate-100 rounded w-24 mb-2"></div>
              <div class="h-3 bg-slate-100 rounded w-16"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Stats cards -->
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        <div class="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
          <div class="flex items-center">
            <div class="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
              <i class="fas fa-wallet text-blue-600"></i>
            </div>
            <div>
              <div class="text-xl font-bold text-slate-900">{{ formatCurrency(stats.totalInvested) }}</div>
              <div class="text-slate-500 text-xs mt-0.5">{{ $t('dashboard.totalInvested') }}</div>
            </div>
          </div>
        </div>

        <div class="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
          <div class="flex items-center">
            <div class="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
              <i class="fas fa-chart-line text-emerald-600"></i>
            </div>
            <div>
              <div class="text-xl font-bold text-slate-900">+{{ stats.avgRoi.toFixed(1) }}%</div>
              <div class="text-slate-500 text-xs mt-0.5">{{ $t('dashboard.avgRoi') }}</div>
            </div>
          </div>
        </div>

        <div class="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
          <div class="flex items-center">
            <div class="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
              <i class="fas fa-chart-pie text-indigo-600"></i>
            </div>
            <div>
              <div class="text-xl font-bold text-slate-900">{{ stats.activeCount }}</div>
              <div class="text-slate-500 text-xs mt-0.5">{{ $t('dashboard.activeInvestments') }}</div>
            </div>
          </div>
        </div>

        <div class="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
          <div class="flex items-center">
            <div class="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
              <i class="fas fa-euro-sign text-amber-600"></i>
            </div>
            <div>
              <div class="text-xl font-bold text-slate-900">{{ formatCurrency(stats.estimatedGains) }}</div>
              <div class="text-slate-500 text-xs mt-0.5">{{ $t('dashboard.estimatedGains') }}</div>
            </div>
          </div>
        </div>
      </div>

      <div class="grid lg:grid-cols-2 gap-6">
        <!-- Recent investments -->
        <div class="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
          <div class="flex items-center justify-between mb-5">
            <h2 class="text-base font-bold text-slate-900">{{ $t('dashboard.recentInvestments') }}</h2>
            <NuxtLink to="/investments" class="text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors">
              {{ $t('dashboard.viewAll') }}
            </NuxtLink>
          </div>

          <div v-if="isLoading" class="space-y-3">
            <div v-for="i in 3" :key="i" class="flex items-center p-3.5 bg-slate-50 rounded-xl animate-pulse">
              <div class="w-10 h-10 bg-slate-200 rounded-lg mr-3.5"></div>
              <div class="flex-1">
                <div class="h-4 bg-slate-200 rounded w-32 mb-2"></div>
                <div class="h-3 bg-slate-200 rounded w-20"></div>
              </div>
            </div>
          </div>

          <div v-else-if="recentInvestments.length === 0" class="text-center py-10">
            <div class="w-14 h-14 bg-slate-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <i class="fas fa-chart-pie text-slate-400 text-xl"></i>
            </div>
            <p class="text-slate-500 text-sm mb-4">{{ $t('dashboard.noInvestments') }}</p>
            <NuxtLink to="/#domaines" class="btn-primary inline-flex items-center text-sm">
              {{ $t('dashboard.startInvesting') }}
            </NuxtLink>
          </div>

          <div v-else class="space-y-3">
            <div
              v-for="inv in recentInvestments"
              :key="inv.id"
              class="flex items-center p-3.5 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors"
            >
              <div class="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center mr-3.5 flex-shrink-0">
                <i class="fas fa-chart-line text-blue-600 text-sm"></i>
              </div>
              <div class="flex-1 min-w-0">
                <div class="font-semibold text-slate-900 text-sm truncate">{{ inv.projectName }}</div>
                <div class="text-xs text-slate-500 mt-0.5">
                  <span :class="getStatusClass(inv.status)" class="inline-flex items-center px-1.5 py-0.5 rounded-md text-xs font-medium">
                    {{ getStatusLabel(inv.status) }}
                  </span>
                </div>
              </div>
              <div class="text-right ml-3 flex-shrink-0">
                <div class="font-semibold text-slate-900 text-sm">{{ formatCurrency(inv.amount) }}</div>
                <div class="text-xs text-emerald-600 font-medium mt-0.5">+{{ inv.expectedRoi }}%</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Recommended opportunities -->
        <div class="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
          <div class="flex items-center justify-between mb-5">
            <h2 class="text-base font-bold text-slate-900">{{ $t('dashboard.recommended') }}</h2>
            <NuxtLink to="/#domaines" class="text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors">
              {{ $t('dashboard.viewAll') }}
            </NuxtLink>
          </div>

          <div class="space-y-3">
            <div
              v-for="opp in recommendedOpportunities"
              :key="opp.id"
              class="border border-slate-100 rounded-xl p-4 hover:border-blue-300 hover:shadow-sm transition-all cursor-pointer"
            >
              <div class="flex items-start justify-between mb-2">
                <div>
                  <div class="font-semibold text-slate-900 text-sm">{{ opp.name }}</div>
                  <span class="inline-block text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded-md mt-1 font-medium">{{ opp.sector }}</span>
                </div>
                <span class="text-base font-bold text-emerald-600">{{ opp.roi }}%</span>
              </div>
              <p class="text-xs text-slate-500 mb-3 leading-relaxed">{{ opp.description }}</p>
              <div class="flex justify-between items-center">
                <span class="text-xs text-slate-400">{{ $t('common.min') }} {{ formatCurrency(opp.minInvest) }}</span>
                <span class="text-xs text-slate-400">{{ opp.investors }} {{ $t('common.investors') }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Investment tips -->
      <div class="mt-6 bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
        <div class="flex items-center justify-between mb-5">
          <div>
            <div class="text-blue-600 text-xs font-semibold uppercase tracking-wider mb-1">{{ $t('dashboard.resources') }}</div>
            <h2 class="text-base font-bold text-slate-900">{{ $t('dashboard.tips') }}</h2>
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
            <h3 class="font-semibold text-slate-900 text-sm mb-1.5">{{ $t('dashboard.tip1Title') }}</h3>
            <p class="text-xs text-slate-500 leading-relaxed">{{ $t('dashboard.tip1Desc') }}</p>
          </div>
          <div class="bg-slate-50 p-4 rounded-xl border border-slate-100">
            <div class="w-8 h-8 bg-indigo-50 rounded-lg flex items-center justify-center mb-3">
              <i class="fas fa-clock text-indigo-600 text-sm"></i>
            </div>
            <h3 class="font-semibold text-slate-900 text-sm mb-1.5">{{ $t('dashboard.tip2Title') }}</h3>
            <p class="text-xs text-slate-500 leading-relaxed">{{ $t('dashboard.tip2Desc') }}</p>
          </div>
          <div class="bg-slate-50 p-4 rounded-xl border border-slate-100">
            <div class="w-8 h-8 bg-emerald-50 rounded-lg flex items-center justify-center mb-3">
              <i class="fas fa-eye text-emerald-600 text-sm"></i>
            </div>
            <h3 class="font-semibold text-slate-900 text-sm mb-1.5">{{ $t('dashboard.tip3Title') }}</h3>
            <p class="text-xs text-slate-500 leading-relaxed">{{ $t('dashboard.tip3Desc') }}</p>
          </div>
        </div>
      </div>
    </div>

    <Footer />
  </div>
</template>

<script setup>
import { useAuthStore } from '~/stores/auth'
import { useInvestmentStore } from '~/stores/user-investments'
import { useInvestmentData } from '~/composables/useInvestmentData'

const { t } = useI18n()

useSeoMeta({
  title: computed(() => `${t('dashboard.title')} — InvestFutur`),
  description: 'Gérez vos investissements sur InvestFutur',
})

const authStore = useAuthStore()
const investmentStore = useInvestmentStore()
const { getSectors } = useInvestmentData()

const isNewUser = ref(false)
const isLoading = ref(true)
const stats = ref({
  totalInvested: 0,
  activeCount: 0,
  pendingCount: 0,
  avgRoi: 0,
  estimatedGains: 0,
})

const recentInvestments = computed(() =>
  [...investmentStore.investments]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 3)
)

const recommendedOpportunities = computed(() => {
  const allSectors = getSectors()
  const opps = []
  allSectors.slice(0, 3).forEach((sector) => {
    if (sector.projects?.length > 0) {
      const project = sector.projects[0]
      opps.push({
        id: project.id,
        name: project.name,
        description: project.description.substring(0, 80) + '...',
        sector: sector.name,
        roi: project.roi,
        minInvest: project.minInvest,
        investors: project.investors,
      })
    }
  })
  return opps
})

const formatCurrency = (amount) =>
  new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', minimumFractionDigits: 0 }).format(amount ?? 0)

const getStatusClass = (status) => {
  const map = {
    ACTIVE: 'bg-emerald-100 text-emerald-700',
    COMPLETED: 'bg-blue-100 text-blue-700',
    PENDING: 'bg-amber-100 text-amber-700',
    CANCELLED: 'bg-red-100 text-red-700',
  }
  return map[status] ?? 'bg-slate-100 text-slate-600'
}

const getStatusLabel = (status) => {
  const map = {
    ACTIVE: t('investments.active'),
    COMPLETED: t('investments.completed'),
    PENDING: t('investments.pending'),
    CANCELLED: t('investments.cancelled'),
  }
  return map[status] ?? status
}

onMounted(async () => {
  if (!authStore.isAuthenticated) {
    return navigateTo('/auth/login')
  }

  const urlParams = new URLSearchParams(window.location.search)
  if (urlParams.get('new') === 'true') {
    isNewUser.value = true
    window.history.replaceState({}, '', window.location.pathname)
  }

  try {
    const [statsRes] = await Promise.all([
      $fetch('/api/dashboard/stats', { headers: authStore.getAuthHeaders() }),
      investmentStore.fetchInvestments(),
    ])
    stats.value = statsRes.data
  } catch (err) {
    console.error('Dashboard load error:', err)
  } finally {
    isLoading.value = false
  }
})
</script>
