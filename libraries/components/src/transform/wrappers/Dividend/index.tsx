/**
 * Dividend JSX Component
 *
 * Mathematical alias for Value in Divide operations.
 * The dividend is the number being divided.
 *
 * @example
 * <Divide>
 *   <Dividend><FromElement id="total" type="Number" /></Dividend>
 *   <Divisor><FromElement id="parts" type="Number" /></Divisor>
 * </Divide>
 */

export type DividendProps = {
	children?: JSX.Element | JSX.Element[]
}

export default function Dividend({ children }: DividendProps): JSX.Element {
	// Alias for Value - just passes through children
	return children as JSX.Element
}
