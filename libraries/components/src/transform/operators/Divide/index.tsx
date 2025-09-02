import type {
	DivideOperator,
	NumericDatatype,
	Operand,
} from "@adaptiveTypes/index.ts"

/**
 * Divide JSX Component
 *
 * Wrapper for the Divide operator constructor.
 * Requires <Value> and <By> wrapper components to specify operands.
 *
 * @example
 * <Divide>
 *   <Value><FromElement id="total" /></Value>
 *   <By><FromElement id="numPeople" /></By>
 * </Divide>
 *
 * Mathematical aliases available:
 * <Divide>
 *   <Dividend><FromElement id="total" /></Dividend>
 *   <Divisor><FromElement id="numPeople" /></Divisor>
 * </Divide>
 */

import DivideConstructor from "@adaptiveSrc/constructors/operators/Divide/index.ts"

export type Props = {
	type?: NumericDatatype
	datatype?: NumericDatatype
	children?: JSX.Element | JSX.Element[]
}

export default function Divide({
	type = "Number",
	datatype,
	children = [],
}: Props): DivideOperator {
	const actualType = datatype || type
	const [dividend, divisor] = Array.isArray(children) ? children : [children]

	// The parser will extract Value/By or Dividend/Divisor from children
	return DivideConstructor(actualType)(dividend as unknown as Operand)(
		divisor as unknown as Operand,
	)
}
