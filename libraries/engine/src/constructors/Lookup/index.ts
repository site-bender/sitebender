import type { JsonValue } from "@engineTypes/json/index.ts"
import type { LookupConfig } from "@engineTypes/lookups/index.ts"

const Lookup =
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
