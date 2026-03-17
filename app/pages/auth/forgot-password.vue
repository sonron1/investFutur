<template>
  <div class="min-h-screen flex">
    <!-- Left dark panel -->
    <div class="hidden lg:flex lg:w-1/2 flex-col justify-between p-12" style="background-color: var(--color-dark)">
      <!-- Top: brand -->
      <div>
        <NuxtLink to="/" class="inline-flex items-center gap-2.5 group mb-12">
          <div class="w-9 h-9 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center shadow-sm">
            <i class="fas fa-chart-line text-white text-sm"></i>
          </div>
          <span class="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
            InvestFutur
          </span>
        </NuxtLink>

        <h2 class="text-3xl font-black text-white mb-4 leading-tight">
          Accès sécurisé<br>
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
            à votre compte
          </span>
        </h2>
        <p class="text-slate-400 text-base leading-relaxed mb-10">
          Réinitialisez votre mot de passe en toute sécurité. Votre compte et vos investissements restent protégés.
        </p>

        <!-- Feature bullets -->
        <div class="space-y-4">
          <div v-for="feature in leftFeatures" :key="feature.title" class="flex items-start gap-3">
            <div class="w-8 h-8 bg-blue-600/20 border border-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
              <i :class="feature.icon" class="text-blue-400 text-xs"></i>
            </div>
            <div>
              <div class="text-white text-sm font-semibold">{{ feature.title }}</div>
              <div class="text-slate-400 text-xs mt-0.5">{{ feature.description }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Bottom: security card -->
      <div class="bg-white/8 border border-white/10 rounded-2xl p-6">
        <div class="flex items-center gap-3 mb-4">
          <div class="w-10 h-10 bg-emerald-500/20 border border-emerald-500/20 rounded-xl flex items-center justify-center">
            <i class="fas fa-shield-alt text-emerald-400"></i>
          </div>
          <div>
            <div class="text-white text-sm font-semibold">Sécurité renforcée</div>
            <div class="text-slate-400 text-xs">Votre compte est protégé</div>
          </div>
        </div>
        <div class="space-y-2">
          <div v-for="security in securityFeatures" :key="security" class="flex items-center gap-2 text-xs text-slate-400">
            <i class="fas fa-check text-emerald-400 text-xs"></i>
            {{ security }}
          </div>
        </div>
      </div>
    </div>

    <!-- Right: white form panel -->
    <div class="flex-1 flex items-center justify-center p-6 bg-white">
      <div class="w-full max-w-md animate-fade-in-up">
        <!-- Mobile logo -->
        <div class="lg:hidden text-center mb-8">
          <NuxtLink to="/" class="inline-flex items-center gap-2.5">
            <div class="w-9 h-9 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center shadow-sm">
              <i class="fas fa-chart-line text-white text-sm"></i>
            </div>
            <span class="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              InvestFutur
            </span>
          </NuxtLink>
        </div>

        <!-- Form card -->
        <div class="bg-white rounded-2xl border border-slate-100 shadow-sm p-8">
          <!-- Icon + Title -->
          <div class="text-center mb-7">
            <div class="w-14 h-14 bg-amber-50 border border-amber-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <i class="fas fa-key text-amber-500 text-xl"></i>
            </div>
            <h1 class="text-2xl font-bold text-slate-900 mb-1.5">Mot de passe oublié ?</h1>
            <p class="text-slate-500 text-sm">Saisissez votre email pour recevoir un lien de réinitialisation</p>
          </div>

          <!-- Alerts -->
          <Transition name="alert" appear>
            <div v-if="errorMessage" class="alert-error mb-5">
              <i class="fas fa-exclamation-circle text-red-400 flex-shrink-0"></i>
              <div>
                <div class="font-semibold">Erreur</div>
                <div class="text-red-600 mt-0.5">{{ errorMessage }}</div>
              </div>
            </div>
          </Transition>

          <Transition name="alert" appear>
            <div v-if="successMessage" class="alert-success mb-5">
              <i class="fas fa-check-circle text-emerald-400 flex-shrink-0"></i>
              <div>
                <div class="font-semibold">Email envoyé !</div>
                <div class="text-emerald-600 mt-0.5">{{ successMessage }}</div>
              </div>
            </div>
          </Transition>

          <!-- Form -->
          <form @submit.prevent="handleForgotPassword" class="space-y-4">
            <div>
              <label for="email" class="form-label">Adresse email</label>
              <div class="relative">
                <input
                  type="email"
                  id="email"
                  v-model="form.email"
                  required
                  :class="[
                    'w-full px-4 py-3 rounded-xl border focus:ring-2 outline-none transition-all duration-200 bg-white text-slate-900 placeholder-slate-400 pl-10 text-sm',
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
              <div v-if="emailError" class="text-red-500 text-xs mt-1 flex items-center gap-1">
                <i class="fas fa-info-circle"></i>
                {{ emailError }}
              </div>
            </div>

            <!-- Submit button -->
            <button
              type="submit"
              :disabled="isLoading || !isFormValid"
              class="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white py-3.5 px-5 rounded-xl font-semibold transition-all duration-200 shadow-sm hover:shadow-md mt-2"
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
        <div class="mt-5 flex justify-center items-center gap-5 text-xs text-slate-400">
          <div class="flex items-center gap-1.5">
            <i class="fas fa-shield-alt text-emerald-400"></i>
            <span>SSL 256-bits</span>
          </div>
          <div class="flex items-center gap-1.5">
            <i class="fas fa-lock text-blue-400"></i>
            <span>Données chiffrées</span>
          </div>
          <div class="flex items-center gap-1.5">
            <i class="fas fa-university text-indigo-400"></i>
            <span>Régulé AMF</span>
          </div>
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

const leftFeatures = [
  { icon: 'fas fa-envelope', title: 'Lien sécurisé par email', description: 'Recevez un lien de réinitialisation unique et temporaire' },
  { icon: 'fas fa-clock', title: 'Validité de 24 heures', description: 'Le lien expire automatiquement pour votre sécurité' },
  { icon: 'fas fa-shield-alt', title: 'Vos fonds restent protégés', description: 'La réinitialisation n\'affecte pas vos investissements' }
]

const securityFeatures = [
  'Cryptage SSL 256-bits',
  'Authentification à deux facteurs disponible',
  'Fonds ségrégués et protégés',
  'Régulé AMF n° CIP 18000001'
]

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

<style scoped>
.alert-enter-active,
.alert-leave-active {
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}
.alert-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}
.alert-leave-to {
  opacity: 0;
  transform: translateY(-5px);
}
</style>
