// js/auth.js

document.addEventListener('DOMContentLoaded', function() {
    // Éléments du formulaire de connexion
    const loginForm = document.getElementById('loginForm');
    const loginEmail = document.getElementById('loginEmail');
    const loginPassword = document.getElementById('loginPassword');
    const toggleLoginPassword = document.getElementById('toggleLoginPassword');
    const rememberMe = document.getElementById('rememberMe');

    // Toggle pour afficher/masquer le mot de passe
    if (toggleLoginPassword && loginPassword) {
        toggleLoginPassword.addEventListener('click', function() {
            const type = loginPassword.getAttribute('type') === 'password' ? 'text' : 'password';
            loginPassword.setAttribute('type', type);

            const icon = this.querySelector('i');
            icon.classList.toggle('fa-eye');
            icon.classList.toggle('fa-eye-slash');
        });
    }

    // Gestion du formulaire de connexion
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const email = loginEmail.value.trim();
            const password = loginPassword.value;

            // Validation basique
            if (!email || !password) {
                showAlert('Veuillez remplir tous les champs.', 'danger');
                return;
            }

            if (!isValidEmail(email)) {
                showAlert('Veuillez entrer une adresse email valide.', 'danger');
                return;
            }

            // Simulation de la connexion
            loginUser(email, password);
        });
    }

    // Fonction de validation d'email
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Fonction de connexion simulée
    function loginUser(email, password) {
        // Affichage d'un spinner de chargement
        const submitBtn = loginForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Connexion...';
        submitBtn.disabled = true;

        // Simulation d'une requête API
        setTimeout(() => {
            // Simulation : vérification des credentials
            const validCredentials = checkCredentials(email, password);

            if (validCredentials) {
                // Succès de la connexion
                showAlert('Connexion réussie ! Redirection...', 'success');

                // Sauvegarde de la session si "Se souvenir de moi" est coché
                if (rememberMe && rememberMe.checked) {
                    localStorage.setItem('rememberUser', 'true');
                    localStorage.setItem('userEmail', email);
                }

                // Sauvegarde de la session utilisateur
                sessionStorage.setItem('isLoggedIn', 'true');
                sessionStorage.setItem('userEmail', email);
                sessionStorage.setItem('userName', extractNameFromEmail(email));

                // Redirection vers le tableau de bord après 2 secondes
                setTimeout(() => {
                    window.location.href = 'dashboard.html'; // ou index.html
                }, 2000);

            } else {
                // Échec de la connexion
                showAlert('Email ou mot de passe incorrect.', 'danger');
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }
        }, 1500); // Simulation de 1.5 secondes de traitement
    }

    // Fonction de vérification des credentials (simulation)
    function checkCredentials(email, password) {
        // Simulation : comptes de test
        const testAccounts = [
            { email: 'test@investfuture.com', password: 'Test123!' },
            { email: 'demo@investfuture.com', password: 'Demo123!' },
            { email: 'admin@investfuture.com', password: 'Admin123!' }
        ];

        return testAccounts.some(account =>
            account.email === email && account.password === password
        );
    }

    // Fonction pour extraire un nom à partir de l'email
    function extractNameFromEmail(email) {
        const name = email.split('@')[0];
        return name.charAt(0).toUpperCase() + name.slice(1);
    }

    // Fonction pour afficher les alertes
    function showAlert(message, type = 'info') {
        // Supprimer les anciennes alertes
        const existingAlert = document.querySelector('.alert-notification');
        if (existingAlert) {
            existingAlert.remove();
        }

        // Créer une nouvelle alerte
        const alertDiv = document.createElement('div');
        alertDiv.className = `alert alert-${type} alert-dismissible fade show alert-notification`;
        alertDiv.style.position = 'fixed';
        alertDiv.style.top = '20px';
        alertDiv.style.right = '20px';
        alertDiv.style.zIndex = '9999';
        alertDiv.style.maxWidth = '400px';

        alertDiv.innerHTML = `
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;

        document.body.appendChild(alertDiv);

        // Auto-fermeture après 5 secondes
        setTimeout(() => {
            if (alertDiv && alertDiv.parentNode) {
                alertDiv.remove();
            }
        }, 5000);
    }

    // Vérification si l'utilisateur doit être reconnecté automatiquement
    if (localStorage.getItem('rememberUser') === 'true') {
        const savedEmail = localStorage.getItem('userEmail');
        if (savedEmail && loginEmail) {
            loginEmail.value = savedEmail;
            if (rememberMe) {
                rememberMe.checked = true;
            }
        }
    }

    // Gestion du lien "Mot de passe oublié"
    const forgotPasswordLink = document.querySelector('a[href="#"]:contains("Mot de passe oublié")');
    if (forgotPasswordLink) {
        forgotPasswordLink.addEventListener('click', function(e) {
            e.preventDefault();
            handleForgotPassword();
        });
    }

    // Fonction de récupération de mot de passe
    function handleForgotPassword() {
        const email = prompt('Veuillez entrer votre adresse email pour recevoir les instructions de réinitialisation :');

        if (email) {
            if (isValidEmail(email)) {
                showAlert('Instructions envoyées ! Vérifiez votre boîte email.', 'success');
            } else {
                showAlert('Veuillez entrer une adresse email valide.', 'danger');
            }
        }
    }

    // Fonction de déconnexion (pour l'index.html)
    window.logout = function() {
        // Supprimer toutes les données de session
        sessionStorage.clear();
        localStorage.removeItem('rememberUser');
        localStorage.removeItem('userEmail');

        // Afficher un message de confirmation
        showAlert('Déconnexion réussie !', 'success');

        // Redirection vers la page d'accueil
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1500);
    };

    // Vérification de l'état de connexion au chargement de la page
    function checkAuthStatus() {
        const isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';
        const authButtons = document.getElementById('authButtons');
        const userMenu = document.getElementById('userMenu');
        const userName = document.getElementById('userName');

        if (isLoggedIn && authButtons && userMenu) {
            // Utilisateur connecté : afficher le menu utilisateur
            authButtons.classList.add('d-none');
            userMenu.classList.remove('d-none');

            if (userName) {
                const savedUserName = sessionStorage.getItem('userName');
                userName.textContent = savedUserName || 'Utilisateur';
            }
        }
    }

    // Appeler la vérification du statut d'authentification
    checkAuthStatus();
});

// Utilisation d'un sélecteur personnalisé pour "contains"
jQuery.expr[':'].contains = function(a, i, m) {
    return jQuery(a).text().toUpperCase().indexOf(m[3].toUpperCase()) >= 0;
};

// Alternative sans jQuery pour le lien "Mot de passe oublié"
document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('a');
    links.forEach(link => {
        if (link.textContent.includes('Mot de passe oublié')) {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const email = prompt('Veuillez entrer votre adresse email pour recevoir les instructions de réinitialisation :');

                if (email) {
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (emailRegex.test(email)) {
                        // Simulation d'envoi d'email
                        const alertDiv = document.createElement('div');
                        alertDiv.className = 'alert alert-success alert-dismissible fade show';
                        alertDiv.style.position = 'fixed';
                        alertDiv.style.top = '20px';
                        alertDiv.style.right = '20px';
                        alertDiv.style.zIndex = '9999';
                        alertDiv.innerHTML = `
                            <i class="fas fa-check-circle me-2"></i>
                            Instructions envoyées ! Vérifiez votre boîte email.
                            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
                        `;
                        document.body.appendChild(alertDiv);

                        setTimeout(() => {
                            if (alertDiv && alertDiv.parentNode) {
                                alertDiv.remove();
                            }
                        }, 5000);
                    } else {
                        alert('Veuillez entrer une adresse email valide.');
                    }
                }
            });
        }
    });
});