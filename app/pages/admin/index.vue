<template>
  <div class="min-h-screen bg-gray-50">
    <Navbar />

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- En-tête -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-2">Administration</h1>
        <p class="text-gray-600">Gestion de la plateforme InvestFuture</p>
      </div>

      <!-- Statistiques admin -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div v-for="stat in adminStats" :key="stat.title" class="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div class="flex items-center">
            <div class="p-3 rounded-lg bg-blue-100">
              <i :class="stat.icon" class="text-2xl text-blue-600"></i>
            </div>
            <div class="ml-4">
              <div class="text-2xl font-bold text-gray-900">{{ stat.value }}</div>
              <div class="text-gray-600">{{ stat.title }}</div>
            </div>
          </div>
        </div>
      </div>

      <div class="grid lg:grid-cols-3 gap-8">
        <!-- Gestion des utilisateurs -->
        <div class="lg:col-span-2">
          <div class="bg-white rounded-xl shadow-sm border border-gray-100">
            <div class="px-6 py-4 border-b border-gray-100">
              <h2 class="text-xl font-semibold text-gray-900">Utilisateurs récents</h2>
            </div>
            <div class="overflow-x-auto">
              <table class="w-full">
                <thead class="bg-gray-50">
                <tr>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nom</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Rôle</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date d'inscription</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
                </thead>
                <tbody class="divide-y divide-gray-200">
                <tr v-for="user in mockUsers" :key="user.id" class="hover:bg-gray-50">
                  <td class="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{{ user.name }}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-gray-600">{{ user.email }}</td>
                  <td class="px-6 py-4 whitespace-nowrap">
                      <span :class="user.role === 'admin' ? 'inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800' : 'inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800'">
                        {{ user.role }}
                      </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-gray-600">{{ user.createdAt }}</td>
                  <td class="px-6 py-4 whitespace-nowrap space-x-2">
                    <button class="text-gray-600 hover:text-gray-800">
                      <i class="fas fa-edit"></i>
                    </button>
                    <button v-if="user.role !== 'admin'" class="text-red-600 hover:text-red-800">
                      <i class="fas fa-trash"></i>
                    </button>
                  </td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- Actions rapides -->
        <div class="bg-white rounded-xl shadow-sm border border-gray-100">
          <div class="px-6 py-4 border-b border-gray-100">
            <h2 class="text-xl font-semibold text-gray-900">Actions rapides</h2>
          </div>
          <div class="p-6 space-y-4">
            <button class="w-full flex items-center justify-center px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <i class="fas fa-plus mr-2"></i>
              Ajouter un secteur
            </button>
            <button class="w-full flex items-center justify-center px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
              <i class="fas fa-chart-bar mr-2"></i>
              Voir les statistiques
            </button>
            <button class="w-full flex items-center justify-center px-4 py-3 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors">
              <i class="fas fa-cog mr-2"></i>
              Paramètres
            </button>
          </div>
        </div>
      </div>
    </div>

    <Footer />
  </div>
</template>

<script setup>
import { useAuthStore } from '~/stores/auth'

useSeoMeta({
  title: 'Administration - InvestFuture'
})

const authStore = useAuthStore()

onMounted(() => {
  if (!authStore.isAuthenticated || !authStore.isAdmin) {
    navigateTo('/dashboard')
  }
})

const adminStats = [
  { title: 'Utilisateurs', value: '1,234', icon: 'fas fa-users' },
  { title: 'Investissements', value: '5,678', icon: 'fas fa-chart-pie' },
  { title: 'Secteurs', value: '6', icon: 'fas fa-industry' },
  { title: 'Volume total', value: '2.5M€', icon: 'fas fa-euro-sign' }
]

const mockUsers = [
  { id: 1, name: 'Admin', email: 'admin@investfuture.com', role: 'admin', createdAt: '2024-01-15' },
  { id: 2, name: 'Jean Dupont', email: 'jean.dupont@email.com', role: 'user', createdAt: '2024-03-20' },
  { id: 3, name: 'Marie Martin', email: 'marie.martin@email.com', role: 'user', createdAt: '2024-03-22' },
  { id: 4, name: 'Pierre Durand', email: 'pierre.durand@email.com', role: 'user', createdAt: '2024-03-25' }
]
</script>