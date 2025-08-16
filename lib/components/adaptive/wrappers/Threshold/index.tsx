/**
 * Threshold Wrapper Component
 *
 * Used with comparison operators like IsMoreThan, IsLessThan to specify the threshold value.
 *
 * @example
 * <IsMoreThan>
 *   <Value><FromElement id="price" /></Value>
 *   <Threshold><Constant value={100} /></Threshold>
 * </IsMoreThan>
 */

export type ThresholdProps = {
	children?: JSX.Element | JSX.Element[]
}

export default function Threshold({ children }: ThresholdProps): JSX.Element {
	return children as JSX.Element
}
