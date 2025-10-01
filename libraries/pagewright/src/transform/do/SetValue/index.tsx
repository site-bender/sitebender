//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style

export type SetValueProps = {
	selector: string | JSX.Element
	value?: JSX.Element | string | number | boolean
}

export type ActionMarker = {
	__kind: "action"
	action: string
	args: Array<unknown>
}

export default function SetValue(
	{ selector, value }: SetValueProps,
): ActionMarker {
	const args: Array<unknown> = [selector]
	if (typeof value !== "undefined") args.push(value)
	return { __kind: "action", action: "Act.SetValue", args }
}
