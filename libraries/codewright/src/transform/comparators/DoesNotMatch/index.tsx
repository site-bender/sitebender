import type {
	DoesNotMatchComparator,
	Operand,
} from "../../../../../architect/types/index.ts"

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

import DoesNotMatchConstructor from "../../../../../architect/src/constructors/comparators/matching/DoesNotMatch/index.ts"

export type Props = {
	flags?: string
	children?: JSX.Element | JSX.Element[]
}

export default function DoesNotMatch({
	flags = undefined,
	children = [],
}: Props): DoesNotMatchComparator {
	const [operand, pattern] = Array.isArray(children) ? children : [children]
	// DoesNotMatch: (operand) => (pattern) => (flags)
	return DoesNotMatchConstructor(operand as unknown as Operand)(
		pattern as unknown as Operand,
	)(flags)
}
