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

import PowerConstructor from "../../../../adaptive/constructors/operators/Power/index.ts"

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
	const childArray = Array.isArray(children) ? children : [children]

	// The parser will extract Base and Exponent from children
	// Power constructor signature: (datatype) => (base) => (exponent)
	return PowerConstructor(actualType)(null as any)(null as any)
}
