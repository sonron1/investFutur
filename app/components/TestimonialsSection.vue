<template>
  <section class="py-20 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- En-tête -->
      <div class="text-center mb-16" data-aos="fade-up">
        <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Ce que disent nos investisseurs
        </h2>
        <p class="text-xl text-gray-600 max-w-3xl mx-auto">
          Découvrez les témoignages de ceux qui nous font confiance pour leurs investissements
        </p>
      </div>

      <!-- Témoignages en grille -->
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        <div
            v-for="(testimonial, index) in testimonials"
            :key="testimonial.id"
            :data-aos="'fade-up'"
            :data-aos-delay="index * 200"
            class="bg-gray-50 rounded-2xl p-8 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
        >
          <!-- Étoiles -->
          <div class="flex mb-4">
            <i v-for="star in 5" :key="star" class="fas fa-star text-yellow-400 text-sm mr-1"></i>
          </div>

          <!-- Témoignage -->
          <blockquote class="text-gray-700 mb-6 italic leading-relaxed">
            "{{ testimonial.content }}"
          </blockquote>

          <!-- Auteur -->
          <div class="flex items-center">
            <div class="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
              {{ testimonial.author.charAt(0) }}
            </div>
            <div>
              <div class="font-semibold text-gray-900">{{ testimonial.author }}</div>
              <div class="text-sm text-gray-600">{{ testimonial.role }}</div>
              <div class="text-sm text-green-600">ROI: +{{ testimonial.roi }}%</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Section vidéo témoignage -->
      <div class="bg-gradient-to-r from-blue-600 to-purple-700 rounded-3xl p-12 text-white text-center" data-aos="zoom-in">
        <h3 class="text-2xl font-bold mb-4">Témoignage vidéo</h3>
        <p class="text-blue-100 mb-8 max-w-2xl mx-auto">
          Découvrez l'expérience complète de nos investisseurs à travers cette vidéo exclusive
        </p>
        <div class="relative max-w-2xl mx-auto">
          <div class="bg-gray-800 bg-opacity-50 rounded-2xl aspect-video flex items-center justify-center">
            <button class="w-20 h-20 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110">
              <i class="fas fa-play text-3xl text-white ml-1"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const testimonials = [
  {
    id: 1,
    content: "Grâce à InvestFuture, j'ai pu diversifier mon portefeuille dans les technologies vertes. Le ROI dépasse mes attentes !",
    author: "Marie Dubois",
    role: "Cadre supérieure",
    roi: 28.5
  },
  {
    id: 2,
    content: "Interface intuitive et transparence totale sur les investissements. Je recommande vivement cette plateforme.",
    author: "Pierre Martin",
    role: "Entrepreneur",
    roi: 24.2
  },
  {
    id: 3,
    content: "Les équipes sont très professionnelles et m'accompagnent dans mes choix d'investissement. Excellent service !",
    author: "Sophie Leroy",
    role: "Consultante",
    roi: 31.8
  },
  {
    id: 4,
    content: "En 2 ans, j'ai triplé mes gains grâce aux secteurs innovants proposés. Une vraie réussite !",
    author: "Thomas Bernard",
    role: "Ingénieur",
    roi: 42.1
  },
  {
    id: 5,
    content: "La diversification proposée m'a permis de sécuriser mes investissements tout en optimisant les rendements.",
    author: "Catherine Moreau",
    role: "Directrice financière",
    roi: 26.9
  },
  {
    id: 6,
    content: "Investir dans l'innovation n'a jamais été aussi simple. Plateforme sécurisée et performante !",
    author: "Julien Rousseau",
    role: "Chef de projet",
    roi: 35.4
  }
]
</script>