//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style

export type BaseProps = {
	children?: JSX.Element | JSX.Element[]
}

export default function Base({ children }: BaseProps): JSX.Element {
	// This is a wrapper component that just passes through its children
	// The parent Power component will extract the wrapped value
	return children as JSX.Element
}
