export type Props = Record<string, unknown> & {
	classes?: Array<string>
	id?: string
}

/**
 * ErrorMessage
 *
 * Accessible inline error message for form fields.
 * - Always renders role="alert" for assistive tech announcement
 * - Intended to be referenced by inputs via aria-describedby
 */
export default function ErrorMessage({
	children,
	classes = [],
	id,
	...props
}: Props) {
	const clss = ["error", ...classes].join(" ")
	return (
		<span class={clss} id={id} role="alert" {...props}>
			{children}
		</span>
	)
}
