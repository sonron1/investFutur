export default defineNuxtRouteMiddleware((to) => {
    const { $auth } = useNuxtApp()

    if (process.client) {
        const authStore = useAuthStore()

        if (!authStore.isAuthenticated || !authStore.isAdmin) {
            return navigateTo('/dashboard')
        }
    }
})