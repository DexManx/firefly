<script lang="typescript">
    import { Button, Text } from 'shared/components'
    import { localize } from 'shared/lib/i18n'
    import { Platform } from 'shared/lib/platform'
    import { ExternalRoute, HelpAndInfo } from 'shared/lib/typings/routes'

    export let route: HelpAndInfo
    export let url: ExternalRoute
    export let actionLocale: string

    const handleClick = () => {
        Platform.openUrl(url)
    }
</script>

<Text type="h4" classes="mb-3">{localize(`views.settings.${route}.title`)}</Text>
<Text type="p" secondary classes="mb-5">{localize(`views.settings.${route}.description`)}</Text>
<Button medium inlineStyle="min-width: 156px;" onClick={handleClick}>{localize(`actions.${actionLocale}`)}</Button>
