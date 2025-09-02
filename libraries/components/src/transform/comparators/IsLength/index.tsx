import type { IsLengthComparator, Operand } from "@engineTypes/index.ts"

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

import IsLengthConstructor from "@engineSrc/constructors/comparators/length/IsLength/index.ts"

export type Props = {
	// authoring accepts String|Array, but length comparator uses a numeric length under the hood
	type?: "String" | "Array"
	datatype?: "String" | "Array"
	children?: JSX.Element | JSX.Element[]
}

export default function IsLength({
	type: _type = "String",
	datatype: _datatype,
	children = [],
}: Props): IsLengthComparator {
	// Map authoring types to numeric length comparator type
	const actualNumericType = "Number" as const
	const childArray = Array.isArray(children) ? children : [children]
	const [operand, test] = childArray

	// IsLength constructor signature: (datatype) => (operand) => (test)
	return IsLengthConstructor(actualNumericType)(
		operand as unknown as Operand,
	)(test as unknown as Operand) as unknown as IsLengthComparator
}
