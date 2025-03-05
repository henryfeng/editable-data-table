<script lang="ts">


    import type DataColumn from "$lib/lib/DataColumn";
    import type {OnColumnResize} from "$lib/lib/OnColumnResize";
    import resizer from "./resizer.png"
    export let columns: Array<DataColumn>;
    export let scrollLeft: number = 0;
    export let width: number = 0;
    export let onColumnResize: OnColumnResize;

</script>
<div class="header-row" style="width: {width}px; overflow: hidden">
    <div class="cells-wrapper" style="left: {-scrollLeft}px; width:{width}px">
        {#each columns as column, idx}
            <div class="header-cell col-{idx+1}">
                <div>
                    <span>{column.text}</span>
                </div>
                {#if column.resizable}
                    <div class="resizer" style="background-image: url({resizer})"></div>
                {/if}
            </div>
        {/each}
    </div>
</div>