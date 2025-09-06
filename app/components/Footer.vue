<template>
  <footer class="bg-gray-900 text-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
        <!-- Branding -->
        <div class="lg:col-span-2">
          <div class="flex items-center space-x-2 mb-4">
            <i class="fas fa-chart-line text-blue-400 text-2xl"></i>
            <h4 class="text-2xl font-bold brand-name">InvestFuture</h4>
          </div>
          <p class="text-gray-300 mb-6 leading-relaxed">
            Votre partenaire de confiance pour investir dans l'innovation et construire l'avenir.
          </p>
          <div class="flex space-x-4">
            <a href="#" class="w-10 h-10 bg-gray-800 hover:bg-blue-600 rounded-full flex items-center justify-center transition-colors">
              <i class="fab fa-facebook-f"></i>
            </a>
            <a href="#" class="w-10 h-10 bg-gray-800 hover:bg-blue-400 rounded-full flex items-center justify-center transition-colors">
              <i class="fab fa-twitter"></i>
            </a>
            <a href="#" class="w-10 h-10 bg-gray-800 hover:bg-blue-600 rounded-full flex items-center justify-center transition-colors">
              <i class="fab fa-linkedin-in"></i>
            </a>
            <a href="#" class="w-10 h-10 bg-gray-800 hover:bg-pink-600 rounded-full flex items-center justify-center transition-colors">
              <i class="fab fa-instagram"></i>
            </a>
          </div>
        </div>

        <!-- Navigation -->
        <div>
          <h5 class="text-lg font-semibold mb-4">Navigation</h5>
          <ul class="space-y-2">
            <li><a href="#home" class="text-gray-300 hover:text-blue-400 transition-colors">Accueil</a></li>
            <li><a href="#domaines" class="text-gray-300 hover:text-blue-400 transition-colors">Secteurs</a></li>
            <li><a href="#comment" class="text-gray-300 hover:text-blue-400 transition-colors">Comment ça marche</a></li>
            <li><a href="#contact" class="text-gray-300 hover:text-blue-400 transition-colors">Contact</a></li>
          </ul>
        </div>

        <!-- Investissement -->
        <div>
          <h5 class="text-lg font-semibold mb-4">Investir</h5>
          <ul class="space-y-2">
            <li><a href="#" class="text-gray-300 hover:text-blue-400 transition-colors">Technologies Vertes</a></li>
            <li><a href="#" class="text-gray-300 hover:text-blue-400 transition-colors">Biotechnologies</a></li>
            <li><a href="#" class="text-gray-300 hover:text-blue-400 transition-colors">Fintech</a></li>
            <li><a href="#" class="text-gray-300 hover:text-blue-400 transition-colors">IA</a></li>
          </ul>
        </div>

        <!-- Support -->
        <div>
          <h5 class="text-lg font-semibold mb-4">Support</h5>
          <ul class="space-y-2">
            <li><a href="#" class="text-gray-300 hover:text-blue-400 transition-colors">Centre d'aide</a></li>
            <li><a href="#" class="text-gray-300 hover:text-blue-400 transition-colors">FAQ</a></li>
            <li><NuxtLink to="/auth/login" class="text-gray-300 hover:text-blue-400 transition-colors">Connexion</NuxtLink></li>
            <li><NuxtLink to="/auth/register" class="text-gray-300 hover:text-blue-400 transition-colors">S'inscrire</NuxtLink></li>
          </ul>
        </div>
      </div>

      <div class="border-t border-gray-800 pt-8 mt-8">
        <div class="flex flex-col md:flex-row justify-between items-center">
          <p class="text-gray-400 text-sm">
            &copy; {{ currentYear }} InvestFuture. Tous droits réservés.
          </p>
          <p class="text-gray-400 text-sm mt-2 md:mt-0">
            <i class="fas fa-shield-alt mr-2"></i>
            Investissements sécurisés et régulés
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
const currentYear = new Date().getFullYear()
</script>