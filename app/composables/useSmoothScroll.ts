export const useSmoothScroll = () => {
    const scrollToSection = (sectionId: string) => {
        if (process.client) {
            const element = document.getElementById(sectionId)
            if (element) {
                element.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                })
            }
        }
    }

    return {
        scrollToSection
    }
}