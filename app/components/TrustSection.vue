<template>
  <section class="py-14 bg-white border-b border-slate-100">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- En-tête -->
      <div class="text-center mb-10" data-aos="fade-up">
        <p class="text-slate-500 text-sm font-medium">
          Ils nous font confiance
        </p>
      </div>

      <!-- Logos des partenaires -->
      <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 items-center mb-12">
        <div
            v-for="(partner, index) in partners"
            :key="partner.name"
            :data-aos="'fade-up'"
            :data-aos-delay="index * 100"
            class="flex justify-center items-center h-16 grayscale hover:grayscale-0 transition-all duration-300 hover:scale-105"
        >
          <div class="bg-slate-50 border border-slate-100 rounded-xl p-3 w-full h-full flex items-center justify-center">
            <div class="text-slate-500 font-semibold text-sm">{{ partner.name }}</div>
          </div>
        </div>
      </div>

      <!-- Certifications et sécurité -->
      <div class="grid md:grid-cols-3 gap-5" data-aos="fade-up" data-aos-delay="600">
        <div v-for="cert in certifications" :key="cert.title" class="text-center p-5">
          <div class="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mx-auto mb-3">
            <i :class="cert.icon" class="text-lg text-blue-600"></i>
          </div>
          <h3 class="font-bold text-slate-900 text-sm mb-1.5">{{ cert.title }}</h3>
          <p class="text-xs text-slate-500">{{ cert.description }}</p>
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
