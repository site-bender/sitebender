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

import FromLocalStorageConstructor from "@adaptiveSrc/constructors/injectors/FromLocalStorage/index.ts"
import type { FromLocalStorageInjector } from "@adaptiveTypes/index.ts"

export type FromLocalStorageProps = {
	key: string
	type?: "String" | "Number" | "Boolean" | "Json"
	datatype?: "String" | "Number" | "Boolean" | "Json"
	defaultValue?: import("@adaptiveTypes/index.ts").Value
}

export default function FromLocalStorage({
	key,
	type = "String",
	datatype,
	defaultValue,
}: FromLocalStorageProps): FromLocalStorageInjector {
	const actualType = datatype || type

	return FromLocalStorageConstructor(actualType)(key, defaultValue)
}
