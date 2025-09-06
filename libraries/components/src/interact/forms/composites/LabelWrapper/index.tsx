import type { Props as HelpProps } from "../../elements/Help/index.tsx"
import type { Props as LabelProps } from "../../elements/Label/index.tsx"

import generateShortId from "../../../../helpers/generateShortId/index.ts"
import Help from "../../elements/Help/index.tsx"
import Label from "../../elements/Label/index.tsx"

export type Props = JSX.LabelHTMLAttributes<HTMLLabelElement> & {
	classes?: Array<string>
	help?: string | HelpProps
	label?: string | LabelProps
}

export default function LabelWrapper({
	children,
	classes = [],
	help,
	id: suppliedId,
	label,
	...props
}: Props) {
	const id = suppliedId || generateShortId()
	const clss = [...classes, "wrapper"].join(" ")

	const helpId = `${id}-help`
	const labelId = `${id}-label`
	const wrapperId = `${id}-wrapper`

	const helpAttrs = typeof help === "string" ? { text: help } : help
	const labelAttrs = typeof label === "string" ? { text: label } : label

	const child = Array.isArray(children) ? children[0] : children
	const isFormControl = child && typeof child === "object" &&
		["input", "textarea", "select"].includes(child.type)

	const injectedChild = isFormControl
		? (
			// @ts-ignore - child.type is a valid intrinsic or component
			<child.type
				{...child.props}
				aria-labelledby={label ? labelId : undefined}
				aria-describedby={((): string | undefined => {
					const existing = (child.props || {})["aria-describedby"] as
						| string
						| undefined
					if (!help) return existing
					if (!existing) return helpId
					const tokens = new Set((existing + " " + helpId).trim().split(/\s+/))
					return Array.from(tokens).join(" ")
				})()}
				id={child.props.id || `${id}-control`}
			/>
		)
		: child

	return (
		<label class={clss} id={wrapperId} {...props}>
			<Label id={labelId} {...(labelAttrs || {})} useDiv />
			{help ? <Help id={helpId} {...(helpAttrs || {})} /> : null}
			{injectedChild}
		</label>
	)
}
