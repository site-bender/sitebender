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

import IsMoreThanConstructor from "../../../../../adaptive/src/constructors/comparators/amount/IsMoreThan/index.ts"

export type IsMoreThanProps = {
	type?: "Number" | "Date" | "String"
	datatype?: "Number" | "Date" | "String"
	children?: JSX.Element | JSX.Element[]
}

export default function IsMoreThan({
	type = "Number",
	datatype,
	children = [],
}: IsMoreThanProps): ReturnType<ReturnType<ReturnType<typeof IsMoreThanConstructor>>> {
	const actualType = datatype || type
	const [operand, test] = Array.isArray(children) ? children : [children]
	// IsMoreThan: (datatype) => (operand) => (test)
	return IsMoreThanConstructor(actualType)(operand as unknown as JSX.Element)(test as unknown as JSX.Element)
}
