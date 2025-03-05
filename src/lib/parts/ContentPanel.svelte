<script lang="ts">

    import TableRow from "./TableRow.svelte";
    import type DataColumn from "../lib/DataColumn";
    import type Row from "$lib/lib/Row";
    import TableHeader from "$lib/parts/TableHeader.svelte";
    import utils from "$lib/lib/utils";
    import {onMount} from "svelte";


    export let columns: Array<DataColumn>
    export let rows: Array<Row>;
    export let scrollTop: number = 0;
    export let readonly: boolean;
    export let id: string;

    export let hasScrollbar: boolean = false;

    let tabWidth: number = 0; //表格的事件宽度

    let activeCell: any = null;


    let colStyle: string = '';
    let scrollLeft: number = 0;
    let viewWidth: number; //视窗宽度


    const handleDataTableScroll = (e: UIEvent) => {
        scrollTop = e.target?.scrollTop;
        scrollLeft = e.target?.scrollLeft;
    }

    const calculateTableWidth = () => {
        tabWidth = 0;
        columns.forEach((col: DataColumn) => {
            tabWidth += col.width;
        });
    }

    let viewPanel: any;

    onMount(() => {
        calculateTableWidth();
        const resizeObserver = new ResizeObserver((entries) => {
            for (const entry of entries) {
                hasScrollbar = viewPanel.scrollHeight > viewPanel.clientHeight;
            }
        });
        resizeObserver.observe(viewPanel);

        return () => {
            resizeObserver.disconnect();
        };


    });

    const onColumnResize = () => {
        calculateTableWidth();
    }

    $: colStyle = utils.buildColumnStyle(id, columns);

    let width: number = 0;

    $: width = Math.max(viewWidth, tabWidth);

    $: if (rows) {
        activeCell = null;
    }

</script>
<div class="data-content-panel" bind:clientWidth={viewWidth}>
    {@html colStyle}
    <div class="data-view-panel" style="overflow: hidden" class:bottom-border={!hasScrollbar}>
        <TableHeader {columns} {scrollLeft} {onColumnResize} {width}/>
        <div bind:this={viewPanel} style="flex: 1 1 auto; overflow-y: auto; overflow-x: {tabWidth > viewWidth ? 'auto' : 'hidden'};  box-sizing: border-box; position: relative"
             on:scroll|passive={handleDataTableScroll}>
            <div style="width: {width}px; box-sizing: border-box;">
                {#each rows as row, idx}
                    <TableRow bind:activeCell rowIdx={idx} {readonly} {row} {columns} alternative={idx % 2 == 1}/>
                {/each}
            </div>

        </div>
    </div>
</div>