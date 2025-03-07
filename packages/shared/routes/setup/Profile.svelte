<script lang="typescript">
    import { createEventDispatcher } from 'svelte'
    import { get } from 'svelte/store'
    import { initAppSettings } from 'shared/lib/appSettings'
    import { cleanupSignup, mobile } from 'shared/lib/app'
    import {
        Animation,
        Button,
        ButtonCheckbox,
        Input,
        OnboardingLayout,
        Text,
        CollapsibleBlock,
    } from 'shared/components'
    import { initialiseMigrationListeners } from 'shared/lib/migration'
    import { showAppNotification } from 'shared/lib/notifications'
    import { openPopup } from 'shared/lib/popup'
    import {
        cleanupInProgressProfiles,
        storeProfile,
        disposeNewProfile,
        hasNoProfiles,
        newProfile,
        validateProfileName,
    } from 'shared/lib/profile'
    import { destroyActor, getProfileDataPath, initialise } from 'shared/lib/wallet'
    import type { Locale } from 'shared/lib/typings/i18n'
    import { Platform } from 'shared/lib/platform'

    export let locale: Locale

    let error = ''
    let busy = false

    const dispatch = createEventDispatcher()

    let profileName = $newProfile?.name ?? ''
    let isDeveloperProfile = $newProfile?.isDeveloperProfile ?? false

    $: isProfileNameValid = profileName && profileName.trim()
    $: profileName, (error = '') // Error clears when profileName changes
    $: nameChanged = $newProfile?.name !== profileName.trim()
    $: hasDeveloperProfileChanged = $newProfile?.isDeveloperProfile !== isDeveloperProfile

    async function handleContinueClick(): Promise<void> {
        const trimmedProfileName = profileName.trim()
        try {
            validateProfileName(trimmedProfileName)
        } catch (err) {
            return (error = err.message)
        }
        cleanUpIfPreviouslyInitialized()
        await initialiseProfile(trimmedProfileName)
    }

    function cleanUpIfPreviouslyInitialized(): void {
        const previousInitializedId = $newProfile?.id
        if ((nameChanged || hasDeveloperProfileChanged) && previousInitializedId) {
            destroyActor(previousInitializedId)
        }
    }

    async function initialiseProfile(name: string): Promise<void> {
        try {
            busy = true
            if (nameChanged || hasDeveloperProfileChanged) {
                storeProfile(name, isDeveloperProfile)

                const path = await getProfileDataPath($newProfile.name)
                const machineId = await Platform.getMachineId()
                const { sendCrashReports } = $initAppSettings
                initialise($newProfile.id, path, sendCrashReports, machineId)
                initialiseMigrationListeners()
            }

            if (isDeveloperProfile) {
                openPopup({
                    type: 'confirmDeveloperProfile',
                    props: {
                        handleContinueClick: () => dispatch('next'),
                    },
                })
            } else {
                dispatch('next')
            }
        } catch (err) {
            showAppNotification({
                type: 'error',
                message: locale(err.error ? err.error : 'error.global.generic'),
            })
        } finally {
            busy = false
        }
    }

    async function handleBackClick() {
        cleanupSignup()
        cleanupInProgressProfiles()
        await disposeNewProfile()
        dispatch('previous')
    }
</script>

<OnboardingLayout onBackClick={handleBackClick} {busy}>
    <div slot="title">
        <Text type="h2">{locale('views.profile.title')}</Text>
    </div>
    <div slot="leftpane__content">
        <Text type="p" secondary classes="mb-4">{locale('views.profile.body1')}</Text>
        <Text type="p" secondary classes={$mobile ? 'mb-4' : 'mb-10'}>
            {locale(`views.profile.body2.${hasNoProfiles() ? 'first' : 'nonFirst'}`)}
            {locale('views.profile.addMore')}
        </Text>
        <Input
            {error}
            bind:value={profileName}
            placeholder={locale('views.profile.profileName')}
            classes="w-full mb-6"
            autofocus
            disabled={busy}
            submitHandler={handleContinueClick}
        />
        <CollapsibleBlock
            label={locale('views.profile.advancedOptions')}
            showBlock={get(newProfile)?.isDeveloperProfile ?? false}
        >
            <ButtonCheckbox icon="dev" bind:value={isDeveloperProfile}>
                <div class="text-left">
                    <Text type="p">{locale('views.profile.developer.label')}</Text>
                    <Text type="p" secondary>{locale('views.profile.developer.info')}</Text>
                </div>
            </ButtonCheckbox>
        </CollapsibleBlock>
    </div>
    <div slot="leftpane__action" class="flex flex-col">
        <Button classes="w-full" disabled={!isProfileNameValid || busy} onClick={handleContinueClick}>
            {locale('actions.continue')}
        </Button>
    </div>
    <div slot="rightpane" class="w-full h-full flex justify-center {!$mobile && 'bg-pastel-green dark:bg-gray-900'}">
        <Animation animation="profile-desktop" />
    </div>
</OnboardingLayout>
