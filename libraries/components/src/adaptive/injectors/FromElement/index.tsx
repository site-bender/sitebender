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

import FromElementConstructor from "../../../../adaptive/constructors/injectors/FromElement/index.ts"

export type FromElementProps = {
	id?: string
	selector?: string
	type?: "Number" | "String" | "Boolean" | "Date" | "Json"
	datatype?: "Number" | "String" | "Boolean" | "Date" | "Json"
}

export default function FromElement({
	id,
	selector,
	type = "String",
	datatype,
}: FromElementProps): ReturnType<typeof FromElementConstructor> {
	const actualType = datatype || type
	const source = id ? `#${id}` : selector || ""

	return FromElementConstructor(actualType)(source)
}
