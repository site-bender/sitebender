/**
 * When.Authorized (authoring wrapper for policy-gated content)
 */

export type Props = {
	policyTag: string // e.g., "IsAuthenticated", "HasRole", etc.
	fallback?: JSX.Element | Array<JSX.Element>
	children?: JSX.Element | Array<JSX.Element>
}

export type AuthorizedMarker = {
	__kind: "control:authorized"
	policy: { type: "policy"; tag: string }
	ifTrue: Array<JSX.Element>
	ifFalse: Array<JSX.Element>
}

const toArray = (x?: JSX.Element | Array<JSX.Element>): Array<JSX.Element> =>
	x ? (Array.isArray(x) ? x : [x]) : []

export default function Authorized(
	{ policyTag, fallback, children }: Props,
): AuthorizedMarker {
	return {
		__kind: "control:authorized",
		policy: { type: "policy", tag: policyTag },
		ifTrue: toArray(children),
		ifFalse: toArray(fallback),
	}
}
