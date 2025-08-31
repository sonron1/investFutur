<template>
  <div class="auth-page min-vh-100 d-flex align-items-center bg-light">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-6 col-lg-4">
          <div class="card shadow-lg border-0">
            <div class="card-body p-5">
              <!-- Logo -->
              <div class="text-center mb-4">
                <NuxtLink to="/" class="d-flex align-items-center justify-content-center text-decoration-none">
                  <i class="fas fa-chart-line text-primary me-2 fa-2x"></i>
                  <h3 class="brand-name mb-0">InvestFuture</h3>
                </NuxtLink>
              </div>

              <h4 class="text-center mb-4">Connexion</h4>

              <!-- Alerts -->
              <div v-if="errorMessage" class="alert alert-danger" role="alert">
                {{ errorMessage }}
              </div>

              <div v-if="successMessage" class="alert alert-success" role="alert">
                {{ successMessage }}
              </div>

              <!-- Formulaire -->
              <form @submit.prevent="handleLogin">
                <div class="mb-3">
                  <label for="email" class="form-label">Email</label>
                  <input
                      type="email"
                      id="email"
                      v-model="form.email"
                      class="form-control"
                      required
                      placeholder="votre@email.com"
                  >
                </div>

                <div class="mb-3">
                  <label for="password" class="form-label">Mot de passe</label>
                  <input
                      type="password"
                      id="password"
                      v-model="form.password"
                      class="form-control"
                      required
                      placeholder="Votre mot de passe"
                  >
                </div>

                <div class="mb-3 form-check">
                  <input
                      type="checkbox"
                      id="remember"
                      v-model="form.remember"
                      class="form-check-input"
                  >
                  <label for="remember" class="form-check-label">
                    Se souvenir de moi
                  </label>
                </div>

                <button
                    type="submit"
                    class="btn btn-primary w-100 mb-3"
                    :disabled="isLoading"
                >
                  <span v-if="isLoading">
                    <i class="fas fa-spinner fa-spin me-2"></i>
                    Connexion...
                  </span>
                  <span v-else>
                    <i class="fas fa-sign-in-alt me-2"></i>
                    Se connecter
                  </span>
                </button>
              </form>

              <!-- Liens -->
              <div class="text-center">
                <p class="mb-2">
                  <a href="#" class="text-primary">Mot de passe oublié ?</a>
                </p>
                <p class="mb-0">
                  Pas encore de compte ?
                  <NuxtLink to="/auth/register" class="text-primary fw-semibold">
                    S'inscrire
                  </NuxtLink>
                </p>
              </div>

              <!-- Retour à l'accueil -->
              <div class="text-center mt-4">
                <NuxtLink to="/" class="btn btn-outline-secondary">
                  <i class="fas fa-arrow-left me-2"></i>
                  Retour à l'accueil
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from '~/stores/auth'

// Meta données
useSeoMeta({
  title: 'Connexion - InvestFuture',
  description: 'Connectez-vous à votre compte InvestFuture'
})

const authStore = useAuthStore()

// État du formulaire
const form = reactive({
  email: '',
  password: '',
  remember: false
})

const isLoading = ref(false)
const errorMessage = ref('')
const successMessage = ref('')

// Gestion de la connexion
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

      // Redirection vers le dashboard après 1 seconde
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

// Rediriger si déjà connecté
onMounted(() => {
  if (authStore.isAuthenticated) {
    navigateTo('/dashboard')
  }
})
</script>

<style scoped>
.brand-name {
  background: linear-gradient(135deg, #007bff, #0056b3);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.auth-page {
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
}

.card {
  border-radius: 15px;
}
</style>