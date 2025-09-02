import type {
	IsNoMoreThanComparator,
	NumericDatatype,
	Operand,
	TemporalDatatype,
} from "@adaptiveTypes/index.ts"

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

type AmountDatatype = NumericDatatype | TemporalDatatype

export type Props = {
	type?: AmountDatatype
	datatype?: AmountDatatype
	children?: JSX.Element | JSX.Element[]
}

export default function IsNoMoreThan({
	type = "Number",
	datatype,
	children = [],
}: Props): IsNoMoreThanComparator {
	const actualType: AmountDatatype = (datatype || type) as AmountDatatype
	const [operand, test] = Array.isArray(children) ? children : [children]

	// IsNoMoreThan: (datatype) => (operand) => (test)
	return IsNoMoreThanConstructor(actualType)(operand as unknown as Operand)(
		test as unknown as Operand,
	) as unknown as IsNoMoreThanComparator
}
