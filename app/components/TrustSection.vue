<template>
  <section class="py-16 bg-white border-b border-gray-100">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- En-tête -->
      <div class="text-center mb-12" data-aos="fade-up">
        <p class="text-lg text-gray-600 font-medium mb-8">
          Ils nous font confiance
        </p>
      </div>

      <!-- Logos des partenaires -->
      <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center opacity-70">
        <div
            v-for="(partner, index) in partners"
            :key="partner.name"
            :data-aos="'fade-up'"
            :data-aos-delay="index * 100"
            class="flex justify-center items-center h-20 grayscale hover:grayscale-0 transition-all duration-300 hover:scale-105"
        >
          <div class="bg-gray-100 rounded-lg p-4 w-full h-full flex items-center justify-center">
            <div class="text-gray-600 font-bold text-lg">{{ partner.name }}</div>
          </div>
        </div>
      </div>

      <!-- Certifications et sécurité -->
      <div class="mt-16 grid md:grid-cols-3 gap-8" data-aos="fade-up" data-aos-delay="600">
        <div v-for="cert in certifications" :key="cert.title" class="text-center">
          <div class="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <i :class="cert.icon" class="text-2xl text-blue-600"></i>
          </div>
          <h3 class="font-semibold text-gray-900 mb-2">{{ cert.title }}</h3>
          <p class="text-sm text-gray-600">{{ cert.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const partners = [
  { name: 'BNP Paribas' },
  { name: 'Société Générale' },
  { name: 'Crédit Agricole' },
  { name: 'BPCE' },
  { name: 'Caisse d\'Épargne' },
  { name: 'Crédit Mutuel' }
]

const certifications = [
  {
    icon: 'fas fa-shield-alt',
    title: 'Sécurité certifiée',
    description: 'Cryptage SSL 256-bits et conformité RGPD'
  },
  {
    icon: 'fas fa-university',
    title: 'Régulé AMF',
    description: 'Autorisé par l\'Autorité des Marchés Financiers'
  },
  {
    icon: 'fas fa-lock',
    title: 'Fonds protégés',
    description: 'Garantie de dépôt jusqu\'à 100 000€'
  }
]
</script>