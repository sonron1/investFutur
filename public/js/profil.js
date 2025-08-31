// Profile Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    initializeProfile();
    setupEventListeners();
    loadCryptoTransactions();
});

function initializeProfile() {
    // Charger les données utilisateur
    const userData = JSON.parse(localStorage.getItem('investFutureUser'));
    if (userData) {
        document.getElementById('userName').textContent = userData.name;
        document.getElementById('profileName').textContent = userData.name;

        // Remplir les champs du formulaire
        if (userData.firstName) document.getElementById('firstName').value = userData.firstName;
        if (userData.lastName) document.getElementById('lastName').value = userData.lastName;
        if (userData.email) document.getElementById('email').value = userData.email;
    }
}

function setupEventListeners() {
    // Formulaire d'informations personnelles
    document.getElementById('personalInfoForm').addEventListener('submit', function(e) {
        e.preventDefault();
        savePersonalInfo();
    });

    // Formulaire de profil investisseur
    document.getElementById('investorProfileForm').addEventListener('submit', function(e) {
        e.preventDefault();
        saveInvestorProfile();
    });
}

function savePersonalInfo() {
    const formData = {
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        address: document.getElementById('address').value,
        city: document.getElementById('city').value,
        postalCode: document.getElementById('postalCode').value,
        country: document.getElementById('country').value
    };

    // Mettre à jour les données utilisateur
    const userData = JSON.parse(localStorage.getItem('investFutureUser')) || {};
    Object.assign(userData, formData);
    userData.name = `${formData.firstName} ${formData.lastName}`;

    localStorage.setItem('investFutureUser', JSON.stringify(userData));

    // Mettre à jour l'affichage
    document.getElementById('userName').textContent = userData.name;
    document.getElementById('profileName').textContent = userData.name;

    showNotification('Informations personnelles sauvegardées !', 'success');
}

function saveInvestorProfile() {
    const investorData = {
        experience: document.getElementById('experience').value,
        riskTolerance: document.getElementById('riskTolerance').value,
        monthlyBudget: document.getElementById('monthlyBudget').value,
        investmentHorizon: document.getElementById('investmentHorizon').value,
        interestedSectors: getSelectedSectors()
    };

    // Sauvegarder le profil investisseur
    localStorage.setItem('investorProfile', JSON.stringify(investorData));

    showNotification('Profil investisseur mis à jour !', 'success');
}

function getSelectedSectors() {
    const sectors = [];
    document.querySelectorAll('input[type="checkbox"]:checked').forEach(checkbox => {
        sectors.push({
            value: checkbox.value,
            label: checkbox.nextElementSibling.textContent
        });
    });
    return sectors;
}

function loadCryptoTransactions() {
    const transactions = JSON.parse(localStorage.getItem('cryptoTransactions') || '[]');
    const tbody = document.getElementById('cryptoTransactions');

    if (transactions.length === 0) {
        // Garder les transactions de démonstration si aucune transaction réelle
        return;
    }

    tbody.innerHTML = transactions.map(tx => `
        <tr>
            <td>${formatDate(new Date(tx.timestamp))}</td>
            <td>${getProjectName(tx.projectId)}</td>
            <td>${formatNumber(tx.amount)}€</td>
            <td>
                <div class="d-flex align-items-center">
                    <i class="${getCryptoIcon(tx.cryptoSymbol)} me-2"></i>
                    ${tx.cryptoAmount} ${tx.cryptoSymbol}
                </div>
            </td>
            <td>
                <code class="small">${tx.txHash.substring(0, 10)}...</code>
                <button class="btn btn-sm btn-outline-secondary ms-1" onclick="copyToClipboard('${tx.txHash}')">
                    <i class="fas fa-copy"></i>
                </button>
            </td>
            <td><span class="badge bg-${getStatusColor(tx.status)}">${getStatusText(tx.status)}</span></td>
        </tr>
    `).join('');
}

function getProjectName(projectId) {
    const projectNames = {
        'quantumleap': 'QuantumLeap Computing',
        'windtech': 'WindTech Solutions',
        'mrna': 'mRNA Therapeutics',
        'carbon': 'CarbonCapture Pro'
    };
    return projectNames[projectId] || 'Projet inconnu';
}

function getCryptoIcon(symbol) {
    const icons = {
        'BTC': 'fab fa-bitcoin text-warning',
        'ETH': 'fab fa-ethereum text-primary',
        'USDC': 'fas fa-dollar-sign text-success',
        'USDT': 'fas fa-dollar-sign text-info'
    };
    return icons[symbol] || 'fas fa-coins';
}

function getStatusColor(status) {
    const colors = {
        'confirmed': 'success',
        'pending': 'warning',
        'failed': 'danger'
    };
    return colors[status] || 'secondary';
}

function getStatusText(status) {
    const texts = {
        'confirmed': 'Confirmé',
        'pending': 'En attente',
        'failed': 'Échoué'
    };
    return texts[status] || 'Inconnu';
}

function formatNumber(num) {
    return new Intl.NumberFormat('fr-FR').format(num);
}

function formatDate(date) {
    return date.toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    });
}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(function() {
        showNotification('Hash copié dans le presse-papiers !', 'info');
    }).catch(function() {
        // Fallback pour les navigateurs plus anciens
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        showNotification('Hash copié dans le presse-papiers !', 'info');
    });
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

function logout() {
    localStorage.removeItem('investFutureUser');
    localStorage.removeItem('investorProfile');
    window.location.href = 'index.html';
}