import type { JsonValue } from "@sitebender/engine-types/json/index.ts"
import type { LookupConfig } from "@sitebender/engine-types/lookups/index.ts"

const Lookup = (datatype = "Json") =>
(id: string) =>
(
	value: JsonValue,
): LookupConfig => ({
	tag: "Data",
	attributes: {
		class: "lookup",
		id,
		value,
	},
	dataset: {
		type: datatype,
	},
})

export default Lookup
