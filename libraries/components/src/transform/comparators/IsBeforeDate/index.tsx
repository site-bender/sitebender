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

import IsBeforeDateConstructor from "../../../../adaptive/constructors/comparators/date/IsBeforeDate/index.ts"

export type IsBeforeDateProps = {
	type?: "Date"
	datatype?: "Date"
	children?: JSX.Element | JSX.Element[]
}

export default function IsBeforeDate({
	type = "Date",
	datatype,
	children = [],
}: IsBeforeDateProps): ReturnType<typeof IsBeforeDateConstructor> {
	const actualType = datatype || type
	const childArray = Array.isArray(children) ? children : [children]

	// The parser will extract Value and Date from children
	// IsBeforeDate constructor signature: (datatype) => (operand) => (test)
	return IsBeforeDateConstructor(actualType)(null as any)(null as any)
}
