<script lang="ts">

    import ActionsRow from "./ActionsRow.svelte";
    import {onDestroy, onMount} from "svelte";
    import i18n from "@ticatec/i18n";
    import type {ActionsColumn} from "@ticatec/uniface-element/DataTable";
    import {rows} from "$lib/lib/RowsStore";

    export let actionsColumn: ActionsColumn;
    export let scrollTop: number = 0;

    export let rowHeight: number;

    const handleActionPanelScroll = (e: Event) => {
        scrollTop = e.target?.scrollTop;
    }

    let scrollPanel: any;

    $: if (scrollTop > -1) {
        if (scrollPanel) {
            scrollPanel.scrollTop = scrollTop
        }
    }

    let resizeObserver: ResizeObserver;
    let panel: any;
    let rect: DOMRect;

    onMount(async () => {
        resizeObserver = new ResizeObserver(() => {
            rect = panel.getBoundingClientRect();
        });
        resizeObserver.observe(panel);
    });

    onDestroy(() => {
        resizeObserver.disconnect();
    });

    let actionText = i18n.getText('uniface.dataTable.actions', 'Actions');

</script>

<div class="action-panel" bind:this={panel} style="user-select: none; width: {actionsColumn.width}px;">
    <div class="header-row">
        <div class="vertical-center">
            <span>{actionText}</span>
        </div>
    </div>
    <div bind:this={scrollPanel} class="rows-container" style="overflow-y: auto" on:scroll|passive={handleActionPanelScroll}>
        <div>
            {#each $rows as row, idx}
                <ActionsRow {row} {rowHeight} parentRect={rect} alternative={idx % 2 == 1} width={actionsColumn.width} align={actionsColumn.align}
                            actions={actionsColumn.getActions(row.data)}/>
            {/each}
        </div>
    </div>
    <div class="bottom-mask-overlay">
        <!-- 用于匹配中间数据区域的滚动条 -->
    </div>
</div>