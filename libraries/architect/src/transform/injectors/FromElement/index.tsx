//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style

// Marker only; compiler maps to Architect IR

export type FromElementProps = {
	id?: string
	selector?: string
	type?: "Number" | "String" | "Boolean" | "Date" | "Json"
	datatype?: "Number" | "String" | "Boolean" | "Date" | "Json"
}

export default function FromElement(
	{ id, selector, type = "String", datatype }: FromElementProps,
) {
	const actualType = datatype || type
	const source = id ? `#${id}` : selector || ""
	return {
		type: "injector",
		tag: "FromElement",
		datatype: actualType,
		source,
	}
}
