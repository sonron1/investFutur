<template>
  <div class="min-h-screen">
    <!-- Navigation globale si nécessaire -->
    <slot />
  </div>
</template>

<script setup>
import { useAOS } from '~/composables/useRefreshAOS'

const { initAOSOnMount, refreshAOS } = useAOS()

// Initialize AOS on first mount
initAOSOnMount()

// Re-run AOS after every client-side navigation (layout persists, so onMounted
// doesn't re-fire — we must watch the route instead)
const route = useRoute()
watch(() => route.fullPath, () => {
  nextTick(() => {
    setTimeout(() => refreshAOS(), 150)
  })
})
</script>