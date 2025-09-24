import type { ButtonBarPosition } from "../../../../types/codewright/forms/index.ts"

export type Props = JSX.HTMLAttributes<HTMLElement> & {
	classes?: Array<string>
	position?: ButtonBarPosition
}

export default function ButtonBar({
	children,
	classes = [],
	position,
	...props
}: Props): JSX.Element {
	const clss = [...classes, "button-bar"].join(" ")

	return position === "top"
		? (
			<header class={clss} {...props}>
				{children}
			</header>
		)
		: (
			<footer class={clss} {...props}>
				{children}
			</footer>
		)
}
