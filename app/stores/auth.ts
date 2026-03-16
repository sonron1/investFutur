import { defineStore } from 'pinia'

interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  role: 'USER' | 'ADMIN'
  isVerified: boolean
  kycStatus: 'PENDING' | 'SUBMITTED' | 'APPROVED' | 'REJECTED'
  kycTier: number
}

interface AuthState {
  user: User | null
  accessToken: string | null
  isLoading: boolean
  error: string | null
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    user: null,
    accessToken: null,
    isLoading: false,
    error: null,
  }),

  getters: {
    isAuthenticated: (state) => !!state.user && !!state.accessToken,
    isAdmin: (state) => state.user?.role === 'ADMIN',
    isVerified: (state) => state.user?.isVerified === true,
    fullName: (state) => state.user ? `${state.user.firstName} ${state.user.lastName}` : '',
  },

  actions: {
    // Called from auth.client.ts plugin on app start
    async initAuth() {
      if (!import.meta.client) return

      const token = sessionStorage.getItem('accessToken')
      if (!token) return

      this.accessToken = token

      try {
        const { data } = await $fetch<{ data: User }>('/api/auth/me', {
          headers: { Authorization: `Bearer ${token}` },
        })
        this.user = data
      } catch {
        // Token invalid or expired — try refresh
        await this.refreshToken()
      }
    },

    async refreshToken() {
      try {
        const { data } = await $fetch<{ data: { accessToken: string } }>('/api/auth/refresh', {
          method: 'POST',
        })
        this.accessToken = data.accessToken
        if (import.meta.client) {
          sessionStorage.setItem('accessToken', data.accessToken)
        }
        // Re-fetch user
        const { data: user } = await $fetch<{ data: User }>('/api/auth/me', {
          headers: { Authorization: `Bearer ${data.accessToken}` },
        })
        this.user = user
      } catch {
        this.clearAuth()
      }
    },

    async register(payload: {
      email: string
      password: string
      firstName: string
      lastName: string
      phone?: string
      country?: string
      acceptTerms: boolean
      acceptMarketing?: boolean
    }) {
      this.isLoading = true
      this.error = null

      try {
        const { data } = await $fetch<{ data: { message: string } }>('/api/auth/register', {
          method: 'POST',
          body: payload,
        })
        return { success: true, message: data.message }
      } catch (err: any) {
        const message = err?.data?.message ?? 'Erreur lors de l\'inscription'
        this.error = message
        return { success: false, error: message }
      } finally {
        this.isLoading = false
      }
    },

    async login(credentials: { email: string; password: string; rememberMe?: boolean }) {
      this.isLoading = true
      this.error = null

      try {
        const { data } = await $fetch<{ data: { accessToken: string; user: User } }>('/api/auth/login', {
          method: 'POST',
          body: credentials,
        })

        this.accessToken = data.accessToken
        this.user = data.user

        if (import.meta.client) {
          sessionStorage.setItem('accessToken', data.accessToken)
        }

        return { success: true, user: data.user }
      } catch (err: any) {
        const message = err?.data?.message ?? 'Email ou mot de passe incorrect'
        this.error = message
        return { success: false, error: message }
      } finally {
        this.isLoading = false
      }
    },

    async logout() {
      try {
        await $fetch('/api/auth/logout', { method: 'POST' })
      } catch {}
      this.clearAuth()
      await navigateTo('/auth/login')
    },

    clearAuth() {
      this.user = null
      this.accessToken = null
      this.error = null
      if (import.meta.client) {
        sessionStorage.removeItem('accessToken')
      }
    },

    clearError() {
      this.error = null
    },

    // Returns Authorization header for $fetch calls
    getAuthHeaders(): Record<string, string> {
      if (!this.accessToken) return {}
      return { Authorization: `Bearer ${this.accessToken}` }
    },
  },
})
