/**
 * IsEqualTo JSX Component
 *
 * Wrapper for the IsEqualTo comparator constructor.
 * Requires <Value> and <ExpectedValue> wrapper components.
 *
 * @example
 * <IsEqualTo>
 *   <Value><FromElement id="status" /></Value>
 *   <ExpectedValue><Constant value="active" /></ExpectedValue>
 * </IsEqualTo>
 */

import IsEqualToConstructor from "../../../../adaptive/constructors/comparators/equality/IsEqualTo/index.ts"

export type IsEqualToProps = {
	type?: "Number" | "String" | "Boolean" | "Date"
	datatype?: "Number" | "String" | "Boolean" | "Date"
	children?: JSX.Element | JSX.Element[]
}

export default function IsEqualTo({
	type = "String",
	datatype,
	children = [],
}: IsEqualToProps): ReturnType<typeof IsEqualToConstructor> {
	const actualType = datatype || type
	const childArray = Array.isArray(children) ? children : [children]

	// The parser will extract Value and ExpectedValue from children
	return IsEqualToConstructor(actualType)(null as any)(null as any)
}
