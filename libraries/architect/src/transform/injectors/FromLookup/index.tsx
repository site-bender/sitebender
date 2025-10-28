import type {
	ComplexDatatype,
	FromLookupInjector,
	Value,
} from "../../../../../architect/types/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style

import FromLookupConstructor from "../../../../../architect/src/constructors/injectors/FromLookup/index.ts"

export type FromLookupProps = {
	id: string
	type?: ComplexDatatype
	datatype?: ComplexDatatype
	defaultValue?: Value
}

export default function FromLookup({
	id,
	type = "Json",
	datatype,
	defaultValue,
}: FromLookupProps): FromLookupInjector {
	const actualType = datatype || type

	// FromLookup constructor signature: (datatype) => (id, defaultValue)
	return FromLookupConstructor(actualType)(id, defaultValue)
}
