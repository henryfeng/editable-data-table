
import type DataColumn from "$lib/lib/DataColumn";

const buildColumnStyle = (id: string, columns: Array<DataColumn>): string => {
    let style = '';
    columns.forEach((col: DataColumn, idx: number)=> {
        style += `#tab-${id} .col-${idx+1} {\n width: ${col.width??100}px; \n} \n`
    })
    return `<style>${style}</style>`;
}

export default {
    buildColumnStyle
}