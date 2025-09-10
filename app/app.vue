<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
// Supprimer la logique AOS d'ici car elle est gérée dans le plugin
</script>

<style>
html, body {
  font-family: 'DM Sans', sans-serif;
  margin: 0;
  padding: 0;
}

/* Prévenir le flash des animations AOS */
[data-aos] {
  pointer-events: none;
}

[data-aos].aos-animate {
  pointer-events: auto;
}
</style>