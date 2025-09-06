<template>
  <section id="comment" class="py-20 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- En-tête -->
      <div class="text-center mb-16" data-aos="fade-up">
        <h2 class="section-title">Comment ça marche ?</h2>
        <p class="section-description">
          Trois étapes simples pour commencer à investir dans l'innovation
        </p>
      </div>

      <!-- Étapes -->
      <div class="grid lg:grid-cols-3 gap-12 mb-16">
        <div
            v-for="(step, index) in steps"
            :key="step.id"
            :data-aos="'fade-up'"
            :data-aos-delay="index * 200"
            class="relative text-center group"
        >
          <!-- Ligne de connexion (sauf pour le dernier) -->
          <div v-if="index < steps.length - 1" class="hidden lg:block absolute top-12 left-1/2 w-full h-0.5 bg-gradient-to-r from-blue-200 to-transparent transform translate-x-8 z-0"></div>

          <div class="relative z-10">
            <!-- Icône avec numéro -->
            <div class="relative inline-flex items-center justify-center mb-6">
              <div class="w-24 h-24 bg-gradient-to-r from-blue-100 to-blue-50 rounded-full flex items-center justify-center group-hover:scale-110 transition-all duration-300 shadow-lg">
                <i :class="step.icon" class="text-3xl text-blue-600"></i>
              </div>
              <!-- Numéro de l'étape -->
              <div class="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-full flex items-center justify-center text-sm font-bold shadow-lg">
                {{ index + 1 }}
              </div>
            </div>

            <!-- Contenu -->
            <h3 class="text-xl font-bold text-gray-900 mb-4">{{ step.title }}</h3>
            <p class="text-gray-600 leading-relaxed">{{ step.description }}</p>
          </div>
        </div>
      </div>

      <!-- CTA -->
      <div class="text-center" data-aos="fade-up" data-aos-delay="600">
        <div class="inline-flex flex-col sm:flex-row items-center gap-4">
          <NuxtLink to="/auth/register" class="btn-primary">
            <i class="fas fa-play mr-2"></i>
            Commencer maintenant
          </NuxtLink>
          <span class="text-gray-500">ou</span>
          <a href="#domaines" class="text-blue-600 hover:text-blue-700 font-medium transition-colors">
            Découvrir nos secteurs
            <i class="fas fa-arrow-down ml-1"></i>
          </a>
        </div>
      </div>

      <!-- Statistiques de confiance -->
      <div class="mt-20 pt-16 border-t border-gray-200">
        <div class="text-center mb-12" data-aos="fade-up">
          <h3 class="text-2xl font-bold text-gray-900 mb-4">Ils nous font confiance</h3>
          <p class="text-gray-600">Rejoignez une communauté d'investisseurs engagés</p>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-4 gap-8" data-aos="fade-up" data-aos-delay="200">
          <div v-for="stat in trustStats" :key="stat.label" class="text-center">
            <div class="text-3xl font-bold text-blue-600 mb-2">{{ stat.value }}</div>
            <div class="text-sm text-gray-600">{{ stat.label }}</div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const steps = [
  {
    id: 1,
    icon: 'fas fa-user-plus',
    title: 'Créez votre compte',
    description: 'Inscription simple et sécurisée en quelques minutes. Aucun frais d\'ouverture de compte.'
  },
  {
    id: 2,
    icon: 'fas fa-search',
    title: 'Choisissez vos investissements',
    description: 'Explorez nos secteurs d\'avenir et sélectionnez les projets qui correspondent à vos objectifs.'
  },
  {
    id: 3,
    icon: 'fas fa-chart-line',
    title: 'Suivez vos performances',
    description: 'Surveillez vos investissements en temps réel et recevez vos dividendes automatiquement.'
  }
]

const trustStats = [
  { value: '2,500+', label: 'Investisseurs actifs' },
  { value: '156', label: 'Projets financés' },
  { value: '18%', label: 'ROI moyen' },
  { value: '189M€', label: 'Investis à ce jour' }
]
</script>