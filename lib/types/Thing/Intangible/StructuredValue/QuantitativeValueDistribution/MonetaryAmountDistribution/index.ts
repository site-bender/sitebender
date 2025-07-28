import type Thing from "../../../../index.ts"
import type { IntangibleProps } from "../../../index.ts"
import type { StructuredValueProps } from "../../index.ts"
import type { QuantitativeValueDistributionProps } from "../index.ts"

import MonetaryAmountDistributionComponent from "../../../../../../../components/Thing/Intangible/StructuredValue/QuantitativeValueDistribution/MonetaryAmountDistribution/index.tsx"

export interface MonetaryAmountDistributionProps {
}

type MonetaryAmountDistribution =
	& Thing
	& IntangibleProps
	& StructuredValueProps
	& QuantitativeValueDistributionProps
	& MonetaryAmountDistributionProps

export default MonetaryAmountDistribution
