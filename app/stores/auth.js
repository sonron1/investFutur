
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
        error: null
    }),

    getters: {
        isAdmin: (state) => state.user?.role === 'admin',
        userName: (state) => state.user?.name || '',
        userEmail: (state) => state.user?.email || ''
    },

    actions: {
        // Initialisation de l'auth depuis le localStorage
        initAuth() {
            if (process.client) {
                const token = localStorage.getItem('auth-token')
                const userData = localStorage.getItem('user')

                if (token && userData) {
                    try {
                        this.token = token
                        this.user = JSON.parse(userData)
                        this.isAuthenticated = true
                    } catch (error) {
                        console.error('Erreur lors de la récupération des données utilisateur:', error)
                        this.logout()
                    }
                }
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
            // Simulation de vérification côté serveur
            const existingEmails = ['test@exist.com', 'admin@investfuture.com', 'demo@test.fr']
            return existingEmails.includes(email.toLowerCase())
        },

        // Inscription améliorée
        async register(userData) {
            this.isLoading = true
            this.error = null

            try {
                // Validation des données
                const validationErrors = this.validateRegistrationData(userData)
                if (validationErrors.length > 0) {
                    throw new Error(validationErrors[0])
                }

                // Vérification de l'existence de l'email
                const emailExists = await this.checkEmailExists(userData.email)
                if (emailExists) {
                    throw new Error('Cet email est déjà utilisé. Essayez de vous connecter ou utilisez un autre email.')
                }

                // Simulation d'appel API avec délai réaliste
                await new Promise(resolve => setTimeout(resolve, 1500))

                // Données complètes pour la simulation
                const completeUserData = {
                    id: Date.now(),
                    name: userData.name || `${userData.firstName} ${userData.lastName}`,
                    email: userData.email.toLowerCase(),
                    firstName: userData.firstName,
                    lastName: userData.lastName,
                    role: 'user',
                    personType: userData.personType,
                    telephone: userData.telephone,
                    dateNaissance: userData.dateNaissance,
                    adresse: userData.adresse,
                    ville: userData.ville,
                    codePostal: userData.codePostal,
                    createdAt: new Date().toISOString(),
                    isVerified: false,
                    investmentProfile: {
                        totalInvested: 0,
                        portfolioValue: 0,
                        riskProfile: 'moderate'
                    }
                }

                const mockResponse = {
                    user: completeUserData,
                    token: 'invest-jwt-token-' + Date.now(),
                    message: 'Compte créé avec succès'
                }

                // Mise à jour du store
                this.user = mockResponse.user
                this.token = mockResponse.token
                this.isAuthenticated = true

                // Sauvegarde dans localStorage
                if (process.client) {
                    localStorage.setItem('auth-token', mockResponse.token)
                    localStorage.setItem('user', JSON.stringify(mockResponse.user))
                }

                return {
                    success: true,
                    user: mockResponse.user,
                    message: mockResponse.message
                }

            } catch (error) {
                this.error = error.message
                return {
                    success: false,
                    error: error.message
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
                            role: 'user'
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
                            role: 'admin'
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
                this.isAuthenticated = true

                if (process.client) {
                    localStorage.setItem('auth-token', mockResponse.token)
                    localStorage.setItem('user', JSON.stringify(mockResponse.user))
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
        logout() {
            this.user = null
            this.token = null
            this.isAuthenticated = false
            this.error = null

            if (process.client) {
                localStorage.removeItem('auth-token')
                localStorage.removeItem('user')
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
                    localStorage.setItem('user', JSON.stringify(this.user))
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
        }
    }
})