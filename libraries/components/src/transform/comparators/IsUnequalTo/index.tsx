import type { IsUnequalToComparator, Operand } from "@engineTypes/index.ts"

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

import IsUnequalToConstructor from "@engineSrc/constructors/comparators/equality/IsUnequalTo/index.ts"

export type Props = {
	type?: "Number" | "String" | "Boolean" | "Date"
	datatype?: "Number" | "String" | "Boolean" | "Date"
	children?: JSX.Element | JSX.Element[]
}

export default function IsUnequalTo({
	type = "String",
	datatype,
	children = [],
}: Props): IsUnequalToComparator {
	const actualType = datatype || type
	const [operand, test] = Array.isArray(children) ? children : [children]

	// IsUnequalTo constructor signature: (datatype) => (operand) => (test)
	return IsUnequalToConstructor(actualType)(operand as unknown as Operand)(
		test as unknown as Operand,
	)
}
