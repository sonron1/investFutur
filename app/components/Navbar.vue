<template>
  <nav class="navbar navbar-expand-lg navbar-light sticky-top bg-white shadow-sm">
    <div class="container">
      <NuxtLink class="navbar-brand fw-bold d-flex align-items-center" to="/">
        <i class="fas fa-chart-line text-primary me-2"></i>
        <span class="brand-name">InvestFuture</span>
      </NuxtLink>

      <button
          class="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav mx-auto">
          <li class="nav-item">
            <a class="nav-link" href="#home">Accueil</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#domaines">Secteurs</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#comment">Comment ça marche</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#contact">Contact</a>
          </li>
        </ul>

        <!-- Boutons d'authentification -->
        <div class="navbar-nav" v-if="!isAuthenticated" id="authButtons">
          <NuxtLink to="/auth/login" class="nav-link me-2">
            Connexion
          </NuxtLink>
          <NuxtLink to="/auth/register" class="custom-btn custom-btn-primary">
            S'inscrire
          </NuxtLink>
        </div>

        <!-- Menu utilisateur connecté -->
        <div class="navbar-nav" v-else id="userMenu">
          <div class="dropdown">
            <button
                class="btn btn-outline-primary dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
            >
              <i class="fas fa-user me-2"></i>
              <span>{{ user?.name || 'Utilisateur' }}</span>
            </button>
            <ul class="dropdown-menu">
              <li>
                <NuxtLink class="dropdown-item" to="/dashboard">
                  <i class="fas fa-chart-pie me-2"></i>Mon Portefeuille
                </NuxtLink>
              </li>
              <li>
                <NuxtLink class="dropdown-item" to="/investments">
                  <i class="fas fa-history me-2"></i>Mes Investissements
                </NuxtLink>
              </li>
              <li>
                <NuxtLink class="dropdown-item" to="/profile">
                  <i class="fas fa-cog me-2"></i>Paramètres
                </NuxtLink>
              </li>
              <li><hr class="dropdown-divider"></li>
              <li>
                <a class="dropdown-item" href="#" @click="logout">
                  <i class="fas fa-sign-out-alt me-2"></i>Déconnexion
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { useAuthStore } from '~/stores/auth'

const authStore = useAuthStore()
const { isAuthenticated, user } = storeToRefs(authStore)

// Initialiser l'authentification au montage
onMounted(() => {
  authStore.initAuth()
})

const logout = () => {
  authStore.logout()
  navigateTo('/auth/login')
}
</script>