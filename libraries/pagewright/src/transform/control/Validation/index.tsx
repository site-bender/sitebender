//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style

export type Props = {
	when?: "input" | "blur" | "submit"
	children?: JSX.Element | Array<JSX.Element>
}

export type ValidationMarker = {
	__kind: "control:validation"
	when: "input" | "blur" | "submit"
	rule: JSX.Element | Array<JSX.Element> | undefined
}

export default function Validation(
	{ when = "input", children }: Props,
): ValidationMarker {
	return { __kind: "control:validation", when, rule: children }
}
