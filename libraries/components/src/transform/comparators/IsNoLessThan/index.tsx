/**
 * IsNoLessThan JSX Component
 *
 * Wrapper for the IsNoLessThan comparator constructor.
 * Checks if a value is greater than or equal to a threshold.
 * Requires <Value> and <Threshold> wrapper components.
 *
 * @example
 * <IsNoLessThan>
 *   <Value><FromElement id="age" type="Number" /></Value>
 *   <Threshold><Constant value={18} /></Threshold>
 * </IsNoLessThan>
 */

import IsNoLessThanConstructor from "@adaptiveSrc/constructors/comparators/amount/IsNoLessThan/index.ts"
import type { Operand } from "@adaptiveTypes/index.ts"

export type IsNoLessThanProps = {
	type?: "Number" | "Date" | "String"
	datatype?: "Number" | "Date" | "String"
	children?: JSX.Element | JSX.Element[]
}

export default function IsNoLessThan({
	type = "Number",
	datatype,
	children = [],
}: IsNoLessThanProps): ReturnType<ReturnType<ReturnType<typeof IsNoLessThanConstructor>>> {
	const actualType = datatype || type
	const [operand, test] = Array.isArray(children) ? children : [children]

	// IsNoLessThan: (datatype) => (operand) => (test)
	return IsNoLessThanConstructor(actualType)(operand as unknown as Operand)(test as unknown as Operand)
}
