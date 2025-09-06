/**
 * FromElement JSX Component
 *
 * Wrapper for the FromElement injector constructor.
 * Gets a value from a DOM element by ID or selector.
 *
 * @example
 * <FromElement id="price" type="Number" />
 * <FromElement selector=".total-field" type="String" />
 */

// Marker only; compiler maps to Engine IR

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
