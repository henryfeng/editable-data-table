import SnowflakeID from "snowflake-id";
const snowflake = new SnowflakeID({
    mid: 30,
    offset: (2020 - 1970) * 31536000 * 1000
});

/**
 * 根据字段名获取对于的值，支持"."嵌套获取
 * @param data
 * @param field
 */
const extractFieldValue = (data: any, field?: string): any => {
    let v = data;
    if (field != null) {
        let attrs = field.split(".");
        for (let attr of attrs) {
            v = v == null ? null : v[attr]
        }
    }
    return v;
}

const genId = (): string => {
    return snowflake.generate(); // 返回的是 bigint 类型的 ID
}

export default {
    extractFieldValue,
    genId
}