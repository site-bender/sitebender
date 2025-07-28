import type { BaseComponentProps, ExtractLevelProps } from "../../../../../types/index.ts"
import type ThingProps from "../../../../../types/Thing/index.ts"
import type { IntangibleProps } from "../../../../../types/Thing/Intangible/index.ts"
import type { StructuredValueProps } from "../../../../../types/Thing/Intangible/StructuredValue/index.ts"
import type { MonetaryAmountProps } from "../../../../../types/Thing/Intangible/StructuredValue/MonetaryAmount/index.ts"

import StructuredValue from "../index.tsx"

export type Props = BaseComponentProps<
	MonetaryAmountProps,
	"MonetaryAmount",
	ExtractLevelProps<ThingProps, IntangibleProps, StructuredValueProps>
>

export default function MonetaryAmount({
	currency,
	maxValue,
	minValue,
	validFrom,
	validThrough,
	value,
	schemaType = "MonetaryAmount",
	subtypeProperties = {},
	...props
}): Props {
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
