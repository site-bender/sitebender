import type BaseProps from "../../../../../types/index.ts"
import type DayOfWeekProps from "../../../../../types/Thing/Intangible/Enumeration/DayOfWeek/index.ts"

import Enumeration from "../index.tsx"

export type Props = DayOfWeekProps & BaseProps

export default function DayOfWeek({
	_type = "DayOfWeek",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<Enumeration
			{...props}
			_type={_type}
			subtypeProperties={{
				...subtypeProperties,
			}}
		>
			{children}
		</Enumeration>
	)
}
