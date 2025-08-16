/**
 * Value Wrapper Component
 *
 * Used with comparators and Divide to specify the value being tested or divided.
 *
 * @example
 * <IsMoreThan>
 *   <Value><FromElement id="price" /></Value>
 *   <Threshold><Constant value={100} /></Threshold>
 * </IsMoreThan>
 *
 * <Divide>
 *   <Value><FromElement id="total" /></Value>
 *   <By><FromElement id="numPeople" /></By>
 * </Divide>
 */

export type ValueProps = {
	children?: JSX.Element | JSX.Element[]
}

export default function Value({ children }: ValueProps): JSX.Element {
	return children as JSX.Element
}
