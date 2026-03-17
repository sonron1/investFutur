<template>
  <div class="min-h-screen bg-slate-50">
    <!-- Admin header -->
    <div class="bg-white border-b border-slate-100 shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-14">
          <div class="flex items-center space-x-3">
            <NuxtLink to="/admin" class="text-slate-400 hover:text-slate-600 transition-colors">
              <i class="fas fa-arrow-left text-sm"></i>
            </NuxtLink>
            <div class="w-8 h-8 bg-gradient-to-r from-red-500 to-rose-600 rounded-lg flex items-center justify-center shadow-sm">
              <i class="fas fa-shield-alt text-white text-xs"></i>
            </div>
            <h1 class="text-base font-bold text-slate-900">Gestion KYC</h1>
          </div>
          <div class="flex items-center space-x-3">
            <span class="text-xs text-slate-500 hidden sm:block">
              {{ pendingCount }} dossier{{ pendingCount !== 1 ? 's' : '' }} en attente
            </span>
            <button @click="loadDossiers" class="px-3 py-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors text-sm font-medium">
              <i class="fas fa-sync-alt mr-1"></i>
              Actualiser
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <!-- Stats -->
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div v-for="stat in stats" :key="stat.label" class="bg-white rounded-xl border border-slate-100 shadow-sm p-4">
          <div class="text-2xl font-bold mb-0.5" :class="stat.color">{{ stat.value }}</div>
          <div class="text-xs text-slate-500">{{ stat.label }}</div>
        </div>
      </div>

      <!-- Filters -->
      <div class="bg-white rounded-xl border border-slate-100 shadow-sm p-4 mb-6 flex flex-wrap gap-3">
        <button
          v-for="tab in ['SUBMITTED', 'PENDING', 'APPROVED', 'REJECTED']"
          :key="tab"
          @click="activeTab = tab"
          :class="[
            'px-4 py-2 rounded-lg text-sm font-medium transition-all',
            activeTab === tab ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-50'
          ]"
        >
          {{ tabLabels[tab] }}
          <span class="ml-1.5 text-xs opacity-75">({{ countByStatus[tab] ?? 0 }})</span>
        </button>
      </div>

      <!-- Loading -->
      <div v-if="isLoading" class="space-y-4">
        <div v-for="i in 3" :key="i" class="bg-white rounded-xl border border-slate-100 shadow-sm p-5 animate-pulse">
          <div class="flex items-center mb-3">
            <div class="w-10 h-10 bg-slate-200 rounded-full mr-3"></div>
            <div>
              <div class="h-4 bg-slate-200 rounded w-36 mb-2"></div>
              <div class="h-3 bg-slate-200 rounded w-24"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Dossiers list -->
      <div v-else-if="filteredDossiers.length === 0" class="text-center py-16 bg-white rounded-xl border border-slate-100 shadow-sm">
        <div class="w-14 h-14 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <i class="fas fa-folder-open text-2xl text-slate-400"></i>
        </div>
        <p class="text-slate-500">Aucun dossier {{ tabLabels[activeTab]?.toLowerCase() }}</p>
      </div>

      <div v-else class="space-y-4">
        <div
          v-for="dossier in filteredDossiers"
          :key="dossier.id"
          class="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden"
        >
          <!-- Dossier header -->
          <div class="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div class="flex items-center">
              <div class="w-11 h-11 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold mr-4 flex-shrink-0">
                {{ dossier.firstName?.charAt(0)?.toUpperCase() }}
              </div>
              <div>
                <div class="font-bold text-slate-900">{{ dossier.firstName }} {{ dossier.lastName }}</div>
                <div class="text-slate-500 text-sm">{{ dossier.email }}</div>
                <div class="flex items-center gap-2 mt-1">
                  <span v-if="dossier.phone" class="text-xs text-slate-400"><i class="fas fa-phone mr-1"></i>{{ dossier.phone }}</span>
                  <span v-if="dossier.country" class="text-xs text-slate-400"><i class="fas fa-globe mr-1"></i>{{ dossier.country }}</span>
                </div>
              </div>
            </div>

            <div class="flex items-center gap-3">
              <span :class="statusBadgeClass(dossier.kycStatus)" class="px-3 py-1 rounded-full text-xs font-semibold">
                {{ tabLabels[dossier.kycStatus] }}
              </span>
              <button
                @click="toggleExpand(dossier.id)"
                class="text-slate-400 hover:text-slate-600 transition-colors"
              >
                <i :class="expanded === dossier.id ? 'fa-chevron-up' : 'fa-chevron-down'" class="fas text-sm"></i>
              </button>
            </div>
          </div>

          <!-- Expanded content -->
          <div v-if="expanded === dossier.id" class="border-t border-slate-100 p-5">
            <!-- Documents -->
            <h4 class="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Documents</h4>
            <div v-if="dossier.documents?.length === 0" class="text-sm text-slate-400 mb-4">Aucun document soumis</div>
            <div v-else class="grid grid-cols-2 md:grid-cols-3 gap-3 mb-5">
              <a
                v-for="doc in dossier.documents"
                :key="doc.id"
                :href="doc.fileUrl"
                target="_blank"
                class="group relative border border-slate-200 rounded-xl overflow-hidden hover:border-blue-400 hover:shadow-md transition-all"
              >
                <img
                  v-if="!doc.fileName.endsWith('.pdf')"
                  :src="doc.fileUrl"
                  :alt="docTypeLabel(doc.type)"
                  class="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
                >
                <div v-else class="w-full h-32 bg-red-50 flex flex-col items-center justify-center">
                  <i class="fas fa-file-pdf text-red-500 text-2xl mb-1"></i>
                  <span class="text-xs text-red-700">PDF</span>
                </div>
                <div class="p-2 bg-white">
                  <p class="text-xs font-semibold text-slate-700 truncate">{{ docTypeLabel(doc.type) }}</p>
                  <p class="text-xs text-slate-400 truncate">{{ doc.fileName }}</p>
                </div>
                <div class="absolute top-2 right-2">
                  <span class="bg-white/90 backdrop-blur-sm text-slate-600 text-xs px-2 py-0.5 rounded-full font-medium">
                    <i class="fas fa-external-link-alt mr-1 text-xs"></i>Ouvrir
                  </span>
                </div>
              </a>
            </div>

            <!-- Actions (only for SUBMITTED) -->
            <div v-if="dossier.kycStatus === 'SUBMITTED'" class="border-t border-slate-100 pt-5">
              <h4 class="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Décision</h4>

              <div class="mb-3">
                <label class="block text-xs font-medium text-slate-700 mb-1.5">
                  Motif du rejet (optionnel, affiché à l'utilisateur)
                </label>
                <textarea
                  v-model="rejectionNotes[dossier.id]"
                  rows="2"
                  placeholder="Ex: Photo de mauvaise qualité, document expiré..."
                  class="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none text-sm text-slate-900 resize-none transition-all"
                ></textarea>
              </div>

              <div class="flex gap-3">
                <button
                  @click="handleKycDecision(dossier.id, 'APPROVED')"
                  :disabled="processing === dossier.id"
                  class="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-semibold text-sm transition-colors disabled:opacity-60"
                >
                  <i v-if="processing === dossier.id" class="fas fa-circle-notch fa-spin mr-2"></i>
                  <i v-else class="fas fa-check mr-2"></i>
                  Approuver
                </button>
                <button
                  @click="handleKycDecision(dossier.id, 'REJECTED')"
                  :disabled="processing === dossier.id"
                  class="flex-1 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl font-semibold text-sm transition-colors disabled:opacity-60"
                >
                  <i v-if="processing === dossier.id" class="fas fa-circle-notch fa-spin mr-2"></i>
                  <i v-else class="fas fa-times mr-2"></i>
                  Rejeter
                </button>
              </div>
            </div>

            <!-- Notes from previous decision -->
            <div v-else-if="dossier.kycStatus === 'REJECTED' && dossier.documents?.some(d => d.notes)">
              <div class="border-t border-slate-100 pt-4">
                <h4 class="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Motif du rejet</h4>
                <p class="text-sm text-red-700 bg-red-50 rounded-xl p-3">
                  {{ dossier.documents.find(d => d.notes)?.notes }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from '~/stores/auth'

useSeoMeta({ title: 'Gestion KYC — Admin InvestFutur' })

const authStore = useAuthStore()
const isLoading = ref(true)
const activeTab = ref('SUBMITTED')
const expanded = ref(null)
const processing = ref(null)
const dossiers = ref([])
const rejectionNotes = ref({})

const tabLabels = {
  SUBMITTED: 'En attente',
  PENDING: 'Non soumis',
  APPROVED: 'Approuvés',
  REJECTED: 'Rejetés',
}

const docTypeLabel = (type) => {
  const map = {
    identity_front: 'Recto pièce d\'identité',
    identity_back: 'Verso pièce d\'identité',
    proof_of_address: 'Justificatif de domicile',
    selfie: 'Selfie',
  }
  return map[type] ?? type
}

const statusBadgeClass = (status) => {
  const map = {
    SUBMITTED: 'bg-amber-100 text-amber-700',
    PENDING: 'bg-slate-100 text-slate-600',
    APPROVED: 'bg-emerald-100 text-emerald-700',
    REJECTED: 'bg-red-100 text-red-700',
  }
  return map[status] ?? 'bg-slate-100 text-slate-600'
}

const countByStatus = computed(() => {
  return dossiers.value.reduce((acc, d) => {
    acc[d.kycStatus] = (acc[d.kycStatus] ?? 0) + 1
    return acc
  }, {})
})

const pendingCount = computed(() => countByStatus.value.SUBMITTED ?? 0)

const stats = computed(() => [
  { label: 'En attente', value: countByStatus.value.SUBMITTED ?? 0, color: 'text-amber-600' },
  { label: 'Approuvés', value: countByStatus.value.APPROVED ?? 0, color: 'text-emerald-600' },
  { label: 'Rejetés', value: countByStatus.value.REJECTED ?? 0, color: 'text-red-600' },
  { label: 'Total utilisateurs', value: dossiers.value.length, color: 'text-blue-600' },
])

const filteredDossiers = computed(() =>
  dossiers.value.filter((d) => d.kycStatus === activeTab.value)
)

const toggleExpand = (id) => {
  expanded.value = expanded.value === id ? null : id
}

const loadDossiers = async () => {
  isLoading.value = true
  try {
    const { data } = await $fetch('/api/admin/kyc', { headers: authStore.getAuthHeaders() })
    dossiers.value = data
  } catch (err) {
    console.error('Admin KYC load error:', err)
  } finally {
    isLoading.value = false
  }
}

const handleKycDecision = async (userId, status) => {
  processing.value = userId
  try {
    await $fetch(`/api/admin/users/${userId}/kyc`, {
      method: 'PATCH',
      body: { status, notes: rejectionNotes.value[userId] || undefined },
      headers: authStore.getAuthHeaders(),
    })

    // Update local state
    const dossier = dossiers.value.find((d) => d.id === userId)
    if (dossier) {
      dossier.kycStatus = status
      if (dossier.documents) {
        dossier.documents.forEach((doc) => {
          if (doc.status === 'PENDING') {
            doc.status = status
            doc.notes = rejectionNotes.value[userId] || null
          }
        })
      }
    }
    expanded.value = null
  } catch (err) {
    console.error('KYC decision error:', err)
    alert(err?.data?.message ?? 'Erreur lors de la décision KYC')
  } finally {
    processing.value = null
  }
}

onMounted(async () => {
  if (!authStore.isAuthenticated || !authStore.isAdmin) {
    return navigateTo('/dashboard')
  }
  await loadDossiers()
})
</script>
