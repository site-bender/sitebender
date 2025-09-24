import type {
	IsLongerThanComparator,
	Operand,
} from "../../../../../architect/types/index.ts"

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

import IsLongerThanConstructor from "../../../../../architect/src/constructors/comparators/length/IsLongerThan/index.ts"

export type Props = {
	type?: "String" | "Array"
	datatype?: "String" | "Array"
	children?: JSX.Element | JSX.Element[]
}

export default function IsLongerThan({
	type: _type = "String",
	datatype: _datatype,
	children = [],
}: Props): IsLongerThanComparator {
	const actualType = "Number" as const
	const [operand, test] = Array.isArray(children) ? children : [children]

	// IsLongerThan: (datatype) => (operand) => (test)
	return IsLongerThanConstructor(actualType)(operand as unknown as Operand)(
		test as unknown as Operand,
	) as unknown as IsLongerThanComparator
}
