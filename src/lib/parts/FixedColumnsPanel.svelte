<script lang="ts">


    import type IndicatorColumn from "../lib/IndicatorColumn";
    import {SelectionMode} from "../UniDataTable";
    import {tick} from "svelte";
    import FixedHeaderPanel from "./FixedHeaderPanel.svelte";
    import FixedRow from "./FixedRow.svelte";
    import type RowData from "$lib/lib/RowData";
    import {rows} from "$lib/lib/RowsStore";

    export let indicatorColumn: IndicatorColumn | null;
    export let scrollTop: number = 0;

    let selectionMode: SelectionMode = SelectionMode.None;

    let width: number = indicatorColumn?.width ?? 60;

    export let selectedRows: Array<any> = [];

    export let rowHeight: number;
    let selectable: boolean = false;

    $: selectable = indicatorColumn?.selectable == true;

    const handleToggleSelectAll = async (value: boolean) => {
        selectedRows = value ? [...$rows] : [];
        await tick();
        selectionMode = value ? SelectionMode.All : SelectionMode.None;
        rows.invalid();
    }

    const handleRowSelectChange = async (row: RowData, value: boolean) => {
        if (value) {
            if (selectedRows.indexOf(row) < 0) {
                selectedRows = [...selectedRows, row];
            }
        } else {
            let pos = selectedRows.indexOf(row);
            if (pos > -1) {
                selectedRows.splice(pos, 1);
                selectedRows = [...selectedRows];
            }
        }
        selectionMode = selectedRows.length == $rows.length ? SelectionMode.All : selectedRows.length == 0 ? SelectionMode.None : SelectionMode.Partial;
    }

</script>

<div class="left-fixed-panel" style="width: {width}px">
    <FixedHeaderPanel {selectionMode} {indicatorColumn} {handleToggleSelectAll} {rowHeight}/>
    <div class="rows-container">
        <div style="top: {-scrollTop}px">
            {#each $rows as row, idx (row.id)}
                <FixedRow rowNo={idx+1} {row} selected={selectedRows.indexOf(row) > -1} alternative={idx % 2 == 1} {selectable}
                           {rowHeight} {handleRowSelectChange} {indicatorColumn}/>

            {/each}
        </div>
    </div>
    <div class="bottom-mask-overlay">
        <!-- 用于匹配中间数据区域的滚动条 -->
    </div>
</div>