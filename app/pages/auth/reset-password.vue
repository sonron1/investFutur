<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-4">
    <div class="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
      <div class="text-center mb-8">
        <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <i class="fas fa-lock text-blue-600 text-xl"></i>
        </div>
        <h1 class="text-2xl font-bold text-slate-800">Nouveau mot de passe</h1>
        <p class="text-slate-500 mt-2">Choisissez un mot de passe sécurisé</p>
      </div>

      <div v-if="success" class="text-center py-4">
        <div class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <i class="fas fa-check text-green-600"></i>
        </div>
        <p class="text-slate-700 font-medium mb-4">Mot de passe réinitialisé avec succès.</p>
        <NuxtLink to="/auth/login" class="btn-primary inline-block px-8 py-3 rounded-xl font-semibold">Se connecter</NuxtLink>
      </div>

      <form v-else @submit.prevent="handleSubmit" class="space-y-5">
        <div>
          <label class="block text-sm font-medium text-slate-700 mb-2">Nouveau mot de passe</label>
          <input
            v-model="form.password"
            type="password"
            placeholder="Minimum 8 caractères"
            required
            class="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-slate-700 mb-2">Confirmer le mot de passe</label>
          <input
            v-model="form.confirm"
            type="password"
            placeholder="Répétez le mot de passe"
            required
            class="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div v-if="error" class="bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm">
          <i class="fas fa-exclamation-circle mr-2"></i>{{ error }}
        </div>

        <button type="submit" :disabled="isLoading" class="btn-primary w-full py-3 rounded-xl font-semibold">
          <span v-if="isLoading"><i class="fas fa-spinner fa-spin mr-2"></i>En cours...</span>
          <span v-else>Réinitialiser le mot de passe</span>
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const form = reactive({ password: '', confirm: '' })
const isLoading = ref(false)
const error = ref('')
const success = ref(false)

async function handleSubmit() {
  error.value = ''

  if (form.password !== form.confirm) {
    error.value = 'Les mots de passe ne correspondent pas'
    return
  }

  const token = route.query.token as string
  if (!token) {
    error.value = 'Token manquant'
    return
  }

  isLoading.value = true
  try {
    await $fetch('/api/auth/reset-password', {
      method: 'POST',
      body: { token, password: form.password },
    })
    success.value = true
  } catch (err: any) {
    error.value = err?.data?.message ?? 'Erreur lors de la réinitialisation'
  } finally {
    isLoading.value = false
  }
}

useHead({ title: 'Réinitialisation du mot de passe — InvestFutur' })
</script>
