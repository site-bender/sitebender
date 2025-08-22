/**
 * IsUnequalTo JSX Component
 *
 * Wrapper for the IsUnequalTo comparator constructor.
 * Checks if two values are not equal.
 * Requires <Value> and <ExpectedValue> wrapper components.
 *
 * @example
 * <IsUnequalTo>
 *   <Value><FromElement id="status" type="String" /></Value>
 *   <ExpectedValue><Constant value="pending" /></ExpectedValue>
 * </IsUnequalTo>
 */

import IsUnequalToConstructor from "../../../../adaptive/constructors/comparators/equality/IsUnequalTo/index.ts"

export type IsUnequalToProps = {
	type?: "Number" | "String" | "Boolean" | "Date"
	datatype?: "Number" | "String" | "Boolean" | "Date"
	children?: JSX.Element | JSX.Element[]
}

export default function IsUnequalTo({
	type = "String",
	datatype,
	children = [],
}: IsUnequalToProps): ReturnType<typeof IsUnequalToConstructor> {
	const actualType = datatype || type
	const childArray = Array.isArray(children) ? children : [children]

	// The parser will extract Value and ExpectedValue from children
	// IsUnequalTo constructor signature: (datatype) => (operand) => (test)
	return IsUnequalToConstructor(actualType)(null as any)(null as any)
}
