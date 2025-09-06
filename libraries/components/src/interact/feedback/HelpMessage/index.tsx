export type Props = Record<string, unknown> & {
	classes?: Array<string>
	id?: string
}

/**
 * HelpMessage
 *
 * Visible inline help for form fields.
 * - By default, role="note"; assistive tech reads as advisory content
 * - Intended to be referenced by inputs via aria-describedby
 */
export default function HelpMessage({
	children,
	classes = [],
	id,
	...props
}: Props) {
	const clss = ["help", ...classes].join(" ")
	return (
		<span class={clss} id={id} role="note" {...props}>
			{children}
		</span>
	)
}
