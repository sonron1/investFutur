<template>
  <div class="overflow-x-hidden">
    <Navbar />
    <InvestmentModal />
    <HeroSection />
    <TrustSection />
    <LiveStatsSection />
    <DomainsSection />
    <HowItWorksSection />
    <TestimonialsSection />
    <BenefitsSection />
    <ContactSection />
    <Footer />
  </div>
</template>

<script setup>
import { useScrollReveal } from '~/composables/useScrollReveal'

useSeoMeta({
  title: 'InvestFutur — Plateforme d\'investissement nouvelle génération',
  description: 'Investissez dans l\'innovation durable. IA, biotech, énergies renouvelables. ROI moyen 22%.',
})

onMounted(() => {
  if (process.client) {
    const { revealAll } = useScrollReveal()
    setTimeout(() => revealAll(), 100)
  }
})
</script>

<style scoped>
.overflow-x-hidden {
  overflow-x: hidden;
}
</style>
