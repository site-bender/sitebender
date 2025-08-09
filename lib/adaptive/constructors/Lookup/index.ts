import type { JsonValue } from "../../types/json/index.ts"
import type { LookupConfig } from "../../types/lookups/index.ts"

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
