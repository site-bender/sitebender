import type Thing from "../../../../index.ts"
import type { IntangibleProps } from "../../../index.ts"
import type { StructuredValueProps } from "../../index.ts"
import type { QuantitativeValueDistributionProps } from "../index.ts"

export interface MonetaryAmountDistributionProps {}

type MonetaryAmountDistribution =
	& Thing
	& IntangibleProps
	& StructuredValueProps
	& QuantitativeValueDistributionProps
	& MonetaryAmountDistributionProps

export default MonetaryAmountDistribution
