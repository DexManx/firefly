<script lang="typescript">
    import { Checkbox, Text } from 'shared/components'
    import { appSettings } from 'shared/lib/appSettings'
    import { localize } from 'shared/lib/i18n'

    let notificationsChecked = $appSettings.notifications

    $: $appSettings.notifications = notificationsChecked
</script>

<Text type="h4" classes="mb-3">{localize('views.settings.notifications.title')}</Text>
<Text type="p" secondary classes="mb-5">{localize('views.settings.notifications.description')}</Text>
<Checkbox label={localize('actions.enableSystemNotifications')} bind:checked={notificationsChecked} />
