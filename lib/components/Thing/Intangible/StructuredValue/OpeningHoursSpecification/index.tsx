import type { BaseComponentProps, ExtractLevelProps } from "../../../../../types/index.ts"
import type ThingProps from "../../../../../types/Thing/index.ts"
import type { IntangibleProps } from "../../../../../types/Thing/Intangible/index.ts"
import type { StructuredValueProps } from "../../../../../types/Thing/Intangible/StructuredValue/index.ts"
import type { OpeningHoursSpecificationProps } from "../../../../../types/Thing/Intangible/StructuredValue/OpeningHoursSpecification/index.ts"

import StructuredValue from "../index.tsx"

export type Props = BaseComponentProps<
	OpeningHoursSpecificationProps,
	"OpeningHoursSpecification",
	ExtractLevelProps<ThingProps, IntangibleProps, StructuredValueProps>
>

export default function OpeningHoursSpecification({
	closes,
	dayOfWeek,
	opens,
	validFrom,
	validThrough,
	schemaType = "OpeningHoursSpecification",
	subtypeProperties = {},
	...props
}): Props {
	return (
		<StructuredValue
			{...props}
			schemaType={schemaType}
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
