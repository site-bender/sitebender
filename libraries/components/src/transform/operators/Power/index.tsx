import type { Operand, PowerOperator } from "@sitebender/engine-types/index.ts"

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

import PowerConstructor from "@sitebender/engine/constructors/operators/Power/index.ts"

export type Props = {
	type?: "Number"
	datatype?: "Number"
	children?: JSX.Element | JSX.Element[]
}

export default function Power({
	type = "Number",
	datatype,
	children = [],
}: Props): PowerOperator {
	const actualType = datatype || type
	const [base, exponent] = Array.isArray(children) ? children : [children]

	// Power: (datatype) => (base) => (exponent)
	return PowerConstructor(actualType)(base as unknown as Operand)(
		exponent as unknown as Operand,
	)
}
