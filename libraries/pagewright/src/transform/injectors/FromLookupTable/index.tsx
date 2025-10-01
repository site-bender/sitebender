import type {
	ComplexDatatype,
	FromLookupTableInjector,
	Operand,
} from "../../../../../architect/types/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style

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
