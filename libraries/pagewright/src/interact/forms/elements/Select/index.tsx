import type { Option } from "../../../../../types/pagewright/forms/index.ts"

export type Props = JSX.SelectHTMLAttributes<HTMLSelectElement> & {
	classes?: Array<string>
	naLabel?: string
	naValue?: string
	options: Array<Option>
}

export default function Select({
	classes = [],
	naLabel,
	naValue = "",
	options = [],
	...props
}: Props): JSX.Element {
	const clss = [...classes, "select"].join(" ")

	return (
		<select class={clss} {...props}>
			{naLabel !== null && naLabel !== undefined && (
				<option value={naValue}>{naLabel}</option>
			)}
			{options.map((
				option: { value: string; label: string; checked?: boolean },
			) => (
				<option value={option.value} selected={option.checked}>
					{option.label}
				</option>
			))}
		</select>
	)
}
