<script lang="ts">

    import type DataColumn from "../lib/DataColumn";
    import DataCell from "./DataCell.svelte";
    import type Row from "$lib/lib/Row";

    export let columns: Array<DataColumn>;

    export let rowIdx: number;

    export let row: Row;

    export let alternative: boolean;

    export let readonly: boolean;

    export let activeCell: any;




</script>

<div class="table-row" class:alternative style="width: 100%">
    {#each columns as column, idx}
        <DataCell bind:activeCell {readonly} bind:data={row.data} {column} {rowIdx} colIdx={idx} error={row.getError(idx)}/>
    {/each}
    <div class="table-data-cell" class:alternative style="border-right: none">
        <!-- 补全后面的线段 -->
    </div>
</div>


