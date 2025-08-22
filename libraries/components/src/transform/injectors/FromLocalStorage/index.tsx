/**
 * FromLocalStorage JSX Component
 *
 * Wrapper for the FromLocalStorage injector constructor.
 * Gets a value from browser localStorage.
 *
 * @example
 * <FromLocalStorage key="userPreference" type="String" />
 * <FromLocalStorage key="settings" type="Json" />
 */

import FromLocalStorageConstructor from "../../../../adaptive/constructors/injectors/FromLocalStorage/index.ts"

export type FromLocalStorageProps = {
	key: string
	type?: "String" | "Number" | "Boolean" | "Json"
	datatype?: "String" | "Number" | "Boolean" | "Json"
}

export default function FromLocalStorage({
	key,
	type = "String",
	datatype,
}: FromLocalStorageProps): ReturnType<typeof FromLocalStorageConstructor> {
	const actualType = datatype || type

	return FromLocalStorageConstructor(actualType)(key)
}
