import { useAuthStore } from '~/stores/auth'

export default defineNuxtRouteMiddleware((to) => {
  const auth = useAuthStore()

  const publicRoutes = [
    '/',
    '/about',
    '/faq',
    '/help',
    '/legal',
    '/privacy',
    '/terms',
    '/cookie',
    '/auth/login',
    '/auth/register',
    '/auth/forgot-password',
    '/auth/verify-email',
    '/auth/reset-password',
  ]

  const isPublic = publicRoutes.includes(to.path) || to.path.startsWith('/auth/')

  if (!isPublic && !auth.isAuthenticated) {
    return navigateTo(`/auth/login?redirect=${encodeURIComponent(to.fullPath)}`)
  }
})
