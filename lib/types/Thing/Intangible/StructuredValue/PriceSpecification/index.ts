import type {
	Boolean,
	Date,
	DateTime,
	Number,
	Text,
} from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { StructuredValueProps } from "../index.ts"
import type MemberProgramTier from "../../MemberProgramTier/index.ts"
import type QuantitativeValue from "../QuantitativeValue/index.ts"

import PriceSpecificationComponent from "../../../../../../components/Thing/Intangible/StructuredValue/PriceSpecification/index.tsx"

export interface PriceSpecificationProps {
	eligibleQuantity?: QuantitativeValue
	eligibleTransactionVolume?: PriceSpecification
	maxPrice?: Number
	membershipPointsEarned?: Number | QuantitativeValue
	minPrice?: Number
	price?: Number | Text
	priceCurrency?: Text
	validForMemberTier?: MemberProgramTier
	validFrom?: Date | DateTime
	validThrough?: Date | DateTime
	valueAddedTaxIncluded?: Boolean
}

type PriceSpecification =
	& Thing
	& IntangibleProps
	& StructuredValueProps
	& PriceSpecificationProps

export default PriceSpecification
