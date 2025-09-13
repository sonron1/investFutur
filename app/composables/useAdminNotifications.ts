
// Interface pour définir la structure d'une notification
interface AdminNotification {
    id: string
    type: string
    priority: string
    title: string
    message: string
    data?: any
    createdAt: string
    read: boolean
}

// Interface pour les données d'entrée d'une notification
interface NotificationInput {
    type: string
    priority?: string
    title: string
    message: string
    data?: any
}

export const useAdminNotifications = () => {
    const notifications = ref<AdminNotification[]>([])

    const addNotification = (notification: NotificationInput): AdminNotification => {
        const newNotification: AdminNotification = {
            id: Date.now().toString(),
            type: notification.type,
            priority: notification.priority || 'medium',
            title: notification.title,
            message: notification.message,
            data: notification.data,
            createdAt: new Date().toISOString(),
            read: false
        }

        // Ajouter la notification
        notifications.value.unshift(newNotification)

        // Sauvegarder en localStorage (temporaire pour la démo)
        if (process.client) {
            const existing = JSON.parse(localStorage.getItem('adminNotifications') || '[]')
            existing.unshift(newNotification)
            localStorage.setItem('adminNotifications', JSON.stringify(existing))
        }

        return newNotification
    }

    const loadNotifications = (): void => {
        if (process.client) {
            const stored = localStorage.getItem('adminNotifications')
            if (stored) {
                try {
                    notifications.value = JSON.parse(stored) as AdminNotification[]
                } catch (error) {
                    console.error('Erreur lors du chargement des notifications:', error)
                    notifications.value = []
                }
            }
        }
    }

    const markAsRead = (notificationId: string): void => {
        const notification = notifications.value.find(n => n.id === notificationId)
        if (notification) {
            notification.read = true

            if (process.client) {
                localStorage.setItem('adminNotifications', JSON.stringify(notifications.value))
            }
        }
    }

    const markAllAsRead = (): void => {
        notifications.value.forEach(notification => {
            notification.read = true
        })

        if (process.client) {
            localStorage.setItem('adminNotifications', JSON.stringify(notifications.value))
        }
    }

    const removeNotification = (notificationId: string): void => {
        const index = notifications.value.findIndex(n => n.id === notificationId)
        if (index !== -1) {
            notifications.value.splice(index, 1)

            if (process.client) {
                localStorage.setItem('adminNotifications', JSON.stringify(notifications.value))
            }
        }
    }

    const clearAllNotifications = (): void => {
        notifications.value = []

        if (process.client) {
            localStorage.removeItem('adminNotifications')
        }
    }

    const getUnreadCount = computed((): number => {
        return notifications.value.filter(n => !n.read).length
    })

    const getNotificationsByType = (type: string) => computed((): AdminNotification[] => {
        return notifications.value.filter(n => n.type === type)
    })

    const getNotificationsByPriority = (priority: string) => computed((): AdminNotification[] => {
        return notifications.value.filter(n => n.priority === priority)
    })

    return {
        notifications: readonly(notifications),
        addNotification,
        loadNotifications,
        markAsRead,
        markAllAsRead,
        removeNotification,
        clearAllNotifications,
        unreadCount: getUnreadCount,
        getNotificationsByType,
        getNotificationsByPriority
    }
}