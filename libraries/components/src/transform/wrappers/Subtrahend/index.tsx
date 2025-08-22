/**
 * Subtrahend JSX Component
 *
 * Mathematical alias for Amount in Subtract operations.
 * The subtrahend is the number that is subtracted from another.
 *
 * @example
 * <Subtract>
 *   <Minuend><FromElement id="total" type="Number" /></Minuend>
 *   <Subtrahend><FromElement id="discount" type="Number" /></Subtrahend>
 * </Subtract>
 */

export type SubtrahendProps = {
	children?: JSX.Element | JSX.Element[]
}

export default function Subtrahend({ children }: SubtrahendProps): JSX.Element {
	// Alias for Amount - just passes through children
	return children as JSX.Element
}
