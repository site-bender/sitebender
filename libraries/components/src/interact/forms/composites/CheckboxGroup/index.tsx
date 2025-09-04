import type { InputOption } from "../../../../../types/components/forms/index.ts"
import type { Props as HelpProps } from "../../elements/Help/index.tsx"
import type { Props as LabelProps } from "../../elements/Label/index.tsx"

import createElement from "../../../../helpers/createElement/index.ts"
import generateShortId from "../../../../helpers/generateShortId/index.ts"
import Checkbox from "../../elements/Checkbox/index.tsx"
import Help from "../../elements/Help/index.tsx"
import FieldSet from "../../FieldSet/index.tsx"
import Legend from "../Legend/index.tsx"

export type Props = Omit<JSX.FieldSetHTMLAttributes<HTMLFieldSetElement>, "id"> & {
	classes?: Array<string>
	id?: string
	help?: string | HelpProps
	label: string | LabelProps
	name: string
	options: Array<InputOption>
	required?: boolean
}

export default function CheckboxGroup({
	classes = [],
	help,
	id: suppliedId,
	label,
	name,
	options = [],
	required,
	...props
}: Props) {
	const id: string = typeof suppliedId === "string" ? suppliedId : generateShortId()
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
