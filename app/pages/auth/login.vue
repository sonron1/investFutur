<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
    <!-- Éléments décoratifs -->
    <div class="absolute inset-0 overflow-hidden">
      <div class="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
      <div class="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
      <div class="absolute bottom-1/4 left-1/3 w-96 h-96 bg-indigo-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
    </div>

    <div class="relative z-10 flex items-center justify-center min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div class="max-w-md w-full space-y-8">
        <!-- Carte principale -->
        <div class="bg-white/80 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-white/20">
          <!-- Logo animé -->
          <div class="text-center mb-8">
            <NuxtLink
                @click="handleReturnHome"
                class="flex items-center justify-center space-x-3 group cursor-pointer"
            >
              <div class="relative">
                <i class="fas fa-chart-line text-blue-600 text-4xl group-hover:scale-110 transition-transform duration-300"></i>
                <div class="absolute -inset-2 bg-blue-100 rounded-full opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
              </div>
              <h3 class="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                InvestFuture
              </h3>
            </NuxtLink>

            <div class="mt-6 flex items-center justify-center space-x-2">
              <div class="h-0.5 w-8 bg-gradient-to-r from-transparent to-blue-300"></div>
              <div class="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              <span class="text-sm font-medium text-blue-700 px-3 py-1 bg-blue-50 rounded-full">
                Connexion sécurisée
              </span>
              <div class="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              <div class="h-0.5 w-8 bg-gradient-to-l from-transparent to-blue-300"></div>
            </div>
          </div>

          <!-- Titre principal -->
          <div class="text-center mb-8">
            <h2 class="text-3xl font-bold text-gray-900 mb-2">Bon retour !</h2>
            <p class="text-gray-600">Connectez-vous pour accéder à votre portefeuille d'investissements</p>
          </div>

          <!-- Alerts améliorées -->
          <Transition name="alert" appear>
            <div v-if="errorMessage" class="mb-6 p-4 bg-red-50 border border-red-200 text-red-800 rounded-xl flex items-center">
              <i class="fas fa-exclamation-circle text-red-500 mr-3"></i>
              <div>
                <div class="font-medium">Erreur de connexion</div>
                <div class="text-sm">{{ errorMessage }}</div>
              </div>
            </div>
          </Transition>

          <Transition name="alert" appear>
            <div v-if="successMessage" class="mb-6 p-4 bg-green-50 border border-green-200 text-green-800 rounded-xl flex items-center">
              <i class="fas fa-check-circle text-green-500 mr-3"></i>
              <div>
                <div class="font-medium">Connexion réussie !</div>
                <div class="text-sm">{{ successMessage }}</div>
              </div>
            </div>
          </Transition>

          <!-- Formulaire -->
          <form @submit.prevent="handleLogin" class="space-y-6">
            <!-- Email -->
            <div class="space-y-2">
              <label for="email" class="block text-sm font-semibold text-gray-700">
                <i class="fas fa-envelope mr-2 text-blue-500"></i>
                Adresse email
              </label>
              <div class="relative">
                <input
                    type="email"
                    id="email"
                    v-model="form.email"
                    required
                    :class="[
                    'form-input pl-12 h-12',
                    { 'border-red-300 focus:border-red-500 focus:ring-red-500/20': emailError }
                  ]"
                    placeholder="votre@email.com"
                    @blur="validateEmail"
                >
                <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <i class="fas fa-at text-gray-400"></i>
                </div>
              </div>
              <div v-if="emailError" class="text-red-600 text-sm flex items-center">
                <i class="fas fa-info-circle mr-1"></i>
                {{ emailError }}
              </div>
            </div>

            <!-- Mot de passe -->
            <div class="space-y-2">
              <label for="password" class="block text-sm font-semibold text-gray-700">
                <i class="fas fa-lock mr-2 text-purple-500"></i>
                Mot de passe
              </label>
              <div class="relative">
                <input
                    :type="showPassword ? 'text' : 'password'"
                    id="password"
                    v-model="form.password"
                    required
                    class="form-input pl-12 pr-12 h-12"
                    placeholder="Votre mot de passe sécurisé"
                >
                <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <i class="fas fa-key text-gray-400"></i>
                </div>
                <button
                    type="button"
                    @click="togglePasswordVisibility"
                    class="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600"
                >
                  <i :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
                </button>
              </div>
            </div>

            <!-- Options -->
            <div class="flex items-center justify-between">
              <div class="flex items-center">
                <input
                    type="checkbox"
                    id="remember"
                    v-model="form.remember"
                    class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded transition-colors"
                >
                <label for="remember" class="ml-2 block text-sm text-gray-700">
                  Se souvenir de moi
                </label>
              </div>
              <NuxtLink
                  to="/auth/forgot-password"
                  class="text-sm text-blue-600 hover:text-blue-500 transition-colors flex items-center group"
              >
                <i class="fas fa-key mr-1 group-hover:rotate-12 transition-transform"></i>
                Mot de passe oublié ?
              </NuxtLink>
            </div>

            <!-- Bouton de connexion -->
            <button
                type="submit"
                :disabled="isLoading || !isFormValid"
                class="w-full relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white py-4 px-6 rounded-xl font-bold transition-all duration-300 transform hover:scale-[1.02] disabled:hover:scale-100 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
            >
              <span v-if="!isLoading" class="flex items-center justify-center">
                <i class="fas fa-sign-in-alt mr-3"></i>
                Se connecter
              </span>
              <span v-else class="flex items-center justify-center">
                <div class="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
                Connexion en cours...
              </span>
            </button>
          </form>

          <!-- Divider -->
          <div class="mt-8 relative">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-gray-200"></div>
            </div>
            <div class="relative flex justify-center text-sm">
              <span class="px-4 bg-white text-gray-500">Nouveau sur InvestFuture ?</span>
            </div>
          </div>

          <!-- Lien inscription -->
          <div class="mt-6 text-center">
            <p class="text-gray-600 mb-4">
              Rejoignez plus de 2,500 investisseurs qui nous font confiance
            </p>
            <NuxtLink
                to="/auth/register"
                class="inline-flex items-center justify-center w-full px-6 py-3 border-2 border-blue-600 text-blue-600 font-semibold rounded-xl hover:bg-blue-600 hover:text-white transition-all duration-300 transform hover:scale-[1.02]"
            >
              <i class="fas fa-user-plus mr-2"></i>
              Créer un compte gratuitement
            </NuxtLink>
          </div>

          <!-- Retour à l'accueil -->
          <div class="mt-8 text-center">
            <button
                @click="handleReturnHome"
                class="inline-flex items-center text-gray-500 hover:text-blue-600 text-sm transition-colors group"
            >
              <i class="fas fa-arrow-left mr-2 group-hover:-translate-x-1 transition-transform"></i>
              Retour à l'accueil
            </button>
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
  </div>
</template>

<script setup>
import { useAuthStore } from '~/stores/auth'

useSeoMeta({
  title: 'Connexion - InvestFuture',
  description: 'Connectez-vous à votre compte InvestFuture pour gérer vos investissements'
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
/* Animations */
.animation-delay-2000 {
  animation-delay: 2s;
}

.animation-delay-4000 {
  animation-delay: 4s;
}

/* Transitions pour les alerts */
.alert-enter-active,
.alert-leave-active {
  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.alert-enter-from {
  opacity: 0;
  transform: translateY(-20px) scale(0.95);
}

.alert-leave-to {
  opacity: 0;
  transform: translateY(-10px) scale(0.98);
}
</style>