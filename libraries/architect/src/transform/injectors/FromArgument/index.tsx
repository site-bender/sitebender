import type { FromArgumentInjector } from "../../../../../artificer/types/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style

import FromArgumentConstructor from "../../../../../artificer/src/constructors/injectors/FromArgument/index.ts"

export type FromArgumentProps = {
	name: string
	type?: "String" | "Number" | "Boolean" | "Json"
	datatype?: "String" | "Number" | "Boolean" | "Json"
}

export default function FromArgument({
	name,
	type = "String",
	datatype,
}: FromArgumentProps): FromArgumentInjector {
	const actualType = datatype || type

	// FromArgument constructor signature: (datatype) => (name)
	return FromArgumentConstructor(actualType)(name)
}
