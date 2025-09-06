export default defineNuxtPlugin(() => {
    if (process.client) {
        const init = () => {
            // @ts-ignore
            if (window.AOS && typeof window.AOS.init === 'function') {
                // @ts-ignore
                window.AOS.init({ duration: 700, once: true })
            }
        }
        if (document.readyState === 'complete' || document.readyState === 'interactive') {
            init()
        } else {
            window.addEventListener('DOMContentLoaded', init)
        }
    }
})