<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-lg w-full space-y-8">
      <div class="bg-white p-8 rounded-2xl shadow-xl">
        <!-- Logo -->
        <div class="text-center mb-8">
          <NuxtLink to="/" class="flex items-center justify-center space-x-2">
            <i class="fas fa-chart-line text-blue-600 text-3xl"></i>
            <h3 class="text-3xl font-bold brand-name">InvestFuture</h3>
          </NuxtLink>
        </div>

        <h2 class="text-center text-3xl font-bold text-gray-900 mb-8">Créer un compte</h2>

        <!-- Alerts -->
        <div v-if="errorMessage" class="mb-4 p-4 bg-red-50 border border-red-200 text-red-800 rounded-lg">
          {{ errorMessage }}
        </div>
        <div v-if="successMessage" class="mb-4 p-4 bg-green-50 border border-green-200 text-green-800 rounded-lg">
          {{ successMessage }}
        </div>

        <!-- Formulaire -->
        <form @submit.prevent="handleRegister" class="space-y-6">
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label for="firstName" class="block text-sm font-medium text-gray-700 mb-1">Prénom</label>
              <input
                  type="text"
                  id="firstName"
                  v-model="form.firstName"
                  required
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  placeholder="Votre prénom"
              >
            </div>
            <div>
              <label for="lastName" class="block text-sm font-medium text-gray-700 mb-1">Nom</label>
              <input
                  type="text"
                  id="lastName"
                  v-model="form.lastName"
                  required
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  placeholder="Votre nom"
              >
            </div>
          </div>

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
                placeholder="Au moins 8 caractères"
            >
          </div>

          <div>
            <label for="confirmPassword" class="block text-sm font-medium text-gray-700 mb-1">Confirmer le mot de passe</label>
            <input
                type="password"
                id="confirmPassword"
                v-model="form.confirmPassword"
                required
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                placeholder="Confirmez votre mot de passe"
            >
          </div>

          <div class="flex items-start">
            <input
                type="checkbox"
                id="terms"
                v-model="form.acceptTerms"
                required
                class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mt-1"
            >
            <label for="terms" class="ml-3 text-sm text-gray-700">
              J'accepte les <a href="#" class="text-blue-600 hover:text-blue-500">conditions d'utilisation</a>
              et la <a href="#" class="text-blue-600 hover:text-blue-500">politique de confidentialité</a>
            </label>
          </div>

          <div class="flex items-start">
            <input
                type="checkbox"
                id="newsletter"
                v-model="form.newsletter"
                class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mt-1"
            >
            <label for="newsletter" class="ml-3 text-sm text-gray-700">
              Je souhaite recevoir la newsletter
            </label>
          </div>

          <button
              type="submit"
              :disabled="isLoading || !isFormValid"
              class="w-full btn-primary flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <i v-if="isLoading" class="fas fa-spinner fa-spin mr-2"></i>
            <i v-else class="fas fa-user-plus mr-2"></i>
            {{ isLoading ? 'Création du compte...' : 'Créer mon compte' }}
          </button>
        </form>

        <!-- Liens -->
        <div class="mt-6 text-center">
          <p class="text-sm text-gray-600">
            Déjà un compte ?
            <NuxtLink to="/auth/login" class="text-blue-600 hover:text-blue-500 font-semibold">
              Se connecter
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
  title: 'Inscription - InvestFuture',
  description: 'Créez votre compte InvestFuture et commencez à investir'
})

const authStore = useAuthStore()

const form = reactive({
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
  acceptTerms: false,
  newsletter: false
})

const isLoading = ref(false)
const errorMessage = ref('')
const successMessage = ref('')

const isFormValid = computed(() => {
  return form.firstName &&
      form.lastName &&
      form.email &&
      form.password &&
      form.confirmPassword &&
      form.password === form.confirmPassword &&
      form.acceptTerms
})

const handleRegister = async () => {
  if (form.password !== form.confirmPassword) {
    errorMessage.value = 'Les mots de passe ne correspondent pas'
    return
  }

  isLoading.value = true
  errorMessage.value = ''
  successMessage.value = ''

  try {
    const result = await authStore.register({
      name: `${form.firstName} ${form.lastName}`,
      email: form.email,
      password: form.password,
      firstName: form.firstName,
      lastName: form.lastName,
      newsletter: form.newsletter
    })

    if (result.success) {
      successMessage.value = 'Compte créé avec succès ! Redirection...'
      setTimeout(() => {
        navigateTo('/dashboard')
      }, 1000)
    } else {
      errorMessage.value = result.error || 'Erreur lors de la création du compte'
    }
  } catch (error) {
    errorMessage.value = 'Erreur lors de la création du compte. Veuillez réessayer.'
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