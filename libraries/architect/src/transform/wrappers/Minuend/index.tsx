//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style

export type MinuendProps = {
	children?: JSX.Element | JSX.Element[]
}

export default function Minuend({ children }: MinuendProps): JSX.Element {
	// Alias for From - just passes through children
	return children as JSX.Element
}
