<script lang="typescript">
    import { Button, Text } from 'shared/components'
    import { localize } from 'shared/lib/i18n'
    import { openPopup } from 'shared/lib/popup'

    function handleDeleteClick() {
        openPopup({ type: 'deleteProfile' })
    }
</script>

<Text type="h4" classes="mb-3">{localize('views.settings.deleteProfile.title')}</Text>
<Text type="p" secondary classes="mb-5">{localize('views.settings.deleteProfile.description')}</Text>
<Button medium inlineStyle="min-width: 156px;" warning onClick={handleDeleteClick}>
    {localize('views.settings.deleteProfile.title')}
</Button>
