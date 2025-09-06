<template>
  <div class="min-h-screen bg-gray-50">
    <Navbar />

    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-8">Mon Profil</h1>

        <div class="text-center mb-8">
          <div class="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <i class="fas fa-user text-3xl text-gray-400"></i>
          </div>
          <h2 class="text-2xl font-semibold text-gray-900">{{ user?.name || 'Utilisateur' }}</h2>
          <p class="text-gray-600 mt-1">{{ user?.email }}</p>
        </div>

        <div class="text-center">
          <div class="mb-6">
            <p class="text-gray-600">Fonctionnalité en cours de développement</p>
          </div>
          <NuxtLink to="/dashboard" class="btn-primary">
            Retour au dashboard
          </NuxtLink>
        </div>
      </div>
    </div>

    <Footer />
  </div>
</template>

<script setup>
import { useAuthStore } from '~/stores/auth'

const authStore = useAuthStore()
const { user } = storeToRefs(authStore)

useSeoMeta({
  title: 'Mon Profil - InvestFuture'
})

onMounted(() => {
  if (!authStore.isAuthenticated) {
    navigateTo('/auth/login')
  }
})
</script>