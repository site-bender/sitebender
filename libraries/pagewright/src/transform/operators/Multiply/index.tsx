import type {
	MultiplyOperator,
	Operand,
} from "../../../../../architect/types/index.ts"

/**
 * Multiply JSX Component
 *
 * Wrapper for the Multiply operator constructor.
 * Children are treated as multipliers to be multiplied together.
 *
 * @example
 * <Multiply type="Number">
 *   <FromElement id="quantity" />
 *   <FromElement id="price" />
 * </Multiply>
 */

import MultiplyConstructor from "../../../../../architect/src/constructors/operators/Multiply/index.ts"

export type Props = {
	type?: "Number"
	datatype?: "Number"
	children?: JSX.Element | JSX.Element[]
}

export default function Multiply(
	{ type = "Number", datatype, children = [] }: Props,
): MultiplyOperator {
	const actualType = datatype || type
	const childArray = Array.isArray(children) ? children : [children]
	return MultiplyConstructor(actualType)(childArray as unknown as Operand[])
}
