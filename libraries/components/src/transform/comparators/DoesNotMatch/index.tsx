/**
 * DoesNotMatch JSX Component
 *
 * Wrapper for the DoesNotMatch comparator constructor.
 * Checks if a value does not match a regular expression pattern.
 * Requires <Value> and <Pattern> wrapper components.
 *
 * @example
 * <DoesNotMatch>
 *   <Value><FromElement id="phone" type="String" /></Value>
 *   <Pattern><Constant value={/^[0-9]{10}$/} /></Pattern>
 * </DoesNotMatch>
 */

import DoesNotMatchConstructor from "../../../../../adaptive/src/constructors/comparators/matching/DoesNotMatch/index.ts"

export type DoesNotMatchProps = {
	flags?: string
	children?: JSX.Element | JSX.Element[]
}

export default function DoesNotMatch({
	flags = "",
	children = [],
}: DoesNotMatchProps): ReturnType<ReturnType<ReturnType<typeof DoesNotMatchConstructor>>> {
	const [operand, pattern] = Array.isArray(children) ? children : [children]
	// DoesNotMatch: (operand) => (pattern) => (flags)
	return DoesNotMatchConstructor(operand as unknown as JSX.Element)(pattern as unknown as JSX.Element)(flags)
}
