import type { Number } from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { StructuredValueProps } from "../index.ts"
import type Duration from "../../Quantity/Duration/index.ts"
import type QuantitativeValue from "../QuantitativeValue/index.ts"

export interface QuantitativeValueDistributionProps {
	duration?: Duration | QuantitativeValue
	median?: Number
	percentile10?: Number
	percentile25?: Number
	percentile75?: Number
	percentile90?: Number
}

type QuantitativeValueDistribution =
	& Thing
	& IntangibleProps
	& StructuredValueProps
	& QuantitativeValueDistributionProps

export default QuantitativeValueDistribution
