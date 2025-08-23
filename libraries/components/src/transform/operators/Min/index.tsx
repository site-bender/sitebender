/**
 * Min JSX Component
 *
 * Wrapper for the Min operator constructor.
 * Returns the minimum value from all operands.
 *
 * @example
 * <Min type="Number">
 *   <FromElement id="price1" />
 *   <FromElement id="price2" />
 *   <FromElement id="price3" />
 * </Min>
 */

import MinConstructor from "../../../../adaptive/constructors/operators/Min/index.ts"

export type MinProps = {
	type?: "Number" | "Date" | "String"
	datatype?: "Number" | "Date" | "String"
	children?: JSX.Element | JSX.Element[]
}

export default function Min({
	type = "Number",
	datatype,
	children = [],
}: MinProps): ReturnType<typeof MinConstructor> {
	const actualType = datatype || type
	const childArray = Array.isArray(children) ? children : [children]

	// Min constructor signature: (datatype) => (operands)
	return MinConstructor(actualType)(childArray as any)
}
