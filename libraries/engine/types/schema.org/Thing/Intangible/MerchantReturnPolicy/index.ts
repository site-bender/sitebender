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

import { Country as CountryComponent } from "../../../../../components/index.tsx"
import { MemberProgramTier as MemberProgramTierComponent } from "../../../../../components/index.tsx"
import { MerchantReturnEnumeration as MerchantReturnEnumerationComponent } from "../../../../../components/index.tsx"
import { MerchantReturnPolicySeasonalOverride as MerchantReturnPolicySeasonalOverrideComponent } from "../../../../../components/index.tsx"
import { MonetaryAmount as MonetaryAmountComponent } from "../../../../../components/index.tsx"
import { OfferItemCondition as OfferItemConditionComponent } from "../../../../../components/index.tsx"
import { PropertyValue as PropertyValueComponent } from "../../../../../components/index.tsx"
import { RefundTypeEnumeration as RefundTypeEnumerationComponent } from "../../../../../components/index.tsx"
import { ReturnFeesEnumeration as ReturnFeesEnumerationComponent } from "../../../../../components/index.tsx"
import { ReturnLabelSourceEnumeration as ReturnLabelSourceEnumerationComponent } from "../../../../../components/index.tsx"
import { ReturnMethodEnumeration as ReturnMethodEnumerationComponent } from "../../../../../components/index.tsx"

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
