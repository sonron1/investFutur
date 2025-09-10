
<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
    <!-- Hero Section -->
    <section class="pt-20 pb-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center" data-aos="fade-up">
          <div class="inline-flex items-center space-x-2 bg-blue-100 rounded-full px-4 py-2 mb-6">
            <div class="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
            <span class="text-sm font-medium text-blue-700">À propos d'InvestFuture</span>
          </div>

          <h1 class="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Notre
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              Mission
            </span>
          </h1>

          <p class="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-12">
            InvestFuture est né de la conviction que chaque investisseur devrait avoir accès
            aux meilleures opportunités d'innovation pour construire un avenir durable.
          </p>

          <!-- Stats rapides -->
          <div class="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div v-for="stat in quickStats" :key="stat.label" class="text-center">
              <div class="text-3xl font-bold mb-2" :class="stat.colorClass">
                {{ stat.value }}
              </div>
              <div class="text-sm text-gray-600">{{ stat.label }}</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Notre Histoire -->
    <section class="py-16 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid lg:grid-cols-2 gap-16 items-center">
          <div data-aos="fade-right">
            <h2 class="text-3xl font-bold text-gray-900 mb-6">Notre Histoire</h2>
            <div class="space-y-6 text-gray-600 leading-relaxed">
              <p>
                Fondée en 2020 par une équipe d'experts financiers et de technologues passionnés,
                InvestFuture est née d'un constat simple : les particuliers avaient difficilement
                accès aux investissements dans l'innovation.
              </p>
              <p>
                Nous avons créé une plateforme démocratique où chaque investisseur,
                qu'il soit débutant ou expérimenté, peut participer au financement des
                entreprises qui façonnent notre avenir.
              </p>
              <p>
                Aujourd'hui, nous sommes fiers d'accompagner plus de 2,500 investisseurs
                dans leurs décisions d'investissement responsable.
              </p>
            </div>
          </div>

          <div data-aos="fade-left">
            <div class="relative">
              <div class="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-3xl transform rotate-3"></div>
              <img
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                  alt="Notre équipe"
                  class="relative rounded-3xl shadow-2xl transform -rotate-3 transition-transform duration-500 hover:rotate-0"
              >
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Nos Valeurs -->
    <section class="py-16 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16" data-aos="fade-up">
          <h2 class="text-3xl font-bold text-gray-900 mb-6">Nos Valeurs</h2>
          <p class="text-xl text-gray-600 max-w-3xl mx-auto">
            Les principes qui guident notre action au quotidien
          </p>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div v-for="(value, index) in values" :key="value.title"
               :data-aos="'fade-up'"
               :data-aos-delay="index * 200"
               class="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
            <div class="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6">
              <i :class="value.icon" class="text-2xl text-white"></i>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-4">{{ value.title }}</h3>
            <p class="text-gray-600 leading-relaxed">{{ value.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Notre Équipe -->
    <section class="py-16 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16" data-aos="fade-up">
          <h2 class="text-3xl font-bold text-gray-900 mb-6">Notre Équipe</h2>
          <p class="text-xl text-gray-600 max-w-3xl mx-auto">
            Des experts passionnés à votre service
          </p>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div v-for="(member, index) in team" :key="member.name"
               :data-aos="'fade-up'"
               :data-aos-delay="index * 200"
               class="text-center group">
            <div class="relative mb-6">
              <div class="w-32 h-32 mx-auto rounded-full overflow-hidden bg-gradient-to-r from-blue-500 to-purple-600 p-1">
                <div class="w-full h-full rounded-full bg-gray-200 flex items-center justify-center">
                  <i class="fas fa-user text-4xl text-gray-400"></i>
                </div>
              </div>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-2">{{ member.name }}</h3>
            <p class="text-blue-600 font-semibold mb-4">{{ member.role }}</p>
            <p class="text-gray-600 text-sm leading-relaxed">{{ member.bio }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Final -->
    <section class="py-16 bg-gradient-to-r from-blue-600 to-purple-700">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center" data-aos="fade-up">
        <h2 class="text-3xl font-bold text-white mb-6">
          Prêt à investir dans l'avenir ?
        </h2>
        <p class="text-blue-100 mb-8 max-w-2xl mx-auto text-lg">
          Rejoignez notre communauté d'investisseurs et participez au financement de l'innovation durable.
        </p>
        <div class="flex flex-col sm:flex-row items-center justify-center gap-6">
          <NuxtLink to="/auth/register"
                    class="bg-white text-blue-600 px-8 py-4 rounded-xl font-bold hover:bg-gray-100 transition-colors transform hover:scale-105">
            <i class="fas fa-user-plus mr-2"></i>
            Créer un compte
          </NuxtLink>
          <NuxtLink to="/#contact"
                    class="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 rounded-xl font-bold transition-all duration-300 transform hover:scale-105">
            <i class="fas fa-envelope mr-2"></i>
            Nous contacter
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
useSeoMeta({
  title: 'À propos - InvestFuture',
  description: 'Découvrez l\'histoire, la mission et l\'équipe d\'InvestFuture, votre partenaire pour investir dans l\'innovation durable.'
})

const quickStats = [
  { value: '2020', label: 'Année de création', colorClass: 'text-blue-600' },
  { value: '2,500+', label: 'Investisseurs', colorClass: 'text-green-600' },
  { value: '189M€', label: 'Investis', colorClass: 'text-purple-600' },
  { value: '22.3%', label: 'ROI moyen', colorClass: 'text-orange-600' }
]

const values = [
  {
    title: 'Transparence',
    icon: 'fas fa-eye',
    description: 'Nous croyons en la transparence totale sur nos investissements, nos frais et nos performances.'
  },
  {
    title: 'Innovation',
    icon: 'fas fa-lightbulb',
    description: 'Nous sélectionnons les entreprises les plus innovantes dans les secteurs d\'avenir.'
  },
  {
    title: 'Durabilité',
    icon: 'fas fa-leaf',
    description: 'Chaque investissement contribue à construire un avenir plus durable et responsable.'
  },
  {
    title: 'Accessibilité',
    icon: 'fas fa-users',
    description: 'Nous démocratisons l\'accès aux investissements d\'innovation pour tous.'
  },
  {
    title: 'Excellence',
    icon: 'fas fa-star',
    description: 'Nous visons l\'excellence dans chaque aspect de notre service client.'
  },
  {
    title: 'Sécurité',
    icon: 'fas fa-shield-alt',
    description: 'La sécurité de vos investissements est notre priorité absolue.'
  }
]

const team = [
  {
    name: 'Sophie Dubois',
    role: 'CEO & Fondatrice',
    bio: '15 ans d\'expérience en finance d\'entreprise. Anciennement directrice chez Goldman Sachs.'
  },
  {
    name: 'Marc Laurent',
    role: 'CTO',
    bio: 'Expert en technologies financières et blockchain. Ancien tech lead chez Revolut.'
  },
  {
    name: 'Claire Martin',
    role: 'Head of Investments',
    bio: 'Spécialiste en capital-risque avec 12 ans d\'expérience chez Sequoia Capital.'
  }
]
</script>

<style scoped>
.bg-clip-text {
  -webkit-background-clip: text;
  background-clip: text;
}
</style>