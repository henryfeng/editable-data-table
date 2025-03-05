<script lang="ts">

    import TextEditor from "@ticatec/uniface-element/TextEditor"
    import InlineCellEditor from "./InlineCellEditor.svelte";
    import type DataColumn from "$lib/lib/DataColumn";

    export let data: any;
    export let readonly: boolean;
    export let column: DataColumn;
    export let active: boolean;

    let props: any = {};

    let field: string = column.props.field;

    let editor: any;

</script>
<InlineCellEditor>
    <TextEditor bind:this={editor} autoFocus bind:value={data[field]} readonly={readonly || !active} variant="plain" {...props}  />
</InlineCellEditor>