<script lang="ts">
    import OptionsMultiSelect from "@ticatec/uniface-element/OptionsMultiSelect";
    import InlineCellEditor from "./InlineCellEditor.svelte";
    import type DataColumn from "$lib/lib/DataColumn";
    import {onMount} from "svelte";

    export let data: any;

    export let readonly: boolean;

    export let column: DataColumn;
    export let active: boolean = false;

    let textValue: string;
    let field: string = column.props.field;

    let options: Array<any> = column.props?.options ?? [];

    let props: any; //TODO 过滤合适的属性


    onMount(async ()=>{

    })

</script>
<InlineCellEditor>
    <OptionsMultiSelect variant="plain" bind:value={data[field]} readonly={readonly || !active} {options} {...props} ></OptionsMultiSelect>
</InlineCellEditor>