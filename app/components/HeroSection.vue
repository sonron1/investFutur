<template>
  <section id="home" class="relative min-h-screen flex items-center bg-gradient-to-br from-blue-50 to-indigo-100">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div class="grid lg:grid-cols-2 gap-12 items-center">
        <!-- Contenu textuel -->
        <div data-aos="fade-right" class="space-y-8">
          <h1 class="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
            Investissez dans les
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">entreprises de demain</span>
          </h1>

          <p class="text-xl text-gray-600 leading-relaxed">
            ROI moyen de <strong class="text-green-600">18%</strong> • Minimum <strong class="text-blue-600">5 000€</strong>
          </p>

          <!-- Statistiques -->
          <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div v-for="stat in stats" :key="stat.label" class="text-center">
              <div class="text-2xl font-bold" :class="stat.colorClass">{{ stat.value }}</div>
              <div class="text-sm text-gray-500">{{ stat.label }}</div>
            </div>
          </div>

          <!-- Boutons d'action -->
          <div class="flex flex-col sm:flex-row gap-4">
            <NuxtLink to="/auth/register" class="btn-primary text-center">
              Commencer maintenant
            </NuxtLink>
            <a href="#comment" class="btn-outline text-center">
              En savoir plus
            </a>
          </div>
        </div>

        <!-- Image -->
        <div data-aos="fade-left" class="relative">
          <div class="relative z-10">
            <img
                src="/images/heureuse femme.jpeg"
                alt="Investissement"
                class="rounded-2xl shadow-2xl w-full h-auto"
                @error="handleImageError"
            >
          </div>
          <!-- Élément décoratif -->
          <div class="absolute top-4 right-4 w-72 h-72 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const stats = [
  { value: '189M€', label: 'Investis', colorClass: 'text-blue-600' },
  { value: '18%', label: 'ROI moyen', colorClass: 'text-green-600' },
  { value: '2547', label: 'Investisseurs', colorClass: 'text-yellow-600' },
  { value: '156', label: 'Projets', colorClass: 'text-purple-600' }
]

const handleImageError = (event) => {
  event.target.src = 'https://images.unsplash.com/photo-1580519542036-c47de6196ba5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
}
</script>