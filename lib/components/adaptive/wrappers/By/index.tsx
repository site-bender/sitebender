/**
 * By Wrapper Component
 *
 * Used with Divide to specify the divisor.
 *
 * @example
 * <Divide>
 *   <Value><FromElement id="total" /></Value>
 *   <By><FromElement id="numPeople" /></By>
 * </Divide>
 */

export type ByProps = {
	children?: JSX.Element | JSX.Element[]
}

export default function By({ children }: ByProps): JSX.Element {
	return children as JSX.Element
}
