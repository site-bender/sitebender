/**
 * ExpectedValue Wrapper Component
 *
 * Used with IsEqualTo and IsUnequalTo to specify the expected value.
 *
 * @example
 * <IsEqualTo>
 *   <Value><FromElement id="status" /></Value>
 *   <ExpectedValue><Constant value="active" /></ExpectedValue>
 * </IsEqualTo>
 */

export type ExpectedValueProps = {
	children?: JSX.Element | JSX.Element[]
}

export default function ExpectedValue(
	{ children }: ExpectedValueProps,
): JSX.Element {
	return children as JSX.Element
}
