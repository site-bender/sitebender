import generateShortId from "../../../helpers/generateShortId/index.ts"

export type Props = Record<string, unknown> & {
	classes?: Array<string>
	id?: string
	type?: "button" | "submit" | "reset"
	loading?: boolean
	pressed?: boolean
	label?: string
}

export default function Button({
	classes = [],
	children,
	id = generateShortId(),
	type = "button",
	...props
}: Props) {
	const clss = [...classes, "button"].join(" ")
	const { loading, pressed, label, ...rest } = props as Props

	const hasChildren = Array.isArray(children)
		? children.length > 0
		: children !== undefined && children !== null

	const content = loading
		? (hasChildren ? children : "Loading...")
		: (hasChildren ? children : (label ?? "Click me"))

	const ariaProps = {
		...(loading ? { "aria-busy": true } : {}),
		...(typeof pressed === "boolean" ? { "aria-pressed": pressed } : {}),
		...(label ? { "aria-label": label } : {}),
	}
	return (
		<button
			class={clss}
			id={id}
			type={type}
			{...ariaProps}
			{...rest}
		>
			{content}
		</button>
	)
}
