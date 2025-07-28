import type { BaseComponentProps, ExtractLevelProps } from "../../../../../types/index.ts"
import type ThingProps from "../../../../../types/Thing/index.ts"
import type { IntangibleProps } from "../../../../../types/Thing/Intangible/index.ts"
import type { StructuredValueProps } from "../../../../../types/Thing/Intangible/StructuredValue/index.ts"
import type { ExchangeRateSpecificationProps } from "../../../../../types/Thing/Intangible/StructuredValue/ExchangeRateSpecification/index.ts"

import StructuredValue from "../index.tsx"

export type Props = BaseComponentProps<
	ExchangeRateSpecificationProps,
	"ExchangeRateSpecification",
	ExtractLevelProps<ThingProps, IntangibleProps, StructuredValueProps>
>

export default function ExchangeRateSpecification({
	currency,
	currentExchangeRate,
	exchangeRateSpread,
	schemaType = "ExchangeRateSpecification",
	subtypeProperties = {},
	...props
}): Props {
	return (
		<StructuredValue
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				currency,
				currentExchangeRate,
				exchangeRateSpread,
				...subtypeProperties,
			}}
		/>
	)
}
