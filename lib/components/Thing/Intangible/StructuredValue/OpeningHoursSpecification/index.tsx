import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type OpeningHoursSpecificationProps from "../../../../../types/Thing/OpeningHoursSpecification/index.ts"
import type StructuredValueProps from "../../../../../types/Thing/StructuredValue/index.ts"

import StructuredValue from "./index.tsx"

export type Props = BaseComponentProps<
	OpeningHoursSpecificationProps,
	"OpeningHoursSpecification",
	ExtractLevelProps<OpeningHoursSpecificationProps, StructuredValueProps>
>

export default function OpeningHoursSpecification(
	{
		closes,
		dayOfWeek,
		opens,
		validFrom,
		validThrough,
		schemaType = "OpeningHoursSpecification",
		subtypeProperties = {},
		...props
	}: Props,
) {
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
