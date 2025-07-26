import type { Number, Text } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type { IntangibleProps } from "../index.ts"
import type CreditCard from "../PaymentMethod/PaymentCard/CreditCard/index.ts"
import type MemberProgram from "../MemberProgram/index.ts"
import type MonetaryAmount from "../StructuredValue/MonetaryAmount/index.ts"
import type QuantitativeValue from "../StructuredValue/QuantitativeValue/index.ts"
import type TierBenefitEnumeration from "../Enumeration/TierBenefitEnumeration/index.ts"
import type UnitPriceSpecification from "../StructuredValue/PriceSpecification/UnitPriceSpecification/index.ts"

export interface MemberProgramTierProps {
	hasTierBenefit?: TierBenefitEnumeration
	hasTierRequirement?:
		| CreditCard
		| MonetaryAmount
		| Text
		| UnitPriceSpecification
	isTierOf?: MemberProgram
	membershipPointsEarned?: Number | QuantitativeValue
}

type MemberProgramTier =
	& Thing
	& IntangibleProps
	& MemberProgramTierProps

export default MemberProgramTier
