<script lang="ts">

    import ContentPanel from "./parts/ContentPanel.svelte";
    import type DataColumn from "./lib/DataColumn";
    import type {ActionsColumn, RowAction} from "@ticatec/uniface-element/DataTable";
    import type IndicatorColumn from "./lib/IndicatorColumn";
    import UniDataTable, {type DeleteConfirm} from "./UniDataTable";
    import {onDestroy, onMount} from "svelte";
    import FixedColumnsPanel from "./parts/FixedColumnsPanel.svelte";
    import ActionsPanel from "./parts/ActionsPanel.svelte";

    import type RowData from "$lib/lib/RowData";
    import type BaseValidator from "@ticatec/web-bean-validator/lib/BaseValidator";
    import {getI18nText} from "@ticatec/i18n";
    import i18nKeys from "$lib/i18nKeys";
    import {createRowsStore} from "$lib/lib/RowsStore";


    export let columns: Array<DataColumn>;
    export let indicatorColumn: IndicatorColumn | null = null;
    export let rowHeight: number = 40;
    export let allowDelete: boolean = true;
    export let deleteConfirm: DeleteConfirm = null as unknown as DeleteConfirm;
    export let selectedCount: number = 0;

    export let style: string = '';

    let rows:any = createRowsStore();
    let unsubscribe:any;


    let selectedRows: Array<any> = [];

    $: selectedCount = selectedRows.length;

    /**
     * 获取表格数据
     */
    export const getData = () => {
        return $rows.map((item: RowData) => item.data);
    }

    /**
     * 新增数据行
     * @param items
     */
    export const appendRows = (items: any) => {
        let arr: Array<any> = Array.isArray(items) ? items : [items];
        console.log('添加数据', arr);
        rows.push(arr);
        console.log('表格数据', $rows)
    }

    /**
     * 删除选中的行
     */
    export const deleteSelectedRows = () => {
        activeCell = null;
        rows.remove(...selectedRows);
        selectedRows = [];
    }
    /**
     * 校验表格数据
     * @param rules
     */
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
            activeCell = null;
            rows.remove(row);

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
        unsubscribe = rows.subscribe((value: any) => {
        });
        table = new UniDataTable(id);
        selectedRows = selectedRows ?? [];
        initializeTable();
        init = true;
    })


    onDestroy(() => {
        rows.clear(); // 清空数据
        if (unsubscribe) {
            unsubscribe(); // 取消订阅
        }
        rows = null; // 释放 store 引用
    });


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

</script>

<div id="tab-{id}" {style} class="uniface-editable-data-table cell-border row-border">
    {@html tabStyle}
    {#if table && dataColumns}
        {#if indicatorColumn}
            <FixedColumnsPanel {rows} bind:selectedRows {indicatorColumn} {rowHeight} bind:scrollTop/>
        {/if}

        <ContentPanel {rows} columns={dataColumns} {handleWidthChange} {tabWidth} bind:activeCell
                      bind:scrollTop {rowHeight}
                      displayHorizontalScroll={actionsColumn!=null || indicatorColumn != null }
                      showVerticalScroll={actionsColumn == null}/>
    {/if}

    {#if actionsColumn}
        <ActionsPanel {rows} {rowHeight} {actionsColumn} bind:scrollTop/>
    {/if}
</div>
