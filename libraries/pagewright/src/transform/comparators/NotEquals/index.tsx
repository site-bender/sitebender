//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style

export type ComparatorMarker = {
	__kind: "comparator"
	cmp: string
	args: Array<unknown>
}

export type Props = {
	left?: JSX.Element
	right?: JSX.Element
	children?: JSX.Element | Array<JSX.Element>
}

export default function NotEquals(
	{ left, right, children }: Props,
): ComparatorMarker {
	const kids = Array.isArray(children) ? children : (children ? [children] : [])
	const l = left ?? kids[0]
	const r = right ?? kids[1]
	return {
		__kind: "comparator",
		cmp: "Is.UnequalTo",
		args: [l, r].filter((x) => typeof x !== "undefined"),
	}
}
