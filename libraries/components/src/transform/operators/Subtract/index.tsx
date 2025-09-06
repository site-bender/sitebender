import type {
	NumericDatatype,
	Operand,
	SubtractOperator,
} from "@sitebender/engine-types/index.ts"

/**
 * Subtract JSX Component
 *
 * Wrapper for the Subtract operator constructor.
 * Requires <From> and <Amount> wrapper components to specify operands.
 *
 * @example
 * <Subtract>
 *   <From><FromElement id="total" /></From>
 *   <Amount><FromElement id="discount" /></Amount>
 * </Subtract>
 *
 * Mathematical aliases available:
 * <Subtract>
 *   <Minuend><FromElement id="total" /></Minuend>
 *   <Subtrahend><FromElement id="discount" /></Subtrahend>
 * </Subtract>
 */

import SubtractConstructor from "@sitebender/engine/constructors/operators/Subtract/index.ts"

export type Props = {
	type?: NumericDatatype
	datatype?: NumericDatatype
	children?: JSX.Element | JSX.Element[]
}

export default function Subtract({
	type = "Number",
	datatype,
	children = [],
}: Props): SubtractOperator {
	const actualType = datatype || type
	const [minuend, subtrahend] = Array.isArray(children)
		? children
		: [children]

	// The parser will extract From/Amount or Minuend/Subtrahend from children
	return SubtractConstructor(actualType)(minuend as unknown as Operand)(
		subtrahend as unknown as Operand,
	)
}
