import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type MonetaryAmountProps from "../../../../../types/Thing/MonetaryAmount/index.ts"
import type StructuredValueProps from "../../../../../types/Thing/StructuredValue/index.ts"

import StructuredValue from "./index.tsx"

export type Props = BaseComponentProps<
	MonetaryAmountProps,
	"MonetaryAmount",
	ExtractLevelProps<MonetaryAmountProps, StructuredValueProps>
>

export default function MonetaryAmount(
	{
		currency,
		maxValue,
		minValue,
		validFrom,
		validThrough,
		value,
		schemaType = "MonetaryAmount",
		subtypeProperties = {},
		...props
	}: Props,
) {
	return (
		<StructuredValue
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				currency,
				maxValue,
				minValue,
				validFrom,
				validThrough,
				value,
				...subtypeProperties,
			}}
		/>
	)
}
