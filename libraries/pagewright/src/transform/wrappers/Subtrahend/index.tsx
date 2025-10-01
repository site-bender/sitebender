//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style

export type SubtrahendProps = {
	children?: JSX.Element | JSX.Element[]
}

export default function Subtrahend({ children }: SubtrahendProps): JSX.Element {
	// Alias for Amount - just passes through children
	return children as JSX.Element
}
