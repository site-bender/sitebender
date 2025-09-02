import type {
	Datatype,
	FromUrlParameterInjector,
	Value,
} from "@adaptiveTypes/index.ts"

/**
 * FromUrlParameter JSX Component
 *
 * Wrapper for the FromUrlParameter injector constructor.
 * Gets a value from URL path parameters (e.g., /user/:id).
 *
 * @example
 * <FromUrlParameter
 *   segment={2}
 *   type="String"
 * />
 *
 * For URL /user/123/profile, segment 2 would return "123"
 */

import FromUrlParameterConstructor from "@adaptiveSrc/constructors/injectors/FromUrlParameter/index.ts"

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
