<script lang="typescript">
    import { Icon } from 'shared/components'
    import { mobile } from 'shared/lib/app'
    import { isLocaleLoaded } from 'shared/lib/i18n'
    import { dashboardRoute, previousDashboardRoute, settingsChildRoute, settingsRoute } from 'shared/lib/router'
    import { SettingsRoutes } from 'shared/lib/typings/routes'
    import { onDestroy } from 'svelte'
    import { get } from 'svelte/store'
    import { SettingsHome, SettingsViewer } from './views'

    export let handleClose: () => void

    function closeSettings(): void {
        dashboardRoute.set(get(previousDashboardRoute))
        previousDashboardRoute.set(undefined)
    }

    onDestroy((): void => {
        // When a new locale is loaded the pages are reloaded
        // so don't reset the router in this case
        if ($isLocaleLoaded) {
            settingsRoute.set(SettingsRoutes.Init)
            settingsChildRoute.set(null)
        }
    })
</script>

<div
    class="relative h-full w-full px-6 pb-10 md:px-16 md:py-12 md:bg-white md:dark:bg-gray-900 flex flex-1 {$settingsRoute !==
        SettingsRoutes.Init && 'md:pt-20'} "
>
    {#if !$mobile}
        <button on:click={handleClose || closeSettings} class="absolute top-8 right-8">
            <Icon icon="close" classes="text-gray-800 dark:text-white" />
        </button>
    {/if}
    {#if $settingsRoute === SettingsRoutes.Init}
        <SettingsHome />
    {:else}
        <SettingsViewer />
    {/if}
</div>
