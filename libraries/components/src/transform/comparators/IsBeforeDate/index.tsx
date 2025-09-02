import type { IsBeforeDateComparator, Operand } from "@engineTypes/index.ts"

/**
 * IsBeforeDate JSX Component
 *
 * Wrapper for the IsBeforeDate comparator constructor.
 * Checks if a date is before another date.
 * Requires <Value> and <Date> wrapper components.
 *
 * @example
 * <IsBeforeDate>
 *   <Value><FromElement id="expiryDate" type="Date" /></Value>
 *   <Date><Constant value="2025-01-01" /></Date>
 * </IsBeforeDate>
 */

import IsBeforeDateConstructor from "@engineSrc/constructors/comparators/date/IsBeforeDate/index.ts"

export type Props = {
	type?: "Date"
	datatype?: "Date"
	children?: JSX.Element | JSX.Element[]
}

export default function IsBeforeDate({
	type = "Date",
	datatype,
	children = [],
}: Props): IsBeforeDateComparator {
	const actualType = datatype || type
	const [operand, test] = Array.isArray(children) ? children : [children]
	// IsBeforeDate: (datatype) => (operand) => (test)
	return IsBeforeDateConstructor(actualType)(
		operand as unknown as Operand,
	)(test as unknown as Operand) as unknown as IsBeforeDateComparator
}
