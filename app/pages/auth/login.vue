<template>
  <div class="min-h-screen bg-slate-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-6">
      <!-- Card -->
      <div class="bg-white rounded-2xl border border-slate-100 shadow-sm p-8">
        <!-- Logo -->
        <div class="text-center mb-8">
          <NuxtLink
              @click="handleReturnHome"
              class="inline-flex items-center space-x-2.5 group cursor-pointer"
          >
            <div class="w-9 h-9 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
              <i class="fas fa-chart-line text-white text-sm"></i>
            </div>
            <span class="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              InvestFutur
            </span>
          </NuxtLink>
        </div>

        <!-- Title -->
        <div class="mb-6">
          <h2 class="text-2xl font-bold text-slate-900">Bon retour !</h2>
          <p class="text-slate-500 text-sm mt-1">Connectez-vous pour accéder à votre portefeuille</p>
        </div>

        <!-- Alerts -->
        <Transition name="alert" appear>
          <div v-if="errorMessage" class="mb-5 p-3.5 bg-red-50 border border-red-100 text-red-700 rounded-lg flex items-start text-sm">
            <i class="fas fa-exclamation-circle text-red-400 mr-2.5 mt-0.5 flex-shrink-0"></i>
            <div>
              <div class="font-semibold">Erreur de connexion</div>
              <div class="text-red-600 mt-0.5">{{ errorMessage }}</div>
            </div>
          </div>
        </Transition>

        <Transition name="alert" appear>
          <div v-if="successMessage" class="mb-5 p-3.5 bg-emerald-50 border border-emerald-100 text-emerald-700 rounded-lg flex items-start text-sm">
            <i class="fas fa-check-circle text-emerald-400 mr-2.5 mt-0.5 flex-shrink-0"></i>
            <div>
              <div class="font-semibold">Connexion réussie !</div>
              <div class="text-emerald-600 mt-0.5">{{ successMessage }}</div>
            </div>
          </div>
        </Transition>

        <!-- Form -->
        <form @submit.prevent="handleLogin" class="space-y-4">
          <!-- Email -->
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

          <!-- Password -->
          <div>
            <label for="password" class="block text-sm font-medium text-slate-700 mb-1.5">
              Mot de passe
            </label>
            <div class="relative">
              <input
                  :type="showPassword ? 'text' : 'password'"
                  id="password"
                  v-model="form.password"
                  required
                  class="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all duration-200 bg-white text-slate-900 placeholder-slate-400 pl-10 pr-10"
                  placeholder="Votre mot de passe"
              >
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <i class="fas fa-key text-slate-400 text-sm"></i>
              </div>
              <button
                  type="button"
                  @click="togglePasswordVisibility"
                  class="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
              >
                <i :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'" class="text-sm"></i>
              </button>
            </div>
          </div>

          <!-- Options -->
          <div class="flex items-center justify-between">
            <label class="flex items-center space-x-2 cursor-pointer">
              <input
                  type="checkbox"
                  v-model="form.remember"
                  class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-slate-300 rounded transition-colors"
              >
              <span class="text-sm text-slate-600">Se souvenir de moi</span>
            </label>
            <NuxtLink
                to="/auth/forgot-password"
                class="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors"
            >
              Mot de passe oublié ?
            </NuxtLink>
          </div>

          <!-- Submit button -->
          <button
              type="submit"
              :disabled="isLoading || !isFormValid"
              class="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white py-3 px-5 rounded-lg font-semibold transition-all duration-200 shadow-sm hover:shadow-md mt-2"
          >
            <span v-if="!isLoading" class="flex items-center justify-center">
              <i class="fas fa-sign-in-alt mr-2"></i>
              Se connecter
            </span>
            <span v-else class="flex items-center justify-center">
              <div class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
              Connexion en cours...
            </span>
          </button>
        </form>

        <!-- Divider -->
        <div class="my-6 relative">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t border-slate-100"></div>
          </div>
          <div class="relative flex justify-center text-xs">
            <span class="px-3 bg-white text-slate-400">Nouveau sur InvestFutur ?</span>
          </div>
        </div>

        <!-- Register link -->
        <NuxtLink
            to="/auth/register"
            class="flex items-center justify-center w-full px-5 py-2.5 border border-slate-200 hover:border-blue-500 hover:text-blue-600 text-slate-700 font-semibold rounded-lg transition-all duration-200 text-sm"
        >
          <i class="fas fa-user-plus mr-2"></i>
          Créer un compte gratuitement
        </NuxtLink>

        <!-- Back to home -->
        <div class="mt-5 text-center">
          <button
              @click="handleReturnHome"
              class="inline-flex items-center text-slate-400 hover:text-slate-600 text-sm transition-colors group"
          >
            <i class="fas fa-arrow-left mr-2 group-hover:-translate-x-0.5 transition-transform"></i>
            Retour à l'accueil
          </button>
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
import { useAuthStore } from '~/stores/auth'

useSeoMeta({
  title: 'Connexion - InvestFutur',
  description: 'Connectez-vous à votre compte InvestFutur pour gérer vos investissements'
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
const showPassword = ref(false)
const emailError = ref('')

const isFormValid = computed(() => {
  return form.email && form.password && !emailError.value
})

const validateEmail = () => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (form.email && !emailRegex.test(form.email)) {
    emailError.value = 'Veuillez saisir une adresse email valide'
  } else {
    emailError.value = ''
  }
}

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value
}

const handleReturnHome = () => {
  navigateTo('/')
}

const handleLogin = async () => {
  if (!isFormValid.value) return

  isLoading.value = true
  errorMessage.value = ''
  successMessage.value = ''

  try {
    const result = await authStore.login({
      email: form.email,
      password: form.password
    })

    if (result.success) {
      successMessage.value = 'Connexion réussie ! Redirection vers votre dashboard...'

      await new Promise(resolve => setTimeout(resolve, 1500))
      await navigateTo('/dashboard')
    } else {
      errorMessage.value = result.error || 'Email ou mot de passe incorrect'

      setTimeout(() => {
        errorMessage.value = ''
      }, 5000)
    }
  } catch (error) {
    errorMessage.value = 'Une erreur est survenue. Veuillez réessayer.'
    console.error('Login error:', error)

    setTimeout(() => {
      errorMessage.value = ''
    }, 5000)
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
