
<template>
  <nav class="bg-white/95 backdrop-blur-sm border-b border-slate-100 sticky top-0 z-50 transition-all duration-300">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <!-- Logo -->
        <NuxtLink to="/" class="flex items-center space-x-2.5 group">
          <div class="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
            <i class="fas fa-chart-line text-white text-sm"></i>
          </div>
          <span class="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">InvestFutur</span>
        </NuxtLink>

        <!-- Menu desktop -->
        <div class="hidden lg:flex items-center space-x-1">
          <button
              @click="scrollToSection('home')"
              :class="getNavLinkClass(activeSection === 'home')"
              class="nav-link"
          >
            {{ $t('nav.home') }}
          </button>
          <button
              @click="scrollToSection('domaines')"
              :class="getNavLinkClass(activeSection === 'domaines')"
              class="nav-link"
          >
            {{ $t('nav.sectors') }}
          </button>
          <button
              @click="scrollToSection('comment')"
              :class="getNavLinkClass(activeSection === 'comment')"
              class="nav-link"
          >
            {{ $t('nav.howItWorks') }}
          </button>
          <button
              @click="scrollToSection('contact')"
              :class="getNavLinkClass(activeSection === 'contact')"
              class="nav-link"
          >
            {{ $t('nav.contact') }}
          </button>
        </div>

        <!-- Boutons auth ou menu utilisateur -->
        <ClientOnly>
          <div class="hidden lg:flex items-center space-x-3">
            <!-- Language switcher -->
            <button
              @click="switchLanguage"
              class="flex items-center space-x-1.5 text-slate-500 hover:text-blue-600 hover:bg-slate-50 px-3 py-2 rounded-lg transition-all duration-200 text-sm font-medium"
              :title="locale === 'fr' ? 'Switch to English' : 'Passer en français'"
            >
              <span class="text-base">{{ locale === 'fr' ? '🇬🇧' : '🇫🇷' }}</span>
              <span class="text-xs font-semibold">{{ locale === 'fr' ? 'EN' : 'FR' }}</span>
            </button>
            <template v-if="!isAuthenticated">
              <NuxtLink to="/auth/login" class="text-slate-600 hover:text-blue-600 font-medium transition-colors px-4 py-2 rounded-lg hover:bg-slate-50 text-sm">
                {{ $t('nav.login') }}
              </NuxtLink>
              <NuxtLink to="/auth/register" class="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-semibold text-sm transition-all duration-200 shadow-sm hover:shadow-md">
                {{ $t('nav.register') }}
              </NuxtLink>
            </template>

            <template v-else>
              <div class="relative">
                <button
                    @click="toggleDropdown"
                    class="flex items-center space-x-2.5 text-slate-700 hover:text-blue-600 bg-slate-50 hover:bg-blue-50 px-3 py-2 rounded-lg transition-all duration-200"
                >
                  <div class="w-7 h-7 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                    {{ (authStore.fullName || user?.email || 'U').charAt(0).toUpperCase() }}
                  </div>
                  <span class="font-medium text-sm">{{ authStore.fullName || 'Utilisateur' }}</span>
                  <i class="fas fa-chevron-down text-xs text-slate-400 transition-transform duration-200" :class="{ 'rotate-180': showDropdown }"></i>
                </button>

                <!-- Dropdown -->
                <Transition name="dropdown">
                  <div v-show="showDropdown" class="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-slate-100 py-1.5 overflow-hidden">
                    <div class="px-4 py-3 border-b border-slate-100 bg-slate-50">
                      <div class="text-sm font-semibold text-slate-900">{{ authStore.fullName || 'Utilisateur' }}</div>
                      <div class="text-xs text-slate-500 mt-0.5">{{ user?.email }}</div>
                    </div>

                    <NuxtLink to="/dashboard" @click="closeDropdown" class="dropdown-item">
                      <i class="fas fa-chart-pie mr-3 text-blue-500 w-4"></i>
                      <span>{{ $t('nav.portfolio') }}</span>
                    </NuxtLink>
                    <NuxtLink to="/investments" @click="closeDropdown" class="dropdown-item">
                      <i class="fas fa-history mr-3 text-emerald-500 w-4"></i>
                      <span>{{ $t('nav.investments') }}</span>
                    </NuxtLink>
                    <NuxtLink to="/kyc" @click="closeDropdown" class="dropdown-item">
                      <i class="fas fa-id-card mr-3 text-violet-500 w-4"></i>
                      <span>Vérification KYC</span>
                      <span v-if="authStore.user?.kycStatus === 'PENDING'" class="ml-auto text-xs bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded-full font-semibold">!</span>
                    </NuxtLink>
                    <NuxtLink to="/profile" @click="closeDropdown" class="dropdown-item">
                      <i class="fas fa-cog mr-3 text-slate-400 w-4"></i>
                      <span>{{ $t('nav.settings') }}</span>
                    </NuxtLink>
                    <NuxtLink v-if="authStore.isAdmin" to="/admin" @click="closeDropdown" class="dropdown-item">
                      <i class="fas fa-shield-alt mr-3 text-indigo-500 w-4"></i>
                      <span>{{ $t('nav.admin') }}</span>
                    </NuxtLink>

                    <div class="border-t border-slate-100 mt-1 pt-1">
                      <button @click="logout" class="dropdown-item text-red-500 hover:bg-red-50 w-full text-left">
                        <i class="fas fa-sign-out-alt mr-3 w-4"></i>
                        <span>{{ $t('nav.logout') }}</span>
                      </button>
                    </div>
                  </div>
                </Transition>
              </div>
            </template>
          </div>

          <!-- Fallback SSR -->
          <template #fallback>
            <div class="hidden lg:flex items-center space-x-3">
              <div class="w-20 h-8 bg-slate-100 animate-pulse rounded-lg"></div>
              <div class="w-20 h-8 bg-slate-100 animate-pulse rounded-lg"></div>
            </div>
          </template>
        </ClientOnly>

        <!-- Mobile menu toggle -->
        <div class="lg:hidden">
          <button
              @click="toggleMobileMenu"
              class="p-2 text-slate-600 hover:text-blue-600 hover:bg-slate-50 rounded-lg transition-colors"
          >
            <span class="sr-only">Menu</span>
            <div class="relative w-5 h-5 flex items-center justify-center">
              <span
                  class="block absolute h-0.5 w-5 bg-current transform transition duration-300 ease-in-out"
                  :class="showMobileMenu ? 'rotate-45' : '-translate-y-1.5'"
              ></span>
              <span
                  class="block absolute h-0.5 w-5 bg-current transform transition duration-200 ease-in-out"
                  :class="showMobileMenu ? 'opacity-0' : ''"
              ></span>
              <span
                  class="block absolute h-0.5 w-5 bg-current transform transition duration-300 ease-in-out"
                  :class="showMobileMenu ? '-rotate-45' : 'translate-y-1.5'"
              ></span>
            </div>
          </button>
        </div>
      </div>

      <!-- Mobile menu -->
      <Transition name="mobile-menu">
        <div v-show="showMobileMenu" class="lg:hidden border-t border-slate-100 bg-white">
          <div class="py-3 space-y-0.5">
            <button
                @click="scrollToSectionMobile('home')"
                :class="getMobileNavLinkClass(activeSection === 'home')"
                class="mobile-nav-link"
            >
              <i class="fas fa-home mr-3 w-4 text-slate-400"></i>
              {{ $t('nav.home') }}
            </button>
            <button
                @click="scrollToSectionMobile('domaines')"
                :class="getMobileNavLinkClass(activeSection === 'domaines')"
                class="mobile-nav-link"
            >
              <i class="fas fa-industry mr-3 w-4 text-slate-400"></i>
              {{ $t('nav.sectors') }}
            </button>
            <button
                @click="scrollToSectionMobile('comment')"
                :class="getMobileNavLinkClass(activeSection === 'comment')"
                class="mobile-nav-link"
            >
              <i class="fas fa-question-circle mr-3 w-4 text-slate-400"></i>
              {{ $t('nav.howItWorks') }}
            </button>
            <button
                @click="scrollToSectionMobile('contact')"
                :class="getMobileNavLinkClass(activeSection === 'contact')"
                class="mobile-nav-link"
            >
              <i class="fas fa-envelope mr-3 w-4 text-slate-400"></i>
              {{ $t('nav.contact') }}
            </button>
            <!-- Mobile language switcher -->
            <button
              @click="switchLanguage"
              class="mobile-nav-link text-slate-600"
            >
              <span class="mr-3 w-4 text-center">{{ locale === 'fr' ? '🇬🇧' : '🇫🇷' }}</span>
              {{ locale === 'fr' ? 'English' : 'Français' }}
            </button>

            <ClientOnly>
              <template v-if="!isAuthenticated">
                <div class="border-t border-slate-100 pt-3 mt-3 px-4 space-y-2">
                  <NuxtLink to="/auth/login" @click="closeMobileMenu" class="flex items-center w-full px-4 py-2.5 text-slate-700 hover:text-blue-600 hover:bg-slate-50 rounded-lg font-medium text-sm transition-colors">
                    <i class="fas fa-sign-in-alt mr-3 w-4 text-slate-400"></i>
                    {{ $t('nav.login') }}
                  </NuxtLink>
                  <NuxtLink to="/auth/register" @click="closeMobileMenu" class="flex items-center justify-center w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg font-semibold text-sm transition-colors">
                    {{ $t('nav.register') }}
                  </NuxtLink>
                </div>
              </template>

              <template v-else>
                <div class="border-t border-slate-100 pt-3 mt-3">
                  <div class="px-4 py-3 bg-slate-50 mx-4 rounded-lg mb-2">
                    <div class="text-sm font-semibold text-slate-900">{{ authStore.fullName || 'Utilisateur' }}</div>
                    <div class="text-xs text-slate-500 mt-0.5">{{ user?.email }}</div>
                  </div>

                  <NuxtLink to="/dashboard" @click="closeMobileMenu" class="mobile-nav-link">
                    <i class="fas fa-chart-pie mr-3 w-4 text-blue-500"></i>
                    {{ $t('nav.portfolio') }}
                  </NuxtLink>
                  <NuxtLink to="/investments" @click="closeMobileMenu" class="mobile-nav-link">
                    <i class="fas fa-history mr-3 w-4 text-emerald-500"></i>
                    {{ $t('nav.investments') }}
                  </NuxtLink>
                  <NuxtLink to="/kyc" @click="closeMobileMenu" class="mobile-nav-link">
                    <i class="fas fa-id-card mr-3 w-4 text-violet-500"></i>
                    Vérification KYC
                  </NuxtLink>
                  <NuxtLink to="/profile" @click="closeMobileMenu" class="mobile-nav-link">
                    <i class="fas fa-cog mr-3 w-4 text-slate-400"></i>
                    {{ $t('nav.settings') }}
                  </NuxtLink>
                  <NuxtLink v-if="authStore.isAdmin" to="/admin" @click="closeMobileMenu" class="mobile-nav-link">
                    <i class="fas fa-shield-alt mr-3 w-4 text-indigo-500"></i>
                    {{ $t('nav.admin') }}
                  </NuxtLink>

                  <div class="border-t border-slate-100 mt-2 pt-2">
                    <button @click="logout" class="mobile-nav-link text-red-500 w-full text-left">
                      <i class="fas fa-sign-out-alt mr-3 w-4"></i>
                      {{ $t('nav.logout') }}
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

const { locale, locales, setLocale } = useI18n()
const switchLanguage = () => {
  const next = locale.value === 'fr' ? 'en' : 'fr'
  setLocale(next)
}

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
      ? 'text-blue-600 font-semibold relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-blue-600 after:rounded-full'
      : 'text-slate-600 hover:text-slate-900 font-medium transition-colors duration-200'
}

const getMobileNavLinkClass = (isActive) => {
  return isActive
      ? 'bg-blue-50 text-blue-600 border-l-2 border-blue-600'
      : 'text-slate-700 hover:text-blue-600 hover:bg-slate-50'
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

// Scroll spy
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
  handleScroll()
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.nav-link {
  @apply relative font-medium transition-all duration-200 cursor-pointer px-3 py-2 rounded-lg hover:bg-slate-50 text-sm;
}

.mobile-nav-link {
  @apply flex items-center px-4 py-2.5 text-sm font-medium transition-all duration-200 cursor-pointer;
}

.dropdown-item {
  @apply flex items-center px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 transition-colors duration-150 w-full text-left;
}

/* Dropdown animation */
.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.2s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-8px) scale(0.96);
}

/* Mobile menu animation */
.mobile-menu-enter-active,
.mobile-menu-leave-active {
  transition: all 0.25s ease;
}

.mobile-menu-enter-from,
.mobile-menu-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
