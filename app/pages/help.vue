<template>
  <div class="min-h-screen bg-gray-50 py-20">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-12">
        <h1 class="text-4xl font-bold text-gray-900 mb-4">Centre d'Aide</h1>
        <p class="text-xl text-gray-600">Trouvez rapidement les réponses à vos questions</p>
      </div>

      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div v-for="category in helpCategories" :key="category.title"
             class="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
          <div class="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mb-4">
            <i :class="category.icon" class="text-xl text-white"></i>
          </div>
          <h3 class="text-xl font-bold text-gray-900 mb-4">{{ category.title }}</h3>
          <ul class="space-y-2">
            <li v-for="item in category.items" :key="item">
              <a href="#" class="text-gray-600 hover:text-blue-600 transition-colors">
                {{ item }}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div class="text-center mt-12">
        <h3 class="text-2xl font-bold text-gray-900 mb-4">Besoin d'une aide personnalisée ?</h3>
        <NuxtLink to="/#contact" class="btn-primary">
          <i class="fas fa-headset mr-2"></i>
          Contacter le support
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
useSeoMeta({
  title: 'Centre d\'Aide - InvestFuture',
  description: 'Centre d\'aide et support client InvestFuture'
})

const helpCategories = [
  {
    title: 'Premiers pas',
    icon: 'fas fa-play',
    items: ['Créer un compte', 'Vérifier son identité', 'Premier investissement']
  },
  {
    title: 'Investissements',
    icon: 'fas fa-chart-line',
    items: ['Comment investir ?', 'Montants minimum', 'Suivi des investissements']
  },
  {
    title: 'Compte & Sécurité',
    icon: 'fas fa-shield-alt',
    items: ['Sécuriser son compte', 'Modifier ses informations', 'Récupérer son mot de passe']
  }
]
</script>