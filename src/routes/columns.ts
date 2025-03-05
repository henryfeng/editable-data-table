import type DataColumn from "$lib/lib/DataColumn";

const columns: Array<DataColumn> =
    [
        {
            text: "姓名",
            width: 130,
            resizable: true,
            type: "text",
            props: {
                field: "name"
            }
        },
        {
            text: "性别",
            width: 120,
            type: "options-selector",
            props: {
                field: "gender",
                options: [
                    {code: "M", text: "男性"},
                    {code: "F", text: "女性"}
                ]
            }
        },
        {
            text: "家庭地址",
            width: 360,
            type: "text",
            resizable: true,
            props: {
                field: "address"
            }
        },
        {
            text: "航司",
            width: 360,
            type: "multi-select",
            resizable: true,
            props: {
                field: "airline",
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
            width: 120,
            type: "text",
            resizable: true,
            props: {
                field: "phoneNumber"
            }
        },
        {
            text: "联系人",
            width: 120,
            type: "text",
            props: {
                field: "concatPerson"
            }
        },
        {
            text: "总费用",
            width: 120,
            type: "number",
            props: {
                field: "totalFee"
            }
        },
        {
            text: "以结算",
            width: 120,
            type: "boolean",
            props: {
                field: "settle"
            }
        },
        {
            text: "入院日期",
            width: 120,
            type: "date",
            props: {
                field: "enrollDate"
            }
        },
        {
            text: "出院日期",
            width: 240,
            type: "date-time",
            props: {
                field: "dischargeDate"
            }
        }
    ]

export default columns;