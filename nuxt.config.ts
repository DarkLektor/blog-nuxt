// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: {enabled: true},
    css: ['~/assets/styles/main.scss'],
    runtimeConfig: {
        public: {
            baseUrl: process.env.BASE_URL
        }
    },
    plugins: [
        {src: '~/plugins/toast.ts', mode: 'client'}
    ]
})
