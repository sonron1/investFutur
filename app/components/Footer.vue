<template>
  <footer class="bg-gray-900 text-white relative overflow-hidden">
    <!-- Éléments décoratifs -->
    <div class="absolute inset-0 overflow-hidden">
      <div class="absolute top-0 left-1/4 w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-xl opacity-10"></div>
      <div class="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-xl opacity-10"></div>
    </div>

    <div class="relative z-10">
      <!-- Section principale -->
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div class="grid grid-cols-1 lg:grid-cols-4 gap-12">
          <!-- Branding et description -->
          <div class="lg:col-span-2" data-aos="fade-up">
            <div class="flex items-center space-x-3 mb-6">
              <div class="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <i class="fas fa-chart-line text-2xl text-white"></i>
              </div>
              <h4 class="text-3xl font-bold">
                <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                  InvestFuture
                </span>
              </h4>
            </div>

            <p class="text-gray-300 mb-8 leading-relaxed text-lg">
              Votre partenaire de confiance pour investir dans l'innovation et construire l'avenir.
              Plus de 2,500 investisseurs nous font déjà confiance.
            </p>

            <!-- Statistiques footer -->
            <div class="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
              <div v-for="stat in footerStats" :key="stat.label" class="text-center group">
                <div class="text-2xl font-bold mb-1 transition-colors duration-300" :class="stat.colorClass">
                  {{ stat.value }}
                </div>
                <div class="text-xs text-gray-400 uppercase tracking-wide">{{ stat.label }}</div>
              </div>
            </div>

            <!-- Réseaux sociaux améliorés -->
            <div class="space-y-4">
              <h5 class="text-lg font-semibold text-gray-200">Suivez-nous</h5>
              <div class="flex space-x-4">
                <a v-for="social in socialLinks" :key="social.name"
                   :href="social.url"
                   :class="social.hoverClass"
                   class="group w-12 h-12 bg-gray-800 rounded-xl flex items-center justify-center transition-all duration-300 transform hover:scale-110 hover:shadow-lg">
                  <i :class="social.icon" class="text-xl"></i>
                </a>
              </div>
            </div>
          </div>

          <!-- Navigation et liens -->
          <div class="grid md:grid-cols-2 lg:grid-cols-2 gap-8 lg:col-span-2">
            <!-- Navigation -->
            <div data-aos="fade-up" data-aos-delay="200">
              <h5 class="text-lg font-semibold mb-6 text-gray-200">Navigation</h5>
              <ul class="space-y-3">
                <li v-for="link in navigationLinks" :key="link.name">
                  <NuxtLink :to="link.url"
                            class="text-gray-300 hover:text-blue-400 transition-colors duration-300 flex items-center group">
                    <i :class="link.icon" class="mr-3 text-sm group-hover:text-blue-400"></i>
                    {{ link.name }}
                  </NuxtLink>
                </li>
              </ul>
            </div>

            <!-- Services et support -->
            <div data-aos="fade-up" data-aos-delay="400">
              <h5 class="text-lg font-semibold mb-6 text-gray-200">Services & Support</h5>
              <ul class="space-y-3">
                <li v-for="service in serviceLinks" :key="service.name">
                  <a :href="service.url"
                     class="text-gray-300 hover:text-purple-400 transition-colors duration-300 flex items-center group">
                    <i :class="service.icon" class="mr-3 text-sm group-hover:text-purple-400"></i>
                    {{ service.name }}
                    <span v-if="service.badge"
                          :class="service.badge.class"
                          class="ml-2 px-2 py-1 text-xs font-semibold rounded-full">
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
      <div class="border-t border-gray-800">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div class="grid lg:grid-cols-2 gap-12 items-center" data-aos="fade-up">
            <div>
              <h3 class="text-2xl font-bold mb-4 text-gray-200">
                Restez informé des meilleures opportunités
              </h3>
              <p class="text-gray-300 mb-6">
                Recevez notre newsletter hebdomadaire avec analyses exclusives, opportunités d'investissement et insights du marché.
              </p>
              <div class="flex items-center space-x-3">
                <div v-for="feature in newsletterFeatures" :key="feature"
                     class="flex items-center text-sm text-gray-400">
                  <i class="fas fa-check text-green-500 mr-2"></i>
                  {{ feature }}
                </div>
              </div>
            </div>

            <div class="bg-gray-800 rounded-2xl p-8">
              <form @submit.prevent="handleNewsletterSubmit" class="space-y-4">
                <div>
                  <input
                      type="email"
                      v-model="newsletterEmail"
                      required
                      placeholder="Votre adresse email"
                      class="w-full px-4 py-3 bg-gray-700 text-white rounded-xl border border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition-all"
                  >
                </div>
                <button
                    type="submit"
                    :disabled="isNewsletterSubmitting"
                    class="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-600 disabled:to-gray-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 disabled:hover:scale-100"
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
                <p class="text-xs text-gray-400 text-center">
                  Aucun spam. Désabonnement en 1 clic.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>

      <!-- Section légale et certifications -->
      <div class="border-t border-gray-800">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <!-- Certifications et sécurité -->
          <div class="grid md:grid-cols-3 gap-8 mb-8" data-aos="fade-up">
            <div v-for="certification in certifications" :key="certification.title"
                 class="flex items-center space-x-3 group">
              <div class="w-12 h-12 bg-gray-800 rounded-xl flex items-center justify-center group-hover:bg-gray-700 transition-colors">
                <i :class="[certification.icon, certification.iconColor]" class="text-xl"></i>
              </div>
              <div>
                <div class="font-semibold text-gray-200">{{ certification.title }}</div>
                <div class="text-sm text-gray-400">{{ certification.description }}</div>
              </div>
            </div>
          </div>

          <!-- Footer bottom -->
          <div class="border-t border-gray-800 pt-8">
            <div class="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
              <!-- Copyright -->
              <div class="text-gray-400 text-sm">
                &copy; {{ currentYear }} InvestFuture. Tous droits réservés.
                <span class="text-gray-500">|</span>
                <span class="text-green-400 font-semibold">Investissements sécurisés et régulés</span>
              </div>

              <!-- Liens légaux -->
              <div class="flex flex-wrap items-center space-x-6 text-sm">
                <a v-for="legal in legalLinks" :key="legal.name"
                   :href="legal.url"
                   class="text-gray-400 hover:text-white transition-colors">
                  {{ legal.name }}
                </a>
              </div>
            </div>
          </div>

          <!-- Disclaimer -->
          <div class="mt-8 p-4 bg-gray-800 rounded-xl">
            <div class="flex items-start space-x-3">
              <i class="fas fa-info-circle text-yellow-500 mt-1"></i>
              <div class="text-xs text-gray-400 leading-relaxed">
                <strong class="text-gray-300">Avertissement :</strong>
                Les investissements présentent un risque de perte en capital. Les performances passées ne préjugent pas des performances futures.
                InvestFuture est agréé par l'AMF sous le numéro CIP 18000001.
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
  { value: '2,500+', label: 'Investisseurs', colorClass: 'text-blue-400' },
  { value: '189M€', label: 'Investis', colorClass: 'text-green-400' },
  { value: '22.3%', label: 'ROI moyen', colorClass: 'text-purple-400' },
  { value: '156', label: 'Projets', colorClass: 'text-orange-400' }
]

const socialLinks = [
  {
    name: 'Facebook',
    icon: 'fab fa-facebook-f',
    url: '#',
    hoverClass: 'hover:bg-blue-600'
  },
  {
    name: 'Twitter',
    icon: 'fab fa-twitter',
    url: '#',
    hoverClass: 'hover:bg-blue-400'
  },
  {
    name: 'LinkedIn',
    icon: 'fab fa-linkedin-in',
    url: '#',
    hoverClass: 'hover:bg-blue-700'
  },
  {
    name: 'Instagram',
    icon: 'fab fa-instagram',
    url: '#',
    hoverClass: 'hover:bg-pink-600'
  },
  {
    name: 'YouTube',
    icon: 'fab fa-youtube',
    url: '#',
    hoverClass: 'hover:bg-red-600'
  }
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
    badge: { text: '24/7', class: 'bg-green-600 text-white' }
  },
  { name: 'FAQ', url: '/faq', icon: 'fas fa-question' },
  { name: 'Guides d\'investissement', url: '/guides', icon: 'fas fa-book' },
  { name: 'Webinaires', url: '/webinars', icon: 'fas fa-video' },
  {
    name: 'API pour développeurs',
    url: '/api',
    icon: 'fas fa-code',
    badge: { text: 'Nouveau', class: 'bg-purple-600 text-white' }
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
    iconColor: 'text-green-500'
  },
  {
    title: 'Sécurité SSL',
    description: 'Cryptage 256-bits',
    icon: 'fas fa-lock',
    iconColor: 'text-blue-500'
  },
  {
    title: 'Garantie dépôt',
    description: 'Jusqu\'à 100 000€',
    icon: 'fas fa-university',
    iconColor: 'text-purple-500'
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