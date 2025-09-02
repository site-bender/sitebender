import type { BooleanFieldType } from "../../../../../types/components/forms/index.ts"
import type { Props as HelpProps } from "../../elements/Help/index.tsx"
import type { Props as LabelProps } from "../../elements/Label/index.tsx"

import createElement from "../../../../helpers/createElement/index.ts"
import generateShortId from "../../../../helpers/generateShortId/index.ts"
import CheckboxGroup from "../../composites/CheckboxGroup/index.tsx"
import LabelWrapper from "../../composites/LabelWrapper/index.tsx"
import RadioGroup from "../../composites/RadioGroup/index.tsx"
import Select from "../../elements/Select/index.tsx"

export type Props =
	& Omit<
		| JSX.FieldSetHTMLAttributes<HTMLFieldSetElement>
		| JSX.LabelHTMLAttributes<HTMLLabelElement>,
		"id" | "defaultValue"
	>
	& {
		classes?: Array<string>
		defaultValue?: boolean
		id?: string
		help?: string | HelpProps
		label?: string | LabelProps
		name?: string
		no?: string
		required?: boolean
		use?: BooleanFieldType
		yes?: string
	}

export default function BooleanField({
	classes = [],
	defaultValue = false,
	help = "Choose an option",
	id = generateShortId(),
	label = "Choose One",
	name = "choose-one",
	no = "No",
	required = false,
	use = "checkbox",
	yes = "Yes",
	...props
}: Props) {
	const checkboxId = `${id}-checkbox`
	const legendId = `${id}-checkbox-legend`
	const yesId = `${id}-yes`
	const noId = `${id}-no`

	return use === "select"
		? (
			<LabelWrapper
				classes={[...classes, "form-field", "boolean-field"]}
				help={help}
				id={id}
				label={label}
				{...(props as JSX.LabelHTMLAttributes<HTMLLabelElement>)}
			>
				<Select
					defaultValue={defaultValue ? "yes" : "no"}
					id={id}
					name={name}
					options={[
						{ value: "yes", label: yes },
						{ value: "no", label: no },
					]}
					required={required}
				/>
			</LabelWrapper>
		)
		: use === "radio"
		? (
			<RadioGroup
				classes={["form-field", "boolean-field"]}
				help={help}
				id={id}
				label={label}
				name={name}
				options={[
					{
						checked: defaultValue === true,
						id: yesId,
						label: yes,
						value: "yes",
					},
					{
						checked: defaultValue === false,
						id: noId,
						label: no,
						value: "no",
					},
				]}
				required={required as boolean}
				{...(props as Omit<
					JSX.FieldSetHTMLAttributes<HTMLFieldSetElement>,
					"id" | "label" | "name"
				>)}
			/>
		)
		: (
			<CheckboxGroup
				aria-describedby={legendId}
				classes={["form-field", "boolean-field"]}
				help={help}
				id={checkboxId}
				label={label}
				name={name}
				options={[
					{
						checked: defaultValue,
						id: yesId,
						label: yes,
						value: "yes",
					},
				]}
				required={required}
				{...(props as Omit<
					JSX.FieldSetHTMLAttributes<HTMLFieldSetElement>,
					"id" | "label" | "name"
				>)}
			/>
		)
}
