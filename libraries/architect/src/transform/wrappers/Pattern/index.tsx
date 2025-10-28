//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style

export type PatternProps = {
	// Transparent wrapper: accept common JSX children shapes
	children?: JSX.Element | string | Array<JSX.Element | string> | null
}

export default function Pattern({ children }: PatternProps) {
	// This is a semantic wrapper - it just passes through its children
	// The parent component will extract the pattern value
	return <>{children}</>
}
