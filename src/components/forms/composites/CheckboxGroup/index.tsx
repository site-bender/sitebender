import type { InputOption } from "~types/forms/index.ts"

import type { Props as HelpProps } from "~components/forms/elements/Help/index.tsx"
import type { Props as LabelProps } from "~components/forms/elements/Label/index.tsx"

import Legend from "~components/forms/composites/Legend/index.tsx"
import Checkbox from "~components/forms/elements/Checkbox/index.tsx"
import Help from "~components/forms/elements/Help/index.tsx"
import FieldSet from "~components/forms/FieldSet/index.tsx"

import createElement from "~utilities/createElement/index.ts"
import generateShortId from "~utilities/generateShortId/index.ts"

export type Props = JSX.FieldSetHTMLAttributes<HTMLFieldSetElement> & {
	classes?: Array<string>
	help?: string | HelpProps
	label: string | LabelProps
	name: string
	options: Array<InputOption>
	required?: boolean
}

export default function CheckboxGroup({
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

	if (!options.length) {
		return (
			<FieldSet
				classes={[...classes, "group", "checkbox-group"]}
				id={id}
				{...props}
			>
				<Legend help={help} id={id} label={label} />
				<Help id={helpId} text="No options available at this time." />
			</FieldSet>
		)
	}

	return (
		<FieldSet
			classes={[...classes, "group", "checkbox-group"]}
			id={id}
			{...props}
		>
			<Legend help={help} id={id} label={label} />
			{options.map(
				({ checked, id: cId, label: cLabel, value }: InputOption) => {
					const checkboxId = `${cId || id}-${value}`
					const describedBy = [legendId, help ? helpId : null].filter(Boolean)
						.join(" ")
					return (
						<Checkbox
							checked={checked}
							id={checkboxId}
							label={cLabel}
							name={name}
							value={value}
							{...(required ? { required: true } : {})}
							checkbox={{ "aria-describedby": describedBy }}
						/>
					)
				},
			)}
		</FieldSet>
	)
}
