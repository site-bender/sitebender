/**
 * Add JSX Component
 *
 * Wrapper for the Add operator constructor.
 * Children are treated as operands to be added together.
 *
 * @example
 * <Add type="Number">
 *   <FromElement id="price" />
 *   <FromElement id="tax" />
 *   <Constant value={5} />
 * </Add>
 */

import AddConstructor from "../../../../adaptive/constructors/operators/Add/index.ts"

export type AddProps = {
	type?: "Number" | "String" | "Date" | "Duration"
	datatype?: "Number" | "String" | "Date" | "Duration"
	children?: JSX.Element | JSX.Element[]
}

export default function Add({
	type = "Number",
	datatype,
	children = [],
}: AddProps): ReturnType<typeof AddConstructor> {
	// Use datatype if provided, otherwise use type
	const actualType = datatype || type

	// Convert children to array if needed
	const childArray = Array.isArray(children) ? children : [children]

	// The constructor expects an array of operands
	// In the JSX transform, children will be converted to adaptive configs
	// For now, we pass children directly as the parser will handle transformation
	return AddConstructor(actualType)(childArray as any)
}
