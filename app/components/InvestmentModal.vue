<template>
  <!-- Simple modal sans Bootstrap - sera remplacé par HeadlessUI plus tard -->
  <div v-if="isOpen" class="fixed inset-0 z-50 overflow-y-auto">
    <div class="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:p-0">
      <div class="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" @click="closeModal"></div>

      <div class="relative inline-block w-full max-w-2xl p-6 my-8 text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-2xl font-bold text-gray-900">
            <i class="fas fa-chart-line text-blue-600 mr-2"></i>
            Investir dans {{ selectedSector?.name || 'ce secteur' }}
          </h3>
          <button @click="closeModal" class="text-gray-400 hover:text-gray-600 transition-colors">
            <i class="fas fa-times text-xl"></i>
          </button>
        </div>

        <div v-if="selectedSector" class="mb-6">
          <div class="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <img :src="selectedSector.image" :alt="selectedSector.name" class="w-full h-48 object-cover rounded-lg">
            </div>
            <div class="space-y-4">
              <div>
                <h4 class="font-semibold text-blue-600">{{ selectedSector.name }}</h4>
                <p class="text-sm text-gray-600">{{ selectedSector.description }}</p>
              </div>
              <div class="space-y-2 text-sm">
                <div class="flex justify-between">
                  <span>ROI estimé:</span>
                  <strong class="text-green-600">{{ selectedSector.roi }}%</strong>
                </div>
                <div class="flex justify-between">
                  <span>Projets disponibles:</span>
                  <strong>{{ selectedSector.projects }}</strong>
                </div>
                <div class="flex justify-between">
                  <span>Minimum:</span>
                  <strong>{{ formatCurrency(selectedSector.minInvestment || 5000) }}</strong>
                </div>
              </div>
            </div>
          </div>

          <form @submit.prevent="submitInvestment" class="space-y-4">
            <div class="grid md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Montant (€)</label>
                <input
                    type="number"
                    v-model="investmentAmount"
                    min="5000"
                    step="100"
                    required
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                <p class="text-xs text-gray-500 mt-1">Minimum 5 000€</p>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Méthode de paiement</label>
                <select v-model="paymentMethod" required class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                  <option value="">Choisir une méthode</option>
                  <option value="bitcoin">Bitcoin (BTC)</option>
                  <option value="ethereum">Ethereum (ETH)</option>
                  <option value="usdt">Tether (USDT)</option>
                  <option value="bnb">Binance Coin (BNB)</option>
                </select>
              </div>
            </div>

            <div v-if="paymentMethod" class="p-4 bg-gray-50 rounded-lg">
              <div class="flex items-center space-x-2 mb-2">
                <i :class="getCryptoIcon(paymentMethod)" class="text-xl"></i>
                <strong>{{ getCryptoName(paymentMethod) }}</strong>
              </div>
              <p class="text-sm text-gray-600">
                Montant équivalent: {{ cryptoAmount }} {{ paymentMethod.toUpperCase() }}
              </p>
            </div>

            <div class="flex items-start space-x-2">
              <input
                  type="checkbox"
                  id="acceptTerms"
                  v-model="acceptTerms"
                  required
                  class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mt-1"
              >
              <label for="acceptTerms" class="text-sm text-gray-700">
                J'accepte les <a href="#" class="text-blue-600 hover:text-blue-500">conditions générales</a>
                et les <a href="#" class="text-blue-600 hover:text-blue-500">risques d'investissement</a>
              </label>
            </div>

            <div class="flex flex-col sm:flex-row gap-3 pt-4">
              <button type="button" @click="closeModal" class="btn-outline">
                Annuler
              </button>
              <button
                  type="submit"
                  :disabled="!canInvest"
                  class="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <i class="fas fa-lock mr-2"></i>
                Procéder au paiement
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { navigateTo } from '#imports'

const selectedSector = useState('selectedSector', () => null)
const isOpen = useState('investmentModalOpen', () => false)

const investmentAmount = ref(5000)
const paymentMethod = ref('')
const acceptTerms = ref(false)

const canInvest = computed(() => {
  return investmentAmount.value >= 5000 && paymentMethod.value && acceptTerms.value
})

const cryptoAmount = computed(() => {
  if (!paymentMethod.value || !investmentAmount.value) return 0
  const rates = {
    bitcoin: 0.024,
    ethereum: 0.45,
    usdt: 1000,
    bnb: 16.7
  }
  const rate = rates[paymentMethod.value] || 0
  return (investmentAmount.value * rate).toFixed(6)
})

const getCryptoIcon = (method) => {
  const icons = {
    bitcoin: 'fab fa-bitcoin text-yellow-500',
    ethereum: 'fab fa-ethereum text-blue-500',
    usdt: 'fas fa-dollar-sign text-green-500',
    bnb: 'fas fa-coins text-yellow-600'
  }
  return icons[method] || 'fas fa-coins'
}

const getCryptoName = (method) => {
  const names = {
    bitcoin: 'Bitcoin',
    ethereum: 'Ethereum',
    usdt: 'Tether USD',
    bnb: 'Binance Coin'
  }
  return names[method] || method
}

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(amount)
}

const closeModal = () => {
  isOpen.value = false
}

const submitInvestment = async () => {
  if (!canInvest.value) return

  try {
    await navigateTo(`/payment/crypto?amount=${investmentAmount.value}&method=${paymentMethod.value}&sector=${selectedSector.value?.id}`)
    closeModal()
  } catch (error) {
    console.error('Erreur lors de la soumission:', error)
  }
}
</script>