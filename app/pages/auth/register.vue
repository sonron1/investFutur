<template>
  <div class="auth-page min-vh-100 d-flex align-items-center bg-light">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-6 col-lg-5">
          <div class="card shadow-lg border-0">
            <div class="card-body p-5">
              <!-- Logo -->
              <div class="text-center mb-4">
                <NuxtLink to="/" class="d-flex align-items-center justify-content-center text-decoration-none">
                  <i class="fas fa-chart-line text-primary me-2 fa-2x"></i>
                  <h3 class="brand-name mb-0">InvestFuture</h3>
                </NuxtLink>
              </div>

              <h4 class="text-center mb-4">Créer un compte</h4>

              <!-- Alerts -->
              <div v-if="errorMessage" class="alert alert-danger" role="alert">
                {{ errorMessage }}
              </div>

              <div v-if="successMessage" class="alert alert-success" role="alert">
                {{ successMessage }}
              </div>

              <!-- Formulaire -->
              <form @submit.prevent="handleRegister">
                <div class="row">
                  <div class="col-md-6 mb-3">
                    <label for="firstName" class="form-label">Prénom</label>
                    <input
                        type="text"
                        id="firstName"
                        v-model="form.firstName"
                        class="form-control"
                        required
                        placeholder="Votre prénom"
                    >
                  </div>
                  <div class="col-md-6 mb-3">
                    <label for="lastName" class="form-label">Nom</label>
                    <input
                        type="text"
                        id="lastName"
                        v-model="form.lastName"
                        class="form-control"
                        required
                        placeholder="Votre nom"
                    >
                  </div>
                </div>

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
                      placeholder="Au moins 8 caractères"
                  >
                </div>

                <div class="mb-3">
                  <label for="confirmPassword" class="form-label">Confirmer le mot de passe</label>
                  <input
                      type="password"
                      id="confirmPassword"
                      v-model="form.confirmPassword"
                      class="form-control"
                      required
                      placeholder="Confirmez votre mot de passe"
                  >
                </div>

                <div class="mb-3 form-check">
                  <input
                      type="checkbox"
                      id="terms"
                      v-model="form.acceptTerms"
                      class="form-check-input"
                      required
                  >
                  <label for="terms" class="form-check-label">
                    J'accepte les <a href="#" class="text-primary">conditions d'utilisation</a>
                    et la <a href="#" class="text-primary">politique de confidentialité</a>
                  </label>
                </div>

                <div class="mb-3 form-check">
                  <input
                      type="checkbox"
                      id="newsletter"
                      v-model="form.newsletter"
                      class="form-check-input"
                  >
                  <label for="newsletter" class="form-check-label">
                    Je souhaite recevoir la newsletter
                  </label>
                </div>

                <button
                    type="submit"
                    class="btn btn-primary w-100 mb-3"
                    :disabled="isLoading || !isFormValid"
                >
                  <span v-if="isLoading">
                    <i class="fas fa-spinner fa-spin me-2"></i>
                    Création du compte...
                  </span>
                  <span v-else>
                    <i class="fas fa-user-plus me-2"></i>
                    Créer mon compte
                  </span>
                </button>
              </form>

              <!-- Liens -->
              <div class="text-center">
                <p class="mb-0">
                  Déjà un compte ?
                  <NuxtLink to="/auth/login" class="text-primary fw-semibold">
                    Se connecter
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
  title: 'Inscription - InvestFuture',
  description: 'Créez votre compte InvestFuture et commencez à investir'
})

const authStore = useAuthStore()

// État du formulaire
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

// Validation du formulaire
const isFormValid = computed(() => {
  return form.firstName &&
      form.lastName &&
      form.email &&
      form.password &&
      form.confirmPassword &&
      form.password === form.confirmPassword &&
      form.acceptTerms
})

// Gestion de l'inscription
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

      // Redirection vers le dashboard après 1 seconde
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