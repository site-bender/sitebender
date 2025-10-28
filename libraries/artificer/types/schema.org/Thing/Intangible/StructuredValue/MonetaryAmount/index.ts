import type {
	Boolean,
	Date,
	DateTime,
	Number,
	Text,
} from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type StructuredValue from "../index.ts"
import type { StructuredValueProps } from "../index.ts"

import StructuredValueComponent from "../../../../../../../architect/src/define/Thing/Intangible/StructuredValue/index.tsx"

export type MonetaryAmountType = "MonetaryAmount"

export interface MonetaryAmountProps {
	"@type"?: MonetaryAmountType
	currency?: Text
	maxValue?: Number
	minValue?: Number
	validFrom?: Date | DateTime
	validThrough?: Date | DateTime
	value?:
		| Boolean
		| Number
		| StructuredValue
		| Text
		| ReturnType<typeof StructuredValueComponent>
}

type MonetaryAmount =
	& Thing
	& IntangibleProps
	& StructuredValueProps
	& MonetaryAmountProps

export default MonetaryAmount
