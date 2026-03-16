
<template>
  <div class="min-h-screen bg-slate-50">
    <!-- Hero Section -->
    <section class="pt-20 pb-14">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center" data-aos="fade-up">
          <div class="inline-flex items-center space-x-2 bg-blue-50 border border-blue-100 rounded-full px-4 py-1.5 mb-5">
            <div class="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"></div>
            <span class="text-xs font-semibold text-blue-700">À propos d'InvestFuture</span>
          </div>

          <h1 class="text-4xl md:text-5xl font-bold text-slate-900 mb-5">
            Notre
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              Mission
            </span>
          </h1>

          <p class="text-slate-500 max-w-2xl mx-auto leading-relaxed mb-10">
            InvestFuture est né de la conviction que chaque investisseur devrait avoir accès
            aux meilleures opportunités d'innovation pour construire un avenir durable.
          </p>

          <!-- Stats rapides -->
          <div class="grid grid-cols-2 md:grid-cols-4 gap-5 max-w-3xl mx-auto">
            <div v-for="stat in quickStats" :key="stat.label" class="text-center bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
              <div class="text-2xl font-black mb-1" :class="stat.colorClass">
                {{ stat.value }}
              </div>
              <div class="text-xs text-slate-500">{{ stat.label }}</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Notre Histoire -->
    <section class="py-16 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid lg:grid-cols-2 gap-14 items-center">
          <div data-aos="fade-right">
            <div class="text-blue-600 text-sm font-semibold uppercase tracking-wider mb-3">Origines</div>
            <h2 class="text-2xl font-bold text-slate-900 mb-5">Notre Histoire</h2>
            <div class="space-y-4 text-slate-500 text-sm leading-relaxed">
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
              <div class="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl transform rotate-2 opacity-60"></div>
              <img
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                  alt="Notre équipe"
                  class="relative rounded-2xl shadow-xl transform -rotate-2 transition-transform duration-500 hover:rotate-0"
              >
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Nos Valeurs -->
    <section class="py-16 bg-slate-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12" data-aos="fade-up">
          <div class="text-blue-600 text-sm font-semibold uppercase tracking-wider mb-3">Principes</div>
          <h2 class="text-2xl font-bold text-slate-900 mb-3">Nos Valeurs</h2>
          <p class="text-slate-500 max-w-xl mx-auto text-sm">
            Les principes qui guident notre action au quotidien
          </p>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          <div v-for="(value, index) in values" :key="value.title"
               :data-aos="'fade-up'"
               :data-aos-delay="index * 100"
               class="bg-white rounded-2xl border border-slate-100 p-6 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
            <div class="w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center mb-4 shadow-sm">
              <i :class="value.icon" class="text-lg text-white"></i>
            </div>
            <h3 class="text-base font-bold text-slate-900 mb-2">{{ value.title }}</h3>
            <p class="text-slate-500 text-sm leading-relaxed">{{ value.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Notre Équipe -->
    <section class="py-16 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12" data-aos="fade-up">
          <div class="text-blue-600 text-sm font-semibold uppercase tracking-wider mb-3">Team</div>
          <h2 class="text-2xl font-bold text-slate-900 mb-3">Notre Équipe</h2>
          <p class="text-slate-500 max-w-xl mx-auto text-sm">
            Des experts passionnés à votre service
          </p>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div v-for="(member, index) in team" :key="member.name"
               :data-aos="'fade-up'"
               :data-aos-delay="index * 150"
               class="text-center group bg-slate-50 rounded-2xl border border-slate-100 p-6 hover:shadow-md transition-all duration-200">
            <div class="relative mb-5 inline-block">
              <div class="w-24 h-24 mx-auto rounded-2xl overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-600 p-0.5">
                <div class="w-full h-full rounded-xl bg-slate-100 flex items-center justify-center">
                  <i class="fas fa-user text-3xl text-slate-400"></i>
                </div>
              </div>
            </div>
            <h3 class="text-base font-bold text-slate-900 mb-1">{{ member.name }}</h3>
            <p class="text-blue-600 font-semibold text-sm mb-3">{{ member.role }}</p>
            <p class="text-slate-500 text-xs leading-relaxed">{{ member.bio }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Final -->
    <section class="py-14 bg-gradient-to-r from-blue-600 to-indigo-600">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center" data-aos="fade-up">
        <h2 class="text-2xl font-bold text-white mb-3">
          Prêt à investir dans l'avenir ?
        </h2>
        <p class="text-blue-100 mb-7 max-w-xl mx-auto text-sm">
          Rejoignez notre communauté d'investisseurs et participez au financement de l'innovation durable.
        </p>
        <div class="flex flex-col sm:flex-row items-center justify-center gap-3">
          <NuxtLink to="/auth/register"
                    class="bg-white text-blue-600 px-7 py-3 rounded-lg font-bold hover:bg-slate-50 transition-colors text-sm shadow-sm">
            <i class="fas fa-user-plus mr-2"></i>
            Créer un compte
          </NuxtLink>
          <NuxtLink to="/#contact"
                    class="border border-white/40 text-white hover:bg-white/10 px-7 py-3 rounded-lg font-semibold transition-colors text-sm">
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
  { value: '2,500+', label: 'Investisseurs', colorClass: 'text-emerald-600' },
  { value: '189M€', label: 'Investis', colorClass: 'text-indigo-600' },
  { value: '22.3%', label: 'ROI moyen', colorClass: 'text-amber-600' }
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
