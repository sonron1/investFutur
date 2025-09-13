<template>
  <div class="overflow-x-hidden" >
    <!-- Navigation -->
    <Navbar />

    <!-- Modal Investissement -->
    <InvestmentModal />

    <!-- Hero Section -->
    <HeroSection />

    <!-- Section Confiance/Partenaires -->
    <TrustSection />

    <!-- Section Statistiques en temps réel -->
    <LiveStatsSection />

    <!-- Section Domaines avec investissements complets -->
    <DomainsSection />

    <!-- Section Investissements populaires (nouvelle) -->
    <PopularInvestmentsSection />

    <!-- Section Témoignages -->
    <TestimonialsSection />

    <!-- Section Comment ça marche -->
    <HowItWorksSection />

    <!-- Section Avantages -->
    <BenefitsSection />

    <!-- Section Actualités/Blog -->
    <NewsSection />

    <!-- Section Contact -->
    <ContactSection />

    <!-- Footer -->
    <Footer />
  </div>
</template>

<script setup>
import { usePageRefresh } from '~/composables/usePageRefresh'

// Meta données de la page
useSeoMeta({
  title: 'InvestFuture - Plateforme d\'investissement dans l\'innovation',
  description: 'Investissez dans l\'avenir avec InvestFuture. ROI moyen de 22%, investissement minimum 5000€. Technologies vertes, IA, Fintech et plus.',
ogTitle: 'InvestFuture - Plateforme d\'investissement dans l\'innovation',
    ogDescription: 'Investissez dans l\'avenir avec InvestFuture. ROI moyen de 22%, investissement minimum 5000€.',
ogImage: '/images/og-image.jpg',
    keywords: 'investissement, innovation, fintech, technologies vertes, ROI, startup'
})

// Système de rafraîchissement de page
const { resetModals, shouldRefresh, forceRefresh, refreshKey } = usePageRefresh()

onMounted(() => {
  resetModals()

  // Vérifier si on doit rafraîchir la page
  if (shouldRefresh()) {
    forceRefresh()

    // Optionnel : notification subtile
    nextTick(() => {
      // AOS refresh si disponible
      if (process.client && window.AOS) {
        window.AOS.refresh()
      }
    })
  }
})
</script>

<style scoped>
/* Styles spécifiques pour éviter les débordements */
.overflow-x-hidden {
  overflow-x: hidden;
}
</style>
