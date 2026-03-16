<template>
  <section id="comment" class="py-20 bg-slate-50 relative overflow-hidden">
    <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- En-tête -->
      <div class="text-center mb-14" data-aos="fade-up">
        <div class="inline-flex items-center space-x-2 bg-blue-50 border border-blue-100 rounded-full px-4 py-1.5 mb-5">
          <div class="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"></div>
          <span class="text-xs font-semibold text-blue-700">Processus simplifié</span>
        </div>
        <h2 class="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
          Comment
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
            ça marche ?
          </span>
        </h2>
        <p class="text-slate-500 max-w-2xl mx-auto">
          Investir dans l'innovation n'a jamais été aussi simple. Suivez ces 3 étapes pour commencer votre parcours d'investisseur.
        </p>
      </div>

      <!-- Timeline des étapes -->
      <div class="relative mb-14">
        <!-- Ligne de connexion desktop -->
        <div class="hidden lg:block absolute top-16 left-0 right-0 z-0">
          <div class="max-w-2xl mx-auto">
            <div class="h-px bg-gradient-to-r from-blue-600 via-indigo-500 to-emerald-500"></div>
          </div>
        </div>

        <div class="grid lg:grid-cols-3 gap-8">
          <div
              v-for="(step, index) in steps"
              :key="step.id"
              :data-aos="'fade-up'"
              :data-aos-delay="index * 200"
              class="relative text-center group"
          >
            <!-- Carte principale -->
            <div class="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300">
              <!-- Icône et numéro -->
              <div class="relative inline-flex items-center justify-center mb-5">
                <div class="w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-sm">
                  <i :class="step.icon" class="text-xl text-white"></i>
                </div>
                <div class="absolute -top-2 -right-2 w-6 h-6 bg-emerald-500 text-white rounded-full flex items-center justify-center text-xs font-bold shadow-sm">
                  {{ index + 1 }}
                </div>
              </div>

              <!-- Contenu -->
              <h3 class="text-base font-bold text-slate-900 mb-2.5 group-hover:text-blue-600 transition-colors">
                {{ step.title }}
              </h3>
              <p class="text-slate-500 text-sm leading-relaxed mb-4">{{ step.description }}</p>

              <!-- Statistiques de l'étape -->
              <div class="bg-slate-50 rounded-xl p-3 mb-4 border border-slate-100">
                <div class="grid grid-cols-2 gap-3 text-xs">
                  <div class="text-center">
                    <div class="font-bold text-blue-600 text-sm">{{ step.stat1.value }}</div>
                    <div class="text-slate-500 mt-0.5">{{ step.stat1.label }}</div>
                  </div>
                  <div class="text-center">
                    <div class="font-bold text-emerald-600 text-sm">{{ step.stat2.value }}</div>
                    <div class="text-slate-500 mt-0.5">{{ step.stat2.label }}</div>
                  </div>
                </div>
              </div>

              <!-- Bouton d'action -->
              <button
                  @click="handleStepAction(step.id)"
                  :class="step.buttonClass"
                  class="w-full py-2.5 rounded-lg text-sm font-semibold transition-all duration-200"
              >
                <i :class="step.buttonIcon" class="mr-2"></i>
                {{ step.buttonText }}
              </button>
            </div>

            <!-- Indicateur de progression mobile -->
            <div v-if="index < steps.length - 1" class="lg:hidden flex justify-center mt-6">
              <div class="w-px h-8 bg-gradient-to-b from-blue-500 to-indigo-500"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Section avantages du processus -->
      <div class="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm mb-12" data-aos="zoom-in">
        <div class="text-center mb-8">
          <div class="text-blue-600 text-xs font-semibold uppercase tracking-wider mb-2">Avantages</div>
          <h3 class="text-xl font-bold text-slate-900 mb-2">Pourquoi notre processus est-il si efficace ?</h3>
          <p class="text-slate-500 text-sm max-w-xl mx-auto">
            Découvrez les avantages qui font la différence dans votre expérience d'investissement
          </p>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          <div v-for="advantage in processAdvantages" :key="advantage.title"
               class="text-center group hover:bg-slate-50 p-5 rounded-xl border border-transparent hover:border-slate-100 transition-all duration-200">
            <div class="w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-200 shadow-sm">
              <i :class="advantage.icon" class="text-lg text-white"></i>
            </div>
            <h4 class="font-bold text-slate-900 text-sm mb-1.5 group-hover:text-blue-600 transition-colors">{{ advantage.title }}</h4>
            <p class="text-xs text-slate-500">{{ advantage.description }}</p>
          </div>
        </div>
      </div>

      <!-- CTA -->
      <div class="text-center mb-14" data-aos="fade-up" data-aos-delay="600">
        <div class="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 md:p-10 text-white relative overflow-hidden">
          <div class="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full transform translate-x-24 -translate-y-24"></div>
          <div class="absolute bottom-0 left-0 w-36 h-36 bg-white/5 rounded-full transform -translate-x-18 translate-y-18"></div>

          <div class="relative z-10">
            <h3 class="text-2xl font-bold mb-3">Prêt à commencer votre parcours d'investisseur ?</h3>
            <p class="text-blue-100 mb-7 max-w-xl mx-auto text-sm">
              Rejoignez plus de 2,500 investisseurs qui ont déjà fait le choix de l'innovation
            </p>

            <div class="flex flex-col sm:flex-row items-center justify-center gap-3 mb-7">
              <NuxtLink to="/auth/register"
                        class="bg-white text-blue-600 px-7 py-3 rounded-lg font-bold hover:bg-slate-50 transition-colors flex items-center text-sm shadow-sm">
                <i class="fas fa-rocket mr-2"></i>
                Commencer maintenant
              </NuxtLink>

              <button @click="scrollToSection('domaines')"
                      class="border border-white/40 text-white hover:bg-white/10 px-7 py-3 rounded-lg font-semibold transition-colors flex items-center text-sm">
                <i class="fas fa-eye mr-2"></i>
                Voir les opportunités
              </button>
            </div>

            <!-- Témoignage rapide -->
            <div class="inline-flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-xl px-5 py-3">
              <div class="w-9 h-9 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <i class="fas fa-quote-left text-sm"></i>
              </div>
              <div class="text-left">
                <div class="text-sm font-semibold">"En 3 clics, j'ai investi dans l'IA. Génial !"</div>
                <div class="text-xs text-blue-200 mt-0.5">Marie D., investisseuse depuis 2023</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Statistiques de confiance -->
      <div class="pt-12 border-t border-slate-200">
        <div class="text-center mb-10" data-aos="fade-up">
          <div class="text-blue-600 text-xs font-semibold uppercase tracking-wider mb-2">Confiance</div>
          <h3 class="text-xl font-bold text-slate-900 mb-2">Ils nous font déjà confiance</h3>
          <p class="text-slate-500 text-sm">Une communauté d'investisseurs en constante croissance</p>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-4 gap-6" data-aos="fade-up" data-aos-delay="200">
          <div v-for="stat in trustStats" :key="stat.label"
               class="text-center group">
            <div class="text-3xl font-black mb-1.5 transition-colors duration-300" :class="stat.colorClass">
              <AnimatedCounter :value="stat.numericValue" :suffix="stat.suffix" />
            </div>
            <div class="text-xs text-slate-500 font-medium">{{ stat.label }}</div>
            <div class="w-10 h-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full mx-auto mt-2 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useSmoothScroll } from '~/composables/useSmoothScroll'
import AnimatedCounter from './AnimatedCounter.vue'

const { scrollToSection } = useSmoothScroll()

const steps = [
  {
    id: 1,
    icon: 'fas fa-user-plus',
    title: 'Créez votre compte',
    description: 'Inscription simple et sécurisée en moins de 3 minutes. Vérification d\'identité instantanée et aucun frais d\'ouverture.',
    stat1: { value: '< 3 min', label: 'Inscription' },
    stat2: { value: '0€', label: 'Frais' },
    buttonText: 'Commencer l\'inscription',
    buttonIcon: 'fas fa-arrow-right',
    buttonClass: 'bg-blue-600 text-white hover:bg-blue-700'
  },
  {
    id: 2,
    icon: 'fas fa-search',
    title: 'Explorez et investissez',
    description: 'Découvrez nos secteurs d\'avenir sélectionnés par nos experts. Analyses détaillées et recommandations personnalisées.',
    stat1: { value: '6 secteurs', label: 'Disponibles' },
    stat2: { value: '156 projets', label: 'Financés' },
    buttonText: 'Explorer les secteurs',
    buttonIcon: 'fas fa-compass',
    buttonClass: 'bg-indigo-600 text-white hover:bg-indigo-700'
  },
  {
    id: 3,
    icon: 'fas fa-chart-line',
    title: 'Suivez vos gains',
    description: 'Dashboard en temps réel, rapports détaillés et notifications automatiques. Vos dividendes versés mensuellement.',
    stat1: { value: '+22.3%', label: 'ROI moyen' },
    stat2: { value: 'Mensuel', label: 'Dividendes' },
    buttonText: 'Voir le dashboard',
    buttonIcon: 'fas fa-chart-bar',
    buttonClass: 'bg-emerald-600 text-white hover:bg-emerald-700'
  }
]

const processAdvantages = [
  {
    icon: 'fas fa-zap',
    title: 'Ultra rapide',
    description: 'Investissement en moins de 5 minutes'
  },
  {
    icon: 'fas fa-shield-alt',
    title: '100% sécurisé',
    description: 'Cryptage bancaire et fonds protégés'
  },
  {
    icon: 'fas fa-brain',
    title: 'IA intégrée',
    description: 'Recommandations personnalisées par IA'
  },
  {
    icon: 'fas fa-headset',
    title: 'Support expert',
    description: 'Conseillers disponibles 7j/7'
  }
]

const trustStats = [
  {
    label: 'Investisseurs actifs',
    numericValue: 2500,
    suffix: '+',
    colorClass: 'text-blue-600'
  },
  {
    label: 'Projets financés',
    numericValue: 156,
    suffix: '',
    colorClass: 'text-emerald-600'
  },
  {
    label: 'Taux de satisfaction',
    numericValue: 98,
    suffix: '%',
    colorClass: 'text-indigo-600'
  },
  {
    label: 'Capital investi',
    numericValue: 189,
    suffix: 'M€',
    colorClass: 'text-amber-600'
  }
]

const handleStepAction = (stepId) => {
  switch(stepId) {
    case 1:
      navigateTo('/auth/register')
      break
    case 2:
      scrollToSection('domaines')
      break
    case 3:
      navigateTo('/dashboard')
      break
  }
}
</script>
