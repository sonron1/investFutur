<template>
  <div>
    <Navbar />

    <div class="profile-page bg-light min-vh-100">
      <div class="container py-5">
        <div class="row">
          <div class="col-12">
            <h1 class="h3 mb-4">Mon Profil</h1>

            <div class="card border-0 shadow-sm">
              <div class="card-body p-4">
                <div class="text-center mb-4">
                  <div class="avatar-placeholder mb-3">
                    <i class="fas fa-user fa-3x text-muted"></i>
                  </div>
                  <h4>{{ user?.name || 'Utilisateur' }}</h4>
                  <p class="text-muted">{{ user?.email }}</p>
                </div>

                <div class="text-center">
                  <p class="text-muted">Fonctionnalité en cours de développement</p>
                  <NuxtLink to="/dashboard" class="btn btn-primary">
                    Retour au dashboard
                  </NuxtLink>
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

<style scoped>
.avatar-placeholder {
  width: 100px;
  height: 100px;
  background: #f8f9fa;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
}
</style>