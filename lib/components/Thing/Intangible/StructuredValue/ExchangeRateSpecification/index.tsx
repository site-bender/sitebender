import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type ExchangeRateSpecificationProps from "../../../../../types/Thing/ExchangeRateSpecification/index.ts"
import type StructuredValueProps from "../../../../../types/Thing/StructuredValue/index.ts"

import StructuredValue from "../index.tsx"

export type Props = BaseComponentProps<
	ExchangeRateSpecificationProps,
	"ExchangeRateSpecification",
	ExtractLevelProps<ExchangeRateSpecificationProps, StructuredValueProps>
>

export default function ExchangeRateSpecification(
	{
		currency,
		currentExchangeRate,
		exchangeRateSpread,
		schemaType = "ExchangeRateSpecification",
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
				currentExchangeRate,
				exchangeRateSpread,
				...subtypeProperties,
			}}
		/>
	)
}
