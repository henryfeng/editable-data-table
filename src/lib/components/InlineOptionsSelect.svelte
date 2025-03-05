<script lang="ts">
    import OptionsSelect from "@ticatec/uniface-element/OptionsSelect";
    import InlineCellEditor from "./InlineCellEditor.svelte";
    import type DataColumn from "$lib/lib/DataColumn";
    import {onMount, tick} from "svelte";

    export let data: any;

    export let readonly: boolean;

    export let column: DataColumn;
    export let active: boolean = false;

    let textValue: string;
    let field: string = column.props.field;

    let options: Array<any> = column.props?.options ?? [];

    let textField: string = column.props?.textField ?? "text";
    let keyField: string = column.props?.keyField ?? "code";

    let props: any; //TODO 过滤合适的属性


    onMount(async ()=>{

    })

</script>
<InlineCellEditor>
    <OptionsSelect variant="plain" bind:value={data[field]} readonly={readonly || !active} {options} {...props} ></OptionsSelect>
</InlineCellEditor>