/**
 * IsLessThan - Less than comparison for adaptive conditionals
 */

import IsLessThanConstructor from "@adaptiveSrc/constructors/comparators/amount/IsLessThan/index.ts"
import type { Operand, IsLessThanComparator } from "@adaptiveTypes/index.ts"

export type Props = {
	children?: JSX.Element | Array<JSX.Element> | string
}

export default function IsLessThan({
	children = [],
}: Props): IsLessThanComparator {
	const [value, threshold] = Array.isArray(children) ? children : [children]
	return IsLessThanConstructor("Number")(value as unknown as Operand)(threshold as unknown as Operand) as unknown as IsLessThanComparator
}
