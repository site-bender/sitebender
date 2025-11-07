//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style

export type TimeProps = {
	children?: JSX.Element | JSX.Element[]
}

export default function Time({ children }: TimeProps): JSX.Element {
	// This is a wrapper component that just passes through its children
	// The parent comparator component will extract the wrapped value
	return children as JSX.Element
}
