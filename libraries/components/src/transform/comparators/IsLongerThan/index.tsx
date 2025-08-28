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

import IsLongerThanConstructor from "@adaptiveSrc/constructors/comparators/length/IsLongerThan/index.ts"
import type { Operand } from "@adaptiveTypes/index.ts"

export type IsLongerThanProps = {
	type?: "String" | "Array"
	datatype?: "String" | "Array"
	children?: JSX.Element | JSX.Element[]
}

export default function IsLongerThan({
	type = "String",
	datatype,
	children = [],
}: IsLongerThanProps): ReturnType<ReturnType<ReturnType<typeof IsLongerThanConstructor>>> {
	const actualType = datatype || type
	const [operand, test] = Array.isArray(children) ? children : [children]

	// IsLongerThan: (datatype) => (operand) => (test)
	return IsLongerThanConstructor(actualType)(operand as unknown as Operand)(test as unknown as Operand)
}
