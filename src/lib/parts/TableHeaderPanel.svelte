<script lang="ts">

    import {type TableEventHandler} from "../UniDataTable";
    import type DataColumn from "../lib/DataColumn";
    import i18n from "@ticatec/i18n";

    export let scrollLeft: number = 0;
    export let handleWidthChange: TableEventHandler;
    export let dataCols: Array<any>;
    export let width: number = 0;
    export let hasWhitespace: boolean = false;

    let resizeCol: any;


    let startX: number = 0;
    let startWidth: number = 0;


    const handleResizeMouseDown = (col: DataColumn) => (event: MouseEvent) => {
        if (col.resizable) {
            resizeCol = col;
            startX = event.clientX;
            startWidth = resizeCol.width;

            document.body.style.cursor = 'col-resize';
            // 绑定鼠标移动和松开事件
            window.addEventListener('mousemove', onMouseMove);
            window.addEventListener('mouseup', onMouseUp);
        }
    }

    const onMouseMove = (event: MouseEvent) => {
        if (resizeCol !== null) {
            const diff = event.clientX - startX;
            let w = startWidth + diff;
            if (w > (resizeCol.minWidth ?? 50)) {
                resizeCol.width = startWidth + diff;
            }

        }
        handleWidthChange?.();
    }

    // 结束拖动
    function onMouseUp() {
        resizeCol = null;
        document.body.style.cursor = 'default';
        window.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('mouseup', onMouseUp);
    }

</script>
<div class="header-row">
    <div style="left: {-scrollLeft}px; width: {width}px">
        {#each dataCols ?? [] as col, index}
            <div class="col-{index} data-cell" class:whitespace={hasWhitespace}>
                <div aria-hidden="true" class="vertical-center">
                    <span>{col.text}</span>
                </div>
                <div class="header-cell-divider" class:resizer={col.resizable} aria-hidden="true"
                     on:mousedown={handleResizeMouseDown(col)}></div>

            </div>
        {/each}
        <div class="data-cell" style="border-right: none; width: unset"></div>
    </div>
</div>
