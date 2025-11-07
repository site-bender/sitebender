export type Props = {
	readonly children?: JSX.Element | Array<JSX.Element>
}

/*++
 + Stub implementation of h2 wrapper for example purposes
 + In production code, would be imported from Architect library
 */
export default function _H2(props: Props) {
	return <h2>{props.children}</h2>
}
