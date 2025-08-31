// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2025-07-15',
    devtools: { enabled: true },

    // Configuration pour les styles CSS
    css: [
        '~/assets/css/style.css'
    ],

    // Configuration des modules nécessaires
    modules: [
        '@pinia/nuxt' // Pour la gestion d'état
    ],

    // Configuration pour éviter les erreurs de build
    build: {
        transpile: []
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
                // Bootstrap CSS
                { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css' },
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
                // Bootstrap JS
                { src: 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js', defer: true },
                // AOS Animation
                { src: 'https://unpkg.com/aos@2.3.1/dist/aos.js', defer: true }
            ]
        }
    },

    // Configuration pour éviter les erreurs SSR
    ssr: true,

    // Optimisation des images
    images: {
        domains: ['images.unsplash.com'],
        quality: 80
    }
})