import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null,
        token: null,
        isLoading: false,
        error: null
    }),

    getters: {
        isAuthenticated: (state) => !!state.token,
        isAdmin: (state) => state.user?.role === 'admin'
    },

    actions: {
        // Initialisation de l'auth depuis le localStorage
        initAuth() {
            if (process.client) {
                const token = localStorage.getItem('authToken')
                const userData = localStorage.getItem('userData')

                if (token && userData) {
                    try {
                        this.token = token
                        this.user = JSON.parse(userData)
                    } catch (error) {
                        console.error('Erreur lors de la récupération des données utilisateur:', error)
                        this.logout()
                    }
                }
            }
        },

        // Méthode pour créer un compte admin par défaut
        async createDefaultAdmin() {
            const adminUser = {
                id: 'admin-001',
                email: 'admin@investfuture.com',
                name: 'Administrateur InvestFuture',
                firstName: 'Admin',
                lastName: 'InvestFuture',
                role: 'admin',
                permissions: ['validate_accounts', 'manage_users', 'view_analytics', 'manage_investments'],
                createdAt: new Date().toISOString(),
                isActive: true
            }

            // Stocker l'admin en localStorage
            if (process.client) {
                const existingUsers = JSON.parse(localStorage.getItem('users') || '[]')
                const adminExists = existingUsers.find(u => u.email === adminUser.email)

                if (!adminExists) {
                    existingUsers.push(adminUser)
                    localStorage.setItem('users', JSON.stringify(existingUsers))
                    console.log('Compte admin créé:', adminUser.email)
                }
            }
        },

        // Connexion admin simplifiée pour les tests
        async loginAsAdmin() {
            try {
                this.isLoading = true

                // Créer le compte admin s'il n'existe pas
                await this.createDefaultAdmin()

                const adminUser = {
                    id: 'admin-001',
                    email: 'admin@investfuture.com',
                    name: 'Administrateur InvestFuture',
                    firstName: 'Admin',
                    lastName: 'InvestFuture',
                    role: 'admin',
                    permissions: ['validate_accounts', 'manage_users', 'view_analytics', 'manage_investments'],
                    createdAt: new Date().toISOString(),
                    isActive: true
                }

                this.user = adminUser
                this.token = 'admin-token-' + Date.now()

                if (process.client) {
                    localStorage.setItem('authToken', this.token)
                    localStorage.setItem('userData', JSON.stringify(adminUser))
                }

                return { success: true, user: adminUser }
            } catch (error) {
                console.error('Erreur connexion admin:', error)
                return { success: false, error: 'Erreur de connexion administrateur' }
            } finally {
                this.isLoading = false
            }
        },

        // Validation des données d'inscription
        validateRegistrationData(userData) {
            const errors = []

            // Validation email
            if (!userData.email) {
                errors.push('L\'email est obligatoire')
            } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userData.email)) {
                errors.push('Format email invalide')
            }

            // Validation mot de passe
            if (!userData.password) {
                errors.push('Le mot de passe est obligatoire')
            } else if (userData.password.length < 8) {
                errors.push('Le mot de passe doit contenir au moins 8 caractères')
            } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(userData.password)) {
                errors.push('Le mot de passe doit contenir au moins une majuscule, une minuscule et un chiffre')
            }

            // Validation nom/prénom
            if (!userData.firstName || userData.firstName.length < 2) {
                errors.push('Le prénom doit contenir au moins 2 caractères')
            }

            if (!userData.lastName || userData.lastName.length < 2) {
                errors.push('Le nom doit contenir au moins 2 caractères')
            }

            return errors
        },

        // Simulation d'existence d'email
        async checkEmailExists(email) {
            if (process.client) {
                // Vérifier dans les utilisateurs existants
                const existingUsers = JSON.parse(localStorage.getItem('users') || '[]')
                const emailExists = existingUsers.some(user => user.email.toLowerCase() === email.toLowerCase())

                // Vérifier dans les inscriptions en attente
                const pendingRegistrations = JSON.parse(localStorage.getItem('pendingRegistrations') || '[]')
                const pendingExists = pendingRegistrations.some(reg => reg.email.toLowerCase() === email.toLowerCase())

                return emailExists || pendingExists
            }
            return false
        },

        // Inscription améliorée avec gestion admin
        async register(userData) {
            try {
                this.isLoading = true
                console.log('Tentative d\'inscription:', userData.email)

                // Vérifier si l'email existe déjà
                if (process.client) {
                    const existingUsers = JSON.parse(localStorage.getItem('users') || '[]')
                    const emailExists = existingUsers.some(user => user.email === userData.email)

                    if (emailExists) {
                        return {
                            success: false,
                            error: 'Un compte existe déjà avec cette adresse email'
                        }
                    }

                    // Générer un ID unique pour l'inscription
                    const registrationId = 'reg_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9)

                    // Préparer les données d'inscription avec métadonnées admin
                    const registrationData = {
                        ...userData,
                        id: registrationId,
                        status: 'pending',
                        submittedAt: new Date().toISOString(),
                        adminValidation: {
                            status: 'pending',
                            submittedAt: new Date().toISOString(),
                            reviewedBy: null,
                            reviewedAt: null,
                            notes: ''
                        }
                    }

                    // Sauvegarder dans les inscriptions en attente
                    const pendingRegistrations = JSON.parse(localStorage.getItem('pendingRegistrations') || '[]')
                    pendingRegistrations.push(registrationData)
                    localStorage.setItem('pendingRegistrations', JSON.stringify(pendingRegistrations))

                    // Créer un compte utilisateur temporaire (en attente de validation)
                    const tempUser = {
                        id: registrationId,
                        email: userData.email,
                        name: userData.name,
                        firstName: userData.firstName,
                        lastName: userData.lastName,
                        role: 'user',
                        status: 'pending',
                        isActive: false,
                        createdAt: new Date().toISOString()
                    }

                    // Connecter automatiquement l'utilisateur même si en attente
                    this.user = tempUser
                    this.token = 'temp-token-' + registrationId

                    localStorage.setItem('authToken', this.token)
                    localStorage.setItem('userData', JSON.stringify(tempUser))

                    console.log('Inscription sauvegardée pour validation admin')
                    return {
                        success: true,
                        message: 'Votre inscription a été soumise avec succès. Elle sera examinée par nos équipes sous 48h.',
                        user: tempUser
                    }
                }

            } catch (error) {
                console.error('Erreur lors de l\'inscription:', error)
                return {
                    success: false,
                    error: 'Une erreur est survenue lors de l\'inscription. Veuillez réessayer.'
                }
            } finally {
                this.isLoading = false
            }
        },

        // Connexion améliorée
        async login(credentials) {
            this.isLoading = true
            this.error = null

            try {
                // Validation des credentials
                if (!credentials.email || !credentials.password) {
                    throw new Error('Email et mot de passe requis')
                }

                // Simulation d'appel API
                await new Promise(resolve => setTimeout(resolve, 1200))

                // Comptes de démo
                const demoAccounts = [
                    {
                        email: 'demo@investfuture.com',
                        password: 'Demo123!',
                        user: {
                            id: 1,
                            name: 'Demo User',
                            email: 'demo@investfuture.com',
                            firstName: 'Demo',
                            lastName: 'User',
                            role: 'user',
                            status: 'active',
                            isActive: true
                        }
                    },
                    {
                        email: 'admin@investfuture.com',
                        password: 'Admin123!',
                        user: {
                            id: 2,
                            name: 'Admin User',
                            email: 'admin@investfuture.com',
                            firstName: 'Admin',
                            lastName: 'User',
                            role: 'admin',
                            status: 'active',
                            isActive: true
                        }
                    }
                ]

                const account = demoAccounts.find(acc =>
                    acc.email === credentials.email.toLowerCase() &&
                    acc.password === credentials.password
                )

                if (!account) {
                    throw new Error('Email ou mot de passe incorrect')
                }

                const mockResponse = {
                    user: account.user,
                    token: 'invest-jwt-token-' + Date.now()
                }

                this.user = mockResponse.user
                this.token = mockResponse.token

                if (process.client) {
                    localStorage.setItem('authToken', mockResponse.token)
                    localStorage.setItem('userData', JSON.stringify(mockResponse.user))
                }

                return { success: true, user: mockResponse.user }

            } catch (error) {
                this.error = error.message
                return { success: false, error: error.message }
            } finally {
                this.isLoading = false
            }
        },

        // Déconnexion
        async logout() {
            this.user = null
            this.token = null
            this.error = null

            if (process.client) {
                localStorage.removeItem('authToken')
                localStorage.removeItem('userData')
            }
        },

        // Mise à jour du profil
        async updateProfile(profileData) {
            this.isLoading = true
            this.error = null

            try {
                await new Promise(resolve => setTimeout(resolve, 1000))

                this.user = {
                    ...this.user,
                    ...profileData,
                    updatedAt: new Date().toISOString()
                }

                if (process.client) {
                    localStorage.setItem('userData', JSON.stringify(this.user))
                }

                return { success: true, user: this.user }

            } catch (error) {
                this.error = error.message
                return { success: false, error: error.message }
            } finally {
                this.isLoading = false
            }
        },

        // Réinitialiser l'erreur
        clearError() {
            this.error = null
        },

        // Vérifier la validité du token
        async validateToken() {
            if (!this.token) return false

            try {
                // En production, faire un appel API pour valider le token
                return true
            } catch (error) {
                this.logout()
                return false
            }
        },

        // Approuver une inscription (admin)
        async approveRegistration(registrationId) {
            if (process.client && this.isAdmin) {
                try {
                    const pendingRegistrations = JSON.parse(localStorage.getItem('pendingRegistrations') || '[]')
                    const registrationIndex = pendingRegistrations.findIndex(reg => reg.id === registrationId)

                    if (registrationIndex !== -1) {
                        const registration = pendingRegistrations[registrationIndex]

                        // Mettre à jour le statut
                        registration.adminValidation = {
                            ...registration.adminValidation,
                            status: 'approved',
                            reviewedBy: this.user?.name,
                            reviewedAt: new Date().toISOString(),
                            notes: 'Inscription approuvée'
                        }

                        // Créer le compte utilisateur activé
                        const activeUser = {
                            id: registration.id,
                            email: registration.email,
                            name: registration.name,
                            firstName: registration.firstName,
                            lastName: registration.lastName,
                            role: 'user',
                            status: 'active',
                            isActive: true,
                            createdAt: registration.submittedAt,
                            approvedAt: new Date().toISOString()
                        }

                        // Ajouter aux utilisateurs actifs
                        const users = JSON.parse(localStorage.getItem('users') || '[]')
                        users.push(activeUser)
                        localStorage.setItem('users', JSON.stringify(users))

                        // Sauvegarder les modifications
                        localStorage.setItem('pendingRegistrations', JSON.stringify(pendingRegistrations))

                        return { success: true, message: 'Inscription approuvée avec succès' }
                    }
                } catch (error) {
                    console.error('Erreur lors de l\'approbation:', error)
                    return { success: false, error: 'Erreur lors de l\'approbation' }
                }
            }
            return { success: false, error: 'Action non autorisée' }
        },

        // Refuser une inscription (admin)
        async rejectRegistration(registrationId, reason) {
            if (process.client && this.isAdmin) {
                try {
                    const pendingRegistrations = JSON.parse(localStorage.getItem('pendingRegistrations') || '[]')
                    const registrationIndex = pendingRegistrations.findIndex(reg => reg.id === registrationId)

                    if (registrationIndex !== -1) {
                        const registration = pendingRegistrations[registrationIndex]

                        // Mettre à jour le statut
                        registration.adminValidation = {
                            ...registration.adminValidation,
                            status: 'rejected',
                            reviewedBy: this.user?.name,
                            reviewedAt: new Date().toISOString(),
                            notes: reason || 'Inscription refusée'
                        }

                        // Sauvegarder les modifications
                        localStorage.setItem('pendingRegistrations', JSON.stringify(pendingRegistrations))

                        return { success: true, message: 'Inscription refusée' }
                    }
                } catch (error) {
                    console.error('Erreur lors du refus:', error)
                    return { success: false, error: 'Erreur lors du refus' }
                }
            }
            return { success: false, error: 'Action non autorisée' }
        }
    }
})