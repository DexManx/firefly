<script lang="typescript">
    import { Text } from 'shared/components'
    import { localize } from 'shared/lib/i18n'
    import { participationOverview, stakingEventState } from 'shared/lib/participation/stores'
    import { ParticipationEventState, ParticipationOverview, StakingAirdrop } from 'shared/lib/participation/types'

    export let airdrop: StakingAirdrop

    const isStakedForAirdrop = (overview: ParticipationOverview): boolean =>
        overview.some((_overview) => {
            if (airdrop === StakingAirdrop.Assembly) {
                return _overview.assemblyStakedFunds > 0
            }
            return _overview.shimmerStakedFunds > 0
        })

    $: isStaked = isStakedForAirdrop($participationOverview)
    $: showIndicator =
        $stakingEventState === ParticipationEventState.Commencing ||
        $stakingEventState === ParticipationEventState.Holding
</script>

{#if showIndicator}
    <div class="rounded-2xl bg-white bg-opacity-20 pl-2 pr-3 py-1 flex flex-row space-x-2 items-center">
        <span class="relative flex justify-center items-center h-3 w-3">
            {#if isStaked}
                <span
                    class="pulse absolute inline-flex h-full w-full rounded-full bg-green-400
                    opacity-75"
                />
            {/if}
            <span class="relative inline-flex rounded-full h-2 w-2 bg-{isStaked ? 'green' : 'red'}-600" />
        </span>
        <Text type="p" classes="text-white dark:text-white">
            {localize(`general.${isStaked ? 'staking' : 'notStaked'}`)}
        </Text>
    </div>
{/if}

<style>
    .pulse {
        animation: -ping 2500ms cubic-bezier(0, 0, 0.2, 1) infinite;
    }
    @keyframes -ping {
        30%,
        100% {
            transform: scale(1.5);
            opacity: 0;
        }
    }
</style>
