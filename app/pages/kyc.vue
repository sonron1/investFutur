<template>
  <div class="min-h-screen bg-slate-50 flex flex-col">
    <Navbar />

    <div class="flex-1 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-2xl font-bold text-slate-900 mb-1">Vérification d'identité (KYC)</h1>
        <p class="text-slate-500 text-sm">Complétez votre vérification pour accéder à toutes les fonctionnalités</p>
      </div>

      <!-- KYC already approved -->
      <div v-if="kycStatus === 'APPROVED'" class="bg-emerald-50 border border-emerald-200 rounded-2xl p-8 text-center">
        <div class="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <i class="fas fa-check-circle text-emerald-600 text-2xl"></i>
        </div>
        <h2 class="text-xl font-bold text-emerald-900 mb-2">Identité vérifiée</h2>
        <p class="text-emerald-700 text-sm mb-6">Votre dossier KYC a été approuvé. Vous avez accès à toutes les fonctionnalités.</p>
        <div class="inline-flex items-center px-4 py-2 bg-emerald-100 text-emerald-800 rounded-xl text-sm font-semibold">
          <i class="fas fa-shield-alt mr-2"></i>
          Niveau KYC : Tier 1 — Accès complet
        </div>
      </div>

      <!-- KYC submitted — waiting -->
      <div v-else-if="kycStatus === 'SUBMITTED'" class="bg-blue-50 border border-blue-200 rounded-2xl p-8 text-center">
        <div class="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <i class="fas fa-clock text-blue-600 text-2xl"></i>
        </div>
        <h2 class="text-xl font-bold text-blue-900 mb-2">Dossier en cours de vérification</h2>
        <p class="text-blue-700 text-sm mb-2">Votre dossier a été soumis et est en cours d'examen.</p>
        <p class="text-blue-600 text-xs">Délai estimé : 24 à 48 heures ouvrables</p>
      </div>

      <!-- KYC form -->
      <div v-else>
        <!-- Rejected notice -->
        <div v-if="kycStatus === 'REJECTED'" class="mb-6 bg-red-50 border border-red-200 rounded-2xl p-5">
          <div class="flex items-start">
            <div class="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
              <i class="fas fa-times-circle text-red-600"></i>
            </div>
            <div>
              <h3 class="font-bold text-red-900 text-sm mb-1">Dossier rejeté</h3>
              <p class="text-red-700 text-xs leading-relaxed">Votre dossier précédent n'a pas été validé. Merci de soumettre des documents mis à jour.</p>
            </div>
          </div>
        </div>

        <!-- Step indicator -->
        <div class="flex items-center mb-8">
          <div v-for="(s, i) in steps" :key="i" class="flex items-center flex-1">
            <div class="flex flex-col items-center">
              <div
                :class="[
                  'w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm transition-all',
                  currentStep > i + 1 ? 'bg-emerald-500 text-white' :
                  currentStep === i + 1 ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' :
                  'bg-slate-100 text-slate-400'
                ]"
              >
                <i v-if="currentStep > i + 1" class="fas fa-check text-xs"></i>
                <span v-else>{{ i + 1 }}</span>
              </div>
              <span class="text-xs mt-1.5 font-medium" :class="currentStep === i + 1 ? 'text-blue-600' : 'text-slate-400'">
                {{ s }}
              </span>
            </div>
            <div v-if="i < steps.length - 1" :class="['flex-1 h-0.5 mx-2 mb-4 transition-colors', currentStep > i + 1 ? 'bg-emerald-400' : 'bg-slate-200']"></div>
          </div>
        </div>

        <!-- Step 1: Profile check -->
        <div v-if="currentStep === 1" class="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
          <h2 class="text-base font-bold text-slate-900 mb-1">Informations personnelles</h2>
          <p class="text-slate-500 text-sm mb-5">Ces informations sont requises avant de soumettre votre KYC</p>

          <div class="space-y-4">
            <div class="grid grid-cols-2 gap-4">
              <div class="bg-slate-50 rounded-xl p-4">
                <div class="text-xs text-slate-500 mb-1">Prénom</div>
                <div class="font-semibold text-slate-900 text-sm">{{ profile.firstName || '—' }}</div>
              </div>
              <div class="bg-slate-50 rounded-xl p-4">
                <div class="text-xs text-slate-500 mb-1">Nom</div>
                <div class="font-semibold text-slate-900 text-sm">{{ profile.lastName || '—' }}</div>
              </div>
            </div>

            <div :class="['rounded-xl p-4', profile.phone ? 'bg-slate-50' : 'bg-red-50 border border-red-200']">
              <div class="flex items-center justify-between">
                <div>
                  <div class="text-xs text-slate-500 mb-1">Téléphone</div>
                  <div class="font-semibold text-slate-900 text-sm">{{ profile.phone || 'Non renseigné' }}</div>
                </div>
                <i v-if="!profile.phone" class="fas fa-exclamation-circle text-red-400"></i>
              </div>
            </div>

            <div :class="['rounded-xl p-4', profile.country ? 'bg-slate-50' : 'bg-red-50 border border-red-200']">
              <div class="flex items-center justify-between">
                <div>
                  <div class="text-xs text-slate-500 mb-1">Pays</div>
                  <div class="font-semibold text-slate-900 text-sm">{{ profile.country || 'Non renseigné' }}</div>
                </div>
                <i v-if="!profile.country" class="fas fa-exclamation-circle text-red-400"></i>
              </div>
            </div>

            <div :class="['rounded-xl p-4', profile.address ? 'bg-slate-50' : 'bg-red-50 border border-red-200']">
              <div class="flex items-center justify-between">
                <div>
                  <div class="text-xs text-slate-500 mb-1">Adresse</div>
                  <div class="font-semibold text-slate-900 text-sm">{{ profile.address || 'Non renseignée' }}</div>
                </div>
                <i v-if="!profile.address" class="fas fa-exclamation-circle text-red-400"></i>
              </div>
            </div>
          </div>

          <div v-if="!isProfileComplete" class="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-xl text-amber-700 text-xs flex items-center">
            <i class="fas fa-info-circle mr-2"></i>
            Merci de compléter votre profil (téléphone, pays, adresse) avant de continuer.
            <NuxtLink to="/profile" class="ml-2 font-semibold underline">Compléter le profil</NuxtLink>
          </div>

          <div class="flex justify-end mt-6">
            <button
              @click="currentStep = 2"
              :disabled="!isProfileComplete"
              class="btn-primary px-6 py-2.5 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Continuer <i class="fas fa-arrow-right ml-2"></i>
            </button>
          </div>
        </div>

        <!-- Step 2: Document upload -->
        <div v-if="currentStep === 2" class="space-y-5">
          <!-- Identity document -->
          <div class="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
            <div class="flex items-center mb-5">
              <div class="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center mr-3">
                <i class="fas fa-id-card text-blue-600"></i>
              </div>
              <div>
                <h3 class="font-bold text-slate-900 text-sm">Pièce d'identité</h3>
                <p class="text-slate-500 text-xs">Passeport, carte nationale d'identité ou permis de conduire</p>
              </div>
              <span class="ml-auto text-xs font-semibold text-red-500">Requis</span>
            </div>

            <div class="grid grid-cols-2 gap-4">
              <KycUploadZone
                label="Recto"
                doc-type="identity_front"
                :uploaded="uploads.identity_front"
                @upload="handleUpload('identity_front', $event)"
                @remove="handleRemove('identity_front')"
              />
              <KycUploadZone
                label="Verso (optionnel)"
                doc-type="identity_back"
                :uploaded="uploads.identity_back"
                @upload="handleUpload('identity_back', $event)"
                @remove="handleRemove('identity_back')"
              />
            </div>
          </div>

          <!-- Proof of address -->
          <div class="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
            <div class="flex items-center mb-5">
              <div class="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center mr-3">
                <i class="fas fa-home text-indigo-600"></i>
              </div>
              <div>
                <h3 class="font-bold text-slate-900 text-sm">Justificatif de domicile</h3>
                <p class="text-slate-500 text-xs">Facture récente (- 3 mois) : eau, électricité, internet, relevé bancaire</p>
              </div>
              <span class="ml-auto text-xs font-semibold text-red-500">Requis</span>
            </div>

            <KycUploadZone
              label="Justificatif de domicile"
              doc-type="proof_of_address"
              :uploaded="uploads.proof_of_address"
              @upload="handleUpload('proof_of_address', $event)"
              @remove="handleRemove('proof_of_address')"
            />
          </div>

          <!-- Selfie (optional) -->
          <div class="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
            <div class="flex items-center mb-5">
              <div class="w-10 h-10 bg-violet-50 rounded-xl flex items-center justify-center mr-3">
                <i class="fas fa-camera text-violet-600"></i>
              </div>
              <div>
                <h3 class="font-bold text-slate-900 text-sm">Selfie</h3>
                <p class="text-slate-500 text-xs">Photo de vous tenant votre pièce d'identité</p>
              </div>
              <span class="ml-auto text-xs font-semibold text-slate-400">Optionnel</span>
            </div>

            <KycUploadZone
              label="Selfie avec pièce d'identité"
              doc-type="selfie"
              :uploaded="uploads.selfie"
              @upload="handleUpload('selfie', $event)"
              @remove="handleRemove('selfie')"
            />
          </div>

          <div v-if="uploadError" class="p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm flex items-center">
            <i class="fas fa-exclamation-circle mr-2"></i>
            {{ uploadError }}
          </div>

          <div class="flex justify-between">
            <button @click="currentStep = 1" class="px-5 py-2.5 border border-slate-200 text-slate-600 rounded-xl text-sm font-medium hover:bg-slate-50 transition-colors">
              <i class="fas fa-arrow-left mr-2"></i>Retour
            </button>
            <button
              @click="currentStep = 3"
              :disabled="!canProceedToReview"
              class="btn-primary px-6 py-2.5 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Vérifier mon dossier <i class="fas fa-arrow-right ml-2"></i>
            </button>
          </div>
        </div>

        <!-- Step 3: Review & submit -->
        <div v-if="currentStep === 3" class="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
          <h2 class="text-base font-bold text-slate-900 mb-5">Récapitulatif du dossier</h2>

          <div class="space-y-3 mb-6">
            <div v-for="doc in uploadedDocsList" :key="doc.type" class="flex items-center p-3.5 bg-slate-50 rounded-xl">
              <div class="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center mr-3">
                <i class="fas fa-check text-emerald-600 text-xs"></i>
              </div>
              <div>
                <div class="text-sm font-semibold text-slate-900">{{ doc.label }}</div>
                <div class="text-xs text-slate-500">{{ doc.fileName }}</div>
              </div>
            </div>
          </div>

          <div class="p-4 bg-amber-50 border border-amber-200 rounded-xl mb-6">
            <div class="flex items-start">
              <i class="fas fa-info-circle text-amber-600 mt-0.5 mr-3 flex-shrink-0"></i>
              <div class="text-xs text-amber-800 leading-relaxed">
                En soumettant ce dossier, vous certifiez que les documents fournis sont authentiques et vous appartiennent. Toute fausse déclaration entraîne la résiliation immédiate du compte.
              </div>
            </div>
          </div>

          <div v-if="submitError" class="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
            {{ submitError }}
          </div>

          <div class="flex justify-between">
            <button @click="currentStep = 2" class="px-5 py-2.5 border border-slate-200 text-slate-600 rounded-xl text-sm font-medium hover:bg-slate-50 transition-colors">
              <i class="fas fa-arrow-left mr-2"></i>Retour
            </button>
            <button
              @click="submitKyc"
              :disabled="isSubmitting"
              class="btn-primary px-6 py-2.5 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <i v-if="isSubmitting" class="fas fa-circle-notch fa-spin mr-2"></i>
              {{ isSubmitting ? 'Envoi en cours...' : 'Soumettre mon dossier' }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <Footer />
  </div>
</template>

<script setup>
import { useAuthStore } from '~/stores/auth'

useSeoMeta({ title: 'Vérification KYC — InvestFutur' })

const authStore = useAuthStore()

const kycStatus = ref('PENDING')
const profile = ref({ firstName: '', lastName: '', phone: '', country: '', address: '' })
const currentStep = ref(1)
const uploadError = ref('')
const submitError = ref('')
const isSubmitting = ref(false)

const steps = ['Profil', 'Documents', 'Confirmation']

const uploads = ref({
  identity_front: null,
  identity_back: null,
  proof_of_address: null,
  selfie: null,
})

const docLabels = {
  identity_front: 'Recto pièce d\'identité',
  identity_back: 'Verso pièce d\'identité',
  proof_of_address: 'Justificatif de domicile',
  selfie: 'Selfie',
}

const isProfileComplete = computed(() =>
  !!profile.value.phone && !!profile.value.country && !!profile.value.address
)

const canProceedToReview = computed(() =>
  uploads.value.identity_front !== null && uploads.value.proof_of_address !== null
)

const uploadedDocsList = computed(() =>
  Object.entries(uploads.value)
    .filter(([, v]) => v !== null)
    .map(([type, doc]) => ({ type, label: docLabels[type], fileName: doc.fileName }))
)

const handleUpload = (docType, uploadedDoc) => {
  uploads.value[docType] = uploadedDoc
}

const handleRemove = (docType) => {
  uploads.value[docType] = null
}

const submitKyc = async () => {
  submitError.value = ''
  isSubmitting.value = true

  try {
    await $fetch('/api/kyc/submit', {
      method: 'POST',
      headers: authStore.getAuthHeaders(),
    })
    kycStatus.value = 'SUBMITTED'
  } catch (err) {
    submitError.value = err?.data?.message ?? 'Une erreur est survenue'
  } finally {
    isSubmitting.value = false
  }
}

onMounted(async () => {
  if (!authStore.isAuthenticated) {
    return navigateTo('/auth/login')
  }

  try {
    const { data } = await $fetch('/api/kyc/status', { headers: authStore.getAuthHeaders() })
    kycStatus.value = data.kycStatus
    profile.value = data.profile

    // Pre-fill uploads from existing documents
    for (const doc of data.documents) {
      if (doc.status !== 'PENDING') continue
      if (uploads.value[doc.type] !== undefined) {
        uploads.value[doc.type] = { id: doc.id, fileName: doc.fileName, fileUrl: doc.fileUrl }
      }
    }
  } catch (err) {
    console.error('KYC status load error:', err)
  }
})
</script>
