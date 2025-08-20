import createElement from "../../../../utilities/createElement/index.ts"
import generateShortId from "../../../../utilities/generateShortId/index.ts"

export type Props = Omit<JSX.LabelHTMLAttributes<HTMLLabelElement>, "id"> & {
	checked?: boolean
	classes?: Array<string>
	id?: string
	label: string
	name: string
	radio?: JSX.InputHTMLAttributes<HTMLInputElement>
	value: string
}

export default function Radio({
	checked = false,
	classes = [],
	id = generateShortId(),
	label,
	name,
	radio = {},
	value,
	...props
}: Props): JSX.Element {
	const clss = [...classes, "radio"].join(" ")

	return (
		<label class={clss} id={id} {...props}>
			<span class="label-text">{label}</span>
			<input
				checked={checked}
				id={id}
				name={name}
				type="radio"
				value={value}
				{...radio}
			/>
		</label>
	)
}
