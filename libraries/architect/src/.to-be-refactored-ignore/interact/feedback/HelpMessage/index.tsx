export type Props = Record<string, unknown> & {
	classes?: Array<string>
	id?: string
}

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
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
