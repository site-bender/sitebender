import type { Option } from "../../../../types/components/forms/index.ts"

import createElement from "../../../../utilities/createElement/index.ts"
import { Fragment } from "../../../../utilities/createElement/index.ts"

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
			{naLabel != null && <option value={naValue}>{naLabel}</option>}
			<>
				{options.map((option: any) => (
					<option value={option.value} selected={option.checked}>
						{option.label}
					</option>
				))}
			</>
		</select>
	)
}
