
<template>
  <nav class="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100 transition-all duration-300">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <!-- Logo -->
        <NuxtLink to="/" class="flex items-center space-x-2 group">
          <div class="relative">
            <i class="fas fa-chart-line text-blue-600 text-2xl group-hover:scale-110 transition-transform duration-300"></i>
            <div class="absolute -inset-1 bg-blue-100 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
          </div>
          <span class="text-2xl font-bold brand-name">InvestFuture</span>
        </NuxtLink>

        <!-- Menu desktop et tablette -->
        <div class="hidden lg:flex items-center space-x-8">
          <button
              @click="scrollToSection('home')"
              :class="getNavLinkClass(activeSection === 'home')"
              class="nav-link"
          >
            Accueil
          </button>
          <button
              @click="scrollToSection('domaines')"
              :class="getNavLinkClass(activeSection === 'domaines')"
              class="nav-link"
          >
            Secteurs
          </button>
          <button
              @click="scrollToSection('comment')"
              :class="getNavLinkClass(activeSection === 'comment')"
              class="nav-link"
          >
            Comment ça marche
          </button>
          <button
              @click="scrollToSection('contact')"
              :class="getNavLinkClass(activeSection === 'contact')"
              class="nav-link"
          >
            Contact
          </button>
        </div>

        <!-- Boutons auth ou menu utilisateur -->
        <ClientOnly>
          <div class="hidden lg:flex items-center space-x-4">
            <template v-if="!isAuthenticated">
              <NuxtLink to="/auth/login" class="text-gray-700 hover:text-blue-600 font-medium transition-colors px-4 py-2 rounded-lg hover:bg-blue-50">
                Connexion
              </NuxtLink>
              <NuxtLink to="/auth/register" class="btn-primary relative overflow-hidden group">
                <span class="relative z-10">S'inscrire</span>
                <div class="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              </NuxtLink>
            </template>

            <template v-else>
              <div class="relative">
                <button
                    @click="toggleDropdown"
                    class="flex items-center space-x-2 text-gray-700 hover:text-blue-600 bg-gray-50 hover:bg-blue-50 px-4 py-2 rounded-lg transition-all duration-300 transform hover:scale-105"
                >
                  <div class="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                    {{ (user?.name || 'U').charAt(0).toUpperCase() }}
                  </div>
                  <span class="font-medium">{{ user?.name || 'Utilisateur' }}</span>
                  <i class="fas fa-chevron-down text-sm transition-transform duration-300" :class="{ 'rotate-180': showDropdown }"></i>
                </button>

                <!-- Dropdown amélioré -->
                <Transition name="dropdown">
                  <div v-show="showDropdown" class="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 py-2 overflow-hidden">
                    <div class="px-4 py-3 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-purple-50">
                      <div class="text-sm font-semibold text-gray-900">{{ user?.name || 'Utilisateur' }}</div>
                      <div class="text-xs text-gray-600">{{ user?.email }}</div>
                    </div>

                    <NuxtLink to="/dashboard" @click="closeDropdown" class="dropdown-item">
                      <i class="fas fa-chart-pie mr-3 text-blue-500"></i>
                      <span>Mon Portefeuille</span>
                    </NuxtLink>
                    <NuxtLink to="/investments" @click="closeDropdown" class="dropdown-item">
                      <i class="fas fa-history mr-3 text-green-500"></i>
                      <span>Mes Investissements</span>
                    </NuxtLink>
                    <NuxtLink to="/profile" @click="closeDropdown" class="dropdown-item">
                      <i class="fas fa-cog mr-3 text-gray-500"></i>
                      <span>Paramètres</span>
                    </NuxtLink>
                    <NuxtLink v-if="authStore.isAdmin" to="/admin" @click="closeDropdown" class="dropdown-item">
                      <i class="fas fa-shield-alt mr-3 text-purple-500"></i>
                      <span>Administration</span>
                    </NuxtLink>

                    <div class="border-t border-gray-100 mt-2 pt-2">
                      <button @click="logout" class="dropdown-item text-red-600 hover:bg-red-50">
                        <i class="fas fa-sign-out-alt mr-3"></i>
                        <span>Déconnexion</span>
                      </button>
                    </div>
                  </div>
                </Transition>
              </div>
            </template>
          </div>

          <!-- Fallback pour le SSR -->
          <template #fallback>
            <div class="hidden lg:flex items-center space-x-4">
              <div class="w-20 h-8 bg-gray-200 animate-pulse rounded-lg"></div>
              <div class="w-16 h-8 bg-gray-200 animate-pulse rounded-lg"></div>
            </div>
          </template>
        </ClientOnly>

        <!-- Menu mobile/tablette toggle -->
        <div class="lg:hidden">
          <button
              @click="toggleMobileMenu"
              class="relative p-2 text-gray-700 hover:text-blue-600 transition-colors group"
          >
            <div class="relative w-6 h-6 flex items-center justify-center">
              <span class="sr-only">Menu</span>
              <div class="block w-5 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <span
                    class="block absolute h-0.5 w-5 bg-current transform transition duration-500 ease-in-out"
                    :class="showMobileMenu ? 'rotate-45' : '-translate-y-1.5'"
                ></span>
                <span
                    class="block absolute h-0.5 w-5 bg-current transform transition duration-300 ease-in-out"
                    :class="showMobileMenu ? 'opacity-0' : ''"
                ></span>
                <span
                    class="block absolute h-0.5 w-5 bg-current transform transition duration-500 ease-in-out"
                    :class="showMobileMenu ? '-rotate-45' : 'translate-y-1.5'"
                ></span>
              </div>
            </div>
          </button>
        </div>
      </div>

      <!-- Menu mobile/tablette -->
      <Transition name="mobile-menu">
        <div v-show="showMobileMenu" class="lg:hidden py-4 border-t border-gray-100 bg-white/95 backdrop-blur-md">
          <div class="flex flex-col space-y-1">
            <button
                @click="scrollToSectionMobile('home')"
                :class="getMobileNavLinkClass(activeSection === 'home')"
                class="mobile-nav-link"
            >
              <i class="fas fa-home mr-3 text-blue-500"></i>
              Accueil
            </button>
            <button
                @click="scrollToSectionMobile('domaines')"
                :class="getMobileNavLinkClass(activeSection === 'domaines')"
                class="mobile-nav-link"
            >
              <i class="fas fa-industry mr-3 text-green-500"></i>
              Secteurs
            </button>
            <button
                @click="scrollToSectionMobile('comment')"
                :class="getMobileNavLinkClass(activeSection === 'comment')"
                class="mobile-nav-link"
            >
              <i class="fas fa-question-circle mr-3 text-purple-500"></i>
              Comment ça marche
            </button>
            <button
                @click="scrollToSectionMobile('contact')"
                :class="getMobileNavLinkClass(activeSection === 'contact')"
                class="mobile-nav-link"
            >
              <i class="fas fa-envelope mr-3 text-orange-500"></i>
              Contact
            </button>

            <ClientOnly>
              <template v-if="!isAuthenticated">
                <div class="border-t border-gray-100 pt-4 mt-4 space-y-1">
                  <NuxtLink to="/auth/login" @click="closeMobileMenu" class="mobile-nav-link text-blue-600">
                    <i class="fas fa-sign-in-alt mr-3"></i>
                    Connexion
                  </NuxtLink>
                  <NuxtLink to="/auth/register" @click="closeMobileMenu" class="btn-primary mx-4 mt-2 text-center">
                    S'inscrire
                  </NuxtLink>
                </div>
              </template>

              <template v-else>
                <div class="border-t border-gray-100 pt-4 mt-4 space-y-1">
                  <div class="px-4 py-2 bg-gradient-to-r from-blue-50 to-purple-50 mx-4 rounded-lg mb-2">
                    <div class="text-sm font-semibold text-gray-900">{{ user?.name || 'Utilisateur' }}</div>
                    <div class="text-xs text-gray-600">{{ user?.email }}</div>
                  </div>

                  <NuxtLink to="/dashboard" @click="closeMobileMenu" class="mobile-nav-link">
                    <i class="fas fa-chart-pie mr-3 text-blue-500"></i>
                    Mon Portefeuille
                  </NuxtLink>
                  <NuxtLink to="/investments" @click="closeMobileMenu" class="mobile-nav-link">
                    <i class="fas fa-history mr-3 text-green-500"></i>
                    Mes Investissements
                  </NuxtLink>
                  <NuxtLink to="/profile" @click="closeMobileMenu" class="mobile-nav-link">
                    <i class="fas fa-cog mr-3 text-gray-500"></i>
                    Paramètres
                  </NuxtLink>
                  <NuxtLink v-if="authStore.isAdmin" to="/admin" @click="closeMobileMenu" class="mobile-nav-link">
                    <i class="fas fa-shield-alt mr-3 text-purple-500"></i>
                    Administration
                  </NuxtLink>

                  <div class="border-t border-gray-100 pt-2 mt-2">
                    <button @click="logout" class="mobile-nav-link text-red-600 w-full text-left">
                      <i class="fas fa-sign-out-alt mr-3"></i>
                      Déconnexion
                    </button>
                  </div>
                </div>
              </template>
            </ClientOnly>
          </div>
        </div>
      </Transition>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '~/stores/auth'
import { useSmoothScroll } from '~/composables/useSmoothScroll'

const authStore = useAuthStore()
const { isAuthenticated, user } = storeToRefs(authStore)
const { scrollToSection } = useSmoothScroll()

const showDropdown = ref(false)
const showMobileMenu = ref(false)
const activeSection = ref('home')

// Navigation handlers
const scrollToSectionAndHighlight = (sectionId) => {
  activeSection.value = sectionId
  scrollToSection(sectionId)
}

const scrollToSectionMobile = (sectionId) => {
  scrollToSectionAndHighlight(sectionId)
  closeMobileMenu()
}

// Style helpers
const getNavLinkClass = (isActive) => {
  return isActive
      ? 'text-blue-600 font-semibold border-b-2 border-blue-600 pb-1'
      : 'text-gray-700 hover:text-blue-600 font-medium transition-all duration-300 hover:border-b-2 hover:border-blue-200 pb-1'
}

const getMobileNavLinkClass = (isActive) => {
  return isActive
      ? 'bg-blue-50 text-blue-600 border-r-4 border-blue-600'
      : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
}

// Menu controls
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

// Click outside handler
const handleClickOutside = (event) => {
  if (!event.target.closest('.relative')) {
    showDropdown.value = false
  }
}

// Scroll spy pour mettre en surbrillance la section active
const handleScroll = () => {
  if (!process.client) return

  const sections = ['home', 'domaines', 'comment', 'contact']
  const scrollPosition = window.scrollY + 100

  for (const sectionId of sections) {
    const element = document.getElementById(sectionId)
    if (element) {
      const offsetTop = element.offsetTop
      const offsetHeight = element.offsetHeight

      if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
        activeSection.value = sectionId
        break
      }
    }
  }
}

// Lifecycle
onMounted(() => {
  authStore.initAuth()
  document.addEventListener('click', handleClickOutside)
  window.addEventListener('scroll', handleScroll)
  handleScroll() // Initial check
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
/* Navigation styles */
.nav-link {
  @apply font-medium transition-all duration-300 cursor-pointer px-3 py-2 rounded-lg hover:bg-blue-50;
}

.mobile-nav-link {
  @apply block px-4 py-3 transition-all duration-300 cursor-pointer flex items-center;
}

.dropdown-item {
  @apply block px-4 py-3 text-gray-700 hover:bg-gray-50 transition-all duration-300 flex items-center w-full text-left;
}

/* Dropdown animation */
.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-10px) scale(0.95);
}

/* Mobile menu animation */
.mobile-menu-enter-active,
.mobile-menu-leave-active {
  transition: all 0.3s ease;
}

.mobile-menu-enter-from,
.mobile-menu-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* Hamburger animation improvements */
.group:hover .block {
  @apply scale-110;
}
</style>