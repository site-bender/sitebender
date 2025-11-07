//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style

export type DivisorProps = {
	children?: JSX.Element | JSX.Element[]
}

export default function Divisor({ children }: DivisorProps): JSX.Element {
	// Alias for By - just passes through children
	return children as JSX.Element
}
