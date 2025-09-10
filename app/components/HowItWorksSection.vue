<template>
  <section id="comment" class="py-24 bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 relative overflow-hidden">
    <!-- Éléments décoratifs -->
    <div class="absolute inset-0 overflow-hidden">
      <div class="absolute top-1/4 right-0 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-10"></div>
      <div class="absolute bottom-1/4 left-0 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-10"></div>
    </div>

    <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- En-tête -->
      <div class="text-center mb-20" data-aos="fade-up">
        <div class="inline-flex items-center space-x-2 bg-blue-100 rounded-full px-4 py-2 mb-6">
          <div class="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
          <span class="text-sm font-medium text-blue-700">Processus simplifié</span>
        </div>
        <h2 class="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          Comment
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
            ça marche ?
          </span>
        </h2>
        <p class="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
          Investir dans l'innovation n'a jamais été aussi simple. Suivez ces 3 étapes pour commencer votre parcours d'investisseur.
        </p>
      </div>

      <!-- Timeline des étapes -->
      <div class="relative mb-20">
        <!-- Ligne de connexion -->
        <div class="hidden lg:block absolute top-24 left-1/2 transform -translate-x-1/2 w-full max-w-4xl">
          <div class="flex justify-between">
            <div class="w-1/3 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
            <div class="w-1/3 h-1 bg-gradient-to-r from-purple-500 to-green-500 rounded-full"></div>
          </div>
        </div>

        <div class="grid lg:grid-cols-3 gap-12">
          <div
              v-for="(step, index) in steps"
              :key="step.id"
              :data-aos="'fade-up'"
              :data-aos-delay="index * 300"
              class="relative text-center group"
          >
            <!-- Carte principale -->
            <div class="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 border border-gray-100">
              <!-- Numéro de l'étape -->
              <div class="relative inline-flex items-center justify-center mb-8">
                <div class="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-all duration-300">
                  <i :class="step.icon" class="text-3xl text-white"></i>
                </div>
                <div class="absolute -top-2 -right-2 w-10 h-10 bg-gradient-to-r from-green-400 to-green-600 text-white rounded-full flex items-center justify-center text-lg font-bold shadow-lg">
                  {{ index + 1 }}
                </div>
              </div>

              <!-- Contenu -->
              <h3 class="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                {{ step.title }}
              </h3>
              <p class="text-gray-600 leading-relaxed mb-6">{{ step.description }}</p>

              <!-- Statistiques de l'étape -->
              <div class="bg-gray-50 rounded-2xl p-4 mb-6">
                <div class="grid grid-cols-2 gap-4 text-sm">
                  <div class="text-center">
                    <div class="font-bold text-blue-600">{{ step.stat1.value }}</div>
                    <div class="text-gray-500">{{ step.stat1.label }}</div>
                  </div>
                  <div class="text-center">
                    <div class="font-bold text-green-600">{{ step.stat2.value }}</div>
                    <div class="text-gray-500">{{ step.stat2.label }}</div>
                  </div>
                </div>
              </div>

              <!-- Bouton d'action -->
              <button
                  @click="handleStepAction(step.id)"
                  :class="step.buttonClass"
                  class="w-full py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105"
              >
                <i :class="step.buttonIcon" class="mr-2"></i>
                {{ step.buttonText }}
              </button>
            </div>

            <!-- Indicateur de progression mobile -->
            <div v-if="index < steps.length - 1" class="lg:hidden flex justify-center mt-8">
              <div class="w-1 h-12 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Section avantages du processus -->
      <div class="bg-white rounded-3xl p-12 shadow-xl mb-20" data-aos="zoom-in">
        <div class="text-center mb-12">
          <h3 class="text-3xl font-bold text-gray-900 mb-4">Pourquoi notre processus est-il si efficace ?</h3>
          <p class="text-gray-600 max-w-2xl mx-auto">
            Découvrez les avantages qui font la différence dans votre expérience d'investissement
          </p>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div v-for="advantage in processAdvantages" :key="advantage.title"
               class="text-center group hover:bg-blue-50 p-6 rounded-2xl transition-all duration-300">
            <div class="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
              <i :class="advantage.icon" class="text-2xl text-white"></i>
            </div>
            <h4 class="font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">{{ advantage.title }}</h4>
            <p class="text-sm text-gray-600">{{ advantage.description }}</p>
          </div>
        </div>
      </div>

      <!-- CTA avec démonstration -->
      <div class="text-center mb-20" data-aos="fade-up" data-aos-delay="600">
        <div class="bg-gradient-to-r from-blue-600 to-purple-700 rounded-3xl p-12 text-white relative overflow-hidden">
          <!-- Éléments décoratifs -->
          <div class="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full transform translate-x-32 -translate-y-32"></div>
          <div class="absolute bottom-0 left-0 w-48 h-48 bg-white opacity-5 rounded-full transform -translate-x-24 translate-y-24"></div>

          <div class="relative z-10">
            <h3 class="text-3xl font-bold mb-4">Prêt à commencer votre parcours d'investisseur ?</h3>
            <p class="text-blue-100 mb-8 max-w-2xl mx-auto text-lg">
              Rejoignez plus de 2,500 investisseurs qui ont déjà fait le choix de l'innovation
            </p>

            <div class="flex flex-col sm:flex-row items-center justify-center gap-6 mb-8">
              <NuxtLink to="/auth/register"
                        class="bg-white text-blue-600 px-8 py-4 rounded-xl font-bold hover:bg-gray-100 transition-colors transform hover:scale-105 flex items-center">
                <i class="fas fa-rocket mr-2"></i>
                Commencer maintenant
              </NuxtLink>

              <button @click="scrollToSection('domaines')"
                      class="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 rounded-xl font-bold transition-all duration-300 transform hover:scale-105 flex items-center">
                <i class="fas fa-eye mr-2"></i>
                Voir les opportunités
              </button>
            </div>

            <!-- Témoignage rapide -->
            <div class="inline-flex items-center space-x-4 bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl px-6 py-4">
              <div class="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <i class="fas fa-quote-left text-xl"></i>
              </div>
              <div class="text-left">
                <div class="font-semibold">"En 3 clics, j'ai investi dans l'IA. Génial !"</div>
                <div class="text-sm text-blue-200">Marie D., investisseuse depuis 2023</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Statistiques de confiance -->
      <div class="mt-20 pt-16 border-t border-gray-200">
        <div class="text-center mb-12" data-aos="fade-up">
          <h3 class="text-3xl font-bold text-gray-900 mb-4">Ils nous font déjà confiance</h3>
          <p class="text-gray-600">Une communauté d'investisseurs en constante croissance</p>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-4 gap-8" data-aos="fade-up" data-aos-delay="200">
          <div v-for="stat in trustStats" :key="stat.label"
               class="text-center group">
            <div class="text-4xl font-bold mb-2 transition-colors duration-300" :class="stat.colorClass">
              <AnimatedCounter :value="stat.numericValue" :suffix="stat.suffix" />
            </div>
            <div class="text-sm text-gray-600">{{ stat.label }}</div>
            <div class="w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mx-auto mt-2 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
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
    buttonClass: 'bg-purple-600 text-white hover:bg-purple-700'
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
    buttonClass: 'bg-green-600 text-white hover:bg-green-700'
  }
]

const processAdvantages = [
  {
    icon: 'fas fa-zap',
    title: 'Ultra rapide',
    description: 'Investissement en moins de 5 minutes'
  },
  {
    icon: 'fas fa-shield-check',
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
    colorClass: 'text-green-600'
  },
  {
    label: 'Taux de satisfaction',
    numericValue: 98,
    suffix: '%',
    colorClass: 'text-purple-600'
  },
  {
    label: 'Capital investi',
    numericValue: 189,
    suffix: 'M€',
    colorClass: 'text-orange-600'
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