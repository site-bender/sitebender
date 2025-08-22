/**
 * Multiply JSX Component
 *
 * Wrapper for the Multiply operator constructor.
 * Children are treated as operands to be multiplied together.
 *
 * @example
 * <Multiply type="Number">
 *   <FromElement id="quantity" />
 *   <FromElement id="price" />
 * </Multiply>
 */

import MultiplyConstructor from "../../../../adaptive/constructors/operators/Multiply/index.ts"

export type MultiplyProps = {
	type?: "Number"
	datatype?: "Number"
	children?: JSX.Element | JSX.Element[]
}

export default function Multiply({
	type = "Number",
	datatype,
	children = [],
}: MultiplyProps): ReturnType<typeof MultiplyConstructor> {
	const actualType = datatype || type
	const childArray = Array.isArray(children) ? children : [children]

	return MultiplyConstructor(actualType)(childArray as any)
}
