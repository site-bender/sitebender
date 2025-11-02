//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style

export type Props = {
	policyTag: string // e.g., "IsAuthenticated", "HasRole", etc.
	policyArgs?: Record<string, unknown> // e.g., { role: "Admin" } or { roles: ["Admin"] }
	fallback?: JSX.Element | Array<JSX.Element>
	children?: JSX.Element | Array<JSX.Element>
}

export type AuthorizedMarker = {
	__kind: "control:authorized"
	policy: { type: "policy"; tag: string; args?: Record<string, unknown> }
	ifTrue: Array<JSX.Element>
	ifFalse: Array<JSX.Element>
}

const toArray = (x?: JSX.Element | Array<JSX.Element>): Array<JSX.Element> =>
	x ? (Array.isArray(x) ? x : [x]) : []

export default function Authorized(
	{ policyTag, policyArgs, fallback, children }: Props,
): AuthorizedMarker {
	return {
		__kind: "control:authorized",
		policy: { type: "policy", tag: policyTag, args: policyArgs },
		ifTrue: toArray(children),
		ifFalse: toArray(fallback),
	}
}
