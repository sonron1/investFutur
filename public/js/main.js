// Variables globales
let isLoggedIn = false;
let currentUser = null;
let selectedSector = null;

// Initialisation
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    setupEventListeners();
    AOS.init({
        duration: 800,
        once: true
    });
});

function initializeApp() {
    // Vérifier si l'utilisateur est connecté (simulation avec localStorage)
    const userData = localStorage.getItem('investFutureUser');
    if (userData) {
        currentUser = JSON.parse(userData);
        isLoggedIn = true;
        updateAuthUI();
    }
}

function setupEventListeners() {
    // Boutons d'investissement
    document.querySelectorAll('.invest-btn').forEach(btn => {
        btn.addEventListener('click', handleInvestClick);
    });

    // Formulaires d'authentification
    setupAuthForms();
}

function handleInvestClick(e) {
    const sector = e.target.getAttribute('data-sector');
    const name = e.target.getAttribute('data-name');
    selectedSector = sector;

    if (!isLoggedIn) {
        // Stocker le secteur sélectionné pour après la connexion
        localStorage.setItem('selectedSectorAfterLogin', sector);
        // Afficher le modal de connexion
        const loginModal = new bootstrap.Modal(document.getElementById('loginModal'));
        loginModal.show();
    } else {
        // Utilisateur connecté, ouvrir directement la page d'investissement
        openInvestmentModal(sector);
    }
}

function openInvestmentModal(sectorKey) {
    const sectorData = investmentData[sectorKey];
    if (!sectorData) return;

    document.getElementById('investmentSectorName').textContent = sectorData.name;
    document.getElementById('investmentContent').innerHTML = generateInvestmentContent(sectorData);

    const investmentModal = new bootstrap.Modal(document.getElementById('investmentModal'));
    investmentModal.show();
}

function generateInvestmentContent(data) {
    const availablePaymentMethods = data.paymentMethods.map(method => paymentMethods[method]);

    return `
        <div class="container-fluid p-4">
            <div class="row">
                <!-- Informations secteur -->
                <div class="col-lg-6 mb-4">
                    <div class="investment-hero mb-4">
                        <img src="${data.image}" alt="${data.name}" class="img-fluid rounded mb-3" style="height: 200px; width: 100%; object-fit: cover;">
                        <h3 class="text-primary mb-3">${data.name}</h3>
                        <p class="lead">${data.description}</p>
                    </div>

                    <div class="investment-highlights mb-4">
                        <h5 class="mb-3"><i class="fas fa-star text-warning me-2"></i>Points clés</h5>
                        <ul class="list-unstyled">
                            ${data.highlights.map(highlight => `
                                <li class="mb-2">
                                    <i class="fas fa-check-circle text-success me-2"></i>
                                    ${highlight}
                                </li>
                            `).join('')}
                        </ul>
                    </div>

                    <div class="investment-stats">
                        <div class="row g-3">
                            <div class="col-6">
                                <div class="stat-card text-center p-3 bg-light rounded">
                                    <h4 class="text-success mb-1">${data.roi}</h4>
                                    <small class="text-muted">ROI moyen</small>
                                </div>
                            </div>
                            <div class="col-6">
                                <div class="stat-card text-center p-3 bg-light rounded">
                                    <h4 class="text-primary mb-1">${data.projetsCount}</h4>
                                    <small class="text-muted">Projets</small>
                                </div>
                            </div>
                            <div class="col-6">
                                <div class="stat-card text-center p-3 bg-light rounded">
                                    <h4 class="text-info mb-1">${formatNumber(data.minInvestment)}€</h4>
                                    <small class="text-muted">Minimum</small>
                                </div>
                            </div>
                            <div class="col-6">
                                <div class="stat-card text-center p-3 bg-light rounded">
                                    <h4 class="text-warning mb-1">A+</h4>
                                    <small class="text-muted">Rating</small>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Projets disponibles -->
                <div class="col-lg-6">
                    <h5 class="mb-3"><i class="fas fa-chart-line text-primary me-2"></i>Projets disponibles</h5>
                    <div class="projects-list mb-4">
                        ${data.projects.map(project => `
                            <div class="project-card mb-3 p-3 border rounded">
                                <div class="d-flex justify-content-between align-items-start mb-2">
                                    <h6 class="mb-1">${project.name}</h6>
                                    <span class="badge bg-success">${project.investors} investisseurs</span>
                                </div>
                                <p class="text-muted small mb-2">${project.description}</p>
                                <div class="progress mb-2" style="height: 8px;">
                                    <div class="progress-bar bg-primary" style="width: ${(parseFloat(project.raised.replace('M€', '')) / parseFloat(project.target.replace('M€', ''))) * 100}%"></div>
                                </div>
                                <div class="d-flex justify-content-between align-items-center">
                                    <small class="text-muted">${project.raised} levés sur ${project.target}</small>
                                    <button class="btn btn-outline-primary btn-sm invest-project-btn" 
                                            data-project="${project.name}" 
                                            data-min="${project.minInvest}">
                                        Investir (min. ${formatNumber(project.minInvest)}€)
                                    </button>
                                </div>
                            </div>
                        `).join('')}
                    </div>

                    <!-- Formulaire d'investissement -->
                    <div class="investment-form">
                        <h5 class="mb-3"><i class="fas fa-euro-sign text-success me-2"></i>Investir maintenant</h5>
                        <form id="investmentForm">
                            <div class="mb-3">
                                <label for="investmentAmount" class="form-label">Montant d'investissement *</label>
                                <div class="input-group">
                                    <input type="number" class="form-control" id="investmentAmountInput" 
                                           min="${data.minInvestment}" step="500" placeholder="${data.minInvestment}" required>
                                    <span class="input-group-text">€</span>
                                </div>
                                <small class="text-muted">Minimum: ${formatNumber(data.minInvestment)}€</small>
                            </div>

                            <div class="mb-3">
                                <label class="form-label">Projet sélectionné</label>
                                <select class="form-select" id="selectedProject" required>
                                    <option value="">Choisir un projet...</option>
                                    ${data.projects.map(project => `
                                        <option value="${project.name}" data-min="${project.minInvest}">
                                            ${project.name} (min. ${formatNumber(project.minInvest)}€)
                                        </option>
                                    `).join('')}
                                </select>
                            </div>

                            <div class="mb-4">
                                <label class="form-label">Méthode de paiement *</label>
                                <div class="payment-methods">
                                    ${availablePaymentMethods.map(method => `
                                        <div class="payment-method mb-2 p-3 border rounded">
                                            <div class="form-check">
                                                <input class="form-check-input" type="radio" name="paymentMethod" 
                                                       id="payment-${method.name.toLowerCase().replace(/\s+/g, '-')}" 
                                                       value="${method.name}" required>
                                                <label class="form-check-label d-flex align-items-center" 
                                                       for="payment-${method.name.toLowerCase().replace(/\s+/g, '-')}">
                                                    <i class="${method.icon} text-primary me-3" style="width: 20px;"></i>
                                                    <div class="flex-grow-1">
                                                        <div class="fw-semibold">${method.name}</div>
                                                        <small class="text-muted">${method.description}</small>
                                                        <div class="d-flex justify-content-between mt-1">
                                                            <small class="text-success">Frais: ${method.fees}</small>
                                                            <small class="text-info">${method.processing}</small>
                                                        </div>
                                                    </div>
                                                </label>
                                            </div>
                                        </div>
                                    `).join('')}
                                </div>
                            </div>

                            <div class="investment-summary p-3 bg-light rounded mb-3">
                                <h6 class="mb-2">Résumé de votre investissement</h6>
                                <div class="d-flex justify-content-between">
                                    <span>Secteur:</span>
                                    <span class="fw-semibold">${data.name}</span>
                                </div>
                                <div class="d-flex justify-content-between">
                                    <span>ROI estimé:</span>
                                    <span class="text-success fw-semibold">${data.roi}</span>
                                </div>
                                <div class="d-flex justify-content-between">
                                    <span>Montant:</span>
                                    <span class="fw-semibold" id="summaryAmount">0€</span>
                                </div>
                                <div class="d-flex justify-content-between">
                                    <span>Frais:</span>
                                    <span id="summaryFees">-</span>
                                </div>
                                <hr>
                                <div class="d-flex justify-content-between fw-bold">
                                    <span>Total à payer:</span>
                                    <span id="summaryTotal">0€</span>
                                </div>
                            </div>

                            <div class="form-check mb-3">
                                <input class="form-check-input" type="checkbox" id="investmentTerms" required>
                                <label class="form-check-label" for="investmentTerms">
                                    J'ai lu et j'accepte les <a href="#" class="text-primary">conditions d'investissement</a> 
                                    et je comprends les risques associés *
                                </label>
                            </div>

                            <button type="submit" class="btn btn-success w-100 btn-lg">
                                <i class="fas fa-rocket me-2"></i>Confirmer l'investissement
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function setupAuthForms() {
    // Gestion de l'inscription multi-étapes
    let currentStep = 1;
    const totalSteps = 3;

    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');
    const submitBtn = document.getElementById('submitBtn');

    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            if (validateStep(currentStep)) {
                currentStep++;
                updateStep();
            }
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            currentStep--;
            updateStep();
        });
    }

    function updateStep() {
        // Masquer toutes les étapes
        document.querySelectorAll('.registration-step').forEach(step => {
            step.classList.add('d-none');
        });

        // Afficher l'étape actuelle
        const currentStepElement = document.getElementById(`step${currentStep}`);
        if (currentStepElement) {
            currentStepElement.classList.remove('d-none');
        }

        // Mettre à jour les indicateurs
        document.querySelectorAll('.step-indicator').forEach((indicator, index) => {
            if (index + 1 <= currentStep) {
                indicator.classList.add('active');
            } else {
                indicator.classList.remove('active');
            }
        });

        // Gérer les boutons
        prevBtn.style.display = currentStep === 1 ? 'none' : 'inline-block';

        if (currentStep === totalSteps) {
            nextBtn.classList.add('d-none');
            submitBtn.classList.remove('d-none');
        } else {
            nextBtn.classList.remove('d-none');
            submitBtn.classList.add('d-none');
        }
    }

    function validateStep(step) {
        let isValid = true;
        const currentStepElement = document.getElementById(`step${step}`);
        if (!currentStepElement) return false;

        const requiredFields = currentStepElement.querySelectorAll('[required]');

        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                field.classList.add('is-invalid');
                isValid = false;
            } else {
                field.classList.remove('is-invalid');
            }
        });

        // Validation spécifique pour l'étape 1
        if (step === 1) {
            const password = document.getElementById('registerPassword');
            const confirmPassword = document.getElementById('confirmPassword');

            if (password && confirmPassword && password.value !== confirmPassword.value) {
                confirmPassword.classList.add('is-invalid');
                isValid = false;
            }
        }

        // Validation spécifique pour l'étape 2
        if (step === 2) {
            const checkboxes = currentStepElement.querySelectorAll('input[type="checkbox"]');
            const checkedBoxes = Array.from(checkboxes).filter(cb => cb.checked);

            if (checkedBoxes.length === 0) {
                alert('Veuillez sélectionner au moins un secteur d\'intérêt.');
                isValid = false;
            }
        }

        return isValid;
    }

    // Toggle password visibility
    const toggleLoginPassword = document.getElementById('toggleLoginPassword');
    if (toggleLoginPassword) {
        toggleLoginPassword.addEventListener('click', function() {
            const password = document.getElementById('loginPassword');
            const icon = this.querySelector('i');

            if (password.type === 'password') {
                password.type = 'text';
                icon.classList.remove('fa-eye');
                icon.classList.add('fa-eye-slash');
            } else {
                password.type = 'password';
                icon.classList.remove('fa-eye-slash');
                icon.classList.add('fa-eye');
            }
        });
    }

    const toggleRegisterPassword = document.getElementById('toggleRegisterPassword');
    if (toggleRegisterPassword) {
        toggleRegisterPassword.addEventListener('click', function() {
            const password = document.getElementById('registerPassword');
            const icon = this.querySelector('i');

            if (password.type === 'password') {
                password.type = 'text';
                icon.classList.remove('fa-eye');
                icon.classList.add('fa-eye-slash');
            } else {
                password.type = 'password';
                icon.classList.remove('fa-eye-slash');
                icon.classList.add('fa-eye');
            }
        });
    }

    // Gestion de la soumission des formulaires
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleLogin();
        });
    }

    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            if (validateStep(3)) {
                handleRegister();
            }
        });
    }
}

function handleLogin() {
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    // Simulation de connexion
    const userData = {
        email: email,
        name: email.split('@')[0],
        firstName: 'John',
        lastName: 'Doe'
    };

    localStorage.setItem('investFutureUser', JSON.stringify(userData));
    currentUser = userData;
    isLoggedIn = true;

    updateAuthUI();
    bootstrap.Modal.getInstance(document.getElementById('loginModal')).hide();

    // Vérifier si l'utilisateur avait sélectionné un secteur avant de se connecter
    const selectedSectorAfterLogin = localStorage.getItem('selectedSectorAfterLogin');
    if (selectedSectorAfterLogin) {
        localStorage.removeItem('selectedSectorAfterLogin');
        setTimeout(() => {
            openInvestmentModal(selectedSectorAfterLogin);
        }, 500);
    }

    showNotification('Connexion réussie !', 'success');
}

function handleRegister() {
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const email = document.getElementById('registerEmail').value;

    // Simulation d'inscription
    const userData = {
        email: email,
        name: `${firstName} ${lastName}`,
        firstName: firstName,
        lastName: lastName
    };

    localStorage.setItem('investFutureUser', JSON.stringify(userData));
    currentUser = userData;
    isLoggedIn = true;

    updateAuthUI();
    bootstrap.Modal.getInstance(document.getElementById('registerModal')).hide();

    showNotification('Inscription réussie ! Bienvenue sur InvestFuture !', 'success');
}

function updateAuthUI() {
    const authButtons = document.getElementById('authButtons');
    const userMenu = document.getElementById('userMenu');
    const userName = document.getElementById('userName');

    if (isLoggedIn && currentUser) {
        authButtons.classList.add('d-none');
        userMenu.classList.remove('d-none');
        userName.textContent = currentUser.name;
    } else {
        authButtons.classList.remove('d-none');
        userMenu.classList.add('d-none');
    }
}

function logout() {
    localStorage.removeItem('investFutureUser');
    currentUser = null;
    isLoggedIn = false;
    updateAuthUI();
    showNotification('Déconnexion réussie', 'info');
}

function formatNumber(num) {
    return new Intl.NumberFormat('fr-FR').format(num);
}

function showNotification(message, type = 'info') {
    // Créer une notification toast
    const toastContainer = document.getElementById('toastContainer') || createToastContainer();

    const toast = document.createElement('div');
    toast.className = `toast align-items-center text-white bg-${type === 'success' ? 'success' : type === 'error' ? 'danger' : 'info'} border-0`;
    toast.setAttribute('role', 'alert');
    toast.setAttribute('aria-live', 'assertive');
    toast.setAttribute('aria-atomic', 'true');

    toast.innerHTML = `
        <div class="d-flex">
            <div class="toast-body">
                ${message}
            </div>
            <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
        </div>
    `;

    toastContainer.appendChild(toast);
    const bsToast = new bootstrap.Toast(toast);
    bsToast.show();

    // Supprimer le toast après fermeture
    toast.addEventListener('hidden.bs.toast', () => {
        toast.remove();
    });
}

function createToastContainer() {
    const container = document.createElement('div');
    container.id = 'toastContainer';
    container.className = 'toast-container position-fixed top-0 end-0 p-3';
    container.style.zIndex = '9999';
    document.body.appendChild(container);
    return container;
}

// Gestion des événements délégués pour les éléments créés dynamiquement
document.addEventListener('click', function(e) {
    // Boutons d'investissement dans les projets
    if (e.target.classList.contains('invest-project-btn')) {
        const projectName = e.target.getAttribute('data-project');
        const minAmount = e.target.getAttribute('data-min');

        document.getElementById('selectedProject').value = projectName;
        document.getElementById('investmentAmountInput').value = minAmount;
        document.getElementById('investmentAmountInput').min = minAmount;

        updateInvestmentSummary();
    }
});

// Mise à jour du résumé d'investissement
document.addEventListener('input', function(e) {
    if (e.target.id === 'investmentAmountInput') {
        updateInvestmentSummary();
    }
});

document.addEventListener('change', function(e) {
    if (e.target.name === 'paymentMethod') {
        updateInvestmentSummary();
    }
});

function updateInvestmentSummary() {
    const amountInput = document.getElementById('investmentAmountInput');
    const paymentMethodInputs = document.querySelectorAll('input[name="paymentMethod"]');

    if (!amountInput) return;

    const amount = parseFloat(amountInput.value) || 0;
    let selectedPaymentMethod = null;

    paymentMethodInputs.forEach(input => {
        if (input.checked) {
            selectedPaymentMethod = input.value;
        }
    });

    // Calculer les frais
    let fees = 0;
    let feesText = '-';

    if (selectedPaymentMethod && amount > 0) {
        const method = Object.values(paymentMethods).find(m => m.name === selectedPaymentMethod);
        if (method) {
            if (method.fees.includes('%')) {
                const percentage = parseFloat(method.fees.match(/[\d.]+/)[0]);
                const fixedFee = method.fees.match(/[\d.]+€/) ? parseFloat(method.fees.match(/[\d.]+€/)[0]) : 0;
                fees = (amount * percentage / 100) + fixedFee;
            } else if (method.fees === 'Gratuit') {
                fees = 0;
            }
            feesText = fees > 0 ? `${fees.toFixed(2)}€` : 'Gratuit';
        }
    }

    const total = amount + fees;

    // Mettre à jour l'affichage
    const summaryAmount = document.getElementById('summaryAmount');
    const summaryFees = document.getElementById('summaryFees');
    const summaryTotal = document.getElementById('summaryTotal');

    if (summaryAmount) summaryAmount.textContent = `${formatNumber(amount)}€`;
    if (summaryFees) summaryFees.textContent = feesText;
    if (summaryTotal) summaryTotal.textContent = `${formatNumber(total)}€`;
}

// Gestion de soumission du formulaire d'investissement
document.addEventListener('submit', function(e) {
    if (e.target.id === 'investmentForm') {
        e.preventDefault();
        handleInvestmentSubmission();
    }
});

function handleInvestmentSubmission() {
    const amount = document.getElementById('investmentAmountInput').value;
    const project = document.getElementById('selectedProject').value;
    const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked');

    if (!amount || !project || !paymentMethod) {
        showNotification('Veuillez remplir tous les champs obligatoires', 'error');
        return;
    }

    // Simulation de traitement d'investissement
    showNotification('Investissement en cours de traitement...', 'info');

    setTimeout(() => {
        bootstrap.Modal.getInstance(document.getElementById('investmentModal')).hide();
        showNotification(`Investissement de ${formatNumber(amount)}€ confirmé dans ${project} !`, 'success');
    }, 2000);
}