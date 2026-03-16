
<template>
  <section class="py-20 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- En-tête -->
      <div class="text-center mb-12" data-aos="fade-up">
        <div class="text-blue-600 text-sm font-semibold uppercase tracking-wider mb-3">Statistiques</div>
        <h2 class="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
          Nos performances en temps réel
        </h2>
        <p class="text-slate-500 max-w-2xl mx-auto">
          Découvrez la performance de notre plateforme et de nos investisseurs
        </p>
      </div>

      <!-- Statistiques animées -->
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
        <div
            v-for="(stat, index) in liveStats"
            :key="stat.label"
            :data-aos="'zoom-in'"
            :data-aos-delay="index * 150"
            class="text-center"
        >
          <div class="bg-slate-50 rounded-2xl border border-slate-100 p-6 hover:shadow-md hover:-translate-y-1 transition-all duration-300">
            <div class="w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center mx-auto mb-4">
              <i :class="stat.icon" class="text-lg text-white"></i>
            </div>
            <div class="text-3xl font-black mb-1.5" :class="stat.colorClass">
              <AnimatedCounter :value="stat.value" :suffix="stat.suffix" />
            </div>
            <div class="text-slate-600 text-sm font-medium">{{ stat.label }}</div>
            <div v-if="stat.growth" class="text-xs text-emerald-600 mt-2 font-medium">
              <i class="fas fa-arrow-up mr-1"></i>
              +{{ stat.growth }}% ce mois
            </div>
          </div>
        </div>
      </div>

      <!-- Graphique de performance -->
      <div class="bg-slate-50 rounded-2xl border border-slate-100 p-6 md:p-8" data-aos="fade-up" data-aos-delay="800">
        <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
          <div>
            <div class="text-blue-600 text-xs font-semibold uppercase tracking-wider mb-1">Évolution</div>
            <h3 class="text-lg font-bold text-slate-900">Performance du portefeuille</h3>
          </div>
          <div class="flex space-x-2">
            <button
                v-for="period in periods"
                :key="period"
                @click="selectedPeriod = period"
                :class="selectedPeriod === period ? 'bg-blue-600 text-white shadow-sm' : 'bg-white text-slate-600 border border-slate-200 hover:border-blue-300'"
                class="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all"
            >
              {{ period }}
            </button>
          </div>
        </div>

        <!-- Graphique simplifié avec CSS -->
        <div class="h-52 flex items-end space-x-2">
          <div
              v-for="(bar, index) in chartData"
              :key="index"
              class="flex-1 bg-gradient-to-t from-blue-600 to-indigo-500 rounded-t-lg transition-all duration-1000 hover:from-blue-700 hover:to-indigo-600 opacity-80 hover:opacity-100"
              :style="{ height: bar.height + '%' }"
              :data-aos="'slide-up'"
              :data-aos-delay="1000 + (index * 100)"
          ></div>
        </div>

        <div class="flex justify-between mt-3 text-xs text-slate-400 font-medium">
          <span v-for="month in months" :key="month">{{ month }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const selectedPeriod = ref('6M')
const periods = ['1M', '3M', '6M', '1A', '5A']

const liveStats = [
  {
    label: 'Capital investi',
    value: 189.5,
    suffix: 'M€',
    icon: 'fas fa-euro-sign',
    colorClass: 'text-blue-600',
    growth: 15.2
  },
  {
    label: 'Investisseurs actifs',
    value: 2547,
    suffix: '',
    icon: 'fas fa-users',
    colorClass: 'text-emerald-600',
    growth: 8.7
  },
  {
    label: 'ROI moyen',
    value: 22.3,
    suffix: '%',
    icon: 'fas fa-chart-line',
    colorClass: 'text-indigo-600',
    growth: 3.1
  },
  {
    label: 'Projets financés',
    value: 156,
    suffix: '',
    icon: 'fas fa-rocket',
    colorClass: 'text-amber-600',
    growth: 12.4
  }
]

const months = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun']
const chartData = ref([
  { height: 60 },
  { height: 80 },
  { height: 75 },
  { height: 90 },
  { height: 85 },
  { height: 100 }
])
</script>
