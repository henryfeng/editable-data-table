<script lang="ts">

    import type DataColumn from "$lib/lib/DataColumn";

    export let data: any;
    export let column: DataColumn;

    let props: any = {};

    let field: string = column.props.field;


</script>
<div>
    <span>Invalid type: {column.type} on {field}</span>
</div>