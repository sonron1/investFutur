<template>
  <div>
    <!-- Uploaded state -->
    <div
      v-if="uploaded"
      class="relative border-2 border-emerald-300 bg-emerald-50 rounded-xl p-4 flex items-center group"
    >
      <div class="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
        <i class="fas fa-file-image text-emerald-600"></i>
      </div>
      <div class="flex-1 min-w-0">
        <div class="text-sm font-semibold text-emerald-900 truncate">{{ label }}</div>
        <div class="text-xs text-emerald-700 truncate">{{ uploaded.fileName }}</div>
      </div>
      <button
        @click="$emit('remove')"
        class="ml-2 w-7 h-7 flex items-center justify-center rounded-lg text-emerald-500 hover:text-red-500 hover:bg-red-50 transition-colors flex-shrink-0"
        title="Supprimer"
      >
        <i class="fas fa-times text-xs"></i>
      </button>
    </div>

    <!-- Upload zone -->
    <div
      v-else
      class="relative border-2 border-dashed rounded-xl transition-all duration-200 cursor-pointer"
      :class="[
        isDragging ? 'border-blue-400 bg-blue-50' : 'border-slate-200 hover:border-blue-300 hover:bg-blue-50/40',
        isUploading ? 'pointer-events-none opacity-75' : ''
      ]"
      @dragover.prevent="isDragging = true"
      @dragleave="isDragging = false"
      @drop.prevent="handleDrop"
      @click="fileInput?.click()"
    >
      <div class="p-6 text-center">
        <div v-if="isUploading" class="flex flex-col items-center">
          <i class="fas fa-circle-notch fa-spin text-blue-500 text-xl mb-2"></i>
          <p class="text-sm text-blue-600 font-medium">Envoi en cours...</p>
        </div>
        <div v-else>
          <i class="fas fa-cloud-upload-alt text-slate-300 text-2xl mb-2 block"></i>
          <p class="text-sm font-medium text-slate-700">{{ label }}</p>
          <p class="text-xs text-slate-400 mt-1">JPG, PNG, PDF — max 10 Mo</p>
        </div>
      </div>

      <input
        ref="fileInput"
        type="file"
        accept="image/jpeg,image/png,image/webp,application/pdf"
        class="hidden"
        @change="handleFileChange"
      >
    </div>

    <!-- Error -->
    <p v-if="error" class="text-xs text-red-600 mt-1.5 flex items-center">
      <i class="fas fa-exclamation-circle mr-1"></i>{{ error }}
    </p>
  </div>
</template>

<script setup>
import { useAuthStore } from '~/stores/auth'

const props = defineProps({
  label: { type: String, required: true },
  docType: { type: String, required: true },
  uploaded: { type: Object, default: null },
})

const emit = defineEmits(['upload', 'remove'])

const authStore = useAuthStore()
const fileInput = ref(null)
const isDragging = ref(false)
const isUploading = ref(false)
const error = ref('')

const MAX_SIZE = 10 * 1024 * 1024 // 10 MB

const handleDrop = (event) => {
  isDragging.value = false
  const file = event.dataTransfer.files[0]
  if (file) processFile(file)
}

const handleFileChange = (event) => {
  const file = event.target.files[0]
  if (file) processFile(file)
  // Reset so same file can be re-selected
  event.target.value = ''
}

const processFile = async (file) => {
  error.value = ''

  const allowed = ['image/jpeg', 'image/png', 'image/webp', 'application/pdf']
  if (!allowed.includes(file.type)) {
    error.value = 'Format non supporté. Utilisez JPG, PNG, WEBP ou PDF.'
    return
  }
  if (file.size > MAX_SIZE) {
    error.value = 'Fichier trop volumineux (max 10 Mo).'
    return
  }

  isUploading.value = true

  try {
    const base64 = await fileToBase64(file)
    const { data } = await $fetch('/api/kyc/upload', {
      method: 'POST',
      body: { type: props.docType, file: base64, fileName: file.name },
      headers: authStore.getAuthHeaders(),
    })
    emit('upload', { id: data.id, fileName: data.fileName, fileUrl: data.fileUrl })
  } catch (err) {
    error.value = err?.data?.message ?? 'Erreur lors de l\'envoi. Réessayez.'
  } finally {
    isUploading.value = false
  }
}

const fileToBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result)
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
</script>
