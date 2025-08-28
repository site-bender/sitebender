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

import IsBeforeDateConstructor from "@adaptiveSrc/constructors/comparators/date/IsBeforeDate/index.ts"
import type { Operand } from "@adaptiveTypes/index.ts"

export type IsBeforeDateProps = {
	type?: "Date"
	datatype?: "Date"
	children?: JSX.Element | JSX.Element[]
}

export default function IsBeforeDate({
	type = "Date",
	datatype,
	children = [],
}: IsBeforeDateProps): ReturnType<ReturnType<ReturnType<typeof IsBeforeDateConstructor>>> {
	const actualType = datatype || type
	const [operand, test] = Array.isArray(children) ? children : [children]
	// IsBeforeDate: (datatype) => (operand) => (test)
	return IsBeforeDateConstructor(actualType)(operand as unknown as Operand)(test as unknown as Operand)
}
