<script lang="ts">

    import ContentPanel from "./parts/ContentPanel.svelte";
    import type DataColumn from "./lib/DataColumn";
    import Row from "$lib/lib/Row";
    import IndicatorPanel from "$lib/parts/IndicatorPanel.svelte";

    export let columns: Array<DataColumn>;
    export let list: Array<any> = [];

    export let readonly: boolean = false;

    let rows: Array<Row> = [];

    let scrollTop: number = 0;

    let hasScrollbar: boolean = false;

    let id: string = `${(new Date()).getTime().toString(16)}-${(Math.round(1000 * Math.random()) + 10000).toString(16)}`;

    $: {
        rows = list.map((item: any) => new Row(item));
    }




</script>

<div id="tab-{id}" class="uniface-editable-data-table">
    <div>
        <IndicatorPanel bind:rows {scrollTop} {hasScrollbar}/>
        <ContentPanel {id} bind:hasScrollbar {readonly} {columns} {rows} bind:scrollTop/>
    </div>
</div>