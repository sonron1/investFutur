<template>
  <section id="home" class="hero-section py-5">
    <div class="container">
      <div class="row min-vh-75 align-items-center">
        <div class="col-lg-6" data-aos="fade-right">
          <h1 class="hero-title mb-4">
            Investissez dans les
            <span class="text-primary">entreprises de demain</span>
          </h1>

          <p class="hero-subtitle mb-4">
            ROI moyen de <strong>18%</strong> • Minimum <strong>5 000€</strong>
          </p>

          <div class="hero-stats mb-4">
            <div class="row g-3">
              <div class="col-6 col-md-3" v-for="stat in stats" :key="stat.label">
                <div class="stat-item">
                  <h4 class="stat-number" :class="stat.colorClass">{{ stat.value }}</h4>
                  <small class="text-muted">{{ stat.label }}</small>
                </div>
              </div>
            </div>
          </div>

          <div class="hero-actions">
            <NuxtLink to="/auth/register" class="custom-btn custom-btn-primary custom-btn-lg me-3">
              Commencer
            </NuxtLink>
            <a href="#comment" class="custom-btn custom-btn-outline custom-btn-lg">
              En savoir plus
            </a>
          </div>
        </div>

        <div class="col-lg-6" data-aos="fade-left">
          <div class="hero-image">
            <!-- Utilisation d'une image existante dans votre dossier public avec fallback -->
            <img
                src="/images/heureuse femme.jpeg"
                alt="Investissement"
                class="img-fluid rounded-3 shadow"
                @error="handleImageError"
            >
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const stats = [
  {
    value: '189M€',
    label: 'Investis',
    colorClass: 'text-primary'
  },
  {
    value: '18%',
    label: 'ROI moyen',
    colorClass: 'text-success'
  },
  {
    value: '2547',
    label: 'Investisseurs',
    colorClass: 'text-warning'
  },
  {
    value: '156',
    label: 'Projets',
    colorClass: 'text-info'
  }
]

// Fonction de gestion d'erreur pour l'image
const handleImageError = (event) => {
  event.target.src = 'https://images.unsplash.com/photo-1580519542036-c47de6196ba5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
}
</script>