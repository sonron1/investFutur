<template>
  <div class="min-h-screen bg-slate-50 flex flex-col">
    <Navbar />

    <div class="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Header -->
      <div class="mb-8">
        <div class="flex flex-col md:flex-row md:items-center justify-between mb-6">
          <div>
            <h1 class="text-2xl font-bold text-slate-900 mb-1">{{ $t('investments.title') }}</h1>
            <p class="text-slate-500 text-sm">{{ $t('investments.subtitle') }} ({{ investments.length }})</p>
          </div>
          <NuxtLink to="/#domaines" class="btn-primary mt-4 md:mt-0 inline-flex items-center">
            <i class="fas fa-plus mr-2"></i>
            {{ $t('investments.newProject') }}
          </NuxtLink>
        </div>

        <!-- Stats (only when investments exist) -->
        <div v-if="investments.length > 0 && !isLoading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
          <div class="bg-white border border-slate-100 rounded-2xl shadow-sm p-5">
            <div class="flex items-center justify-between">
              <div>
                <div class="text-xl font-bold text-slate-900 mb-0.5">{{ formatCurrency(portfolioStats.totalInvested) }}</div>
                <div class="text-slate-500 text-xs">{{ $t('investments.totalInvested') }}</div>
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
                <div class="text-slate-500 text-xs">{{ $t('investments.avgPerformance') }}</div>
              </div>
              <div class="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center">
                <i class="fas fa-chart-line text-emerald-600"></i>
              </div>
            </div>
          </div>

          <div class="bg-white border border-slate-100 rounded-2xl shadow-sm p-5">
            <div class="flex items-center justify-between">
              <div>
                <div class="text-xl font-bold text-slate-900 mb-0.5">{{ portfolioStats.activeCount }}</div>
                <div class="text-slate-500 text-xs">{{ $t('investments.activeProjects') }}</div>
              </div>
              <div class="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center">
                <i class="fas fa-chart-pie text-indigo-600"></i>
              </div>
            </div>
          </div>

          <div class="bg-white border border-slate-100 rounded-2xl shadow-sm p-5">
            <div class="flex items-center justify-between">
              <div>
                <div class="text-xl font-bold text-slate-900 mb-0.5">{{ formatCurrency(portfolioStats.estimatedGains) }}</div>
                <div class="text-slate-500 text-xs">{{ $t('investments.estimatedGains') }}</div>
              </div>
              <div class="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center">
                <i class="fas fa-calendar text-amber-600"></i>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Filters -->
      <div v-if="investments.length > 0 && !isLoading" class="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 mb-6">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-3">
          <select v-model="filters.status" class="w-full px-3 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all bg-white text-slate-900 text-sm">
            <option value="">{{ $t('investments.allStatuses') }}</option>
            <option value="ACTIVE">{{ $t('investments.active') }}</option>
            <option value="COMPLETED">{{ $t('investments.completed') }}</option>
            <option value="PENDING">{{ $t('investments.pending') }}</option>
            <option value="CANCELLED">{{ $t('investments.cancelled') }}</option>
          </select>

          <select v-model="filters.sort" class="w-full px-3 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all bg-white text-slate-900 text-sm">
            <option value="date-desc">{{ $t('investments.sortRecent') }}</option>
            <option value="date-asc">{{ $t('investments.sortOldest') }}</option>
            <option value="amount-desc">{{ $t('investments.sortAmountDesc') }}</option>
            <option value="amount-asc">{{ $t('investments.sortAmountAsc') }}</option>
            <option value="roi-desc">{{ $t('investments.sortRoi') }}</option>
          </select>

          <div class="relative md:col-span-2">
            <input
              v-model="filters.search"
              type="text"
              class="w-full pl-9 pr-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all bg-white text-slate-900 placeholder-slate-400 text-sm"
              :placeholder="$t('investments.searchPlaceholder')"
            >
            <i class="fas fa-search absolute left-3 top-3 text-slate-400 text-sm"></i>
          </div>
        </div>
      </div>

      <!-- Loading skeleton -->
      <div v-if="isLoading" class="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div v-for="i in 4" :key="i" class="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 animate-pulse">
          <div class="flex items-center mb-4">
            <div class="w-9 h-9 bg-slate-200 rounded-lg mr-3"></div>
            <div>
              <div class="h-4 bg-slate-200 rounded w-36 mb-2"></div>
              <div class="h-3 bg-slate-200 rounded w-20"></div>
            </div>
          </div>
          <div class="grid grid-cols-2 gap-3">
            <div class="h-16 bg-slate-100 rounded-lg"></div>
            <div class="h-16 bg-slate-100 rounded-lg"></div>
          </div>
        </div>
      </div>

      <!-- Investment list -->
      <div v-else class="bg-white rounded-2xl border border-slate-100 shadow-sm">
        <!-- Empty state -->
        <div v-if="filteredInvestments.length === 0" class="text-center py-16">
          <div class="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-5">
            <i class="fas fa-chart-pie text-2xl text-slate-400"></i>
          </div>
          <h3 class="text-lg font-bold text-slate-900 mb-2">{{ $t('investments.noInvestments') }}</h3>
          <p class="text-slate-500 text-sm mb-6">{{ $t('investments.noInvestmentsDesc') }}</p>
          <NuxtLink to="/#domaines" class="btn-primary inline-flex items-center">
            {{ $t('investments.discover') }}
          </NuxtLink>
        </div>

        <!-- Grid -->
        <div v-else class="grid grid-cols-1 lg:grid-cols-2 gap-5 p-5">
          <div
            v-for="inv in filteredInvestments"
            :key="inv.id"
            class="border border-slate-100 rounded-xl hover:shadow-md hover:border-slate-200 transition-all duration-200 overflow-hidden"
          >
            <div class="p-5">
              <!-- Header -->
              <div class="flex justify-between items-start mb-4">
                <div class="flex items-center">
                  <div class="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                    <i class="fas fa-chart-line text-blue-600 text-sm"></i>
                  </div>
                  <div>
                    <div class="font-semibold text-slate-900 text-sm">{{ inv.projectName }}</div>
                    <div class="text-xs text-slate-500 mt-0.5">{{ inv.currency || 'EUR' }} · {{ inv.paymentMethod }}</div>
                  </div>
                </div>
                <span :class="getStatusBadgeClass(inv.status)" class="text-xs font-semibold px-2.5 py-1 rounded-full">
                  {{ getStatusLabel(inv.status) }}
                </span>
              </div>

              <!-- Metrics -->
              <div class="grid grid-cols-2 gap-3 mb-4">
                <div class="text-center bg-slate-50 rounded-lg p-3">
                  <div class="font-bold text-blue-600 text-sm">{{ formatCurrency(inv.amount) }}</div>
                  <div class="text-slate-500 text-xs mt-0.5">{{ $t('investments.myInvestment') }}</div>
                </div>
                <div class="text-center bg-slate-50 rounded-lg p-3">
                  <div class="font-bold text-emerald-600 text-sm">+{{ inv.expectedRoi }}%</div>
                  <div class="text-slate-500 text-xs mt-0.5">{{ $t('investments.performance') }}</div>
                </div>
              </div>

              <!-- Estimated gains -->
              <div class="bg-amber-50 rounded-lg p-3 mb-4">
                <div class="flex items-center justify-between">
                  <span class="text-xs text-amber-700">{{ $t('investments.estimatedGains') }}</span>
                  <span class="font-bold text-amber-700 text-sm">{{ formatCurrency(calculateGains(inv)) }}</span>
                </div>
              </div>

              <!-- Maturity -->
              <div v-if="inv.maturityDate" class="flex items-center text-xs text-slate-500 mb-4">
                <i class="fas fa-calendar-alt mr-1.5 text-slate-400"></i>
                Échéance : {{ formatDate(inv.maturityDate) }}
              </div>

              <!-- Actions -->
              <div class="flex justify-between items-center">
                <span class="text-xs text-slate-400">{{ formatDate(inv.createdAt) }}</span>
                <div class="flex space-x-2">
                  <button
                    @click="selectedInvestment = inv"
                    class="px-3 py-1.5 text-blue-600 border border-blue-200 rounded-lg text-xs font-medium hover:bg-blue-50 transition-colors"
                  >
                    {{ $t('investments.details') }}
                  </button>
                  <button
                    v-if="inv.status === 'PENDING' || inv.status === 'ACTIVE'"
                    @click="cancelInvestment(inv.id)"
                    class="px-3 py-1.5 text-red-500 border border-red-200 rounded-lg text-xs hover:bg-red-50 transition-colors"
                  >
                    {{ $t('investments.cancel') }}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Details modal -->
      <div
        v-if="selectedInvestment"
        class="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        @click.self="selectedInvestment = null"
      >
        <div class="bg-white rounded-2xl max-w-lg w-full shadow-xl">
          <div class="p-6">
            <div class="flex justify-between items-start mb-5">
              <div>
                <h2 class="text-lg font-bold text-slate-900">{{ selectedInvestment.projectName }}</h2>
                <span :class="getStatusBadgeClass(selectedInvestment.status)" class="text-xs font-semibold px-2.5 py-1 rounded-full mt-1 inline-block">
                  {{ getStatusLabel(selectedInvestment.status) }}
                </span>
              </div>
              <button @click="selectedInvestment = null" class="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors">
                <i class="fas fa-times"></i>
              </button>
            </div>

            <div class="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
              <div class="text-center p-3.5 bg-slate-50 rounded-xl border border-slate-100">
                <div class="text-base font-bold text-blue-600">{{ formatCurrency(selectedInvestment.amount) }}</div>
                <div class="text-xs text-slate-500 mt-0.5">{{ $t('investments.myInvestment') }}</div>
              </div>
              <div class="text-center p-3.5 bg-slate-50 rounded-xl border border-slate-100">
                <div class="text-base font-bold text-emerald-600">+{{ selectedInvestment.expectedRoi }}%</div>
                <div class="text-xs text-slate-500 mt-0.5">ROI</div>
              </div>
              <div class="text-center p-3.5 bg-slate-50 rounded-xl border border-slate-100">
                <div class="text-base font-bold text-indigo-600">{{ selectedInvestment.durationMonths }}m</div>
                <div class="text-xs text-slate-500 mt-0.5">Durée</div>
              </div>
              <div class="text-center p-3.5 bg-slate-50 rounded-xl border border-slate-100">
                <div class="text-base font-bold text-amber-600">{{ formatCurrency(calculateGains(selectedInvestment)) }}</div>
                <div class="text-xs text-slate-500 mt-0.5">{{ $t('investments.estimatedGains') }}</div>
              </div>
            </div>

            <div class="space-y-2 text-sm text-slate-600 mb-5">
              <div class="flex justify-between py-2 border-b border-slate-100">
                <span>Méthode de paiement</span>
                <span class="font-medium text-slate-900">{{ selectedInvestment.paymentMethod }}</span>
              </div>
              <div class="flex justify-between py-2 border-b border-slate-100">
                <span>Devise</span>
                <span class="font-medium text-slate-900">{{ selectedInvestment.currency }}</span>
              </div>
              <div class="flex justify-between py-2 border-b border-slate-100">
                <span>Date de création</span>
                <span class="font-medium text-slate-900">{{ formatDate(selectedInvestment.createdAt) }}</span>
              </div>
              <div v-if="selectedInvestment.maturityDate" class="flex justify-between py-2">
                <span>Date d'échéance</span>
                <span class="font-medium text-slate-900">{{ formatDate(selectedInvestment.maturityDate) }}</span>
              </div>
            </div>

            <div class="flex justify-end">
              <button @click="selectedInvestment = null" class="px-4 py-2 text-slate-600 border border-slate-200 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors">
                {{ $t('investments.close') }}
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
import { useAuthStore } from '~/stores/auth'
import { useInvestmentStore } from '~/stores/user-investments'

const { t } = useI18n()

useSeoMeta({
  title: computed(() => `${t('investments.title')} — InvestFutur`),
})

const authStore = useAuthStore()
const investmentStore = useInvestmentStore()
const selectedInvestment = ref(null)
const isLoading = ref(true)

const filters = ref({
  status: '',
  sort: 'date-desc',
  search: '',
})

const investments = computed(() => investmentStore.investments)

const portfolioStats = computed(() => {
  const list = investments.value
  const totalInvested = list.filter(i => i.status === 'ACTIVE' || i.status === 'COMPLETED').reduce((s, i) => s + i.amount, 0)
  const avgRoi = list.length ? list.reduce((s, i) => s + i.expectedRoi, 0) / list.length : 0
  const activeCount = list.filter(i => i.status === 'ACTIVE').length
  const estimatedGains = list.filter(i => i.status === 'ACTIVE' || i.status === 'COMPLETED').reduce((s, i) => s + calculateGains(i), 0)
  return { totalInvested, avgRoi, activeCount, estimatedGains }
})

const filteredInvestments = computed(() => {
  let result = [...investments.value]

  if (filters.value.status) {
    result = result.filter(i => i.status === filters.value.status)
  }

  if (filters.value.search) {
    const q = filters.value.search.toLowerCase()
    result = result.filter(i => i.projectName.toLowerCase().includes(q))
  }

  switch (filters.value.sort) {
    case 'date-desc': result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); break
    case 'date-asc':  result.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt)); break
    case 'amount-desc': result.sort((a, b) => b.amount - a.amount); break
    case 'amount-asc':  result.sort((a, b) => a.amount - b.amount); break
    case 'roi-desc':  result.sort((a, b) => b.expectedRoi - a.expectedRoi); break
  }

  return result
})

const formatCurrency = (amount) =>
  new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(amount ?? 0)

const formatDate = (d) =>
  new Date(d).toLocaleDateString('fr-FR', { year: 'numeric', month: 'short', day: 'numeric' })

const calculateGains = (inv) => (inv.amount * inv.expectedRoi) / 100

const getStatusBadgeClass = (status) => {
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

const cancelInvestment = async (id) => {
  if (!confirm(t('investments.confirmCancel'))) return
  const { success, error } = await investmentStore.cancelInvestment(id)
  if (!success) alert(error)
}

onMounted(async () => {
  if (!authStore.isAuthenticated) {
    return navigateTo('/auth/login')
  }
  try {
    await investmentStore.fetchInvestments()
  } finally {
    isLoading.value = false
  }
})
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
