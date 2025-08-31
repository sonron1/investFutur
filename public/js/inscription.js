// js/inscription.js

document.addEventListener('DOMContentLoaded', function() {
    let currentStep = 'initialRegistration';

    // Éléments DOM
    const steps = {
        initialRegistration: document.getElementById('initialRegistration'),
        personTypeSelection: document.getElementById('personTypeSelection'),
        personalInfoStep1: document.getElementById('personalInfoStep1'),
        personalInfoStep2: document.getElementById('personalInfoStep2'),
        personalInfoStep3: document.getElementById('personalInfoStep3'),
        personalInfoStep4: document.getElementById('personalInfoStep4'),
        personalInfoStep5: document.getElementById('personalInfoStep5'),
        personalInfoStep6: document.getElementById('personalInfoStep6'),
        personalInfoStep7: document.getElementById('personalInfoStep7')
    };

    // Boutons de navigation
    const continueToPersonTypeBtn = document.getElementById('continueToPersonType');
    const continueFromPersonTypeBtn = document.getElementById('continueFromPersonType');
    const continueToStep2Btn = document.getElementById('continueToStep2');
    const continueToStep3Btn = document.getElementById('continueToStep3');
    const continueToStep4Btn = document.getElementById('continueToStep4');
    const continueToStep5Btn = document.getElementById('continueToStep5');
    const continueToStep6Btn = document.getElementById('continueToStep6');
    const continueToStep7Btn = document.getElementById('continueToStep7');

    const backToInitialBtn = document.getElementById('backToInitial');
    const backToPersonTypeBtn = document.getElementById('backToPersonType');
    const backToStep1Btn = document.getElementById('backToStep1');
    const backToStep2Btn = document.getElementById('backToStep2');
    const backToStep3Btn = document.getElementById('backToStep3');
    const backToStep4Btn = document.getElementById('backToStep4');
    const backToStep5Btn = document.getElementById('backToStep5');
    const backToStep6Btn = document.getElementById('backToStep6');

    const skipDocumentsBtn = document.getElementById('skipDocuments');
    const validateRegistrationBtn = document.getElementById('validateRegistration');

    // Toggle password visibility
    const toggleRegisterPassword = document.getElementById('toggleRegisterPassword');
    const registerPassword = document.getElementById('registerPassword');

    // Éléments de sélection
    const personTypeRadios = document.querySelectorAll('input[name="personType"]');
    const paysNaissanceSelect = document.getElementById('paysNaissance');
    const villeNaissanceSelect = document.getElementById('villeNaissance');

    // Fonction pour afficher une étape
    function showStep(stepName) {
        // Cacher toutes les étapes
        Object.values(steps).forEach(step => {
            if (step) step.classList.add('d-none');
        });

        // Afficher l'étape demandée
        if (steps[stepName]) {
            steps[stepName].classList.remove('d-none');
            currentStep = stepName;
        }
    }

    // Validation de l'étape initiale
    function validateInitialStep() {
        const email = document.getElementById('registerEmail').value;
        const password = document.getElementById('registerPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        const acceptCommunications = document.getElementById('acceptCommunications').checked;
        const riskAwareness = document.getElementById('riskAwareness').checked;
        const acceptTerms = document.getElementById('acceptTerms').checked;

        // Validation basique
        if (!email || !password || !confirmPassword) {
            alert('Veuillez remplir tous les champs obligatoires.');
            return false;
        }

        if (password !== confirmPassword) {
            alert('Les mots de passe ne correspondent pas.');
            return false;
        }

        if (password.length < 8) {
            alert('Le mot de passe doit contenir au moins 8 caractères.');
            return false;
        }

        if (!acceptCommunications || !riskAwareness || !acceptTerms) {
            alert('Veuillez accepter toutes les conditions obligatoires.');
            return false;
        }

        return true;
    }

    // Validation de la sélection du type de personne
    function validatePersonType() {
        const selectedType = document.querySelector('input[name="personType"]:checked');
        return selectedType !== null;
    }

    // Validation de l'étape 1 des informations personnelles
    function validatePersonalInfoStep1() {
        const civilite = document.querySelector('input[name="civilite"]:checked');
        const prenom = document.getElementById('prenom').value;
        const nomNaissance = document.getElementById('nomNaissance').value;
        const telephone = document.getElementById('telephone').value;
        const dateNaissance = document.getElementById('dateNaissance').value;
        const paysNaissance = document.getElementById('paysNaissance').value;
        const nationalite = document.getElementById('nationalite').value;
        const villeNaissance = document.getElementById('villeNaissance').value;
        const codePostalNaissance = document.getElementById('codePostalNaissance').value;

        if (!civilite || !prenom || !nomNaissance || !telephone || !dateNaissance ||
            !paysNaissance || !nationalite || !villeNaissance || !codePostalNaissance) {
            alert('Veuillez remplir tous les champs obligatoires.');
            return false;
        }

        return true;
    }

    // Validation de l'étape 2 des informations personnelles
    function validatePersonalInfoStep2() {
        const paysResidence = document.getElementById('paysResidence').value;
        const adresse = document.getElementById('adresse').value;
        const ville = document.getElementById('ville').value;
        const codePostal = document.getElementById('codePostal').value;
        const paysResidenceFiscale = document.getElementById('paysResidenceFiscale').value;

        if (!paysResidence || !adresse || !ville || !codePostal || !paysResidenceFiscale) {
            alert('Veuillez remplir tous les champs obligatoires.');
            return false;
        }

        // Vérifier l'éligibilité
        const isEligible = ['FR', 'BE', 'CH'].includes(paysResidence);
        if (!isEligible) {
            alert('Désolé, notre plateforme n\'est pas encore disponible dans votre pays de résidence.');
            return false;
        }

        return true;
    }

    // Validation du profil investisseur (étape 3)
    function validateProfilInvestisseur() {
        const revenus = document.querySelector('input[name="revenus"]:checked');
        const portefeuille = document.querySelector('input[name="portefeuille"]:checked');
        const activiteFinanciere = document.querySelector('input[name="activiteFinanciere"]:checked');
        const transactions = document.querySelector('input[name="transactions"]:checked');

        if (!revenus || !portefeuille || !activiteFinanciere || !transactions) {
            alert('Veuillez répondre à toutes les questions.');
            return false;
        }

        return true;
    }

    // Vérification si l'utilisateur est expérimenté
    function checkIfExperienced() {
        const transactions = document.querySelector('input[name="transactions"]:checked');
        return transactions && transactions.value === 'oui';
    }

    // Validation de l'évaluation d'expérience (étape 4)
    function validateExperienceEvaluation() {
        const startups = document.querySelector('input[name="startups"]:checked');
        const impact = document.querySelector('input[name="impact"]:checked');
        const nbInvestissements = document.querySelector('input[name="nbInvestissements"]:checked');

        if (!startups || !impact || !nbInvestissements) {
            alert('Veuillez répondre à toutes les questions obligatoires.');
            return false;
        }

        return true;
    }

    // Validation du test de connaissances (étape 5)
    function validateKnowledgeTest() {
        const questions = ['question1', 'question2', 'question3', 'question4', 'question5', 'question6'];

        for (let question of questions) {
            const answer = document.querySelector(`input[name="${question}"]:checked`);
            if (!answer) {
                alert('Veuillez répondre à toutes les questions.');
                return false;
            }
        }

        return true;
    }

    // Validation des objectifs d'investissement (étape 6)
    function validateInvestmentGoals() {
        const dureeInvestissement = document.querySelector('input[name="dureeInvestissement"]:checked');
        const investissementIdeal = document.querySelector('input[name="investissementIdeal"]:checked');
        const montantProjet = document.querySelector('input[name="montantProjet"]:checked');

        if (!dureeInvestissement || !investissementIdeal || !montantProjet) {
            alert('Veuillez répondre à toutes les questions obligatoires.');
            return false;
        }

        return true;
    }

    // Vérification d'éligibilité (simulation)
    function checkEligibility() {
        const paysResidence = document.getElementById('paysResidence').value;
        const paysResidenceFiscale = document.getElementById('paysResidenceFiscale').value;

        const eligibilityCheck = document.getElementById('eligibilityCheck');
        const continueBtn = document.getElementById('continueToStep3');

        if (paysResidence && paysResidenceFiscale) {
            eligibilityCheck.classList.remove('d-none');
            eligibilityCheck.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i><strong>Vérification d\'éligibilité en cours...</strong>';

            // Simulation d'une vérification
            setTimeout(() => {
                const isEligible = ['FR', 'BE', 'CH'].includes(paysResidence);

                if (isEligible) {
                    eligibilityCheck.className = 'alert alert-success';
                    eligibilityCheck.innerHTML = '<i class="fas fa-check-circle me-2"></i><strong>Parfait !</strong> Vous êtes éligible pour investir sur notre plateforme.';
                    continueBtn.disabled = false;
                } else {
                    eligibilityCheck.className = 'alert alert-danger';
                    eligibilityCheck.innerHTML = '<i class="fas fa-exclamation-triangle me-2"></i><strong>Désolé,</strong> notre plateforme n\'est pas encore disponible dans votre pays de résidence.';
                    continueBtn.disabled = true;
                }
            }, 2000);
        }
    }

    // Affichage des explications conditionnelles pour le test de connaissances
    function setupKnowledgeTestExplanations() {
        // Question 1
        const q1Radios = document.querySelectorAll('input[name="question1"]');
        q1Radios.forEach(radio => {
            radio.addEventListener('change', function() {
                const explanation = document.getElementById('explanation1');
                if (this.value === '1' || this.value === '2') {
                    explanation.classList.remove('d-none');
                } else {
                    explanation.classList.add('d-none');
                }
                updateKnowledgeTestButton();
            });
        });

        // Question 2
        const q2Radios = document.querySelectorAll('input[name="question2"]');
        q2Radios.forEach(radio => {
            radio.addEventListener('change', function() {
                const explanation = document.getElementById('explanation2');
                if (this.value === '1' || this.value === '3') {
                    explanation.classList.remove('d-none');
                } else {
                    explanation.classList.add('d-none');
                }
                updateKnowledgeTestButton();
            });
        });

        // Question 3
        const q3Radios = document.querySelectorAll('input[name="question3"]');
        q3Radios.forEach(radio => {
            radio.addEventListener('change', function() {
                const explanation = document.getElementById('explanation3');
                if (this.value === '1' || this.value === '2') {
                    explanation.classList.remove('d-none');
                } else {
                    explanation.classList.add('d-none');
                }
                updateKnowledgeTestButton();
            });
        });

        // Question 4
        const q4Radios = document.querySelectorAll('input[name="question4"]');
        q4Radios.forEach(radio => {
            radio.addEventListener('change', function() {
                const explanation = document.getElementById('explanation4');
                if (this.value === '1' || this.value === '2') {
                    explanation.classList.remove('d-none');
                } else {
                    explanation.classList.add('d-none');
                }
                updateKnowledgeTestButton();
            });
        });

        // Question 5
        const q5Radios = document.querySelectorAll('input[name="question5"]');
        q5Radios.forEach(radio => {
            radio.addEventListener('change', function() {
                const explanation = document.getElementById('explanation5');
                if (this.value === '2' || this.value === '3') {
                    explanation.classList.remove('d-none');
                } else {
                    explanation.classList.add('d-none');
                }
                updateKnowledgeTestButton();
            });
        });

        // Question 6
        const q6Radios = document.querySelectorAll('input[name="question6"]');
        q6Radios.forEach(radio => {
            radio.addEventListener('change', function() {
                const explanation = document.getElementById('explanation6');
                if (this.value === '1' || this.value === '2') {
                    explanation.classList.remove('d-none');
                } else {
                    explanation.classList.add('d-none');
                }
                updateKnowledgeTestButton();
            });
        });
    }

    // Mise à jour du bouton du test de connaissances
    function updateKnowledgeTestButton() {
        const continueBtn = document.getElementById('continueToStep6');
        if (continueBtn) {
            const questions = ['question1', 'question2', 'question3', 'question4', 'question5', 'question6'];
            let allAnswered = true;

            for (let question of questions) {
                const answer = document.querySelector(`input[name="${question}"]:checked`);
                if (!answer) {
                    allAnswered = false;
                    break;
                }
            }

            continueBtn.disabled = !allAnswered;
        }
    }

    // Mise à jour du bouton des objectifs d'investissement
    function updateInvestmentGoalsButton() {
        const continueBtn = document.getElementById('continueToStep7');
        if (continueBtn) {
            const dureeInvestissement = document.querySelector('input[name="dureeInvestissement"]:checked');
            const investissementIdeal = document.querySelector('input[name="investissementIdeal"]:checked');
            const montantProjet = document.querySelector('input[name="montantProjet"]:checked');

            continueBtn.disabled = !(dureeInvestissement && investissementIdeal && montantProjet);
        }
    }

    // Fonction pour afficher le modal d'inscription incomplète
    function showIncompleteModal() {
        const modal = new bootstrap.Modal(document.getElementById('incompleteModal'));
        modal.show();
    }

    // Fonction de finalisation de l'inscription
    function completeRegistration() {
        // Simulation d'envoi des données
        const submitBtn = document.getElementById('validateRegistration');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Création du compte...';
        submitBtn.disabled = true;

        setTimeout(() => {
            // Redirection vers le profil ou dashboard
            alert('Inscription réussie ! Bienvenue sur InvestFuture.');
            window.location.href = 'accueil-connecte.html';
        }, 2000);
    }

    // Event Listeners
    if (toggleRegisterPassword) {
        toggleRegisterPassword.addEventListener('click', function() {
            const type = registerPassword.getAttribute('type') === 'password' ? 'text' : 'password';
            registerPassword.setAttribute('type', type);
            const icon = this.querySelector('i');
            icon.classList.toggle('fa-eye');
            icon.classList.toggle('fa-eye-slash');
        });
    }

    // Navigation entre les étapes
    if (continueToPersonTypeBtn) {
        continueToPersonTypeBtn.addEventListener('click', function() {
            if (validateInitialStep()) {
                showStep('personTypeSelection');
            }
        });
    }

    if (continueFromPersonTypeBtn) {
        continueFromPersonTypeBtn.addEventListener('click', function() {
            if (validatePersonType()) {
                const selectedType = document.querySelector('input[name="personType"]:checked').value;
                if (selectedType === 'physique') {
                    showStep('personalInfoStep1');
                } else {
                    // TODO: Gérer le cas des personnes morales
                    alert('Le parcours pour les personnes morales sera disponible prochainement.');
                }
            }
        });
    }

    if (continueToStep2Btn) {
        continueToStep2Btn.addEventListener('click', function() {
            if (validatePersonalInfoStep1()) {
                showStep('personalInfoStep2');
            }
        });
    }

    if (continueToStep3Btn) {
        continueToStep3Btn.addEventListener('click', function() {
            if (validatePersonalInfoStep2()) {
                showStep('personalInfoStep3');
            }
        });
    }

    if (continueToStep4Btn) {
        continueToStep4Btn.addEventListener('click', function() {
            if (validateProfilInvestisseur()) {
                const isExperienced = checkIfExperienced();
                if (isExperienced) {
                    // Utilisateur expérimenté, on peut aller plus vite
                    showStep('personalInfoStep6'); // Passer directement aux objectifs
                } else {
                    // Utilisateur débutant, on continue avec l'évaluation
                    showStep('personalInfoStep4');
                }
            }
        });
    }

    if (continueToStep5Btn) {
        continueToStep5Btn.addEventListener('click', function() {
            if (validateExperienceEvaluation()) {
                showStep('personalInfoStep5'); // Test de connaissances
            }
        });
    }

    if (continueToStep6Btn) {
        continueToStep6Btn.addEventListener('click', function() {
            if (validateKnowledgeTest()) {
                showStep('personalInfoStep6');
            }
        });
    }

    if (continueToStep7Btn) {
        continueToStep7Btn.addEventListener('click', function() {
            if (validateInvestmentGoals()) {
                showStep('personalInfoStep7');
            }
        });
    }

    // Boutons retour
    if (backToInitialBtn) {
        backToInitialBtn.addEventListener('click', function() {
            showStep('initialRegistration');
        });
    }

    if (backToPersonTypeBtn) {
        backToPersonTypeBtn.addEventListener('click', function() {
            showStep('personTypeSelection');
        });
    }

    if (backToStep1Btn) {
        backToStep1Btn.addEventListener('click', function() {
            showStep('personalInfoStep1');
        });
    }

    if (backToStep2Btn) {
        backToStep2Btn.addEventListener('click', function() {
            showStep('personalInfoStep2');
        });
    }

    if (backToStep3Btn) {
        backToStep3Btn.addEventListener('click', function() {
            showStep('personalInfoStep3');
        });
    }

    if (backToStep4Btn) {
        backToStep4Btn.addEventListener('click', function() {
            showStep('personalInfoStep4');
        });
    }

    if (backToStep5Btn) {
        backToStep5Btn.addEventListener('click', function() {
            showStep('personalInfoStep5');
        });
    }

    if (backToStep6Btn) {
        backToStep6Btn.addEventListener('click', function() {
            showStep('personalInfoStep6');
        });
    }

    if (skipDocumentsBtn) {
        skipDocumentsBtn.addEventListener('click', function() {
            showIncompleteModal();
        });
    }

    if (validateRegistrationBtn) {
        validateRegistrationBtn.addEventListener('click', function() {
            completeRegistration();
        });
    }

    // Activation du bouton de continuation pour le type de personne
    personTypeRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            if (continueFromPersonTypeBtn) {
                continueFromPersonTypeBtn.disabled = false;
            }
        });
    });

    // Gestion des pays et villes de naissance
    if (paysNaissanceSelect) {
        paysNaissanceSelect.addEventListener('change', function() {
            const selectedCountry = this.value;
            if (villeNaissanceSelect) {
                villeNaissanceSelect.disabled = false;
                // Simuler le chargement des villes
                villeNaissanceSelect.innerHTML = '<option value="">Chargement...</option>';

                setTimeout(() => {
                    villeNaissanceSelect.innerHTML = `
                        <option value="">Sélectionnez une ville</option>
                        <option value="paris">Paris</option>
                        <option value="lyon">Lyon</option>
                        <option value="marseille">Marseille</option>
                    `;
                }, 500);
            }
        });
    }

    // Vérification d'éligibilité
    const paysResidenceSelect = document.getElementById('paysResidence');
    const paysResidenceFiscaleSelect = document.getElementById('paysResidenceFiscale');

    if (paysResidenceSelect && paysResidenceFiscaleSelect) {
        [paysResidenceSelect, paysResidenceFiscaleSelect].forEach(select => {
            select.addEventListener('change', checkEligibility);
        });
    }

    // Gestion des messages conditionnels basés sur la dernière question de l'étape 3
    const transactionsRadios = document.querySelectorAll('input[name="transactions"]');
    transactionsRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            const experienceMessage = document.getElementById('experienceMessage');
            const debutantMessage = document.getElementById('debutantMessage');

            if (this.value === 'oui') {
                experienceMessage.classList.remove('d-none');
                debutantMessage.classList.add('d-none');
            } else {
                experienceMessage.classList.add('d-none');
                debutantMessage.classList.remove('d-none');
            }
        });
    });

    // Gestion de la case "Aucun" qui désélectionne les autres
    const produitAucun = document.getElementById('produit-aucun');
    const autresProduits = document.querySelectorAll('input[id^="produit-"]:not(#produit-aucun)');

    if (produitAucun) {
        produitAucun.addEventListener('change', function() {
            if (this.checked) {
                autresProduits.forEach(checkbox => {
                    checkbox.checked = false;
                });
            }
        });
    }

    autresProduits.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            if (this.checked && produitAucun) {
                produitAucun.checked = false;
            }
        });
    });

    // Activation des boutons de continuation basée sur la validation
    const profilInvestisseurRadios = document.querySelectorAll('input[name="revenus"], input[name="portefeuille"], input[name="activiteFinanciere"], input[name="transactions"]');
    profilInvestisseurRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            const continueBtn = document.getElementById('continueToStep4');
            if (continueBtn) {
                // Vérification silencieuse sans alert
                const revenus = document.querySelector('input[name="revenus"]:checked');
                const portefeuille = document.querySelector('input[name="portefeuille"]:checked');
                const activiteFinanciere = document.querySelector('input[name="activiteFinanciere"]:checked');
                const transactions = document.querySelector('input[name="transactions"]:checked');

                if (revenus && portefeuille && activiteFinanciere && transactions) {
                    continueBtn.disabled = false;
                } else {
                    continueBtn.disabled = true;
                }
            }
        });
    });

    const experienceRadios = document.querySelectorAll('input[name="startups"], input[name="impact"], input[name="nbInvestissements"]');
    experienceRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            const continueBtn = document.getElementById('continueToStep5');
            if (continueBtn) {
                // Vérification silencieuse sans alert
                const startups = document.querySelector('input[name="startups"]:checked');
                const impact = document.querySelector('input[name="impact"]:checked');
                const nbInvestissements = document.querySelector('input[name="nbInvestissements"]:checked');

                if (startups && impact && nbInvestissements) {
                    continueBtn.disabled = false;
                } else {
                    continueBtn.disabled = true;
                }
            }
        });
    });

    // Gestion de l'avertissement sur la durée d'investissement
    const dureeRadios = document.querySelectorAll('input[name="dureeInvestissement"]');
    dureeRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            const warning = document.getElementById('dureeWarning');
            if (this.value === 'moins-2ans' || this.value === '2-4ans') {
                warning.classList.remove('d-none');
            } else {
                warning.classList.add('d-none');
            }
            updateInvestmentGoalsButton();
        });
    });

    // Event listeners pour les questions d'objectifs
    const investmentGoalsRadios = document.querySelectorAll('input[name="investissementIdeal"], input[name="montantProjet"]');
    investmentGoalsRadios.forEach(radio => {
        radio.addEventListener('change', updateInvestmentGoalsButton);
    });

    // Initialiser les explications du test de connaissances
    setupKnowledgeTestExplanations();
});