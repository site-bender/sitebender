import type { Option } from "~types/forms/index.ts"

import type { Props as HelpProps } from "~components/forms/elements/Help/index.tsx"
import type { Props as LabelProps } from "~components/forms/elements/Label/index.tsx"

import LabelWrapper from "~components/forms/composites/LabelWrapper/index.tsx"
import RadioGroup from "~components/forms/composites/RadioGroup/index.tsx"
import Select from "~components/forms/elements/Select/index.tsx"

import createElement from "~utilities/createElement/index.ts"
import generateShortId from "~utilities/generateShortId/index.ts"

import { CHOOSE_ONE_FIELD_TOGGLE } from "~constants/forms/index.ts"

export type Props =
	& (
		| Omit<JSX.FieldSetHTMLAttributes<HTMLFieldSetElement>, "id" | "label">
		| Omit<JSX.LabelHTMLAttributes<HTMLLabelElement>, "id" | "label">
	)
	& {
		classes?: Array<string>
		help?: string | HelpProps
		id?: string
		label?: string | LabelProps
		name?: string
		naLabel?: string
		options: Array<Option>
		required?: boolean
		useSelect?: boolean
	}

export default function ChooseOneField({
	classes = [],
	help,
	id = generateShortId(),
	label,
	name = "choose-one",
	options,
	required = false,
	useSelect = false,
	...props
}: Props) {
	return useSelect || options.length > CHOOSE_ONE_FIELD_TOGGLE
		? (
			<LabelWrapper
				classes={[...classes, "form-field", "choose-one-field"]}
				help={help}
				id={id}
				label={label}
				{...(props as JSX.LabelHTMLAttributes<HTMLLabelElement>)}
			>
				<Select
					id={id}
					name={name}
					options={options}
					required={required}
				/>
			</LabelWrapper>
		)
		: (
			<RadioGroup
				classes={["form-field", "choose-one-field"]}
				help={help}
				id={id}
				label={label}
				name={name}
				options={options}
				required={required}
				{...(props as Omit<
					JSX.FieldSetHTMLAttributes<HTMLFieldSetElement>,
					"id" | "label"
				>)}
			/>
		)
}
