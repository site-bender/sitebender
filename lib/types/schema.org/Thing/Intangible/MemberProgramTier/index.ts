import type { Number, Text } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type TierBenefitEnumeration from "../Enumeration/TierBenefitEnumeration/index.ts"
import type { IntangibleProps } from "../index.ts"
import type MemberProgram from "../MemberProgram/index.ts"
import type CreditCard from "../PaymentMethod/PaymentCard/CreditCard/index.ts"
import type MonetaryAmount from "../StructuredValue/MonetaryAmount/index.ts"
import type UnitPriceSpecification from "../StructuredValue/PriceSpecification/UnitPriceSpecification/index.ts"
import type QuantitativeValue from "../StructuredValue/QuantitativeValue/index.ts"

import { TierBenefitEnumeration as TierBenefitEnumerationComponent } from "../../../../../components/index.tsx"
import { MemberProgram as MemberProgramComponent } from "../../../../../components/index.tsx"
import { CreditCard as CreditCardComponent } from "../../../../../components/index.tsx"
import { MonetaryAmount as MonetaryAmountComponent } from "../../../../../components/index.tsx"
import { UnitPriceSpecification as UnitPriceSpecificationComponent } from "../../../../../components/index.tsx"
import { QuantitativeValue as QuantitativeValueComponent } from "../../../../../components/index.tsx"

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
