//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style

export type DividendProps = {
	children?: JSX.Element | JSX.Element[]
}

export default function Dividend({ children }: DividendProps): JSX.Element {
	// Alias for Value - just passes through children
	return children as JSX.Element
}
