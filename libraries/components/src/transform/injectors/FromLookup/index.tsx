/**
 * FromLookup JSX Component
 *
 * Wrapper for the FromLookup injector constructor.
 * Gets a value from a lookup table based on a key.
 *
 * @example
 * <FromLookup
 *   table="statusCodes"
 *   key="404"
 *   type="String"
 * />
 */

import FromLookupConstructor from "@adaptiveSrc/constructors/injectors/FromLookup/index.ts"
import type { ComplexDatatype, FromLookupInjector, Value } from "@adaptiveTypes/index.ts"

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
