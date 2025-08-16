/**
 * FromQueryString JSX Component
 *
 * Wrapper for the FromQueryString injector constructor.
 * Gets a value from the URL query string parameters.
 *
 * @example
 * <FromQueryString
 *   param="page"
 *   type="Number"
 *   defaultValue={1}
 * />
 */

import FromQueryStringConstructor from "../../../../adaptive/constructors/injectors/FromQueryString/index.ts"

export type FromQueryStringProps = {
	param: string
	type?: "String" | "Number" | "Boolean"
	datatype?: "String" | "Number" | "Boolean"
	defaultValue?: any
}

export default function FromQueryString({
	param,
	type = "String",
	datatype,
	defaultValue,
}: FromQueryStringProps): ReturnType<typeof FromQueryStringConstructor> {
	const actualType = datatype || type

	// FromQueryString constructor signature: (datatype) => (param) => (defaultValue)
	return FromQueryStringConstructor(actualType)(param)(defaultValue)
}
