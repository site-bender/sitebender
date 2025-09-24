/**
 * Amount Wrapper Component
 *
 * Used with Subtract to specify the amount to subtract.
 *
 * @example
 * <Subtract>
 *   <From><FromElement id="total" /></From>
 *   <Amount><FromElement id="discount" /></Amount>
 * </Subtract>
 */

export type AmountProps = {
	children?: JSX.Element | JSX.Element[]
}

export default function Amount({ children }: AmountProps): JSX.Element {
	return children as JSX.Element
}
