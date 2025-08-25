/**
 * Condition slot component (marker)
 */

export type Props = { children?: JSX.Element | Array<JSX.Element> }

export default function Condition({ children }: Props) {
	return { __kind: "slot:condition", children }
}
