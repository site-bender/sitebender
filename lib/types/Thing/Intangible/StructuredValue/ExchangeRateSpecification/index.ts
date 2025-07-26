import type { Number, Text } from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { StructuredValueProps } from "../index.ts"
import type MonetaryAmount from "../MonetaryAmount/index.ts"
import type UnitPriceSpecification from "../PriceSpecification/UnitPriceSpecification/index.ts"

export interface ExchangeRateSpecificationProps {
	currency?: Text
	currentExchangeRate?: UnitPriceSpecification
	exchangeRateSpread?: MonetaryAmount | Number
}

type ExchangeRateSpecification =
	& Thing
	& IntangibleProps
	& StructuredValueProps
	& ExchangeRateSpecificationProps

export default ExchangeRateSpecification
