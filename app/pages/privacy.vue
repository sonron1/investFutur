<template>
  <div class="min-h-screen bg-gray-50 py-20">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="bg-white rounded-3xl shadow-xl p-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-8">Politique de Confidentialité</h1>

        <div class="prose prose-lg max-w-none">
          <h2>Collecte des données</h2>
          <p>Nous collectons uniquement les données nécessaires au fonctionnement de nos services...</p>

          <h2>Utilisation des données</h2>
          <p>Vos données sont utilisées pour vous fournir nos services d'investissement...</p>

          <h2>Protection des données</h2>
          <p>Nous mettons en œuvre toutes les mesures de sécurité nécessaires...</p>

          <h2>Vos droits</h2>
          <p>Conformément au RGPD, vous disposez d'un droit d'accès, de rectification...</p>
        </div>

        <div class="mt-12 text-center">
          <NuxtLink to="/" class="btn-primary">
            <i class="fas fa-arrow-left mr-2"></i>
            Retour à l'accueil
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
useSeoMeta({
  title: 'Politique de Confidentialité - InvestFuture',
  description: 'Politique de confidentialité et protection des données d\'InvestFuture'
})
</script>