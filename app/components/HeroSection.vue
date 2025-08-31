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
            <img src="/images/heureuse femme.jpeg" alt="Investissement" class="img-fluid rounded-3 shadow">
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
</script>