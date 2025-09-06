/**
 * Or comparator (marker) — at least one child condition must be truthy
 */

export type ComparatorMarker = {
	__kind: "comparator"
	cmp: string
	args: Array<unknown>
}

export type Props = { children?: JSX.Element | Array<JSX.Element> }

export default function Or({ children }: Props): ComparatorMarker {
	const kids = Array.isArray(children)
		? children
		: (children ? [children] : [])
	return { __kind: "comparator", cmp: "Is.Or", args: kids }
}
