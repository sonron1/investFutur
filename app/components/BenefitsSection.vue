<template>
  <section class="py-20 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- En-tête -->
      <div class="text-center mb-12" data-aos="fade-up">
        <div class="text-blue-600 text-sm font-semibold uppercase tracking-wider mb-3">Avantages</div>
        <h2 class="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
          Pourquoi choisir InvestFuture ?
        </h2>
        <p class="text-slate-500 max-w-2xl mx-auto">
          Découvrez tous les avantages de notre plateforme d'investissement innovante
        </p>
      </div>

      <!-- Grille des avantages -->
      <div class="grid lg:grid-cols-2 gap-12 items-center mb-16">
        <!-- Côté gauche - Avantages -->
        <div class="space-y-6">
          <div
              v-for="(benefit, index) in benefits"
              :key="benefit.id"
              :data-aos="'fade-right'"
              :data-aos-delay="index * 150"
              class="flex items-start space-x-4"
          >
            <div class="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-sm">
              <i :class="benefit.icon" class="text-lg text-white"></i>
            </div>
            <div>
              <h3 class="text-base font-bold text-slate-900 mb-1.5">{{ benefit.title }}</h3>
              <p class="text-slate-500 text-sm leading-relaxed">{{ benefit.description }}</p>
              <div v-if="benefit.stats" class="mt-1.5 text-xs text-blue-600 font-semibold">
                {{ benefit.stats }}
              </div>
            </div>
          </div>
        </div>

        <!-- Côté droit - Graphique -->
        <div data-aos="fade-left" class="relative">
          <div class="bg-slate-50 rounded-2xl border border-slate-100 p-7 shadow-sm">
            <div class="text-blue-600 text-xs font-semibold uppercase tracking-wider mb-1">Comparaison</div>
            <h4 class="text-lg font-bold text-slate-900 mb-6">Performance comparative</h4>

            <!-- Graphique comparatif -->
            <div class="space-y-4">
              <div v-for="comparison in performanceComparison" :key="comparison.label" class="space-y-1.5">
                <div class="flex justify-between">
                  <span class="text-slate-700 text-sm font-medium">{{ comparison.label }}</span>
                  <span class="font-bold text-sm" :class="comparison.colorClass">{{ comparison.value }}%</span>
                </div>
                <div class="w-full bg-slate-200 rounded-full h-2">
                  <div
                      :class="comparison.bgClass"
                      class="h-2 rounded-full transition-all duration-1000"
                      :style="{ width: comparison.width + '%' }"
                  ></div>
                </div>
              </div>
            </div>

            <!-- Conclusion -->
            <div class="mt-6 p-4 bg-emerald-50 rounded-xl border border-emerald-100">
              <div class="flex items-center">
                <i class="fas fa-trophy text-emerald-600 text-lg mr-3"></i>
                <div>
                  <div class="font-bold text-emerald-800 text-sm">+8.5% de performance</div>
                  <div class="text-xs text-emerald-600">vs marchés traditionnels</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Section garanties et sécurité -->
      <div class="grid md:grid-cols-3 gap-5" data-aos="fade-up">
        <div v-for="guarantee in guarantees" :key="guarantee.title" class="bg-slate-50 rounded-2xl border border-slate-100 p-6 text-center hover:shadow-md transition-shadow duration-200">
          <div class="w-14 h-14 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-sm">
            <i :class="guarantee.icon" class="text-xl text-white"></i>
          </div>
          <h3 class="text-base font-bold text-slate-900 mb-2.5">{{ guarantee.title }}</h3>
          <p class="text-slate-500 text-sm mb-3 leading-relaxed">{{ guarantee.description }}</p>
          <div class="text-xs text-emerald-600 font-semibold">{{ guarantee.detail }}</div>
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
    bgClass: 'bg-gradient-to-r from-blue-600 to-indigo-600'
  },
  {
    label: 'CAC 40',
    value: 8.7,
    width: 39,
    colorClass: 'text-slate-500',
    bgClass: 'bg-slate-400'
  },
  {
    label: 'Livret A',
    value: 3.0,
    width: 13,
    colorClass: 'text-slate-500',
    bgClass: 'bg-slate-300'
  },
  {
    label: 'Immobilier',
    value: 6.2,
    width: 28,
    colorClass: 'text-slate-500',
    bgClass: 'bg-slate-400'
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
