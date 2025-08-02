import type { Number, Text } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type TierBenefitEnumeration from "../Enumeration/TierBenefitEnumeration/index.ts"
import type { IntangibleProps } from "../index.ts"
import type MemberProgram from "../MemberProgram/index.ts"
import type CreditCard from "../PaymentMethod/PaymentCard/CreditCard/index.ts"
import type MonetaryAmount from "../StructuredValue/MonetaryAmount/index.ts"
import type UnitPriceSpecification from "../StructuredValue/PriceSpecification/UnitPriceSpecification/index.ts"
import type QuantitativeValue from "../StructuredValue/QuantitativeValue/index.ts"

import TierBenefitEnumerationComponent from "../../../../components/Thing/Intangible/Enumeration/TierBenefitEnumeration/index.ts"
import MemberProgramComponent from "../../../../components/Thing/Intangible/MemberProgram/index.ts"
import CreditCardComponent from "../../../../components/Thing/Intangible/PaymentMethod/PaymentCard/CreditCard/index.ts"
import MonetaryAmountComponent from "../../../../components/Thing/Intangible/StructuredValue/MonetaryAmount/index.ts"
import UnitPriceSpecificationComponent from "../../../../components/Thing/Intangible/StructuredValue/PriceSpecification/UnitPriceSpecification/index.ts"
import QuantitativeValueComponent from "../../../../components/Thing/Intangible/StructuredValue/QuantitativeValue/index.ts"

export type MemberProgramTierType = "MemberProgramTier"

export interface MemberProgramTierProps {
	"@type"?: MemberProgramTierType
	hasTierBenefit?:
		| TierBenefitEnumeration
		| ReturnType<typeof TierBenefitEnumerationComponent>
	hasTierRequirement?:
		| CreditCard
		| MonetaryAmount
		| Text
		| UnitPriceSpecification
		| ReturnType<typeof CreditCardComponent>
		| ReturnType<typeof MonetaryAmountComponent>
		| ReturnType<typeof UnitPriceSpecificationComponent>
	isTierOf?: MemberProgram | ReturnType<typeof MemberProgramComponent>
	membershipPointsEarned?:
		| Number
		| QuantitativeValue
		| ReturnType<typeof QuantitativeValueComponent>
}

type MemberProgramTier = Thing & IntangibleProps & MemberProgramTierProps

export default MemberProgramTier
