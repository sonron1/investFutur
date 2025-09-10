// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2025-07-15',
    devtools: { enabled: true },

    // Configuration CSS avec Tailwind
    css: [
        '~/assets/css/main.css'
    ],

    // Configuration PostCSS (déplacée depuis postcss.config.js)
    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {},
        },
    },

    // Configuration des modules nécessaires
    modules: [
        '@pinia/nuxt',
        '@nuxtjs/tailwindcss'
    ],

    // Configuration pour éviter les erreurs de build
    build: {
        transpile: []
    },

    // Correction pour les middlewares
    router: {
        options: {
            hashMode: false
        }
    },

    // Configuration des assets publics
    app: {
        head: {
            title: 'InvestFuture - Investissement dans l\'innovation durable',
            meta: [
                { charset: 'utf-8' },
                { name: 'viewport', content: 'width=device-width, initial-scale=1' },
                { name: 'description', content: 'Investissez dans l\'innovation durable dès 5000€. ROI moyen 18%.' }
            ],
            link: [
                // Font Awesome
                { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css' },
                // Google Fonts
                { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
                { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
                { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&display=swap' },
                // AOS Animation
                { rel: 'stylesheet', href: 'https://unpkg.com/aos@2.3.1/dist/aos.css' }
            ],
            script: [
                // AOS Animation
                { src: 'https://unpkg.com/aos@2.3.1/dist/aos.js', defer: true }
            ]
        }
    },

    // Configuration SSR optimisée pour éviter les mismatches
    ssr: true,

    // Configuration d'hydration
    experimental: {
        payloadExtraction: false
    },

    // Désactiver la prérendu pour les composants dynamiques
    nitro: {
        storage: {
            redis: {
                driver: 'redis',
                // configuration redis si nécessaire
            }
        }
    }
})