<script lang="ts">

    import type DataColumn from "../lib/DataColumn";
    import DataCell from "./DataCell.svelte";
    import type RowData from "$lib/lib/RowData";

    export let columns: Array<DataColumn>;
    export let row: RowData;
    export let rowIdx: number;
    export let alternative: boolean;
    export let rowHeight: number;  //{ rowHeight}
    export let activeCell: any;
    export let readonly: boolean = false;

    let style: string = '';

    $: style = rowHeight == null ? '' : `height: ${rowHeight}px`


</script>

<div class="data-row" {style} class:alternative >
    {#each columns as col, idx}
        <DataCell {readonly} colIdx={idx} data={row.data} error="{col.field ? row.errors?.[col.field] : null}" column={col} {rowIdx} bind:activeCell/>
    {/each}
    <div class="data-cell" style="border-right: none; width: unset">
    </div>
</div>


