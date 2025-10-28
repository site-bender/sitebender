import type {
	Datatype,
	FromQueryStringInjector,
	Value,
} from "../../../../../artificer/types/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style

import FromQueryStringConstructor from "../../../../../artificer/src/constructors/injectors/FromQueryString/index.ts"

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
}: FromQueryStringProps): FromQueryStringInjector {
	const actualType = datatype || type

	// FromQueryString constructor signature: (datatype) => (key, defaultValue)
	return FromQueryStringConstructor(actualType)(param, defaultValue)
}
