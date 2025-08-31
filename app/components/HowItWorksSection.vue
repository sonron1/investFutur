<template>
  <section id="comment" class="py-5">
    <div class="container">
      <div class="row mb-5">
        <div class="col-lg-8 mx-auto text-center" data-aos="fade-up">
          <h2 class="section-title">Comment ça marche ?</h2>
          <p class="section-description">
            Trois étapes simples pour commencer à investir dans l'innovation
          </p>
        </div>
      </div>

      <div class="row g-4">
        <div
            class="col-lg-4"
            v-for="(step, index) in steps"
            :key="step.id"
            data-aos="fade-up"
            :data-aos-delay="index * 200"
        >
          <div class="text-center">
            <div class="step-icon mb-4">
              <div class="icon-circle">
                <i :class="step.icon" class="fa-2x"></i>
              </div>
              <div class="step-number">{{ index + 1 }}</div>
            </div>
            <h4 class="mb-3">{{ step.title }}</h4>
            <p class="text-muted">{{ step.description }}</p>
          </div>
        </div>
      </div>

      <div class="row mt-5">
        <div class="col-lg-6 mx-auto text-center" data-aos="fade-up">
          <NuxtLink to="/auth/register" class="custom-btn custom-btn-primary custom-btn-lg">
            Commencer maintenant
          </NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const steps = [
  {
    id: 1,
    icon: 'fas fa-user-plus text-primary',
    title: 'Créez votre compte',
    description: 'Inscription simple et sécurisée en quelques minutes'
  },
  {
    id: 2,
    icon: 'fas fa-search text-success',
    title: 'Choisissez vos investissements',
    description: 'Explorez nos secteurs et sélectionnez vos projets préférés'
  },
  {
    id: 3,
    icon: 'fas fa-chart-line text-warning',
    title: 'Suivez vos performances',
    description: 'Surveillez vos investissements et recevez vos dividendes'
  }
]
</script>

<style scoped>
.step-icon {
  position: relative;
}

.icon-circle {
  width: 80px;
  height: 80px;
  background: rgba(0, 123, 255, 0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  transition: all 0.3s ease;
}

.step-number {
  position: absolute;
  top: -10px;
  right: 20px;
  background: #007bff;
  color: white;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 0.9rem;
}

.step-icon:hover .icon-circle {
  transform: scale(1.1);
  box-shadow: 0 5px 20px rgba(0, 123, 255, 0.2);
}
</style>