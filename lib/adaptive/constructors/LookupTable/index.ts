import type { JsonValue } from "../../types/json/index.ts"
import type { LookupTableConfig } from "../../types/lookups/index.ts"

export const LookupTable = (datatype = "Json") =>
(id: string) =>
(
	table: JsonValue,
): LookupTableConfig => ({
	tag: "Data",
	attributes: {
		class: "lookup-table",
		id,
		value: table,
	},
	dataset: {
		type: datatype,
	},
})

export default LookupTable
