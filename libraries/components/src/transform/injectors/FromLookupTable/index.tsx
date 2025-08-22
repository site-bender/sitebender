/**
 * FromLookupTable JSX Component
 *
 * Wrapper for the FromLookupTable injector constructor.
 * Gets a value from a complex lookup table with multiple keys.
 *
 * @example
 * <FromLookupTable
 *   table="pricingMatrix"
 *   keys={["premium", "annual"]}
 *   type="Number"
 * />
 */

import FromLookupTableConstructor from "../../../../adaptive/constructors/injectors/FromLookupTable/index.ts"

export type FromLookupTableProps = {
	table: string
	keys: string[]
	type?: "String" | "Number" | "Boolean" | "Json"
	datatype?: "String" | "Number" | "Boolean" | "Json"
	defaultValue?: any
}

export default function FromLookupTable({
	table,
	keys,
	type = "String",
	datatype,
	defaultValue,
}: FromLookupTableProps): ReturnType<typeof FromLookupTableConstructor> {
	const actualType = datatype || type

	// FromLookupTable constructor signature: (datatype) => (table) => (keys) => (defaultValue)
	return FromLookupTableConstructor(actualType)(table)(keys)(defaultValue)
}
