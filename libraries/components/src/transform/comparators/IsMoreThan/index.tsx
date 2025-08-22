/**
 * IsMoreThan JSX Component
 *
 * Wrapper for the IsMoreThan comparator constructor.
 * Requires <Value> and <Threshold> wrapper components.
 *
 * @example
 * <IsMoreThan>
 *   <Value><FromElement id="price" type="Number" /></Value>
 *   <Threshold><Constant value={100} /></Threshold>
 * </IsMoreThan>
 */

import IsMoreThanConstructor from "../../../../adaptive/constructors/comparators/amount/IsMoreThan/index.ts"

export type IsMoreThanProps = {
	type?: "Number" | "Date" | "String"
	datatype?: "Number" | "Date" | "String"
	children?: JSX.Element | JSX.Element[]
}

export default function IsMoreThan({
	type = "Number",
	datatype,
	children = [],
}: IsMoreThanProps): ReturnType<typeof IsMoreThanConstructor> {
	const actualType = datatype || type
	const childArray = Array.isArray(children) ? children : [children]

	// The parser will extract Value and Threshold from children
	// IsMoreThan constructor signature: (datatype) => (operand) => (test)
	return IsMoreThanConstructor(actualType)(null as any)(null as any)
}
