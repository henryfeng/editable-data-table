import { writable } from 'svelte/store';

export function createDataStore(initial:Array<any> = []) {
    const { subscribe, set, update } = writable(initial);

    // 自定义数组操作方法，确保只监听数组结构变化
    return {
        subscribe,
        // 设置新数组
        set: (newArray: Array<any>) => {
            set([...newArray]); // 始终创建新数组以触发更新
        },
        // 添加元素
        push: (...items: Array<any>) => {
            update(current => [...current, ...items]);
        },
        // 删除最后一个元素
        pop: () => {
            update(current => current.slice(0, -1));
        },
        // 删除指定索引的元素
        remove: (index: number) => {
            update((current: Array<any>) => {
                current.splice(index, 1);
                return [...current]
            });
        },
        // 替换数组的某个索引
        replace: (index: number, item: any) => {
            update(current => {
                const newArray = [...current];
                newArray[index] = item;
                return newArray;
            });
        },
        // 清空数组
        clear: () => {
            set([]);
        }
    };
}