<template>
  <span>{{ displayValue }}{{ suffix }}</span>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'

const props = defineProps({
  value: {
    type: Number,
    required: true
  },
  suffix: {
    type: String,
    default: ''
  },
  duration: {
    type: Number,
    default: 2000
  }
})

const displayValue = ref(0)

const animateValue = (start, end, duration) => {
  const startTimestamp = performance.now()
  const step = (timestamp) => {
    const progress = Math.min((timestamp - startTimestamp) / duration, 1)
    displayValue.value = Math.floor(progress * (end - start) + start)
    if (progress < 1) {
      requestAnimationFrame(step)
    }
  }
  requestAnimationFrame(step)
}

onMounted(() => {
  setTimeout(() => {
    animateValue(0, props.value, props.duration)
  }, 500)
})

watch(() => props.value, (newValue) => {
  animateValue(displayValue.value, newValue, props.duration)
})
</script>