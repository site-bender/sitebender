import type { JsonValue } from "@adaptiveTypes/json/index.ts"
import type { LookupConfig } from "@adaptiveTypes/lookups/index.ts"

export const Lookup =
	(datatype = "Json") => (id: string) => (value: JsonValue): LookupConfig => ({
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
