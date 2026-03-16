<template>
  <footer class="bg-slate-900 text-white relative overflow-hidden">
    <!-- Top accent line -->
    <div class="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/40 to-transparent"></div>

    <div class="relative z-10">
      <!-- Main section -->
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div class="grid grid-cols-1 lg:grid-cols-4 gap-10">
          <!-- Brand column -->
          <div class="lg:col-span-2" data-aos="fade-up">
            <div class="flex items-center space-x-2.5 mb-6">
              <div class="w-9 h-9 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <i class="fas fa-chart-line text-white text-base"></i>
              </div>
              <h4 class="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
                InvestFutur
              </h4>
            </div>

            <p class="text-slate-400 mb-8 leading-relaxed max-w-sm">
              Votre partenaire de confiance pour investir dans l'innovation et construire l'avenir.
              Plus de 2 500 investisseurs nous font déjà confiance.
            </p>

            <!-- Footer stats -->
            <div class="grid grid-cols-4 gap-4 mb-8 pb-8 border-b border-slate-800">
              <div v-for="stat in footerStats" :key="stat.label" class="text-center">
                <div class="text-lg font-black mb-0.5" :class="stat.colorClass">{{ stat.value }}</div>
                <div class="text-xs text-slate-500 uppercase tracking-wide">{{ stat.label }}</div>
              </div>
            </div>

            <!-- Social links -->
            <div class="space-y-3">
              <h5 class="text-sm font-semibold text-slate-300 uppercase tracking-wider">Suivez-nous</h5>
              <div class="flex space-x-3">
                <a v-for="social in socialLinks" :key="social.name"
                   :href="social.url"
                   :class="social.hoverClass"
                   class="w-9 h-9 bg-slate-800 border border-slate-700 rounded-lg flex items-center justify-center transition-all duration-200 text-slate-400 hover:text-white hover:border-transparent">
                  <i :class="social.icon" class="text-sm"></i>
                </a>
              </div>
            </div>
          </div>

          <!-- Links columns -->
          <div class="grid grid-cols-2 gap-8 lg:col-span-2">
            <!-- Navigation -->
            <div data-aos="fade-up" data-aos-delay="100">
              <h5 class="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-5">Navigation</h5>
              <ul class="space-y-3">
                <li v-for="link in navigationLinks" :key="link.name">
                  <NuxtLink :to="link.url"
                            class="text-slate-400 hover:text-white transition-colors duration-200 flex items-center text-sm group">
                    <i :class="link.icon" class="mr-2.5 text-xs text-slate-600 group-hover:text-blue-400 transition-colors w-3"></i>
                    {{ link.name }}
                  </NuxtLink>
                </li>
              </ul>
            </div>

            <!-- Services & Support -->
            <div data-aos="fade-up" data-aos-delay="200">
              <h5 class="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-5">Services</h5>
              <ul class="space-y-3">
                <li v-for="service in serviceLinks" :key="service.name">
                  <a :href="service.url"
                     class="text-slate-400 hover:text-white transition-colors duration-200 flex items-center text-sm group">
                    <i :class="service.icon" class="mr-2.5 text-xs text-slate-600 group-hover:text-indigo-400 transition-colors w-3"></i>
                    {{ service.name }}
                    <span v-if="service.badge"
                          :class="service.badge.class"
                          class="ml-2 px-1.5 py-0.5 text-xs font-semibold rounded">
                      {{ service.badge.text }}
                    </span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <!-- Newsletter section -->
      <div class="border-t border-slate-800">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div class="grid lg:grid-cols-2 gap-10 items-center" data-aos="fade-up">
            <div>
              <h3 class="text-xl font-bold mb-2 text-white">
                Restez informé des meilleures opportunités
              </h3>
              <p class="text-slate-400 text-sm mb-4">
                Newsletter hebdomadaire avec analyses exclusives et insights du marché.
              </p>
              <div class="flex flex-wrap items-center gap-x-5 gap-y-2">
                <div v-for="feature in newsletterFeatures" :key="feature"
                     class="flex items-center text-xs text-slate-400">
                  <i class="fas fa-check text-emerald-400 mr-1.5"></i>
                  {{ feature }}
                </div>
              </div>
            </div>

            <div class="bg-slate-800 border border-slate-700 rounded-xl p-6">
              <form @submit.prevent="handleNewsletterSubmit" class="space-y-3">
                <input
                    type="email"
                    v-model="newsletterEmail"
                    required
                    placeholder="Votre adresse email"
                    class="w-full px-4 py-2.5 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all text-sm placeholder-slate-400"
                >
                <button
                    type="submit"
                    :disabled="isNewsletterSubmitting"
                    class="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-slate-600 disabled:cursor-not-allowed text-white px-5 py-2.5 rounded-lg font-semibold transition-all duration-200 text-sm"
                >
                  <span v-if="!isNewsletterSubmitting">
                    <i class="fas fa-envelope mr-2"></i>
                    S'abonner gratuitement
                  </span>
                  <span v-else>
                    <i class="fas fa-spinner fa-spin mr-2"></i>
                    Inscription...
                  </span>
                </button>
                <p class="text-xs text-slate-500 text-center">Aucun spam. Désabonnement en 1 clic.</p>
              </form>
            </div>
          </div>
        </div>
      </div>

      <!-- Legal section -->
      <div class="border-t border-slate-800">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <!-- Certifications -->
          <div class="grid md:grid-cols-3 gap-6 mb-8" data-aos="fade-up">
            <div v-for="certification in certifications" :key="certification.title"
                 class="flex items-center space-x-3">
              <div class="w-10 h-10 bg-slate-800 border border-slate-700 rounded-lg flex items-center justify-center flex-shrink-0">
                <i :class="[certification.icon, certification.iconColor]" class="text-base"></i>
              </div>
              <div>
                <div class="text-sm font-semibold text-slate-300">{{ certification.title }}</div>
                <div class="text-xs text-slate-500">{{ certification.description }}</div>
              </div>
            </div>
          </div>

          <!-- Bottom bar -->
          <div class="border-t border-slate-800 pt-6">
            <div class="flex flex-col lg:flex-row justify-between items-center gap-4">
              <div class="text-slate-500 text-sm">
                &copy; {{ currentYear }} InvestFutur. Tous droits réservés.
                <span class="text-emerald-400 font-medium ml-1">Investissements sécurisés et régulés</span>
              </div>
              <div class="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs">
                <a v-for="legal in legalLinks" :key="legal.name"
                   :href="legal.url"
                   class="text-slate-500 hover:text-slate-300 transition-colors">
                  {{ legal.name }}
                </a>
              </div>
            </div>
          </div>

          <!-- Disclaimer -->
          <div class="mt-6 p-4 bg-slate-800/60 border border-slate-700/50 rounded-xl">
            <div class="flex items-start space-x-3">
              <i class="fas fa-info-circle text-amber-400 mt-0.5 flex-shrink-0"></i>
              <div class="text-xs text-slate-500 leading-relaxed">
                <strong class="text-slate-400">Avertissement :</strong>
                Les investissements présentent un risque de perte en capital. Les performances passées ne préjugent pas des performances futures.
                InvestFutur est agréé par l'AMF sous le numéro CIP 18000001.
                Les informations présentes sur ce site ne constituent pas des conseils en investissement personnalisés.
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
  { value: '22.3%', label: 'ROI moyen', colorClass: 'text-indigo-400' },
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
  { name: 'Accueil', url: '/', icon: 'fas fa-home' },
  { name: 'Secteurs d\'investissement', url: '/#domaines', icon: 'fas fa-industry' },
  { name: 'Comment ça marche', url: '/#comment', icon: 'fas fa-question-circle' },
  { name: 'À propos', url: '/about', icon: 'fas fa-info-circle' },
  { name: 'Contact', url: '/#contact', icon: 'fas fa-envelope' }
]

const serviceLinks = [
  {
    name: 'Centre d\'aide',
    url: '/help',
    icon: 'fas fa-life-ring',
    badge: { text: '24/7', class: 'bg-emerald-600/30 text-emerald-400' }
  },
  { name: 'FAQ', url: '/faq', icon: 'fas fa-question' },
  { name: 'Guides d\'investissement', url: '/guides', icon: 'fas fa-book' },
  { name: 'Webinaires', url: '/webinars', icon: 'fas fa-video' },
  {
    name: 'API pour développeurs',
    url: '/api',
    icon: 'fas fa-code',
    badge: { text: 'Nouveau', class: 'bg-indigo-600/30 text-indigo-400' }
  },
  { name: 'Calculateur ROI', url: '/calculator', icon: 'fas fa-calculator' }
]

const newsletterFeatures = [
  'Analyses exclusives',
  'Alertes opportunités',
  'Conseils d\'experts'
]

const certifications = [
  {
    title: 'Régulé AMF',
    description: 'Autorisé CIP n° 18000001',
    icon: 'fas fa-shield-alt',
    iconColor: 'text-emerald-400'
  },
  {
    title: 'Sécurité SSL',
    description: 'Cryptage 256-bits',
    icon: 'fas fa-lock',
    iconColor: 'text-blue-400'
  },
  {
    title: 'Garantie dépôt',
    description: 'Jusqu\'à 100 000€',
    icon: 'fas fa-university',
    iconColor: 'text-indigo-400'
  }
]

const legalLinks = [
  { name: 'Mentions légales', url: '/legal' },
  { name: 'Politique de confidentialité', url: '/privacy' },
  { name: 'Conditions d\'utilisation', url: '/terms' },
  { name: 'Cookies', url: '/cookies' }
]

const handleNewsletterSubmit = async () => {
  if (!newsletterEmail.value) return

  isNewsletterSubmitting.value = true

  try {
    // Simulation d'inscription
    await new Promise(resolve => setTimeout(resolve, 1500))

    // Réinitialiser
    newsletterEmail.value = ''

    // Notification de succès
    alert('Merci pour votre inscription ! Vous recevrez notre première newsletter sous peu.')

  } catch (error) {
    alert('Erreur lors de l\'inscription. Veuillez réessayer.')
  } finally {
    isNewsletterSubmitting.value = false
  }
}
</script>

<style scoped>
.bg-clip-text {
  -webkit-background-clip: text;
  background-clip: text;
}
</style>
