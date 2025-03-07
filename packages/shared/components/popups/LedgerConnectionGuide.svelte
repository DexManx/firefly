<script lang="typescript">
    import { Animation, Button, Illustration, Link, Text } from 'shared/components'
    import { Platform } from 'shared/lib/platform'
    import { closePopup } from 'shared/lib/popup'
    import { Locale } from 'shared/lib/typings/i18n'

    export let locale: Locale

    let stepIndex = 0
    const stepAnimations = [
        'ledger-background-live-desktop',
        'ledger-pin-desktop',
        'ledger-open-app-desktop',
        'ledger-support',
    ]

    function changeIndex(increment) {
        stepIndex += increment
    }

    function handleCloseClick() {
        closePopup()
    }
</script>

<Text type="h4" classes="mb-6">{locale('popups.ledgerConnectionGuide.title')}</Text>
<div class="w-full flex flex-row flex-wrap relative z-0">
    <div class="illustration-wrapper relative w-full bg-white dark:bg-gray-900 flex justify-center items-center z-0">
        <div class="animation absolute transform top-2.5 left-1/2 -translate-x-1/2 z-0">
            <Animation animation="ledger-bg-desktop" />
        </div>
        <Illustration illustration={stepAnimations[stepIndex]} />
    </div>
    <div class="w-full text-center my-9 px-10 z-10">
        {#if typeof locale(`popups.ledgerConnectionGuide.steps.${stepIndex}`) === 'string'}
            <Text secondary classes="inline-block">{locale(`popups.ledgerConnectionGuide.steps.${stepIndex}`)}</Text>
        {:else}
            <Text secondary classes="inline-block"
                >{locale(`popups.ledgerConnectionGuide.steps.${stepIndex}.text`)}</Text
            >
            <Link
                classes="ml-0.5 inline-block text-13 leading-160"
                onClick={() =>
                    Platform.openUrl(
                        'https://support.ledger.com/hc/en-us/articles/360019868977-Fix-USB-connection-issues-with-Ledger-Live?support=true'
                    )}
            >
                {locale(`popups.ledgerConnectionGuide.steps.${stepIndex}.link`)}
            </Link>
        {/if}
    </div>
    <div class="w-full flex flex-row flex-nowrap space-x-4 z-10">
        <Button classes="w-1/2" secondary onClick={() => changeIndex(-1)} disabled={stepIndex === 0}>
            {locale('actions.previous')}
        </Button>
        {#if stepIndex < Object.keys(locale('popups.ledgerConnectionGuide.steps')).length - 1}
            <Button classes="w-1/2" secondary onClick={() => changeIndex(1)}>{locale('actions.next')}</Button>
        {:else}
            <Button classes="w-1/2" primary onClick={handleCloseClick}>{locale('actions.close')}</Button>
        {/if}
    </div>
</div>

<style type="text/scss">
    .illustration-wrapper {
        height: 320px;
        .animation {
            width: 117%;
            height: 117%;
        }
        :global(img) {
            min-height: 280px;
            max-width: 100%;
            object-position: 0 -3px;
            z-index: 1;
        }
    }
</style>
