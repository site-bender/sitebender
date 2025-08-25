import type {
	TrileanFieldType,
	TrileanType,
} from "../../../../../types/components/forms/index.ts"
import type { Props as HelpProps } from "../../elements/Help/index.tsx"
import type { Props as LabelProps } from "../../elements/Label/index.tsx"

import createElement from "../../../../utilities/createElement/index.ts"
import generateShortId from "../../../../utilities/generateShortId/index.ts"
import LabelWrapper from "../../composites/LabelWrapper/index.tsx"
import RadioGroup from "../../composites/RadioGroup/index.tsx"
import Select from "../../elements/Select/index.tsx"

export type Props =
	& (
		| JSX.FieldSetHTMLAttributes<HTMLFieldSetElement>
		| JSX.LabelHTMLAttributes<HTMLLabelElement>
	)
	& {
		classes?: Array<string>
		id?: string
		initialValue?: TrileanType
		help?: string | HelpProps
		label?: string | LabelProps
		maybe?: string
		name?: string
		no?: string
		required?: boolean
		use?: TrileanFieldType
		yes?: string
	}

export default function TrileanField({
	classes = [],
	initialValue = "maybe",
	help = "Choose an option",
	id = generateShortId(),
	label = "Choose One",
	maybe = "Maybe",
	name = "choose-one",
	no = "No",
	required = false,
	use = "radio",
	yes = "Yes",
	...props
}: Props) {
	const yesId = `${id}-yes`
	const noId = `${id}-no`
	const maybeId = `${id}-maybe`

	return use === "select"
		? (
			<LabelWrapper
				classes={[...classes, "form-field", "trilean-field"]}
				help={help}
				id={id}
				label={label}
				{...(props as JSX.LabelHTMLAttributes<HTMLLabelElement>)}
			>
				<Select
					defaultValue={initialValue}
					id={id}
					name={name}
					options={[
						{ value: "yes", label: yes },
						{ value: "no", label: no },
						{ value: "maybe", label: maybe },
					]}
					required={required}
				/>
			</LabelWrapper>
		)
		: (
			<RadioGroup
				classes={["form-field", "trilean-field", "radio-group"]}
				help={help}
				id={id}
				label={label}
				name={name}
				options={[
					{
						checked: initialValue === "yes",
						id: yesId,
						label: yes,
						value: "yes",
					},
					{
						checked: initialValue === "no",
						id: noId,
						label: no,
						value: "no",
					},
					{
						checked: initialValue === "maybe",
						id: maybeId,
						label: maybe,
						value: "maybe",
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
