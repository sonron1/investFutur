import { nextTick, onMounted } from 'vue'

// Déclaration TypeScript pour AOS
declare global {
    interface Window {
        AOS?: {
            init: (options?: any) => void;
            refresh: () => void;
            refreshHard?: () => void;
        };
    }
}

export const useAOS = () => {
    const refreshAOS = () => {
        if (process.client && window.AOS) {
            nextTick(() => {
                window.AOS!.refresh()
            })
        }
    }

    const initAOSOnMount = () => {
        onMounted(() => {
            if (process.client) {
                setTimeout(() => {
                    refreshAOS()
                }, 100)
            }
        })
    }

    return {
        refreshAOS,
        initAOSOnMount
    }
}