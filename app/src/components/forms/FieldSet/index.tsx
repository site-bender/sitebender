import createElement from "~utilities/createElement/index.ts"
import generateShortId from "~utilities/generateShortId/index.ts"

export type Props = JSX.FieldSetHTMLAttributes<HTMLFieldSetElement> & {
	classes?: Array<string>
	id?: string
	legend?: string | JSX.Element
	legendAttrs?: JSX.HTMLAttributes<HTMLLegendElement>
}

export default function FieldSet({
	children,
	classes = [],
	id = generateShortId(),
	legend,
	legendAttrs = {},
	...props
}: Props): JSX.Element {
	const clss = [...classes, "fieldset"].join(" ")

	const enhancedLegendAttrs = legend
		? {
			id: legendAttrs.id || `${id}-legend`,
			...legendAttrs,
		}
		: legendAttrs

	return (
		<fieldset class={clss} id={id} role="group" {...props}>
			{legend && <legend {...enhancedLegendAttrs}>{legend}</legend>}
			{children}
		</fieldset>
	)
}
