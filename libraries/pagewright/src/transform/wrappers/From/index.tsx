//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style

export type FromProps = {
	children?: JSX.Element | JSX.Element[]
}

export default function From({ children }: FromProps): JSX.Element {
	// This is a wrapper component used by the arborist
	// It doesn't render anything directly
	return children as JSX.Element
}
