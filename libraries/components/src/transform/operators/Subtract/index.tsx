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

import SubtractConstructor from "@adaptiveSrc/constructors/operators/Subtract/index.ts"
import type { NumericDatatype, Operand } from "@adaptiveTypes/index.ts"

export type SubtractProps = {
	type?: NumericDatatype
	datatype?: NumericDatatype
	children?: JSX.Element | JSX.Element[]
}

export default function Subtract({
	type = "Number",
	datatype,
	children = [],
}: SubtractProps): ReturnType<ReturnType<ReturnType<typeof SubtractConstructor>>> {
	const actualType = datatype || type
	const [minuend, subtrahend] = Array.isArray(children) ? children : [children]

	// The parser will extract From/Amount or Minuend/Subtrahend from children
	return SubtractConstructor(actualType)(minuend as unknown as Operand)(subtrahend as unknown as Operand)
}
