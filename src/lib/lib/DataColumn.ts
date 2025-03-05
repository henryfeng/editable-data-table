
export default interface DataColumn  {
    /**
     * 列头文字
     */
    text: string;
    /**
     *
     */
    width: number;
    /**
     *
     */
    resizable?: boolean;
    /**
     * 编辑器的类型
     */
    type: string;
    /**
     *
     */
    props: any;
}
