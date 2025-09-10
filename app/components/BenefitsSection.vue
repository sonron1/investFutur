<template>
  <section class="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- En-tête -->
      <div class="text-center mb-16" data-aos="fade-up">
        <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Pourquoi choisir InvestFuture ?
        </h2>
        <p class="text-xl text-gray-600 max-w-3xl mx-auto">
          Découvrez tous les avantages de notre plateforme d'investissement innovante
        </p>
      </div>

      <!-- Grille des avantages -->
      <div class="grid lg:grid-cols-2 gap-16 items-center mb-20">
        <!-- Côté gauche - Avantages -->
        <div class="space-y-8">
          <div
              v-for="(benefit, index) in benefits"
              :key="benefit.id"
              :data-aos="'fade-right'"
              :data-aos-delay="index * 200"
              class="flex items-start space-x-4"
          >
            <div class="flex-shrink-0 w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <i :class="benefit.icon" class="text-2xl text-white"></i>
            </div>
            <div>
              <h3 class="text-xl font-bold text-gray-900 mb-2">{{ benefit.title }}</h3>
              <p class="text-gray-600 leading-relaxed">{{ benefit.description }}</p>
              <div v-if="benefit.stats" class="mt-2 text-sm text-blue-600 font-semibold">
                {{ benefit.stats }}
              </div>
            </div>
          </div>
        </div>

        <!-- Côté droit - Image/Graphique -->
        <div data-aos="fade-left" class="relative">
          <div class="bg-white rounded-3xl p-8 shadow-2xl">
            <h4 class="text-2xl font-bold text-gray-900 mb-6">Performance comparative</h4>

            <!-- Graphique comparatif -->
            <div class="space-y-4">
              <div v-for="comparison in performanceComparison" :key="comparison.label" class="space-y-2">
                <div class="flex justify-between">
                  <span class="text-gray-700 font-medium">{{ comparison.label }}</span>
                  <span class="font-bold" :class="comparison.colorClass">{{ comparison.value }}%</span>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-3">
                  <div
                      :class="comparison.bgClass"
                      class="h-3 rounded-full transition-all duration-1000"
                      :style="{ width: comparison.width + '%' }"
                  ></div>
                </div>
              </div>
            </div>

            <!-- Conclusion -->
            <div class="mt-8 p-4 bg-green-50 rounded-xl">
              <div class="flex items-center">
                <i class="fas fa-trophy text-green-600 text-2xl mr-3"></i>
                <div>
                  <div class="font-bold text-green-800">+8.5% de performance</div>
                  <div class="text-sm text-green-600">vs marchés traditionnels</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Section garanties et sécurité -->
      <div class="grid md:grid-cols-3 gap-8" data-aos="fade-up">
        <div v-for="guarantee in guarantees" :key="guarantee.title" class="bg-white rounded-2xl p-8 text-center shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div class="w-20 h-20 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <i :class="guarantee.icon" class="text-3xl text-white"></i>
          </div>
          <h3 class="text-xl font-bold text-gray-900 mb-4">{{ guarantee.title }}</h3>
          <p class="text-gray-600 mb-4">{{ guarantee.description }}</p>
          <div class="text-sm text-green-600 font-semibold">{{ guarantee.detail }}</div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const benefits = [
  {
    id: 1,
    icon: 'fas fa-chart-line',
    title: 'Rendements supérieurs',
    description: 'Nos algorithmes d\'IA sélectionnent les meilleures opportunités d\'investissement pour maximiser vos gains.',
    stats: 'ROI moyen: 22.3% vs 14% marché traditionnel'
  },
  {
    id: 2,
    icon: 'fas fa-shield-alt',
    title: 'Sécurité maximale',
    description: 'Vos fonds sont protégés par des technologies de cryptage avancées et des garanties bancaires.',
    stats: 'Garantie jusqu\'à 100 000€ par compte'
  },
  {
    id: 3,
    icon: 'fas fa-users',
    title: 'Accompagnement expert',
    description: 'Notre équipe de conseillers financiers vous guide dans vos choix d\'investissement.',
    stats: 'Disponible 7j/7 de 8h à 20h'
  },
  {
    id: 4,
    icon: 'fas fa-mobile-alt',
    title: 'Plateforme intuitive',
    description: 'Interface simple et moderne accessible depuis tous vos appareils pour investir en toute liberté.',
    stats: 'Application mobile 4.8★ sur les stores'
  }
]

const performanceComparison = [
  {
    label: 'InvestFuture',
    value: 22.3,
    width: 100,
    colorClass: 'text-blue-600',
    bgClass: 'bg-gradient-to-r from-blue-500 to-blue-600'
  },
  {
    label: 'CAC 40',
    value: 8.7,
    width: 39,
    colorClass: 'text-gray-600',
    bgClass: 'bg-gray-400'
  },
  {
    label: 'Livret A',
    value: 3.0,
    width: 13,
    colorClass: 'text-gray-600',
    bgClass: 'bg-gray-300'
  },
  {
    label: 'Immobilier',
    value: 6.2,
    width: 28,
    colorClass: 'text-gray-600',
    bgClass: 'bg-gray-400'
  }
]

const guarantees = [
  {
    icon: 'fas fa-certificate',
    title: 'Certifié AMF',
    description: 'Plateforme agréée et régulée par l\'Autorité des Marchés Financiers française.',
    detail: 'Agrément CIP n° 18000001'
  },
  {
    icon: 'fas fa-lock',
    title: 'Fonds sécurisés',
    description: 'Vos investissements sont protégés et séparés des fonds de la société.',
    detail: 'Comptes ségrégués chez BNP Paribas'
  },
  {
    icon: 'fas fa-handshake',
    title: 'Transparence totale',
    description: 'Accès complet aux informations financières et reporting détaillé mensuel.',
    detail: 'Rapports certifiés par PwC'
  }
]
</script>