//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style

export type ExpectedValueProps = {
	children?: JSX.Element | JSX.Element[]
}

export default function ExpectedValue(
	{ children }: ExpectedValueProps,
): JSX.Element {
	return children as JSX.Element
}
