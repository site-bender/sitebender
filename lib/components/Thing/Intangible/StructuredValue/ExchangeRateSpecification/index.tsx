import type BaseProps from "../../../../../types/index.ts"
import type ExchangeRateSpecificationProps from "../../../../../types/Thing/Intangible/StructuredValue/ExchangeRateSpecification/index.ts"

import StructuredValue from "../index.tsx"

export type Props = ExchangeRateSpecificationProps & BaseProps

export default function ExchangeRateSpecification({
	currency,
	currentExchangeRate,
	exchangeRateSpread,
	_type = "ExchangeRateSpecification",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<StructuredValue
			{...props}
			_type={_type}
			subtypeProperties={{
				currency,
				currentExchangeRate,
				exchangeRateSpread,
				...subtypeProperties,
			}}
		/>
	)
}
