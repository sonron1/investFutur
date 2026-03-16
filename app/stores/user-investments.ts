import { defineStore } from 'pinia'
import { useAuthStore } from './auth'

interface Investment {
  id: string
  sectorId: string
  projectId: string
  projectName: string
  amount: number
  currency: string
  paymentMethod: string
  status: 'PENDING' | 'ACTIVE' | 'COMPLETED' | 'CANCELLED'
  expectedRoi: number
  durationMonths: number
  maturityDate: string | null
  createdAt: string
}

interface InvestmentState {
  investments: Investment[]
  isLoading: boolean
  error: string | null
  meta: { total: number; page: number; totalPages: number } | null
}

export const useInvestmentStore = defineStore('investments', {
  state: (): InvestmentState => ({
    investments: [],
    isLoading: false,
    error: null,
    meta: null,
  }),

  getters: {
    count: (state) => state.investments.length,
    totalAmount: (state) =>
      state.investments
        .filter((i) => i.status === 'ACTIVE' || i.status === 'COMPLETED')
        .reduce((sum, i) => sum + i.amount, 0),
    activeInvestments: (state) => state.investments.filter((i) => i.status === 'ACTIVE'),
    pendingInvestments: (state) => state.investments.filter((i) => i.status === 'PENDING'),
  },

  actions: {
    async fetchInvestments(params: { status?: string; page?: number } = {}) {
      const auth = useAuthStore()
      this.isLoading = true
      this.error = null

      try {
        const query = new URLSearchParams()
        if (params.status) query.set('status', params.status)
        if (params.page) query.set('page', String(params.page))

        const { data, meta } = await $fetch<{ data: Investment[]; meta: any }>(
          `/api/investments?${query}`,
          { headers: auth.getAuthHeaders() }
        )
        this.investments = data
        this.meta = meta
      } catch (err: any) {
        this.error = err?.data?.message ?? 'Erreur lors du chargement des investissements'
      } finally {
        this.isLoading = false
      }
    },

    async addInvestment(payload: {
      sectorId: string
      projectId: string
      projectName: string
      amount: number
      paymentMethod: string
      expectedRoi: number
      durationMonths?: number
    }) {
      const auth = useAuthStore()
      this.isLoading = true
      this.error = null

      try {
        const { data } = await $fetch<{ data: Investment }>('/api/investments', {
          method: 'POST',
          body: payload,
          headers: auth.getAuthHeaders(),
        })
        this.investments.unshift(data)
        return { success: true, investment: data }
      } catch (err: any) {
        const message = err?.data?.message ?? 'Erreur lors de l\'investissement'
        this.error = message
        return { success: false, error: message }
      } finally {
        this.isLoading = false
      }
    },

    async cancelInvestment(id: string) {
      const auth = useAuthStore()

      try {
        await $fetch(`/api/investments/${id}`, {
          method: 'DELETE',
          headers: auth.getAuthHeaders(),
        })
        const idx = this.investments.findIndex((i) => i.id === id)
        if (idx !== -1) this.investments[idx].status = 'CANCELLED'
        return { success: true }
      } catch (err: any) {
        return { success: false, error: err?.data?.message ?? 'Erreur' }
      }
    },
  },
})
