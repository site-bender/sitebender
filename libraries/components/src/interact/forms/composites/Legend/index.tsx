import type { Props as HelpProps } from "../../elements/Help/index.tsx"
import type { Props as LabelProps } from "../../elements/Label/index.tsx"

import createElement from "../../../../utilities/createElement/index.ts"
import generateShortId from "../../../../utilities/generateShortId/index.ts"
import Help from "../../elements/Help/index.tsx"
import Label from "../../elements/Label/index.tsx"

export type Props = Omit<JSX.HTMLAttributes<HTMLLegendElement>, "label"> & {
	classes?: Array<string>
	help?: string | HelpProps
	id?: string
	label?: string | LabelProps
}

export default function Legend({
	classes = [],
	help,
	id: suppliedId,
	label,
	...props
}: Props) {
	const id = suppliedId || generateShortId()
	const clss = [...classes, "legend"].join(" ")
	const helpId = `${id}-help`
	const labelId = `${id}-label`
	const legendId = `${id}-legend`

	const helpAttrs = typeof help === "string" ? { text: help } : help
	const labelAttrs = typeof label === "string" ? { text: label } : label

	return (
		<legend class={clss} id={legendId} {...props}>
			<Label id={labelId} {...labelAttrs} useDiv />
			{help ? <Help id={helpId} {...helpAttrs} /> : null}
		</legend>
	)
}
