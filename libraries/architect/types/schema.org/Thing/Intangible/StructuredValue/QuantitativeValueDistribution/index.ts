import type { Number } from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type Duration from "../../Quantity/Duration/index.ts"
import type { StructuredValueProps } from "../index.ts"
import type QuantitativeValue from "../QuantitativeValue/index.ts"
import type { MonetaryAmountDistributionType } from "./MonetaryAmountDistribution/index.ts"

import DurationComponent from "../../../../../../../codewright/src/define/Thing/Intangible/Quantity/Duration/index.tsx"
import QuantitativeValueComponent from "../../../../../../../codewright/src/define/Thing/Intangible/StructuredValue/QuantitativeValue/index.tsx"

export type QuantitativeValueDistributionType =
	| "QuantitativeValueDistribution"
	| MonetaryAmountDistributionType

export interface QuantitativeValueDistributionProps {
	"@type"?: QuantitativeValueDistributionType
	duration?:
		| Duration
		| QuantitativeValue
		| ReturnType<typeof DurationComponent>
		| ReturnType<typeof QuantitativeValueComponent>
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
