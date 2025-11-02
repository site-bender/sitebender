//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style

export type AmountProps = {
	children?: JSX.Element | JSX.Element[]
}

export default function Amount({ children }: AmountProps): JSX.Element {
	return children as JSX.Element
}
