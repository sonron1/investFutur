<template>
  <section id="contact" class="py-20 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="text-center mb-12" data-reveal>
        <div class="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 rounded-full px-4 py-1.5 mb-5">
          <div class="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"></div>
          <span class="text-xs font-semibold text-blue-700">{{ $t('contact.tag') }}</span>
        </div>
        <h2 class="section-title mb-4">
          {{ $t('contact.title') }}
        </h2>
        <p class="section-sub">
          {{ $t('contact.subtitle') }}
        </p>
      </div>

      <!-- Main grid -->
      <div class="grid lg:grid-cols-3 gap-8 mb-12">
        <!-- Contact form -->
        <div class="lg:col-span-2" data-reveal="left">
          <div class="bg-slate-50 rounded-2xl border border-slate-100 shadow-sm p-7">
            <Transition name="fade" mode="out-in">
              <!-- Success state -->
              <div v-if="submitSuccess" class="text-center py-10">
                <div class="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-5">
                  <i class="fas fa-check text-emerald-600 text-2xl"></i>
                </div>
                <h3 class="text-xl font-bold text-slate-900 mb-2">{{ $t('contact.successTitle') }}</h3>
                <p class="text-slate-500 text-sm mb-6">{{ $t('contact.successDesc') }}</p>
                <button @click="submitSuccess = false" class="btn-primary">
                  {{ $t('contact.back') }}
                </button>
              </div>

              <!-- Form -->
              <form v-else @submit.prevent="handleContactForm" class="space-y-5">
                <div class="grid md:grid-cols-2 gap-5">
                  <div>
                    <label class="form-label">{{ $t('contact.nameLabel') }} *</label>
                    <input
                      type="text"
                      required
                      v-model="contactForm.name"
                      class="form-input"
                      :placeholder="$t('contact.namePlaceholder')"
                    >
                  </div>
                  <div>
                    <label class="form-label">{{ $t('contact.emailLabel') }} *</label>
                    <input
                      type="email"
                      required
                      v-model="contactForm.email"
                      class="form-input"
                      :placeholder="$t('contact.emailPlaceholder')"
                    >
                  </div>
                </div>

                <div class="grid md:grid-cols-2 gap-5">
                  <div>
                    <label class="form-label">{{ $t('contact.phoneLabel') }}</label>
                    <input
                      type="tel"
                      v-model="contactForm.phone"
                      class="form-input"
                      :placeholder="$t('contact.phonePlaceholder')"
                    >
                  </div>
                  <div>
                    <label class="form-label">{{ $t('contact.amountLabel') }}</label>
                    <select v-model="contactForm.investmentAmount" class="form-input">
                      <option value="">{{ $t('contact.allSectors') }}</option>
                      <option value="5000-25000">5 000€ - 25 000€</option>
                      <option value="25000-100000">25 000€ - 100 000€</option>
                      <option value="100000-500000">100 000€ - 500 000€</option>
                      <option value="500000+">500 000€+</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label class="form-label">{{ $t('contact.sectorLabel') }}</label>
                  <select v-model="contactForm.sector" class="form-input">
                    <option value="">{{ $t('contact.allSectors') }}</option>
                    <option value="ia-deeptech">IA & Deep-Tech</option>
                    <option value="energies-renouvelables">Énergies Renouvelables</option>
                    <option value="biotechnologies">Biotechnologies</option>
                    <option value="fintech">Fintech</option>
                    <option value="mobilite-durable">Mobilité Durable</option>
                  </select>
                </div>

                <div>
                  <label class="form-label">{{ $t('contact.messageLabel') }}</label>
                  <textarea
                    v-model="contactForm.message"
                    rows="4"
                    class="form-input"
                    :placeholder="$t('contact.messagePlaceholder')"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  :disabled="isSubmitting"
                  class="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white py-3 rounded-xl font-semibold transition-all duration-200 shadow-sm hover:shadow-md"
                >
                  <span v-if="!isSubmitting" class="flex items-center justify-center">
                    <i class="fas fa-paper-plane mr-2"></i>
                    {{ $t('contact.submit') }}
                  </span>
                  <span v-else class="flex items-center justify-center">
                    <div class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    {{ $t('contact.sending') }}
                  </span>
                </button>
              </form>
            </Transition>
          </div>
        </div>

        <!-- Contact info -->
        <div class="space-y-5" data-reveal="right">
          <!-- Phone -->
          <div class="bg-slate-50 border border-slate-100 p-5 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5">
            <div class="flex items-center mb-3">
              <div class="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center flex-shrink-0">
                <i class="fas fa-phone text-white text-sm"></i>
              </div>
              <div class="ml-3">
                <h3 class="text-sm font-bold text-slate-900">{{ $t('contact.phone') }}</h3>
                <p class="text-xs text-slate-500">{{ $t('contact.phoneHours') }}</p>
              </div>
            </div>
            <div class="text-sm font-semibold text-slate-900">{{ $t('contact.phoneVal') }}</div>
          </div>

          <!-- Email -->
          <div class="bg-slate-50 border border-slate-100 p-5 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5">
            <div class="flex items-center mb-3">
              <div class="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center flex-shrink-0">
                <i class="fas fa-envelope text-white text-sm"></i>
              </div>
              <div class="ml-3">
                <h3 class="text-sm font-bold text-slate-900">{{ $t('contact.email') }}</h3>
                <p class="text-xs text-slate-500">{{ $t('contact.emailResp') }}</p>
              </div>
            </div>
            <div class="text-sm font-semibold text-slate-900">{{ $t('contact.emailVal') }}</div>
          </div>

          <!-- Chat -->
          <div class="bg-slate-50 border border-slate-100 p-5 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5">
            <div class="flex items-center mb-3">
              <div class="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center flex-shrink-0">
                <i class="fas fa-comments text-white text-sm"></i>
              </div>
              <div class="ml-3">
                <h3 class="text-sm font-bold text-slate-900">{{ $t('contact.chat') }}</h3>
                <p class="text-xs text-slate-500">{{ $t('contact.chatHours') }}</p>
              </div>
            </div>
            <div class="text-sm font-semibold text-slate-900">{{ $t('contact.chatVal') }}</div>
          </div>

          <!-- Quick FAQ -->
          <div class="bg-slate-50 border border-slate-100 rounded-2xl p-5 shadow-sm">
            <div class="text-blue-600 text-xs font-semibold uppercase tracking-wider mb-3">FAQ</div>
            <h3 class="text-sm font-bold text-slate-900 mb-4">{{ $t('contact.faqTitle') }}</h3>
            <div class="space-y-3">
              <div v-for="faq in quickFAQ" :key="faq.qKey"
                class="group cursor-pointer"
                @click="faq.open = !faq.open">
                <div class="flex items-center justify-between py-2">
                  <span class="font-medium text-slate-800 text-xs group-hover:text-blue-600 transition-colors pr-3">
                    {{ $t(faq.qKey) }}
                  </span>
                  <i class="fas fa-chevron-down text-slate-400 text-xs transition-transform duration-200 flex-shrink-0"
                    :class="{ 'rotate-180': faq.open }"></i>
                </div>
                <div v-if="faq.open" class="pb-2 text-xs text-slate-500 leading-relaxed">
                  {{ $t(faq.aKey) }}
                </div>
                <div class="border-b border-slate-100"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, reactive } from 'vue'

const isSubmitting = ref(false)
const submitSuccess = ref(false)

const contactForm = reactive({
  name: '',
  email: '',
  phone: '',
  investmentAmount: '',
  sector: '',
  message: ''
})

const quickFAQ = ref([
  { qKey: 'contact.faq1Q', aKey: 'contact.faq1A', open: false },
  { qKey: 'contact.faq2Q', aKey: 'contact.faq2A', open: false },
  { qKey: 'contact.faq3Q', aKey: 'contact.faq3A', open: false }
])

const handleContactForm = async () => {
  isSubmitting.value = true
  try {
    await $fetch('/api/contact', {
      method: 'POST',
      body: contactForm
    }).catch(() => {})

    Object.keys(contactForm).forEach(key => { contactForm[key] = '' })
    submitSuccess.value = true
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
