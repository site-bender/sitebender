import { CHOOSE_ONE_FIELD_TOGGLE } from "@sitebender/toolkit/constants/forms/index.ts"

import type { Option } from "../../../../../types/components/forms/index.ts"
import type { Props as HelpProps } from "../../elements/Help/index.tsx"
import type { Props as LabelProps } from "../../elements/Label/index.tsx"

import createElement from "../../../../helpers/createElement/index.ts"
import generateShortId from "../../../../helpers/generateShortId/index.ts"
import LabelWrapper from "../../composites/LabelWrapper/index.tsx"
import RadioGroup from "../../composites/RadioGroup/index.tsx"
import Select from "../../elements/Select/index.tsx"

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
	label = "",
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
