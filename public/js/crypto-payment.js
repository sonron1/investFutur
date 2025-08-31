// Crypto Payment System
class CryptoPayment {
    constructor() {
        this.supportedCryptos = {
            BTC: {
                name: 'Bitcoin',
                symbol: 'BTC',
                icon: 'fab fa-bitcoin',
                color: '#f7931a',
                network: 'Bitcoin',
                confirmations: 1,
                fees: '0.5%'
            },
            ETH: {
                name: 'Ethereum',
                symbol: 'ETH',
                icon: 'fab fa-ethereum',
                color: '#627eea',
                network: 'Ethereum',
                confirmations: 6,
                fees: '0.3%'
            },
            USDC: {
                name: 'USD Coin',
                symbol: 'USDC',
                icon: 'fas fa-dollar-sign',
                color: '#2775ca',
                network: 'Ethereum',
                confirmations: 6,
                fees: '0.2%'
            },
            USDT: {
                name: 'Tether',
                symbol: 'USDT',
                icon: 'fas fa-dollar-sign',
                color: '#26a17b',
                network: 'Ethereum',
                confirmations: 6,
                fees: '0.2%'
            }
        };

        this.exchangeRates = {
            BTC: 45000,  // EUR
            ETH: 2800,   // EUR
            USDC: 0.92,  // EUR
            USDT: 0.92   // EUR
        };

        this.currentPayment = null;
    }

    openPaymentModal(projectId, amount, type = 'new') {
        const modal = document.getElementById('cryptoPaymentModal');
        const content = document.getElementById('cryptoPaymentContent');

        this.currentPayment = {
            projectId,
            amount: parseFloat(amount),
            type,
            timestamp: Date.now()
        };

        content.innerHTML = this.generatePaymentContent();

        const bsModal = new bootstrap.Modal(modal);
        bsModal.show();

        this.setupPaymentListeners();
    }

    generatePaymentContent() {
        return `
            <div class="crypto-payment-container">
                <!-- Étape 1: Sélection de la crypto -->
                <div class="payment-step" id="step1">
                    <div class="text-center mb-4">
                        <h6>Montant à payer: <span class="text-primary fw-bold">${this.formatNumber(this.currentPayment.amount)}€</span></h6>
                        <small class="text-muted">Sélectionnez votre cryptomonnaie préférée</small>
                    </div>

                    <div class="crypto-selection">
                        ${Object.entries(this.supportedCryptos).map(([symbol, crypto]) => `
                            <div class="crypto-option mb-3 p-3 border rounded cursor-pointer" data-crypto="${symbol}">
                                <div class="d-flex align-items-center">
                                    <div class="crypto-icon me-3" style="color: ${crypto.color}">
                                        <i class="${crypto.icon} fa-2x"></i>
                                    </div>
                                    <div class="flex-grow-1">
                                        <div class="d-flex justify-content-between align-items-center">
                                            <div>
                                                <h6 class="mb-1">${crypto.name} (${crypto.symbol})</h6>
                                                <small class="text-muted">Réseau: ${crypto.network}</small>
                                            </div>
                                            <div class="text-end">
                                                <div class="fw-bold crypto-amount" data-crypto="${symbol}">
                                                    ${this.calculateCryptoAmount(symbol)} ${symbol}
                                                </div>
                                                <small class="text-success">Frais: ${crypto.fees}</small>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        `).join('')}
                    </div>

                    <div class="text-center mt-4">
                        <button class="btn btn-primary" id="continueBtn" disabled>
                            Continuer <i class="fas fa-arrow-right ms-2"></i>
                        </button>
                    </div>
                </div>

                <!-- Étape 2: Génération d'adresse et paiement -->
                <div class="payment-step d-none" id="step2">
                    <div class="payment-details">
                        <!-- Le contenu sera généré dynamiquement -->
                    </div>
                </div>

                <!-- Étape 3: Confirmation -->
                <div class="payment-step d-none" id="step3">
                    <div class="text-center">
                        <div class="success-animation mb-4">
                            <i class="fas fa-check-circle text-success" style="font-size: 4rem;"></i>
                        </div>
                        <h4 class="text-success mb-3">Paiement confirmé !</h4>
                        <p class="text-muted">Votre transaction a été validée avec succès</p>
                        <div class="mt-4">
                            <button class="btn btn-primary" onclick="this.closest('.modal').querySelector('.btn-close').click()">
                                Terminer
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    setupPaymentListeners() {
        // Sélection de crypto
        document.querySelectorAll('.crypto-option').forEach(option => {
            option.addEventListener('click', (e) => {
                document.querySelectorAll('.crypto-option').forEach(opt => opt.classList.remove('selected'));
                option.classList.add('selected');

                const crypto = option.getAttribute('data-crypto');
                this.selectedCrypto = crypto;

                document.getElementById('continueBtn').disabled = false;
            });
        });

        // Bouton continuer
        const continueBtn = document.getElementById('continueBtn');
        if (continueBtn) {
            continueBtn.addEventListener('click', () => {
                this.showPaymentDetails();
            });
        }
    }

    showPaymentDetails() {
        document.getElementById('step1').classList.add('d-none');
        document.getElementById('step2').classList.remove('d-none');

        const crypto = this.supportedCryptos[this.selectedCrypto];
        const amount = this.calculateCryptoAmount(this.selectedCrypto);
        const address = this.generateWalletAddress(this.selectedCrypto);

        document.querySelector('.payment-details').innerHTML = `
            <div class="text-center mb-4">
                <div class="crypto-header d-flex align-items-center justify-content-center mb-3">
                    <i class="${crypto.icon} text-primary me-2" style="font-size: 2rem; color: ${crypto.color} !important;"></i>
                    <div>
                        <h5 class="mb-0">${crypto.name}</h5>
                        <small class="text-muted">Réseau ${crypto.network}</small>
                    </div>
                </div>
                <div class="amount-display mb-3">
                    <h3 class="text-primary mb-1">${amount} ${this.selectedCrypto}</h3>
                    <small class="text-muted">≈ ${this.formatNumber(this.currentPayment.amount)}€</small>
                </div>
            </div>

            <div class="payment-instructions">
                <div class="alert alert-info">
                    <i class="fas fa-info-circle me-2"></i>
                    <strong>Instructions de paiement:</strong>
                    <ol class="mb-0 mt-2">
                        <li>Envoyez exactement <strong>${amount} ${this.selectedCrypto}</strong></li>
                        <li>À l'adresse ci-dessous</li>
                        <li>Attendez ${crypto.confirmations} confirmation(s)</li>
                    </ol>
                </div>

                <div class="wallet-address mb-4">
                    <label class="form-label fw-semibold">Adresse de paiement:</label>
                    <div class="input-group">
                        <input type="text" class="form-control font-monospace" value="${address}" readonly id="walletAddress">
                        <button class="btn btn-outline-secondary" type="button" onclick="copyToClipboard('walletAddress')">
                            <i class="fas fa-copy"></i>
                        </button>
                    </div>
                </div>

                <div class="qr-code text-center mb-4">
                    <div class="qr-placeholder bg-light rounded p-4" style="min-height: 200px;">
                        <div class="d-flex align-items-center justify-content-center h-100">
                            <div>
                                <i class="fas fa-qrcode text-muted" style="font-size: 3rem;"></i>
                                <div class="mt-2 text-muted">Code QR</div>
                                <small class="text-muted">Scannez avec votre wallet</small>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="transaction-timer">
                    <div class="d-flex justify-content-between align-items-center mb-2">
                        <small class="text-muted">Temps restant:</small>
                        <small class="fw-semibold text-warning" id="paymentTimer">29:59</small>
                    </div>
                    <div class="progress" style="height: 4px;">
                        <div class="progress-bar bg-warning" style="width: 100%" id="timerProgress"></div>
                    </div>
                </div>

                <div class="payment-status mt-4">
                    <div class="d-flex align-items-center justify-content-center">
                        <div class="spinner-border spinner-border-sm text-primary me-2" role="status"></div>
                        <span class="text-muted">En attente du paiement...</span>
                    </div>
                </div>
            </div>

            <div class="text-center mt-4">
                <button class="btn btn-outline-secondary me-2" onclick="this.showStep1()">
                    <i class="fas fa-arrow-left me-2"></i>Retour
                </button>
                <button class="btn btn-success" onclick="this.simulatePayment()">
                    <i class="fas fa-check me-2"></i>Simuler paiement (Demo)
                </button>
            </div>
        `;

        this.startPaymentTimer();
        this.startPaymentCheck();
    }

    calculateCryptoAmount(cryptoSymbol) {
        const rate = this.exchangeRates[cryptoSymbol];
        const amount = this.currentPayment.amount;
        const cryptoAmount = amount / rate;

        // Arrondir selon la crypto
        if (cryptoSymbol === 'BTC') {
            return cryptoAmount.toFixed(8);
        } else if (cryptoSymbol === 'ETH') {
            return cryptoAmount.toFixed(6);
        } else {
            return cryptoAmount.toFixed(2);
        }
    }

    generateWalletAddress(cryptoSymbol) {
        // Simulation d'adresses (en production, elles seraient générées par l'API)
        const addresses = {
            BTC: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa',
            ETH: '0x742d35Cc6639C0532fEb96b9f76c86C3D3D8C48B',
            USDC: '0x742d35Cc6639C0532fEb96b9f76c86C3D3D8C48B',
            USDT: '0x742d35Cc6639C0532fEb96b9f76c86C3D3D8C48B'
        };

        return addresses[cryptoSymbol] || addresses.BTC;
    }

    startPaymentTimer() {
        let timeLeft = 30 * 60; // 30 minutes en secondes

        const timer = setInterval(() => {
            const minutes = Math.floor(timeLeft / 60);
            const seconds = timeLeft % 60;

            const timerElement = document.getElementById('paymentTimer');
            const progressElement = document.getElementById('timerProgress');

            if (timerElement) {
                timerElement.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            }

            if (progressElement) {
                const progressPercent = (timeLeft / (30 * 60)) * 100;
                progressElement.style.width = `${progressPercent}%`;
            }

            if (timeLeft <= 0) {
                clearInterval(timer);
                this.handlePaymentTimeout();
            }

            timeLeft--;
        }, 1000);

        this.paymentTimer = timer;
    }

    startPaymentCheck() {
        // Simulation de vérification de paiement
        this.paymentCheckInterval = setInterval(() => {
            // En production, ici on ferait un appel API pour vérifier la transaction
            console.log('Vérification du paiement...');
        }, 10000); // Vérifier toutes les 10 secondes
    }

    simulatePayment() {
        // Simulation d'un paiement réussi pour la démo
        this.confirmPayment({
            txHash: '0x' + Math.random().toString(16).substr(2, 64),
            amount: this.calculateCryptoAmount(this.selectedCrypto),
            crypto: this.selectedCrypto
        });
    }

    confirmPayment(transactionData) {
        // Nettoyer les timers
        if (this.paymentTimer) {
            clearInterval(this.paymentTimer);
        }
        if (this.paymentCheckInterval) {
            clearInterval(this.paymentCheckInterval);
        }

        // Afficher la confirmation
        document.getElementById('step2').classList.add('d-none');
        document.getElementById('step3').classList.remove('d-none');

        // Sauvegarder la transaction
        this.saveTransaction(transactionData);

        // Notification de succès
        this.showNotification('Paiement crypto confirmé !', 'success');

        setTimeout(() => {
            bootstrap.Modal.getInstance(document.getElementById('cryptoPaymentModal')).hide();
        }, 3000);
    }

    saveTransaction(transactionData) {
        const transaction = {
            id: 'tx_' + Date.now(),
            projectId: this.currentPayment.projectId,
            amount: this.currentPayment.amount,
            cryptoAmount: transactionData.amount,
            cryptoSymbol: transactionData.crypto,
            txHash: transactionData.txHash,
            status: 'confirmed',
            timestamp: Date.now(),
            type: this.currentPayment.type
        };

        // Sauvegarder en localStorage (en production : API)
        const transactions = JSON.parse(localStorage.getItem('cryptoTransactions') || '[]');
        transactions.push(transaction);
        localStorage.setItem('cryptoTransactions', JSON.stringify(transactions));

        console.log('Transaction sauvegardée:', transaction);
    }

    handlePaymentTimeout() {
        const statusElement = document.querySelector('.payment-status');
        if (statusElement) {
            statusElement.innerHTML = `
                <div class="alert alert-warning">
                    <i class="fas fa-exclamation-triangle me-2"></i>
                    Le temps de paiement a expiré. Veuillez recommencer.
                </div>
            `;
        }
    }

    showStep1() {
        document.getElementById('step2').classList.add('d-none');
        document.getElementById('step1').classList.remove('d-none');

        // Nettoyer les timers
        if (this.paymentTimer) {
            clearInterval(this.paymentTimer);
        }
        if (this.paymentCheckInterval) {
            clearInterval(this.paymentCheckInterval);
        }
    }

    formatNumber(num) {
        return new Intl.NumberFormat('fr-FR').format(num);
    }

    showNotification(message, type = 'info') {
        // Réutiliser la fonction de notification existante
        if (typeof showNotification === 'function') {
            showNotification(message, type);
        }
    }
}

// Instance globale
const cryptoPayment = new CryptoPayment();

// Fonction globale pour ouvrir le paiement crypto
function openCryptoPayment(projectId, amount, type = 'new') {
    cryptoPayment.openPaymentModal(projectId, amount, type);
}

// Fonction utilitaire pour copier dans le presse-papiers
function copyToClipboard(elementId) {
    const element = document.getElementById(elementId);
    element.select();
    element.setSelectionRange(0, 99999);
    document.execCommand('copy');

    // Feedback visuel
    const button = element.nextElementSibling;
    const originalIcon = button.innerHTML;
    button.innerHTML = '<i class="fas fa-check text-success"></i>';

    setTimeout(() => {
        button.innerHTML = originalIcon;
    }, 2000);
}

// CSS supplémentaire pour les crypto payments
const cryptoStyles = `
<style>
.crypto-option {
    transition: all 0.3s ease;
    cursor: pointer;
}

.crypto-option:hover {
    border-color: var(--bs-primary) !important;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.crypto-option.selected {
    border-color: var(--bs-primary) !important;
    background-color: var(--bs-primary-bg-subtle);
}

.payment-step {
    min-height: 400px;
}

.qr-placeholder {
    border: 2px dashed #dee2e6;
}

.font-monospace {
    font-family: 'Courier New', monospace;
    font-size: 0.9rem;
}

.success-animation {
    animation: successPulse 2s ease-in-out;
}

@keyframes successPulse {
    0% { transform: scale(0); opacity: 0; }
    50% { transform: scale(1.1); opacity: 1; }
    100% { transform: scale(1); opacity: 1; }
}

.crypto-header i {
    filter: drop-shadow(0 2px 4px rgba(0,0,0,0.1));
}

.amount-display {
    padding: 1rem;
    background: linear-gradient(135deg, #f8f9fa, #e9ecef);
    border-radius: 0.5rem;
    border: 1px solid #dee2e6;
}
</style>
`;

// Ajouter les styles
document.head.insertAdjacentHTML('beforeend', cryptoStyles);