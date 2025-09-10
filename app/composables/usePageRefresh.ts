export const usePageRefresh = () => {
    const refreshKey = ref(0)

    const forceRefresh = () => {
        refreshKey.value++

        // Rafraîchir AOS si disponible
        if (process.client && window.AOS) {
            nextTick(() => {
                window.AOS!.refresh()
            })
        }
    }

    const resetModals = () => {
        if (process.client) {
            // Réinitialiser les états de modal
            const selectedSector = useState('selectedSector', () => null)
            const investmentModalOpen = useState('investmentModalOpen', () => false)

            selectedSector.value = null
            investmentModalOpen.value = false
        }
    }

    const markPageForRefresh = () => {
        if (process.client) {
            sessionStorage.setItem('shouldRefreshHome', 'true')
        }
    }

    const shouldRefresh = () => {
        if (process.client) {
            const should = sessionStorage.getItem('shouldRefreshHome') === 'true'
            if (should) {
                sessionStorage.removeItem('shouldRefreshHome')
                return true
            }
        }
        return false
    }

    return {
        refreshKey: readonly(refreshKey),
        forceRefresh,
        resetModals,
        markPageForRefresh,
        shouldRefresh
    }
}