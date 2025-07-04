<script lang="ts">

    import type {RowAction} from "@ticatec/uniface-element/DataTable";
    import {IconButton} from "@ticatec/uniface-element/Button";
    import {TextButton} from "@ticatec/uniface-element/Button";
    import {onDestroy, onMount, tick} from "svelte";
    import utils from "../lib/utils";
    import PopupMenu from "./PopupMenu.svelte";
    import type RowData from "$lib/lib/RowData";

    export let row: RowData;
    export let actions: Array<RowAction>;
    export let alternative: boolean;
    export let parentRect: DOMRect;

    export let width: number;

    export let rowHeight: number;

    export let align: 'left' | 'center' | undefined;

    let style: string;


    let actionList: Array<RowAction> = [...actions]
    let popupList: Array<RowAction> = [];


    let cell: any;
    let showPopup: boolean = false;


    let isOverflowing = false; // 是否溢出
    let resizeObserver: ResizeObserver;

    onMount(async () => {
        resizeObserver = new ResizeObserver(() => {
            // 每次 div 尺寸变化时，更新 clientWidth
            //opWidth = hiddenCell.clientWidth;
            checkOverflow();
        });
        resizeObserver.observe(cell);
    });

    onDestroy(() => {
        resizeObserver.disconnect();
    });

    const checkOverflow = async () => {
        if (actions.length > 0) {
            await tick();
            while (cell == null) {
                await tick();
            }
            isOverflowing = width < cell.clientWidth;
            while (actionList.length > 0 && isOverflowing) {
                let action = actionList.pop();
                if (action) {
                    popupList = [...popupList, action];
                }
                actionList = [...actionList];
                await tick();
                isOverflowing = width < cell.clientWidth + 8;
            }
        } else {
            isOverflowing = false;
        }
    }

    let enableClick: boolean = true;
    const showPopupMenu = async (e: MouseEvent) => {
        e.stopPropagation();
        if (enableClick) {
            enableClick = false;
            await utils.sleep(0.1);
            showPopup = true;
            await utils.sleep(0.1);
            enableClick = true;
        }
    }

    $: if (actions) {
        actionList = [...actions];
        popupList = [];
        checkOverflow();
    }

    $: style = rowHeight == null ? '' : `height: ${rowHeight}px`;


</script>
<div class="data-row" class:alternative style="position: relative;  display: block; padding: 0 4px; width: {width}px; {style}">
    <div class="action-cell" bind:this={cell} style="{align=='center' ? 'margin: 0 auto' : ''}">
        {#each actionList as action}
            {#if action.icon}
                <IconButton style="flex-shrink: 0; top: 0" size="mini" type="{action.type ?? 'primary'}" icon={action.icon}
                            onClick={()=>action.callback(row)}/>
            {:else}
                <TextButton style="flex-shrink: 0; top: 0" size="mini" type="{action.type ?? 'primary'}" label={action.label}
                            onClick={()=>action.callback(row)}/>
            {/if}
        {/each}
        {#if popupList.length > 0}
            <TextButton size="mini" type="primary" style="flex-shrink: 0; top: 0" label="..." onClick={showPopupMenu}/>
        {/if}
    </div>

    {#if showPopup}
        <PopupMenu {parentRect} closeCallback={()=>{showPopup = false}}>
            <div style="padding: 4px 6px; box-sizing: border-box; background-color: #ffffff;">
                {#each popupList.reverse() as action}
                    <div class="action-popover" style="padding: 4px 6px; text-align: center">
                        {#if action.icon}
                            <IconButton style="flex-shrink: 0; top: 0" size="mini" type="{action.type ?? 'primary'}" icon={action.icon}
                                        onClick={()=>{action.callback(row); showPopup=false}}/>
                        {:else}
                            <TextButton style="flex-shrink: 0; top: 0" size="mini" type="{action.type ?? 'primary'}" label={action.label}
                                        onClick={()=>{action.callback(row); showPopup=false}}/>
                        {/if}
                    </div>
                {/each}
            </div>
        </PopupMenu>
    {/if}
</div>