<script lang="ts">


    import type DataColumn from "$lib/lib/DataColumn";
    import {editorManager} from "@ticatec/uniface-element/InlineCellEditor";
    import TextCell from "./TextCell.svelte";

    export let rowIdx: number;
    export let colIdx: number;
    export let column: DataColumn;
    export let readonly: boolean;
    export let activeCell: any;

    export let data: any;
    export let error: string | null;

    let active: boolean = false;

    let inlineEditor: any = column.type && !readonly ? editorManager.getRender(column.type) : null;

    const setActiveCell = (value: boolean) => () => {
        if (column.type && !readonly) {
            setTimeout(() => {
                if (value) {
                    if (!active) {
                        activeCell = {rowIdx, colIdx};
                    }
                } else {
                    activeCell = null;
                }
            }, 200);
        }
    }

    const showHint = (e: MouseEvent) => {
        window.Hint.show(e.target as Element, error, e.x, e.y);
    }

    $: active = activeCell != null && activeCell?.rowIdx == rowIdx && activeCell?.colIdx == colIdx;

</script>
<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
<div id="_{rowIdx}" class="data-cell col-{colIdx} {inlineEditor ? 'editor' : ''}" class:active on:focusin={setActiveCell(true)}>
    {#if inlineEditor}
        <svelte:component this={inlineEditor} {readonly} bind:data field={column.field} props={column.props} {active}/>
    {:else}
        <div class="vertical-center">
            <TextCell {data} {column}/>
        </div>
    {/if}
    {#if error}
        <div class="warning-flag">
            <i class="icon_google_error" aria-hidden="true" on:mouseenter={showHint}></i>
        </div>
    {/if}
</div>