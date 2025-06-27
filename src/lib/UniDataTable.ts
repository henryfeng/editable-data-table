import type DataColumn from "./lib/DataColumn";

import type RowData from "$lib/lib/RowData";


export type RowEventHandler = (row: RowData) => void;
export type RowSelectEventHandler = (row: RowData, value: boolean) => void;
export type TableEventHandler = () => void;
export type SelectionEventHandler = (value: boolean) => void;
export type DeleteConfirm = (data: any) => Promise<boolean>;

export enum SelectionMode {
    All = 1,
    Partial = 0,
    None = -1
}

export default class UniDataTable {

    private _columns: Array<DataColumn> = [];
    readonly id: string;
    private _width: number = 0;

    constructor(id: string) {
        this.id = id;
    }

    setColumns(columns: Array<DataColumn>) {
        this._columns = [];
        (columns ?? []).forEach(col => {
            this._columns.push(col);
        });
    }

    generateTemplateStyle(): string {
        this._width = 0;
        let colStyle = '';
        let inv = 0;
        this._columns.forEach((col, idx) => {
            if (col.visible != false) {
                this._width += col.width;
                colStyle += `#tab-${this.id} .col-${idx - inv} { width: ${col.width}px ; text-align: ${col.align ?? 'left'} }\n`;
            } else {
                inv++;
            }
        });
        return `<style>${colStyle}</style>`;
    }

    get width() {
        return this._width;
    }


    get columns(): Array<DataColumn> {
        return this._columns;
    }
}
