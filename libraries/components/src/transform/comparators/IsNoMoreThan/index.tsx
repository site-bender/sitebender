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

import IsNoMoreThanConstructor from "@adaptiveSrc/constructors/comparators/amount/IsNoMoreThan/index.ts"
import type { Operand } from "@adaptiveTypes/index.ts"

export type IsNoMoreThanProps = {
	type?: "Number" | "Date" | "String"
	datatype?: "Number" | "Date" | "String"
	children?: JSX.Element | JSX.Element[]
}

export default function IsNoMoreThan({
	type = "Number",
	datatype,
	children = [],
}: IsNoMoreThanProps): ReturnType<ReturnType<ReturnType<typeof IsNoMoreThanConstructor>>> {
	const actualType = datatype || type
	const [operand, test] = Array.isArray(children) ? children : [children]

	// IsNoMoreThan: (datatype) => (operand) => (test)
	return IsNoMoreThanConstructor(actualType)(operand as unknown as Operand)(test as unknown as Operand)
}
