import type {
	IsLessThanComparator,
	Operand,
} from "../../../../../architect/types/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style

import IsLessThanConstructor from "../../../../../architect/src/constructors/comparators/amount/IsLessThan/index.ts"

export type Props = {
	children?: JSX.Element | Array<JSX.Element> | string
}

export default function IsLessThan({
	children = [],
}: Props): IsLessThanComparator {
	const [value, threshold] = Array.isArray(children) ? children : [children]
	return IsLessThanConstructor("Number")(value as unknown as Operand)(
		threshold as unknown as Operand,
	) as unknown as IsLessThanComparator
}
