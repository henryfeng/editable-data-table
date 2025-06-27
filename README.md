
# @ticatec/uniface-editable-data-table

A highly customizable **multi-row editable data table** for [Svelte 5](https://svelte.dev), with built-in support for inline editing, row validation, optional row indicator and action buttons, and dynamic column configuration.

---

## ✨ Features

- 📝 Inline editing with multiple editor types (text, number, date, checkbox, etc.)
- ✅ Built-in validation system using `@ticatec/web-bean-validator`
- 🧭 Optional row indicator column (row numbers, selection)
- 🗑️ Optional row delete support with confirmation
- 📏 Configurable columns (type, width, formatter, editable)
- 🔁 Live column refresh support
- 🧱 Designed for enterprise-grade editable data UIs

---

## 📦 Installation

```bash
npm install @ticatec/uniface-editable-data-table
````

Requires `svelte@^5` as a peer dependency.

---

## 🚀 Basic Usage

```svelte
<script lang="ts">
  import EditableDataTable from "@ticatec/uniface-editable-data-table";
  import type { DataColumn, IndicatorColumn } from "@ticatec/uniface-element/DataTable";

  let columns: DataColumn[] = [
    { field: "name", text: "Name", type: "text", width: 150 },
    { field: "age", text: "Age", type: "number", width: 100 },
    { field: "birth", text: "Birth Date", type: "date", width: 180 },
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

## 🔧 Props

| Prop              | Type                             | Default      | Description                                    |
| ----------------- | -------------------------------- | ------------ | ---------------------------------------------- |
| `columns`         | `DataColumn[]`                   | *(required)* | Column definitions                             |
| `list`            | `any[]`                          | *(required)* | Data rows                                      |
| `selectedRows`    | `any[]`                          | `[]`         | Selected row references                        |
| `indicatorColumn` | `IndicatorColumn \| null`        | `null`       | Optional row indicators (checkbox, row number) |
| `rowHeight`       | `number`                         | `40`         | Row height in pixels                           |
| `allowDelete`     | `boolean`                        | `true`       | Whether to allow row deletion                  |
| `deleteConfirm`   | `(row: any) => Promise<boolean>` | `true`       | Async confirmation before deleting a row       |
| `style`           | `string`                         | `''`         | Inline styles for the table container          |

---

## 🧪 Exposed Methods

These methods are exported from the module and can be used from outside the component:

```ts
import {
  getData,
  removeRows,
  validateData
} from "@ticatec/uniface-editable-data-table";
```

### `getData(): any[]`

Returns the current list of edited row data.

### `removeRows(...rows: RowData[])`

Removes one or more rows from the table.

### `validateData(rules: BaseValidator[]): boolean`

Validates all rows using an array of `BaseValidator`. Returns `true` if all rows are valid, otherwise highlights invalid ones.

---

## 🧱 DataColumn Definition

```ts
interface DataColumn {
  field?: string;
  text: string;
  align?: 'left' | 'center' | 'right';
  width: number;
  resizable?: boolean;
  visible?: boolean;
  type?: string; // text | number | date | date-time | boolean | options-selector | multi-select
  attrs?: any;
  props?: any;
  minWidth?: number;
  formatter?: FormatCell;
  escapeHTML?: boolean;
}
```

---

## 🧭 IndicatorColumn Definition

```ts
interface IndicatorColumn {
  width: number;
  selectable?: boolean;
  displayNo?: boolean;
}
```

Set `selectable: true` to show checkboxes, and `displayNo: true` to show row numbers.

---

## 🧩 Row Delete Confirmation

To control row deletion with confirmation:

```ts
function confirmDelete(row: any): Promise<boolean> {
  return Promise.resolve(confirm(`Delete row: ${row.name}?`));
}
```

Pass it via:

```svelte
<EditableDataTable
  {columns}
  {list}
  allowDelete={true}
  {deleteConfirm}
/>
```

---

## 🧰 Editor Types

Registered by default:

| `type`               | Editor Component           |
| -------------------- | -------------------------- |
| `"text"`             | `InlineTextEditor`         |
| `"number"`           | `InlineNumberEditor`       |
| `"date"`             | `InlineDatePicker`         |
| `"date-time"`        | `InlineDateTimePicker`     |
| `"boolean"`          | `InlineCheckbox`           |
| `"options-selector"` | `InlineOptionsSelect`      |
| `"multi-select"`     | `InlineOptionsMultiSelect` |

You can register custom editors via:

```ts
import editorManager from "@ticatec/uniface-editable-data-table/lib/editorManager";
editorManager.register("custom-type", YourCustomEditorComponent);
```

---

## 🎨 Styling

To include the default styles:

```ts
import "@ticatec/uniface-editable-data-table/uniface-editable-datatable.css";
```

You can also override styles using the `style` prop or custom CSS.

---

## 📄 License

MIT

---

## 👤 Author

**Henry Feng**
[@ticatec](https://www.npmjs.com/org/ticatec)

---

## 🔗 Related Packages

* [`@ticatec/uniface-element`](https://www.npmjs.com/package/@ticatec/uniface-element) - Common UI element toolkit
* [`@ticatec/web-bean-validator`](https://www.npmjs.com/package/@ticatec/web-bean-validator) - Lightweight bean-style validator
* [`@ticatec/i18n`](https://www.npmjs.com/package/@ticatec/i18n) - i18n support with key registry

