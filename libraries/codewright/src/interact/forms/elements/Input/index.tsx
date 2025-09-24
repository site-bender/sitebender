export type Props = JSX.InputHTMLAttributes<HTMLInputElement> & {
	classes?: Array<string>
}

export default function Input({ classes = [], ...props }: Props) {
	const clss = [...classes, "input"].join(" ")

	return <input class={clss} {...props} />
}
