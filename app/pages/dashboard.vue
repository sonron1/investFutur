<template>
  <div>
    <Navbar />

    <div class="dashboard-page bg-light min-vh-100">
      <div class="container py-5">
        <!-- En-tête -->
        <div class="row mb-4">
          <div class="col-12">
            <h1 class="h3 mb-1">Tableau de bord</h1>
            <p class="text-muted">Bienvenue {{ user?.name || 'Investisseur' }}</p>
          </div>
        </div>

        <!-- Statistiques principales -->
        <div class="row g-4 mb-5">
          <div class="col-md-3" v-for="stat in stats" :key="stat.title">
            <div class="card border-0 shadow-sm h-100">
              <div class="card-body text-center">
                <div class="mb-3">
                  <i :class="stat.icon" class="fa-2x" :style="{ color: stat.color }"></i>
                </div>
                <h3 class="h4 mb-1" :style="{ color: stat.color }">{{ stat.value }}</h3>
                <p class="text-muted mb-0">{{ stat.title }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Contenu principal -->
        <div class="row g-4">
          <!-- Mes investissements -->
          <div class="col-lg-8">
            <div class="card border-0 shadow-sm">
              <div class="card-header bg-white border-0 d-flex justify-content-between align-items-center">
                <h5 class="mb-0">Mes Investissements</h5>
                <NuxtLink to="/investments" class="btn btn-sm btn-outline-primary">
                  Voir tout
                </NuxtLink>
              </div>
              <div class="card-body">
                <div v-if="investments.length === 0" class="text-center py-5">
                  <i class="fas fa-chart-pie fa-3x text-muted mb-3"></i>
                  <h6 class="text-muted">Aucun investissement pour le moment</h6>
                  <p class="text-muted">Commencez à investir dans nos secteurs innovants</p>
                  <NuxtLink to="/#domaines" class="btn btn-primary">
                    Découvrir les secteurs
                  </NuxtLink>
                </div>

                <div v-else>
                  <div v-for="investment in investments" :key="investment.id" class="investment-item mb-3 p-3 border rounded">
                    <div class="d-flex justify-content-between align-items-start">
                      <div>
                        <h6 class="mb-1">{{ investment.sector }}</h6>
                        <p class="text-muted small mb-2">{{ investment.project }}</p>
                        <div class="d-flex align-items-center">
                          <span class="badge bg-success me-2">{{ investment.roi }}%</span>
                          <small class="text-muted">ROI actuel</small>
                        </div>
                      </div>
                      <div class="text-end">
                        <h6 class="mb-0">{{ formatCurrency(investment.amount) }}</h6>
                        <small class="text-muted">{{ investment.date }}</small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Actions rapides -->
          <div class="col-lg-4">
            <div class="card border-0 shadow-sm">
              <div class="card-header bg-white border-0">
                <h5 class="mb-0">Actions rapides</h5>
              </div>
              <div class="card-body">
                <div class="d-grid gap-2">
                  <NuxtLink to="/#domaines" class="btn btn-primary">
                    <i class="fas fa-plus me-2"></i>
                    Nouvel investissement
                  </NuxtLink>
                  <NuxtLink to="/profile" class="btn btn-outline-secondary">
                    <i class="fas fa-user me-2"></i>
                    Mon profil
                  </NuxtLink>
                  <NuxtLink to="/investments" class="btn btn-outline-info">
                    <i class="fas fa-history me-2"></i>
                    Historique
                  </NuxtLink>
                </div>
              </div>
            </div>

            <!-- Notifications -->
            <div class="card border-0 shadow-sm mt-4">
              <div class="card-header bg-white border-0">
                <h5 class="mb-0">Notifications</h5>
              </div>
              <div class="card-body">
                <div class="notification-item mb-3">
                  <div class="d-flex align-items-start">
                    <i class="fas fa-bell text-primary me-3 mt-1"></i>
                    <div>
                      <h6 class="mb-1">Bienvenue !</h6>
                      <p class="text-muted small mb-0">
                        Découvrez nos secteurs d'investissement innovants.
                      </p>
                    </div>
                  </div>
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
import { useAuthStore } from '~/stores/auth'

// Meta données
useSeoMeta({
  title: 'Dashboard - InvestFuture',
  description: 'Gérez vos investissements sur votre tableau de bord InvestFuture'
})

const authStore = useAuthStore()
const { user } = storeToRefs(authStore)

// Statistiques du dashboard
const stats = [
  {
    title: 'Portefeuille Total',
    value: '0€',
    icon: 'fas fa-wallet',
    color: '#007bff'
  },
  {
    title: 'Investissements',
    value: '0',
    icon: 'fas fa-chart-pie',
    color: '#28a745'
  },
  {
    title: 'ROI Moyen',
    value: '0%',
    icon: 'fas fa-trending-up',
    color: '#ffc107'
  },
  {
    title: 'Gains',
    value: '0€',
    icon: 'fas fa-coins',
    color: '#17a2b8'
  }
]

// Investissements (vide pour un nouveau utilisateur)
const investments = ref([])

// Utilitaire de formatage
const formatCurrency = (amount) => {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR'
  }).format(amount)
}

// Vérification de l'authentification
onMounted(() => {
  if (!authStore.isAuthenticated) {
    navigateTo('/auth/login')
  }
})
</script>

<style scoped>
.dashboard-page {
  padding-top: 2rem;
}

.investment-item {
  transition: all 0.3s ease;
}

.investment-item:hover {
  background-color: #f8f9fa;
  transform: translateY(-2px);
}

.notification-item {
  padding: 1rem 0;
  border-bottom: 1px solid #eee;
}

.notification-item:last-child {
  border-bottom: none;
}
</style>