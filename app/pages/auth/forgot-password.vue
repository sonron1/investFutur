<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <!-- Carte principale -->
      <div class="bg-white rounded-lg shadow-md p-8">
        <!-- Logo -->
        <div class="text-center mb-8">
          <NuxtLink to="/" class="inline-flex items-center space-x-2">
            <i class="fas fa-chart-line text-blue-600 text-2xl"></i>
            <h3 class="text-2xl font-bold text-gray-900">InvestFuture</h3>
          </NuxtLink>
        </div>

        <!-- Titre principal -->
        <div class="text-center mb-8">
          <h2 class="text-2xl font-bold text-gray-900 mb-2">Mot de passe oublié ?</h2>
          <p class="text-gray-600">Saisissez votre email pour recevoir un lien de réinitialisation</p>
        </div>

        <!-- Messages d'erreur et de succès -->
        <div v-if="errorMessage" class="mb-4 p-3 bg-red-50 border border-red-200 text-red-800 rounded-lg text-sm">
          {{ errorMessage }}
        </div>

        <div v-if="successMessage" class="mb-4 p-3 bg-green-50 border border-green-200 text-green-800 rounded-lg text-sm">
          {{ successMessage }}
        </div>

        <!-- Formulaire -->
        <form @submit.prevent="handleForgotPassword" class="space-y-6">
          <!-- Email -->
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700 mb-1">
              Adresse email
            </label>
            <input
                type="email"
                id="email"
                v-model="form.email"
                required
                :class="[
                  'w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500',
                  { 'border-red-300 focus:border-red-500 focus:ring-red-500': emailError },
                  { 'border-gray-300': !emailError }
                ]"
                placeholder="votre@email.com"
                @blur="validateEmail"
            >
            <div v-if="emailError" class="text-red-600 text-sm mt-1">
              {{ emailError }}
            </div>
          </div>

          <!-- Bouton d'envoi -->
          <button
              type="submit"
              :disabled="isLoading || !isFormValid"
              class="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white py-2 px-4 rounded-md font-medium transition-colors"
          >
            <span v-if="!isLoading">
              Envoyer le lien de récupération
            </span>
            <span v-else>
              Envoi en cours...
            </span>
          </button>
        </form>

        <!-- Retour à la connexion -->
        <div class="mt-6 text-center">
          <NuxtLink
              to="/auth/login"
              class="inline-flex items-center text-blue-600 hover:text-blue-800 text-sm"
          >
            <i class="fas fa-arrow-left mr-2"></i>
            Retour à la connexion
          </NuxtLink>
        </div>
      </div>

      <!-- Indicateurs de sécurité -->
      <div class="flex justify-center items-center space-x-6 text-sm text-gray-600">
        <div class="flex items-center">
          <i class="fas fa-shield-alt text-green-500 mr-2"></i>
          <span>SSL 256-bits</span>
        </div>
        <div class="flex items-center">
          <i class="fas fa-lock text-blue-500 mr-2"></i>
          <span>Données chiffrées</span>
        </div>
        <div class="flex items-center">
          <i class="fas fa-university text-purple-500 mr-2"></i>
          <span>Régulé AMF</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
useSeoMeta({
  title: 'Mot de passe oublié - InvestFuture',
  description: 'Récupérez l\'accès à votre compte InvestFuture en réinitialisant votre mot de passe'
})

const form = reactive({
  email: ''
})

const isLoading = ref(false)
const errorMessage = ref('')
const successMessage = ref('')
const emailError = ref('')

const isFormValid = computed(() => {
  return form.email && !emailError.value
})

const validateEmail = () => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (form.email && !emailRegex.test(form.email)) {
    emailError.value = 'Veuillez saisir une adresse email valide'
  } else {
    emailError.value = ''
  }
}

const handleForgotPassword = async () => {
  if (!isFormValid.value) return

  isLoading.value = true
  errorMessage.value = ''
  successMessage.value = ''

  try {
    // Simulation d'envoi d'email
    await new Promise(resolve => setTimeout(resolve, 2000))

    // Vérification si l'email existe (simulation)
    const knownEmails = [
      'demo@investfuture.com',
      'admin@investfuture.com'
    ]

    if (!knownEmails.includes(form.email.toLowerCase())) {
      errorMessage.value = 'Aucun compte n\'est associé à cette adresse email.'
      return
    }

    successMessage.value = 'Un email contenant le lien de réinitialisation a été envoyé à votre adresse. Veuillez vérifier votre boîte de réception.'

    // Réinitialiser le formulaire après succès
    form.email = ''

    // Redirection automatique après 10 secondes
    setTimeout(() => {
      navigateTo('/auth/login')
    }, 10000)

  } catch (error) {
    errorMessage.value = 'Une erreur est survenue lors de l\'envoi de l\'email. Veuillez réessayer.'
    console.error('Forgot password error:', error)
  } finally {
    isLoading.value = false
  }
}
</script>