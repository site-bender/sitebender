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

import MerchantReturnEnumerationComponent from "../../../../components/Thing/Intangible/Enumeration/MerchantReturnEnumeration/index.ts"
import OfferItemConditionComponent from "../../../../components/Thing/Intangible/Enumeration/OfferItemCondition/index.ts"
import RefundTypeEnumerationComponent from "../../../../components/Thing/Intangible/Enumeration/RefundTypeEnumeration/index.ts"
import ReturnFeesEnumerationComponent from "../../../../components/Thing/Intangible/Enumeration/ReturnFeesEnumeration/index.ts"
import ReturnLabelSourceEnumerationComponent from "../../../../components/Thing/Intangible/Enumeration/ReturnLabelSourceEnumeration/index.ts"
import ReturnMethodEnumerationComponent from "../../../../components/Thing/Intangible/Enumeration/ReturnMethodEnumeration/index.ts"
import MemberProgramTierComponent from "../../../../components/Thing/Intangible/MemberProgramTier/index.ts"
import MerchantReturnPolicySeasonalOverrideComponent from "../../../../components/Thing/Intangible/MerchantReturnPolicySeasonalOverride/index.ts"
import MonetaryAmountComponent from "../../../../components/Thing/Intangible/StructuredValue/MonetaryAmount/index.ts"
import PropertyValueComponent from "../../../../components/Thing/Intangible/StructuredValue/PropertyValue/index.ts"
import CountryComponent from "../../../../components/Thing/Place/AdministrativeArea/Country/index.ts"

export type MerchantReturnPolicyType = "MerchantReturnPolicy"

export interface MerchantReturnPolicyProps {
	"@type"?: MerchantReturnPolicyType
	additionalProperty?: PropertyValue | ReturnType<typeof PropertyValueComponent>
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
