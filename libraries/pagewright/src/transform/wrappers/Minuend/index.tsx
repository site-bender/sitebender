/**
 * Minuend JSX Component
 *
 * Mathematical alias for From in Subtract operations.
 * The minuend is the number from which another number is subtracted.
 *
 * @example
 * <Subtract>
 *   <Minuend><FromElement id="total" type="Number" /></Minuend>
 *   <Subtrahend><FromElement id="discount" type="Number" /></Subtrahend>
 * </Subtract>
 */

export type MinuendProps = {
	children?: JSX.Element | JSX.Element[]
}

export default function Minuend({ children }: MinuendProps): JSX.Element {
	// Alias for From - just passes through children
	return children as JSX.Element
}
