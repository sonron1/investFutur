
export default defineNuxtRouteMiddleware(async (to, from) => {
    if (process.client) {
        const {useAuthStore} = await import('~/stores/auth')
        const authStore = useAuthStore()

        if (!authStore.isAuthenticated || !authStore.isAdmin) {
            return navigateTo('/dashboard')
        }
    }
})