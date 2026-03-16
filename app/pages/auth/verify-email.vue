<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-4">
    <div class="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
      <!-- Loading -->
      <div v-if="status === 'loading'" class="py-8">
        <div class="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
        <h2 class="text-xl font-semibold text-slate-800">Vérification en cours...</h2>
      </div>

      <!-- Success -->
      <div v-else-if="status === 'success'" class="py-4">
        <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <i class="fas fa-check text-green-600 text-2xl"></i>
        </div>
        <h2 class="text-2xl font-bold text-slate-800 mb-3">Email vérifié !</h2>
        <p class="text-slate-600 mb-6">Votre compte est maintenant actif. Vous pouvez vous connecter.</p>
        <NuxtLink to="/auth/login" class="btn-primary inline-block px-8 py-3 rounded-xl font-semibold">
          Se connecter
        </NuxtLink>
      </div>

      <!-- Error -->
      <div v-else-if="status === 'error'" class="py-4">
        <div class="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <i class="fas fa-times text-red-600 text-2xl"></i>
        </div>
        <h2 class="text-2xl font-bold text-slate-800 mb-3">Lien invalide</h2>
        <p class="text-slate-600 mb-6">{{ errorMessage }}</p>
        <NuxtLink to="/auth/login" class="btn-primary inline-block px-8 py-3 rounded-xl font-semibold">
          Retour à la connexion
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const status = ref<'loading' | 'success' | 'error'>('loading')
const errorMessage = ref('')

onMounted(async () => {
  const token = route.query.token as string

  if (!token) {
    status.value = 'error'
    errorMessage.value = 'Token manquant dans l\'URL.'
    return
  }

  try {
    await $fetch('/api/auth/verify-email', {
      method: 'POST',
      body: { token },
    })
    status.value = 'success'
  } catch (err: any) {
    status.value = 'error'
    errorMessage.value = err?.data?.message ?? 'Token invalide ou expiré.'
  }
})

useHead({ title: 'Vérification email — InvestFutur' })
</script>
