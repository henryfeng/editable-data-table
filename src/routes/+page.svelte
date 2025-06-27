<script lang="ts">
    import "@ticatec/uniface-icons/feather-style.css"
    import "@ticatec/uniface-element/ticatec-uniface-web.css"
    import "@ticatec/uniface-google-material-icons/google_material_icons.css"
    import EditorDataTable from "$lib";
    import "$lib/uniface-editable-datatable.scss"
    import Box from "@ticatec/uniface-element/Box";
    import TextEditor from "@ticatec/uniface-element/TextEditor";
    import {cn_resource} from "@ticatec/uniface-element/i18n_resources"
    import Button from "@ticatec/uniface-element/Button";
    import PopupHint from "@ticatec/uniface-element/PopupHint";

    import columns from "./columns";
    import type IndicatorColumn from "$lib/lib/IndicatorColumn";
    import i18n from "@ticatec/i18n";
    import {DialogBoard} from "@ticatec/uniface-element/Dialog";
    import MessageBoxBoard, {ModalResult} from "@ticatec/uniface-element/MessageBox";
    import ToastBoard from "@ticatec/uniface-element/Toast";
    import IndicatorBoard from "@ticatec/uniface-element/IndicatorBoard";
    import type RowData from "$lib/lib/RowData";
    import {StringValidator} from "@ticatec/web-bean-validator";

    i18n.languages = ['en', 'zh-CN'];
    i18n.setResource(cn_resource);

    let list1: Array<any> = [
        {address: "8 crofton close, wonga park."},
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
    ];
    let list = [...list1, ...list1, ...list1, ...list1, ...list1]

    let indicatorColumn: IndicatorColumn = {
        selectable: true,
        displayNo: true,
        width: 60
    }

    const deleteConfirm = async (data: any): Promise<boolean> => {
        return await window.MessageBox.showConfirm('确定要删除这条数据吗？') == ModalResult.MR_OK;
    }


    const removeSelectedRows = () => {
        console.log('删除选中行');
        if (selectedRows.length > 0) {
            table.removeRows(...selectedRows)
        }
    }

    let selectedRows: Array<any>;

    let table: any;

    let rules = [
        new StringValidator('gender', {required: true})
    ]

    let validate = () => {
        console.log('当前数据', table.getData());
        table.validateData(rules);
    }
//    {deleteConfirm}
    $: console.log('选中数据：', selectedRows);

</script>

<div style="padding: 20px; box-sizing: border-box; height: 60%;">
    <TextEditor variant="plain" value="234234234" style="width: 120px"/>

    <Box style="height: 600px; width: 90%">
        <EditorDataTable bind:this={table} {list} {columns} {indicatorColumn} bind:selectedRows allowDelete />
    </Box>
    <Button type="primary" label="批量删除" onClick={removeSelectedRows}/>
    <Button type="primary" label="数据检查" onClick={validate}/>
</div>
<DialogBoard/>
<MessageBoxBoard/>
<PopupHint/>
<ToastBoard/>
<IndicatorBoard/>







