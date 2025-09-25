/**
 * From Wrapper Component
 *
 * Used with Subtract to specify the value to subtract from.
 *
 * @example
 * <Subtract>
 *   <From><FromElement id="total" /></From>
 *   <Amount><FromElement id="discount" /></Amount>
 * </Subtract>
 */

export type FromProps = {
	children?: JSX.Element | JSX.Element[]
}

export default function From({ children }: FromProps): JSX.Element {
	// This is a wrapper component used by the arborist
	// It doesn't render anything directly
	return children as JSX.Element
}
