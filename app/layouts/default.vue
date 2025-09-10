<template>
  <div class="min-h-screen">
    <!-- Navigation globale si nécessaire -->
    <slot />
  </div>
</template>

<script setup>
import { useAOS } from '~/composables/useRefreshAOS'

// Utiliser le composable AOS au niveau du layout
const { initAOSOnMount } = useAOS()

// Initialiser AOS au montage du layout
initAOSOnMount()
</script>