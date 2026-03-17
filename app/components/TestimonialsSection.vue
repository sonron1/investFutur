<template>
  <section class="py-20 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="text-center mb-12" data-reveal>
        <div class="section-tag justify-center">
          <i class="fas fa-star"></i>
          {{ $t('testimonials.tag') }}
        </div>
        <h2 class="section-title mb-4">
          {{ $t('testimonials.title') }}
        </h2>
        <p class="section-sub">
          {{ $t('testimonials.subtitle') }}
        </p>
      </div>

      <!-- Testimonials grid -->
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
        <div
          v-for="(testimonial, index) in testimonials"
          :key="testimonial.id"
          data-reveal
          :data-reveal-delay="String((index % 3) * 100)"
          class="bg-slate-50 rounded-2xl border border-slate-100 p-6 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
        >
          <!-- Stars -->
          <div class="flex mb-3">
            <i v-for="star in 5" :key="star" class="fas fa-star text-amber-400 text-xs mr-0.5"></i>
          </div>

          <!-- Quote -->
          <blockquote class="text-slate-600 mb-5 text-sm leading-relaxed">
            "{{ testimonial.content }}"
          </blockquote>

          <!-- Author -->
          <div class="flex items-center pt-4 border-t border-slate-200">
            <div class="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-sm mr-3 flex-shrink-0">
              {{ testimonial.author.charAt(0) }}
            </div>
            <div>
              <div class="font-semibold text-slate-900 text-sm">{{ testimonial.author }}</div>
              <div class="text-xs text-slate-500">{{ testimonial.role }}</div>
              <div class="text-xs text-emerald-600 font-medium mt-0.5">ROI: +{{ testimonial.roi }}%</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Video testimonial CTA -->
      <div class="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 md:p-10 text-white text-center" data-reveal>
        <div class="text-blue-200 text-xs font-semibold uppercase tracking-wider mb-3">{{ $t('testimonials.tag') }}</div>
        <h3 class="text-xl font-bold mb-3">{{ $t('testimonials.videoTitle') }}</h3>
        <p class="text-blue-100 text-sm mb-7 max-w-xl mx-auto">
          {{ $t('testimonials.videoDesc') }}
        </p>
        <div class="relative max-w-2xl mx-auto">
          <div class="bg-slate-900/50 rounded-xl aspect-video flex items-center justify-center">
            <button class="w-16 h-16 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110">
              <i class="fas fa-play text-xl text-white ml-1"></i>
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
    content: "Grâce à InvestFutur, j'ai pu diversifier mon portefeuille dans les technologies vertes. Le ROI dépasse mes attentes !",
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
