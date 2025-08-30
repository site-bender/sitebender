/**
 * Or JSX Component
 *
 * Wrapper for the Or logical operator constructor.
 * At least one child condition must be true for the Or to be true.
 *
 * @example
 * <Or>
 *   <IsEqualTo>
 *     <Value><FromElement id="status" /></Value>
 *     <ExpectedValue><Constant value="active" /></ExpectedValue>
 *   </IsEqualTo>
 *   <IsEqualTo>
 *     <Value><FromElement id="status" /></Value>
 *     <ExpectedValue><Constant value="pending" /></ExpectedValue>
 *   </IsEqualTo>
 * </Or>
 */

import OrConstructor from "@adaptiveSrc/constructors/comparators/algebraic/Or/index.ts"
import type { ComparatorConfig, LogicalConfig } from "@adaptiveTypes/index.ts"

export type OrProps = {
	children?: JSX.Element | JSX.Element[]
}

export default function Or({
	children = [],
}: OrProps): LogicalConfig {
	const childArray = Array.isArray(children) ? children : [children]

	// Or constructor signature: (datatype) => (operands)
	return OrConstructor("Boolean")(childArray as unknown as Array<
		ComparatorConfig | LogicalConfig
	>)
}
