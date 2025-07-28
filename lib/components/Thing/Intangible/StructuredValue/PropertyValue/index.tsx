import type { BaseComponentProps, ExtractLevelProps } from "../../../../../types/index.ts"
import type ThingProps from "../../../../../types/Thing/index.ts"
import type { IntangibleProps } from "../../../../../types/Thing/Intangible/index.ts"
import type { StructuredValueProps } from "../../../../../types/Thing/Intangible/StructuredValue/index.ts"
import type { PropertyValueProps } from "../../../../../types/Thing/Intangible/StructuredValue/PropertyValue/index.ts"

import StructuredValue from "../index.tsx"

export type Props = BaseComponentProps<
	PropertyValueProps,
	"PropertyValue",
	ExtractLevelProps<ThingProps, IntangibleProps, StructuredValueProps>
>

export default function PropertyValue({
	maxValue,
	measurementMethod,
	measurementTechnique,
	minValue,
	propertyID,
	unitCode,
	unitText,
	value,
	valueReference,
	schemaType = "PropertyValue",
	subtypeProperties = {},
	...props
}): Props {
	return (
		<StructuredValue
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				maxValue,
				measurementMethod,
				measurementTechnique,
				minValue,
				propertyID,
				unitCode,
				unitText,
				value,
				valueReference,
				...subtypeProperties,
			}}
		/>
	)
}
