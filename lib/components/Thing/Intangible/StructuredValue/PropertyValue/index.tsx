import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type PropertyValueProps from "../../../../../types/Thing/PropertyValue/index.ts"
import type StructuredValueProps from "../../../../../types/Thing/StructuredValue/index.ts"

import StructuredValue from "./index.tsx"

export type Props = BaseComponentProps<
	PropertyValueProps,
	"PropertyValue",
	ExtractLevelProps<PropertyValueProps, StructuredValueProps>
>

export default function PropertyValue(
	{
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
	}: Props,
) {
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
