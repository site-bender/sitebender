import type {
	ComplexDatatype,
	FromApiInjector,
	Value,
} from "@sitebender/architect-types/index.ts"

import { OPERAND_TYPES } from "@sitebender/architect/constructors/constants/index.ts"

interface ApiOptions {
	endpoint: string
	method?: "GET" | "POST" | "PUT" | "DELETE"
	headers?: Record<string, string>
	body?: Value
}

const FromApi =
	(datatype: ComplexDatatype = "Json") =>
	(options: ApiOptions): FromApiInjector => ({
		tag: "FromApi",
		type: OPERAND_TYPES.injector,
		datatype,
		...options,
	})

export default FromApi
