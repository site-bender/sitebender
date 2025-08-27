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

import OrConstructor from "../../../../../adaptive/src/constructors/comparators/algebraic/Or/index.ts"

export type OrProps = {
	children?: JSX.Element | JSX.Element[]
}

export default function Or({
	children = [],
}: OrProps): ReturnType<typeof OrConstructor> {
	const childArray = Array.isArray(children) ? children : [children]

	// Or constructor signature: () => (conditions)
	return OrConstructor()(childArray as any)
}
