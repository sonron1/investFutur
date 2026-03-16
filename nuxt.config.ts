// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  css: ['~/assets/css/main.css'],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  modules: ['@pinia/nuxt', '@nuxtjs/tailwindcss'],

  router: {
    options: { hashMode: false },
  },

  app: {
    head: {
      title: 'InvestFutur — Plateforme d\'investissement nouvelle génération',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content: 'Investissez dans l\'innovation durable. IA, biotech, énergies renouvelables. ROI moyen 22%.',
        },
      ],
      link: [
        { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&display=swap',
        },
        { rel: 'stylesheet', href: 'https://unpkg.com/aos@2.3.1/dist/aos.css' },
      ],
      script: [{ src: 'https://unpkg.com/aos@2.3.1/dist/aos.js', defer: true }],
    },
  },

  ssr: true,

  experimental: {
    payloadExtraction: false,
  },

  runtimeConfig: {
    jwtSecret: '',
    jwtRefreshSecret: '',
    resendApiKey: '',
    databaseUrl: '',
    public: {
      appUrl: 'http://localhost:3000',
      appName: 'InvestFutur',
    },
  },

})
