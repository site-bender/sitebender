import type { Number, Text } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type TierBenefitEnumeration from "../Enumeration/TierBenefitEnumeration/index.ts"
import type { IntangibleProps } from "../index.ts"
import type MemberProgram from "../MemberProgram/index.ts"
import type CreditCard from "../PaymentMethod/PaymentCard/CreditCard/index.ts"
import type MonetaryAmount from "../StructuredValue/MonetaryAmount/index.ts"
import type UnitPriceSpecification from "../StructuredValue/PriceSpecification/UnitPriceSpecification/index.ts"
import type QuantitativeValue from "../StructuredValue/QuantitativeValue/index.ts"

import TierBenefitEnumerationComponent from "../../../../../../pagewright/src/define/Thing/Intangible/Enumeration/TierBenefitEnumeration/index.tsx"
import MemberProgramComponent from "../../../../../../pagewright/src/define/Thing/Intangible/MemberProgram/index.tsx"
import MonetaryAmountComponent from "../../../../../../pagewright/src/define/Thing/Intangible/StructuredValue/MonetaryAmount/index.tsx"
import UnitPriceSpecificationComponent from "../../../../../../pagewright/src/define/Thing/Intangible/StructuredValue/PriceSpecification/UnitPriceSpecification/index.tsx"
import QuantitativeValueComponent from "../../../../../../pagewright/src/define/Thing/Intangible/StructuredValue/QuantitativeValue/index.tsx"
import { CreditCard as CreditCardComponent } from "../../../../../pagewright/index.tsx"

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
