<template>
  <div class="min-h-screen">
    <slot />
  </div>
</template>

<script setup>
import { useScrollReveal } from '~/composables/useScrollReveal'

const route = useRoute()

onMounted(() => {
  if (process.client) {
    const { revealAll } = useScrollReveal()
    setTimeout(() => revealAll(), 50)
  }
})

watch(() => route.fullPath, () => {
  if (process.client) {
    nextTick(() => {
      setTimeout(() => {
        const { revealAll } = useScrollReveal()
        revealAll()
      }, 100)
    })
  }
})
</script>
