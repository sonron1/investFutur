export const usePageRefresh = () => {
  const resetModals = () => {
    if (process.client) {
      const selectedSector = useState('selectedSector', () => null)
      const investmentModalOpen = useState('investmentModalOpen', () => false)
      selectedSector.value = null
      investmentModalOpen.value = false
    }
  }

  return { resetModals }
}
