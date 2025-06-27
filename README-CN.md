# @ticatec/uniface-editable-data-table

一个高度可定制的 **多行可编辑表格组件**，适用于 [Svelte 5](https://svelte.dev)，支持内联编辑、数据校验、可选的行指示列与操作列，并支持动态列配置，适用于中后台管理系统场景。

---

## ✨ 功能亮点

- 📝 多类型内联编辑（文本、数字、日期、布尔、多选等）
- ✅ 集成数据校验机制，基于 `@ticatec/web-bean-validator`
- 🧭 支持可选的行指示列（如行号、选择框）
- 🗑️ 内置行删除操作，可配置删除确认
- 📏 列支持配置宽度、格式化、编辑器类型等
- 🔁 列刷新支持，适应动态表格结构
- 🧱 适用于企业级数据管理界面

---

## 📦 安装方法

```bash
npm install @ticatec/uniface-editable-data-table
````

需要同时安装 `svelte@^5` 作为对等依赖。

---

## 🚀 基础使用示例

```svelte
<script lang="ts">
  import EditableDataTable from "@ticatec/uniface-editable-data-table";
  import type { DataColumn } from "@ticatec/uniface-element/DataTable";

  let columns: DataColumn[] = [
    { field: "name", text: "姓名", type: "text", width: 150 },
    { field: "age", text: "年龄", type: "number", width: 100 },
    { field: "birth", text: "出生日期", type: "date", width: 180 },
  ];

  let list = [
    { name: "Alice", age: 28, birth: "1996-01-01" },
    { name: "Bob", age: 35, birth: "1989-05-12" },
  ];
</script>

<EditableDataTable
  {columns}
  {list}
  rowHeight={40}
  allowDelete={true}
/>
```

---

## 🔧 组件属性（Props）

| 属性名               | 类型                          | 默认值    | 说明                |
| ----------------- | --------------------------- | ------ | ----------------- |
| `columns`         | `DataColumn[]`              | —      | 表格列配置（必填）         |
| `list`            | `any[]`                     | —      | 表格数据列表（必填）        |
| `selectedRows`    | `any[]`                     | `[]`   | 当前选中的行数据（支持响应式绑定） |
| `indicatorColumn` | `IndicatorColumn \| null`   | `null` | 可选的行指示列（支持行号、复选框） |
| `rowHeight`       | `number`                    | `40`   | 每行高度（像素）          |
| `allowDelete`     | `boolean`                   | `true` | 是否允许行删除           |
| `deleteConfirm`   | `(row) => Promise<boolean>` | `true` | 删除前的异步确认函数        |
| `style`           | `string`                    | `''`   | 表格外层容器样式          |

---

## 🧪 可调用方法（导出 API）

你可以从组件中导出以下方法：

```ts
import {
  getData,
  removeRows,
  validateData
} from "@ticatec/uniface-editable-data-table";
```

### `getData(): any[]`

获取当前编辑后的所有行数据。

### `removeRows(...rows: RowData[])`

删除指定的行。

### `validateData(rules: BaseValidator[]): boolean`

使用指定的校验规则批量校验所有行。返回 `true` 表示全部校验通过，`false` 表示存在错误。

---

## 🧱 列定义结构（DataColumn）

```ts
interface DataColumn {
  field?: string;           // 字段名
  text: string;             // 列标题
  align?: 'left' | 'center' | 'right';  // 对齐方式
  width: number;            // 宽度（必填）
  resizable?: boolean;      // 是否可拖拽改变宽度
  visible?: boolean;        // 是否显示
  type?: string;            // 编辑器类型，例如 text、number、date
  attrs?: any;              // 原始 DOM 属性
  props?: any;              // 编辑器组件的 props
  minWidth?: number;        // 最小宽度
  formatter?: FormatCell;   // 单元格格式化函数
  escapeHTML?: boolean;     // 是否转义 HTML
}
```

---

## 🧭 行指示列（IndicatorColumn）

```ts
interface IndicatorColumn {
  width: number;
  selectable?: boolean;  // 显示复选框
  displayNo?: boolean;   // 显示行号
}
```

---

## 🧩 删除确认逻辑

通过 `deleteConfirm` 属性自定义删除确认：

```ts
function confirmDelete(row: any): Promise<boolean> {
  return Promise.resolve(confirm(`确定要删除 ${row.name} 吗？`));
}
```

```svelte
<EditableDataTable
  {columns}
  {list}
  allowDelete={true}
  deleteConfirm={confirmDelete}
/>
```

---

## 🎛️ 支持的内置编辑器类型

| `type` 值             | 编辑器组件名                          |
| -------------------- | ------------------------------- |
| `"text"`             | 文本输入框 `InlineTextEditor`        |
| `"number"`           | 数字输入框 `InlineNumberEditor`      |
| `"date"`             | 日期选择器 `InlineDatePicker`        |
| `"date-time"`        | 日期时间选择器 `InlineDateTimePicker`  |
| `"boolean"`          | 复选框 `InlineCheckbox`            |
| `"options-selector"` | 下拉选择器 `InlineOptionsSelect`     |
| `"multi-select"`     | 多选组件 `InlineOptionsMultiSelect` |

你也可以注册自定义编辑器：

```ts
import editorManager from "@ticatec/uniface-editable-data-table/lib/editorManager";
editorManager.register("my-type", MyCustomEditor);
```

---

## 🎨 样式导入

默认样式文件位于：

```ts
import "@ticatec/uniface-editable-data-table/uniface-editable-datatable.css";
```

你也可以通过 `style` 属性或 CSS 变量自定义外观。

---

## 📄 开源协议

MIT License

---

## 👤 作者

**Henry Feng**
[@ticatec](https://www.npmjs.com/org/ticatec)

---

## 🔗 相关依赖推荐

* [`@ticatec/uniface-element`](https://www.npmjs.com/package/@ticatec/uniface-element)：通用 UI 元素组件
* [`@ticatec/web-bean-validator`](https://www.npmjs.com/package/@ticatec/web-bean-validator)：轻量级数据校验库
* [`@ticatec/i18n`](https://www.npmjs.com/package/@ticatec/i18n)：国际化支持

