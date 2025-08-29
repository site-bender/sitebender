/**
 * Max JSX Component
 *
 * Wrapper for the Max operator constructor.
 * Returns the maximum value from all operands.
 *
 * @example
 * <Max type="Number">
 *   <FromElement id="bid1" />
 *   <FromElement id="bid2" />
 *   <FromElement id="bid3" />
 * </Max>
 */

// Marker-only; compiler maps to Adaptive IR

export type MaxProps = {
	type?: "Number" | "Date" | "String"
	datatype?: "Number" | "Date" | "String"
	children?: JSX.Element | JSX.Element[]
}

export default function Max({ type = "Number", datatype, children = [] }: MaxProps) {
	const actualType = datatype || type
	const childArray = Array.isArray(children) ? children : [children]
	return { type: "operator", tag: "Max", datatype: actualType, operands: childArray }
}
