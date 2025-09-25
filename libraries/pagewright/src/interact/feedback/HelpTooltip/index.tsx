/** HelpTooltip - Contextual help in tooltip format */

export type Props = Record<string, unknown> & {
	classes?: Array<string>
	id?: string
	label?: string
}

/**
 * HelpTooltip
 *
 * Minimal tooltip trigger + content, progressively enhanced.
 * - Renders a button with aria-describedby pointing to help content
 * - CSS can position the content; JS can optionally enhance interactions
 */
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
