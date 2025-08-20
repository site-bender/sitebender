import type { Number, Text } from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { StructuredValueProps } from "../index.ts"
import type MonetaryAmount from "../MonetaryAmount/index.ts"
import type UnitPriceSpecification from "../PriceSpecification/UnitPriceSpecification/index.ts"

import { MonetaryAmount as MonetaryAmountComponent } from "../../../../../../components/index.tsx"
import { UnitPriceSpecification as UnitPriceSpecificationComponent } from "../../../../../../components/index.tsx"

export type ExchangeRateSpecificationType = "ExchangeRateSpecification"

export interface ExchangeRateSpecificationProps {
	"@type"?: ExchangeRateSpecificationType
	currency?: Text
	currentExchangeRate?:
		| UnitPriceSpecification
		| ReturnType<typeof UnitPriceSpecificationComponent>
	exchangeRateSpread?:
		| MonetaryAmount
		| Number
		| ReturnType<typeof MonetaryAmountComponent>
}

type ExchangeRateSpecification =
	& Thing
	& IntangibleProps
	& StructuredValueProps
	& ExchangeRateSpecificationProps

export default ExchangeRateSpecification
