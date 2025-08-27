/**
 * IsLessThan - Less than comparison for adaptive conditionals
 */

import IsLessThanConstructor from "../../../../../adaptive/src/constructors/comparators/amount/IsLessThan/index.ts"

export type IsLessThanProps = {
	children?: JSX.Element | Array<JSX.Element> | string
}

export default function IsLessThan({
	children = [],
}: IsLessThanProps): ReturnType<ReturnType<ReturnType<typeof IsLessThanConstructor>>> {
	const [value, threshold] = Array.isArray(children) ? children : [children]
	return IsLessThanConstructor("Number")(value as unknown as JSX.Element)(threshold as unknown as JSX.Element)
}
