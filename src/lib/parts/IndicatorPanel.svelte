<script lang="ts">

    import IndicatorRow from "$lib/parts/IndicatorRow.svelte";
    import type Row from "$lib/lib/Row";

    export let rows: Array<Row>;
    export let scrollTop: number = 0;
    export let hasScrollbar: boolean;

    let style: string = '';

    const removeRow = (idx: number) => () => {
        if (idx > -1) {
            rows.splice(idx, 1);
            rows = [...rows];
        }
    }

</script>
<div class="indicator-panel" {style}>
    <div class="header-row">

    </div>
    <div class="indicator-rows-wrapper" class:bottom-border={!hasScrollbar}>
        <div style="top: {-scrollTop}px;">
            {#each rows as row, idx}
                <IndicatorRow  {row} rowNo={idx+1} removeRow={removeRow(idx)}/>
            {/each}
        </div>
    </div>
</div>