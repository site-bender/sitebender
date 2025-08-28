/**
 * FromApi JSX Component
 *
 * Wrapper for the FromApi injector constructor.
 * Fetches data from an API endpoint.
 *
 * @example
 * <FromApi
 *   endpoint="/api/user/profile"
 *   type="Json"
 *   method="GET"
 * />
 */

import FromApiConstructor from "@adaptiveSrc/constructors/injectors/FromApi/index.ts"
import type { ComplexDatatype, Value } from "@adaptiveTypes/index.ts"

export type FromApiProps = {
	endpoint: string
	type?: ComplexDatatype
	datatype?: ComplexDatatype
	method?: "GET" | "POST" | "PUT" | "DELETE"
	headers?: Record<string, string>
	body?: Value
}

export default function FromApi({
	endpoint,
	type = "Json",
	datatype,
	method = "GET",
	headers,
	body,
}: FromApiProps): ReturnType<ReturnType<typeof FromApiConstructor>> {
	const actualType = datatype || type

	// FromApi constructor signature: (datatype) => (options)
	return FromApiConstructor(actualType)({ endpoint, method, headers, body })
}
