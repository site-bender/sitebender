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

import IsBooleanConstructor from "../../../../adaptive/constructors/comparators/scalar/IsBoolean/index.ts"

export type IsBooleanProps = {
	children?: JSX.Element | JSX.Element[]
}

export default function IsBoolean({
	children = [],
}: IsBooleanProps): ReturnType<typeof IsBooleanConstructor> {
	const childArray = Array.isArray(children) ? children : [children]

	// IsBoolean constructor signature: () => (operand)
	return IsBooleanConstructor()(childArray[0] as any)
}
