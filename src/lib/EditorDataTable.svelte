<script lang="ts">

    import ContentPanel from "./parts/ContentPanel.svelte";
    import type DataColumn from "./lib/DataColumn";
    import type {ActionsColumn, RowAction} from "@ticatec/uniface-element/DataTable";
    import type IndicatorColumn from "./lib/IndicatorColumn";
    import UniDataTable, {type DeleteConfirm} from "./UniDataTable";
    import {onMount} from "svelte";
    import FixedColumnsPanel from "./parts/FixedColumnsPanel.svelte";
    import ActionsPanel from "./parts/ActionsPanel.svelte";
    import {rows} from "$lib/lib/RowsStore";
    import type RowData from "$lib/lib/RowData";
    import type BaseValidator from "@ticatec/web-bean-validator/lib/BaseValidator";
    import {getI18nText} from "@ticatec/i18n";
    import i18nKeys from "$lib/i18nKeys";


    export let columns: Array<DataColumn>;
    export let indicatorColumn: IndicatorColumn | null = null;
    export let rowHeight: number = 40;
    export let list: Array<any>;
    export let selectedRows: Array<any> = [];
    export let allowDelete: boolean = true;
    export let deleteConfirm: DeleteConfirm = null as unknown as DeleteConfirm;


    export let style: string = '';

    export const getData = () => {
        return $rows.map((item: RowData) => item.data);
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

    let actionsColumn: any;

    const removeRow = async (row: RowData) => {
        let confirmed = deleteConfirm ? await deleteConfirm(row.data) : true;
        if (confirmed) {
            removeRows(row);
        }
    }

    let actions: RowAction = {
        label: getI18nText(i18nKeys.btnDelete),
        callback: removeRow
    }


    $: actionsColumn = allowDelete ? {
        getActions: (data: any) => {
            return [actions]
        }, width: 90, align: "center"
    } : null;

    let dataColumns: Array<DataColumn>;

    let table: UniDataTable = null as unknown as UniDataTable;
    let tabStyle: string = '';

    let id: string = (new Date()).getTime().toString(36);
    let init: boolean = false;

    onMount(() => {
        table = new UniDataTable(id);
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

<div id="tab-{id}" {style} class="uniface-editable-data-table cell-border row-border">
    {@html tabStyle}
    {#if table && dataColumns}
        {#if indicatorColumn}
            <FixedColumnsPanel bind:selectedRows {indicatorColumn} {rowHeight} bind:scrollTop/>
        {/if}

        <ContentPanel columns={dataColumns} {handleWidthChange} {tabWidth} bind:activeCell
                      bind:scrollTop {rowHeight}
                      displayHorizontalScroll={actionsColumn!=null || indicatorColumn != null }
                      showVerticalScroll={actionsColumn == null}/>
    {/if}

    {#if actionsColumn}
        <ActionsPanel {rowHeight} {actionsColumn} bind:scrollTop/>
    {/if}
</div>
