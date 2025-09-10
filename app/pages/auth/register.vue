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
                  <a href="#" class="text-blue-600 hover:text-blue-500 underline">conditions générales d'utilisation</a>
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

        <!-- Étape 1/5 - Informations personnelles -->
        <div v-show="currentStep === 'step1'" class="bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
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
                <p v-if="!telephoneError" class="mt-2 text-sm text-gray-500">
                  Votre numéro sera utile pour signer vos futurs investissements en ligne.
                </p>
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
                    <option value="FR">France</option>
                    <option value="BE">Belgique</option>
                    <option value="CH">Suisse</option>
                    <option value="CA">Canada</option>
                    <option value="US">États-Unis</option>
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
                    <option value="FR">Française</option>
                    <option value="BE">Belge</option>
                    <option value="CH">Suisse</option>
                    <option value="CA">Canadienne</option>
                    <option value="US">Américaine</option>
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
                <label for="codePostalNaissance" class="block text-sm font-semibold text-gray-700 mb-2">Code postal *</label>
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
                :disabled="!isStep1Valid"
                class="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white rounded-xl font-semibold transition-all disabled:cursor-not-allowed"
            >
              Continuer
              <i class="fas fa-arrow-right ml-2"></i>
            </button>
          </div>
        </div>

        <!-- Étape 2/5 - Adresse -->
        <div v-show="currentStep === 'step2'" class="bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
          <div class="mb-8">
            <!-- Barre de progression -->
            <div class="w-full bg-gray-200 rounded-full h-2 mb-4">
              <div class="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300" style="width: 40%"></div>
            </div>

            <div class="text-center">
              <span class="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full mb-2">
                Étape 2/5 - Informations personnelles
              </span>
              <h4 class="text-2xl font-bold text-gray-900 mb-4">Quelle est votre adresse ?</h4>
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
                <option value="FR">France</option>
                <option value="BE">Belgique</option>
                <option value="CH">Suisse</option>
                <option value="CA">Canada</option>
                <option value="US">États-Unis</option>
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

            <div>
              <label for="paysResidenceFiscale" class="block text-sm font-semibold text-gray-700 mb-2">Pays de résidence fiscale *</label>
              <select
                  id="paysResidenceFiscale"
                  v-model="form.paysResidenceFiscale"
                  required
                  class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              >
                <option value="">Sélectionnez un pays</option>
                <option value="FR">France</option>
                <option value="BE">Belgique</option>
                <option value="CH">Suisse</option>
                <option value="CA">Canada</option>
                <option value="US">États-Unis</option>
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
                @click="continueToFinal"
                :disabled="!isStep2Valid"
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
            <p class="text-gray-600 mb-8">Votre compte a été créé avec succès</p>

            <div class="bg-green-50 border border-green-200 rounded-xl p-6 mb-8">
              <div class="flex items-start justify-center">
                <i class="fas fa-info-circle text-green-600 mr-3 mt-1"></i>
                <div class="text-left">
                  <p class="font-semibold text-green-800">Bienvenue chez InvestFuture !</p>
                  <p class="text-green-700 text-sm mt-1">
                    Vous pouvez maintenant accéder à votre tableau de bord et découvrir nos opportunités d'investissement.
                  </p>
                </div>
              </div>
            </div>

            <button
                type="button"
                @click="redirectToDashboard"
                class="inline-flex items-center px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-xl font-semibold transition-all transform hover:scale-105"
            >
              <i class="fas fa-tachometer-alt mr-3"></i>
              Accéder à mon tableau de bord
            </button>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from '~/stores/auth'
import { usePageRefresh } from '~/composables/usePageRefresh'

useSeoMeta({
  title: 'Inscription - InvestFuture',
  description: 'Créez votre compte InvestFuture et commencez à investir dans l\'innovation'
})

const authStore = useAuthStore()
const { markPageForRefresh } = usePageRefresh()

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

// Données du formulaire
const form = reactive({
  email: '',
  password: '',
  confirmPassword: '',
  acceptCommunications: false,
  riskAwareness: false,
  acceptTerms: false,
  personType: '',
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
  paysResidence: '',
  adresse: '',
  ville: '',
  codePostal: '',
  paysResidenceFiscale: ''
})

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

  // Vérifier si l'email existe déjà
  const exists = await authStore.checkEmailExists(form.email)
  if (exists) {
    emailError.value = 'Cet email est déjà utilisé'
  } else {
    emailError.value = ''
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

const isStep1Valid = computed(() => {
  return form.civilite &&
      form.prenom && form.prenom.length >= 2 &&
      form.nomNaissance && form.nomNaissance.length >= 2 &&
      form.telephone &&
      form.dateNaissance &&
      form.paysNaissance &&
      form.nationalite &&
      form.villeNaissance &&
      form.codePostalNaissance &&
      !prenomError.value &&
      !nomNaissanceError.value &&
      !telephoneError.value &&
      !dateNaissanceError.value
})

const isStep2Valid = computed(() => {
  return form.paysResidence &&
      form.adresse &&
      form.ville &&
      form.codePostal &&
      form.paysResidenceFiscale
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
  if (isStep1Valid.value) {
    currentStep.value = 'step2'
  }
}

const backToStep1 = () => {
  currentStep.value = 'step1'
}

const continueToFinal = () => {
  if (isStep2Valid.value) {
    submitRegistration()
  }
}

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value
}

const handleRegister = async () => {
  continueToPersonType()
}

const submitRegistration = async () => {
  if (!isStep2Valid.value) return

  isLoading.value = true
  errorMessage.value = ''
  successMessage.value = ''

  try {
    const result = await authStore.register({
      name: `${form.prenom} ${form.nomNaissance}`,
      email: form.email,
      password: form.password,
      firstName: form.prenom,
      lastName: form.nomNaissance,
      personType: form.personType,
      civilite: form.civilite,
      nomUsage: form.nomUsage,
      telephone: form.telephone,
      dateNaissance: form.dateNaissance,
      paysNaissance: form.paysNaissance,
      nationalite: form.nationalite,
      villeNaissance: form.villeNaissance,
      codePostalNaissance: form.codePostalNaissance,
      adresse: form.adresse,
      ville: form.ville,
      codePostal: form.codePostal,
      paysResidence: form.paysResidence,
      paysResidenceFiscale: form.paysResidenceFiscale
    })

    if (result.success) {
      successMessage.value = result.message || 'Votre compte a été créé avec succès !'
      currentStep.value = 'final'
    } else {
      errorMessage.value = result.error || 'Une erreur est survenue lors de la création du compte'
      // Retour à l'étape appropriée selon le type d'erreur
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

const redirectToDashboard = () => {
  markPageForRefresh()
  navigateTo('/dashboard')
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