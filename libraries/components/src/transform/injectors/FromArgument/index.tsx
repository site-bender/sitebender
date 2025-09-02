import type { FromArgumentInjector } from "@engineTypes/index.ts"

/**
 * FromArgument JSX Component
 *
 * Wrapper for the FromArgument injector constructor.
 * Gets a value passed as an argument to a calculation.
 *
 * @example
 * <FromArgument
 *   name="userId"
 *   type="String"
 * />
 */

import FromArgumentConstructor from "@engineSrc/constructors/injectors/FromArgument/index.ts"

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
