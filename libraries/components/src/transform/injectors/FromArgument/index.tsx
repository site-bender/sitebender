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

import FromArgumentConstructor from "../../../../adaptive/constructors/injectors/FromArgument/index.ts"

export type FromArgumentProps = {
	name: string
	type?: "String" | "Number" | "Boolean" | "Json"
	datatype?: "String" | "Number" | "Boolean" | "Json"
	defaultValue?: any
}

export default function FromArgument({
	name,
	type = "String",
	datatype,
	defaultValue,
}: FromArgumentProps): ReturnType<typeof FromArgumentConstructor> {
	const actualType = datatype || type

	// FromArgument constructor signature: (datatype) => (name) => (defaultValue)
	return FromArgumentConstructor(actualType)(name)(defaultValue)
}
