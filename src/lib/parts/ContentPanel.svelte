<script lang="ts">

    import type DataColumn from "../lib/DataColumn";
    import {onDestroy, onMount} from "svelte";
    import TableHeaderPanel from "./TableHeaderPanel.svelte";
    import {type TableEventHandler} from "../UniDataTable";
    import DataRow from "./DataRow.svelte";



    export let columns: Array<DataColumn>;
    export let scrollTop: number = 0;
    export let rowHeight: number;
    export let activeCell: any;
    export let showVerticalScroll: boolean = false;
    export let displayHorizontalScroll: boolean = true;
    export let tabWidth: number;
    export let rows: any;

    export let handleWidthChange: TableEventHandler;


    let scrollLeft: number = 0;

    let resizeObserver: ResizeObserver;
    let viewPanel: any;

    onMount(async () => {
        resizeObserver = new ResizeObserver(() => {
            // 每次 div 尺寸变化时，更新 clientWidth
            viewWidth = Math.round(viewPanel?.clientWidth) - 1;
        });
        resizeObserver.observe(viewPanel);
    });

    onDestroy(() => {
        resizeObserver.disconnect();
    })

    const handleDataTableScroll = (e: Event) => {
        if (showVerticalScroll) {
            scrollTop = e.target?.scrollTop;
        }
        scrollLeft = e.target?.scrollLeft;
    }


    const handleWheelEvent = (e: WheelEvent) => {
        let maxSh = dataPanel.scrollHeight - dataPanel.clientHeight;
        if (!showVerticalScroll && maxSh > 0) {
            if (e.deltaY != 0) {
                scrollTop = scrollTop + e.deltaY;
                if (scrollTop < 0) {
                    scrollTop = 0;
                }
                if (scrollTop > maxSh) {
                    scrollTop = maxSh;
                }
                setTimeout(() => {
                    scrollTop = dataPanel.scrollTop;
                }, 200);
            }
        }
    }

    $: if (dataPanel && scrollTop > -1 && !showVerticalScroll) {
        dataPanel.scrollTop = scrollTop;
    }

    let viewWidth: number;
    $: rowWidth = Math.max(viewWidth, tabWidth);

    let hasWhitespace: boolean = true;
    $: hasWhitespace = viewWidth > tabWidth;


    let top: string = "0px";
    let dataPanel: any;

</script>
<div class="data-content-panel" bind:this={viewPanel}>
    <TableHeaderPanel dataCols={columns} {scrollLeft} width={tabWidth} {hasWhitespace} {handleWidthChange}/>
    <div class="data-view-panel" bind:this={dataPanel} on:scroll|passive={handleDataTableScroll} on:wheel|passive={handleWheelEvent}
         style="overflow-x: {displayHorizontalScroll ? 'scroll' : 'auto'}; overflow-y: {showVerticalScroll ?'auto': 'hidden' };">
        <div style="box-sizing: border-box; width: {rowWidth}px; top: {top}">
            {#each $rows as row, idx (row.id)}
                <DataRow {rowHeight} {row} {columns} rowIdx={idx} alternative={idx % 2 == 1} bind:activeCell/>
            {/each}
        </div>
    </div>
</div>