import createElement from "~utilities/createElement/index.ts"

export type Props = JSX.HTMLAttributes<HTMLDivElement> & {
	classes?: Array<string>
	text?: string
}

export default function Help({
	children,
	classes = [],
	text,
	...props
}: Props): JSX.Element {
	const clss = [...classes, "help"].join(" ")

	return (
		<p class={clss} aria-live="polite" {...props}>
			{text || children}
		</p>
	)
}
