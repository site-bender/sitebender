/**
 * Negate JSX Component
 *
 * Wrapper for the Negate operator constructor.
 * Returns the negation of a number (multiplies by -1).
 *
 * @example
 * <Negate>
 *   <FromElement id="profit" type="Number" />
 * </Negate>
 */

import NegateConstructor from "@adaptiveSrc/constructors/operators/Negate/index.ts"
import type { Operand } from "@adaptiveTypes/index.ts"

export type NegateProps = {
	type?: "Number"
	datatype?: "Number"
	children?: JSX.Element | JSX.Element[]
}

export default function Negate({
	type = "Number",
	datatype,
	children = [],
}: NegateProps): ReturnType<typeof NegateConstructor> {
	const actualType = datatype || type
	const childArray = Array.isArray(children) ? children : [children]

	// Negate constructor signature: (datatype) => (operand)
	return NegateConstructor(actualType)(childArray[0] as unknown as Operand)
}
