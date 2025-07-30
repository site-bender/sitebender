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

import MonetaryAmountComponent from "../../../../../components/Thing/Intangible/StructuredValue/MonetaryAmount/index.ts"

export interface DatedMoneySpecificationProps {
	"@type"?: "DatedMoneySpecification"
	amount?: MonetaryAmount | Number | ReturnType<typeof MonetaryAmountComponent>
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
