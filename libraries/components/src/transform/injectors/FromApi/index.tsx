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

import FromApiConstructor from "../../../../../adaptive/src/constructors/injectors/FromApi/index.ts"

export type FromApiProps = {
	endpoint: string
	type?: "Json" | "String" | "Number" | "Boolean"
	datatype?: "Json" | "String" | "Number" | "Boolean"
	method?: "GET" | "POST" | "PUT" | "DELETE"
	headers?: Record<string, string>
	body?: any
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
