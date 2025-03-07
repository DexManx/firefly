<script lang="typescript">
    import { Animation, Button, OnboardingLayout, Pin, Text } from 'shared/components'
    import { mobile } from 'shared/lib/app'
    import { Locale } from 'shared/lib/typings/i18n'
    import { validatePinFormat } from 'shared/lib/utils'
    import { createEventDispatcher } from 'svelte'

    export let locale: Locale

    export let pinCandidate
    export let busy = false

    let pinInput
    let error = ''

    const dispatch = createEventDispatcher()

    $: pinInput, (error = '')

    function onSubmit() {
        error = ''
        if (validatePinFormat(pinInput)) {
            if (pinInput !== pinCandidate) {
                error = locale('error.pincode.match')
            } else {
                dispatch('next')
            }
        }
    }
    function handleBackClick() {
        dispatch('previous')
    }
</script>

<OnboardingLayout onBackClick={handleBackClick} {busy}>
    <div slot="title">
        <Text type="h2">{locale('views.confirmPin.title')}</Text>
    </div>
    <div slot="leftpane__content">
        <Text type="p" secondary classes="mb-4">{locale('views.confirmPin.body1')}</Text>
        <Text type="p" secondary classes="mb-8">{locale('views.confirmPin.body2')}</Text>
        <Pin
            bind:value={pinInput}
            glimpse
            classes="w-full mx-auto block"
            on:submit={onSubmit}
            autofocus
            disabled={busy}
            {error}
        />
    </div>
    <div slot="leftpane__action" class="flex flex-row flex-wrap justify-between items-center space-x-4">
        <Button classes="flex-1" disabled={!validatePinFormat(pinInput) || busy} onClick={() => onSubmit()}>
            {locale('actions.confirmPin')}
        </Button>
    </div>
    <div slot="rightpane" class="w-full h-full flex justify-center {!$mobile && 'bg-pastel-pink dark:bg-gray-900'}">
        <Animation classes="setup-anim-aspect-ratio" animation="repeat-pin-desktop" />
    </div>
</OnboardingLayout>
