<template>
  <div class="min-h-screen bg-slate-50 flex flex-col">
    <Navbar />

    <div class="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
      <h1 class="text-2xl font-bold text-slate-900 mb-6">{{ $t('profile.title') }}</h1>

      <div class="grid lg:grid-cols-3 gap-6">
        <!-- Left sidebar: account info -->
        <div class="lg:col-span-1">
          <div class="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 text-center mb-5">
            <div class="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-md">
              <span class="text-3xl font-bold text-white">{{ avatarInitial }}</span>
            </div>
            <h2 class="text-lg font-bold text-slate-900">{{ authStore.fullName }}</h2>
            <p class="text-slate-500 text-sm mt-1">{{ profileData.email }}</p>
            <div class="mt-3">
              <span
                :class="profileData.isVerified ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'"
                class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold"
              >
                <i :class="profileData.isVerified ? 'fas fa-check-circle' : 'fas fa-clock'" class="mr-1.5"></i>
                {{ profileData.isVerified ? $t('profile.verified') : $t('profile.notVerified') }}
              </span>
            </div>
          </div>

          <div class="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
            <h3 class="text-sm font-bold text-slate-900 mb-4">{{ $t('profile.accountInfo') }}</h3>
            <div class="space-y-3">
              <div class="flex justify-between items-center py-2 border-b border-slate-50">
                <span class="text-xs text-slate-500">{{ $t('profile.memberSince') }}</span>
                <span class="text-xs font-medium text-slate-700">{{ memberSince }}</span>
              </div>
              <div class="flex justify-between items-center py-2 border-b border-slate-50">
                <span class="text-xs text-slate-500">{{ $t('profile.kycStatus') }}</span>
                <span :class="kycBadgeClass" class="text-xs font-semibold px-2 py-0.5 rounded-full">
                  {{ kycLabel }}
                </span>
              </div>
              <div class="flex justify-between items-center py-2 border-b border-slate-50">
                <span class="text-xs text-slate-500">{{ $t('profile.investments') }}</span>
                <span class="text-xs font-bold text-slate-900">{{ profileData._count?.investments ?? 0 }}</span>
              </div>
              <div class="flex justify-between items-center py-2">
                <span class="text-xs text-slate-500">{{ $t('profile.transactions') }}</span>
                <span class="text-xs font-bold text-slate-900">{{ profileData._count?.transactions ?? 0 }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Right: forms -->
        <div class="lg:col-span-2 space-y-5">
          <!-- Personal info form -->
          <div class="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
            <div class="mb-5">
              <h3 class="text-base font-bold text-slate-900">{{ $t('profile.personalInfo') }}</h3>
              <p class="text-slate-500 text-sm mt-1">{{ $t('profile.personalInfoDesc') }}</p>
            </div>

            <div v-if="profileSuccess" class="mb-4 p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center text-emerald-700 text-sm">
              <i class="fas fa-check-circle mr-2"></i>
              {{ $t('profile.successMessage') }}
            </div>

            <form @submit.prevent="saveProfile" class="space-y-4">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label class="block text-xs font-semibold text-slate-700 mb-1.5">{{ $t('profile.firstName') }}</label>
                  <input
                    v-model="form.firstName"
                    type="text"
                    required
                    class="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none text-sm text-slate-900 transition-all"
                  >
                </div>
                <div>
                  <label class="block text-xs font-semibold text-slate-700 mb-1.5">{{ $t('profile.lastName') }}</label>
                  <input
                    v-model="form.lastName"
                    type="text"
                    required
                    class="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none text-sm text-slate-900 transition-all"
                  >
                </div>
              </div>

              <div>
                <label class="block text-xs font-semibold text-slate-700 mb-1.5">{{ $t('profile.email') }}</label>
                <input
                  :value="profileData.email"
                  type="email"
                  disabled
                  class="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl bg-slate-50 text-slate-400 text-sm cursor-not-allowed"
                >
                <p class="text-xs text-slate-400 mt-1">{{ $t('profile.emailNote') }}</p>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label class="block text-xs font-semibold text-slate-700 mb-1.5">{{ $t('profile.phone') }}</label>
                  <input
                    v-model="form.phone"
                    type="tel"
                    :placeholder="$t('profile.phonePlaceholder')"
                    class="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none text-sm text-slate-900 transition-all"
                  >
                </div>
                <div>
                  <label class="block text-xs font-semibold text-slate-700 mb-1.5">{{ $t('profile.country') }}</label>
                  <input
                    v-model="form.country"
                    type="text"
                    :placeholder="$t('profile.countryPlaceholder')"
                    class="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none text-sm text-slate-900 transition-all"
                  >
                </div>
              </div>

              <div>
                <label class="block text-xs font-semibold text-slate-700 mb-1.5">{{ $t('profile.address') }}</label>
                <input
                  v-model="form.address"
                  type="text"
                  :placeholder="$t('profile.addressPlaceholder')"
                  class="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none text-sm text-slate-900 transition-all"
                >
              </div>

              <div v-if="profileError" class="p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
                {{ profileError }}
              </div>

              <div class="flex justify-end pt-2">
                <button
                  type="submit"
                  :disabled="isSaving"
                  class="btn-primary px-6 py-2.5 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  <i v-if="isSaving" class="fas fa-circle-notch fa-spin mr-2"></i>
                  {{ isSaving ? $t('profile.saving') : $t('profile.saveChanges') }}
                </button>
              </div>
            </form>
          </div>

          <!-- Password change form -->
          <div class="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
            <h3 class="text-base font-bold text-slate-900 mb-5">{{ $t('profile.changePassword') }}</h3>

            <div v-if="passwordSuccess" class="mb-4 p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center text-emerald-700 text-sm">
              <i class="fas fa-check-circle mr-2"></i>
              {{ $t('profile.passwordSuccess') }}
            </div>

            <form @submit.prevent="changePassword" class="space-y-4">
              <div>
                <label class="block text-xs font-semibold text-slate-700 mb-1.5">{{ $t('profile.currentPassword') }}</label>
                <input
                  v-model="passwordForm.current"
                  type="password"
                  required
                  class="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none text-sm text-slate-900 transition-all"
                >
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label class="block text-xs font-semibold text-slate-700 mb-1.5">{{ $t('profile.newPassword') }}</label>
                  <input
                    v-model="passwordForm.new"
                    type="password"
                    minlength="8"
                    required
                    class="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none text-sm text-slate-900 transition-all"
                  >
                </div>
                <div>
                  <label class="block text-xs font-semibold text-slate-700 mb-1.5">{{ $t('profile.confirmPassword') }}</label>
                  <input
                    v-model="passwordForm.confirm"
                    type="password"
                    minlength="8"
                    required
                    class="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none text-sm text-slate-900 transition-all"
                  >
                </div>
              </div>

              <div v-if="passwordError" class="p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
                {{ passwordError }}
              </div>

              <div class="flex justify-end pt-2">
                <button
                  type="submit"
                  :disabled="isChangingPassword"
                  class="btn-primary px-6 py-2.5 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  <i v-if="isChangingPassword" class="fas fa-circle-notch fa-spin mr-2"></i>
                  {{ $t('profile.updatePassword') }}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

    <Footer />
  </div>
</template>

<script setup>
import { useAuthStore } from '~/stores/auth'

const { t } = useI18n()
const authStore = useAuthStore()

useSeoMeta({ title: computed(() => `${t('profile.title')} — InvestFutur`) })

const profileData = ref({
  email: '',
  firstName: '',
  lastName: '',
  phone: '',
  country: '',
  address: '',
  isVerified: false,
  kycStatus: 'PENDING',
  createdAt: null,
  _count: { investments: 0, transactions: 0 },
})

const form = ref({ firstName: '', lastName: '', phone: '', country: '', address: '' })
const passwordForm = ref({ current: '', new: '', confirm: '' })

const isSaving = ref(false)
const isChangingPassword = ref(false)
const profileSuccess = ref(false)
const profileError = ref('')
const passwordSuccess = ref(false)
const passwordError = ref('')

const avatarInitial = computed(() => {
  const name = authStore.fullName || profileData.value.email || 'U'
  return name.charAt(0).toUpperCase()
})

const memberSince = computed(() => {
  if (!profileData.value.createdAt) return '—'
  return new Date(profileData.value.createdAt).toLocaleDateString('fr-FR', { year: 'numeric', month: 'long' })
})

const kycBadgeClass = computed(() => {
  const map = {
    PENDING: 'bg-amber-100 text-amber-700',
    SUBMITTED: 'bg-blue-100 text-blue-700',
    APPROVED: 'bg-emerald-100 text-emerald-700',
    REJECTED: 'bg-red-100 text-red-700',
  }
  return map[profileData.value.kycStatus] ?? 'bg-slate-100 text-slate-600'
})

const kycLabel = computed(() => {
  const map = {
    PENDING: t('profile.kycPending'),
    SUBMITTED: t('profile.kycSubmitted'),
    APPROVED: t('profile.kycApproved'),
    REJECTED: t('profile.kycRejected'),
  }
  return map[profileData.value.kycStatus] ?? profileData.value.kycStatus
})

const saveProfile = async () => {
  isSaving.value = true
  profileError.value = ''
  profileSuccess.value = false

  try {
    const { data } = await $fetch('/api/auth/profile', {
      method: 'PATCH',
      body: {
        firstName: form.value.firstName,
        lastName: form.value.lastName,
        phone: form.value.phone || null,
        country: form.value.country || null,
        address: form.value.address || null,
      },
      headers: authStore.getAuthHeaders(),
    })

    profileData.value = { ...profileData.value, ...data }
    // Update auth store user
    if (authStore.user) {
      authStore.user.firstName = data.firstName
      authStore.user.lastName = data.lastName
    }
    profileSuccess.value = true
    setTimeout(() => (profileSuccess.value = false), 4000)
  } catch (err) {
    profileError.value = err?.data?.message ?? t('common.error')
  } finally {
    isSaving.value = false
  }
}

const changePassword = async () => {
  passwordError.value = ''
  passwordSuccess.value = false

  if (passwordForm.value.new !== passwordForm.value.confirm) {
    passwordError.value = t('profile.passwordMismatch')
    return
  }

  isChangingPassword.value = true

  try {
    await $fetch('/api/auth/profile', {
      method: 'PATCH',
      body: {
        currentPassword: passwordForm.value.current,
        newPassword: passwordForm.value.new,
      },
      headers: authStore.getAuthHeaders(),
    })

    passwordSuccess.value = true
    passwordForm.value = { current: '', new: '', confirm: '' }
    setTimeout(() => (passwordSuccess.value = false), 4000)
  } catch (err) {
    passwordError.value = err?.data?.message ?? t('common.error')
  } finally {
    isChangingPassword.value = false
  }
}

onMounted(async () => {
  if (!authStore.isAuthenticated) {
    return navigateTo('/auth/login')
  }

  try {
    const { data } = await $fetch('/api/auth/me', { headers: authStore.getAuthHeaders() })
    profileData.value = data
    form.value = {
      firstName: data.firstName ?? '',
      lastName: data.lastName ?? '',
      phone: data.phone ?? '',
      country: data.country ?? '',
      address: data.address ?? '',
    }
  } catch (err) {
    console.error('Profile load error:', err)
  }
})
</script>
