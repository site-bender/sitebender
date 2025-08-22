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

import FromLookupConstructor from "../../../../adaptive/constructors/injectors/FromLookup/index.ts"

export type FromLookupProps = {
	table: string
	key: string
	type?: "String" | "Number" | "Boolean" | "Json"
	datatype?: "String" | "Number" | "Boolean" | "Json"
	defaultValue?: any
}

export default function FromLookup({
	table,
	key,
	type = "String",
	datatype,
	defaultValue,
}: FromLookupProps): ReturnType<typeof FromLookupConstructor> {
	const actualType = datatype || type

	// FromLookup constructor signature: (datatype) => (table) => (key) => (defaultValue)
	return FromLookupConstructor(actualType)(table)(key)(defaultValue)
}
