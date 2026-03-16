<template>
  <div class="min-h-screen bg-slate-50 flex flex-col">
    <Navbar />

    <div class="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="bg-white rounded-2xl border border-slate-100 shadow-sm p-8">
        <h1 class="text-2xl font-bold text-slate-900 mb-8">Mon Profil</h1>

        <div class="text-center mb-8">
          <div class="w-20 h-20 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-blue-100">
            <i class="fas fa-user text-2xl text-blue-600"></i>
          </div>
          <h2 class="text-xl font-bold text-slate-900">{{ user?.name || 'Utilisateur' }}</h2>
          <p class="text-slate-500 text-sm mt-1">{{ user?.email }}</p>
        </div>

        <div class="text-center">
          <div class="mb-6 p-4 bg-slate-50 rounded-xl border border-slate-100">
            <i class="fas fa-tools text-slate-400 text-lg mb-2 block"></i>
            <p class="text-slate-500 text-sm">Fonctionnalité en cours de développement</p>
          </div>
          <NuxtLink to="/dashboard" class="btn-primary inline-flex items-center">
            <i class="fas fa-arrow-left mr-2"></i>
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
