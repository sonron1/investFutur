<template>
  <div>
    <!-- Navigation -->
    <Navbar />

    <!-- Modal Investissement -->
    <InvestmentModal />

    <!-- Hero Section -->
    <HeroSection />

    <!-- Section Domaines -->
    <DomainsSection />

    <!-- Section Comment ça marche -->
    <HowItWorksSection />

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
  title: 'InvestFuture - Investissement dans l\'innovation durable',
  description: 'Investissez dans l\'innovation durable dès 5000€. ROI moyen 18%.',
  ogTitle: 'InvestFuture - Investissement dans l\'innovation durable',
  ogDescription: 'Investissez dans l\'innovation durable dès 5000€. ROI moyen 18%.',
  ogImage: '/images/og-image.jpg'
})

// Réinitialiser les modales à chaque visite de la page
const { resetModals } = usePageRefresh()

onMounted(() => {
  resetModals()
})
</script>