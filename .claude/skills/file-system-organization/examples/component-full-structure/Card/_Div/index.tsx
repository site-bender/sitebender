export type Props = {
	readonly class?: string
	readonly children?: JSX.Element | Array<JSX.Element>
}

/*++
 + Stub implementation of div wrapper for example purposes
 + In production code, would be imported from Architect library
 */
export default function _Div(props: Props) {
	return <div class={props.class}>{props.children}</div>
}
