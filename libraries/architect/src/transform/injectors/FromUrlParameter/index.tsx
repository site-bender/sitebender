import type {
	Datatype,
	FromUrlParameterInjector,
	Value,
} from "../../../../../artificer/types/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style

import FromUrlParameterConstructor from "../../../../../artificer/src/constructors/injectors/FromUrlParameter/index.ts"

export type FromUrlParameterProps = {
	segment: number
	type?: Datatype
	datatype?: Datatype
	defaultValue?: Value
}

export default function FromUrlParameter({
	segment,
	type = "String",
	datatype,
	defaultValue,
}: FromUrlParameterProps): FromUrlParameterInjector {
	const actualType = datatype || type

	// FromUrlParameter constructor signature: (datatype) => (options)
	return FromUrlParameterConstructor(actualType)({ segment, defaultValue })
}
