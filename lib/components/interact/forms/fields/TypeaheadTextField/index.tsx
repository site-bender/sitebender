import type { Props as HelpProps } from "../../elements/Help/index.tsx"
import type { Props as LabelProps } from "../../elements/Label/index.tsx"

import createElement from "../../../../utilities/createElement/index.ts"
import generateShortId from "../../../../utilities/generateShortId/index.ts"
import LabelWrapper from "../../composites/LabelWrapper/index.tsx"
import Select from "../../elements/Select/index.tsx"

export type Props = JSX.LabelHTMLAttributes<HTMLLabelElement> & {
	chooseMany?: boolean
	classes?: Array<string>
	help?: string | HelpProps
	label?: string | LabelProps
	name?: string
	options: string[]
	required?: boolean
}

export default function TypeaheadTextField({
	chooseMany = false,
	classes = [],
	help = "Enter a value",
	id = generateShortId(),
	label = "Autocomplete",
	name = "autocomplete",
	options,
	required = false,
	...props
}: Props) {
	const helpId = `${id}-help`
	const labelId = `${id}-label`
	const selectSize = chooseMany ? Math.min(options.length, 5) : undefined
	const opts = options.map((value: any) => ({
		label: value,
		value,
	}))

	return (
		<LabelWrapper
			classes={[...classes, "form-field", "autocomplete-field"]}
			help={help}
			id={String(id)}
			label={label}
			{...props}
		>
			<Select
				aria-describedby={`${labelId} ${helpId}`}
				aria-required={required}
				id={id}
				multiple={chooseMany}
				name={name}
				options={opts}
				required={required}
				size={selectSize}
			/>
		</LabelWrapper>
	)
}
