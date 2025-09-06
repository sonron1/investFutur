<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div class="bg-white p-8 rounded-2xl shadow-xl">
        <!-- Logo -->
        <div class="text-center mb-8">
          <NuxtLink to="/" class="flex items-center justify-center space-x-2">
            <i class="fas fa-chart-line text-blue-600 text-3xl"></i>
            <h3 class="text-3xl font-bold brand-name">InvestFuture</h3>
          </NuxtLink>
        </div>

        <h2 class="text-center text-3xl font-bold text-gray-900 mb-8">Connexion</h2>

        <!-- Alerts -->
        <div v-if="errorMessage" class="mb-4 p-4 bg-red-50 border border-red-200 text-red-800 rounded-lg">
          {{ errorMessage }}
        </div>
        <div v-if="successMessage" class="mb-4 p-4 bg-green-50 border border-green-200 text-green-800 rounded-lg">
          {{ successMessage }}
        </div>

        <!-- Formulaire -->
        <form @submit.prevent="handleLogin" class="space-y-6">
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
                type="email"
                id="email"
                v-model="form.email"
                required
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                placeholder="votre@email.com"
            >
          </div>

          <div>
            <label for="password" class="block text-sm font-medium text-gray-700 mb-1">Mot de passe</label>
            <input
                type="password"
                id="password"
                v-model="form.password"
                required
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                placeholder="Votre mot de passe"
            >
          </div>

          <div class="flex items-center">
            <input
                type="checkbox"
                id="remember"
                v-model="form.remember"
                class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            >
            <label for="remember" class="ml-2 block text-sm text-gray-700">
              Se souvenir de moi
            </label>
          </div>

          <button
              type="submit"
              :disabled="isLoading"
              class="w-full btn-primary flex items-center justify-center"
          >
            <i v-if="isLoading" class="fas fa-spinner fa-spin mr-2"></i>
            <i v-else class="fas fa-sign-in-alt mr-2"></i>
            {{ isLoading ? 'Connexion...' : 'Se connecter' }}
          </button>
        </form>

        <!-- Liens -->
        <div class="mt-6 text-center space-y-2">
          <p>
            <a href="#" class="text-blue-600 hover:text-blue-500 text-sm">Mot de passe oublié ?</a>
          </p>
          <p class="text-sm text-gray-600">
            Pas encore de compte ?
            <NuxtLink to="/auth/register" class="text-blue-600 hover:text-blue-500 font-semibold">
              S'inscrire
            </NuxtLink>
          </p>
        </div>

        <!-- Retour à l'accueil -->
        <div class="mt-8 text-center">
          <NuxtLink to="/" class="inline-flex items-center text-gray-600 hover:text-gray-700 text-sm">
            <i class="fas fa-arrow-left mr-2"></i>
            Retour à l'accueil
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from '~/stores/auth'

useSeoMeta({
  title: 'Connexion - InvestFuture',
  description: 'Connectez-vous à votre compte InvestFuture'
})

const authStore = useAuthStore()

const form = reactive({
  email: '',
  password: '',
  remember: false
})

const isLoading = ref(false)
const errorMessage = ref('')
const successMessage = ref('')

const handleLogin = async () => {
  isLoading.value = true
  errorMessage.value = ''
  successMessage.value = ''

  try {
    const result = await authStore.login({
      email: form.email,
      password: form.password
    })

    if (result.success) {
      successMessage.value = 'Connexion réussie ! Redirection...'
      setTimeout(() => {
        navigateTo('/dashboard')
      }, 1000)
    } else {
      errorMessage.value = result.error || 'Erreur de connexion'
    }
  } catch (error) {
    errorMessage.value = 'Erreur de connexion. Veuillez réessayer.'
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  if (authStore.isAuthenticated) {
    navigateTo('/dashboard')
  }
})
</script>