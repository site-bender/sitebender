import type { Operand, RoundOperator } from "@adaptiveTypes/index.ts"

/**
 * Round JSX Component
 *
 * Wrapper for the Round operator constructor.
 * Rounds a number to the nearest integer.
 *
 * @example
 * <Round>
 *   <FromElement id="price" type="Number" />
 * </Round>
 */

import RoundConstructor from "@adaptiveSrc/constructors/operators/Round/index.ts"

export type Props = {
	type?: "Number"
	datatype?: "Number"
	children?: JSX.Element | JSX.Element[]
}

export default function Round({
	type = "Number",
	datatype,
	children = [],
}: Props): RoundOperator {
	const actualType = datatype || type
	const childArray = Array.isArray(children) ? children : [children]

	// Round constructor signature: (datatype) => (decimalPlaces?) => (operand)
	return RoundConstructor(actualType)()(childArray[0] as unknown as Operand)
}
