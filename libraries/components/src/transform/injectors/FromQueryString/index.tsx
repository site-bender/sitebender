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

import FromQueryStringConstructor from "@adaptiveSrc/constructors/injectors/FromQueryString/index.ts"
import type { Datatype, Value } from "@adaptiveTypes/index.ts"

export type FromQueryStringProps = {
	param: string
	type?: Datatype
	datatype?: Datatype
	defaultValue?: Value
}

export default function FromQueryString({
	param,
	type = "String",
	datatype,
	defaultValue,
}: FromQueryStringProps): ReturnType<ReturnType<typeof FromQueryStringConstructor>> {
	const actualType = datatype || type

	// FromQueryString constructor signature: (datatype) => (key, defaultValue)
	return FromQueryStringConstructor(actualType)(param, defaultValue)
}
