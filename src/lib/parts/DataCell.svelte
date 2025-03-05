<script lang="ts">


    import type DataColumn from "$lib/lib/DataColumn";
    import editorManager from "$lib/components/EditorManager";
    import i18n from "@ticatec/uniface-element/I18nContext";

    export let rowIdx: number;
    export let colIdx: number;
    export let column: DataColumn;
    export let data: any;
    export let readonly: boolean;
    export let error: string | null;
    export let activeCell: any;

    let active: boolean = false;

    let inlineEditor: any = editorManager.getRender(column.type);

    const handleMouseEnter = (event: MouseEvent) => {
        if (error) {
            //TODO show hint
        }
    }

    const handleMouseLeave = (event: MouseEvent) => {
        if (error) {

        }
    }

    const setActiveCell = (value: boolean) => () => {
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

    const cleanError = () => {

    }

    $: active = activeCell?.rowIdx == rowIdx && activeCell?.colIdx == colIdx;

    //    on:mouseenter={handleMouseEnter} on:mouseleave={handleMouseLeave} on:click={setActiveCell(true)}tabindex="-1"
</script>
<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
<div class="data-cell col-{colIdx+1}" class:active on:focusin={setActiveCell(true)}>
    <svelte:component this={inlineEditor} {readonly} {data} {column} {active}/>
</div>