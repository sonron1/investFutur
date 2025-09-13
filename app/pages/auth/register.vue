
<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
    <!-- Navigation minimaliste -->
    <nav class="bg-white shadow-sm border-b">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <NuxtLink to="/" class="flex items-center space-x-3 group">
            <div class="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
              <i class="fas fa-chart-line text-white text-sm"></i>
            </div>
            <span class="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              InvestFuture
            </span>
          </NuxtLink>
          <NuxtLink
              to="/"
              class="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-blue-600 transition-colors"
          >
            <i class="fas fa-arrow-left"></i>
            <span>Retour à l'accueil</span>
          </NuxtLink>
        </div>
      </div>
    </nav>

    <!-- Section Inscription -->
    <div class="py-8 px-4 sm:px-6 lg:px-8">
      <div class="max-w-4xl mx-auto">
        <!-- Étape initiale d'inscription -->
        <div v-show="currentStep === 'initial'" class="bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
          <div class="text-center mb-8">
            <div class="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <i class="fas fa-user-plus text-white text-2xl"></i>
            </div>
            <h2 class="text-3xl font-bold text-gray-900 mb-2">Créer un compte</h2>
            <p class="text-gray-600">Rejoignez +2 500 investisseurs</p>

            <!-- Statistiques motivantes -->
            <div class="mt-6 flex items-center justify-center space-x-8 text-sm">
              <div class="flex items-center text-blue-600">
                <i class="fas fa-users mr-2"></i>
                <span>2,500+ investisseurs</span>
              </div>
              <div class="flex items-center text-green-600">
                <i class="fas fa-chart-line mr-2"></i>
                <span>ROI 22.3%</span>
              </div>
              <div class="flex items-center text-purple-600">
                <i class="fas fa-shield-alt mr-2"></i>
                <span>100% sécurisé</span>
              </div>
            </div>
          </div>

          <!-- Alerts améliorées -->
          <Transition name="alert" appear>
            <div v-if="errorMessage" class="mb-6 p-4 bg-red-50 border border-red-200 text-red-800 rounded-xl flex items-start">
              <i class="fas fa-exclamation-circle text-red-500 mr-3 mt-0.5 flex-shrink-0"></i>
              <div>
                <div class="font-medium">Erreur lors de l'inscription</div>
                <div class="text-sm mt-1">{{ errorMessage }}</div>
              </div>
            </div>
          </Transition>

          <Transition name="alert" appear>
            <div v-if="successMessage" class="mb-6 p-4 bg-green-50 border border-green-200 text-green-800 rounded-xl flex items-start">
              <i class="fas fa-check-circle text-green-500 mr-3 mt-0.5 flex-shrink-0"></i>
              <div>
                <div class="font-medium">Parfait !</div>
                <div class="text-sm mt-1">{{ successMessage }}</div>
              </div>
            </div>
          </Transition>

          <form @submit.prevent="handleRegister" class="space-y-6">
            <div class="grid md:grid-cols-2 gap-6">
              <div>
                <label for="registerEmail" class="block text-sm font-semibold text-gray-700 mb-2">
                  <i class="fas fa-envelope text-blue-500 mr-2"></i>
                  Email *
                </label>
                <input
                    type="email"
                    id="registerEmail"
                    v-model="form.email"
                    required
                    :class="[
                    'w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all',
                    emailError ? 'border-red-300 bg-red-50' : 'border-gray-300'
                  ]"
                    placeholder="votre@email.com"
                    @blur="validateEmail"
                    @input="clearEmailError"
                >
                <div v-if="emailError" class="mt-2 text-red-600 text-sm flex items-center">
                  <i class="fas fa-info-circle mr-1"></i>
                  {{ emailError }}
                </div>
              </div>

              <div>
                <label for="registerPassword" class="block text-sm font-semibold text-gray-700 mb-2">
                  <i class="fas fa-lock text-purple-500 mr-2"></i>
                  Mot de passe *
                </label>
                <div class="relative">
                  <input
                      :type="showPassword ? 'text' : 'password'"
                      id="registerPassword"
                      v-model="form.password"
                      required
                      minlength="8"
                      :class="[
                      'w-full px-4 py-3 pr-12 border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all',
                      passwordError ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    ]"
                      placeholder="••••••••"
                      @input="validatePassword"
                  >
                  <button
                      type="button"
                      @click="togglePasswordVisibility"
                      class="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                  >
                    <i :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
                  </button>
                </div>

                <!-- Indicateur de force du mot de passe -->
                <div v-if="form.password" class="mt-2 space-y-2">
                  <div class="flex space-x-1">
                    <div
                        v-for="i in 4" :key="i"
                        class="flex-1 h-1 rounded-full transition-colors duration-300"
                        :class="i <= passwordStrength ? getPasswordStrengthColor() : 'bg-gray-200'"
                    ></div>
                  </div>
                  <div class="text-xs" :class="getPasswordStrengthTextColor()">
                    {{ getPasswordStrengthText() }}
                  </div>
                </div>

                <div v-if="passwordError" class="mt-2 text-red-600 text-sm flex items-center">
                  <i class="fas fa-exclamation-triangle mr-1"></i>
                  {{ passwordError }}
                </div>
              </div>
            </div>

            <div>
              <label for="confirmPassword" class="block text-sm font-semibold text-gray-700 mb-2">
                <i class="fas fa-check-double text-green-500 mr-2"></i>
                Confirmation du mot de passe *
              </label>
              <input
                  type="password"
                  id="confirmPassword"
                  v-model="form.confirmPassword"
                  required
                  :class="[
                  'w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all',
                  confirmPasswordError ? 'border-red-300 bg-red-50' : 'border-gray-300'
                ]"
                  placeholder="••••••••"
                  @blur="validatePasswordMatch"
                  @input="clearConfirmPasswordError"
              >
              <div v-if="confirmPasswordError" class="mt-2 text-red-600 text-sm flex items-center">
                <i class="fas fa-times-circle mr-1"></i>
                {{ confirmPasswordError }}
              </div>
              <p v-if="!confirmPasswordError" class="mt-2 text-sm text-gray-500">
                Au moins 8 caractères avec majuscules, minuscules et chiffres
              </p>
            </div>

            <!-- Cases à cocher avec validation visuelle -->
            <div class="space-y-4">
              <div class="flex items-start space-x-3">
                <input
                    type="checkbox"
                    id="acceptCommunications"
                    v-model="form.acceptCommunications"
                    required
                    class="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                >
                <label for="acceptCommunications" class="text-sm text-gray-700 leading-relaxed">
                  J'accepte d'être informé·e sur les opportunités d'investissement et de recevoir des communications adaptées à mon profil.
                </label>
              </div>

              <div class="flex items-start space-x-3">
                <input
                    type="checkbox"
                    id="riskAwareness"
                    v-model="form.riskAwareness"
                    required
                    class="mt-1 h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                >
                <label for="riskAwareness" class="text-sm text-gray-700 leading-relaxed">
                  <i class="fas fa-exclamation-triangle text-orange-500 mr-1"></i>
                  J'ai conscience qu'investir dans les entreprises non cotées comporte un risque de perte totale du capital investi.
                </label>
              </div>

              <div class="flex items-start space-x-3">
                <input
                    type="checkbox"
                    id="acceptTerms"
                    v-model="form.acceptTerms"
                    required
                    class="mt-1 h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                >
                <label for="acceptTerms" class="text-sm text-gray-700 leading-relaxed">
                  J'ai lu et j'accepte les
                  <a href="/terms" class="text-blue-600 hover:text-blue-500 underline">conditions générales d'utilisation</a>
                </label>
              </div>
            </div>

            <button
                type="button"
                @click="continueToPersonType"
                :disabled="!isInitialFormValid"
                class="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-[1.02] disabled:hover:scale-100 disabled:cursor-not-allowed relative"
            >
              <span v-if="!isLoading" class="flex items-center justify-center">
                Continuer
                <i class="fas fa-arrow-right ml-2"></i>
              </span>
              <span v-else class="flex items-center justify-center">
                <div class="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                Vérification...
              </span>
            </button>

            <div class="text-center">
              <p class="text-gray-600">
                Déjà un compte ?
                <NuxtLink to="/auth/login" class="text-blue-600 hover:text-blue-500 font-semibold">
                  Se connecter
                </NuxtLink>
              </p>
            </div>
          </form>
        </div>

        <!-- Sélection du type de personne -->
        <div v-show="currentStep === 'personType'" class="bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
          <div class="text-center mb-8">
            <h3 class="text-2xl font-bold text-gray-900 mb-4">Vous souhaitez investir en tant que :</h3>
          </div>

          <div class="grid md:grid-cols-2 gap-6 mb-8">
            <div class="relative">
              <input
                  type="radio"
                  id="personPhysique"
                  value="physique"
                  v-model="form.personType"
                  class="sr-only peer"
              >
              <label
                  for="personPhysique"
                  class="flex flex-col items-center p-8 bg-gray-50 border-2 border-gray-200 rounded-2xl cursor-pointer hover:bg-blue-50 hover:border-blue-300 transition-all peer-checked:bg-blue-50 peer-checked:border-blue-500 peer-checked:text-blue-700"
              >
                <i class="fas fa-user text-4xl text-blue-500 mb-4"></i>
                <h5 class="text-xl font-semibold mb-2">Personne Physique</h5>
                <p class="text-sm text-gray-600 text-center">
                  Vous agissez en tant que particulier
                </p>
              </label>
            </div>

            <div class="relative">
              <input
                  type="radio"
                  id="personMorale"
                  value="morale"
                  v-model="form.personType"
                  class="sr-only peer"
              >
              <label
                  for="personMorale"
                  class="flex flex-col items-center p-8 bg-gray-50 border-2 border-gray-200 rounded-2xl cursor-pointer hover:bg-purple-50 hover:border-purple-300 transition-all peer-checked:bg-purple-50 peer-checked:border-purple-500 peer-checked:text-purple-700"
              >
                <i class="fas fa-building text-4xl text-purple-500 mb-4"></i>
                <h5 class="text-xl font-semibold mb-2">Personne Morale</h5>
                <p class="text-sm text-gray-600 text-center">
                  Vous agissez en tant que représentant·e légal·e d'une société
                </p>
              </label>
            </div>
          </div>

          <div class="flex justify-between">
            <button
                type="button"
                @click="backToInitial"
                class="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
            >
              <i class="fas fa-arrow-left mr-2"></i>
              Précédent
            </button>
            <button
                type="button"
                @click="continueToStep1"
                :disabled="!form.personType"
                class="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white rounded-xl font-semibold transition-all disabled:cursor-not-allowed"
            >
              Continuer
              <i class="fas fa-arrow-right ml-2"></i>
            </button>
          </div>
        </div>

        <!-- Étape 1/5 - Informations spécifiques selon le type de personne -->
        <!-- Personne physique -->
        <div v-show="currentStep === 'step1' && form.personType === 'physique'" class="bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
          <div class="mb-8">
            <!-- Barre de progression -->
            <div class="w-full bg-gray-200 rounded-full h-2 mb-4">
              <div class="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300" style="width: 20%"></div>
            </div>

            <div class="text-center">
              <span class="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full mb-2">
                Étape 1/5 - Informations personnelles
              </span>
              <h4 class="text-2xl font-bold text-gray-900 mb-4">Vos informations personnelles</h4>

              <div class="bg-blue-50 border border-blue-200 rounded-xl p-4 text-sm text-blue-800">
                <i class="fas fa-info-circle mr-2"></i>
                Veuillez compléter vos informations personnelles comme indiquées sur votre pièce d'identité.
                Ces données sont nécessaires pour la déclaration fiscale de vos futurs investissements.
              </div>
            </div>
          </div>

          <div class="space-y-6">
            <div>
              <h6 class="text-lg font-semibold text-gray-900 mb-4">Quelle est votre identité ?</h6>

              <!-- Civilité -->
              <div class="mb-6">
                <label class="block text-sm font-semibold text-gray-700 mb-3">Civilité *</label>
                <div class="grid grid-cols-2 gap-4">
                  <div class="relative">
                    <input
                        type="radio"
                        id="madame"
                        value="madame"
                        v-model="form.civilite"
                        class="sr-only peer"
                    >
                    <label
                        for="madame"
                        class="block w-full p-3 text-center border-2 border-gray-200 rounded-xl cursor-pointer hover:bg-pink-50 hover:border-pink-300 transition-all peer-checked:bg-pink-50 peer-checked:border-pink-500 peer-checked:text-pink-700"
                    >
                      Madame
                    </label>
                  </div>
                  <div class="relative">
                    <input
                        type="radio"
                        id="monsieur"
                        value="monsieur"
                        v-model="form.civilite"
                        class="sr-only peer"
                    >
                    <label
                        for="monsieur"
                        class="block w-full p-3 text-center border-2 border-gray-200 rounded-xl cursor-pointer hover:bg-blue-50 hover:border-blue-300 transition-all peer-checked:bg-blue-50 peer-checked:border-blue-500 peer-checked:text-blue-700"
                    >
                      Monsieur
                    </label>
                  </div>
                </div>
              </div>

              <!-- Noms avec validation -->
              <div class="grid md:grid-cols-2 gap-6">
                <div>
                  <label for="prenom" class="block text-sm font-semibold text-gray-700 mb-2">Prénom *</label>
                  <input
                      type="text"
                      id="prenom"
                      v-model="form.prenom"
                      required
                      minlength="2"
                      class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      :class="{ 'border-red-300 bg-red-50': prenomError }"
                      @blur="validatePrenom"
                  >
                  <div v-if="prenomError" class="mt-1 text-red-600 text-sm">{{ prenomError }}</div>
                </div>
                <div>
                  <label for="nomNaissance" class="block text-sm font-semibold text-gray-700 mb-2">Nom de naissance *</label>
                  <input
                      type="text"
                      id="nomNaissance"
                      v-model="form.nomNaissance"
                      required
                      minlength="2"
                      class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      :class="{ 'border-red-300 bg-red-50': nomNaissanceError }"
                      @blur="validateNomNaissance"
                  >
                  <div v-if="nomNaissanceError" class="mt-1 text-red-600 text-sm">{{ nomNaissanceError }}</div>
                </div>
              </div>

              <div>
                <label for="nomUsage" class="block text-sm font-semibold text-gray-700 mb-2">
                  Nom d'usage <span class="text-gray-500 font-normal">(Optionnel)</span>
                </label>
                <input
                    type="text"
                    id="nomUsage"
                    v-model="form.nomUsage"
                    class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                >
              </div>

              <div>
                <label for="telephone" class="block text-sm font-semibold text-gray-700 mb-2">Téléphone *</label>
                <input
                    type="tel"
                    id="telephone"
                    v-model="form.telephone"
                    required
                    class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    :class="{ 'border-red-300 bg-red-50': telephoneError }"
                    @blur="validateTelephone"
                >
                <div v-if="telephoneError" class="mt-1 text-red-600 text-sm">{{ telephoneError }}</div>
              </div>

              <!-- Informations complémentaires personne physique -->
              <div class="grid md:grid-cols-2 gap-6">
                <div>
                  <label for="profession" class="block text-sm font-semibold text-gray-700 mb-2">Profession *</label>
                  <input
                      type="text"
                      id="profession"
                      v-model="form.profession"
                      required
                      class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  >
                </div>
                <div>
                  <label for="situationFamiliale" class="block text-sm font-semibold text-gray-700 mb-2">Situation familiale *</label>
                  <select
                      id="situationFamiliale"
                      v-model="form.situationFamiliale"
                      required
                      class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  >
                    <option value="">Sélectionner</option>
                    <option value="celibataire">Célibataire</option>
                    <option value="marie">Marié(e)</option>
                    <option value="pacse">Pacsé(e)</option>
                    <option value="divorce">Divorcé(e)</option>
                    <option value="veuf">Veuf/Veuve</option>
                  </select>
                </div>
              </div>

              <div class="grid md:grid-cols-2 gap-6">
                <div>
                  <label for="revenusAnnuels" class="block text-sm font-semibold text-gray-700 mb-2">Revenus annuels *</label>
                  <select
                      id="revenusAnnuels"
                      v-model="form.revenusAnnuels"
                      required
                      class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  >
                    <option value="">Sélectionner une tranche</option>
                    <option value="moins-30k">Moins de 30 000€</option>
                    <option value="30k-60k">30 000€ - 60 000€</option>
                    <option value="60k-100k">60 000€ - 100 000€</option>
                    <option value="100k-200k">100 000€ - 200 000€</option>
                    <option value="plus-200k">Plus de 200 000€</option>
                  </select>
                </div>
                <div>
                  <label for="experienceInvestissement" class="block text-sm font-semibold text-gray-700 mb-2">Expérience d'investissement *</label>
                  <select
                      id="experienceInvestissement"
                      v-model="form.experienceInvestissement"
                      required
                      class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  >
                    <option value="">Sélectionner</option>
                    <option value="debutant">Débutant</option>
                    <option value="intermediaire">Intermédiaire</option>
                    <option value="experimente">Expérimenté</option>
                  </select>
                </div>
              </div>
            </div>

            <div>
              <h6 class="text-lg font-semibold text-gray-900 mb-4">Où êtes-vous né·e ?</h6>

              <div class="grid md:grid-cols-2 gap-6">
                <div>
                  <label for="dateNaissance" class="block text-sm font-semibold text-gray-700 mb-2">Date de naissance *</label>
                  <input
                      type="date"
                      id="dateNaissance"
                      v-model="form.dateNaissance"
                      required
                      :max="maxDate"
                      class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      :class="{ 'border-red-300 bg-red-50': dateNaissanceError }"
                      @blur="validateDateNaissance"
                  >
                  <div v-if="dateNaissanceError" class="mt-1 text-red-600 text-sm">{{ dateNaissanceError }}</div>
                </div>
                <div>
                  <label for="paysNaissance" class="block text-sm font-semibold text-gray-700 mb-2">Pays de naissance *</label>
                  <select
                      id="paysNaissance"
                      v-model="form.paysNaissance"
                      required
                      class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  >
                    <option value="">Sélectionnez un pays</option>
                    <option
                        v-for="country in availableCountries"
                        :key="country.code"
                        :value="country.code"
                    >
                      {{ country.name }}
                    </option>
                  </select>
                </div>
              </div>

              <div class="grid md:grid-cols-2 gap-6">
                <div>
                  <label for="nationalite" class="block text-sm font-semibold text-gray-700 mb-2">Nationalité *</label>
                  <select
                      id="nationalite"
                      v-model="form.nationalite"
                      required
                      class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  >
                    <option value="">Sélectionnez une nationalité</option>
                    <option
                        v-for="country in availableCountries"
                        :key="country.code"
                        :value="country.code"
                    >
                      {{ country.nationality || country.name }}
                    </option>
                  </select>
                </div>
                <div>
                  <label for="villeNaissance" class="block text-sm font-semibold text-gray-700 mb-2">Ville de naissance *</label>
                  <input
                      type="text"
                      id="villeNaissance"
                      v-model="form.villeNaissance"
                      required
                      class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  >
                </div>
              </div>

              <div>
                <label for="codePostalNaissance" class="block text-sm font-semibold text-gray-700 mb-2">Code postal de naissance *</label>
                <input
                    type="text"
                    id="codePostalNaissance"
                    v-model="form.codePostalNaissance"
                    required
                    class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                >
              </div>
            </div>
          </div>

          <div class="flex justify-between mt-8">
            <button
                type="button"
                @click="backToPersonType"
                class="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
            >
              <i class="fas fa-arrow-left mr-2"></i>
              Précédent
            </button>
            <button
                type="button"
                @click="continueToStep2"
                :disabled="!isStep1PhysiqueValid"
                class="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white rounded-xl font-semibold transition-all disabled:cursor-not-allowed"
            >
              Continuer
              <i class="fas fa-arrow-right ml-2"></i>
            </button>
          </div>
        </div>

        <!-- Personne morale -->
        <div v-show="currentStep === 'step1' && form.personType === 'morale'" class="bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
          <div class="mb-8">
            <!-- Barre de progression -->
            <div class="w-full bg-gray-200 rounded-full h-2 mb-4">
              <div class="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300" style="width: 25%"></div>
            </div>

            <div class="text-center">
              <span class="inline-block bg-purple-100 text-purple-800 text-xs font-semibold px-3 py-1 rounded-full mb-2">
                Étape 1/4 - Informations entreprise
              </span>
              <h4 class="text-2xl font-bold text-gray-900 mb-4">Informations sur votre entreprise</h4>
            </div>
          </div>

          <div class="space-y-6">
            <!-- Informations légales de l'entreprise -->
            <div>
              <h6 class="text-lg font-semibold text-gray-900 mb-4">Informations légales</h6>

              <div class="grid md:grid-cols-2 gap-6">
                <div>
                  <label for="raisonSociale" class="block text-sm font-semibold text-gray-700 mb-2">Raison sociale *</label>
                  <input
                      type="text"
                      id="raisonSociale"
                      v-model="form.raisonSociale"
                      required
                      class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  >
                </div>
                <div>
                  <label for="formeJuridique" class="block text-sm font-semibold text-gray-700 mb-2">Forme juridique *</label>
                  <select
                      id="formeJuridique"
                      v-model="form.formeJuridique"
                      required
                      class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  >
                    <option value="">Sélectionner</option>
                    <option value="SARL">SARL</option>
                    <option value="SAS">SAS</option>
                    <option value="SA">SA</option>
                    <option value="SCI">SCI</option>
                    <option value="EURL">EURL</option>
                    <option value="SASU">SASU</option>
                    <option value="autre">Autre</option>
                  </select>
                </div>
              </div>

              <div class="grid md:grid-cols-2 gap-6">
                <div>
                  <label for="siret" class="block text-sm font-semibold text-gray-700 mb-2">N° SIRET *</label>
                  <input
                      type="text"
                      id="siret"
                      v-model="form.siret"
                      required
                      pattern="[0-9]{14}"
                      placeholder="12345678901234"
                      class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  >
                </div>
                <div>
                  <label for="codeNaf" class="block text-sm font-semibold text-gray-700 mb-2">Code NAF/APE *</label>
                  <input
                      type="text"
                      id="codeNaf"
                      v-model="form.codeNaf"
                      required
                      placeholder="1234Z"
                      class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  >
                </div>
              </div>

              <div class="grid md:grid-cols-2 gap-6">
                <div>
                  <label for="capitalSocial" class="block text-sm font-semibold text-gray-700 mb-2">Capital social (€) *</label>
                  <input
                      type="number"
                      id="capitalSocial"
                      v-model="form.capitalSocial"
                      required
                      min="1"
                      class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  >
                </div>
                <div>
                  <label for="dateCreation" class="block text-sm font-semibold text-gray-700 mb-2">Date de création *</label>
                  <input
                      type="date"
                      id="dateCreation"
                      v-model="form.dateCreation"
                      required
                      class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  >
                </div>
              </div>

              <!-- Adresse du siège social -->
              <div>
                <h6 class="text-lg font-semibold text-gray-900 mb-4 mt-6">Siège social</h6>
                <div>
                  <label for="adresseSiege" class="block text-sm font-semibold text-gray-700 mb-2">Adresse complète *</label>
                  <textarea
                      id="adresseSiege"
                      v-model="form.adresseSiege"
                      required
                      rows="3"
                      placeholder="Numéro, rue, complément d'adresse, code postal, ville"
                      class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                  ></textarea>
                </div>
              </div>

              <!-- Informations financières -->
              <div>
                <h6 class="text-lg font-semibold text-gray-900 mb-4">Informations financières</h6>
                <div class="grid md:grid-cols-2 gap-6">
                  <div>
                    <label for="chiffreAffaires" class="block text-sm font-semibold text-gray-700 mb-2">CA annuel (€)</label>
                    <select
                        id="chiffreAffaires"
                        v-model="form.chiffreAffaires"
                        class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    >
                      <option value="">Non communiqué</option>
                      <option value="0-100000">0 - 100 000€</option>
                      <option value="100000-500000">100 000€ - 500 000€</option>
                      <option value="500000-2000000">500 000€ - 2M€</option>
                      <option value="2000000+">Plus de 2M€</option>
                    </select>
                  </div>
                  <div>
                    <label for="effectifs" class="block text-sm font-semibold text-gray-700 mb-2">Nombre d'employés</label>
                    <select
                        id="effectifs"
                        v-model="form.effectifs"
                        class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    >
                      <option value="">Non communiqué</option>
                      <option value="0">0 (auto-entrepreneur)</option>
                      <option value="1-10">1-10</option>
                      <option value="11-50">11-50</option>
                      <option value="50+">Plus de 50</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <!-- Représentant légal -->
            <div>
              <h6 class="text-lg font-semibold text-gray-900 mb-4">Représentant légal</h6>
              <div class="grid md:grid-cols-2 gap-6">
                <div>
                  <label for="representantCivilite" class="block text-sm font-semibold text-gray-700 mb-2">Civilité *</label>
                  <select
                      id="representantCivilite"
                      v-model="form.representantCivilite"
                      required
                      class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  >
                    <option value="">Sélectionner</option>
                    <option value="madame">Madame</option>
                    <option value="monsieur">Monsieur</option>
                  </select>
                </div>
                <div>
                  <label for="representantQualite" class="block text-sm font-semibold text-gray-700 mb-2">Qualité *</label>
                  <select
                      id="representantQualite"
                      v-model="form.representantQualite"
                      required
                      class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  >
                    <option value="">Sélectionner</option>
                    <option value="gerant">Gérant</option>
                    <option value="president">Président</option>
                    <option value="directeur-general">Directeur Général</option>
                    <option value="associe">Associé</option>
                    <option value="autre">Autre</option>
                  </select>
                </div>
              </div>

              <div class="grid md:grid-cols-2 gap-6">
                <div>
                  <label for="representantPrenom" class="block text-sm font-semibold text-gray-700 mb-2">Prénom *</label>
                  <input
                      type="text"
                      id="representantPrenom"
                      v-model="form.representantPrenom"
                      required
                      class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  >
                </div>
                <div>
                  <label for="representantNom" class="block text-sm font-semibold text-gray-700 mb-2">Nom *</label>
                  <input
                      type="text"
                      id="representantNom"
                      v-model="form.representantNom"
                      required
                      class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  >
                </div>
              </div>

              <div class="grid md:grid-cols-2 gap-6">
                <div>
                  <label for="representantDateNaissance" class="block text-sm font-semibold text-gray-700 mb-2">Date de naissance *</label>
                  <input
                      type="date"
                      id="representantDateNaissance"
                      v-model="form.representantDateNaissance"
                      required
                      :max="maxDate"
                      class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  >
                </div>
                <div>
                  <label for="representantNationalite" class="block text-sm font-semibold text-gray-700 mb-2">Nationalité *</label>
                  <select
                      id="representantNationalite"
                      v-model="form.representantNationalite"
                      required
                      class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  >
                    <option value="">Sélectionner</option>
                    <option
                        v-for="country in availableCountries"
                        :key="country.code"
                        :value="country.code"
                    >
                      {{ country.nationality || country.name }}
                    </option>
                  </select>
                </div>
              </div>

              <div>
                <label for="representantTelephone" class="block text-sm font-semibold text-gray-700 mb-2">Téléphone *</label>
                <input
                    type="tel"
                    id="representantTelephone"
                    v-model="form.representantTelephone"
                    required
                    class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                >
              </div>
            </div>
          </div>

          <div class="flex justify-between mt-8">
            <button
                type="button"
                @click="backToPersonType"
                class="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
            >
              <i class="fas fa-arrow-left mr-2"></i>
              Précédent
            </button>
            <button
                type="button"
                @click="continueToStep2"
                :disabled="!isStep1MoraleValid"
                class="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white rounded-xl font-semibold transition-all disabled:cursor-not-allowed"
            >
              Continuer
              <i class="fas fa-arrow-right ml-2"></i>
            </button>
          </div>
        </div>

        <!-- Étape 2/5 - Adresse (commune aux deux types) -->
        <div v-show="currentStep === 'step2'" class="bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
          <div class="mb-8">
            <!-- Barre de progression -->
            <div class="w-full bg-gray-200 rounded-full h-2 mb-4">
              <div class="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300" :style="{ width: form.personType === 'physique' ? '40%' : '50%' }"></div>
            </div>

            <div class="text-center">
              <span class="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full mb-2">
                Étape 2/{{ form.personType === 'physique' ? '5' : '4' }} - Adresse
              </span>
              <h4 class="text-2xl font-bold text-gray-900 mb-4">
                {{ form.personType === 'physique' ? 'Quelle est votre adresse ?' : 'Adresse de correspondance' }}
              </h4>
            </div>
          </div>

          <div class="space-y-6">
            <div>
              <label for="paysResidence" class="block text-sm font-semibold text-gray-700 mb-2">Pays *</label>
              <select
                  id="paysResidence"
                  v-model="form.paysResidence"
                  required
                  class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              >
                <option value="">Sélectionnez un pays</option>
                <option
                    v-for="country in availableCountries"
                    :key="country.code"
                    :value="country.code"
                >
                  {{ country.name }}
                </option>
              </select>
            </div>

            <div>
              <label for="adresse" class="block text-sm font-semibold text-gray-700 mb-2">Adresse *</label>
              <textarea
                  id="adresse"
                  v-model="form.adresse"
                  required
                  rows="3"
                  class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                  placeholder="Numéro, rue, complément d'adresse"
              ></textarea>
            </div>

            <div class="grid md:grid-cols-3 gap-6">
              <div class="md:col-span-2">
                <label for="ville" class="block text-sm font-semibold text-gray-700 mb-2">Ville *</label>
                <input
                    type="text"
                    id="ville"
                    v-model="form.ville"
                    required
                    class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                >
              </div>
              <div>
                <label for="codePostal" class="block text-sm font-semibold text-gray-700 mb-2">Code postal *</label>
                <input
                    type="text"
                    id="codePostal"
                    v-model="form.codePostal"
                    required
                    class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                >
              </div>
            </div>

            <div v-if="form.personType === 'physique'">
              <label for="paysResidenceFiscale" class="block text-sm font-semibold text-gray-700 mb-2">Pays de résidence fiscale *</label>
              <select
                  id="paysResidenceFiscale"
                  v-model="form.paysResidenceFiscale"
                  required
                  class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              >
                <option value="">Sélectionnez un pays</option>
                <option
                    v-for="country in availableCountries"
                    :key="country.code"
                    :value="country.code"
                >
                  {{ country.name }}
                </option>
              </select>
            </div>
          </div>

          <div class="flex justify-between mt-8">
            <button
                type="button"
                @click="backToStep1"
                class="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
            >
              <i class="fas fa-arrow-left mr-2"></i>
              Précédent
            </button>
            <button
                type="button"
                @click="continueToStep3"
                :disabled="!isStep2Valid"
                class="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white rounded-xl font-semibold transition-all disabled:cursor-not-allowed"
            >
              Continuer
              <i class="fas fa-arrow-right ml-2"></i>
            </button>
          </div>
        </div>

        <!-- Étape 3 - Documents et finalisation -->
        <div v-show="currentStep === 'step3'" class="bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
          <div class="mb-8">
            <!-- Barre de progression -->
            <div class="w-full bg-gray-200 rounded-full h-2 mb-4">
              <div class="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300" :style="{ width: form.personType === 'physique' ? '80%' : '75%' }"></div>
            </div>

            <div class="text-center">
              <span class="inline-block bg-green-100 text-green-800 text-xs font-semibold px-3 py-1 rounded-full mb-2">
                Étape finale - Documents
              </span>
              <h4 class="text-2xl font-bold text-gray-900 mb-4">Documents requis</h4>

              <div class="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-800">
                <i class="fas fa-info-circle mr-2"></i>
                Ces documents sont nécessaires pour valider votre compte conformément à la réglementation française.
              </div>
            </div>
          </div>

          <div class="space-y-6">
            <!-- Documents personne physique -->
            <div v-if="form.personType === 'physique'">
              <h6 class="text-lg font-semibold text-gray-900 mb-4">Documents à fournir</h6>

              <div class="space-y-4">
                <div class="border border-gray-200 rounded-xl p-4">
                  <label class="block text-sm font-semibold text-gray-700 mb-2">
                    <i class="fas fa-id-card text-blue-500 mr-2"></i>
                    Pièce d'identité * (CNI, Passeport)
                  </label>
                  <input
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      @change="handleFileUpload('pieceIdentite', $event)"
                  >
                  <p class="text-xs text-gray-500 mt-1">Formats acceptés: PDF, JPG, PNG - Max 5MB</p>
                </div>

                <div class="border border-gray-200 rounded-xl p-4">
                  <label class="block text-sm font-semibold text-gray-700 mb-2">
                    <i class="fas fa-home text-green-500 mr-2"></i>
                    Justificatif de domicile * (moins de 3 mois)
                  </label>
                  <input
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      @change="handleFileUpload('justificatifDomicile', $event)"
                  >
                  <p class="text-xs text-gray-500 mt-1">Facture électricité, gaz, téléphone, quittance loyer...</p>
                </div>

                <div class="border border-gray-200 rounded-xl p-4">
                  <label class="block text-sm font-semibold text-gray-700 mb-2">
                    <i class="fas fa-university text-purple-500 mr-2"></i>
                    RIB (Relevé d'Identité Bancaire) *
                  </label>
                  <input
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      @change="handleFileUpload('rib', $event)"
                  >
                </div>
              </div>
            </div>

            <!-- Documents personne morale -->
            <div v-if="form.personType === 'morale'">
              <h6 class="text-lg font-semibold text-gray-900 mb-4">Documents entreprise à fournir</h6>

              <div class="space-y-4">
                <div class="border border-gray-200 rounded-xl p-4">
                  <label class="block text-sm font-semibold text-gray-700 mb-2">
                    <i class="fas fa-certificate text-blue-500 mr-2"></i>
                    Extrait Kbis * (moins de 3 mois)
                  </label>
                  <input
                      type="file"
                      accept=".pdf"
                      class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      @change="handleFileUpload('kbis', $event)"
                  >
                </div>

                <div class="border border-gray-200 rounded-xl p-4">
                  <label class="block text-sm font-semibold text-gray-700 mb-2">
                    <i class="fas fa-file-contract text-green-500 mr-2"></i>
                    Statuts de l'entreprise *
                  </label>
                  <input
                      type="file"
                      accept=".pdf"
                      class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      @change="handleFileUpload('statuts', $event)"
                  >
                </div>

                <div class="border border-gray-200 rounded-xl p-4">
                  <label class="block text-sm font-semibold text-gray-700 mb-2">
                    <i class="fas fa-id-card text-purple-500 mr-2"></i>
                    Pièce d'identité du représentant légal *
                  </label>
                  <input
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      @change="handleFileUpload('pieceIdentiteRepresentant', $event)"
                  >
                </div>

                <div class="border border-gray-200 rounded-xl p-4">
                  <label class="block text-sm font-semibold text-gray-700 mb-2">
                    <i class="fas fa-university text-orange-500 mr-2"></i>
                    RIB de l'entreprise *
                  </label>
                  <input
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      @change="handleFileUpload('ribEntreprise', $event)"
                  >
                </div>
              </div>
            </div>
          </div>

          <div class="flex justify-between mt-8">
            <button
                type="button"
                @click="backToStep2"
                class="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
            >
              <i class="fas fa-arrow-left mr-2"></i>
              Précédent
            </button>
            <button
                type="button"
                @click="continueToFinal"
                :disabled="!isDocumentsValid"
                class="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white rounded-xl font-semibold transition-all disabled:cursor-not-allowed"
            >
              <span v-if="!isLoading" class="flex items-center">
                Finaliser l'inscription
                <i class="fas fa-check ml-2"></i>
              </span>
              <span v-else class="flex items-center">
                <div class="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                Création du compte...
              </span>
            </button>
          </div>
        </div>

        <!-- Finalisation -->
        <div v-show="currentStep === 'final'" class="bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
          <div class="text-center">
            <div class="w-24 h-24 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <i class="fas fa-check text-white text-4xl"></i>
            </div>
            <h2 class="text-3xl font-bold text-green-600 mb-4">Félicitations !</h2>
            <p class="text-gray-600 mb-8">Votre demande d'inscription a été soumise avec succès</p>

            <div class="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-6">
              <div class="flex items-start justify-center">
                <i class="fas fa-info-circle text-blue-600 mr-3 mt-1"></i>
                <div class="text-left">
                  <p class="font-semibold text-blue-800">Validation en cours</p>
                  <p class="text-blue-700 text-sm mt-1">
                    Votre dossier d'inscription est actuellement en cours d'analyse par notre équipe.
                    Vous recevrez un email de confirmation une fois la vérification terminée.
                    Cette étape prend généralement 24 à 48 heures ouvrées.
                  </p>
                </div>
              </div>
            </div>

            <div class="bg-green-50 border border-green-200 rounded-xl p-6 mb-8">
              <div class="flex items-start justify-center">
                <i class="fas fa-clock text-green-600 mr-3 mt-1"></i>
                <div class="text-left">
                  <p class="font-semibold text-green-800">Prochaines étapes</p>
                  <p class="text-green-700 text-sm mt-1">
                    En attendant la validation, vous pouvez déjà accéder à votre tableau de bord pour découvrir
                    nos opportunités d'investissement et vous familiariser avec la plateforme.
                  </p>
                </div>
              </div>
            </div>

            <button
                type="button"
                @click="redirectToDashboard"
                :disabled="isLoading"
                class="inline-flex items-center px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 disabled:from-gray-400 disabled:to-gray-500 text-white rounded-xl font-semibold transition-all transform hover:scale-105 disabled:hover:scale-100 disabled:cursor-not-allowed"
            >
              <span v-if="!isLoading" class="flex items-center">
                <i class="fas fa-tachometer-alt mr-3"></i>
                Accéder à mon tableau de bord
              </span>
              <span v-else class="flex items-center">
                <div class="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
                Redirection...
              </span>
            </button>

            <div class="mt-6 text-center">
              <p class="text-sm text-gray-500">
                Une question ? Contactez-nous à
                <a href="mailto:support@investfuture.com" class="text-blue-600 hover:text-blue-500">
                  support@investfuture.com
                </a>
              </p>
            </div>
          </div>
        </div>


      </div>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from '~/stores/auth'
import { usePageRefresh } from '~/composables/usePageRefresh'
import { useCountries } from '~/composables/useCountries'
import { nextTick } from 'vue'


useSeoMeta({
  title: 'Inscription - InvestFuture',
  description: 'Créez votre compte InvestFuture et commencez à investir dans l\'innovation'
})

const authStore = useAuthStore()
const { markPageRefresh } = usePageRefresh()

// Utilisation du composable des pays
const { countries } = useCountries()

// Compute disponible partout dans le template
const availableCountries = computed(() => countries.value)

// États pour la gestion des étapes
const currentStep = ref('initial')
const isLoading = ref(false)
const errorMessage = ref('')
const successMessage = ref('')
const showPassword = ref(false)

// États d'erreur pour validation
const emailError = ref('')
const passwordError = ref('')
const confirmPasswordError = ref('')
const prenomError = ref('')
const nomNaissanceError = ref('')
const telephoneError = ref('')
const dateNaissanceError = ref('')

// Force du mot de passe
const passwordStrength = ref(0)

// Date maximum (18 ans minimum)
const maxDate = computed(() => {
  const date = new Date()
  date.setFullYear(date.getFullYear() - 18)
  return date.toISOString().split('T')[0]
})

// Données du formulaire complet
const form = reactive({
  // Informations de base
  email: '',
  password: '',
  confirmPassword: '',
  acceptCommunications: false,
  riskAwareness: false,
  acceptTerms: false,
  personType: '',

  // Personne physique
  civilite: '',
  prenom: '',
  nomNaissance: '',
  nomUsage: '',
  telephone: '',
  dateNaissance: '',
  paysNaissance: '',
  nationalite: '',
  villeNaissance: '',
  codePostalNaissance: '',
  profession: '',
  situationFamiliale: '',
  revenusAnnuels: '',
  experienceInvestissement: '',

  // Personne morale - entreprise
  raisonSociale: '',
  formeJuridique: '',
  siret: '',
  codeNaf: '',
  capitalSocial: '',
  dateCreation: '',
  adresseSiege: '',
  chiffreAffaires: '',
  effectifs: '',

  // Représentant légal (personne morale)
  representantCivilite: '',
  representantQualite: '',
  representantPrenom: '',
  representantNom: '',
  representantDateNaissance: '',
  representantNationalite: '',
  representantTelephone: '',

  // Adresse (commune)
  paysResidence: '',
  adresse: '',
  ville: '',
  codePostal: '',
  paysResidenceFiscale: '', // Seulement pour personne physique

  // Documents
  documents: {}
})

// Gestion des fichiers
const handleFileUpload = (fieldName, event) => {
  const file = event.target.files[0]
  if (file) {
    // Validation taille fichier (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      alert('Le fichier est trop volumineux. Taille maximum: 5MB')
      event.target.value = ''
      return
    }

    form.documents[fieldName] = file
    // Forcer la réactivité pour que la validation se mette à jour
    nextTick(() => {
      // Vérification immédiate de la validation
      console.log('Document uploadé:', fieldName, 'Documents actuels:', Object.keys(form.documents))
    })
  } else {
    // Supprimer le document si aucun fichier sélectionné
    delete form.documents[fieldName]
  }
}


// Validations en temps réel
const validateEmail = async () => {
  if (!form.email) {
    emailError.value = ''
    return
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(form.email)) {
    emailError.value = 'Format email invalide'
    return
  }

  const exists = await authStore.checkEmailExists(form.email)
  if (exists) {
    emailError.value = 'Cet email est déjà utilisé'
  } else {
    emailError.value = ''
  }
}

const isDocumentsValid = computed(() => {
  if (form.personType === 'physique') {
    return !!(form.documents.pieceIdentite &&
        form.documents.justificatifDomicile &&
        form.documents.rib)
  } else {
    return !!(form.documents.kbis &&
        form.documents.statuts &&
        form.documents.pieceIdentiteRepresentant &&
        form.documents.ribEntreprise)
  }
})

const continueToFinal = async () => {
  console.log('Tentative de finalisation, documents valides:', isDocumentsValid.value)
  console.log('Documents actuels:', form.documents)

  if (isDocumentsValid.value) {
    await submitRegistration()
  } else {
    errorMessage.value = 'Veuillez uploader tous les documents requis avant de continuer.'
  }
}



const validatePassword = () => {
  const password = form.password
  let strength = 0

  if (password.length >= 8) strength++
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++
  if (/\d/.test(password)) strength++
  if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength++

  passwordStrength.value = strength

  if (password.length < 8) {
    passwordError.value = 'Minimum 8 caractères requis'
  } else if (strength < 2) {
    passwordError.value = 'Mot de passe trop faible'
  } else {
    passwordError.value = ''
  }
}

const validatePasswordMatch = () => {
  if (!form.confirmPassword) {
    confirmPasswordError.value = ''
    return
  }

  if (form.password !== form.confirmPassword) {
    confirmPasswordError.value = 'Les mots de passe ne correspondent pas'
  } else {
    confirmPasswordError.value = ''
  }
}

const validatePrenom = () => {
  if (form.prenom.length < 2) {
    prenomError.value = 'Le prénom doit contenir au moins 2 caractères'
  } else {
    prenomError.value = ''
  }
}

const validateNomNaissance = () => {
  if (form.nomNaissance.length < 2) {
    nomNaissanceError.value = 'Le nom doit contenir au moins 2 caractères'
  } else {
    nomNaissanceError.value = ''
  }
}

const validateTelephone = () => {
  const phoneRegex = /^[\+]?[(]?[\d\s\-\(\)]{10,}$/
  if (!phoneRegex.test(form.telephone)) {
    telephoneError.value = 'Format de téléphone invalide'
  } else {
    telephoneError.value = ''
  }
}

const validateDateNaissance = () => {
  if (form.dateNaissance) {
    const birthDate = new Date(form.dateNaissance)
    const today = new Date()
    const age = today.getFullYear() - birthDate.getFullYear()

    if (age < 18) {
      dateNaissanceError.value = 'Vous devez avoir au moins 18 ans'
    } else {
      dateNaissanceError.value = ''
    }
  }
}

// Fonctions de nettoyage d'erreur
const clearEmailError = () => { emailError.value = '' }
const clearConfirmPasswordError = () => { confirmPasswordError.value = '' }

// Validations par étape
const isInitialFormValid = computed(() => {
  return form.email &&
      form.password &&
      form.confirmPassword &&
      form.password === form.confirmPassword &&
      form.password.length >= 8 &&
      passwordStrength.value >= 2 &&
      form.acceptCommunications &&
      form.riskAwareness &&
      form.acceptTerms &&
      !emailError.value &&
      !passwordError.value &&
      !confirmPasswordError.value
})

const isStep1PhysiqueValid = computed(() => {
  return form.civilite &&
      form.prenom && form.prenom.length >= 2 &&
      form.nomNaissance && form.nomNaissance.length >= 2 &&
      form.telephone &&
      form.dateNaissance &&
      form.paysNaissance &&
      form.nationalite &&
      form.villeNaissance &&
      form.codePostalNaissance &&
      form.profession &&
      form.situationFamiliale &&
      form.revenusAnnuels &&
      form.experienceInvestissement &&
      !prenomError.value &&
      !nomNaissanceError.value &&
      !telephoneError.value &&
      !dateNaissanceError.value
})

const isStep1MoraleValid = computed(() => {
  return form.raisonSociale &&
      form.formeJuridique &&
      form.siret &&
      form.codeNaf &&
      form.capitalSocial &&
      form.dateCreation &&
      form.adresseSiege &&
      form.representantCivilite &&
      form.representantQualite &&
      form.representantPrenom &&
      form.representantNom &&
      form.representantDateNaissance &&
      form.representantNationalite &&
      form.representantTelephone
})

const isStep2Valid = computed(() => {
  if (form.personType === 'physique') {
    return form.paysResidence &&
        form.adresse &&
        form.ville &&
        form.codePostal &&
        form.paysResidenceFiscale
  } else {
    return form.paysResidence &&
        form.adresse &&
        form.ville &&
        form.codePostal
  }
})


// Helpers pour indicateur de mot de passe
const getPasswordStrengthColor = () => {
  const colors = ['bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-green-500']
  return colors[passwordStrength.value - 1] || 'bg-gray-200'
}

const getPasswordStrengthTextColor = () => {
  const colors = ['text-red-600', 'text-orange-600', 'text-yellow-600', 'text-green-600']
  return colors[passwordStrength.value - 1] || 'text-gray-500'
}

const getPasswordStrengthText = () => {
  const texts = ['Très faible', 'Faible', 'Moyen', 'Fort']
  return texts[passwordStrength.value - 1] || 'Entrez un mot de passe'
}

// Méthodes de navigation entre étapes
const continueToPersonType = () => {
  if (isInitialFormValid.value) {
    errorMessage.value = ''
    successMessage.value = 'Première étape validée !'
    setTimeout(() => {
      successMessage.value = ''
      currentStep.value = 'personType'
    }, 1000)
  }
}

const backToInitial = () => {
  errorMessage.value = ''
  successMessage.value = ''
  currentStep.value = 'initial'
}

const continueToStep1 = () => {
  if (form.personType) {
    currentStep.value = 'step1'
  }
}

const backToPersonType = () => {
  currentStep.value = 'personType'
}

const continueToStep2 = () => {
  const isValid = form.personType === 'physique' ? isStep1PhysiqueValid.value : isStep1MoraleValid.value
  if (isValid) {
    currentStep.value = 'step2'
  }
}

const backToStep1 = () => {
  currentStep.value = 'step1'
}

const continueToStep3 = () => {
  if (isStep2Valid.value) {
    currentStep.value = 'step3'
  }
}

const backToStep2 = () => {
  currentStep.value = 'step2'
}


const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value
}

const handleRegister = async () => {
  continueToPersonType()
}

const submitRegistration = async () => {
  if (!isDocumentsValid.value) return

  isLoading.value = true
  errorMessage.value = ''
  successMessage.value = ''

  try {
    // Préparer les données selon le type de personne
    const userData = {
      email: form.email,
      password: form.password,
      personType: form.personType,
      acceptCommunications: form.acceptCommunications,
      riskAwareness: form.riskAwareness,
      acceptTerms: form.acceptTerms,
      status: 'pending', // Statut en attente de validation admin
      submittedAt: new Date().toISOString(),
      adminValidation: {
        status: 'pending',
        submittedAt: new Date().toISOString(),
        reviewedBy: null,
        reviewedAt: null,
        notes: ''
      }
    }

    if (form.personType === 'physique') {
      userData.name = `${form.prenom} ${form.nomNaissance}`
      userData.firstName = form.prenom
      userData.lastName = form.nomNaissance
      userData.civilite = form.civilite
      userData.nomUsage = form.nomUsage
      userData.telephone = form.telephone
      userData.dateNaissance = form.dateNaissance
      userData.paysNaissance = form.paysNaissance
      userData.nationalite = form.nationalite
      userData.villeNaissance = form.villeNaissance
      userData.codePostalNaissance = form.codePostalNaissance
      userData.profession = form.profession
      userData.situationFamiliale = form.situationFamiliale
      userData.revenusAnnuels = form.revenusAnnuels
      userData.experienceInvestissement = form.experienceInvestissement
      userData.paysResidenceFiscale = form.paysResidenceFiscale
    } else {
      userData.name = form.raisonSociale
      userData.firstName = form.representantPrenom
      userData.lastName = form.representantNom
      userData.raisonSociale = form.raisonSociale
      userData.formeJuridique = form.formeJuridique
      userData.siret = form.siret
      userData.codeNaf = form.codeNaf
      userData.capitalSocial = form.capitalSocial
      userData.dateCreation = form.dateCreation
      userData.adresseSiege = form.adresseSiege
      userData.chiffreAffaires = form.chiffreAffaires
      userData.effectifs = form.effectifs
      userData.representantCivilite = form.representantCivilite
      userData.representantQualite = form.representantQualite
      userData.representantPrenom = form.representantPrenom
      userData.representantNom = form.representantNom
      userData.representantDateNaissance = form.representantDateNaissance
      userData.representantNationalite = form.representantNationalite
      userData.representantTelephone = form.representantTelephone
    }

    // Adresse commune
    userData.paysResidence = form.paysResidence
    userData.adresse = form.adresse
    userData.ville = form.ville
    userData.codePostal = form.codePostal

    // Documents (noms des fichiers pour la validation admin)
    userData.documents = Object.keys(form.documents)
    userData.documentsDetails = Object.keys(form.documents).map(docType => ({
      type: docType,
      fileName: form.documents[docType]?.name || 'fichier_uploade',
      size: form.documents[docType]?.size || 0,
      uploadedAt: new Date().toISOString()
    }))

    const result = await authStore.register(userData)

    if (result.success) {
      // Envoyer une notification aux administrateurs
      await sendAdminNotification(userData)

      successMessage.value = result.message || 'Votre compte a été créé avec succès !'
      currentStep.value = 'final'
    } else {
      errorMessage.value = result.error || 'Une erreur est survenue lors de la création du compte'
      if (result.error.includes('email')) {
        currentStep.value = 'initial'
      }
    }
  } catch (error) {
    errorMessage.value = 'Une erreur inattendue est survenue. Veuillez réessayer.'
    console.error('Registration error:', error)
    currentStep.value = 'initial'
  } finally {
    isLoading.value = false
  }
}

// Fonction pour envoyer une notification aux admins
const sendAdminNotification = async (userData) => {
  try {
    // Simulation d'envoi de notification aux admins
    // En production, cela ferait appel à votre API backend
    const adminNotification = {
      type: 'new_registration',
      priority: 'medium',
      title: `Nouvelle inscription : ${userData.name}`,
      message: `Une nouvelle inscription ${userData.personType === 'physique' ? 'particulier' : 'entreprise'} nécessite votre validation.`,
      data: {
        userId: userData.email, // Identifiant temporaire
        userType: userData.personType,
        name: userData.name,
        email: userData.email,
        submittedAt: userData.submittedAt,
        documentsCount: userData.documents.length,
        requiresReview: true
      },
      createdAt: new Date().toISOString()
    }

    // Stocker temporairement en localStorage pour simulation
    const existingNotifications = JSON.parse(localStorage.getItem('adminNotifications') || '[]')
    existingNotifications.push(adminNotification)
    localStorage.setItem('adminNotifications', JSON.stringify(existingNotifications))

    console.log('Notification admin envoyée:', adminNotification)
  } catch (error) {
    console.error('Erreur envoi notification admin:', error)
  }
}

const redirectToDashboard = async () => {
  try {
    // S'assurer que l'utilisateur est bien connecté
    if (!authStore.isAuthenticated) {
      console.log('Utilisateur non authentifié, redirection vers login')
      await navigateTo('/auth/login')
      return
    }

    // Marquer le rafraîchissement de page et naviguer vers dashboard
    markPageRefresh()

    // Ajouter un paramètre pour indiquer que c'est un nouvel utilisateur
    await navigateTo('/dashboard?new=true')
  } catch (error) {
    console.error('Erreur lors de la redirection:', error)
    // Fallback : redirection simple
    await navigateTo('/dashboard')
  }
}


// Redirect si déjà connecté
onMounted(() => {
  if (authStore.isAuthenticated) {
    navigateTo('/dashboard')
  }
})

// Nettoyage des erreurs lors du changement d'étape
watch(currentStep, () => {
  if (currentStep.value !== 'initial') {
    errorMessage.value = ''
    successMessage.value = ''
  }
})
</script>

<style scoped>
/* Transitions pour les alerts */
.alert-enter-active,
.alert-leave-active {
  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.alert-enter-from {
  opacity: 0;
  transform: translateY(-20px) scale(0.95);
}

.alert-leave-to {
  opacity: 0;
  transform: translateY(-10px) scale(0.98);
}

/* Styles pour les input radio cachés */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

/* Style pour le background gradient text */
.bg-clip-text {
  -webkit-background-clip: text;
  background-clip: text;
}

/* Améliorations des inputs */
.form-input:focus {
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

/* Animation pour les étapes */
.step-transition-enter-active,
.step-transition-leave-active {
  transition: all 0.3s ease;
}

.step-transition-enter-from {
  opacity: 0;
  transform: translateX(30px);
}

.step-transition-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}
</style>