import type { INotificationManager } from 'shared/lib/typings/notificationManager'

/**
 * Create and show a native notification
 * @param {string} message - the notification message
 * @param {any} metadata - data to associate with the notification
 */
export const NotificationManager: INotificationManager = {
    notify: (message, contextData) => {
        const notification = new Notification('Firefly', {
            body: message,
            data: contextData,
        })

        notification.onclick = (event) => {}
    },
}
