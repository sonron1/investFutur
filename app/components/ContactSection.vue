<template>
  <section id="contact" class="py-20 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- En-tête -->
      <div class="text-center mb-16" data-aos="fade-up">
        <h2 class="section-title">Nous contacter</h2>
        <p class="section-description">
          Notre équipe d'experts est à votre disposition
        </p>
      </div>

      <!-- Cartes de contact -->
      <div class="max-w-4xl mx-auto">
        <div class="grid md:grid-cols-3 gap-8">
          <div
              v-for="(contact, index) in contactInfo"
              :key="contact.title"
              :data-aos="'fade-up'"
              :data-aos-delay="index * 100"
              class="group"
          >
            <div class="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 text-center h-full">
              <div class="w-16 h-16 bg-gradient-to-r from-blue-100 to-blue-50 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <i :class="contact.icon" class="text-2xl text-blue-600"></i>
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-3">{{ contact.title }}</h3>
              <p class="text-gray-600 leading-relaxed">{{ contact.info }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Section CTA -->
      <div class="text-center mt-16" data-aos="fade-up" data-aos-delay="300">
        <div class="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-white">
          <h3 class="text-2xl font-bold mb-4">Prêt à commencer ?</h3>
          <p class="text-blue-100 mb-6 max-w-2xl mx-auto">
            Rejoignez des milliers d'investisseurs qui font confiance à InvestFuture pour leurs investissements.
          </p>
          <NuxtLink to="/auth/register" class="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-xl hover:bg-gray-50 transition-colors duration-300">
            <i class="fas fa-rocket mr-2"></i>
            Créer mon compte gratuitement
          </NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const contactInfo = [
  {
    icon: 'fas fa-phone',
    title: 'Téléphone',
    info: '+33 1 23 45 67 89'
  },
  {
    icon: 'fas fa-envelope',
    title: 'Email',
    info: 'contact@investfuture.com'
  },
  {
    icon: 'fas fa-map-marker-alt',
    title: 'Adresse',
    info: '75008 Paris, France'
  }
]
</script>