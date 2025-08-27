import createElement from "../../../../helpers/createElement/index.ts"

export type Props = JSX.LabelHTMLAttributes<HTMLLabelElement> & {
	classes?: Array<string>
	text?: string
	useDiv?: boolean
}

export default function Label({
	children,
	classes = [],
	text,
	useDiv = false,
	...props
}: Props) {
	const clss = [...classes, "label"].join(" ")
	const content = text || children

	return useDiv
		? (
			<div class={clss} {...props}>
				{content}
			</div>
		)
		: (
			<label class={clss} {...props}>
				{content}
			</label>
		)
}
