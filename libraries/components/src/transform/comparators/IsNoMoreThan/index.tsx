/**
 * IsNoMoreThan JSX Component
 *
 * Wrapper for the IsNoMoreThan comparator constructor.
 * Checks if a value is less than or equal to a threshold.
 * Requires <Value> and <Threshold> wrapper components.
 *
 * @example
 * <IsNoMoreThan>
 *   <Value><FromElement id="price" type="Number" /></Value>
 *   <Threshold><Constant value={100} /></Threshold>
 * </IsNoMoreThan>
 */

import IsNoMoreThanConstructor from "../../../../../adaptive/src/constructors/comparators/amount/IsNoMoreThan/index.ts"

export type IsNoMoreThanProps = {
	type?: "Number" | "Date" | "String"
	datatype?: "Number" | "Date" | "String"
	children?: JSX.Element | JSX.Element[]
}

export default function IsNoMoreThan({
	type = "Number",
	datatype,
	children = [],
}: IsNoMoreThanProps): ReturnType<ReturnType<typeof IsNoMoreThanConstructor>> {
	const actualType = datatype || type
	const childArray = Array.isArray(children) ? children : [children]

	// The parser will extract Value and Threshold from children
	// IsNoMoreThan constructor signature: (datatype) => (operand) => (test)
	return IsNoMoreThanConstructor(actualType)(null as any)
}
