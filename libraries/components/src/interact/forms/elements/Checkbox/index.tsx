import createElement from "../../../../helpers/createElement/index.ts"
import generateShortId from "../../../../helpers/generateShortId/index.ts"

export type Props = JSX.LabelHTMLAttributes<HTMLLabelElement> & {
	checkbox?: JSX.InputHTMLAttributes<HTMLInputElement>
	checked?: boolean
	classes?: Array<string>
	id?: string
	label: string
	name: string
	value: string
}

export default function Checkbox({
	checkbox = {},
	checked = false,
	classes = [],
	id = generateShortId(),
	label,
	name,
	value,
	...props
}: Props) {
	const clss = [...classes, "checkbox"].join(" ")

	return (
		<label class={clss} id={id} {...props}>
			<div class="label-text">{label}</div>
			<input
				checked={checked}
				id={id}
				name={name}
				type="checkbox"
				value={value}
				{...checkbox}
			/>
		</label>
	)
}
