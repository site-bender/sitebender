import type {
	Boolean,
	Date,
	DateTime,
	Integer,
	Number,
	Text,
	URL,
} from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type Country from "../../Place/AdministrativeArea/Country/index.ts"
import type MerchantReturnEnumeration from "../Enumeration/MerchantReturnEnumeration/index.ts"
import type OfferItemCondition from "../Enumeration/OfferItemCondition/index.ts"
import type RefundTypeEnumeration from "../Enumeration/RefundTypeEnumeration/index.ts"
import type ReturnFeesEnumeration from "../Enumeration/ReturnFeesEnumeration/index.ts"
import type ReturnLabelSourceEnumeration from "../Enumeration/ReturnLabelSourceEnumeration/index.ts"
import type ReturnMethodEnumeration from "../Enumeration/ReturnMethodEnumeration/index.ts"
import type { IntangibleProps } from "../index.ts"
import type MemberProgramTier from "../MemberProgramTier/index.ts"
import type MerchantReturnPolicySeasonalOverride from "../MerchantReturnPolicySeasonalOverride/index.ts"
import type MonetaryAmount from "../StructuredValue/MonetaryAmount/index.ts"
import type PropertyValue from "../StructuredValue/PropertyValue/index.ts"

import MerchantReturnEnumerationComponent from "../../../../../../architect/src/define/Thing/Intangible/Enumeration/MerchantReturnEnumeration/index.tsx"
import OfferItemConditionComponent from "../../../../../../architect/src/define/Thing/Intangible/Enumeration/OfferItemCondition/index.tsx"
import RefundTypeEnumerationComponent from "../../../../../../architect/src/define/Thing/Intangible/Enumeration/RefundTypeEnumeration/index.tsx"
import ReturnFeesEnumerationComponent from "../../../../../../architect/src/define/Thing/Intangible/Enumeration/ReturnFeesEnumeration/index.tsx"
import ReturnLabelSourceEnumerationComponent from "../../../../../../architect/src/define/Thing/Intangible/Enumeration/ReturnLabelSourceEnumeration/index.tsx"
import ReturnMethodEnumerationComponent from "../../../../../../architect/src/define/Thing/Intangible/Enumeration/ReturnMethodEnumeration/index.tsx"
import MemberProgramTierComponent from "../../../../../../architect/src/define/Thing/Intangible/MemberProgramTier/index.tsx"
import MerchantReturnPolicySeasonalOverrideComponent from "../../../../../../architect/src/define/Thing/Intangible/MerchantReturnPolicySeasonalOverride/index.tsx"
import MonetaryAmountComponent from "../../../../../../architect/src/define/Thing/Intangible/StructuredValue/MonetaryAmount/index.tsx"
import PropertyValueComponent from "../../../../../../architect/src/define/Thing/Intangible/StructuredValue/PropertyValue/index.tsx"
import CountryComponent from "../../../../../../architect/src/define/Thing/Place/AdministrativeArea/Country/index.tsx"

export type MerchantReturnPolicyType = "MerchantReturnPolicy"

export interface MerchantReturnPolicyProps {
	"@type"?: MerchantReturnPolicyType
	additionalProperty?:
		| PropertyValue
		| ReturnType<typeof PropertyValueComponent>
	applicableCountry?: Country | Text | ReturnType<typeof CountryComponent>
	customerRemorseReturnFees?:
		| ReturnFeesEnumeration
		| ReturnType<typeof ReturnFeesEnumerationComponent>
	customerRemorseReturnLabelSource?:
		| ReturnLabelSourceEnumeration
		| ReturnType<typeof ReturnLabelSourceEnumerationComponent>
	customerRemorseReturnShippingFeesAmount?:
		| MonetaryAmount
		| ReturnType<typeof MonetaryAmountComponent>
	inStoreReturnsOffered?: Boolean
	itemCondition?:
		| OfferItemCondition
		| ReturnType<typeof OfferItemConditionComponent>
	itemDefectReturnFees?:
		| ReturnFeesEnumeration
		| ReturnType<typeof ReturnFeesEnumerationComponent>
	itemDefectReturnLabelSource?:
		| ReturnLabelSourceEnumeration
		| ReturnType<typeof ReturnLabelSourceEnumerationComponent>
	itemDefectReturnShippingFeesAmount?:
		| MonetaryAmount
		| ReturnType<typeof MonetaryAmountComponent>
	merchantReturnDays?: Date | DateTime | Integer
	merchantReturnLink?: URL
	refundType?:
		| RefundTypeEnumeration
		| ReturnType<typeof RefundTypeEnumerationComponent>
	restockingFee?:
		| MonetaryAmount
		| Number
		| ReturnType<typeof MonetaryAmountComponent>
	returnFees?:
		| ReturnFeesEnumeration
		| ReturnType<typeof ReturnFeesEnumerationComponent>
	returnLabelSource?:
		| ReturnLabelSourceEnumeration
		| ReturnType<typeof ReturnLabelSourceEnumerationComponent>
	returnMethod?:
		| ReturnMethodEnumeration
		| ReturnType<typeof ReturnMethodEnumerationComponent>
	returnPolicyCategory?:
		| MerchantReturnEnumeration
		| ReturnType<typeof MerchantReturnEnumerationComponent>
	returnPolicyCountry?: Country | Text | ReturnType<typeof CountryComponent>
	returnPolicySeasonalOverride?:
		| MerchantReturnPolicySeasonalOverride
		| ReturnType<typeof MerchantReturnPolicySeasonalOverrideComponent>
	returnShippingFeesAmount?:
		| MonetaryAmount
		| ReturnType<typeof MonetaryAmountComponent>
	validForMemberTier?:
		| MemberProgramTier
		| ReturnType<typeof MemberProgramTierComponent>
}

type MerchantReturnPolicy = Thing & IntangibleProps & MerchantReturnPolicyProps

export default MerchantReturnPolicy
