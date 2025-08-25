/**
 * On control component (marker)
 *
 * Wraps an event name and a handler subtree. This is a compile-time marker
 * that doesn't render DOM and is consumed by the compile pass to attach
 * behaviors to the nearest prior element.
 */

export type Props = {
	event: string // e.g., "Click", "Input", "Submit" -> will map to On.<Event>
	children?: JSX.Element | Array<JSX.Element>
}

export type OnMarker = {
	__kind: "control:on"
	event: string
	handler?: JSX.Element | Array<JSX.Element>
}

export default function On({ event, children }: Props): OnMarker {
	return { __kind: "control:on", event, handler: children }
}
