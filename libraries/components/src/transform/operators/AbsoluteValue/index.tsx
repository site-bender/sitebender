/**
 * AbsoluteValue JSX Component
 *
 * Wrapper for the AbsoluteValue operator constructor.
 * Returns the absolute value of a number.
 *
 * @example
 * <AbsoluteValue>
 *   <FromElement id="temperature" type="Number" />
 * </AbsoluteValue>
 */

import AbsoluteValueConstructor from "../../../../../adaptive/src/constructors/operators/AbsoluteValue/index.ts"

export type AbsoluteValueProps = {
	type?: "Number"
	datatype?: "Number"
	children?: JSX.Element | JSX.Element[]
}

export default function AbsoluteValue({
	type = "Number",
	datatype,
	children = [],
}: AbsoluteValueProps): ReturnType<typeof AbsoluteValueConstructor> {
	const actualType = datatype || type
	const childArray = Array.isArray(children) ? children : [children]

	// AbsoluteValue constructor signature: (datatype) => (operand)
	return AbsoluteValueConstructor(actualType)(childArray[0] as unknown as JSX.Element)
}
