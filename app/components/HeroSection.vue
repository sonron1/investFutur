<template>
  <section id="home" class="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
    <!-- Éléments décoratifs en arrière-plan -->
    <div class="absolute inset-0 overflow-hidden">
      <div class="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
      <div class="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
      <div class="absolute bottom-1/4 left-1/3 w-96 h-96 bg-indigo-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
    </div>

    <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div class="grid lg:grid-cols-2 gap-16 items-center">
        <!-- Contenu textuel -->
        <div data-aos="fade-right" class="space-y-8">
          <!-- Badge de confiance -->
          <div class="inline-flex items-center space-x-2 bg-white bg-opacity-80 backdrop-blur-sm rounded-full px-4 py-2 border border-blue-200">
            <div class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span class="text-sm font-medium text-gray-700">🔥 +2,500 investisseurs nous font confiance</span>
          </div>

          <!-- Titre principal -->
          <h1 class="text-5xl lg:text-7xl font-bold text-gray-900 leading-tight">
            Investissez dans
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800">
              l'avenir
            </span>
          </h1>

          <!-- Sous-titre -->
          <p class="text-xl lg:text-2xl text-gray-600 leading-relaxed max-w-2xl">
            Plateforme d'investissement nouvelle génération.<br>
            <strong class="text-green-600">ROI moyen de 22.3%</strong> •
            <strong class="text-blue-600">Minimum 5 000€</strong> •
            <strong class="text-purple-600">156 projets financés</strong>
          </p>

          <!-- Statistiques visuelles -->
          <div class="grid grid-cols-2 md:grid-cols-4 gap-6 py-8">
            <div v-for="(stat, index) in heroStats" :key="stat.label"
                 class="text-center group"
                 :data-aos="'zoom-in'"
                 :data-aos-delay="200 + (index * 100)">
              <div class="relative">
                <div class="text-3xl lg:text-4xl font-bold mb-1 transition-colors duration-300 group-hover:scale-110 transform" :class="stat.colorClass">
                  <AnimatedCounter :value="stat.numericValue" :suffix="stat.suffix" />
                </div>
                <div class="text-sm text-gray-600 font-medium">{{ stat.label }}</div>
                <!-- Barre de progression -->
                <div class="w-full bg-gray-200 rounded-full h-1 mt-2 overflow-hidden">
                  <div class="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transition-all duration-1000"
                       :style="{ width: stat.progress + '%' }"
                       :data-aos="'slide-right'"
                       :data-aos-delay="500 + (index * 100)"></div>
                </div>
              </div>
            </div>
          </div>

          <!-- Boutons d'action améliorés -->
          <div class="flex flex-col sm:flex-row gap-4 pt-4">
            <NuxtLink to="/auth/register"
                      class="group relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-2xl text-center">
              <span class="relative z-10 flex items-center justify-center">
                <i class="fas fa-rocket mr-2 group-hover:animate-bounce"></i>
                Commencer maintenant
              </span>
              <div class="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            </NuxtLink>

            <button @click="scrollToSection('comment')"
                    class="group border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 flex items-center justify-center">
              <i class="fas fa-play-circle mr-2 group-hover:animate-spin"></i>
              Voir comment ça marche
            </button>
          </div>

          <!-- Badges de sécurité -->
          <div class="flex items-center space-x-6 pt-8">
            <div class="flex items-center space-x-2 text-sm text-gray-600">
              <i class="fas fa-shield-alt text-green-600"></i>
              <span class="font-medium">Régulé AMF</span>
            </div>
            <div class="flex items-center space-x-2 text-sm text-gray-600">
              <i class="fas fa-lock text-blue-600"></i>
              <span class="font-medium">SSL 256-bits</span>
            </div>
            <div class="flex items-center space-x-2 text-sm text-gray-600">
              <i class="fas fa-university text-purple-600"></i>
              <span class="font-medium">Garantie 100k€</span>
            </div>
          </div>
        </div>

        <!-- Section image améliorée -->
        <div data-aos="fade-left" class="relative">
          <!-- Image principale -->
          <div class="relative z-10 group">
            <div class="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-3xl transform rotate-3 group-hover:rotate-6 transition-transform duration-500"></div>
            <img
                src="/images/heureuse femme.jpeg"
                alt="Investissement"
                class="relative rounded-3xl shadow-2xl w-full h-auto transform -rotate-3 group-hover:rotate-0 transition-transform duration-500"
                @error="handleImageError"
            >

            <!-- Overlay avec statistiques flottantes -->
            <div class="absolute inset-0 rounded-3xl overflow-hidden">
              <!-- Carte statistique flottante -->
              <div class="absolute top-6 right-6 bg-white bg-opacity-95 backdrop-blur-sm rounded-2xl p-4 shadow-lg transform hover:scale-105 transition-transform duration-300"
                   data-aos="zoom-in" data-aos-delay="800">
                <div class="text-2xl font-bold text-green-600">+22.3%</div>
                <div class="text-xs text-gray-600 uppercase tracking-wide">ROI Moyen</div>
                <div class="flex items-center mt-2">
                  <div class="w-8 h-1 bg-green-500 rounded-full mr-2"></div>
                  <span class="text-xs text-gray-500">vs 8.5% marché</span>
                </div>
              </div>

              <!-- Notification flottante -->
              <div class="absolute bottom-6 left-6 bg-blue-600 text-white rounded-xl p-4 shadow-lg max-w-64"
                   data-aos="slide-up" data-aos-delay="1200">
                <div class="flex items-center space-x-3">
                  <div class="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                    <i class="fas fa-chart-line"></i>
                  </div>
                  <div>
                    <div class="font-semibold text-sm">Nouveau projet financé</div>
                    <div class="text-xs opacity-90">GreenTech Solutions - 2.5M€</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Indicateur de scroll -->
    <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-gray-400 animate-bounce">
      <button @click="scrollToSection('trust')" class="flex flex-col items-center space-y-2 hover:text-blue-600 transition-colors">
        <span class="text-sm font-medium">Découvrir</span>
        <i class="fas fa-chevron-down"></i>
      </button>
    </div>
  </section>
</template>

<script setup>
import { useSmoothScroll } from '~/composables/useSmoothScroll'
import AnimatedCounter from './AnimatedCounter.vue'

const { scrollToSection } = useSmoothScroll()

const heroStats = [
  {
    label: 'Capital investi',
    numericValue: 189.5,
    suffix: 'M€',
    colorClass: 'text-blue-600',
    progress: 95
  },
  {
    label: 'ROI moyen',
    numericValue: 22.3,
    suffix: '%',
    colorClass: 'text-green-600',
    progress: 89
  },
  {
    label: 'Investisseurs',
    numericValue: 2547,
    suffix: '',
    colorClass: 'text-purple-600',
    progress: 78
  },
  {
    label: 'Projets',
    numericValue: 156,
    suffix: '',
    colorClass: 'text-orange-600',
    progress: 92
  }
]

const handleImageError = (event) => {
  event.target.src = 'https://images.unsplash.com/photo-1580519542036-c47de6196ba5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
}
</script>

<style scoped>
.animation-delay-2000 {
  animation-delay: 2s;
}

.animation-delay-4000 {
  animation-delay: 4s;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-20px);
  }
}

.float-animation {
  animation: float 6s ease-in-out infinite;
}
</style>