
<template>
  <!-- Modal améliorée avec animations et design moderne -->
  <Transition name="modal" appear>
    <div v-if="isOpen" class="fixed inset-0 z-50 overflow-y-auto">
      <!-- Backdrop -->
      <div
          class="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:p-0"
          @click="closeModal"
      >
        <Transition name="backdrop" appear>
          <div class="fixed inset-0 bg-gray-900 bg-opacity-75 backdrop-blur-sm transition-opacity"></div>
        </Transition>

        <!-- Modal panel -->
        <Transition name="panel" appear>
          <div
              class="relative inline-block w-full max-w-4xl my-8 text-left align-middle transition-all transform bg-white shadow-2xl rounded-3xl overflow-hidden"
              @click.stop
          >
            <!-- Header avec gradient -->
            <div class="bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-6">
              <div class="flex items-center justify-between">
                <div class="flex items-center space-x-4">
                  <div class="w-12 h-12 bg-white bg-opacity-20 rounded-xl flex items-center justify-center">
                    <i class="fas fa-chart-line text-2xl text-white"></i>
                  </div>
                  <div>
                    <h3 class="text-2xl font-bold text-white">
                      Investir dans {{ selectedSector?.name || 'ce secteur' }}
                    </h3>
                    <p class="text-blue-100 text-sm">
                      Opportunité d'investissement sélectionnée
                    </p>
                  </div>
                </div>
                <button
                    @click="closeModal"
                    class="w-10 h-10 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-xl flex items-center justify-center text-white transition-all duration-200 transform hover:scale-110"
                >
                  <i class="fas fa-times text-xl"></i>
                </button>
              </div>
            </div>

            <div v-if="selectedSector" class="p-8">
              <!-- Section présentation du secteur -->
              <div class="grid lg:grid-cols-2 gap-8 mb-8">
                <!-- Image et informations -->
                <div class="space-y-6">
                  <div class="relative overflow-hidden rounded-2xl">
                    <img
                        :src="selectedSector.image"
                        :alt="selectedSector.name"
                        class="w-full h-64 object-cover"
                    >
                    <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    <div class="absolute bottom-4 left-4">
                      <div class="bg-green-500 text-white px-3 py-1 rounded-full font-semibold text-sm">
                        ROI {{ selectedSector.roi }}%
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 class="text-xl font-bold text-gray-900 mb-2">{{ selectedSector.name }}</h4>
                    <p class="text-gray-600 leading-relaxed">{{ selectedSector.description }}</p>
                  </div>
                </div>

                <!-- Métriques détaillées -->
                <div class="space-y-6">
                  <div class="grid grid-cols-2 gap-4">
                    <div class="bg-blue-50 rounded-2xl p-4 text-center">
                      <div class="text-2xl font-bold text-blue-600">{{ selectedSector.roi }}%</div>
                      <div class="text-sm text-gray-600">ROI estimé</div>
                    </div>
                    <div class="bg-green-50 rounded-2xl p-4 text-center">
                      <div class="text-2xl font-bold text-green-600">{{ selectedSector.projects }}</div>
                      <div class="text-sm text-gray-600">Projets disponibles</div>
                    </div>
                    <div class="bg-purple-50 rounded-2xl p-4 text-center">
                      <div class="text-2xl font-bold text-purple-600">{{ formatCurrency(selectedSector.minInvestment || 5000) }}</div>
                      <div class="text-sm text-gray-600">Minimum requis</div>
                    </div>
                    <div class="bg-orange-50 rounded-2xl p-4 text-center">
                      <div class="text-2xl font-bold text-orange-600">{{ selectedSector.investors || 150 }}+</div>
                      <div class="text-sm text-gray-600">Investisseurs</div>
                    </div>
                  </div>

                  <!-- Avantages du secteur -->
                  <div class="bg-gray-50 rounded-2xl p-6">
                    <h5 class="font-bold text-gray-900 mb-4">Points forts</h5>
                    <ul class="space-y-2">
                      <li v-for="advantage in sectorAdvantages" :key="advantage"
                          class="flex items-center text-sm text-gray-700">
                        <i class="fas fa-check text-green-500 mr-3"></i>
                        {{ advantage }}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <!-- Formulaire d'investissement -->
              <div class="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-8">
                <h4 class="text-2xl font-bold text-gray-900 mb-6 text-center">
                  Finaliser votre investissement
                </h4>

                <form @submit.prevent="submitInvestment" class="space-y-6">
                  <div class="grid md:grid-cols-2 gap-6">
                    <!-- Montant -->
                    <div class="space-y-2">
                      <label class="block text-sm font-semibold text-gray-700">
                        Montant d'investissement (€) *
                      </label>
                      <div class="relative">
                        <input
                            type="number"
                            v-model="investmentAmount"
                            :min="selectedSector.minInvestment || 5000"
                            step="100"
                            required
                            class="form-input pl-8"
                            placeholder="5000"
                        >
                        <div class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                          €
                        </div>
                      </div>
                      <div class="flex justify-between text-xs text-gray-500">
                        <span>Minimum {{ formatCurrency(selectedSector.minInvestment || 5000) }}</span>
                        <span>Gains estimés: <strong class="text-green-600">{{ formatCurrency(calculateEstimatedGains()) }}</strong></span>
                      </div>
                    </div>

                    <!-- Méthode de paiement -->
                    <div class="space-y-2">
                      <label class="block text-sm font-semibold text-gray-700">
                        Méthode de paiement *
                      </label>
                      <select
                          v-model="paymentMethod"
                          required
                          class="form-select"
                      >
                        <option value="">Choisir une méthode</option>
                        <option v-for="method in paymentMethods" :key="method.value" :value="method.value">
                          {{ method.label }} - Frais {{ method.fees }}
                        </option>
                      </select>
                    </div>
                  </div>

                  <!-- Aperçu crypto -->
                  <Transition name="fade">
                    <div v-if="paymentMethod" class="bg-blue-50 border border-blue-200 rounded-2xl p-6">
                      <div class="flex items-center justify-between mb-4">
                        <div class="flex items-center space-x-3">
                          <i :class="getCryptoIcon(paymentMethod)" class="text-2xl"></i>
                          <div>
                            <div class="font-bold text-gray-900">{{ getCryptoName(paymentMethod) }}</div>
                            <div class="text-sm text-gray-600">Paiement sécurisé</div>
                          </div>
                        </div>
                        <div class="text-right">
                          <div class="text-2xl font-bold text-blue-600">{{ cryptoAmount }}</div>
                          <div class="text-sm text-gray-600">{{ paymentMethod.toUpperCase() }}</div>
                        </div>
                      </div>
                      <div class="text-xs text-gray-500">
                        <i class="fas fa-info-circle mr-1"></i>
                        Le taux de change est calculé en temps réel au moment du paiement
                      </div>
                    </div>
                  </Transition>

                  <!-- Options et consentements -->
                  <div class="space-y-4">
                    <div class="flex items-start space-x-3">
                      <input
                          type="checkbox"
                          id="acceptTerms"
                          v-model="acceptTerms"
                          required
                          class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mt-1"
                      >
                      <label for="acceptTerms" class="text-sm text-gray-700 leading-relaxed">
                        J'accepte les
                        <a href="#" class="text-blue-600 hover:text-blue-500 underline">conditions générales</a>
                        et j'ai pris connaissance des
                        <a href="#" class="text-blue-600 hover:text-blue-500 underline">risques d'investissement</a>
                      </label>
                    </div>

                    <div class="flex items-start space-x-3">
                      <input
                          type="checkbox"
                          id="marketingConsent"
                          v-model="marketingConsent"
                          class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mt-1"
                      >
                      <label for="marketingConsent" class="text-sm text-gray-700">
                        Je souhaite recevoir des informations sur les nouvelles opportunités d'investissement
                      </label>
                    </div>
                  </div>

                  <!-- Résumé de l'investissement -->
                  <div class="bg-white border-2 border-dashed border-gray-200 rounded-2xl p-6">
                    <h5 class="font-bold text-gray-900 mb-4">Récapitulatif</h5>
                    <div class="space-y-2 text-sm">
                      <div class="flex justify-between">
                        <span class="text-gray-600">Secteur:</span>
                        <span class="font-medium">{{ selectedSector.name }}</span>
                      </div>
                      <div class="flex justify-between">
                        <span class="text-gray-600">Montant:</span>
                        <span class="font-medium">{{ formatCurrency(investmentAmount) }}</span>
                      </div>
                      <div class="flex justify-between">
                        <span class="text-gray-600">ROI estimé:</span>
                        <span class="font-medium text-green-600">{{ selectedSector.roi }}% / an</span>
                      </div>
                      <div class="flex justify-between border-t pt-2">
                        <span class="text-gray-900 font-semibold">Gains estimés (1 an):</span>
                        <span class="font-bold text-green-600">{{ formatCurrency(calculateEstimatedGains()) }}</span>
                      </div>
                    </div>
                  </div>

                  <!-- Boutons d'action -->
                  <div class="flex flex-col sm:flex-row gap-4">
                    <button
                        type="button"
                        @click="closeModal"
                        class="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 py-4 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105"
                    >
                      <i class="fas fa-arrow-left mr-2"></i>
                      Retour
                    </button>
                    <button
                        type="submit"
                        :disabled="!canInvest"
                        class="flex-2 btn-primary disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 py-4"
                    >
                      <i class="fas fa-lock mr-2"></i>
                      Procéder au paiement sécurisé
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref, computed } from 'vue'
import { navigateTo } from '#imports'

const selectedSector = useState('selectedSector', () => null)
const isOpen = useState('investmentModalOpen', () => false)

const investmentAmount = ref(5000)
const paymentMethod = ref('')
const acceptTerms = ref(false)
const marketingConsent = ref(false)

const paymentMethods = [
  { value: 'bitcoin', label: 'Bitcoin (BTC)', fees: '2.5%' },
  { value: 'ethereum', label: 'Ethereum (ETH)', fees: '2.0%' },
  { value: 'usdt', label: 'Tether (USDT)', fees: '1.5%' },
  { value: 'bnb', label: 'Binance Coin (BNB)', fees: '1.8%' }
]

const sectorAdvantages = computed(() => {
  const advantages = {
    1: ['Croissance du marché +15% par an', 'Soutien gouvernemental', 'Impact environnemental positif'],
    2: ['Innovation médicale révolutionnaire', 'Marché en croissance +12% par an', 'Partenariats laboratoires'],
    3: ['Digitalisation des services financiers', 'Technologies blockchain', 'Marché en expansion'],
    4: ['IA appliquée à tous les secteurs', 'Équipe de recherche mondiale', 'Brevets technologiques'],
    5: ['E-commerce en croissance constante', 'Technologies de personnalisation', 'Expansion internationale'],
    6: ['Économie décentralisée', 'Applications DeFi', 'Adoption institutionnelle']
  }
  return advantages[selectedSector.value?.id] || ['Secteur d\'avenir', 'Croissance prometteuse', 'Équipe experte']
})

const canInvest = computed(() => {
  return investmentAmount.value >= (selectedSector.value?.minInvestment || 5000) &&
      paymentMethod.value &&
      acceptTerms.value
})

const cryptoAmount = computed(() => {
  if (!paymentMethod.value || !investmentAmount.value) return '0.000000'
  const rates = {
    bitcoin: 0.000024,
    ethereum: 0.00045,
    usdt: 1,
    bnb: 0.0167
  }
  const rate = rates[paymentMethod.value] || 0
  return (investmentAmount.value * rate).toFixed(6)
})

const calculateEstimatedGains = () => {
  if (!selectedSector.value || !investmentAmount.value) return 0
  const roi = parseFloat(selectedSector.value.roi) || 0
  return (investmentAmount.value * roi) / 100
}

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
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount || 0)
}

const closeModal = () => {
  isOpen.value = false
  // Reset form
  investmentAmount.value = 5000
  paymentMethod.value = ''
  acceptTerms.value = false
  marketingConsent.value = false
}

const submitInvestment = async () => {
  if (!canInvest.value) return

  try {
    await navigateTo(`/payment/crypto?amount=${investmentAmount.value}&method=${paymentMethod.value}&sector=${selectedSector.value?.id}&marketing=${marketingConsent.value}`)
    closeModal()
  } catch (error) {
    console.error('Erreur lors de la soumission:', error)
  }
}
</script>

<style scoped>
/* Transitions pour la modal */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.backdrop-enter-active,
.backdrop-leave-active {
  transition: opacity 0.3s ease;
}

.backdrop-enter-from,
.backdrop-leave-to {
  opacity: 0;
}

.panel-enter-active,
.panel-leave-active {
  transition: all 0.3s ease;
}

.panel-enter-from,
.panel-leave-to {
  opacity: 0;
  transform: scale(0.95) translateY(-20px);
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>