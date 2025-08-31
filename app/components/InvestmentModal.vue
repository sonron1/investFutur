<template>
  <div class="modal fade" id="investmentModal" tabindex="-1">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header border-0">
          <h5 class="modal-title">
            <i class="fas fa-chart-line text-primary me-2"></i>
            Investir dans {{ selectedSector?.name || 'ce secteur' }}
          </h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
        </div>

        <div class="modal-body">
          <div class="investment-info mb-4" v-if="selectedSector">
            <div class="row">
              <div class="col-md-6">
                <img :src="selectedSector.image" :alt="selectedSector.name" class="img-fluid rounded" loading="lazy">
              </div>
              <div class="col-md-6">
                <h6 class="text-primary">{{ selectedSector.name }}</h6>
                <p class="text-muted small">{{ selectedSector.description }}</p>

                <div class="d-flex justify-content-between mb-2">
                  <span>ROI estimé:</span>
                  <strong class="text-success">{{ selectedSector.roi }}%</strong>
                </div>
                <div class="d-flex justify-content-between mb-2">
                  <span>Projets disponibles:</span>
                  <strong>{{ selectedSector.projects }}</strong>
                </div>
                <div class="d-flex justify-content-between">
                  <span>Investissement minimum:</span>
                  <strong>5 000€</strong>
                </div>
              </div>
            </div>
          </div>

          <form @submit.prevent="submitInvestment">
            <div class="row g-3">
              <div class="col-md-6">
                <label class="form-label">Montant d'investissement (€)</label>
                <input
                    type="number"
                    v-model="investmentAmount"
                    class="form-control"
                    min="5000"
                    step="100"
                    required
                >
                <div class="form-text">Minimum 5 000€</div>
              </div>

              <div class="col-md-6">
                <label class="form-label">Méthode de paiement</label>
                <select v-model="paymentMethod" class="form-select" required>
                  <option value="">Choisir une méthode</option>
                  <option value="bitcoin">Bitcoin (BTC)</option>
                  <option value="ethereum">Ethereum (ETH)</option>
                  <option value="usdt">Tether (USDT)</option>
                  <option value="bnb">Binance Coin (BNB)</option>
                </select>
              </div>

              <div class="col-12" v-if="paymentMethod">
                <div class="crypto-info p-3 bg-light rounded">
                  <div class="d-flex align-items-center mb-2">
                    <i :class="getCryptoIcon(paymentMethod)" class="me-2"></i>
                    <strong>{{ getCryptoName(paymentMethod) }}</strong>
                  </div>
                  <p class="mb-0 small text-muted">
                    Montant équivalent: {{ cryptoAmount }} {{ paymentMethod.toUpperCase() }}
                  </p>
                </div>
              </div>

              <div class="col-12">
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" v-model="acceptTerms" required>
                  <label class="form-check-label">
                    J'accepte les <a href="#" class="text-primary">conditions générales</a>
                    et les <a href="#" class="text-primary">risques d'investissement</a>
                  </label>
                </div>
              </div>
            </div>
          </form>
        </div>

        <div class="modal-footer border-0">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
            Annuler
          </button>
          <button
              type="button"
              class="btn btn-primary"
              @click="submitInvestment"
              :disabled="!canInvest"
          >
            <i class="fas fa-lock me-2"></i>
            Procéder au paiement sécurisé
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const selectedSector = useState('selectedSector', () => null)

const investmentAmount = ref(5000)
const paymentMethod = ref('')
const acceptTerms = ref(false)

const canInvest = computed(() => {
  return investmentAmount.value >= 5000 && paymentMethod.value && acceptTerms.value
})

const cryptoAmount = computed(() => {
  if (!paymentMethod.value || !investmentAmount.value) return 0

  // Simulation des taux de conversion (à remplacer par de vraies données d'API)
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
    bitcoin: 'fab fa-bitcoin text-warning',
    ethereum: 'fab fa-ethereum text-primary',
    usdt: 'fas fa-dollar-sign text-success',
    bnb: 'fas fa-coins text-warning'
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

const submitInvestment = async () => {
  if (!canInvest.value) return

  try {
    // Rediriger vers la page de paiement crypto
    await navigateTo(`/payment/crypto?amount=${investmentAmount.value}&method=${paymentMethod.value}&sector=${selectedSector.value?.id}`)
  } catch (error) {
    console.error('Erreur lors de la soumission:', error)
  }
}
</script>