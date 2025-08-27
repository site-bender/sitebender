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

import ModuloConstructor from "../../../../../adaptive/src/constructors/operators/Modulo/index.ts"

export type ModuloProps = {
	type?: "Number"
	datatype?: "Number"
	children?: JSX.Element | JSX.Element[]
}

export default function Modulo({
	type = "Number",
	datatype,
	children = [],
}: ModuloProps): ReturnType<typeof ModuloConstructor> {
	const actualType = datatype || type
	const childArray = Array.isArray(children) ? children : [children]
	const [dividend, divisor] = childArray

	// Modulo constructor signature: (datatype) => (dividend) => (divisor)
	return ModuloConstructor(actualType)(dividend as unknown as JSX.Element)(divisor as unknown as JSX.Element)
}
