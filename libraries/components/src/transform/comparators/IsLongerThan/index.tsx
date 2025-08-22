/**
 * IsLongerThan JSX Component
 *
 * Wrapper for the IsLongerThan comparator constructor.
 * Checks if a string or array is longer than a threshold.
 * Requires <Value> and <Threshold> wrapper components.
 *
 * @example
 * <IsLongerThan>
 *   <Value><FromElement id="description" type="String" /></Value>
 *   <Threshold><Constant value={100} /></Threshold>
 * </IsLongerThan>
 */

import IsLongerThanConstructor from "../../../../adaptive/constructors/comparators/length/IsLongerThan/index.ts"

export type IsLongerThanProps = {
	type?: "String" | "Array"
	datatype?: "String" | "Array"
	children?: JSX.Element | JSX.Element[]
}

export default function IsLongerThan({
	type = "String",
	datatype,
	children = [],
}: IsLongerThanProps): ReturnType<typeof IsLongerThanConstructor> {
	const actualType = datatype || type
	const childArray = Array.isArray(children) ? children : [children]

	// The parser will extract Value and Threshold from children
	// IsLongerThan constructor signature: (datatype) => (operand) => (test)
	return IsLongerThanConstructor(actualType)(null as any)(null as any)
}
