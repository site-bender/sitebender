import type { Number, Text } from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { StructuredValueProps } from "../index.ts"
import type MonetaryAmount from "../MonetaryAmount/index.ts"
import type UnitPriceSpecification from "../PriceSpecification/UnitPriceSpecification/index.ts"

import MonetaryAmountComponent from "../../../../../../../codewright/src/define/Thing/Intangible/StructuredValue/MonetaryAmount/index.tsx"
import UnitPriceSpecificationComponent from "../../../../../../../codewright/src/define/Thing/Intangible/StructuredValue/PriceSpecification/UnitPriceSpecification/index.tsx"

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
