import generateShortId from "../../../../helpers/generateShortId/index.ts"
import LabelWrapper from "../../composites/LabelWrapper/index.tsx"
import Input from "../../elements/Input/index.tsx"

export type Props = JSX.LabelHTMLAttributes<HTMLLabelElement> & {
	help?: string
	inputAttributes?: Omit<
		JSX.InputHTMLAttributes<HTMLInputElement>,
		"placeholder"
	>
	label?: string
	name?: string
	required?: boolean
}

export default function UrlField({
	help = "Enter your website URL",
	id = generateShortId(),
	inputAttributes = {},
	label = "Website URL",
	name = "website-url",
	required = false,
	...props
}: Props) {
	return (
		<LabelWrapper
			classes={["form-field", "url-field"]}
			help={help}
			id={id}
			label={label}
			{...props}
		>
			<Input
				type="url"
				id={id}
				name={name}
				required={required}
				{...inputAttributes}
			/>
		</LabelWrapper>
	)
}
