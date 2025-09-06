
export const usePageRefresh = () => {
    const refreshKey = ref(0)

    const forceRefresh = () => {
        refreshKey.value++
    }

    const resetModals = () => {
        if (process.client) {
            // Réinitialiser les états de modal
            useState('selectedSector', () => null).value = null
            useState('investmentModalOpen', () => false).value = false
        }
    }

    return {
        refreshKey: readonly(refreshKey),
        forceRefresh,
        resetModals
    }
}