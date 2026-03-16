<template>
  <section id="home" class="relative min-h-screen flex items-center overflow-hidden bg-slate-900">
    <!-- Background pattern -->
    <div class="absolute inset-0 overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"></div>
      <div class="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent"></div>
      <!-- Grid pattern -->
      <div class="absolute inset-0 opacity-[0.03]" style="background-image: linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px); background-size: 60px 60px;"></div>
      <!-- Glow blobs -->
      <div class="absolute top-1/4 -left-20 w-96 h-96 bg-blue-600 rounded-full filter blur-3xl opacity-10 animate-pulse"></div>
      <div class="absolute bottom-1/4 right-0 w-96 h-96 bg-indigo-600 rounded-full filter blur-3xl opacity-10 animate-pulse animation-delay-2000"></div>
    </div>

    <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
      <div class="grid lg:grid-cols-2 gap-16 items-center">
        <!-- Text content -->
        <div data-aos="fade-right" class="space-y-8">
          <!-- Trust badge -->
          <div class="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm border border-white/10 rounded-full px-4 py-2">
            <div class="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
            <span class="text-sm font-medium text-slate-300">+2 500 investisseurs nous font confiance</span>
          </div>

          <!-- Main headline -->
          <h1 class="text-5xl lg:text-6xl xl:text-7xl font-black text-white leading-[1.05] tracking-tight">
            Investissez dans
            <span class="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
              l'avenir
            </span>
          </h1>

          <!-- Subtitle -->
          <p class="text-lg lg:text-xl text-slate-400 leading-relaxed max-w-xl">
            Plateforme d'investissement nouvelle génération. Accédez aux secteurs les plus innovants avec un accompagnement expert.
          </p>

          <!-- Stats row -->
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 py-6 border-y border-white/10">
            <div v-for="(stat, index) in heroStats" :key="stat.label"
                 class="text-center"
                 :data-aos="'zoom-in'"
                 :data-aos-delay="200 + (index * 100)">
              <div class="text-2xl lg:text-3xl font-black mb-1" :class="stat.colorClass">
                <AnimatedCounter :value="stat.numericValue" :suffix="stat.suffix" />
              </div>
              <div class="text-xs text-slate-500 font-medium uppercase tracking-wide">{{ stat.label }}</div>
              <!-- Progress bar -->
              <div class="w-full bg-slate-700 rounded-full h-0.5 mt-2 overflow-hidden">
                <div class="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full transition-all duration-1000"
                     :style="{ width: stat.progress + '%' }"
                     :data-aos="'slide-right'"
                     :data-aos-delay="500 + (index * 100)"></div>
              </div>
            </div>
          </div>

          <!-- CTA buttons -->
          <div class="flex flex-col sm:flex-row gap-3 pt-2">
            <NuxtLink to="/auth/register"
                      class="group inline-flex items-center justify-center bg-blue-600 hover:bg-blue-500 text-white px-7 py-3.5 rounded-lg font-semibold transition-all duration-200 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30">
              <i class="fas fa-rocket mr-2.5 group-hover:translate-x-0.5 transition-transform"></i>
              Commencer maintenant
            </NuxtLink>

            <button @click="scrollToSection('comment')"
                    class="group inline-flex items-center justify-center border border-white/20 text-white hover:bg-white/10 px-7 py-3.5 rounded-lg font-semibold transition-all duration-200">
              <i class="fas fa-play-circle mr-2.5 text-blue-400"></i>
              Comment ça marche
            </button>
          </div>

          <!-- Security badges -->
          <div class="flex flex-wrap items-center gap-5 pt-2">
            <div class="flex items-center space-x-2 text-sm text-slate-400">
              <i class="fas fa-shield-alt text-emerald-400"></i>
              <span>Régulé AMF</span>
            </div>
            <div class="flex items-center space-x-2 text-sm text-slate-400">
              <i class="fas fa-lock text-blue-400"></i>
              <span>SSL 256-bits</span>
            </div>
            <div class="flex items-center space-x-2 text-sm text-slate-400">
              <i class="fas fa-university text-indigo-400"></i>
              <span>Garantie 100k€</span>
            </div>
          </div>
        </div>

        <!-- Image section -->
        <div data-aos="fade-left" class="relative hidden lg:block">
          <div class="relative z-10 group">
            <div class="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl transform rotate-2 opacity-60 group-hover:rotate-3 transition-transform duration-500"></div>
            <img
                src="/images/heureuse femme.jpeg"
                alt="Investissement"
                class="relative rounded-2xl shadow-2xl w-full h-auto transform -rotate-2 group-hover:rotate-0 transition-transform duration-500 object-cover"
                @error="handleImageError"
            >

            <!-- Floating stat card -->
            <div class="absolute top-5 right-5 bg-white rounded-xl p-4 shadow-xl"
                 data-aos="zoom-in" data-aos-delay="800">
              <div class="text-xl font-black text-emerald-500">+22.3%</div>
              <div class="text-xs text-slate-500 font-medium uppercase tracking-wide mt-0.5">ROI Moyen</div>
              <div class="flex items-center mt-1.5">
                <div class="w-8 h-1 bg-emerald-400 rounded-full mr-2"></div>
                <span class="text-xs text-slate-400">vs 8.5% marché</span>
              </div>
            </div>

            <!-- Floating notification -->
            <div class="absolute bottom-5 left-5 bg-slate-800 border border-slate-700 text-white rounded-xl p-3.5 shadow-xl max-w-56"
                 data-aos="slide-up" data-aos-delay="1200">
              <div class="flex items-center space-x-3">
                <div class="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <i class="fas fa-chart-line text-blue-400 text-sm"></i>
                </div>
                <div>
                  <div class="font-semibold text-xs text-white">Nouveau projet financé</div>
                  <div class="text-xs text-slate-400 mt-0.5">GreenTech Solutions - 2.5M€</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Scroll indicator -->
    <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
      <button @click="scrollToSection('trust')" class="flex flex-col items-center space-y-1.5 text-slate-500 hover:text-slate-300 transition-colors">
        <span class="text-xs font-medium tracking-wider uppercase">Découvrir</span>
        <i class="fas fa-chevron-down text-sm"></i>
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
    colorClass: 'text-blue-400',
    progress: 95
  },
  {
    label: 'ROI moyen',
    numericValue: 22.3,
    suffix: '%',
    colorClass: 'text-emerald-400',
    progress: 89
  },
  {
    label: 'Investisseurs',
    numericValue: 2547,
    suffix: '',
    colorClass: 'text-indigo-400',
    progress: 78
  },
  {
    label: 'Projets',
    numericValue: 156,
    suffix: '',
    colorClass: 'text-amber-400',
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
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
}

.float-animation {
  animation: float 6s ease-in-out infinite;
}
</style>
