import type {
	FromSessionStorageInjector,
	Value,
} from "../../../../../architect/types/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style

import FromSessionStorageConstructor from "../../../../../architect/src/constructors/injectors/FromSessionStorage/index.ts"

export type FromSessionStorageProps = {
	key: string
	type?: "String" | "Number" | "Boolean" | "Json"
	datatype?: "String" | "Number" | "Boolean" | "Json"
	defaultValue?: Value
}

export default function FromSessionStorage({
	key,
	type = "String",
	datatype,
	defaultValue,
}: FromSessionStorageProps): FromSessionStorageInjector {
	const actualType = datatype || type

	// FromSessionStorage constructor signature: (datatype) => (key, defaultValue)
	return FromSessionStorageConstructor(actualType)(key, defaultValue)
}
