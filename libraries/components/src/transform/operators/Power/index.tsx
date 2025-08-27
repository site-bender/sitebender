/**
 * Power JSX Component
 *
 * Wrapper for the Power operator constructor.
 * Requires <Base> and <Exponent> wrapper components.
 *
 * @example
 * <Power>
 *   <Base><FromElement id="base" type="Number" /></Base>
 *   <Exponent><Constant value={2} /></Exponent>
 * </Power>
 */

import PowerConstructor from "../../../../../adaptive/src/constructors/operators/Power/index.ts"

export type PowerProps = {
	type?: "Number"
	datatype?: "Number"
	children?: JSX.Element | JSX.Element[]
}

export default function Power({
	type = "Number",
	datatype,
	children = [],
}: PowerProps): ReturnType<typeof PowerConstructor> {
	const actualType = datatype || type
	const [base, exponent] = Array.isArray(children) ? children : [children]

	// Power: (datatype) => (base) => (exponent)
	return PowerConstructor(actualType)(base as unknown as JSX.Element)(
		exponent as unknown as JSX.Element,
	)
}
