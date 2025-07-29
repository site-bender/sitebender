import type BaseProps from "../../../../../types/index.ts"
import type QuantitativeValueProps from "../../../../../types/Thing/Intangible/StructuredValue/QuantitativeValue/index.ts"

import StructuredValue from "../index.tsx"

export type Props = QuantitativeValueProps & BaseProps

export default function QuantitativeValue({
	additionalProperty,
	maxValue,
	minValue,
	unitCode,
	unitText,
	value,
	valueReference,
	_type = "QuantitativeValue",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<StructuredValue
			{...props}
			_type={_type}
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
