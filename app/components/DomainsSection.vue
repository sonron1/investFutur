<template>
  <section id="domaines" class="py-20 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- En-tête -->
      <div class="text-center mb-16" data-aos="fade-up">
        <h2 class="section-title">Secteurs d'investissement</h2>
        <p class="section-description">
          Diversifiez votre portefeuille avec nos secteurs d'avenir soigneusement sélectionnés
        </p>
      </div>

      <!-- Grille des secteurs -->
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div
            v-for="(sector, index) in sectors"
            :key="sector.id"
            :data-aos="'fade-up'"
            :data-aos-delay="index * 100"
            class="group"
        >
          <div class="card overflow-hidden h-full">
            <!-- Image avec fallback -->
            <ImageWithFallback
                :src="sector.image"
                :alt="sector.name"
                container-class="h-48 group"
                img-class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                :overlay="true"
                :badge="true"
            >
              <template #badge>
                <span class="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  ROI {{ sector.roi }}%
                </span>
              </template>
            </ImageWithFallback>

            <!-- Contenu -->
            <div class="p-6">
              <h3 class="text-xl font-bold text-gray-900 mb-2">{{ sector.name }}</h3>
              <p class="text-gray-600 mb-4 text-sm leading-relaxed">{{ sector.description }}</p>

              <!-- Stats -->
              <div class="flex justify-between items-center mb-4">
                <div class="text-sm text-gray-500">{{ sector.projects }} projets</div>
                <div class="text-sm text-gray-500">Min. 5 000€</div>
              </div>

              <!-- Bouton -->
              <button
                  @click="openInvestmentModal(sector)"
                  class="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition-colors duration-300"
              >
                Investir maintenant
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { nextTick } from 'vue'

const sectors = [
  {
    id: 1,
    name: 'Technologies Vertes',
    description: 'Investissez dans les énergies renouvelables et les technologies propres',
    roi: 22,
    projects: 45,
    image: 'https://images.unsplash.com/photo-1559302504-64aae6ca6b6d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 2,
    name: 'Biotechnologies',
    description: 'Soutenez l\'innovation médicale et pharmaceutique de demain',
    roi: 18,
    projects: 32,
    image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 3,
    name: 'Fintech',
    description: 'Participez à la révolution des services financiers digitaux',
    roi: 25,
    projects: 28,
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 4,
    name: 'Intelligence Artificielle',
    description: 'Investissez dans l\'IA et l\'automatisation intelligente',
    roi: 30,
    projects: 21,
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 5,
    name: 'E-commerce',
    description: 'Soutenez les plateformes de commerce en ligne innovantes',
    roi: 16,
    projects: 38,
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 6,
    name: 'Blockchain',
    description: 'Participez à l\'économie décentralisée et aux cryptomonnaies',
    roi: 28,
    projects: 15,
    image: 'https://images.unsplash.com/photo-1518546305927-5a555bb7020d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
  }
]

const openInvestmentModal = async (sector) => {
  // Utiliser le state global de Nuxt
  const selectedSector = useState('selectedSector')
  const investmentModalOpen = useState('investmentModalOpen')

  selectedSector.value = sector
  investmentModalOpen.value = true

  // Forcer la réactivité
  await nextTick()
}
</script>