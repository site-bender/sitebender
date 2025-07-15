import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type QuantitativeValueProps from "../../../../../types/Thing/QuantitativeValue/index.ts"
import type StructuredValueProps from "../../../../../types/Thing/StructuredValue/index.ts"

import StructuredValue from "./index.tsx"

export type Props = BaseComponentProps<
	QuantitativeValueProps,
	"QuantitativeValue",
	ExtractLevelProps<QuantitativeValueProps, StructuredValueProps>
>

export default function QuantitativeValue(
	{
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
	}: Props,
) {
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
