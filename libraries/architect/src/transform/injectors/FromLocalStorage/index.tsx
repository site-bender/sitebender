import type { FromLocalStorageInjector } from "../../../../../artificer/types/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style

import FromLocalStorageConstructor from "../../../../../artificer/src/constructors/injectors/FromLocalStorage/index.ts"

export type FromLocalStorageProps = {
	key: string
	type?: "String" | "Number" | "Boolean" | "Json"
	datatype?: "String" | "Number" | "Boolean" | "Json"
	defaultValue?: import("../../../../../artificer/types/index.ts").Value
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
