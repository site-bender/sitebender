export type Props = JSX.TextareaHTMLAttributes<HTMLTextAreaElement> & {
	classes?: Array<string>
}

export default function TextArea({
	classes = [],
	...props
}: Props): JSX.Element {
	const clss = [...classes, "textarea"].join(" ")

	return <textarea class={clss} {...props}></textarea>
}
