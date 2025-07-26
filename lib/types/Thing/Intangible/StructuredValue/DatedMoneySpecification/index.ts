import type {
	Date,
	DateTime,
	Number,
	Text,
} from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { StructuredValueProps } from "../index.ts"
import type MonetaryAmount from "../MonetaryAmount/index.ts"

export interface DatedMoneySpecificationProps {
	amount?: MonetaryAmount | Number
	currency?: Text
	endDate?: Date | DateTime
	startDate?: Date | DateTime
}

type DatedMoneySpecification =
	& Thing
	& IntangibleProps
	& StructuredValueProps
	& DatedMoneySpecificationProps

export default DatedMoneySpecification
