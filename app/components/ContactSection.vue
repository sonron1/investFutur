
<template>
  <section id="contact" class="py-24 bg-white relative overflow-hidden">
    <!-- Éléments décoratifs -->
    <div class="absolute inset-0 overflow-hidden">
      <div class="absolute top-1/3 right-1/4 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-50"></div>
      <div class="absolute bottom-1/3 left-1/4 w-72 h-72 bg-purple-100 rounded-full mix-blend-multiply filter blur-xl opacity-50"></div>
    </div>

    <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- En-tête -->
      <div class="text-center mb-16" data-aos="fade-up">
        <div class="inline-flex items-center space-x-2 bg-blue-50 rounded-full px-4 py-2 mb-6">
          <div class="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
          <span class="text-sm font-medium text-blue-700">Support expert</span>
        </div>
        <h2 class="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          Parlons de vos
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
            objectifs d'investissement
          </span>
        </h2>
        <p class="text-xl text-gray-600 max-w-3xl mx-auto">
          Notre équipe d'experts financiers est à votre disposition pour vous accompagner dans vos décisions d'investissement
        </p>
      </div>

      <!-- Grille principale -->
      <div class="grid lg:grid-cols-3 gap-12 mb-20">
        <!-- Formulaire de contact -->
        <div class="lg:col-span-2" data-aos="fade-right">
          <div class="bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
            <div class="mb-8">
              <h3 class="text-2xl font-bold text-gray-900 mb-2">Demander un conseil personnalisé</h3>
              <p class="text-gray-600">Un expert vous recontacte sous 24h</p>
            </div>

            <form @submit.prevent="handleContactForm" class="space-y-6">
              <div class="grid md:grid-cols-2 gap-6">
                <div>
                  <label class="block text-sm font-semibold text-gray-700 mb-2">Prénom *</label>
                  <input
                      type="text"
                      required
                      v-model="contactForm.firstName"
                      class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="Votre prénom"
                  >
                </div>
                <div>
                  <label class="block text-sm font-semibold text-gray-700 mb-2">Nom *</label>
                  <input
                      type="text"
                      required
                      v-model="contactForm.lastName"
                      class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="Votre nom"
                  >
                </div>
              </div>

              <div class="grid md:grid-cols-2 gap-6">
                <div>
                  <label class="block text-sm font-semibold text-gray-700 mb-2">Email *</label>
                  <input
                      type="email"
                      required
                      v-model="contactForm.email"
                      class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="votre@email.com"
                  >
                </div>
                <div>
                  <label class="block text-sm font-semibold text-gray-700 mb-2">Téléphone</label>
                  <input
                      type="tel"
                      v-model="contactForm.phone"
                      class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="+33 1 23 45 67 89"
                  >
                </div>
              </div>

              <div class="grid md:grid-cols-2 gap-6">
                <div>
                  <label class="block text-sm font-semibold text-gray-700 mb-2">Montant à investir</label>
                  <select
                      v-model="contactForm.investmentAmount"
                      class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  >
                    <option value="">Sélectionner un montant</option>
                    <option value="5000-25000">5 000€ - 25 000€</option>
                    <option value="25000-100000">25 000€ - 100 000€</option>
                    <option value="100000-500000">100 000€ - 500 000€</option>
                    <option value="500000+">Plus de 500 000€</option>
                  </select>
                </div>
                <div>
                  <label class="block text-sm font-semibold text-gray-700 mb-2">Secteur d'intérêt</label>
                  <select
                      v-model="contactForm.sector"
                      class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  >
                    <option value="">Tous les secteurs</option>
                    <option value="tech-vertes">Technologies Vertes</option>
                    <option value="biotech">Biotechnologies</option>
                    <option value="fintech">Fintech</option>
                    <option value="ia">Intelligence Artificielle</option>
                    <option value="ecommerce">E-commerce</option>
                    <option value="blockchain">Blockchain</option>
                  </select>
                </div>
              </div>

              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">Message</label>
                <textarea
                    v-model="contactForm.message"
                    rows="4"
                    class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Décrivez vos objectifs d'investissement ou vos questions..."
                ></textarea>
              </div>

              <div class="flex items-start space-x-3">
                <input
                    type="checkbox"
                    id="consent"
                    required
                    v-model="contactForm.consent"
                    class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mt-1"
                >
                <label for="consent" class="text-sm text-gray-600">
                  J'accepte d'être recontacté par un conseiller InvestFuture et j'ai lu la
                  <a href="#" class="text-blue-600 hover:text-blue-500 underline">politique de confidentialité</a>.
                </label>
              </div>

              <button
                  type="submit"
                  :disabled="isSubmitting"
                  class="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white py-4 rounded-xl font-bold transition-all duration-300 transform hover:scale-105 disabled:hover:scale-100 disabled:cursor-not-allowed"
              >
                <span v-if="!isSubmitting" class="flex items-center justify-center">
                  <i class="fas fa-paper-plane mr-2"></i>
                  Envoyer ma demande
                </span>
                <span v-else class="flex items-center justify-center">
                  <i class="fas fa-spinner fa-spin mr-2"></i>
                  Envoi en cours...
                </span>
              </button>
            </form>
          </div>
        </div>

        <!-- Informations de contact -->
        <div class="space-y-8" data-aos="fade-left">
          <!-- Canaux de contact -->
          <div v-for="(contact, index) in contactChannels" :key="contact.title"
               :data-aos="'fade-up'"
               :data-aos-delay="index * 200"
               class="group">
            <div class="bg-gradient-to-br from-white to-gray-50 p-8 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
              <div class="flex items-center mb-6">
                <div class="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <i :class="contact.icon" class="text-2xl text-white"></i>
                </div>
                <div class="ml-4">
                  <h3 class="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {{ contact.title }}
                  </h3>
                  <p class="text-sm text-gray-600">{{ contact.subtitle }}</p>
                </div>
              </div>
              <div class="space-y-3">
                <div v-for="item in contact.items" :key="item.label" class="flex items-center justify-between">
                  <span class="text-gray-600 text-sm">{{ item.label }}:</span>
                  <span class="font-semibold text-gray-900">{{ item.value }}</span>
                </div>
              </div>
              <div class="mt-6 pt-6 border-t border-gray-100">
                <div class="flex items-center text-sm text-green-600">
                  <i class="fas fa-check-circle mr-2"></i>
                  {{ contact.availability }}
                </div>
              </div>
            </div>
          </div>

          <!-- Section FAQ rapide -->
          <div class="bg-blue-50 rounded-3xl p-8">
            <h3 class="text-xl font-bold text-gray-900 mb-6">Questions fréquentes</h3>
            <div class="space-y-4">
              <div v-for="faq in quickFAQ" :key="faq.question"
                   class="group cursor-pointer"
                   @click="faq.open = !faq.open">
                <div class="flex items-center justify-between">
                  <span class="font-medium text-gray-900 text-sm group-hover:text-blue-600 transition-colors">
                    {{ faq.question }}
                  </span>
                  <i class="fas fa-chevron-down text-gray-400 transition-transform duration-300"
                     :class="{ 'rotate-180': faq.open }"></i>
                </div>
                <div v-if="faq.open" class="mt-2 text-sm text-gray-600 leading-relaxed">
                  {{ faq.answer }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Section CTA finale -->
      <div class="text-center" data-aos="fade-up" data-aos-delay="300">
        <div class="bg-gradient-to-r from-blue-600 to-purple-700 rounded-3xl p-12 text-white relative overflow-hidden">
          <!-- Éléments décoratifs -->
          <div class="absolute top-0 left-0 w-64 h-64 bg-white opacity-5 rounded-full transform -translate-x-32 -translate-y-32"></div>
          <div class="absolute bottom-0 right-0 w-48 h-48 bg-white opacity-10 rounded-full transform translate-x-24 translate-y-24"></div>

          <div class="relative z-10">
            <h3 class="text-3xl font-bold mb-4">Prêt à investir dans votre avenir ?</h3>
            <p class="text-blue-100 mb-8 max-w-2xl mx-auto text-lg">
              Rejoignez plus de 2,500 investisseurs qui font déjà confiance à InvestFuture pour construire leur patrimoine.
            </p>

            <div class="flex flex-col sm:flex-row items-center justify-center gap-6">
              <NuxtLink to="/auth/register"
                        class="bg-white text-blue-600 px-8 py-4 rounded-xl font-bold hover:bg-gray-100 transition-colors transform hover:scale-105 flex items-center">
                <i class="fas fa-user-plus mr-2"></i>
                Créer mon compte gratuitement
              </NuxtLink>

              <button class="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 rounded-xl font-bold transition-all duration-300 transform hover:scale-105 flex items-center">
                <i class="fas fa-calendar-alt mr-2"></i>
                Planifier un entretien
              </button>
            </div>

            <!-- Stats de conversion -->
            <div class="mt-12 grid grid-cols-3 gap-8 max-w-2xl mx-auto">
              <div class="text-center">
                <div class="text-2xl font-bold mb-1">< 24h</div>
                <div class="text-sm text-blue-200">Temps de réponse</div>
              </div>
              <div class="text-center">
                <div class="text-2xl font-bold mb-1">97%</div>
                <div class="text-sm text-blue-200">Clients satisfaits</div>
              </div>
              <div class="text-center">
                <div class="text-2xl font-bold mb-1">0€</div>
                <div class="text-sm text-blue-200">Frais de conseil</div>
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

const contactForm = reactive({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  investmentAmount: '',
  sector: '',
  message: '',
  consent: false
})

const contactChannels = [
  {
    title: 'Support téléphonique',
    subtitle: 'Échangez avec nos experts',
    icon: 'fas fa-phone',
    items: [
      { label: 'France', value: '+33 1 23 45 67 89' },
      { label: 'International', value: '+33 1 23 45 67 90' }
    ],
    availability: 'Disponible 7j/7 de 8h à 20h'
  },
  {
    title: 'Support email',
    subtitle: 'Réponse sous 4h',
    icon: 'fas fa-envelope',
    items: [
      { label: 'Support', value: 'support@investfuture.com' },
      { label: 'Commercial', value: 'contact@investfuture.com' }
    ],
    availability: 'Réponse garantie sous 4h'
  },
  {
    title: 'Chat en direct',
    subtitle: 'Assistance immédiate',
    icon: 'fas fa-comments',
    items: [
      { label: 'Disponibilité', value: '7j/7 - 24h/24' },
      { label: 'Langue', value: 'Français & Anglais' }
    ],
    availability: 'Démarrer une conversation'
  }
]

const quickFAQ = ref([
  {
    question: 'Quel est le montant minimum d\'investissement ?',
    answer: 'Le montant minimum est de 5 000€ pour la plupart des secteurs, avec certaines opportunités à partir de 7 500€ ou 10 000€.',
    open: false
  },
  {
    question: 'Les investissements sont-ils sécurisés ?',
    answer: 'Oui, nous sommes régulés par l\'AMF et vos fonds sont protégés par une garantie jusqu\'à 100 000€ par compte.',
    open: false
  },
  {
    question: 'Puis-je retirer mes fonds à tout moment ?',
    answer: 'La liquidité dépend du secteur. Certains investissements ont une durée minimale, d\'autres sont plus flexibles.',
    open: false
  }
])

const handleContactForm = async () => {
  isSubmitting.value = true

  try {
    // Simulation d'envoi
    await new Promise(resolve => setTimeout(resolve, 2000))

    // Réinitialiser le formulaire
    Object.keys(contactForm).forEach(key => {
      contactForm[key] = key === 'consent' ? false : ''
    })

    // Notification de succès (à implémenter)
    alert('Votre demande a été envoyée avec succès ! Nous vous recontacterons sous 24h.')

  } catch (error) {
    alert('Erreur lors de l\'envoi. Veuillez réessayer.')
  } finally {
    isSubmitting.value = false
  }
}
</script>