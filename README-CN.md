# 可编辑表格


## 表格定义

### 列定义

| 属性        | 名称      | 描述            |
|-----------|---------|---------------|
| text      | 列名      | 必填            |
| width     | 宽度      | 数字，px         |
| resizable | 是否可变宽度  | True/False    |
| type      | 字段类型      | 参考可以编辑字段类型    |
| readonly  | 是否只读    | 逻辑值，只读不显示编辑框  |
| props     | 编辑器属性   | 可以传递到编辑器组件的内部 |


## 字段类型

| 名称                       | 组件                   | 描述        |属性|
|--------------------------|----------------------|-----------|----|
| text-editor              | TextEditor           | 文本输入框     ||
| options-selector         | OptionsSelect        | 下拉单选框     ||
| number-editor            | NumberEditor         | 数字输入框     ||
| unit-number-editor       | UnitNumberEditor     | 带单位的数字输入框 ||
| date-picker              | DatePicker           | 日期选择框     ||
| date-time-picker         | DateTimePicker       | 日期时间选择框   ||
| cascade-options-selector | CascadeOptionsSelect | 级联多选      ||
| checkbox-group           | GroupCheckBox        | 多选框       ||
| time-editor              | TimeEditor           | 时间输入框     ||


