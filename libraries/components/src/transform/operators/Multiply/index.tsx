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

// Marker only; compiler can add support later

export type MultiplyProps = {
	type?: "Number"
	datatype?: "Number"
	children?: JSX.Element | JSX.Element[]
}

export default function Multiply({ type = "Number", datatype, children = [] }: MultiplyProps) {
	const actualType = datatype || type
	const childArray = Array.isArray(children) ? children : [children]
	return { type: "operator", tag: "Multiply", datatype: actualType, factors: childArray }
}
