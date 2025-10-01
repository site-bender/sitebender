import type {
	DoesNotMatchComparator,
	Operand,
} from "../../../../../architect/types/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style

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
