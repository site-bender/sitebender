/**
 * Divisor JSX Component
 *
 * Mathematical alias for By in Divide operations.
 * The divisor is the number by which another number is divided.
 *
 * @example
 * <Divide>
 *   <Dividend><FromElement id="total" type="Number" /></Dividend>
 *   <Divisor><FromElement id="parts" type="Number" /></Divisor>
 * </Divide>
 */

export type DivisorProps = {
	children?: JSX.Element | JSX.Element[]
}

export default function Divisor({ children }: DivisorProps): JSX.Element {
	// Alias for By - just passes through children
	return children as JSX.Element
}
