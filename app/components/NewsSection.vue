<template>
  <section class="py-20 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- En-tête -->
      <div class="text-center mb-16" data-aos="fade-up">
        <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Actualités et insights
        </h2>
        <p class="text-xl text-gray-600 max-w-3xl mx-auto">
          Restez informé des dernières tendances et opportunités d'investissement
        </p>
      </div>

      <!-- Articles principaux -->
      <div class="grid lg:grid-cols-2 gap-12 mb-16">
        <!-- Article principal -->
        <article
            data-aos="fade-right"
            class="group cursor-pointer"
        >
          <div class="relative overflow-hidden rounded-2xl mb-6">
            <img
                src="https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                alt="Intelligence Artificielle"
                class="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
            >
            <div class="absolute top-4 left-4">
              <span class="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">Tendance</span>
            </div>
            <div class="absolute bottom-4 right-4 bg-white bg-opacity-90 rounded-lg px-3 py-1">
              <span class="text-sm font-medium text-gray-700">5 min de lecture</span>
            </div>
          </div>
          <div class="space-y-3">
            <div class="flex items-center space-x-3 text-sm text-gray-500">
              <span>15 Novembre 2024</span>
              <span>•</span>
              <span>Intelligence Artificielle</span>
            </div>
            <h3 class="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
              L'IA générative révolutionne les investissements : +45% de croissance prévue
            </h3>
            <p class="text-gray-600 leading-relaxed">
              Découvrez comment l'intelligence artificielle transforme le paysage des investissements et pourquoi c'est le moment idéal pour investir dans ce secteur en pleine expansion.
            </p>
            <div class="flex items-center justify-between">
              <div class="flex items-center space-x-2">
                <div class="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                  A
                </div>
                <div>
                  <div class="font-semibold text-gray-900">Antoine Dubois</div>
                  <div class="text-sm text-gray-500">Analyste senior</div>
                </div>
              </div>
              <div class="text-green-600 font-semibold">ROI potentiel: +30%</div>
            </div>
          </div>
        </article>

        <!-- Liste d'articles secondaires -->
        <div class="space-y-8">
          <article
              v-for="(article, index) in secondaryArticles"
              :key="article.id"
              :data-aos="'fade-left'"
              :data-aos-delay="index * 200"
              class="flex space-x-4 group cursor-pointer"
          >
            <div class="flex-shrink-0">
              <img
                  :src="article.image"
                  :alt="article.title"
                  class="w-24 h-24 object-cover rounded-xl group-hover:scale-105 transition-transform duration-300"
              >
            </div>
            <div class="flex-1 space-y-2">
              <div class="flex items-center space-x-2 text-xs text-gray-500">
                <span>{{ article.date }}</span>
                <span>•</span>
                <span>{{ article.category }}</span>
              </div>
              <h4 class="font-bold text-gray-900 group-hover:text-blue-600 transition-colors leading-tight">
                {{ article.title }}
              </h4>
              <p class="text-sm text-gray-600 line-clamp-2">{{ article.excerpt }}</p>
              <div class="flex items-center justify-between">
                <span class="text-xs text-gray-500">{{ article.readTime }} min</span>
                <span class="text-sm font-semibold text-green-600">{{ article.roi }}</span>
              </div>
            </div>
          </article>
        </div>
      </div>

      <!-- Newsletter et CTA -->
      <div class="bg-gradient-to-r from-blue-600 to-purple-700 rounded-3xl p-12 text-white" data-aos="zoom-in">
        <div class="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h3 class="text-2xl font-bold mb-4">Newsletter InvestFuture</h3>
            <p class="text-blue-100 mb-6">
              Recevez chaque semaine nos analyses exclusives et les meilleures opportunités d'investissement directement dans votre boîte mail.
            </p>
            <div class="flex flex-col sm:flex-row gap-3">
              <input
                  type="email"
                  placeholder="Votre adresse email"
                  class="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-300"
              >
              <button class="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                S'abonner
              </button>
            </div>
          </div>
          <div class="text-center">
            <div class="inline-flex items-center space-x-4 text-blue-100">
              <div class="text-center">
                <div class="text-3xl font-bold">12K+</div>
                <div class="text-sm">Abonnés</div>
              </div>
              <div class="text-center">
                <div class="text-3xl font-bold">95%</div>
                <div class="text-sm">Satisfaction</div>
              </div>
              <div class="text-center">
                <div class="text-3xl font-bold">4.9★</div>
                <div class="text-sm">Note moyenne</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const secondaryArticles = [
  {
    id: 1,
    title: "Les biotechnologies explosent : +67% en 6 mois",
    excerpt: "Le secteur de la biotech connaît une croissance exceptionnelle. Analyse des meilleures opportunités.",
    image: "https://images.unsplash.com/photo-1582719471384-894fbb16e074?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
    date: "12 Nov 2024",
    category: "Biotechnologies",
    readTime: 3,
    roi: "ROI: +25%"
  },
  {
    id: 2,
    title: "Fintech : la révolution des paiements crypto",
    excerpt: "Comment les cryptomonnaies transforment le secteur financier et créent de nouvelles opportunités.",
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
    date: "10 Nov 2024",
    category: "Fintech",
    readTime: 4,
    roi: "ROI: +32%"
  },
  {
    id: 3,
    title: "Technologies vertes : l'avenir de l'énergie",
    excerpt: "Les énergies renouvelables attirent des investissements records. Focus sur les leaders du secteur.",
    image: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
    date: "8 Nov 2024",
    category: "Énergie verte",
    readTime: 5,
    roi: "ROI: +28%"
  },
  {
    id: 4,
    title: "E-commerce : les nouvelles stratégies gagnantes",
    excerpt: "Analyse des tendances qui façonnent l'avenir du commerce en ligne et leurs impacts sur les investissements.",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
    date: "5 Nov 2024",
    category: "E-commerce",
    readTime: 3,
    roi: "ROI: +18%"
  }
]
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>