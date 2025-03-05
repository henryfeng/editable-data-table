<script lang="ts">
    import "@ticatec/uniface-icons/feather-style.css"
    import "@ticatec/uniface-element/ticatec-uniface-web.css"
    import EditorDataTable from "$lib";
    import "$lib/uniface-editable-datatable.scss"
    import Box from "@ticatec/uniface-element/Box";
    import TextEditor from "@ticatec/uniface-element/TextEditor";

    import columns from "./columns";

    let list:Array<any> = [
        {},
        {},
        {},
        {err: true},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {}
    ]


</script>

<div style="padding: 20px; box-sizing: border-box; height: 60%;">
    <TextEditor variant="plain" value="234234234" style="width: 120px"/>

    <Box style="height: 500px">
        <EditorDataTable {columns} bind:list />
    </Box>

</div>







