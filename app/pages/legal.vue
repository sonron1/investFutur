<template>
  <div class="min-h-screen bg-gray-50 py-20">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="bg-white rounded-3xl shadow-xl p-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-8">Mentions Légales</h1>

        <div class="prose prose-lg max-w-none">
          <h2>Informations légales</h2>
          <p><strong>Dénomination sociale :</strong> InvestFuture SAS</p>
          <p><strong>Siège social :</strong> 123 Avenue des Champs-Élysées, 75008 Paris, France</p>
          <p><strong>SIRET :</strong> 123 456 789 00012</p>
          <p><strong>Code APE :</strong> 6420Z</p>
          <p><strong>Capital social :</strong> 1 000 000 €</p>

          <h2>Contact</h2>
          <p><strong>Email :</strong> contact@investfuture.com</p>
          <p><strong>Téléphone :</strong> +33 1 23 45 67 89</p>

          <h2>Hébergement</h2>
          <p>Ce site est hébergé par Vercel Inc., situé à San Francisco, USA.</p>

          <h2>Agrément</h2>
          <p>InvestFuture est agréé par l'Autorité des Marchés Financiers (AMF) sous le numéro CIP 18000001.</p>
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
  title: 'Mentions Légales - InvestFuture',
  description: 'Mentions légales et informations juridiques d\'InvestFuture'
})
</script>