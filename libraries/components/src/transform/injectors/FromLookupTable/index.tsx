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

import FromLookupTableConstructor from "../../../../../adaptive/src/constructors/injectors/FromLookupTable/index.ts"

export type FromLookupTableProps = {
	tableName: string
	column: string
	local?: string
	test: any
	type?: "String" | "Number" | "Boolean" | "Json"
	datatype?: "String" | "Number" | "Boolean" | "Json"
}

export default function FromLookupTable({
	tableName,
	column,
	local,
	test,
	type = "String",
	datatype,
}: FromLookupTableProps): ReturnType<ReturnType<typeof FromLookupTableConstructor>> {
	const actualType = datatype || type

	// FromLookupTable constructor signature: (datatype) => (config)
	return FromLookupTableConstructor(actualType)({ tableName, column, local, test })
}
