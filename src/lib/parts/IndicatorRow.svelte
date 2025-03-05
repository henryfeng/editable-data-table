<!-- 标识行，显示行号，是否有错误，删除按钮 -->
<script lang="ts">
    import type Row from "$lib/lib/Row";
    import type {RemoveRow} from "$lib/lib/RemoveRow";

    export let row: Row;
    export let rowNo: number;
    export let removeRow: RemoveRow;

    let hasError: boolean = false;

    $: hasError = row.hasError;

</script>
<div class="table-row" class:alternative={rowNo % 2 == 0}>
    <div style="flex: 1 1 auto; text-align: center; white-space: nowrap">
        <span>{rowNo}</span>
    </div>
    <div>
        <i class="uniface-icon-trash action-icon" aria-hidden="true" on:click={removeRow}></i>
    </div>
    <div style="color: #ff3e00; visibility: {hasError ? 'visible' : 'hidden'}">
        <i class="uniface-icon-alert-triangle"></i>
    </div>
</div>