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
import type { CompoundPriceSpecificationType } from "./CompoundPriceSpecification/index.ts"
import type { DeliveryChargeSpecificationType } from "./DeliveryChargeSpecification/index.ts"
import type { PaymentChargeSpecificationType } from "./PaymentChargeSpecification/index.ts"
import type { UnitPriceSpecificationType } from "./UnitPriceSpecification/index.ts"

import { MemberProgramTier as MemberProgramTierComponent } from "../../../../../../components/index.tsx"
import { PriceSpecification as PriceSpecificationComponent } from "../../../../../../components/index.tsx"
import { QuantitativeValue as QuantitativeValueComponent } from "../../../../../../components/index.tsx"

export type PriceSpecificationType =
	| "PriceSpecification"
	| CompoundPriceSpecificationType
	| DeliveryChargeSpecificationType
	| PaymentChargeSpecificationType
	| UnitPriceSpecificationType

export interface PriceSpecificationProps {
	"@type"?: PriceSpecificationType
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
