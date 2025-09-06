
<template>
  <div class="relative overflow-hidden" :class="containerClass">
    <!-- Image principale -->
    <img
        v-show="!isLoading && !hasError"
        :src="currentSrc"
        :alt="alt"
        :class="[
        'transition-all duration-300',
        imgClass,
        {
          'object-cover w-full h-full': !imgClass.includes('object-'),
        }
      ]"
        @load="handleLoad"
        @error="handleError"
        v-bind="$attrs"
    />

    <!-- État de chargement -->
    <div
        v-if="isLoading"
        class="absolute inset-0 bg-gray-100 flex items-center justify-center animate-pulse"
    >
      <div class="flex flex-col items-center space-y-2">
        <div class="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        <span class="text-xs text-gray-500">Chargement...</span>
      </div>
    </div>

    <!-- État d'erreur -->
    <div
        v-if="hasError && !isLoading"
        class="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center"
    >
      <div class="flex flex-col items-center space-y-2 text-blue-400">
        <i class="fas fa-chart-line text-4xl"></i>
        <span class="text-xs font-medium">Investissement</span>
      </div>
    </div>

    <!-- Overlay optionnel -->
    <div
        v-if="overlay && !isLoading && !hasError"
        class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
    >
      <div class="absolute bottom-4 left-4 right-4">
        <slot name="overlay"></slot>
      </div>
    </div>

    <!-- Badge optionnel -->
    <div v-if="badge && !isLoading" class="absolute top-4 right-4">
      <slot name="badge"></slot>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, nextTick } from 'vue'

const props = defineProps({
  src: {
    type: String,
    required: true
  },
  fallback: {
    type: String,
    default: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
  },
  alt: {
    type: String,
    default: 'Image'
  },
  imgClass: {
    type: String,
    default: ''
  },
  containerClass: {
    type: String,
    default: ''
  },
  overlay: {
    type: Boolean,
    default: false
  },
  badge: {
    type: Boolean,
    default: false
  }
})

const currentSrc = ref(props.src)
const hasError = ref(false)
const isLoading = ref(true)

const handleLoad = async () => {
  await nextTick()
  isLoading.value = false
  hasError.value = false
}

const handleError = async () => {
  await nextTick()
  if (!hasError.value && currentSrc.value !== props.fallback) {
    hasError.value = false
    isLoading.value = true
    currentSrc.value = props.fallback
  } else {
    hasError.value = true
    isLoading.value = false
  }
}

// Watcher pour les changements de src
watch(() => props.src, async (newSrc) => {
  if (newSrc !== currentSrc.value) {
    isLoading.value = true
    hasError.value = false
    await nextTick()
    currentSrc.value = newSrc
  }
})

// Précharger l'image
onMounted(async () => {
  await nextTick()
  if (process.client) {
    const img = new Image()
    img.onload = () => handleLoad()
    img.onerror = () => handleError()
    img.src = currentSrc.value
  }
})
</script>