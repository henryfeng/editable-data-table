<script lang="ts">

    import ContentPanel from "./parts/ContentPanel.svelte";
    import type DataColumn from "./lib/DataColumn";
    import type {ActionsColumn} from "@ticatec/uniface-element/DataTable";
    import type IndicatorColumn from "./lib/IndicatorColumn";
    import UniDataTable from "./UniDataTable";
    import {onMount} from "svelte";
    import FixedColumnsPanel from "./parts/FixedColumnsPanel.svelte";
    import ActionsPanel from "./parts/ActionsPanel.svelte";
    import {rows} from "$lib/lib/RowsStore";
    import type RowData from "$lib/lib/RowData";
    import type BaseValidator from "@ticatec/web-bean-validator/lib/BaseValidator";


    export let columns: Array<DataColumn>;
    export let actionsColumn: ActionsColumn | null = null;
    export let indicatorColumn: IndicatorColumn | null = null;
    export let rowHeight: number = 40;
    export let list: Array<any>;
    export let selectedRows: Array<any> = [];
    export let rowBorder: boolean = true;
    export let colBorder: boolean = true;
    export let emptyIndicator: string | undefined = undefined;

    export let errorColWidth: number = 200;

    export let style: string = '';

    export const getData = () => {
        return $rows.map((item: RowData)=>item.data);
    }

    export const removeRows = (...items: Array<RowData>) => {
        activeCell = null;
        rows.remove(...items);
    }
    export const validateData = (rules: Array<BaseValidator>) => {
        for (let row of $rows) {
            row.validate(rules);
        }
        rows.invalid();
        return $rows.filter((item: RowData) => item.hasErrors).length == 0;
    }

    let dataColumns: Array<DataColumn>;

    let table: UniDataTable = null as unknown as UniDataTable;
    let tabStyle: string = '';

    let id: string = (new Date()).getTime().toString(36);
    let init: boolean = false;

    onMount(() => {
        table = new UniDataTable(id, errorColWidth);
        selectedRows = selectedRows ?? [];
        initializeTable();
        init = true;
    })

    let scrollTop: number;
    let activeCell: any;

    const initializeTable = () => {
        table.setColumns(columns);
        dataColumns = table.columns;
        tabStyle = table.generateTemplateStyle();
        tabWidth = table.width;
    }


    $: if (init && columns) {
        console.log('刷新列')
        initializeTable();
    }

    let tabWidth: number;
    const handleWidthChange = () => {
        tabStyle = table.generateTemplateStyle();
        tabWidth = table.width;
    }

    $: rowHeight = rowHeight ?? 40;

    $: rows.set(list);


</script>

<div id="tab-{id}" {style} class="uniface-editable-data-table" class:cell-border={colBorder} class:row-border={rowBorder}>
    {@html tabStyle}
    {#if table && dataColumns}
        {#if indicatorColumn}
            <FixedColumnsPanel bind:selectedRows {indicatorColumn} {rowHeight} bind:scrollTop/>
        {/if}

        <ContentPanel columns={dataColumns} {handleWidthChange} {tabWidth} bind:activeCell
                      bind:scrollTop {rowHeight} {emptyIndicator}
                      displayHorizontalScroll={actionsColumn!=null || indicatorColumn != null }
                      showVerticalScroll={actionsColumn == null}/>
    {/if}

    {#if actionsColumn}
        <ActionsPanel {rowHeight} {actionsColumn} bind:scrollTop/>
    {/if}
</div>
