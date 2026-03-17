<template>
  <section id="home" class="relative min-h-screen flex items-center overflow-hidden" style="background-color: var(--color-dark)">
    <!-- Background elements -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <!-- Grid pattern -->
      <div class="absolute inset-0 opacity-[0.04]" style="background-image: linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px); background-size: 60px 60px;"></div>
      <!-- Gradient blobs -->
      <div class="absolute top-1/4 -left-32 w-[500px] h-[500px] rounded-full animate-float" style="background: radial-gradient(circle, rgba(59,130,246,0.12) 0%, transparent 70%);"></div>
      <div class="absolute bottom-1/4 -right-32 w-[500px] h-[500px] rounded-full animate-float delay-300" style="background: radial-gradient(circle, rgba(99,102,241,0.10) 0%, transparent 70%);"></div>
      <!-- Top accent line -->
      <div class="absolute top-0 left-0 right-0 h-px" style="background: linear-gradient(90deg, transparent, rgba(59,130,246,0.4), transparent);"></div>
    </div>

    <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 w-full">
      <div class="grid lg:grid-cols-2 gap-16 items-center">

        <!-- Left: text content -->
        <div class="space-y-8 animate-fade-in-up">
          <!-- Trust badge -->
          <div class="inline-flex items-center gap-2.5 bg-white/8 backdrop-blur-sm border border-white/10 rounded-full px-4 py-2">
            <div class="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
            <span class="text-sm font-medium text-slate-300">+2 500 investisseurs nous font confiance</span>
          </div>

          <!-- Headline -->
          <h1 class="text-5xl lg:text-6xl xl:text-7xl font-black text-white leading-[1.05] tracking-tight">
            Investissez dans
            <span class="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
              l'avenir
            </span>
          </h1>

          <!-- Subtitle -->
          <p class="text-lg lg:text-xl text-slate-400 leading-relaxed max-w-xl">
            Plateforme d'investissement nouvelle génération. Accédez aux secteurs les plus innovants avec un accompagnement expert et un ROI moyen de 22%.
          </p>

          <!-- Stats grid -->
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 py-6 border-y border-white/10">
            <div class="text-center animate-fade-in-up delay-100">
              <div class="text-2xl lg:text-3xl font-black text-blue-400 mb-1">22.3%</div>
              <div class="text-xs text-slate-500 font-medium uppercase tracking-wide">ROI moyen</div>
            </div>
            <div class="text-center animate-fade-in-up delay-200">
              <div class="text-2xl lg:text-3xl font-black text-emerald-400 mb-1">2 500+</div>
              <div class="text-xs text-slate-500 font-medium uppercase tracking-wide">Investisseurs</div>
            </div>
            <div class="text-center animate-fade-in-up delay-300">
              <div class="text-2xl lg:text-3xl font-black text-indigo-400 mb-1">47</div>
              <div class="text-xs text-slate-500 font-medium uppercase tracking-wide">Projets</div>
            </div>
            <div class="text-center animate-fade-in-up delay-400">
              <div class="text-2xl lg:text-3xl font-black text-amber-400 mb-1">12M€</div>
              <div class="text-xs text-slate-500 font-medium uppercase tracking-wide">Capital géré</div>
            </div>
          </div>

          <!-- CTA buttons -->
          <div class="flex flex-col sm:flex-row gap-3 pt-2 animate-fade-in-up delay-500">
            <NuxtLink to="/auth/register"
              class="group inline-flex items-center justify-center bg-blue-600 hover:bg-blue-500 text-white px-7 py-3.5 rounded-lg font-semibold transition-all duration-200 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30">
              <i class="fas fa-rocket mr-2.5 group-hover:translate-x-0.5 transition-transform"></i>
              Commencer maintenant
            </NuxtLink>
            <button @click="scrollToSection('comment')"
              class="inline-flex items-center justify-center border border-white/20 text-white hover:bg-white/10 px-7 py-3.5 rounded-lg font-semibold transition-all duration-200">
              <i class="fas fa-play-circle mr-2.5 text-blue-400"></i>
              Comment ça marche
            </button>
          </div>

          <!-- Security badges -->
          <div class="flex flex-wrap items-center gap-5 pt-2 animate-fade-in-up delay-600">
            <div class="flex items-center gap-2 text-sm text-slate-400">
              <i class="fas fa-shield-alt text-emerald-400"></i>
              <span>Régulé AMF</span>
            </div>
            <div class="flex items-center gap-2 text-sm text-slate-400">
              <i class="fas fa-lock text-blue-400"></i>
              <span>SSL 256-bits</span>
            </div>
            <div class="flex items-center gap-2 text-sm text-slate-400">
              <i class="fas fa-university text-indigo-400"></i>
              <span>Garantie 100k€</span>
            </div>
          </div>
        </div>

        <!-- Right: mock dashboard card -->
        <div class="hidden lg:block animate-fade-in-up delay-200">
          <div class="bg-slate-800 rounded-2xl p-6 border border-slate-700 shadow-2xl shadow-black/40">
            <!-- Header -->
            <div class="flex items-center justify-between mb-6">
              <div>
                <div class="text-xs text-slate-400 font-semibold uppercase tracking-wider mb-1">Tableau de bord</div>
                <h3 class="text-white font-bold text-lg">Mon portefeuille</h3>
              </div>
              <div class="flex items-center gap-2">
                <div class="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                <span class="text-xs text-emerald-400 font-medium">En direct</span>
              </div>
            </div>

            <!-- Big metric -->
            <div class="bg-slate-900/60 rounded-xl p-5 mb-5 border border-slate-700/50">
              <div class="text-4xl font-black text-emerald-400 mb-1">+22.3%</div>
              <div class="text-slate-400 text-sm">Rendement annuel moyen</div>
              <div class="flex items-center gap-2 mt-2">
                <i class="fas fa-arrow-up text-emerald-400 text-xs"></i>
                <span class="text-xs text-emerald-400 font-medium">+3.1% vs mois dernier</span>
              </div>
            </div>

            <!-- Metric rows -->
            <div class="space-y-3 mb-6">
              <div class="flex items-center justify-between py-2.5 px-3 bg-slate-900/40 rounded-lg">
                <div class="flex items-center gap-2.5">
                  <div class="w-7 h-7 bg-blue-500/20 rounded-lg flex items-center justify-center">
                    <i class="fas fa-euro-sign text-blue-400 text-xs"></i>
                  </div>
                  <span class="text-slate-400 text-sm">Total investi</span>
                </div>
                <span class="text-white font-bold text-sm">12 500 €</span>
              </div>
              <div class="flex items-center justify-between py-2.5 px-3 bg-slate-900/40 rounded-lg">
                <div class="flex items-center gap-2.5">
                  <div class="w-7 h-7 bg-indigo-500/20 rounded-lg flex items-center justify-center">
                    <i class="fas fa-chart-pie text-indigo-400 text-xs"></i>
                  </div>
                  <span class="text-slate-400 text-sm">Investissements actifs</span>
                </div>
                <span class="text-white font-bold text-sm">4</span>
              </div>
              <div class="flex items-center justify-between py-2.5 px-3 bg-slate-900/40 rounded-lg">
                <div class="flex items-center gap-2.5">
                  <div class="w-7 h-7 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                    <i class="fas fa-chart-line text-emerald-400 text-xs"></i>
                  </div>
                  <span class="text-slate-400 text-sm">Gains estimés</span>
                </div>
                <span class="text-emerald-400 font-bold text-sm">+2 787 €</span>
              </div>
            </div>

            <!-- Mini bar chart -->
            <div>
              <div class="flex items-center justify-between mb-3">
                <span class="text-xs text-slate-500 font-semibold uppercase tracking-wider">Performance 6 mois</span>
              </div>
              <div class="flex items-end gap-1.5 h-16">
                <div class="flex-1 rounded-t-md bg-gradient-to-t from-blue-600 to-blue-400 opacity-70" style="height: 55%"></div>
                <div class="flex-1 rounded-t-md bg-gradient-to-t from-blue-600 to-blue-400 opacity-80" style="height: 72%"></div>
                <div class="flex-1 rounded-t-md bg-gradient-to-t from-blue-600 to-indigo-400 opacity-80" style="height: 65%"></div>
                <div class="flex-1 rounded-t-md bg-gradient-to-t from-indigo-600 to-indigo-400 opacity-90" style="height: 85%"></div>
                <div class="flex-1 rounded-t-md bg-gradient-to-t from-indigo-600 to-indigo-400 opacity-90" style="height: 78%"></div>
                <div class="flex-1 rounded-t-md bg-gradient-to-t from-blue-500 to-emerald-400" style="height: 100%"></div>
              </div>
              <div class="flex justify-between mt-1.5 text-xs text-slate-600">
                <span>Jan</span><span>Fév</span><span>Mar</span><span>Avr</span><span>Mai</span><span>Jun</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>

    <!-- Scroll indicator -->
    <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
      <button @click="scrollToSection('trust')" class="flex flex-col items-center gap-1.5 text-slate-500 hover:text-slate-300 transition-colors">
        <span class="text-xs font-medium tracking-wider uppercase">Découvrir</span>
        <i class="fas fa-chevron-down text-sm"></i>
      </button>
    </div>
  </section>
</template>

<script setup>
import { useSmoothScroll } from '~/composables/useSmoothScroll'

const { scrollToSection } = useSmoothScroll()
</script>
