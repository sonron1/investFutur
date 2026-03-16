<template>
  <div class="min-h-screen bg-slate-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-6">
      <!-- Card -->
      <div class="bg-white rounded-2xl border border-slate-100 shadow-sm p-8">
        <!-- Logo -->
        <div class="text-center mb-8">
          <NuxtLink to="/" class="inline-flex items-center space-x-2.5 group">
            <div class="w-9 h-9 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center shadow-sm">
              <i class="fas fa-chart-line text-white text-sm"></i>
            </div>
            <span class="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              InvestFutur
            </span>
          </NuxtLink>
        </div>

        <!-- Icon + Title -->
        <div class="text-center mb-7">
          <div class="w-14 h-14 bg-amber-50 border border-amber-100 rounded-xl flex items-center justify-center mx-auto mb-4">
            <i class="fas fa-key text-amber-500 text-xl"></i>
          </div>
          <h2 class="text-2xl font-bold text-slate-900 mb-1.5">Mot de passe oublié ?</h2>
          <p class="text-slate-500 text-sm">Saisissez votre email pour recevoir un lien de réinitialisation</p>
        </div>

        <!-- Alerts -->
        <div v-if="errorMessage" class="mb-5 p-3.5 bg-red-50 border border-red-100 text-red-700 rounded-lg flex items-start text-sm">
          <i class="fas fa-exclamation-circle text-red-400 mr-2.5 mt-0.5 flex-shrink-0"></i>
          <span>{{ errorMessage }}</span>
        </div>

        <div v-if="successMessage" class="mb-5 p-3.5 bg-emerald-50 border border-emerald-100 text-emerald-700 rounded-lg flex items-start text-sm">
          <i class="fas fa-check-circle text-emerald-400 mr-2.5 mt-0.5 flex-shrink-0"></i>
          <span>{{ successMessage }}</span>
        </div>

        <!-- Form -->
        <form @submit.prevent="handleForgotPassword" class="space-y-4">
          <div>
            <label for="email" class="block text-sm font-medium text-slate-700 mb-1.5">
              Adresse email
            </label>
            <div class="relative">
              <input
                  type="email"
                  id="email"
                  v-model="form.email"
                  required
                  :class="[
                    'w-full px-4 py-3 rounded-lg border focus:ring-2 outline-none transition-all duration-200 bg-white text-slate-900 placeholder-slate-400 pl-10',
                    emailError
                      ? 'border-red-300 focus:border-red-400 focus:ring-red-400/20'
                      : 'border-slate-200 focus:border-blue-500 focus:ring-blue-500/20'
                  ]"
                  placeholder="votre@email.com"
                  @blur="validateEmail"
              >
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <i class="fas fa-at text-slate-400 text-sm"></i>
              </div>
            </div>
            <div v-if="emailError" class="text-red-500 text-xs mt-1 flex items-center">
              <i class="fas fa-info-circle mr-1"></i>
              {{ emailError }}
            </div>
          </div>

          <!-- Submit button -->
          <button
              type="submit"
              :disabled="isLoading || !isFormValid"
              class="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white py-3 px-5 rounded-lg font-semibold transition-all duration-200 shadow-sm hover:shadow-md mt-2"
          >
            <span v-if="!isLoading" class="flex items-center justify-center">
              <i class="fas fa-paper-plane mr-2"></i>
              Envoyer le lien de récupération
            </span>
            <span v-else class="flex items-center justify-center">
              <div class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
              Envoi en cours...
            </span>
          </button>
        </form>

        <!-- Back to login -->
        <div class="mt-6 text-center">
          <NuxtLink
              to="/auth/login"
              class="inline-flex items-center text-slate-400 hover:text-blue-600 text-sm transition-colors group"
          >
            <i class="fas fa-arrow-left mr-2 group-hover:-translate-x-0.5 transition-transform"></i>
            Retour à la connexion
          </NuxtLink>
        </div>
      </div>

      <!-- Security badges -->
      <div class="flex justify-center items-center space-x-5 text-xs text-slate-400">
        <div class="flex items-center space-x-1.5">
          <i class="fas fa-shield-alt text-emerald-400"></i>
          <span>SSL 256-bits</span>
        </div>
        <div class="flex items-center space-x-1.5">
          <i class="fas fa-lock text-blue-400"></i>
          <span>Données chiffrées</span>
        </div>
        <div class="flex items-center space-x-1.5">
          <i class="fas fa-university text-indigo-400"></i>
          <span>Régulé AMF</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
useSeoMeta({
  title: 'Mot de passe oublié - InvestFutur',
  description: 'Récupérez l\'accès à votre compte InvestFutur en réinitialisant votre mot de passe'
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
