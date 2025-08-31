<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
// Initialisation AOS au montage
onMounted(() => {
  if (process.client && window.AOS) {
    window.AOS.init({
      duration: 800,
      easing: 'ease-in-out'
    })
  }
})
</script>

<style>
html, body {
  font-family: 'DM Sans', sans-serif;
  margin: 0;
  padding: 0;
}
</style>