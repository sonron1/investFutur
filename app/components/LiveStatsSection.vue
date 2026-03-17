<template>
  <section class="py-20 bg-slate-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="text-center mb-12" data-reveal>
        <div class="section-tag">
          <i class="fas fa-chart-line"></i>
          {{ $t('liveStats.tag') }}
        </div>
        <h2 class="section-title mb-4">
          {{ $t('liveStats.title') }}
        </h2>
        <p class="section-sub">
          {{ $t('liveStats.subtitle') }}
        </p>
      </div>

      <!-- Stats cards -->
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
        <div
          v-for="(stat, index) in liveStats"
          :key="stat.labelKey"
          data-reveal
          :data-reveal-delay="String(index * 150)"
          class="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 hover:shadow-md hover:-translate-y-1 transition-all duration-300 text-center"
        >
          <div class="w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center mx-auto mb-4">
            <i :class="stat.icon" class="text-lg text-white"></i>
          </div>
          <div class="text-3xl font-black mb-1.5" :class="stat.colorClass">
            {{ stat.displayValue }}
          </div>
          <div class="text-slate-600 text-sm font-medium">{{ $t(stat.labelKey) }}</div>
          <div v-if="stat.growth" class="text-xs text-emerald-600 mt-2 font-medium">
            <i class="fas fa-arrow-up mr-1"></i>
            +{{ stat.growth }}% {{ $t('liveStats.monthGrowth') }}
          </div>
        </div>
      </div>

      <!-- Performance chart -->
      <div class="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 md:p-8" data-reveal data-reveal-delay="400">
        <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
          <div>
            <div class="text-blue-600 text-xs font-semibold uppercase tracking-wider mb-1">{{ $t('liveStats.chartTag') }}</div>
            <h3 class="text-lg font-bold text-slate-900">{{ $t('liveStats.chartTitle') }}</h3>
          </div>
          <div class="flex space-x-2">
            <button
              v-for="period in periods"
              :key="period"
              @click="selectedPeriod = period"
              :class="selectedPeriod === period ? 'bg-blue-600 text-white shadow-sm' : 'bg-slate-50 text-slate-600 border border-slate-200 hover:border-blue-300'"
              class="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all"
            >
              {{ period }}
            </button>
          </div>
        </div>

        <!-- Bar chart using CSS -->
        <div class="h-52 flex items-end gap-2">
          <div
            v-for="(bar, index) in chartData"
            :key="index"
            class="flex-1 bg-gradient-to-t from-blue-600 to-indigo-500 rounded-t-lg transition-all duration-700 hover:from-blue-700 hover:to-indigo-600 opacity-80 hover:opacity-100"
            :style="{ height: bar.height + '%' }"
          ></div>
        </div>

        <div class="flex justify-between mt-3 text-xs text-slate-400 font-medium">
          <span v-for="label in chartLabels" :key="label">{{ label }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'

const { locale } = useI18n()

const selectedPeriod = ref('6M')
const periods = ['1M', '3M', '6M', '1A', '5A']

const liveStats = [
  {
    labelKey: 'liveStats.capital',
    displayValue: '189.5M€',
    icon: 'fas fa-euro-sign',
    colorClass: 'text-blue-600',
    growth: 15.2
  },
  {
    labelKey: 'liveStats.investors',
    displayValue: '2 547',
    icon: 'fas fa-users',
    colorClass: 'text-emerald-600',
    growth: 8.7
  },
  {
    labelKey: 'liveStats.roi',
    displayValue: '22.3%',
    icon: 'fas fa-chart-line',
    colorClass: 'text-indigo-600',
    growth: 3.1
  },
  {
    labelKey: 'liveStats.projects',
    displayValue: '156',
    icon: 'fas fa-rocket',
    colorClass: 'text-amber-600',
    growth: 12.4
  }
]

const periodDatasets = {
  '1M': [{ height: 55 }, { height: 65 }, { height: 72 }, { height: 68 }],
  '3M': [{ height: 50 }, { height: 62 }, { height: 75 }, { height: 70 }, { height: 82 }, { height: 90 }],
  '6M': [{ height: 60 }, { height: 80 }, { height: 75 }, { height: 90 }, { height: 85 }, { height: 100 }],
  '1A': [{ height: 40 }, { height: 50 }, { height: 58 }, { height: 62 }, { height: 68 }, { height: 72 }, { height: 76 }, { height: 80 }, { height: 85 }, { height: 90 }, { height: 95 }, { height: 100 }],
  '5A': [{ height: 40 }, { height: 55 }, { height: 68 }, { height: 82 }, { height: 100 }]
}

const chartData = computed(() => periodDatasets[selectedPeriod.value] || periodDatasets['6M'])

const chartLabels = computed(() => {
  const lang = locale.value === 'fr' ? 'fr-FR' : locale.value === 'es' ? 'es-ES' : 'en-US'
  const fmt = (month) => new Intl.DateTimeFormat(lang, { month: 'short' }).format(new Date(2024, month, 1))

  if (selectedPeriod.value === '1M') {
    return [1, 2, 3, 4].map(w => `S${w}`)
  }
  if (selectedPeriod.value === '3M') {
    return [0, 1, 2].map(fmt)
  }
  if (selectedPeriod.value === '6M') {
    return [0, 1, 2, 3, 4, 5].map(fmt)
  }
  if (selectedPeriod.value === '1A') {
    return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(fmt)
  }
  if (selectedPeriod.value === '5A') {
    return ['2020', '2021', '2022', '2023', '2024']
  }
  return []
})
</script>
