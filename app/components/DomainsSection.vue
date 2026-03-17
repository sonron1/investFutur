<template>
  <section id="domaines" class="py-20 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="text-center mb-12" data-reveal>
        <div class="section-tag">
          <i class="fas fa-industry"></i>
          {{ $t('domains.tag') }}
        </div>
        <h2 class="section-title mb-4">
          {{ $t('domains.title') }}
        </h2>
        <p class="section-sub">
          {{ $t('domains.subtitle') }}
        </p>
      </div>

      <!-- Filters -->
      <div class="mb-10" data-reveal data-reveal-delay="100">
        <div class="bg-slate-50 rounded-2xl border border-slate-100 p-5">
          <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            <div>
              <label class="block text-xs font-semibold text-slate-600 mb-1.5">{{ $t('domains.filterSector') }}</label>
              <select v-model="selectedSectorFilter" class="w-full px-3 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all bg-white text-slate-900 text-sm">
                <option value="">{{ $t('domains.allSectors') }}</option>
                <option value="ia-deeptech">IA &amp; Deep-Tech</option>
                <option value="energies-renouvelables">Énergies Renouvelables</option>
                <option value="biotechnologies">Biotechnologies</option>
                <option value="fintech">Fintech</option>
                <option value="mobilite-durable">Mobilité Durable</option>
                <option value="agritech">AgriTech</option>
                <option value="economie-circulaire">Économie Circulaire</option>
                <option value="sante-digitale">Santé Digitale</option>
                <option value="edtech">EdTech</option>
                <option value="spatial">Espace &amp; Satellites</option>
              </select>
            </div>

            <div>
              <label class="block text-xs font-semibold text-slate-600 mb-1.5">{{ $t('domains.filterMin') }}</label>
              <select v-model="selectedInvestment" class="w-full px-3 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all bg-white text-slate-900 text-sm">
                <option value="">{{ $t('domains.allAmounts') }}</option>
                <option value="0-50">{{ $t('domains.range1') }}</option>
                <option value="50-100">{{ $t('domains.range2') }}</option>
                <option value="100-500">{{ $t('domains.range3') }}</option>
                <option value="500+">{{ $t('domains.range4') }}</option>
              </select>
            </div>

            <div>
              <label class="block text-xs font-semibold text-slate-600 mb-1.5">{{ $t('domains.filterRoi') }}</label>
              <select v-model="selectedRoi" class="w-full px-3 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all bg-white text-slate-900 text-sm">
                <option value="">{{ $t('domains.allRoi') }}</option>
                <option value="15">{{ $t('domains.roiMin1') }}</option>
                <option value="20">{{ $t('domains.roiMin2') }}</option>
                <option value="25">{{ $t('domains.roiMin3') }}</option>
                <option value="30">{{ $t('domains.roiMin4') }}</option>
              </select>
            </div>

            <div>
              <label class="block text-xs font-semibold text-slate-600 mb-1.5">{{ $t('domains.search') }}</label>
              <div class="relative">
                <input
                  v-model="searchQuery"
                  type="text"
                  class="w-full pl-9 pr-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all bg-white text-slate-900 placeholder-slate-400 text-sm"
                  :placeholder="$t('domains.searchPlaceholder')"
                >
                <i class="fas fa-search absolute left-3 top-3 text-slate-400 text-sm"></i>
              </div>
            </div>
          </div>

          <div class="flex justify-between items-center pt-3 border-t border-slate-100">
            <div class="text-xs text-slate-500">
              {{ $t('domains.found_one', filteredSectors.length) }}
            </div>
            <button @click="resetFilters" class="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors">
              {{ $t('domains.reset') }}
            </button>
          </div>
        </div>
      </div>

      <!-- General stats -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-5 mb-12" data-reveal data-reveal-delay="200">
        <div class="text-center bg-slate-50 rounded-2xl border border-slate-100 shadow-sm p-5">
          <div class="text-2xl font-black text-blue-600 mb-1">{{ totalStats.totalProjects }}</div>
          <div class="text-slate-500 text-xs">{{ $t('domains.totalProjects') }}</div>
        </div>
        <div class="text-center bg-slate-50 rounded-2xl border border-slate-100 shadow-sm p-5">
          <div class="text-2xl font-black text-emerald-600 mb-1">{{ totalStats.avgRoi }}%</div>
          <div class="text-slate-500 text-xs">{{ $t('domains.avgRoi') }}</div>
        </div>
        <div class="text-center bg-slate-50 rounded-2xl border border-slate-100 shadow-sm p-5">
          <div class="text-2xl font-black text-indigo-600 mb-1">{{ formatCurrency(totalStats.minInvestment) }}</div>
          <div class="text-slate-500 text-xs">{{ $t('domains.from') }}</div>
        </div>
        <div class="text-center bg-slate-50 rounded-2xl border border-slate-100 shadow-sm p-5">
          <div class="text-2xl font-black text-amber-600 mb-1">{{ totalStats.totalInvestors }}+</div>
          <div class="text-slate-500 text-xs">{{ $t('domains.totalInvestors') }}</div>
        </div>
      </div>

      <!-- Empty state -->
      <div v-if="filteredSectors.length === 0" class="text-center py-12" data-reveal>
        <div class="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-5">
          <i class="fas fa-search text-slate-400 text-xl"></i>
        </div>
        <h3 class="text-lg font-bold text-slate-900 mb-2">{{ $t('domains.noResults') }}</h3>
        <p class="text-slate-500 text-sm mb-5">{{ $t('domains.noResultsDesc') }}</p>
        <button @click="resetFilters" class="btn-primary">
          {{ $t('domains.seeAll') }}
        </button>
      </div>

      <!-- Sectors grid -->
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="(sector, index) in filteredSectors"
          :key="sector.slug"
          data-reveal
          :data-reveal-delay="String((index % 6) * 100)"
          class="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden hover:shadow-md hover:border-slate-200 transition-all duration-300 group cursor-pointer"
          @click="openInvestmentModal(sector)"
        >
          <!-- Sector image placeholder with icon -->
          <div class="relative h-44 overflow-hidden bg-gradient-to-br from-slate-800 to-slate-900">
            <img
              :src="getSectorImage(sector.slug)"
              :alt="sector.name"
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-70"
            >
            <div class="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"></div>

            <!-- ROI badge -->
            <div class="absolute top-3 right-3">
              <div class="bg-white/95 backdrop-blur-sm rounded-lg px-2.5 py-1 shadow-sm">
                <div class="text-xs font-bold text-emerald-600">ROI {{ sector.roi }}</div>
              </div>
            </div>

            <!-- Icon -->
            <div class="absolute top-3 left-3">
              <div class="w-9 h-9 bg-white/95 backdrop-blur-sm rounded-lg flex items-center justify-center shadow-sm">
                <i :class="`${getSectorIcon(sector.slug)} text-blue-600`"></i>
              </div>
            </div>

            <!-- Project count -->
            <div class="absolute bottom-3 left-3">
              <div class="bg-white/95 backdrop-blur-sm rounded-lg px-2.5 py-1 shadow-sm">
                <div class="text-xs font-semibold text-slate-700">{{ sector.projetsCount }} projets</div>
              </div>
            </div>
          </div>

          <!-- Content -->
          <div class="p-5">
            <div class="mb-4">
              <h3 class="text-base font-bold text-slate-900 mb-1.5 group-hover:text-blue-600 transition-colors">
                {{ sector.name }}
              </h3>
              <p class="text-slate-500 text-xs leading-relaxed">{{ sector.description }}</p>
            </div>

            <!-- Metrics -->
            <div class="grid grid-cols-2 gap-3 mb-4">
              <div class="text-center p-3 bg-slate-50 rounded-xl border border-slate-100">
                <div class="text-sm font-bold text-blue-600">{{ formatCurrency(sector.minInvestment) }}</div>
                <div class="text-xs text-slate-500 mt-0.5">{{ $t('domains.from') }}</div>
              </div>
              <div class="text-center p-3 bg-slate-50 rounded-xl border border-slate-100">
                <div class="text-sm font-bold text-emerald-600">{{ sector.roi }}</div>
                <div class="text-xs text-slate-500 mt-0.5">{{ $t('domains.avgRoi') }}</div>
              </div>
            </div>

            <!-- Highlights -->
            <div class="mb-4">
              <div class="text-xs font-semibold text-slate-700 mb-2">{{ $t('domains.strengths') }}</div>
              <ul class="space-y-1">
                <li v-for="highlight in sector.highlights.slice(0, 2)" :key="highlight" class="text-xs text-slate-500 flex items-center">
                  <i class="fas fa-check text-emerald-500 mr-2 text-xs flex-shrink-0"></i>
                  {{ highlight }}
                </li>
              </ul>
            </div>

            <!-- Payment methods -->
            <div class="mb-4">
              <div class="text-xs font-semibold text-slate-700 mb-2">{{ $t('domains.payments') }}</div>
              <div class="flex flex-wrap gap-1.5">
                <span
                  v-for="method in sector.paymentMethods.slice(0, 3)"
                  :key="method"
                  class="inline-flex items-center px-2 py-0.5 bg-slate-100 text-slate-600 text-xs rounded-md font-medium"
                >
                  <i :class="getPaymentIcon(method)" class="mr-1 text-xs"></i>
                  {{ getPaymentName(method) }}
                </span>
              </div>
            </div>

            <!-- Featured project -->
            <div v-if="sector.projects && sector.projects.length > 0" class="mb-4">
              <div class="text-xs font-semibold text-slate-700 mb-2">{{ $t('domains.featured') }}</div>
              <div class="bg-slate-50 border border-slate-100 p-3 rounded-xl">
                <div class="text-xs font-semibold text-slate-900">{{ sector.projects[0].name }}</div>
                <div class="text-xs text-slate-500 mt-1">{{ sector.projects[0].description.substring(0, 60) }}...</div>
                <div class="flex justify-between items-center mt-2">
                  <span class="text-xs text-slate-400">{{ sector.projects[0].investors }} {{ $t('common.investors') }}</span>
                  <span class="text-xs font-semibold text-emerald-600">+{{ sector.projects[0].roi }}%</span>
                </div>
              </div>
            </div>

            <!-- Action button -->
            <button
              @click.stop="openInvestmentModal(sector)"
              class="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 shadow-sm hover:shadow-md"
            >
              <i class="fas fa-rocket mr-2"></i>
              {{ $t('domains.investFrom') }} {{ formatCurrency(sector.minInvestment) }}
            </button>

            <div class="mt-3 text-center">
              <div class="inline-flex items-center text-xs text-slate-400">
                <i class="fas fa-shield-alt text-emerald-500 mr-1"></i>
                <span>{{ $t('domains.verified') }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- CTA -->
      <div class="mt-14 text-center" data-reveal>
        <div class="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 md:p-10 text-white">
          <h3 class="text-2xl md:text-3xl font-bold mb-3">{{ $t('domains.ctaTitle') }}</h3>
          <p class="text-blue-100 mb-7 max-w-2xl mx-auto text-sm">
            {{ $t('domains.ctaSubtitle') }}
          </p>
          <div class="flex flex-col sm:flex-row gap-3 justify-center items-center">
            <NuxtLink to="/auth/register" class="bg-white text-blue-600 px-7 py-3 rounded-lg font-semibold hover:bg-slate-50 transition-colors shadow-sm text-sm">
              <i class="fas fa-user-plus mr-2"></i>
              {{ $t('domains.ctaBtn1') }}
            </NuxtLink>
            <button class="border-2 border-white/50 text-white px-7 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors text-sm">
              <i class="fas fa-phone mr-2"></i>
              {{ $t('domains.ctaBtn2') }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, watch, nextTick } from 'vue'
import { useInvestmentData } from '~/composables/useInvestmentData'
import { useScrollReveal } from '~/composables/useScrollReveal'

const { getSectors, getPaymentMethods } = useInvestmentData()
const paymentMethods = getPaymentMethods()

const selectedSectorFilter = ref('')
const selectedInvestment = ref('')
const selectedRoi = ref('')
const searchQuery = ref('')

const sectors = computed(() => {
  const allSectors = getSectors()
  return allSectors.map(sector => ({
    ...sector,
    color: getSectorColor(sector.slug),
    icon: getSectorIcon(sector.slug),
    image: getSectorImage(sector.slug)
  }))
})

const filteredSectors = computed(() => {
  let result = [...sectors.value]

  if (selectedSectorFilter.value) {
    result = result.filter(sector => sector.slug === selectedSectorFilter.value)
  }

  if (selectedInvestment.value) {
    const parts = selectedInvestment.value.split('-')
    const min = parseInt(parts[0])
    const max = parts[1] === '+' || parts[1] === undefined
      ? (selectedInvestment.value.endsWith('+') ? Infinity : undefined)
      : parseInt(parts[1])

    result = result.filter(sector => {
      if (max === undefined || max === Infinity) return sector.minInvestment >= min
      return sector.minInvestment >= min && sector.minInvestment <= max
    })
  }

  if (selectedRoi.value) {
    const minRoi = parseInt(selectedRoi.value)
    result = result.filter(sector => parseFloat(sector.roi) >= minRoi)
  }

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(sector =>
      sector.name.toLowerCase().includes(query) ||
      sector.description.toLowerCase().includes(query)
    )
  }

  return result
})

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

  return { totalProjects, avgRoi, minInvestment, totalInvestors }
})

const resetFilters = () => {
  selectedSectorFilter.value = ''
  selectedInvestment.value = ''
  selectedRoi.value = ''
  searchQuery.value = ''
}

const getSectorColor = (sectorSlug) => {
  const colors = {
    'ia-deeptech': 'blue', 'energies-renouvelables': 'green', 'biotechnologies': 'purple',
    'fintech': 'indigo', 'mobilite-durable': 'emerald', 'agritech': 'lime',
    'economie-circulaire': 'teal', 'sante-digitale': 'red', 'edtech': 'amber', 'spatial': 'gray'
  }
  return colors[sectorSlug] || 'blue'
}

const getSectorIcon = (sectorSlug) => {
  const icons = {
    'ia-deeptech': 'fas fa-robot', 'energies-renouvelables': 'fas fa-leaf',
    'biotechnologies': 'fas fa-dna', 'fintech': 'fas fa-coins',
    'mobilite-durable': 'fas fa-charging-station', 'agritech': 'fas fa-seedling',
    'economie-circulaire': 'fas fa-recycle', 'sante-digitale': 'fas fa-heartbeat',
    'edtech': 'fas fa-graduation-cap', 'spatial': 'fas fa-satellite'
  }
  return icons[sectorSlug] || 'fas fa-chart-line'
}

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

const getPaymentIcon = (method) => {
  return paymentMethods[method]?.icon || 'fas fa-coins'
}

const getPaymentName = (method) => {
  const names = { bitcoin: 'BTC', ethereum: 'ETH', usdt: 'USDT', bnb: 'BNB' }
  return names[method] || method.toUpperCase()
}

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0
  }).format(amount)
}

const { revealAll } = useScrollReveal()
watch(filteredSectors, () => {
  nextTick(() => revealAll())
})

const openInvestmentModal = (sector) => {
  const selectedSectorState = useState('selectedSector')
  const investmentModalOpen = useState('investmentModalOpen', () => false)
  selectedSectorState.value = sector
  investmentModalOpen.value = true
}
</script>
