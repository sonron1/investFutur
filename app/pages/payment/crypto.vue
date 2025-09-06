<template>
  <div class="min-h-screen bg-gray-50">
    <Navbar />

    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="bg-white rounded-2xl shadow-lg p-8">
        <div class="flex items-center mb-6">
          <i class="fas fa-lock text-blue-600 text-2xl mr-3"></i>
          <h1 class="text-2xl font-bold text-gray-900">Paiement sécurisé</h1>
        </div>
        <p class="text-gray-600 mb-8">Vérifiez les détails avant de procéder.</p>

        <div v-if="error" class="mb-6 p-4 bg-red-50 border border-red-200 text-red-800 rounded-lg">
          {{ error }}
        </div>

        <div v-else class="space-y-6">
          <!-- Détails du paiement -->
          <div class="grid md:grid-cols-3 gap-6">
            <div class="bg-gray-50 p-4 rounded-lg">
              <div class="text-sm text-gray-500 mb-1">Montant</div>
              <div class="text-xl font-bold text-gray-900">{{ formatCurrency(amount) }}</div>
            </div>
            <div class="bg-gray-50 p-4 rounded-lg">
              <div class="text-sm text-gray-500 mb-1">Méthode</div>
              <div class="text-xl font-bold text-gray-900 uppercase">{{ method }}</div>
            </div>
            <div class="bg-gray-50 p-4 rounded-lg" v-if="sector">
              <div class="text-sm text-gray-500 mb-1">Secteur</div>
              <div class="text-xl font-bold text-gray-900">{{ sector.name }}</div>
            </div>
          </div>

          <!-- Conversion crypto -->
          <div class="p-6 bg-blue-50 rounded-xl">
            <div class="flex items-center mb-4">
              <i :class="getCryptoIcon(method)" class="text-2xl mr-3"></i>
              <div>
                <div class="text-sm text-gray-600">Montant équivalent estimé</div>
                <div class="text-2xl font-bold text-gray-900">{{ cryptoAmount }} {{ method.toUpperCase() }}</div>
              </div>
            </div>
          </div>

          <!-- Boutons d'action -->
          <div class="flex flex-col sm:flex-row gap-4">
            <button
                @click="simulatePay"
                :disabled="loading"
                class="btn-primary flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <i v-if="loading" class="fas fa-spinner fa-spin mr-2"></i>
              <i v-else class="fas fa-check mr-2"></i>
              {{ loading ? 'Traitement...' : 'Confirmer et payer' }}
            </button>
            <NuxtLink to="/" class="btn-outline text-center">
              Annuler
            </NuxtLink>
          </div>
        </div>
      </div>

      <p class="text-center text-gray-500 text-sm mt-6">
        Les conversions crypto sont indicatives. Le montant final est calculé au moment du paiement.
      </p>
    </div>

    <Footer />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute, navigateTo } from '#imports'
import { useInvestmentData } from '~/composables/useInvestmentData'
import { useUserInvestmentsStore } from '~/stores/user-investments'

useSeoMeta({
  title: 'Paiement crypto - InvestFuture',
  description: 'Procéder au paiement sécurisé en crypto-monnaie'
})

const route = useRoute()
const { getSectorById } = useInvestmentData()
const userInvestments = useUserInvestmentsStore()

const amount = Number(route.query.amount || 0)
const method = String(route.query.method || '').toLowerCase()
const sectorId = Number(route.query.sector || 0)

const sector = getSectorById(sectorId)
const error = ref<string | null>(null)
const loading = ref(false)

const rates: Record<string, number> = {
  bitcoin: 0.024,
  ethereum: 0.45,
  usdt: 1,
  bnb: 0.0167
}

const cryptoAmount = computed(() => {
  if (!method || !amount || !rates[method]) return 0
  return (amount * rates[method]).toFixed(6)
})

const getCryptoIcon = (m: string) => {
  const icons: Record<string, string> = {
    bitcoin: 'fab fa-bitcoin text-yellow-500',
    ethereum: 'fab fa-ethereum text-blue-500',
    usdt: 'fas fa-dollar-sign text-green-500',
    bnb: 'fas fa-coins text-yellow-600'
  }
  return icons[m] || 'fas fa-coins'
}

const formatCurrency = (v: number) =>
    new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(v)

if (!amount || !method || !sector) {
  error.value = "Paramètres de paiement invalides."
} else if (!(sector.paymentMethods || []).includes(method)) {
  error.value = "Méthode de paiement non disponible pour ce secteur."
} else if (amount < (sector.minInvestment || 5000)) {
  error.value = "Le montant est inférieur à l'investissement minimum pour ce secteur."
}

const simulatePay = async () => {
  loading.value = true
  await new Promise((r) => setTimeout(r, 1500))
  loading.value = false

  try {
    const roiNumber = sector?.roi ? Number(String(sector.roi).replace('%', '').trim()) : 0
    userInvestments.loadFromStorage()
    userInvestments.addInvestment({
      sector: sector?.name || 'Secteur',
      project: 'Investissement sectoriel',
      amount,
      roi: isNaN(roiNumber) ? 0 : roiNumber,
      status: 'actif'
    })
  } catch {
    // Ignorer les erreurs de stockage pour le MVP
  }

  navigateTo('/investments')
}
</script>