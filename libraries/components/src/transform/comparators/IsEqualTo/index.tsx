import type { IsEqualToComparator, Operand } from "@sitebender/engine-types/index.ts"

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

import IsEqualToConstructor from "@sitebender/engine/constructors/comparators/equality/IsEqualTo/index.ts"

export type Props = {
	type?: "Number" | "String" | "Boolean" | "Date"
	datatype?: "Number" | "String" | "Boolean" | "Date"
	children?: JSX.Element | JSX.Element[]
}

export default function IsEqualTo({
	type = "String",
	datatype,
	children = [],
}: Props): IsEqualToComparator {
	const actualType = datatype || type
	const [operand, test] = Array.isArray(children) ? children : [children]
	// IsEqualTo: (datatype) => (operand) => (test)
	return IsEqualToConstructor(actualType)(operand as unknown as Operand)(
		test as unknown as Operand,
	)
}
