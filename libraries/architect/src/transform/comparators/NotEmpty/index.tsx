//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style

export type Props = { children?: JSX.Element | Array<JSX.Element> }

export type ComparatorMarker = {
	__kind: "comparator"
	cmp: string
	args: Array<unknown>
}

export default function NotEmpty({ children }: Props): ComparatorMarker {
	const arg = Array.isArray(children) ? children[0] : children
	return { __kind: "comparator", cmp: "Is.NotEmpty", args: arg ? [arg] : [] }
}
