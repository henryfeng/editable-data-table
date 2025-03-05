<script lang="ts">

    import Checkbox from "@ticatec/uniface-element/Checkbox";
    import InlineCellEditor from "./InlineCellEditor.svelte";
    import type DataColumn from "$lib/lib/DataColumn";

    export let data: any;
    export let readonly: boolean;
    export let column: DataColumn;
    export let active: boolean;

    let props: any = {};

    let field: string = column.props.field;
//

</script>
<InlineCellEditor style="text-align: center">
    <Checkbox style="position: relative; top: 50%; transform: translateY(-50%)"  bind:checked={data[field]} compact readonly={readonly || !active} {...props}/>
</InlineCellEditor>