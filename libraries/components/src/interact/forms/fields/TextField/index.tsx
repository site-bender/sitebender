import createElement from "../../../../helpers/createElement/index.ts"
import generateShortId from "../../../../helpers/generateShortId/index.ts"
import LabelWrapper from "../../composites/LabelWrapper/index.tsx"
import Input from "../../elements/Input/index.tsx"
import TextArea from "../../elements/TextArea/index.tsx"

export type Props = JSX.LabelHTMLAttributes<HTMLLabelElement> & {
	autoComplete?: string
	help?: string
	inputAttributes?: Omit<
		JSX.InputHTMLAttributes<HTMLInputElement>,
		"placeholder"
	>
	isMultiline?: boolean
	label?: string
	name?: string
	rows?: number
	required?: boolean
	size?: number
	textareaAttributes?: Omit<
		JSX.TextareaHTMLAttributes<HTMLTextAreaElement>,
		"placeholder"
	>
}

export default function TextField({
	autoComplete,
	help = "Enter text",
	id = generateShortId(),
	inputAttributes = {},
	isMultiline = false,
	label = "Text",
	name = "text",
	rows = 3,
	required = false,
	size,
	textareaAttributes = {},
	...props
}: Props) {
	const auto = autoComplete ? { autoComplete } : {}

	return (
		<LabelWrapper
			classes={["form-field", "text-field"]}
			help={help}
			id={id}
			label={label}
			{...props}
		>
			{isMultiline
				? (
					<TextArea
						{...auto}
						id={id}
						name={name}
						rows={rows}
						required={required}
						{...textareaAttributes}
					/>
				)
				: (
					<Input
						{...auto}
						id={id}
						name={name}
						required={required}
						size={size}
						type="text"
						{...inputAttributes}
					/>
				)}
		</LabelWrapper>
	)
}
