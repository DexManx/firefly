<script lang="typescript">
    import QRCode from 'qr.js/lib/QRCode'
    import { appSettings } from 'shared/lib/appSettings'

    export let data
    export let size = 150

    let qr
    let cells

    $: darkModeEnabled = $appSettings.darkMode
    $: data, create()

    function create() {
        try {
            qr = new QRCode(-1, 1)
            qr.addData(data)
            qr.make()
            cells = qr.modules
        } catch (e) {
            console.error(e)
        }
    }
</script>

{#key data}
    {#if cells}
        <svg width={size} height={size} viewBox={`0 0 ${cells.length} ${cells.length}`}>
            {#each cells as row, rowIndex}
                {#each row as cell, cellIndex}
                    <rect
                        height={1}
                        key={cellIndex}
                        style="fill: {cell ? (darkModeEnabled ? '#ffffff' : '#000000') : 'none'};"
                        width={1}
                        x={cellIndex}
                        y={rowIndex}
                    />
                {/each}
            {/each}
        </svg>
    {/if}
{/key}

<style>
    svg {
        display: block;
        position: relative;
        margin: 0 auto;
    }
</style>
