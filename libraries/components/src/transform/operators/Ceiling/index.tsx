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

import CeilingConstructor from "../../../../adaptive/constructors/operators/Ceiling/index.ts"

export type CeilingProps = {
	type?: "Number"
	datatype?: "Number"
	children?: JSX.Element | JSX.Element[]
}

export default function Ceiling({
	type = "Number",
	datatype,
	children = [],
}: CeilingProps): ReturnType<typeof CeilingConstructor> {
	const actualType = datatype || type
	const childArray = Array.isArray(children) ? children : [children]

	// Ceiling constructor signature: (datatype) => (operand)
	return CeilingConstructor(actualType)(childArray[0] as any)
}
