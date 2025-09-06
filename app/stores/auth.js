
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null,
        token: null,
        isAuthenticated: false
    }),

    getters: {
        isAdmin: (state) => state.user?.role === 'admin'
    },

    actions: {
        async login(credentials) {
            try {
                // Comptes prédéfinis pour le prototype
                let mockResponse = null;

                if (credentials.email === 'admin@investfuture.com' && credentials.password === 'admin123') {
                    mockResponse = {
                        user: {
                            id: 1,
                            name: 'Admin',
                            email: credentials.email,
                            role: 'admin'
                        },
                        token: 'admin-token-' + Date.now()
                    }
                } else {
                    mockResponse = {
                        user: {
                            id: Date.now(),
                            name: credentials.email.split('@')[0],
                            email: credentials.email,
                            role: 'user'
                        },
                        token: 'mock-jwt-token-' + Date.now()
                    }
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
                return { success: false, error: error.message }
            }
        },

        // ... existing code ...
        async register(userData) {
            try {
                const mockResponse = {
                    user: {
                        id: Date.now(),
                        name: userData.name,
                        email: userData.email,
                        role: 'user'
                    },
                    token: 'mock-jwt-token-' + Date.now()
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
                return { success: false, error: error.message }
            }
        },

        logout() {
            this.user = null
            this.token = null
            this.isAuthenticated = false

            if (process.client) {
                localStorage.removeItem('auth-token')
                localStorage.removeItem('user')
            }
        },

        initAuth() {
            if (process.client) {
                const token = localStorage.getItem('auth-token')
                const user = localStorage.getItem('user')

                if (token && user) {
                    try {
                        this.token = token
                        this.user = JSON.parse(user)
                        this.isAuthenticated = true
                    } catch (error) {
                        console.error('Erreur lors de l\'initialisation auth:', error)
                        this.logout()
                    }
                }
            }
        }
    }
})