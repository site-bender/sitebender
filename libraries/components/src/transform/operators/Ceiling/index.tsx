import type { CeilingOperator, Operand } from "@sitebender/engine-types/index.ts"

/**
 * Ceiling JSX Component
 *
 * Wrapper for the Ceiling operator constructor.
 * Rounds a number up to the nearest integer.
 *
 * @example
 * <Ceiling>
 *   <FromElement id="price" type="Number" />
 * </Ceiling>
 */

import CeilingConstructor from "@sitebender/engine/constructors/operators/Ceiling/index.ts"

export type Props = {
	type?: "Number"
	datatype?: "Number"
	children?: JSX.Element | JSX.Element[]
}

export default function Ceiling({
	type = "Number",
	datatype,
	children = [],
}: Props): CeilingOperator {
	const actualType = datatype || type
	const childArray = Array.isArray(children) ? children : [children]

	// Ceiling constructor signature: (datatype) => (decimalPlaces?) => (operand)
	return CeilingConstructor(actualType)()(childArray[0] as unknown as Operand)
}
