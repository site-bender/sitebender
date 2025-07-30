import type BaseProps from "../../../../../types/index.ts"
import type PropertyValueProps from "../../../../../types/Thing/Intangible/StructuredValue/PropertyValue/index.ts"

import StructuredValue from "../index.tsx"

export type Props = PropertyValueProps & BaseProps

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
	_type = "PropertyValue",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<StructuredValue
			{...props}
			_type={_type}
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
		>{children}</StructuredValue>
	)
}
