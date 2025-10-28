//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style

export type PublishProps = {
	topic: string | JSX.Element
	payload?: unknown
}

export type ActionMarker = {
	__kind: "action"
	action: string
	args: Array<unknown>
}

export default function Publish(
	{ topic, payload }: PublishProps,
): ActionMarker {
	const args: Array<unknown> = [topic]
	if (typeof payload !== "undefined") args.push(payload)
	return { __kind: "action", action: "Act.Publish", args }
}
