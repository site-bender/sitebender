import type {
	IsNoLessThanComparator,
	NumericDatatype,
	Operand,
	TemporalDatatype,
} from "@sitebender/engine-types/index.ts"

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

import IsNoLessThanConstructor from "@sitebender/engine/constructors/comparators/amount/IsNoLessThan/index.ts"

type AmountDatatype = NumericDatatype | TemporalDatatype

export type Props = {
	type?: AmountDatatype
	datatype?: AmountDatatype
	children?: JSX.Element | JSX.Element[]
}

export default function IsNoLessThan({
	type = "Number",
	datatype,
	children = [],
}: Props): IsNoLessThanComparator {
	const actualType: AmountDatatype = (datatype || type) as AmountDatatype
	const [operand, test] = Array.isArray(children) ? children : [children]

	// IsNoLessThan: (datatype) => (operand) => (test)
	return IsNoLessThanConstructor(actualType)(operand as unknown as Operand)(
		test as unknown as Operand,
	) as unknown as IsNoLessThanComparator
}
