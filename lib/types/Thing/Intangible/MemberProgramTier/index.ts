import type { Number, Text } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type TierBenefitEnumeration from "../Enumeration/TierBenefitEnumeration/index.ts"
import type { IntangibleProps } from "../index.ts"
import type MemberProgram from "../MemberProgram/index.ts"
import type CreditCard from "../PaymentMethod/PaymentCard/CreditCard/index.ts"
import type MonetaryAmount from "../StructuredValue/MonetaryAmount/index.ts"
import type UnitPriceSpecification from "../StructuredValue/PriceSpecification/UnitPriceSpecification/index.ts"
import type QuantitativeValue from "../StructuredValue/QuantitativeValue/index.ts"

export interface MemberProgramTierProps {
	/** A member benefit for a particular tier of a loyalty program. */
	hasTierBenefit?: TierBenefitEnumeration
	/** A requirement for a user to join a membership tier, for example: a CreditCard if the tier requires sign up for a credit card, A UnitPriceSpecification if the user is required to pay a (periodic) fee, or a MonetaryAmount if the user needs to spend a minimum amount to join the tier. If a tier is free to join then this property does not need to be specified. */
	hasTierRequirement?:
		| CreditCard
		| MonetaryAmount
		| UnitPriceSpecification
		| Text
	/** The member program this tier is a part of. */
	isTierOf?: MemberProgram
	/** The number of membership points earned by the member. If necessary, the unitText can be used to express the units the points are issued in. (E.g. stars, miles, etc.) */
	membershipPointsEarned?: Number | QuantitativeValue
}

type MemberProgramTier =
	& Thing
	& IntangibleProps
	& MemberProgramTierProps

export default MemberProgramTier
