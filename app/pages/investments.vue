
<template>
  <div>
    <Navbar />

    <div class="investments-page bg-light min-vh-100">
      <div class="container py-5">
        <div class="row">
          <div class="col-12">
            <h1 class="h3 mb-4">Mes Investissements</h1>

            <div class="card border-0 shadow-sm">
              <div class="card-body text-center py-5">
                <i class="fas fa-chart-pie fa-3x text-muted mb-3"></i>
                <h5 class="text-muted">Aucun investissement pour le moment</h5>
                <p class="text-muted">Commencez à investir dans nos secteurs innovants</p>
                <NuxtLink to="/#domaines" class="btn btn-primary">
                  Découvrir les opportunités
                </NuxtLink>
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

const authStore = useAuthStore()

useSeoMeta({
  title: 'Mes Investissements - InvestFuture'
})

onMounted(() => {
  if (!authStore.isAuthenticated) {
    navigateTo('/auth/login')
  }
})
</script>