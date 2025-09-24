/**
 * Base JSX Component
 *
 * Semantic wrapper for the base value in Power operations.
 *
 * @example
 * <Power>
 *   <Base><FromElement id="base" type="Number" /></Base>
 *   <Exponent><Constant value={2} /></Exponent>
 * </Power>
 */

export type BaseProps = {
	children?: JSX.Element | JSX.Element[]
}

export default function Base({ children }: BaseProps): JSX.Element {
	// This is a wrapper component that just passes through its children
	// The parent Power component will extract the wrapped value
	return children as JSX.Element
}
