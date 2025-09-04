import type { Operand } from "@sitebender/engine-types/index.ts"

/**
 * IsBoolean JSX Component
 *
 * Wrapper for the IsBoolean comparator constructor.
 * Checks if a value is a boolean.
 *
 * @example
 * <IsBoolean>
 *   <FromElement id="isActive" />
 * </IsBoolean>
 */

import IsBooleanConstructor from "@sitebender/engine/constructors/comparators/scalar/IsBoolean/index.ts"

export type Props = {
	children?: JSX.Element | JSX.Element[]
}

export default function IsBoolean({
	children = [],
}: Props): ReturnType<typeof IsBooleanConstructor> {
	const childArray = Array.isArray(children) ? children : [children]
	const operand = childArray[0] as unknown as Operand
	return IsBooleanConstructor(operand)
}
