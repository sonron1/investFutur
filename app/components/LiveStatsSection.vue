
<template>
  <section class="py-20 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- En-tête -->
      <div class="text-center mb-16" data-aos="fade-up">
        <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Nos performances en temps réel
        </h2>
        <p class="text-xl text-gray-600 max-w-3xl mx-auto">
          Découvrez la performance de notre plateforme et de nos investisseurs
        </p>
      </div>

      <!-- Statistiques animées -->
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
        <div
            v-for="(stat, index) in liveStats"
            :key="stat.label"
            :data-aos="'zoom-in'"
            :data-aos-delay="index * 150"
            class="text-center"
        >
          <div class="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
            <div class="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <i :class="stat.icon" class="text-2xl text-white"></i>
            </div>
            <div class="text-4xl font-bold mb-2" :class="stat.colorClass">
              <AnimatedCounter :value="stat.value" :suffix="stat.suffix" />
            </div>
            <div class="text-gray-600 font-medium">{{ stat.label }}</div>
            <div v-if="stat.growth" class="text-sm text-green-600 mt-2">
              <i class="fas fa-arrow-up mr-1"></i>
              +{{ stat.growth }}% ce mois
            </div>
          </div>
        </div>
      </div>

      <!-- Graphique de performance -->
      <div class="bg-white rounded-2xl p-8 shadow-lg" data-aos="fade-up" data-aos-delay="800">
        <div class="flex justify-between items-center mb-6">
          <h3 class="text-2xl font-bold text-gray-900">Performance du portefeuille</h3>
          <div class="flex space-x-2">
            <button
                v-for="period in periods"
                :key="period"
                @click="selectedPeriod = period"
                :class="selectedPeriod === period ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600'"
                class="px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              {{ period }}
            </button>
          </div>
        </div>

        <!-- Graphique simplifié avec CSS -->
        <div class="h-64 flex items-end space-x-2">
          <div
              v-for="(bar, index) in chartData"
              :key="index"
              class="flex-1 bg-gradient-to-t from-blue-600 to-blue-400 rounded-t-lg transition-all duration-1000 hover:from-blue-700 hover:to-blue-500"
              :style="{ height: bar.height + '%' }"
              :data-aos="'slide-up'"
              :data-aos-delay="1000 + (index * 100)"
          ></div>
        </div>

        <div class="flex justify-between mt-4 text-sm text-gray-500">
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
    colorClass: 'text-green-600',
    growth: 8.7
  },
  {
    label: 'ROI moyen',
    value: 22.3,
    suffix: '%',
    icon: 'fas fa-chart-line',
    colorClass: 'text-purple-600',
    growth: 3.1
  },
  {
    label: 'Projets financés',
    value: 156,
    suffix: '',
    icon: 'fas fa-rocket',
    colorClass: 'text-orange-600',
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