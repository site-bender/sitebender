/**
 * Floor JSX Component
 *
 * Wrapper for the Floor operator constructor.
 * Rounds a number down to the nearest integer.
 *
 * @example
 * <Floor>
 *   <FromElement id="price" type="Number" />
 * </Floor>
 */

import FloorConstructor from "../../../../../adaptive/src/constructors/operators/Floor/index.ts"

export type FloorProps = {
	type?: "Number"
	datatype?: "Number"
	children?: JSX.Element | JSX.Element[]
}

export default function Floor({
	type = "Number",
	datatype,
	children = [],
}: FloorProps): ReturnType<typeof FloorConstructor> {
	const actualType = datatype || type
	const childArray = Array.isArray(children) ? children : [children]

	// Floor constructor signature: (datatype) => (decimalPlaces?) => (operand)
	return FloorConstructor(actualType)()(childArray[0] as unknown as JSX.Element)
}
