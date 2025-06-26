<script lang="ts">


    import type IndicatorColumn from "../lib/IndicatorColumn";
    import {type SelectionEventHandler, SelectionMode} from "../UniDataTable";
    import utils from "../lib/utils";
    import i18n from "@ticatec/i18n";


    export let indicatorColumn: IndicatorColumn | null;
    export let rowHeight;
    export let selectionMode: SelectionMode;

    export let handleToggleSelectAll: SelectionEventHandler;

    let checked: boolean = false;
    let indeterminate: boolean = false;

    const handleHeaderCheckBoxClick = async (e: MouseEvent) => {
        indeterminate = false;
        await utils.sleep(0.05);
        handleToggleSelectAll?.(checked);
    }

    $: if (selectionMode == SelectionMode.All) {
        indeterminate = false;
        checked = true;
    } else if (selectionMode == SelectionMode.None) {
        indeterminate = false;
        checked = false;
    } else {
        indeterminate = true;
    }


</script>

<div class="header-row" style="flex: 0 0 auto; {rowHeight}px">
    <div class="data-cell" style="width: {indicatorColumn.width}px">
        {#if indicatorColumn?.selectable === true}
            <div style="text-align: center" class="vertical-center">
                <input type="checkbox" tabindex="-1" bind:checked {indeterminate} on:click={handleHeaderCheckBoxClick}/>
            </div>
        {:else }
            <div style="text-align: center" class="vertical-center">
                {#if indicatorColumn.displayNo}
                    <span>{i18n.getText('uniface.dataTable.rowNo', '#No')}</span>
                {/if}
            </div>
        {/if}
    </div>
</div>