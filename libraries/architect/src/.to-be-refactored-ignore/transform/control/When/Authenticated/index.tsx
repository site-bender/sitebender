//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style

export type Props = {
	fallback?: JSX.Element | Array<JSX.Element>
	children?: JSX.Element | Array<JSX.Element>
}

export type AuthenticatedMarker = {
	__kind: "control:authorized"
	policy: { type: "policy"; tag: "IsAuthenticated" }
	ifTrue: Array<JSX.Element>
	ifFalse: Array<JSX.Element>
}

const toArray = (x?: JSX.Element | Array<JSX.Element>): Array<JSX.Element> =>
	x ? (Array.isArray(x) ? x : [x]) : []

export default function Authenticated(
	{ fallback, children }: Props,
): AuthenticatedMarker {
	return {
		__kind: "control:authorized",
		policy: { type: "policy", tag: "IsAuthenticated" },
		ifTrue: toArray(children),
		ifFalse: toArray(fallback),
	}
}
