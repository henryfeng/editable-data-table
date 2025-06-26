<script lang="ts">

    import type {RowSelectEventHandler} from "../UniDataTable";
    import type RowData from "$lib/lib/RowData";
    import type IndicatorColumn from "$lib/lib/IndicatorColumn";

    export let selectable: boolean = false;
    export let rowNo: number;
    export let row: RowData;
    export let alternative: boolean;
    export let handleRowSelectChange: RowSelectEventHandler;
    export let selected: boolean;

    export let rowHeight: number;

    export let indicatorColumn: IndicatorColumn | null;

    let style: string;


    $: {
        handleRowSelectChange(row, selected);
    }

    $: style = rowHeight == null ? '' : `height: ${rowHeight}px`

</script>
<div class="data-row" class:alternative style="width: 100%; {style}">
    {#if indicatorColumn}
        <div class="data-cell indicator-cell" style="width: {indicatorColumn.width}px">
            {#if selectable}
                <input type="checkbox" bind:checked={selected}/>
            {/if}
            {#if indicatorColumn.displayNo}
                <div style="margin-left: 4px; width: 20px; text-align: left">
                    <span>{rowNo}</span>
                </div>
            {/if}
        </div>
    {/if}
</div>