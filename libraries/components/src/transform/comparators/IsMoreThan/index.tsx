import type {
	IsMoreThanComparator,
	NumericDatatype,
	Operand,
	TemporalDatatype,
} from "@sitebender/engine-types/index.ts"

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

import IsMoreThanConstructor from "@sitebender/engine/constructors/comparators/amount/IsMoreThan/index.ts"

type AmountDatatype = NumericDatatype | TemporalDatatype

export type Props = {
	type?: AmountDatatype
	datatype?: AmountDatatype
	children?: JSX.Element | JSX.Element[]
}

export default function IsMoreThan({
	type = "Number",
	datatype,
	children = [],
}: Props): IsMoreThanComparator {
	const actualType: AmountDatatype = (datatype || type) as AmountDatatype
	const [operand, test] = Array.isArray(children) ? children : [children]
	// IsMoreThan: (datatype) => (operand) => (test)
	return IsMoreThanConstructor(actualType)(operand as unknown as Operand)(
		test as unknown as Operand,
	) as unknown as IsMoreThanComparator
}
