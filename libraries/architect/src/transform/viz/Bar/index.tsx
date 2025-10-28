//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style

export type Props = {
	id?: string
	className?: string
	style?: Record<string, unknown>
	x?: string
	y?: string
	color?: string
	series?: string
	options?: Record<string, unknown>
}

type VNode = { type: string; props: Record<string, unknown> }

export default function VizBar(props: Props = {}): VNode {
	const { id, className, style, x, y, color, series } = props
	const attrs: Record<string, unknown> = {
		id,
		className,
		"data-viz": "Bar",
		...(x ? { "data-viz-x": x } : {}),
		...(y ? { "data-viz-y": y } : {}),
		...(color ? { "data-viz-color": color } : {}),
		...(series ? { "data-viz-series": series } : {}),
		...(style ? { style } : {}),
	}
	for (const k of Object.keys(attrs)) {
		if (typeof attrs[k] === "undefined") delete attrs[k]
	}
	return { type: "div", props: attrs }
}
