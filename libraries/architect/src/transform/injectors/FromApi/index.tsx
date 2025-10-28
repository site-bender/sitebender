import type {
	ComplexDatatype,
	FromApiInjector,
	Value,
} from "../../../../../architect/types/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style

import FromApiConstructor from "../../../../../architect/src/constructors/injectors/FromApi/index.ts"

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
}: FromApiProps): FromApiInjector {
	const actualType = datatype || type

	// FromApi constructor signature: (datatype) => (options)
	return FromApiConstructor(actualType)({ endpoint, method, headers, body })
}
