import type {
	Boolean,
	Date,
	DateTime,
	Number,
	Text,
} from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type MemberProgramTier from "../../MemberProgramTier/index.ts"
import type { StructuredValueProps } from "../index.ts"
import type QuantitativeValue from "../QuantitativeValue/index.ts"

import MemberProgramTierComponent from "../../../../../components/Thing/Intangible/MemberProgramTier/index.ts"
import PriceSpecificationComponent from "../../../../../components/Thing/Intangible/StructuredValue/PriceSpecification/index.ts"
import QuantitativeValueComponent from "../../../../../components/Thing/Intangible/StructuredValue/QuantitativeValue/index.ts"

export interface PriceSpecificationProps {
	eligibleQuantity?:
		| QuantitativeValue
		| ReturnType<typeof QuantitativeValueComponent>
	eligibleTransactionVolume?:
		| PriceSpecification
		| ReturnType<typeof PriceSpecificationComponent>
	maxPrice?: Number
	membershipPointsEarned?:
		| Number
		| QuantitativeValue
		| ReturnType<typeof QuantitativeValueComponent>
	minPrice?: Number
	price?: Number | Text
	priceCurrency?: Text
	validForMemberTier?:
		| MemberProgramTier
		| ReturnType<typeof MemberProgramTierComponent>
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
