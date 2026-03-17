<template>
  <footer class="text-white relative overflow-hidden" style="background-color: var(--color-dark)">
    <!-- Top accent line -->
    <div class="absolute top-0 left-0 right-0 h-px" style="background: linear-gradient(90deg, transparent, rgba(59,130,246,0.4), transparent);"></div>

    <div class="relative z-10">
      <!-- Main section -->
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div class="grid grid-cols-1 lg:grid-cols-4 gap-10">
          <!-- Brand column -->
          <div class="lg:col-span-2">
            <div class="flex items-center gap-2.5 mb-6">
              <div class="w-9 h-9 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <i class="fas fa-chart-line text-white text-base"></i>
              </div>
              <h4 class="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
                InvestFutur
              </h4>
            </div>

            <p class="text-slate-400 mb-8 leading-relaxed max-w-sm text-sm">
              {{ $t('footer.tagline') }}
            </p>

            <!-- Footer stats -->
            <div class="grid grid-cols-4 gap-4 mb-8 pb-8 border-b border-white/10">
              <div v-for="stat in footerStats" :key="stat.label" class="text-center">
                <div class="text-lg font-black mb-0.5" :class="stat.colorClass">{{ stat.value }}</div>
                <div class="text-xs text-slate-500 uppercase tracking-wide">{{ stat.label }}</div>
              </div>
            </div>

            <!-- Social links -->
            <div class="space-y-3">
              <h5 class="text-sm font-semibold text-slate-300 uppercase tracking-wider">{{ $t('footer.newsletter') }}</h5>
              <div class="flex gap-2.5">
                <a v-for="social in socialLinks" :key="social.name"
                  :href="social.url"
                  :class="social.hoverClass"
                  class="w-9 h-9 bg-white/8 border border-white/10 rounded-lg flex items-center justify-center transition-all duration-200 text-slate-400 hover:text-white hover:border-transparent">
                  <i :class="social.icon" class="text-sm"></i>
                </a>
              </div>
            </div>
          </div>

          <!-- Links columns -->
          <div class="grid grid-cols-2 gap-8 lg:col-span-2">
            <!-- Navigation -->
            <div>
              <h5 class="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-5">{{ $t('footer.explore') }}</h5>
              <ul class="space-y-3">
                <li v-for="link in navigationLinks" :key="link.nameKey">
                  <NuxtLink :to="link.url"
                    class="text-slate-400 hover:text-white transition-colors duration-200 flex items-center text-sm group">
                    <i :class="link.icon" class="mr-2.5 text-xs text-slate-600 group-hover:text-blue-400 transition-colors w-3"></i>
                    {{ $t(link.nameKey) }}
                  </NuxtLink>
                </li>
              </ul>
            </div>

            <!-- Services -->
            <div>
              <h5 class="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-5">{{ $t('footer.services') }}</h5>
              <ul class="space-y-3">
                <li v-for="service in serviceLinks" :key="service.name">
                  <NuxtLink :to="service.url"
                    class="text-slate-400 hover:text-white transition-colors duration-200 flex items-center text-sm group">
                    <i :class="service.icon" class="mr-2.5 text-xs text-slate-600 group-hover:text-indigo-400 transition-colors w-3"></i>
                    {{ service.name }}
                  </NuxtLink>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <!-- Newsletter section -->
      <div class="border-t border-white/10">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div class="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <h3 class="text-xl font-bold mb-2 text-white">
                {{ $t('footer.newsletter') }}
              </h3>
              <p class="text-slate-400 text-sm">
                {{ $t('footer.newsletterDesc') }}
              </p>
            </div>

            <div class="bg-white/5 border border-white/10 rounded-xl p-6">
              <form @submit.prevent="handleNewsletterSubmit" class="flex gap-3">
                <input
                  type="email"
                  v-model="newsletterEmail"
                  required
                  :placeholder="$t('footer.newsletterPlaceholder')"
                  class="flex-1 px-4 py-2.5 bg-white/8 text-white rounded-lg border border-white/10 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all text-sm placeholder-slate-500"
                >
                <button
                  type="submit"
                  :disabled="isNewsletterSubmitting"
                  class="bg-blue-600 hover:bg-blue-500 disabled:bg-slate-600 disabled:cursor-not-allowed text-white px-5 py-2.5 rounded-lg font-semibold transition-all duration-200 text-sm whitespace-nowrap"
                >
                  {{ isNewsletterSubmitting ? '...' : $t('footer.newsletterBtn') }}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <!-- Legal section -->
      <div class="border-t border-white/10">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <!-- Certifications -->
          <div class="grid md:grid-cols-3 gap-6 mb-8">
            <div v-for="certification in certifications" :key="certification.titleKey"
              class="flex items-center gap-3">
              <div class="w-10 h-10 bg-white/8 border border-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <i :class="[certification.icon, certification.iconColor]" class="text-base"></i>
              </div>
              <div>
                <div class="text-sm font-semibold text-slate-300">{{ $t(certification.titleKey) }}</div>
                <div class="text-xs text-slate-500">{{ certification.description }}</div>
              </div>
            </div>
          </div>

          <!-- Bottom bar -->
          <div class="border-t border-white/10 pt-6">
            <div class="flex flex-col lg:flex-row justify-between items-center gap-4">
              <div class="text-slate-500 text-sm">
                &copy; {{ currentYear }} InvestFutur. {{ $t('footer.rights') }}
              </div>
              <div class="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs">
                <NuxtLink to="/legal" class="text-slate-500 hover:text-slate-300 transition-colors">{{ $t('footer.legal') }}</NuxtLink>
                <NuxtLink to="/privacy" class="text-slate-500 hover:text-slate-300 transition-colors">{{ $t('footer.privacy') }}</NuxtLink>
                <NuxtLink to="/terms" class="text-slate-500 hover:text-slate-300 transition-colors">{{ $t('footer.terms') }}</NuxtLink>
                <NuxtLink to="/cookies" class="text-slate-500 hover:text-slate-300 transition-colors">{{ $t('footer.cookies') }}</NuxtLink>
              </div>
            </div>
          </div>

          <!-- Disclaimer -->
          <div class="mt-6 p-4 bg-white/5 border border-white/8 rounded-xl">
            <div class="flex items-start gap-3">
              <i class="fas fa-info-circle text-amber-400 mt-0.5 flex-shrink-0"></i>
              <div class="text-xs text-slate-500 leading-relaxed">
                {{ $t('footer.disclaimer') }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { ref } from 'vue'

const currentYear = new Date().getFullYear()
const newsletterEmail = ref('')
const isNewsletterSubmitting = ref(false)

const footerStats = [
  { value: '2.5K+', label: 'Investisseurs', colorClass: 'text-blue-400' },
  { value: '189M€', label: 'Investis', colorClass: 'text-emerald-400' },
  { value: '22.3%', label: 'ROI', colorClass: 'text-indigo-400' },
  { value: '156', label: 'Projets', colorClass: 'text-amber-400' }
]

const socialLinks = [
  { name: 'Facebook', icon: 'fab fa-facebook-f', url: '#', hoverClass: 'hover:bg-blue-600 hover:border-blue-600' },
  { name: 'Twitter', icon: 'fab fa-twitter', url: '#', hoverClass: 'hover:bg-sky-500 hover:border-sky-500' },
  { name: 'LinkedIn', icon: 'fab fa-linkedin-in', url: '#', hoverClass: 'hover:bg-blue-700 hover:border-blue-700' },
  { name: 'Instagram', icon: 'fab fa-instagram', url: '#', hoverClass: 'hover:bg-pink-600 hover:border-pink-600' },
  { name: 'YouTube', icon: 'fab fa-youtube', url: '#', hoverClass: 'hover:bg-red-600 hover:border-red-600' }
]

const navigationLinks = [
  { nameKey: 'footer.links.home', url: '/', icon: 'fas fa-home' },
  { nameKey: 'footer.links.sectors', url: '/#domaines', icon: 'fas fa-industry' },
  { nameKey: 'footer.links.howItWorks', url: '/#comment', icon: 'fas fa-question-circle' },
  { nameKey: 'footer.links.about', url: '/about', icon: 'fas fa-info-circle' },
  { nameKey: 'footer.links.contact', url: '/#contact', icon: 'fas fa-envelope' }
]

const serviceLinks = [
  { name: 'KYC', url: '/kyc', icon: 'fas fa-id-card' },
  { name: 'Dashboard', url: '/dashboard', icon: 'fas fa-chart-pie' },
  { name: 'Support', url: '/#contact', icon: 'fas fa-life-ring' },
  { name: 'FAQ', url: '/#contact', icon: 'fas fa-question' }
]

const certifications = [
  {
    titleKey: 'trust.regulated',
    description: 'Autorisé CIP n° 18000001',
    icon: 'fas fa-shield-alt',
    iconColor: 'text-emerald-400'
  },
  {
    titleKey: 'trust.security',
    description: 'Cryptage 256-bits',
    icon: 'fas fa-lock',
    iconColor: 'text-blue-400'
  },
  {
    titleKey: 'trust.protected',
    description: "Jusqu'à 100 000€",
    icon: 'fas fa-university',
    iconColor: 'text-indigo-400'
  }
]

const handleNewsletterSubmit = async () => {
  if (!newsletterEmail.value) return
  isNewsletterSubmitting.value = true
  try {
    await new Promise(resolve => setTimeout(resolve, 1500))
    newsletterEmail.value = ''
  } finally {
    isNewsletterSubmitting.value = false
  }
}
</script>
