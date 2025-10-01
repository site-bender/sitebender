//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style

export type Props = Record<string, unknown> & {
	classes?: Array<string>
	id?: string
	label?: string
}

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
export default function HelpTooltip(
	{ children, classes = [], id, label = "Help", ...props }: Props,
) {
	const triggerId = id ? `${id}-trigger` : undefined
	const contentId = id ? `${id}-content` : undefined
	const clss = ["help-tooltip", ...classes].join(" ")
	return (
		<span class={clss} {...props}>
			<button
				type="button"
				aria-describedby={contentId}
				id={triggerId}
				class="help-tooltip-trigger"
			>
				{label}
			</button>
			<span id={contentId} role="note" class="help-tooltip-content">
				{children}
			</span>
		</span>
	)
}
