//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style

export type ComparatorMarker = {
	__kind: "comparator"
	cmp: string
	args: Array<unknown>
}

export type Props = { children?: JSX.Element | Array<JSX.Element> }

export default function And({ children }: Props): ComparatorMarker {
	const kids = Array.isArray(children) ? children : (children ? [children] : [])
	return { __kind: "comparator", cmp: "Is.And", args: kids }
}
