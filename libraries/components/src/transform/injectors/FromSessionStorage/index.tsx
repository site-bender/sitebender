/**
 * FromSessionStorage JSX Component
 *
 * Wrapper for the FromSessionStorage injector constructor.
 * Gets a value from browser session storage.
 *
 * @example
 * <FromSessionStorage
 *   key="userSession"
 *   type="Json"
 *   defaultValue={{}}
 * />
 */

import FromSessionStorageConstructor from "@adaptiveSrc/constructors/injectors/FromSessionStorage/index.ts"

export type FromSessionStorageProps = {
	key: string
	type?: "String" | "Number" | "Boolean" | "Json"
	datatype?: "String" | "Number" | "Boolean" | "Json"
	defaultValue?: unknown
}

export default function FromSessionStorage({
	key,
	type = "String",
	datatype,
	defaultValue,
}: FromSessionStorageProps): ReturnType<ReturnType<typeof FromSessionStorageConstructor>> {
	const actualType = datatype || type

	// FromSessionStorage constructor signature: (datatype) => (key, defaultValue)
	return FromSessionStorageConstructor(actualType)(key, defaultValue)
}
