import {writable} from 'svelte/store';
import RowData from "$lib/lib/RowData";


function createRowsStore(initial: Array<any> = []) {
    const {subscribe, set, update} = writable(initial.map(item => new RowData(item)));

    return {
        subscribe,
        // 设置新数组
        set: (newArray: Array<any>) => {
            set(newArray.map(item => new RowData(item))); // 始终创建新数组以触发更新
        },
        // 添加元素
        push: (...items: Array<any>) => {
            update((current: Array<any>) => [...current, items.map(item => new RowData(item))]);
        },
        // 删除指定索引的元素
        remove: (...rows: Array<RowData>) => {
            update((current: Array<any>) => {
                let newArray = [...current];
                for (let row of rows) {
                    const index = newArray.findIndex(item => item.id === row.id);
                    if (index > -1) {
                        newArray.splice(index, 1);
                    }
                }
                return newArray;
            });
        },
        invalid: () => {
            update((current: Array<any>) => {
                return [...current]
            })
        },
        // 替换数组的某个索引
        replace: (index: number, item: any) => {
            update(current => {
                const newArray = [...current];
                newArray[index] = new RowData(item);
                return newArray;
            });
        },
        // 清空数组
        clear: () => {
            set([]);
        }
    };
}

export const rows = createRowsStore([]);

