<template>
  <div class="min-h-screen bg-gray-50 py-20">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="bg-white rounded-3xl shadow-xl p-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-8">Conditions d'Utilisation</h1>

        <div class="prose prose-lg max-w-none">
          <h2>Acceptation des conditions</h2>
          <p>En utilisant InvestFuture, vous acceptez les présentes conditions...</p>

          <h2>Services proposés</h2>
          <p>InvestFuture propose une plateforme d'investissement...</p>

          <h2>Obligations des utilisateurs</h2>
          <p>L'utilisateur s'engage à fournir des informations exactes...</p>

          <h2>Risques d'investissement</h2>
          <p>Les investissements présentent un risque de perte en capital...</p>
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
  title: 'Conditions d\'Utilisation - InvestFuture',
  description: 'Conditions générales d\'utilisation d\'InvestFuture'
})
</script>