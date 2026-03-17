<template>
  <div class="min-h-screen bg-slate-50">
    <!-- Header Admin -->
    <div class="bg-white border-b border-slate-100 shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-14">
          <div class="flex items-center">
            <div class="w-8 h-8 bg-gradient-to-r from-red-500 to-rose-600 rounded-lg flex items-center justify-center mr-3 shadow-sm">
              <i class="fas fa-shield-alt text-white text-xs"></i>
            </div>
            <h1 class="text-base font-bold text-slate-900">Administration InvestFuture</h1>
          </div>
          <div class="flex items-center space-x-4">
            <div class="text-xs text-slate-500 hidden sm:block">
              Connecté : <span class="font-medium text-slate-700">{{ authStore.user?.name }}</span>
            </div>
            <button
                @click="logout"
                class="px-3 py-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors text-sm font-medium"
            >
              <i class="fas fa-sign-out-alt mr-1.5"></i>
              Déconnexion
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <!-- Quick actions -->
      <div class="flex flex-wrap gap-3 mb-6">
        <NuxtLink to="/admin/kyc" class="inline-flex items-center px-4 py-2.5 bg-violet-600 hover:bg-violet-700 text-white rounded-xl font-semibold text-sm transition-colors shadow-sm">
          <i class="fas fa-id-card mr-2"></i>
          Gestion KYC
        </NuxtLink>
      </div>

      <!-- Statistiques rapides -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div class="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
          <div class="flex items-center">
            <div class="w-9 h-9 bg-amber-50 rounded-xl flex items-center justify-center mr-3 flex-shrink-0">
              <i class="fas fa-clock text-amber-600 text-sm"></i>
            </div>
            <div>
              <div class="text-xl font-bold text-slate-900">{{ pendingRegistrations.length }}</div>
              <div class="text-slate-500 text-xs mt-0.5">En attente</div>
            </div>
          </div>
        </div>

        <div class="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
          <div class="flex items-center">
            <div class="w-9 h-9 bg-emerald-50 rounded-xl flex items-center justify-center mr-3 flex-shrink-0">
              <i class="fas fa-check text-emerald-600 text-sm"></i>
            </div>
            <div>
              <div class="text-xl font-bold text-slate-900">{{ approvedRegistrations.length }}</div>
              <div class="text-slate-500 text-xs mt-0.5">Approuvées</div>
            </div>
          </div>
        </div>

        <div class="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
          <div class="flex items-center">
            <div class="w-9 h-9 bg-red-50 rounded-xl flex items-center justify-center mr-3 flex-shrink-0">
              <i class="fas fa-times text-red-600 text-sm"></i>
            </div>
            <div>
              <div class="text-xl font-bold text-slate-900">{{ rejectedRegistrations.length }}</div>
              <div class="text-slate-500 text-xs mt-0.5">Refusées</div>
            </div>
          </div>
        </div>

        <div class="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
          <div class="flex items-center">
            <div class="w-9 h-9 bg-blue-50 rounded-xl flex items-center justify-center mr-3 flex-shrink-0">
              <i class="fas fa-users text-blue-600 text-sm"></i>
            </div>
            <div>
              <div class="text-xl font-bold text-slate-900">{{ allRegistrations.length }}</div>
              <div class="text-slate-500 text-xs mt-0.5">Total</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Onglets -->
      <div class="mb-5">
        <div class="border-b border-slate-200">
          <nav class="-mb-px flex space-x-6">
            <button
                @click="activeTab = 'pending'"
                :class="[
                'py-2.5 px-1 border-b-2 font-medium text-sm transition-colors',
                activeTab === 'pending'
                  ? 'border-amber-500 text-amber-600'
                  : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
              ]"
            >
              En attente ({{ pendingRegistrations.length }})
            </button>
            <button
                @click="activeTab = 'approved'"
                :class="[
                'py-2.5 px-1 border-b-2 font-medium text-sm transition-colors',
                activeTab === 'approved'
                  ? 'border-emerald-500 text-emerald-600'
                  : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
              ]"
            >
              Approuvées ({{ approvedRegistrations.length }})
            </button>
            <button
                @click="activeTab = 'rejected'"
                :class="[
                'py-2.5 px-1 border-b-2 font-medium text-sm transition-colors',
                activeTab === 'rejected'
                  ? 'border-red-500 text-red-600'
                  : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
              ]"
            >
              Refusées ({{ rejectedRegistrations.length }})
            </button>
          </nav>
        </div>
      </div>

      <!-- Liste des inscriptions en attente -->
      <div v-if="activeTab === 'pending'" class="bg-white rounded-2xl border border-slate-100 shadow-sm">
        <div class="p-5 border-b border-slate-100">
          <h2 class="text-base font-bold text-slate-900">Inscriptions en attente de validation</h2>
        </div>

        <div v-if="pendingRegistrations.length === 0" class="p-10 text-center">
          <div class="w-14 h-14 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <i class="fas fa-inbox text-slate-400 text-xl"></i>
          </div>
          <p class="text-slate-500 text-sm">Aucune inscription en attente</p>
        </div>

        <div v-else class="divide-y divide-slate-100">
          <div
              v-for="registration in pendingRegistrations"
              :key="registration.id"
              class="p-5 hover:bg-slate-50 transition-colors"
          >
            <div class="flex items-start justify-between">
              <div class="flex-1 min-w-0">
                <div class="flex items-center space-x-2 mb-2">
                  <h3 class="text-sm font-bold text-slate-900">{{ registration.name }}</h3>
                  <span :class="[
                    'px-2 py-0.5 text-xs font-semibold rounded-full',
                    registration.personType === 'physique'
                      ? 'bg-blue-100 text-blue-700'
                      : 'bg-indigo-100 text-indigo-700'
                  ]">
                    {{ registration.personType === 'physique' ? 'Particulier' : 'Entreprise' }}
                  </span>
                </div>

                <div class="grid md:grid-cols-2 gap-3 mb-3">
                  <div class="space-y-1">
                    <p class="text-xs text-slate-500">
                      <i class="fas fa-envelope mr-1.5 text-slate-400"></i>
                      {{ registration.email }}
                    </p>
                    <p class="text-xs text-slate-500">
                      <i class="fas fa-phone mr-1.5 text-slate-400"></i>
                      {{ registration.telephone || 'Non renseigné' }}
                    </p>
                  </div>
                  <div class="space-y-1">
                    <p class="text-xs text-slate-500">
                      <i class="fas fa-clock mr-1.5 text-slate-400"></i>
                      Soumis le {{ formatDate(registration.submittedAt) }}
                    </p>
                    <p class="text-xs text-slate-500">
                      <i class="fas fa-file mr-1.5 text-slate-400"></i>
                      {{ registration.documents?.length || 0 }} documents
                    </p>
                  </div>
                </div>

                <div v-if="registration.personType === 'physique'" class="text-xs text-slate-500 mb-3 space-y-0.5">
                  <p><span class="font-medium text-slate-700">Profession:</span> {{ registration.profession }}</p>
                  <p><span class="font-medium text-slate-700">Revenus:</span> {{ registration.revenusAnnuels }}</p>
                  <p><span class="font-medium text-slate-700">Expérience:</span> {{ registration.experienceInvestissement }}</p>
                </div>

                <div v-else class="text-xs text-slate-500 mb-3 space-y-0.5">
                  <p><span class="font-medium text-slate-700">SIRET:</span> {{ registration.siret }}</p>
                  <p><span class="font-medium text-slate-700">Forme juridique:</span> {{ registration.formeJuridique }}</p>
                  <p><span class="font-medium text-slate-700">Représentant:</span> {{ registration.representantPrenom }} {{ registration.representantNom }}</p>
                </div>
              </div>

              <div class="flex flex-col sm:flex-row gap-2 ml-4 flex-shrink-0">
                <button
                    @click="approveRegistration(registration)"
                    class="px-3 py-1.5 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors text-xs font-medium"
                >
                  <i class="fas fa-check mr-1.5"></i>
                  Approuver
                </button>
                <button
                    @click="openRejectModal(registration)"
                    class="px-3 py-1.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-xs font-medium"
                >
                  <i class="fas fa-times mr-1.5"></i>
                  Refuser
                </button>
                <button
                    @click="openDetailsModal(registration)"
                    class="px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-xs font-medium"
                >
                  <i class="fas fa-eye mr-1.5"></i>
                  Détails
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Listes approuvées et refusées -->
      <div v-if="activeTab === 'approved'" class="bg-white rounded-2xl border border-slate-100 shadow-sm">
        <div class="p-5 border-b border-slate-100">
          <h2 class="text-base font-bold text-slate-900">Inscriptions approuvées</h2>
        </div>
        <RegistrationsList :registrations="approvedRegistrations" status="approved" />
      </div>

      <div v-if="activeTab === 'rejected'" class="bg-white rounded-2xl border border-slate-100 shadow-sm">
        <div class="p-5 border-b border-slate-100">
          <h2 class="text-base font-bold text-slate-900">Inscriptions refusées</h2>
        </div>
        <RegistrationsList :registrations="rejectedRegistrations" status="rejected" />
      </div>
    </div>

    <!-- Modal de refus -->
    <div v-if="showRejectModal" class="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-2xl border border-slate-100 p-6 max-w-md w-full shadow-xl">
        <h3 class="text-base font-bold text-slate-900 mb-3">Refuser l'inscription</h3>
        <p class="text-sm text-slate-500 mb-4">
          Vous êtes sur le point de refuser l'inscription de <strong class="text-slate-800">{{ selectedRegistration?.name }}</strong>.
          Veuillez indiquer la raison du refus :
        </p>
        <textarea
            v-model="rejectReason"
            rows="3"
            class="w-full px-3 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-red-500/20 focus:border-red-400 outline-none transition-all text-sm text-slate-900 placeholder-slate-400"
            placeholder="Raison du refus..."
        ></textarea>
        <div class="flex justify-end space-x-3 mt-4">
          <button
              @click="closeRejectModal"
              class="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors text-sm font-medium"
          >
            Annuler
          </button>
          <button
              @click="confirmReject"
              :disabled="!rejectReason.trim()"
              class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:bg-slate-300 disabled:cursor-not-allowed transition-colors text-sm font-semibold"
          >
            Confirmer le refus
          </button>
        </div>
      </div>
    </div>

    <!-- Modal de détails -->
    <div v-if="showDetailsModal" class="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4" @click="closeDetailsModal">
      <div class="bg-white rounded-2xl border border-slate-100 p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-xl" @click.stop>
        <div class="flex justify-between items-center mb-5">
          <h3 class="text-base font-bold text-slate-900">Détails de l'inscription</h3>
          <button @click="closeDetailsModal" class="w-7 h-7 flex items-center justify-center rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors">
            <i class="fas fa-times text-sm"></i>
          </button>
        </div>

        <div v-if="selectedRegistration" class="space-y-4">
          <div class="bg-slate-50 border border-slate-100 p-4 rounded-xl">
            <h4 class="text-xs font-bold text-slate-700 uppercase tracking-wider mb-3">Informations générales</h4>
            <div class="grid md:grid-cols-2 gap-3 text-sm">
              <div class="space-y-1">
                <p class="text-slate-600"><span class="font-medium text-slate-800">Nom:</span> {{ selectedRegistration.name }}</p>
                <p class="text-slate-600"><span class="font-medium text-slate-800">Email:</span> {{ selectedRegistration.email }}</p>
                <p class="text-slate-600"><span class="font-medium text-slate-800">Type:</span> {{ selectedRegistration.personType === 'physique' ? 'Particulier' : 'Entreprise' }}</p>
              </div>
              <div class="space-y-1">
                <p class="text-slate-600"><span class="font-medium text-slate-800">Téléphone:</span> {{ selectedRegistration.telephone || 'Non renseigné' }}</p>
                <p class="text-slate-600"><span class="font-medium text-slate-800">Soumis le:</span> {{ formatDate(selectedRegistration.submittedAt) }}</p>
                <p class="text-slate-600"><span class="font-medium text-slate-800">Statut:</span> {{ selectedRegistration.adminValidation?.status || 'pending' }}</p>
              </div>
            </div>
          </div>

          <div class="bg-slate-50 border border-slate-100 p-4 rounded-xl">
            <h4 class="text-xs font-bold text-slate-700 uppercase tracking-wider mb-3">Documents fournis</h4>
            <div class="grid grid-cols-2 gap-2">
              <div v-for="doc in selectedRegistration.documentsDetails" :key="doc.type" class="flex items-center">
                <i class="fas fa-file text-blue-500 mr-2 text-sm"></i>
                <span class="text-sm text-slate-600">{{ getDocumentLabel(doc.type) }}</span>
              </div>
            </div>
          </div>

          <div v-if="selectedRegistration.personType === 'physique'" class="bg-slate-50 border border-slate-100 p-4 rounded-xl">
            <h4 class="text-xs font-bold text-slate-700 uppercase tracking-wider mb-3">Profil investisseur</h4>
            <div class="grid md:grid-cols-2 gap-3 text-sm">
              <div class="space-y-1">
                <p class="text-slate-600"><span class="font-medium text-slate-800">Profession:</span> {{ selectedRegistration.profession }}</p>
                <p class="text-slate-600"><span class="font-medium text-slate-800">Situation familiale:</span> {{ selectedRegistration.situationFamiliale }}</p>
              </div>
              <div class="space-y-1">
                <p class="text-slate-600"><span class="font-medium text-slate-800">Revenus annuels:</span> {{ selectedRegistration.revenusAnnuels }}</p>
                <p class="text-slate-600"><span class="font-medium text-slate-800">Expérience:</span> {{ selectedRegistration.experienceInvestissement }}</p>
              </div>
            </div>
          </div>

          <div class="bg-slate-50 border border-slate-100 p-4 rounded-xl">
            <h4 class="text-xs font-bold text-slate-700 uppercase tracking-wider mb-3">Adresse</h4>
            <div class="text-sm text-slate-600 space-y-0.5">
              <p>{{ selectedRegistration.adresse }}</p>
              <p>{{ selectedRegistration.codePostal }} {{ selectedRegistration.ville }}</p>
              <p>{{ selectedRegistration.paysResidence }}</p>
            </div>
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
