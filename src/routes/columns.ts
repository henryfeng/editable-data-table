import type DataColumn from "$lib/lib/DataColumn";

const columns: Array<DataColumn> =
    [
        {
            text: "姓名",
            field: "name",
            width: 130,
            resizable: true,
            type: "text",
            attrs: {}
        },
        {
            text: "性别",
            field: "gender",
            width: 120,
            type: "options-selector",
            props: {
                options: [
                    {code: "M", text: "男性"},
                    {code: "F", text: "女性"}
                ],
                mandatory: true
            },
        },
        {
            text: "家庭地址",
            field: "address",
            width: 360,
            resizable: true,
        },
        {
            text: "航司",
            field: "airline",
            width: 360,
            type: "multi-select",
            resizable: true,
            props: {
                options: [
                    {code: "CN", text: "国行"},
                    {code: "CZ", text: "南航"},
                    {code: "CE", text: "东方"},
                    {code: "MF", text: "厦航"}
                ]
            }
        },
        {
            text: "联系电话",
            field: "telphone",
            width: 120,
            type: "text",
            resizable: true,
            props: {
                input$maxLength: 20
            }
        },
        {
            text: "联系人",
            field: "concat",
            width: 120,
            type: "text",
            props: {
                input$maxLength: 40
            }
        },
        {
            text: "总费用",
            field: "totalFee",
            width: 120,
            type: "number",
            props: {
                precision: 2
            }
        },
        {
            text: "以结算",
            field: "settle",
            width: 120,
            type: "boolean",
            props: {}
        },
        {
            text: "入院日期",
            field: "enrollDate",
            width: 120,
            type: "date",
            props: {}
        },
        {
            text: "出院日期",
            field: "dischargeDate",
            width: 240,
            type: "date-time",
            props: {}
        }
    ]

export default columns;