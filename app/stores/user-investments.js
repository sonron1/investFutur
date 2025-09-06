import { defineStore } from 'pinia'

export const useUserInvestmentsStore = defineStore('userInvestments', {
    state: () => ({
        investments: [] // { id, sector, project, amount, date, roi, status }
    }),

    getters: {
        count: (state) => state.investments.length,
        totalAmount: (state) => state.investments.reduce((sum, it) => sum + Number(it.amount || 0), 0),
        totalGains: (state) =>
            state.investments.reduce((sum, it) => {
                const amount = Number(it.amount || 0)
                const roi = Number(it.roi || 0)
                return sum + (amount * roi) / 100
            }, 0),
        avgRoi() {
            const total = this.totalAmount
            if (!total) return 0
            return (this.totalGains / total) * 100
        }
    },

    actions: {
        loadFromStorage() {
            if (!process.client) return
            try {
                const raw = localStorage.getItem('userInvestments')
                if (raw) {
                    const parsed = JSON.parse(raw)
                    if (Array.isArray(parsed)) {
                        this.investments = parsed
                    }
                }
            } catch {
                // noop
            }
        },
        saveToStorage() {
            if (!process.client) return
            try {
                localStorage.setItem('userInvestments', JSON.stringify(this.investments))
            } catch {
                // noop
            }
        },
        addInvestment({ sector, project, amount, roi, status = 'actif', date = new Date().toISOString() }) {
            const id = typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : String(Date.now())
            const record = {
                id,
                sector,
                project,
                amount: Number(amount),
                roi: Number(roi ?? 0),
                status,
                date
            }
            this.investments.unshift(record)
            this.saveToStorage()
            return record
        },
        removeInvestment(id) {
            this.investments = this.investments.filter((it) => it.id !== id)
            this.saveToStorage()
        },
        clearAll() {
            this.investments = []
            this.saveToStorage()
        }
    }
})