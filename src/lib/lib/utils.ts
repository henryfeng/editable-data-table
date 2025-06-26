
import type DataColumn from "$lib/lib/DataColumn";

const buildColumnStyle = (id: string, columns: Array<DataColumn>): string => {
    let style = '';
    columns.forEach((col: DataColumn, idx: number)=> {
        style += `#tab-${id} .col-${idx+1} {\n width: ${col.width??100}px; \n} \n`
    })
    return `<style>${style}</style>`;
}

/**
 * 睡眠n秒
 * @param n
 */
const sleep = (n: number): Promise<void> => {
    if (n < 0) {
        n = 1;
    }
    return new Promise(resolve => {
        setTimeout(() => {
            resolve()
        }, n * 1000);
    })
}

export default {
    buildColumnStyle,
    sleep
}