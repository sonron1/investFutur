<template>
  <nav class="sticky top-0 z-50 bg-white shadow-lg border-b border-gray-100">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <!-- Logo -->
        <NuxtLink to="/" class="flex items-center space-x-2">
          <i class="fas fa-chart-line text-blue-600 text-2xl"></i>
          <span class="text-2xl font-bold brand-name">InvestFuture</span>
        </NuxtLink>

        <!-- Menu desktop et tablette -->
        <div class="hidden lg:flex items-center space-x-8">
          <NuxtLink to="/#home" class="text-gray-700 hover:text-blue-600 font-medium transition-colors">Accueil</NuxtLink>
          <NuxtLink to="/#domaines" class="text-gray-700 hover:text-blue-600 font-medium transition-colors">Secteurs</NuxtLink>
          <NuxtLink to="/#comment" class="text-gray-700 hover:text-blue-600 font-medium transition-colors">Comment ça marche</NuxtLink>
          <NuxtLink to="/#contact" class="text-gray-700 hover:text-blue-600 font-medium transition-colors">Contact</NuxtLink>
        </div>

        <!-- Boutons auth ou menu utilisateur - ClientOnly pour éviter hydration mismatch -->
        <ClientOnly>
          <div class="hidden lg:flex items-center space-x-4">
            <template v-if="!isAuthenticated">
              <NuxtLink to="/auth/login" class="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                Connexion
              </NuxtLink>
              <NuxtLink to="/auth/register" class="btn-primary">
                S'inscrire
              </NuxtLink>
            </template>

            <template v-else>
              <div class="relative">
                <button @click="toggleDropdown" class="flex items-center space-x-2 text-gray-700 hover:text-blue-600 bg-gray-50 hover:bg-gray-100 px-4 py-2 rounded-lg transition-colors">
                  <i class="fas fa-user"></i>
                  <span>{{ user?.name || 'Utilisateur' }}</span>
                  <i class="fas fa-chevron-down text-sm"></i>
                </button>

                <!-- Dropdown -->
                <div v-show="showDropdown" class="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-2">
                  <NuxtLink to="/dashboard" @click="closeDropdown" class="block px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors">
                    <i class="fas fa-chart-pie mr-2"></i>Mon Portefeuille
                  </NuxtLink>
                  <NuxtLink to="/investments" @click="closeDropdown" class="block px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors">
                    <i class="fas fa-history mr-2"></i>Mes Investissements
                  </NuxtLink>
                  <NuxtLink to="/profile" @click="closeDropdown" class="block px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors">
                    <i class="fas fa-cog mr-2"></i>Paramètres
                  </NuxtLink>
                  <NuxtLink v-if="authStore.isAdmin" to="/admin" @click="closeDropdown" class="block px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors">
                    <i class="fas fa-shield-alt mr-2"></i>Administration
                  </NuxtLink>
                  <hr class="my-2 border-gray-100">
                  <button @click="logout" class="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 transition-colors">
                    <i class="fas fa-sign-out-alt mr-2"></i>Déconnexion
                  </button>
                </div>
              </div>
            </template>
          </div>

          <!-- Fallback pour le SSR -->
          <template #fallback>
            <div class="hidden lg:flex items-center space-x-4">
              <div class="w-20 h-8 bg-gray-200 animate-pulse rounded"></div>
              <div class="w-16 h-8 bg-gray-200 animate-pulse rounded"></div>
            </div>
          </template>
        </ClientOnly>

        <!-- Menu mobile/tablette toggle -->
        <div class="lg:hidden">
          <button @click="toggleMobileMenu" class="text-gray-700 hover:text-blue-600">
            <i class="fas fa-bars text-xl"></i>
          </button>
        </div>
      </div>

      <!-- Menu mobile/tablette -->
      <div v-show="showMobileMenu" class="lg:hidden py-4 border-t border-gray-100">
        <div class="flex flex-col space-y-2">
          <NuxtLink to="/#home" @click="closeMobileMenu" class="block py-2 text-gray-700 hover:text-blue-600 transition-colors">Accueil</NuxtLink>
          <NuxtLink to="/#domaines" @click="closeMobileMenu" class="block py-2 text-gray-700 hover:text-blue-600 transition-colors">Secteurs</NuxtLink>
          <NuxtLink to="/#comment" @click="closeMobileMenu" class="block py-2 text-gray-700 hover:text-blue-600 transition-colors">Comment ça marche</NuxtLink>
          <NuxtLink to="/#contact" @click="closeMobileMenu" class="block py-2 text-gray-700 hover:text-blue-600 transition-colors">Contact</NuxtLink>

          <ClientOnly>
            <template v-if="!isAuthenticated">
              <NuxtLink to="/auth/login" @click="closeMobileMenu" class="block py-2 text-gray-700 hover:text-blue-600 transition-colors">Connexion</NuxtLink>
              <NuxtLink to="/auth/register" @click="closeMobileMenu" class="btn-primary mt-2">S'inscrire</NuxtLink>
            </template>

            <template v-else>
              <div class="border-t border-gray-100 pt-2 mt-2">
                <NuxtLink to="/dashboard" @click="closeMobileMenu" class="block py-2 text-gray-700 hover:text-blue-600 transition-colors">
                  <i class="fas fa-chart-pie mr-2"></i>Mon Portefeuille
                </NuxtLink>
                <NuxtLink to="/investments" @click="closeMobileMenu" class="block py-2 text-gray-700 hover:text-blue-600 transition-colors">
                  <i class="fas fa-history mr-2"></i>Mes Investissements
                </NuxtLink>
                <NuxtLink to="/profile" @click="closeMobileMenu" class="block py-2 text-gray-700 hover:text-blue-600 transition-colors">
                  <i class="fas fa-cog mr-2"></i>Paramètres
                </NuxtLink>
                <button @click="logout" class="block w-full text-left py-2 text-red-600 hover:text-red-500 transition-colors">
                  <i class="fas fa-sign-out-alt mr-2"></i>Déconnexion
                </button>
              </div>
            </template>
          </ClientOnly>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '~/stores/auth'

const authStore = useAuthStore()
const { isAuthenticated, user } = storeToRefs(authStore)

const showDropdown = ref(false)
const showMobileMenu = ref(false)

const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value
}

const closeDropdown = () => {
  showDropdown.value = false
}

const toggleMobileMenu = () => {
  showMobileMenu.value = !showMobileMenu.value
}

const closeMobileMenu = () => {
  showMobileMenu.value = false
}

const logout = () => {
  authStore.logout()
  showDropdown.value = false
  showMobileMenu.value = false
  navigateTo('/auth/login')
}

// Fermer les menus en cliquant ailleurs
const handleClickOutside = (event) => {
  if (!event.target.closest('.relative')) {
    showDropdown.value = false
  }
}

// Initialiser l'auth côté client uniquement
onMounted(() => {
  authStore.initAuth()
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>