/**
 * Modulo JSX Component
 *
 * Wrapper for the Modulo operator constructor.
 * Returns the remainder after division.
 * Requires <Value> and <By> wrapper components.
 *
 * @example
 * <Modulo>
 *   <Value><FromElement id="number" type="Number" /></Value>
 *   <By><Constant value={3} /></By>
 * </Modulo>
 */

import ModuloConstructor from "@adaptiveSrc/constructors/operators/Modulo/index.ts"
import type { Operand, ModuloOperator } from "@adaptiveTypes/index.ts"

export type Props = {
	type?: "Number"
	datatype?: "Number"
	children?: JSX.Element | JSX.Element[]
}

export default function Modulo({
	type = "Number",
	datatype,
	children = [],
}: Props): ModuloOperator {
	const actualType = datatype || type
	const childArray = Array.isArray(children) ? children : [children]
	const [dividend, divisor] = childArray

	// Modulo constructor signature: (datatype) => (dividend) => (divisor)
	return ModuloConstructor(actualType)(dividend as unknown as Operand)(divisor as unknown as Operand)
}
