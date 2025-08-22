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

import ModuloConstructor from "../../../../adaptive/constructors/operators/Modulo/index.ts"

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

	// The parser will extract Value and By from children
	// Modulo constructor signature: (datatype) => (dividend) => (divisor)
	return ModuloConstructor(actualType)(null as any)(null as any)
}
