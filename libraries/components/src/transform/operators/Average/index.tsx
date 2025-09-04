import type { AverageOperator, Operand } from "@sitebender/engine-types/index.ts"

/**
 * Average JSX Component
 *
 * Wrapper for the Average operator constructor.
 * Calculates the average of all operands.
 *
 * @example
 * <Average type="Number">
 *   <FromElement id="score1" />
 *   <FromElement id="score2" />
 *   <FromElement id="score3" />
 * </Average>
 */

import AverageConstructor from "@sitebender/engine/constructors/operators/Average/index.ts"

export type Props = {
	type?: "Number"
	datatype?: "Number"
	children?: JSX.Element | JSX.Element[]
}

export default function Average({
	type = "Number",
	datatype,
	children = [],
}: Props): AverageOperator {
	const actualType = datatype || type
	const childArray = Array.isArray(children) ? children : [children]

	// Average constructor signature: (datatype) => (operands)
	return AverageConstructor(actualType)(childArray as unknown as Operand[])
}
