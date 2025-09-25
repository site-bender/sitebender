/**
 * Date JSX Component
 *
 * Semantic wrapper for date values in date comparison operations.
 *
 * @example
 * <IsAfterDate>
 *   <Value><FromElement id="eventDate" type="Date" /></Value>
 *   <Date><Constant value="2024-12-25" /></Date>
 * </IsAfterDate>
 */

export type DateProps = {
	children?: JSX.Element | JSX.Element[]
}

export default function Date({ children }: DateProps): JSX.Element {
	// This is a wrapper component that just passes through its children
	// The parent comparator component will extract the wrapped value
	return children as JSX.Element
}
