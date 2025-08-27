import type { InputOption } from "../../../../../types/components/forms/index.ts"
import type { Props as HelpProps } from "../../elements/Help/index.tsx"
import type { Props as LabelProps } from "../../elements/Label/index.tsx"

import createElement from "../../../../helpers/createElement/index.ts"
import generateShortId from "../../../../helpers/generateShortId/index.ts"
import Radio from "../../elements/Radio/index.tsx"
import FieldSet from "../../FieldSet/index.tsx"
import Legend from "../Legend/index.tsx"

export type Props =
	& Omit<
		JSX.FieldSetHTMLAttributes<HTMLFieldSetElement>,
		"defaultValue" | "id" | "label"
	>
	& {
		classes?: Array<string>
		help?: string | HelpProps
		id?: string
		label: string | LabelProps
		name: string
		options: Array<InputOption>
		required?: boolean
	}

export default function RadioGroup({
	classes = [],
	help,
	id = generateShortId(),
	label,
	name,
	options = [],
	required,
	...props
}: Props) {
	const helpId = `${id}-help`
	const legendId = `${id}-legend`

	return (
		<FieldSet classes={[...classes, "group", "radio-group"]} id={id} {...props}>
			<Legend help={help} id={id} label={label} />
			{options.map(
				({ checked, id: rId, label: rLabel, value }: InputOption) => {
					const radioId = `${rId || id}-${value}`
					const describedBy = [legendId, help ? helpId : null].filter(Boolean)
						.join(" ")
					return (
						<Radio
							checked={checked}
							id={radioId}
							label={rLabel}
							name={name}
							value={value}
							{...(required ? { required: true } : {})}
							radio={{ "aria-describedby": describedBy }}
						/>
					)
				},
			)}
		</FieldSet>
	)
}
