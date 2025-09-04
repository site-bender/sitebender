/**
 * Pattern - Semantic wrapper for regex patterns in comparisons
 */

export type PatternProps = {
	children?: JSX.Element | Array<JSX.Element> | string
}

export default function Pattern({ children }: PatternProps) {
	// This is a semantic wrapper - it just passes through its children
	// The parent component will extract the pattern value
	return <>{children}</>
}
