<template>
  <img
      :src="currentSrc"
      :alt="alt"
      :class="imgClass"
      @error="handleError"
      v-bind="$attrs"
  />
</template>

<script setup>
const props = defineProps({
  src: {
    type: String,
    required: true
  },
  fallback: {
    type: String,
    default: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
  },
  alt: {
    type: String,
    default: 'Image'
  },
  imgClass: {
    type: String,
    default: ''
  }
})

const currentSrc = ref(props.src)
const hasError = ref(false)

const handleError = () => {
  if (!hasError.value) {
    hasError.value = true
    currentSrc.value = props.fallback
  }
}
</script>