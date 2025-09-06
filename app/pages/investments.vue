
<template>
  <div class="min-h-screen bg-gray-50 flex flex-col">
    <Navbar />

    <div class="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- En-tête -->
      <div class="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <div>
          <h1 class="text-3xl font-bold text-gray-900 mb-2">Mes Investissements</h1>
          <p class="text-gray-600">Gérez et suivez vos investissements</p>
        </div>
        <NuxtLink to="/#domaines" class="btn-primary mt-4 md:mt-0">
          <i class="fas fa-plus mr-2"></i>
          Nouvel investissement
        </NuxtLink>
      </div>

      <!-- Statistiques -->
      <div v-if="investments.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div v-for="stat in portfolioStats" :key="stat.title" class="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div class="text-3xl font-bold text-blue-600 mb-1">{{ stat.value }}</div>
          <div class="text-gray-600">{{ stat.title }}</div>
        </div>
      </div>

      <!-- Liste des investissements -->
      <div class="bg-white rounded-xl shadow-sm border border-gray-100">
        <div v-if="investments.length === 0" class="text-center py-16">
          <div class="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <i class="fas fa-chart-pie text-4xl text-gray-400"></i>
          </div>
          <h3 class="text-xl font-semibold text-gray-900 mb-2">Aucun investissement</h3>
          <p class="text-gray-600 mb-8">Commencez à investir dans nos secteurs innovants</p>
          <NuxtLink to="/#domaines" class="btn-primary">
            Découvrir les opportunités
          </NuxtLink>
        </div>

        <div v-else>
          <div class="px-6 py-4 border-b border-gray-100">
            <h2 class="text-xl font-semibold text-gray-900">
              Portfolio ({{ investments.length }} investissement{{ investments.length > 1 ? 's' : '' }})
            </h2>
          </div>

          <!-- Version desktop -->
          <div class="hidden md:block">
            <div class="overflow-x-auto">
              <table class="w-full">
                <thead class="bg-gray-50">
                <tr>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Secteur</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Projet</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Montant</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ROI</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gains estimés</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
                </thead>
                <tbody class="divide-y divide-gray-200">
                <tr v-for="investment in investments" :key="investment.id" class="hover:bg-gray-50 transition-colors">
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="font-semibold text-gray-900">{{ investment.sector }}</div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-gray-600">{{ investment.project }}</td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="font-semibold text-blue-600">{{ formatCurrency(investment.amount) }}</div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                      <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                        {{ investment.roi }}%
                      </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="font-semibold text-green-600">{{ formatCurrency(calculateGains(investment)) }}</div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-gray-600">{{ formatDate(investment.date) }}</td>
                  <td class="px-6 py-4 whitespace-nowrap">
                      <span :class="getStatusBadgeClass(investment.status)">
                        {{ investment.status }}
                      </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <button
                        @click="removeInvestment(investment.id)"
                        class="text-red-600 hover:text-red-800 transition-colors"
                        title="Supprimer"
                    >
                      <i class="fas fa-trash"></i>
                    </button>
                  </td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- Version mobile -->
          <div class="md:hidden p-4 space-y-4">
            <div v-for="investment in investments" :key="investment.id" class="bg-gray-50 rounded-lg p-4">
              <div class="flex justify-between items-start mb-2">
                <div class="font-semibold text-gray-900">{{ investment.sector }}</div>
                <button
                    @click="removeInvestment(investment.id)"
                    class="text-red-600 hover:text-red-800 ml-2"
                >
                  <i class="fas fa-trash"></i>
                </button>
              </div>
              <div class="text-sm text-gray-600 mb-2">{{ investment.project }}</div>
              <div class="flex justify-between items-center mb-2">
                <div class="font-semibold text-blue-600">{{ formatCurrency(investment.amount) }}</div>
                <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                  {{ investment.roi }}%
                </span>
              </div>
              <div class="flex justify-between items-center text-sm">
                <div class="text-green-600">+{{ formatCurrency(calculateGains(investment)) }}</div>
                <div class="text-gray-500">{{ formatDate(investment.date) }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <Footer />
  </div>
</template>

<!-- Le script reste identique -->
<script setup>
import { onMounted } from 'vue'
import { useAuthStore } from '~/stores/auth'
import { useUserInvestmentsStore } from '~/stores/user-investments'

useSeoMeta({
  title: 'Mes Investissements - InvestFuture'
})

const authStore = useAuthStore()
const userInvestments = useUserInvestmentsStore()

const investments = computed(() => userInvestments.investments)

const portfolioStats = computed(() => [
  {
    title: 'Total investi',
    value: formatCurrency(userInvestments.totalAmount)
  },
  {
    title: 'Gains estimés',
    value: formatCurrency(userInvestments.totalGains)
  },
  {
    title: 'ROI moyen',
    value: userInvestments.avgRoi.toFixed(1) + '%'
  },
  {
    title: 'Investissements',
    value: userInvestments.count.toString()
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

const calculateGains = (investment) => {
  return (investment.amount * investment.roi) / 100
}

const getStatusBadgeClass = (status) => {
  const badges = {
    'actif': 'inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800',
    'terminé': 'inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800',
    'en_attente': 'inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800'
  }
  return badges[status] || 'inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800'
}

const removeInvestment = (id) => {
  if (confirm('Êtes-vous sûr de vouloir supprimer cet investissement ?')) {
    userInvestments.removeInvestment(id)
  }
}

onMounted(() => {
  if (!authStore.isAuthenticated) {
    navigateTo('/auth/login')
  }
  userInvestments.loadFromStorage()
})
</script>