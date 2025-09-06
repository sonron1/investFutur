<template>
  <div class="min-h-screen bg-gray-50">
    <Navbar />

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- En-tête -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900">Tableau de bord</h1>
        <p class="text-gray-600 mt-1">Bienvenue {{ user?.name || 'Investisseur' }}</p>
      </div>

      <!-- Statistiques principales -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div v-for="stat in stats" :key="stat.title" class="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div class="flex items-center">
            <div class="p-2 rounded-lg" :style="{ backgroundColor: stat.color + '20' }">
              <i :class="stat.icon + ' text-xl'" :style="{ color: stat.color }"></i>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">{{ stat.title }}</p>
              <p class="text-2xl font-bold" :style="{ color: stat.color }">{{ stat.value }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Contenu principal -->
      <div class="grid lg:grid-cols-3 gap-8">
        <!-- Mes investissements -->
        <div class="lg:col-span-2">
          <div class="bg-white rounded-xl shadow-sm border border-gray-100">
            <div class="p-6 border-b border-gray-100 flex justify-between items-center">
              <h2 class="text-xl font-semibold text-gray-900">Mes Investissements</h2>
              <NuxtLink to="/investments" class="text-blue-600 hover:text-blue-700 text-sm font-medium">
                Voir tout
              </NuxtLink>
            </div>

            <div class="p-6">
              <div v-if="investments.length === 0" class="text-center py-12">
                <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i class="fas fa-chart-pie text-2xl text-gray-400"></i>
                </div>
                <h3 class="text-lg font-medium text-gray-900 mb-2">Aucun investissement</h3>
                <p class="text-gray-500 mb-6">Commencez à investir dans nos secteurs innovants</p>
                <NuxtLink to="/#domaines" class="btn-primary">
                  Découvrir les secteurs
                </NuxtLink>
              </div>

              <div v-else class="space-y-4">
                <div v-for="investment in investments" :key="investment.id"
                     class="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div class="flex justify-between items-start">
                    <div>
                      <h4 class="font-semibold text-gray-900">{{ investment.sector }}</h4>
                      <p class="text-sm text-gray-600 mb-2">{{ investment.project }}</p>
                      <div class="flex items-center">
                        <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          {{ investment.roi }}% ROI
                        </span>
                      </div>
                    </div>
                    <div class="text-right">
                      <div class="text-lg font-semibold text-gray-900">{{ formatCurrency(investment.amount) }}</div>
                      <div class="text-sm text-gray-500">{{ formatDate(investment.date) }}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Actions rapides et notifications -->
        <div class="space-y-8">
          <!-- Actions rapides -->
          <div class="bg-white rounded-xl shadow-sm border border-gray-100">
            <div class="p-6 border-b border-gray-100">
              <h2 class="text-xl font-semibold text-gray-900">Actions rapides</h2>
            </div>
            <div class="p-6 space-y-3">
              <NuxtLink to="/#domaines" class="flex items-center justify-center w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <i class="fas fa-plus mr-2"></i>
                Nouvel investissement
              </NuxtLink>
              <NuxtLink to="/profile" class="flex items-center justify-center w-full px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                <i class="fas fa-user mr-2"></i>
                Mon profil
              </NuxtLink>
              <NuxtLink to="/investments" class="flex items-center justify-center w-full px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                <i class="fas fa-history mr-2"></i>
                Historique
              </NuxtLink>
            </div>
          </div>

          <!-- Notifications -->
          <div class="bg-white rounded-xl shadow-sm border border-gray-100">
            <div class="p-6 border-b border-gray-100">
              <h2 class="text-xl font-semibold text-gray-900">Notifications</h2>
            </div>
            <div class="p-6">
              <div class="flex items-start space-x-3">
                <div class="flex-shrink-0">
                  <i class="fas fa-bell text-blue-600"></i>
                </div>
                <div>
                  <h4 class="text-sm font-medium text-gray-900">Bienvenue !</h4>
                  <p class="text-sm text-gray-600">Découvrez nos secteurs d'investissement innovants.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <Footer />
  </div>
</template>

<script setup>
import { onMounted, computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '~/stores/auth'
import { useUserInvestmentsStore } from '~/stores/user-investments'

useSeoMeta({
  title: 'Dashboard - InvestFuture',
  description: 'Gérez vos investissements sur votre tableau de bord InvestFuture'
})

const authStore = useAuthStore()
const userInvestments = useUserInvestmentsStore()
const { user } = storeToRefs(authStore)

const investments = computed(() => userInvestments.investments.slice(0, 3))

const stats = computed(() => [
  {
    title: 'Portefeuille Total',
    value: formatCurrency(userInvestments.totalAmount),
    icon: 'fas fa-wallet',
    color: '#3b82f6'
  },
  {
    title: 'Investissements',
    value: userInvestments.count.toString(),
    icon: 'fas fa-chart-pie',
    color: '#10b981'
  },
  {
    title: 'ROI Moyen',
    value: userInvestments.avgRoi.toFixed(1) + '%',
    icon: 'fas fa-trending-up',
    color: '#f59e0b'
  },
  {
    title: 'Gains',
    value: formatCurrency(userInvestments.totalGains),
    icon: 'fas fa-coins',
    color: '#8b5cf6'
  }
])

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR'
  }).format(amount)
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('fr-FR')
}

onMounted(() => {
  if (!authStore.isAuthenticated) {
    navigateTo('/auth/login')
  }
  userInvestments.loadFromStorage()
})
</script>