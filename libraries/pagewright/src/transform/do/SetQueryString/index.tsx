//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style

export type SetQueryStringProps = {
	key: string | JSX.Element
	value: string | number | boolean | JSX.Element
}

export type ActionMarker = {
	__kind: "action"
	action: string
	args: Array<unknown>
}

export default function SetQueryString(
	{ key, value }: SetQueryStringProps,
): ActionMarker {
	return {
		__kind: "action",
		action: "Act.SetQueryString",
		args: [key, value],
	}
}
