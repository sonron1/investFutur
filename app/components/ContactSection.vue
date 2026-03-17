<template>
  <section id="contact" class="py-20 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="text-center mb-12" data-reveal>
        <div class="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 rounded-full px-4 py-1.5 mb-5">
          <div class="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"></div>
          <span class="text-xs font-semibold text-blue-700">Support expert</span>
        </div>
        <h2 class="section-title mb-4">
          Parlons de vos
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
            objectifs d'investissement
          </span>
        </h2>
        <p class="section-sub">
          Notre équipe d'experts financiers est à votre disposition pour vous accompagner dans vos décisions d'investissement
        </p>
      </div>

      <!-- Main grid -->
      <div class="grid lg:grid-cols-3 gap-8 mb-12">
        <!-- Contact form -->
        <div class="lg:col-span-2" data-reveal="left">
          <div class="bg-slate-50 rounded-2xl border border-slate-100 shadow-sm p-7">
            <div class="mb-6">
              <h3 class="text-lg font-bold text-slate-900 mb-1">Demander un conseil personnalisé</h3>
              <p class="text-slate-500 text-sm">Un expert vous recontacte sous 24h</p>
            </div>

            <form @submit.prevent="handleContactForm" class="space-y-5">
              <div class="grid md:grid-cols-2 gap-5">
                <div>
                  <label class="form-label">Prénom *</label>
                  <input
                    type="text"
                    required
                    v-model="contactForm.firstName"
                    class="form-input"
                    placeholder="Votre prénom"
                  >
                </div>
                <div>
                  <label class="form-label">Nom *</label>
                  <input
                    type="text"
                    required
                    v-model="contactForm.lastName"
                    class="form-input"
                    placeholder="Votre nom"
                  >
                </div>
              </div>

              <div class="grid md:grid-cols-2 gap-5">
                <div>
                  <label class="form-label">Email *</label>
                  <input
                    type="email"
                    required
                    v-model="contactForm.email"
                    class="form-input"
                    placeholder="votre@email.com"
                  >
                </div>
                <div>
                  <label class="form-label">Téléphone</label>
                  <input
                    type="tel"
                    v-model="contactForm.phone"
                    class="form-input"
                    placeholder="+33 1 23 45 67 89"
                  >
                </div>
              </div>

              <div class="grid md:grid-cols-2 gap-5">
                <div>
                  <label class="form-label">Montant à investir</label>
                  <select v-model="contactForm.investmentAmount" class="form-input">
                    <option value="">Sélectionner un montant</option>
                    <option value="5000-25000">5 000€ - 25 000€</option>
                    <option value="25000-100000">25 000€ - 100 000€</option>
                    <option value="100000-500000">100 000€ - 500 000€</option>
                    <option value="500000+">Plus de 500 000€</option>
                  </select>
                </div>
                <div>
                  <label class="form-label">Secteur d'intérêt</label>
                  <select v-model="contactForm.sector" class="form-input">
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
                <label class="form-label">Message</label>
                <textarea
                  v-model="contactForm.message"
                  rows="4"
                  class="form-input"
                  placeholder="Décrivez vos objectifs d'investissement ou vos questions..."
                ></textarea>
              </div>

              <div class="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="consent"
                  required
                  v-model="contactForm.consent"
                  class="h-4 w-4 text-blue-600 focus:ring-blue-500/20 border-slate-300 rounded mt-0.5"
                >
                <label for="consent" class="text-xs text-slate-500">
                  J'accepte d'être recontacté par un conseiller InvestFutur et j'ai lu la
                  <a href="#" class="text-blue-600 hover:text-blue-700 underline">politique de confidentialité</a>.
                </label>
              </div>

              <button
                type="submit"
                :disabled="isSubmitting"
                class="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white py-3 rounded-xl font-semibold transition-all duration-200 shadow-sm hover:shadow-md"
              >
                <span v-if="!isSubmitting" class="flex items-center justify-center">
                  <i class="fas fa-paper-plane mr-2"></i>
                  Envoyer ma demande
                </span>
                <span v-else class="flex items-center justify-center">
                  <div class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Envoi en cours...
                </span>
              </button>
            </form>
          </div>
        </div>

        <!-- Contact info -->
        <div class="space-y-5" data-reveal="right">
          <div v-for="(contact, index) in contactChannels" :key="contact.title">
            <div class="bg-slate-50 border border-slate-100 p-5 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5">
              <div class="flex items-center mb-4">
                <div class="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <i :class="contact.icon" class="text-white text-sm"></i>
                </div>
                <div class="ml-3">
                  <h3 class="text-sm font-bold text-slate-900">{{ contact.title }}</h3>
                  <p class="text-xs text-slate-500">{{ contact.subtitle }}</p>
                </div>
              </div>
              <div class="space-y-2">
                <div v-for="item in contact.items" :key="item.label" class="flex items-center justify-between">
                  <span class="text-slate-500 text-xs">{{ item.label }}:</span>
                  <span class="font-semibold text-slate-900 text-xs">{{ item.value }}</span>
                </div>
              </div>
              <div class="mt-4 pt-3 border-t border-slate-100">
                <div class="flex items-center text-xs text-emerald-600 font-medium">
                  <i class="fas fa-check-circle mr-1.5"></i>
                  {{ contact.availability }}
                </div>
              </div>
            </div>
          </div>

          <!-- Quick FAQ -->
          <div class="bg-slate-50 border border-slate-100 rounded-2xl p-5 shadow-sm">
            <div class="text-blue-600 text-xs font-semibold uppercase tracking-wider mb-3">FAQ</div>
            <h3 class="text-sm font-bold text-slate-900 mb-4">Questions fréquentes</h3>
            <div class="space-y-3">
              <div v-for="faq in quickFAQ" :key="faq.question"
                class="group cursor-pointer"
                @click="faq.open = !faq.open">
                <div class="flex items-center justify-between py-2">
                  <span class="font-medium text-slate-800 text-xs group-hover:text-blue-600 transition-colors pr-3">
                    {{ faq.question }}
                  </span>
                  <i class="fas fa-chevron-down text-slate-400 text-xs transition-transform duration-200 flex-shrink-0"
                    :class="{ 'rotate-180': faq.open }"></i>
                </div>
                <div v-if="faq.open" class="pb-2 text-xs text-slate-500 leading-relaxed">
                  {{ faq.answer }}
                </div>
                <div class="border-b border-slate-100"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Final CTA -->
      <div class="text-center" data-reveal data-reveal-delay="200">
        <div class="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 md:p-10 text-white relative overflow-hidden">
          <div class="absolute top-0 left-0 w-48 h-48 bg-white/5 rounded-full transform -translate-x-24 -translate-y-24"></div>
          <div class="absolute bottom-0 right-0 w-36 h-36 bg-white/5 rounded-full transform translate-x-18 translate-y-18"></div>

          <div class="relative z-10">
            <h3 class="text-2xl font-bold mb-3">Prêt à investir dans votre avenir ?</h3>
            <p class="text-blue-100 mb-7 max-w-xl mx-auto text-sm">
              Rejoignez plus de 2,500 investisseurs qui font déjà confiance à InvestFutur pour construire leur patrimoine.
            </p>

            <div class="flex flex-col sm:flex-row items-center justify-center gap-3 mb-8">
              <NuxtLink to="/auth/register"
                class="bg-white text-blue-600 px-7 py-3 rounded-lg font-bold hover:bg-slate-50 transition-colors flex items-center text-sm shadow-sm">
                <i class="fas fa-user-plus mr-2"></i>
                Créer mon compte gratuitement
              </NuxtLink>
              <button class="border border-white/40 text-white hover:bg-white/10 px-7 py-3 rounded-lg font-semibold transition-colors flex items-center text-sm">
                <i class="fas fa-calendar-alt mr-2"></i>
                Planifier un entretien
              </button>
            </div>

            <div class="grid grid-cols-3 gap-6 max-w-lg mx-auto">
              <div class="text-center">
                <div class="text-xl font-bold mb-0.5">&lt; 24h</div>
                <div class="text-xs text-blue-200">Temps de réponse</div>
              </div>
              <div class="text-center">
                <div class="text-xl font-bold mb-0.5">97%</div>
                <div class="text-xs text-blue-200">Clients satisfaits</div>
              </div>
              <div class="text-center">
                <div class="text-xl font-bold mb-0.5">0€</div>
                <div class="text-xs text-blue-200">Frais de conseil</div>
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
    await new Promise(resolve => setTimeout(resolve, 2000))

    Object.keys(contactForm).forEach(key => {
      contactForm[key] = key === 'consent' ? false : ''
    })

    alert('Votre demande a été envoyée avec succès ! Nous vous recontacterons sous 24h.')
  } catch (error) {
    alert('Erreur lors de l\'envoi. Veuillez réessayer.')
  } finally {
    isSubmitting.value = false
  }
}
</script>
