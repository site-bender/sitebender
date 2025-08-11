import createElement from "../../../utilities/createElement/index.ts"
// Make createElement globally available for JSX
import generateShortId from "../../../utilities/generateShortId/index.ts"

export type Props = JSX.ButtonHTMLAttributes<HTMLButtonElement> & {
	classes?: Array<string>
	type?: "button" | "submit" | "reset"
}

export default function ({
	classes = [],
	children,
	id = generateShortId(),
	type = "button",
	...props
}: Props): JSX.Element {
	const clss = [...classes, "button"].join(" ")
	const content = children || "Click me"

	return (
		<button class={clss} id={id} type={type} {...props}>
			{content}
		</button>
	)
}
