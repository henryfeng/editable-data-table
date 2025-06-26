import type {FormatCell} from "@ticatec/uniface-element/DataTable";

export default interface DataColumn  {

    /**
     * 对应的字段/属性名
     */
    field?: string;
    /**
     * 列头文字
     */
    text: string
    /**
     * 对齐方式
     */
    align?: 'left' | 'center' | 'right';
    /**
     *
     */
    width: number;
    /**
     *
     */
    resizable?: boolean;
    /**
     * 是否显示
     */
    visible?: boolean;

    /**
     * 编辑器的类型
     */
    type?: string;
    /**
     * 属性
     */
    attrs?: any;

    /**
     * 编辑器属性
     */
    props?: any;

    /**
     * 最小宽度
     */
    minWidth?: number;

    /**
     * 单元格转换函数
     */
    formatter?: FormatCell;

    /**
     * 是否忽略html的转义符
     */
    escapeHTML?: boolean;

}
