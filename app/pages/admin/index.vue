<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header Admin -->
    <div class="bg-white shadow-sm border-b">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <div class="flex items-center">
            <div class="w-8 h-8 bg-gradient-to-r from-red-600 to-pink-600 rounded-lg flex items-center justify-center mr-3">
              <i class="fas fa-shield-alt text-white text-sm"></i>
            </div>
            <h1 class="text-xl font-bold text-gray-900">Administration InvestFuture</h1>
          </div>
          <div class="flex items-center space-x-4">
            <div class="text-sm text-gray-600">
              Connecté : {{ authStore.user?.name }}
            </div>
            <button
                @click="logout"
                class="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <i class="fas fa-sign-out-alt mr-2"></i>
              Déconnexion
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Statistiques rapides -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div class="flex items-center">
            <div class="p-2 bg-orange-100 rounded-lg mr-4">
              <i class="fas fa-clock text-orange-600 text-xl"></i>
            </div>
            <div>
              <h3 class="text-2xl font-bold text-gray-900">{{ pendingRegistrations.length }}</h3>
              <p class="text-gray-600 text-sm">En attente</p>
            </div>
          </div>
        </div>

        <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div class="flex items-center">
            <div class="p-2 bg-green-100 rounded-lg mr-4">
              <i class="fas fa-check text-green-600 text-xl"></i>
            </div>
            <div>
              <h3 class="text-2xl font-bold text-gray-900">{{ approvedRegistrations.length }}</h3>
              <p class="text-gray-600 text-sm">Approuvées</p>
            </div>
          </div>
        </div>

        <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div class="flex items-center">
            <div class="p-2 bg-red-100 rounded-lg mr-4">
              <i class="fas fa-times text-red-600 text-xl"></i>
            </div>
            <div>
              <h3 class="text-2xl font-bold text-gray-900">{{ rejectedRegistrations.length }}</h3>
              <p class="text-gray-600 text-sm">Refusées</p>
            </div>
          </div>
        </div>

        <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div class="flex items-center">
            <div class="p-2 bg-blue-100 rounded-lg mr-4">
              <i class="fas fa-users text-blue-600 text-xl"></i>
            </div>
            <div>
              <h3 class="text-2xl font-bold text-gray-900">{{ allRegistrations.length }}</h3>
              <p class="text-gray-600 text-sm">Total</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Onglets -->
      <div class="mb-6">
        <div class="border-b border-gray-200">
          <nav class="-mb-px flex space-x-8">
            <button
                @click="activeTab = 'pending'"
                :class="[
                'py-2 px-1 border-b-2 font-medium text-sm',
                activeTab === 'pending'
                  ? 'border-orange-500 text-orange-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              ]"
            >
              En attente ({{ pendingRegistrations.length }})
            </button>
            <button
                @click="activeTab = 'approved'"
                :class="[
                'py-2 px-1 border-b-2 font-medium text-sm',
                activeTab === 'approved'
                  ? 'border-green-500 text-green-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              ]"
            >
              Approuvées ({{ approvedRegistrations.length }})
            </button>
            <button
                @click="activeTab = 'rejected'"
                :class="[
                'py-2 px-1 border-b-2 font-medium text-sm',
                activeTab === 'rejected'
                  ? 'border-red-500 text-red-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              ]"
            >
              Refusées ({{ rejectedRegistrations.length }})
            </button>
          </nav>
        </div>
      </div>

      <!-- Liste des inscriptions en attente -->
      <div v-if="activeTab === 'pending'" class="bg-white rounded-xl shadow-sm border border-gray-100">
        <div class="p-6 border-b border-gray-200">
          <h2 class="text-lg font-semibold text-gray-900">Inscriptions en attente de validation</h2>
        </div>

        <div v-if="pendingRegistrations.length === 0" class="p-8 text-center">
          <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <i class="fas fa-inbox text-gray-400 text-2xl"></i>
          </div>
          <p class="text-gray-500">Aucune inscription en attente</p>
        </div>

        <div v-else class="divide-y divide-gray-200">
          <div
              v-for="registration in pendingRegistrations"
              :key="registration.id"
              class="p-6 hover:bg-gray-50 transition-colors"
          >
            <div class="flex items-start justify-between">
              <div class="flex-1">
                <div class="flex items-center space-x-3 mb-2">
                  <h3 class="text-lg font-semibold text-gray-900">{{ registration.name }}</h3>
                  <span :class="[
                    'px-2 py-1 text-xs font-medium rounded-full',
                    registration.personType === 'physique'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-purple-100 text-purple-800'
                  ]">
                    {{ registration.personType === 'physique' ? 'Particulier' : 'Entreprise' }}
                  </span>
                </div>

                <div class="grid md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <p class="text-sm text-gray-600">
                      <i class="fas fa-envelope mr-2"></i>
                      {{ registration.email }}
                    </p>
                    <p class="text-sm text-gray-600">
                      <i class="fas fa-phone mr-2"></i>
                      {{ registration.telephone || 'Non renseigné' }}
                    </p>
                  </div>
                  <div>
                    <p class="text-sm text-gray-600">
                      <i class="fas fa-clock mr-2"></i>
                      Soumis le {{ formatDate(registration.submittedAt) }}
                    </p>
                    <p class="text-sm text-gray-600">
                      <i class="fas fa-file mr-2"></i>
                      {{ registration.documents?.length || 0 }} documents
                    </p>
                  </div>
                </div>

                <div v-if="registration.personType === 'physique'" class="text-sm text-gray-600 mb-4">
                  <p><strong>Profession:</strong> {{ registration.profession }}</p>
                  <p><strong>Revenus:</strong> {{ registration.revenusAnnuels }}</p>
                  <p><strong>Expérience:</strong> {{ registration.experienceInvestissement }}</p>
                </div>

                <div v-else class="text-sm text-gray-600 mb-4">
                  <p><strong>SIRET:</strong> {{ registration.siret }}</p>
                  <p><strong>Forme juridique:</strong> {{ registration.formeJuridique }}</p>
                  <p><strong>Représentant:</strong> {{ registration.representantPrenom }} {{ registration.representantNom }}</p>
                </div>
              </div>

              <div class="flex space-x-2 ml-4">
                <button
                    @click="approveRegistration(registration)"
                    class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  <i class="fas fa-check mr-2"></i>
                  Approuver
                </button>
                <button
                    @click="openRejectModal(registration)"
                    class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  <i class="fas fa-times mr-2"></i>
                  Refuser
                </button>
                <button
                    @click="openDetailsModal(registration)"
                    class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <i class="fas fa-eye mr-2"></i>
                  Détails
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Listes approuvées et refusées -->
      <div v-if="activeTab === 'approved'" class="bg-white rounded-xl shadow-sm border border-gray-100">
        <div class="p-6 border-b border-gray-200">
          <h2 class="text-lg font-semibold text-gray-900">Inscriptions approuvées</h2>
        </div>
        <RegistrationsList :registrations="approvedRegistrations" status="approved" />
      </div>

      <div v-if="activeTab === 'rejected'" class="bg-white rounded-xl shadow-sm border border-gray-100">
        <div class="p-6 border-b border-gray-200">
          <h2 class="text-lg font-semibold text-gray-900">Inscriptions refusées</h2>
        </div>
        <RegistrationsList :registrations="rejectedRegistrations" status="rejected" />
      </div>
    </div>

    <!-- Modal de refus -->
    <div v-if="showRejectModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-xl p-6 max-w-md w-full mx-4">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">Refuser l'inscription</h3>
        <p class="text-sm text-gray-600 mb-4">
          Vous êtes sur le point de refuser l'inscription de <strong>{{ selectedRegistration?.name }}</strong>.
          Veuillez indiquer la raison du refus :
        </p>
        <textarea
            v-model="rejectReason"
            rows="3"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            placeholder="Raison du refus..."
        ></textarea>
        <div class="flex justify-end space-x-3 mt-4">
          <button
              @click="closeRejectModal"
              class="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            Annuler
          </button>
          <button
              @click="confirmReject"
              :disabled="!rejectReason.trim()"
              class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:bg-gray-300 transition-colors"
          >
            Confirmer le refus
          </button>
        </div>
      </div>
    </div>

    <!-- Modal de détails -->
    <div v-if="showDetailsModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" @click="closeDetailsModal">
      <div class="bg-white rounded-xl p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto" @click.stop>
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-lg font-semibold text-gray-900">Détails de l'inscription</h3>
          <button @click="closeDetailsModal" class="text-gray-400 hover:text-gray-600">
            <i class="fas fa-times"></i>
          </button>
        </div>

        <div v-if="selectedRegistration" class="space-y-4">
          <div class="bg-gray-50 p-4 rounded-lg">
            <h4 class="font-semibold text-gray-900 mb-2">Informations générales</h4>
            <div class="grid md:grid-cols-2 gap-4">
              <div>
                <p><strong>Nom:</strong> {{ selectedRegistration.name }}</p>
                <p><strong>Email:</strong> {{ selectedRegistration.email }}</p>
                <p><strong>Type:</strong> {{ selectedRegistration.personType === 'physique' ? 'Particulier' : 'Entreprise' }}</p>
              </div>
              <div>
                <p><strong>Téléphone:</strong> {{ selectedRegistration.telephone || 'Non renseigné' }}</p>
                <p><strong>Soumis le:</strong> {{ formatDate(selectedRegistration.submittedAt) }}</p>
                <p><strong>Statut:</strong> {{ selectedRegistration.adminValidation?.status || 'pending' }}</p>
              </div>
            </div>
          </div>

          <div class="bg-gray-50 p-4 rounded-lg">
            <h4 class="font-semibold text-gray-900 mb-2">Documents fournis</h4>
            <div class="grid grid-cols-2 gap-2">
              <div v-for="doc in selectedRegistration.documentsDetails" :key="doc.type" class="flex items-center">
                <i class="fas fa-file text-blue-500 mr-2"></i>
                <span class="text-sm">{{ getDocumentLabel(doc.type) }}</span>
              </div>
            </div>
          </div>

          <div v-if="selectedRegistration.personType === 'physique'" class="bg-gray-50 p-4 rounded-lg">
            <h4 class="font-semibold text-gray-900 mb-2">Profil investisseur</h4>
            <div class="grid md:grid-cols-2 gap-4">
              <div>
                <p><strong>Profession:</strong> {{ selectedRegistration.profession }}</p>
                <p><strong>Situation familiale:</strong> {{ selectedRegistration.situationFamiliale }}</p>
              </div>
              <div>
                <p><strong>Revenus annuels:</strong> {{ selectedRegistration.revenusAnnuels }}</p>
                <p><strong>Expérience:</strong> {{ selectedRegistration.experienceInvestissement }}</p>
              </div>
            </div>
          </div>

          <div class="bg-gray-50 p-4 rounded-lg">
            <h4 class="font-semibold text-gray-900 mb-2">Adresse</h4>
            <p>{{ selectedRegistration.adresse }}</p>
            <p>{{ selectedRegistration.codePostal }} {{ selectedRegistration.ville }}</p>
            <p>{{ selectedRegistration.paysResidence }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useAuthStore } from '~/stores/auth'

definePageMeta({
  middleware: 'admin'
})

useSeoMeta({
  title: 'Administration - InvestFuture',
  description: 'Panel d\'administration InvestFuture'
})

const authStore = useAuthStore()
const activeTab = ref('pending')
const allRegistrations = ref([])
const showRejectModal = ref(false)
const showDetailsModal = ref(false)
const selectedRegistration = ref(null)
const rejectReason = ref('')

// Computed properties pour filtrer les inscriptions
const pendingRegistrations = computed(() =>
    allRegistrations.value.filter(r => r.adminValidation?.status === 'pending' || !r.adminValidation?.status)
)

const approvedRegistrations = computed(() =>
    allRegistrations.value.filter(r => r.adminValidation?.status === 'approved')
)

const rejectedRegistrations = computed(() =>
    allRegistrations.value.filter(r => r.adminValidation?.status === 'rejected')
)

// Charger les inscriptions
const loadRegistrations = () => {
  if (process.client) {
    const stored = localStorage.getItem('pendingRegistrations')
    if (stored) {
      allRegistrations.value = JSON.parse(stored)
    }
  }
}

// Approuver une inscription
const approveRegistration = (registration) => {
  registration.adminValidation = {
    ...registration.adminValidation,
    status: 'approved',
    reviewedBy: authStore.user?.name,
    reviewedAt: new Date().toISOString(),
    notes: 'Inscription approuvée automatiquement'
  }

  saveRegistrations()
  console.log('Inscription approuvée:', registration.name)
}

// Ouvrir modal de refus
const openRejectModal = (registration) => {
  selectedRegistration.value = registration
  showRejectModal.value = true
  rejectReason.value = ''
}

// Fermer modal de refus
const closeRejectModal = () => {
  showRejectModal.value = false
  selectedRegistration.value = null
  rejectReason.value = ''
}

// Confirmer le refus
const confirmReject = () => {
  if (selectedRegistration.value && rejectReason.value.trim()) {
    selectedRegistration.value.adminValidation = {
      ...selectedRegistration.value.adminValidation,
      status: 'rejected',
      reviewedBy: authStore.user?.name,
      reviewedAt: new Date().toISOString(),
      notes: rejectReason.value.trim()
    }

    saveRegistrations()
    closeRejectModal()
    console.log('Inscription refusée:', selectedRegistration.value.name)
  }
}

// Ouvrir modal de détails
const openDetailsModal = (registration) => {
  selectedRegistration.value = registration
  showDetailsModal.value = true
}

// Fermer modal de détails
const closeDetailsModal = () => {
  showDetailsModal.value = false
  selectedRegistration.value = null
}

// Sauvegarder les inscriptions
const saveRegistrations = () => {
  if (process.client) {
    localStorage.setItem('pendingRegistrations', JSON.stringify(allRegistrations.value))
  }
}

// Formater la date
const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

// Labels des documents
const getDocumentLabel = (docType) => {
  const labels = {
    'pieceIdentite': 'Pièce d\'identité',
    'justificatifDomicile': 'Justificatif de domicile',
    'rib': 'RIB',
    'kbis': 'Extrait Kbis',
    'statuts': 'Statuts entreprise',
    'pieceIdentiteRepresentant': 'ID Représentant',
    'ribEntreprise': 'RIB Entreprise'
  }
  return labels[docType] || docType
}

// Déconnexion
const logout = async () => {
  await authStore.logout()
  await navigateTo('/auth/login')
}

onMounted(() => {
  loadRegistrations()
})
</script>