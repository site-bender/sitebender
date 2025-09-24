import type {
	IsAfterDateComparator,
	Operand,
} from "../../../../../architect/types/index.ts"

/**
 * IsAfterDate JSX Component
 *
 * Wrapper for the IsAfterDate comparator constructor.
 * Checks if a date is after another date.
 * Requires <Value> and <Date> wrapper components.
 *
 * @example
 * <IsAfterDate>
 *   <Value><FromElement id="eventDate" type="Date" /></Value>
 *   <Date><Constant value="2024-12-25" /></Date>
 * </IsAfterDate>
 */

import IsAfterDateConstructor from "../../../../../architect/src/constructors/comparators/date/IsAfterDate/index.ts"

export type Props = {
	type?: "Date"
	datatype?: "Date"
	children?: JSX.Element | JSX.Element[]
}

export default function IsAfterDate({
	type = "Date",
	datatype,
	children = [],
}: Props): IsAfterDateComparator {
	const actualType = datatype || type
	const [operand, test] = Array.isArray(children) ? children : [children]
	// IsAfterDate: (datatype) => (operand) => (test)
	return IsAfterDateConstructor(actualType)(
		operand as unknown as Operand,
	)(test as unknown as Operand) as unknown as IsAfterDateComparator
}
