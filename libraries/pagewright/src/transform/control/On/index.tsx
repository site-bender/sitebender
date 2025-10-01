//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style

export type Props = {
	event: string // e.g., "Click", "Input", "Submit" -> will map to On.<Event>
	target?: string // optional explicit target id (e.g., "name")
	children?: JSX.Element | Array<JSX.Element>
}

export type OnMarker = {
	__kind: "control:on"
	event: string
	target?: string
	handler?: JSX.Element | Array<JSX.Element>
}

export default function On({ event, target, children }: Props): OnMarker {
	return { __kind: "control:on", event, target, handler: children }
}
