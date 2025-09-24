import type {
	ComplexDatatype,
	FromLookupTableInjector,
	Operand,
} from "../../../../../architect/types/index.ts"

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

import FromLookupTableConstructor from "../../../../../architect/src/constructors/injectors/FromLookupTable/index.ts"

export type FromLookupTableProps = {
	tableName: string
	column: string
	local?: string
	test: Operand
	type?: ComplexDatatype
	datatype?: ComplexDatatype
}

export default function FromLookupTable({
	tableName,
	column,
	local,
	test,
	type = "Json",
	datatype,
}: FromLookupTableProps): FromLookupTableInjector {
	const actualType = datatype || type

	// FromLookupTable constructor signature: (datatype) => (config)
	return FromLookupTableConstructor(actualType)({
		tableName,
		column,
		local,
		test,
	})
}
