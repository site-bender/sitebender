/**
 * IsLength JSX Component
 *
 * Wrapper for the IsLength comparator constructor.
 * Checks if a string or array has a specific length.
 * Requires <Value> and <ExpectedValue> wrapper components.
 *
 * @example
 * <IsLength>
 *   <Value><FromElement id="password" type="String" /></Value>
 *   <ExpectedValue><Constant value={8} /></ExpectedValue>
 * </IsLength>
 */

import IsLengthConstructor from "../../../../adaptive/constructors/comparators/length/IsLength/index.ts"

export type IsLengthProps = {
	type?: "String" | "Array"
	datatype?: "String" | "Array"
	children?: JSX.Element | JSX.Element[]
}

export default function IsLength({
	type = "String",
	datatype,
	children = [],
}: IsLengthProps): ReturnType<typeof IsLengthConstructor> {
	const actualType = datatype || type
	const childArray = Array.isArray(children) ? children : [children]

	// The parser will extract Value and ExpectedValue from children
	// IsLength constructor signature: (datatype) => (operand) => (test)
	return IsLengthConstructor(actualType)(null as any)(null as any)
}
