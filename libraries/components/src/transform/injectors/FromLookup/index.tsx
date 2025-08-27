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

import FromLookupConstructor from "../../../../../adaptive/src/constructors/injectors/FromLookup/index.ts"

export type FromLookupProps = {
	id: string
	type?: "String" | "Number" | "Boolean" | "Json"
	datatype?: "String" | "Number" | "Boolean" | "Json"
	defaultValue?: any
}

export default function FromLookup({
	id,
	type = "String",
	datatype,
	defaultValue,
}: FromLookupProps): ReturnType<ReturnType<typeof FromLookupConstructor>> {
	const actualType = datatype || type

	// FromLookup constructor signature: (datatype) => (id, defaultValue)
	return FromLookupConstructor(actualType)(id, defaultValue)
}
