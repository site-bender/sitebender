import type { BaseComponentProps, ExtractLevelProps } from "../../../../../types/index.ts"
import type ThingProps from "../../../../../types/Thing/index.ts"
import type { IntangibleProps } from "../../../../../types/Thing/Intangible/index.ts"
import type { StructuredValueProps } from "../../../../../types/Thing/Intangible/StructuredValue/index.ts"
import type { QuantitativeValueProps } from "../../../../../types/Thing/Intangible/StructuredValue/QuantitativeValue/index.ts"

import StructuredValue from "../index.tsx"

export type Props = BaseComponentProps<
	QuantitativeValueProps,
	"QuantitativeValue",
	ExtractLevelProps<ThingProps, IntangibleProps, StructuredValueProps>
>

export default function QuantitativeValue({
	additionalProperty,
	maxValue,
	minValue,
	unitCode,
	unitText,
	value,
	valueReference,
	schemaType = "QuantitativeValue",
	subtypeProperties = {},
	...props
}): Props {
	return (
		<StructuredValue
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				additionalProperty,
				maxValue,
				minValue,
				unitCode,
				unitText,
				value,
				valueReference,
				...subtypeProperties,
			}}
		/>
	)
}
