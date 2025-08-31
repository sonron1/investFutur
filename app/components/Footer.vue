<template>
  <footer class="footer bg-dark text-white py-5">
    <div class="container">
      <div class="row g-4">
        <div class="col-lg-4">
          <div class="footer-brand mb-4">
            <div class="d-flex align-items-center mb-3">
              <i class="fas fa-chart-line text-primary me-2 fa-2x"></i>
              <h4 class="brand-name mb-0">InvestFuture</h4>
            </div>
            <p class="text-muted">
              Votre partenaire de confiance pour investir dans l'innovation et construire l'avenir.
            </p>
            <div class="social-links">
              <a href="#" class="social-link me-3">
                <i class="fab fa-facebook-f"></i>
              </a>
              <a href="#" class="social-link me-3">
                <i class="fab fa-twitter"></i>
              </a>
              <a href="#" class="social-link me-3">
                <i class="fab fa-linkedin-in"></i>
              </a>
              <a href="#" class="social-link">
                <i class="fab fa-instagram"></i>
              </a>
            </div>
          </div>
        </div>

        <div class="col-lg-2 col-md-3">
          <h5 class="mb-4">Navigation</h5>
          <ul class="list-unstyled">
            <li class="mb-2">
              <a href="#home" class="footer-link">Accueil</a>
            </li>
            <li class="mb-2">
              <a href="#domaines" class="footer-link">Secteurs</a>
            </li>
            <li class="mb-2">
              <a href="#comment" class="footer-link">Comment ça marche</a>
            </li>
            <li class="mb-2">
              <a href="#contact" class="footer-link">Contact</a>
            </li>
          </ul>
        </div>

        <div class="col-lg-2 col-md-3">
          <h5 class="mb-4">Investir</h5>
          <ul class="list-unstyled">
            <li class="mb-2">
              <a href="#" class="footer-link">Technologies Vertes</a>
            </li>
            <li class="mb-2">
              <a href="#" class="footer-link">Biotechnologies</a>
            </li>
            <li class="mb-2">
              <a href="#" class="footer-link">Fintech</a>
            </li>
            <li class="mb-2">
              <a href="#" class="footer-link">IA</a>
            </li>
          </ul>
        </div>

        <div class="col-lg-2 col-md-3">
          <h5 class="mb-4">Légal</h5>
          <ul class="list-unstyled">
            <li class="mb-2">
              <a href="#" class="footer-link">Mentions légales</a>
            </li>
            <li class="mb-2">
              <a href="#" class="footer-link">Politique de confidentialité</a>
            </li>
            <li class="mb-2">
              <a href="#" class="footer-link">CGU</a>
            </li>
            <li class="mb-2">
              <a href="#" class="footer-link">Cookies</a>
            </li>
          </ul>
        </div>

        <div class="col-lg-2 col-md-3">
          <h5 class="mb-4">Support</h5>
          <ul class="list-unstyled">
            <li class="mb-2">
              <a href="#" class="footer-link">Centre d'aide</a>
            </li>
            <li class="mb-2">
              <a href="#" class="footer-link">FAQ</a>
            </li>
            <li class="mb-2">
              <NuxtLink to="/auth/login" class="footer-link">Connexion</NuxtLink>
            </li>
            <li class="mb-2">
              <NuxtLink to="/auth/register" class="footer-link">S'inscrire</NuxtLink>
            </li>
          </ul>
        </div>
      </div>

      <hr class="my-4 border-secondary">

      <div class="row align-items-center">
        <div class="col-md-6">
          <p class="copyright mb-0">
            &copy; {{ currentYear }} InvestFuture. Tous droits réservés.
          </p>
        </div>
        <div class="col-md-6 text-end">
          <p class="mb-0 text-muted">
            <i class="fas fa-shield-alt me-2"></i>
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

<style scoped>
.footer-link {
  color: #adb5bd;
  text-decoration: none;
  transition: color 0.3s ease;
}

.footer-link:hover {
  color: #007bff;
}

.social-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: rgba(0, 123, 255, 0.1);
  color: #007bff;
  border-radius: 50%;
  text-decoration: none;
  transition: all 0.3s ease;
}

.social-link:hover {
  background: #007bff;
  color: white;
  transform: translateY(-2px);
}

.brand-name {
  background: linear-gradient(135deg, #007bff, #0056b3);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
</style>