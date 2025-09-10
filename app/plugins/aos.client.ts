import { nextTick } from 'vue'

// Déclaration TypeScript pour AOS
declare global {
    interface Window {
        AOS?: {
            init: (options?: {
                duration?: number;
                easing?: string;
                once?: boolean;
                disable?: boolean | string;
                mirror?: boolean;
                anchorPlacement?: string;
                offset?: number;
                delay?: number;
                startEvent?: string;
            }) => void;
            refresh: () => void;
            refreshHard?: () => void;
        };
    }
}

export default defineNuxtPlugin(() => {
    if (process.client) {
        // Attendre que la page soit complètement hydratée
        const initAOS = () => {
            if (typeof window !== 'undefined' && window.AOS) {
                window.AOS.init({
                    duration: 800,
                    easing: 'ease-in-out',
                    once: true,
                    disable: false,
                    mirror: false,
                    anchorPlacement: 'top-bottom'
                })

                // Rafraîchir AOS après l'hydration
                setTimeout(() => {
                    if (window.AOS) {
                        window.AOS.refresh()
                    }
                }, 100)
            }
        }

        // Attendre l'hydration complète
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', initAOS)
        } else {
            // Le DOM est déjà chargé
            nextTick(() => {
                initAOS()
            })
        }
    }
})