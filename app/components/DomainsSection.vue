<template>
  <section id="domaines" class="domains-section bg-light">
    <div class="container">
      <div class="row mb-5">
        <div class="col-lg-8 mx-auto text-center" data-aos="fade-up">
          <h2 class="section-title">Secteurs d'investissement</h2>
          <p class="section-description">
            Diversifiez votre portefeuille avec nos secteurs d'avenir soigneusement sélectionnés
          </p>
        </div>
      </div>

      <div class="row g-4">
        <div
            class="col-lg-4 col-md-6"
            v-for="(sector, index) in sectors"
            :key="sector.id"
            data-aos="fade-up"
            :data-aos-delay="index * 100"
        >
          <div class="sector-card-simple h-100">
            <div class="sector-image-simple">
              <img :src="sector.image" :alt="sector.name" class="img-fluid" loading="lazy">
            </div>
            <div class="sector-content-simple">
              <h5>{{ sector.name }}</h5>
              <p class="text-muted mb-3">{{ sector.description }}</p>

              <div class="sector-stats-simple">
                <span class="roi-badge-simple">ROI {{ sector.roi }}%</span>
                <span class="projects-count-simple">{{ sector.projects }} projets</span>
              </div>

              <button
                  class="btn btn-outline-primary w-100 mt-3"
                  @click="openInvestmentModal(sector)"
              >
                Investir
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const sectors = [
  {
    id: 1,
    name: 'Technologies Vertes',
    description: 'Investissez dans les énergies renouvelables et les technologies propres',
    roi: 22,
    projects: 45,
    image: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 2,
    name: 'Biotechnologies',
    description: 'Soutenez l\'innovation médicale et pharmaceutique de demain',
    roi: 18,
    projects: 32,
    image: 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 3,
    name: 'Fintech',
    description: 'Participez à la révolution des services financiers digitaux',
    roi: 25,
    projects: 28,
    image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 4,
    name: 'Intelligence Artificielle',
    description: 'Investissez dans l\'IA et l\'automatisation intelligente',
    roi: 30,
    projects: 21,
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 5,
    name: 'E-commerce',
    description: 'Soutenez les plateformes de commerce en ligne innovantes',
    roi: 16,
    projects: 38,
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 6,
    name: 'Blockchain',
    description: 'Participez à l\'économie décentralisée et aux cryptomonnaies',
    roi: 28,
    projects: 15,
    image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
  }
]

// Fonction pour ouvrir le modal d'investissement
const openInvestmentModal = (sector) => {
  // Émettre un événement pour ouvrir le modal avec les données du secteur
  const modalElement = document.getElementById('investmentModal')
  if (modalElement) {
    const modal = new window.bootstrap.Modal(modalElement)
    modal.show()

    // Stocker les données du secteur sélectionné
    useState('selectedSector', () => sector)
  }
}
</script>