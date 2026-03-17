<template>
  <section id="trust" class="py-14 bg-white border-b border-slate-100">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="text-center mb-10" data-reveal>
        <p class="text-slate-400 text-sm font-semibold uppercase tracking-widest">
          {{ $t('trust.partners') }}
        </p>
      </div>

      <!-- Partner logos -->
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 items-center mb-12">
        <div
          v-for="(partner, index) in partners"
          :key="partner.name"
          data-reveal
          :data-reveal-delay="String(index * 100)"
          class="flex justify-center items-center h-14"
        >
          <div class="bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 w-full h-full flex items-center justify-center hover:border-slate-200 hover:shadow-sm transition-all duration-200">
            <span class="text-slate-500 font-semibold text-xs text-center leading-tight">{{ partner.name }}</span>
          </div>
        </div>
      </div>

      <!-- Certifications -->
      <div class="grid md:grid-cols-3 gap-5" data-reveal data-reveal-delay="300">
        <div
          v-for="cert in certifications"
          :key="cert.key"
          class="text-center p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:shadow-sm transition-all duration-200"
        >
          <div class="w-12 h-12 bg-blue-50 border border-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
            <i :class="cert.icon" class="text-lg text-blue-600"></i>
          </div>
          <h3 class="font-bold text-slate-900 text-sm mb-1.5">{{ $t(cert.titleKey) }}</h3>
          <p class="text-xs text-slate-500 leading-relaxed">{{ $t(cert.descKey) }}</p>
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
    key: 'security',
    icon: 'fas fa-shield-alt',
    titleKey: 'trust.security',
    descKey: 'trust.securityDesc'
  },
  {
    key: 'regulated',
    icon: 'fas fa-university',
    titleKey: 'trust.regulated',
    descKey: 'trust.regulatedDesc'
  },
  {
    key: 'protected',
    icon: 'fas fa-lock',
    titleKey: 'trust.protected',
    descKey: 'trust.protectedDesc'
  }
]
</script>
