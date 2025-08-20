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

import DivideConstructor from "../../../../adaptive/constructors/operators/Divide/index.ts"

export type DivideProps = {
	type?: "Number"
	datatype?: "Number"
	children?: JSX.Element | JSX.Element[]
}

export default function Divide({
	type = "Number",
	datatype,
	children = [],
}: DivideProps): ReturnType<typeof DivideConstructor> {
	const actualType = datatype || type
	const childArray = Array.isArray(children) ? children : [children]

	// The parser will extract Value/By or Dividend/Divisor from children
	return DivideConstructor(actualType)(childArray as any)
}
