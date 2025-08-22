/**
 * Time JSX Component
 *
 * Semantic wrapper for time values in time comparison operations.
 *
 * @example
 * <IsAfterTime>
 *   <Value><FromElement id="startTime" type="Time" /></Value>
 *   <Time><Constant value="14:30:00" /></Time>
 * </IsAfterTime>
 */

export type TimeProps = {
	children?: JSX.Element | JSX.Element[]
}

export default function Time({ children }: TimeProps): JSX.Element {
	// This is a wrapper component that just passes through its children
	// The parent comparator component will extract the wrapped value
	return children as JSX.Element
}
