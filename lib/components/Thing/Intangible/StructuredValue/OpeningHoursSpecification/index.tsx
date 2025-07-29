import type BaseProps from "../../../../../types/index.ts"
import type OpeningHoursSpecificationProps from "../../../../../types/Thing/Intangible/StructuredValue/OpeningHoursSpecification/index.ts"

import StructuredValue from "../index.tsx"

export type Props = OpeningHoursSpecificationProps & BaseProps

export default function OpeningHoursSpecification({
	closes,
	dayOfWeek,
	opens,
	validFrom,
	validThrough,
	_type = "OpeningHoursSpecification",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<StructuredValue
			{...props}
			_type={_type}
			subtypeProperties={{
				closes,
				dayOfWeek,
				opens,
				validFrom,
				validThrough,
				...subtypeProperties,
			}}
		/>
	)
}
